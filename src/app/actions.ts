"use server";

import { createClient } from "../../../supabase/server"; 
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

// Helper untuk redirect dengan query string
export const encodedRedirect = (
  status: "success" | "error",
  path: string,
  message: string
) => {
  const encodedMessage = encodeURIComponent(message);
  return redirect(`${path}?status=${status}&message=${encodedMessage}`);
};

// --- Auth ---

export const signInAction = async (formData: FormData) => {
  const supabase = createClient(cookies());

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return encodedRedirect("error", "/sign-in", "Gagal masuk. Cek email/password.");
  }

  return redirect("/dashboard");
};

export const signUpAction = async (formData: FormData) => {
  const supabase = createClient(cookies());

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const { error } = await supabase.auth.signUp({ email, password });

  if (error) {
    return encodedRedirect("error", "/sign-up", "Gagal daftar. Coba email lain.");
  }

  return redirect("/dashboard");
};

export const signOutAction = async () => {
  const supabase = createClient(cookies());
  await supabase.auth.signOut();
  return redirect("/sign-in");
};

export const resetPasswordAction = async (formData: FormData) => {
  const supabase = createClient(cookies());

  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (!password || !confirmPassword) {
    return encodedRedirect("error", "/protected/reset-password", "Password wajib diisi.");
  }

  if (password !== confirmPassword) {
    return encodedRedirect("error", "/dashboard/reset-password", "Password tidak cocok.");
  }

  const { error } = await supabase.auth.updateUser({ password });

  if (error) {
    return encodedRedirect("error", "/dashboard/reset-password", "Gagal mengubah password.");
  }

  return encodedRedirect("success", "/protected/reset-password", "Password berhasil diubah.");
};

// --- Data: eBook ---

export const addEbook = async (formData: FormData) => {
  const supabase = createClient(cookies());

  const title = formData.get("title") as string;
  const author = formData.get("author") as string;
  const link = formData.get("link") as string;

  const { error } = await supabase.from("ebooks").insert({ title, author, link });

  if (error) {
    return encodedRedirect("error", "/dashboard", "Gagal menambahkan eBook.");
  }

  revalidatePath("/dashboard");
  return encodedRedirect("success", "/dashboard", "eBook berhasil ditambahkan.");
};

export const deleteEbook = async (id: number) => {
  const supabase = createClient(cookies());

  const { error } = await supabase.from("ebooks").delete().eq("id", id);

  if (error) {
    return encodedRedirect("error", "/dashboard", "Gagal menghapus eBook.");
  }

  revalidatePath("/dashboard");
};

export const updateEbook = async (formData: FormData) => {
  const supabase = createClient(cookies());

  const id = Number(formData.get("id"));
  const title = formData.get("title") as string;
  const author = formData.get("author") as string;
  const link = formData.get("link") as string;

  const { error } = await supabase
    .from("ebooks")
    .update({ title, author, link })
    .eq("id", id);

  if (error) {
    return encodedRedirect("error", "/dashboard", "Gagal mengubah eBook.");
  }

  revalidatePath("/dashboard");
  return encodedRedirect("success", "/dashboard", "eBook berhasil diperbarui.");
};
