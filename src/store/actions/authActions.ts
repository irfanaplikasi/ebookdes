import { createAsyncThunk } from "@reduxjs/toolkit";
import { createClient } from "../../../supabase/client";
import { User } from "../../types/user";

export const signInWithGoogle = createAsyncThunk(
  "auth/signInWithGoogle",
  async (_, { rejectWithValue }) => {
    try {
      const supabase = createClient();
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/api/auth/callback`,
          queryParams: {
            access_type: "offline",
            prompt: "consent",
          },
        },
      });

      if (error) {
        console.error("Google OAuth Redux Error:", error);

        if (
          error.message.includes("provider is not enabled") ||
          error.message.includes("Unsupported provider") ||
          error.message.includes("Invalid provider") ||
          error.status === 400
        ) {
          return rejectWithValue(
            "Google Sign-In belum dikonfigurasi. Silakan gunakan email dan password untuk masuk.",
          );
        }

        return rejectWithValue(
          error.message || "Terjadi kesalahan saat masuk dengan Google",
        );
      }

      return data;
    } catch (err) {
      console.error("Google Sign-In Redux Exception:", err);
      return rejectWithValue(
        "Google Sign-In belum dikonfigurasi. Silakan gunakan email dan password untuk masuk.",
      );
    }
  },
);

export const signOut = createAsyncThunk(
  "auth/signOut",
  async (_, { rejectWithValue }) => {
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signOut();

      if (error) {
        return rejectWithValue(error.message);
      }

      return true;
    } catch (err) {
      return rejectWithValue("Gagal keluar dari akun.");
    }
  },
);

export const getCurrentUser = createAsyncThunk<User | null, void>(
  "auth/getCurrentUser",
  async (_, { rejectWithValue }) => {
    try {
      const supabase = createClient();
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (error) {
        return rejectWithValue(error.message);
      }

      if (!user) {
        return null;
      }

      const { data: userRole } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", user.id)
        .single();

      const userData: User = {
        id: user.id,
        email: user.email ?? null, // ✅ diperbaiki untuk hindari error tipe
        full_name: user.user_metadata?.full_name || null,
        avatar_url: user.user_metadata?.avatar_url || null,
        role: userRole?.role || "user",
      };

      return userData;
    } catch (err) {
      console.error("Get current user error:", err);
      return rejectWithValue("Gagal mendapatkan data pengguna.");
    }
  },
);
