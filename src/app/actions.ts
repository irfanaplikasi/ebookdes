"use server";

import { encodedRedirect } from "@/utils/utils";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { createClient, createServiceClient } from "../../supabase/server";

export const signUpAction = async (formData: FormData) => {
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();
  const fullName = formData.get("full_name")?.toString() || "";
  const supabase = await createClient();
  const origin = headers().get("origin");

  if (!email || !password) {
    return encodedRedirect(
      "error",
      "/sign-up",
      "Email and password are required",
    );
  }

  const {
    data: { user },
    error,
  } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
      data: {
        full_name: fullName,
        email: email,
      },
    },
  });

  console.log("After signUp", error);

  if (error) {
    console.error(error.code + " " + error.message);
    return encodedRedirect("error", "/sign-up", error.message);
  }

  // User creation is now handled by the database trigger
  // No need to manually insert into users table

  return encodedRedirect(
    "success",
    "/sign-up",
    "Thanks for signing up! Please check your email for a verification link.",
  );
};

export const signInAction = async (formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return encodedRedirect("error", "/sign-in", error.message);
  }

  return redirect("/dashboard");
};

export const forgotPasswordAction = async (formData: FormData) => {
  const email = formData.get("email")?.toString();
  const supabase = await createClient();
  const origin = headers().get("origin");
  const callbackUrl = formData.get("callbackUrl")?.toString();

  if (!email) {
    return encodedRedirect("error", "/forgot-password", "Email is required");
  }

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/auth/callback?redirect_to=/protected/reset-password`,
  });

  if (error) {
    console.error(error.message);
    return encodedRedirect(
      "error",
      "/forgot-password",
      "Could not reset password",
    );
  }

  if (callbackUrl) {
    return redirect(callbackUrl);
  }

  return encodedRedirect(
    "success",
    "/forgot-password",
    "Check your email for a link to reset your password.",
  );
};

export const resetPasswordAction = async (formData: FormData) => {
  const supabase = await createClient();

  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (!password || !confirmPassword) {
    encodedRedirect(
      "error",
      "/protected/reset-password",
      "Password and confirm password are required",
    );
  }

  if (password !== confirmPassword) {
    encodedRedirect(
      "error",
      "/dashboard/reset-password",
      "Passwords do not match",
    );
  }

  const { error } = await supabase.auth.updateUser({
    password: password,
  });

  if (error) {
    encodedRedirect(
      "error",
      "/dashboard/reset-password",
      "Password update failed",
    );
  }

  encodedRedirect("success", "/protected/reset-password", "Password updated");
};

export const signOutAction = async () => {
  const supabase = await createClient();
  await supabase.auth.signOut();
  return redirect("/sign-in");
};

// E-book management actions
export const createEbookAction = async (formData: FormData) => {
  const supabase = await createClient();
  const serviceSupabase = createServiceClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return encodedRedirect("error", "/dashboard", "Unauthorized");
  }

  // Check if user is admin
  const { data: userRole } = await serviceSupabase
    .from("user_roles")
    .select("role")
    .eq("user_id", user.id)
    .single();

  if (userRole?.role !== "admin") {
    return encodedRedirect(
      "error",
      "/dashboard",
      "Access denied. Admin role required.",
    );
  }

  const title = formData.get("title")?.toString();
  const author = formData.get("author")?.toString();
  const description = formData.get("description")?.toString();
  const genre = formData.get("genre")?.toString();
  const coverImageUrl = formData.get("cover_image_url")?.toString();
  const pdfUrl = formData.get("pdf_url")?.toString();

  if (!title || !author || !pdfUrl) {
    return encodedRedirect(
      "error",
      "/dashboard",
      "Title, author, and PDF URL are required",
    );
  }

  const { error } = await serviceSupabase.from("ebooks").insert({
    title,
    author,
    description,
    genre,
    cover_image_url: coverImageUrl,
    pdf_url: pdfUrl,
    created_by: user.id,
  });

  if (error) {
    return encodedRedirect("error", "/dashboard", "Failed to create e-book");
  }

  return encodedRedirect(
    "success",
    "/dashboard",
    "E-book created successfully",
  );
};

export const updateEbookAction = async (formData: FormData) => {
  const supabase = await createClient();
  const serviceSupabase = createServiceClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return encodedRedirect("error", "/dashboard", "Unauthorized");
  }

  // Check if user is admin
  const { data: userRole } = await serviceSupabase
    .from("user_roles")
    .select("role")
    .eq("user_id", user.id)
    .single();

  if (userRole?.role !== "admin") {
    return encodedRedirect(
      "error",
      "/dashboard",
      "Access denied. Admin role required.",
    );
  }

  const id = formData.get("id")?.toString();
  const title = formData.get("title")?.toString();
  const author = formData.get("author")?.toString();
  const description = formData.get("description")?.toString();
  const genre = formData.get("genre")?.toString();
  const coverImageUrl = formData.get("cover_image_url")?.toString();
  const pdfUrl = formData.get("pdf_url")?.toString();

  if (!id || !title || !author || !pdfUrl) {
    return encodedRedirect(
      "error",
      "/dashboard",
      "ID, title, author, and PDF URL are required",
    );
  }

  const { error } = await serviceSupabase
    .from("ebooks")
    .update({
      title,
      author,
      description,
      genre,
      cover_image_url: coverImageUrl,
      pdf_url: pdfUrl,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) {
    return encodedRedirect("error", "/dashboard", "Failed to update e-book");
  }

  return encodedRedirect(
    "success",
    "/dashboard",
    "E-book updated successfully",
  );
};

export const deleteEbookAction = async (formData: FormData) => {
  const supabase = await createClient();
  const serviceSupabase = createServiceClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return encodedRedirect("error", "/dashboard", "Unauthorized");
  }

  // Check if user is admin
  const { data: userRole } = await serviceSupabase
    .from("user_roles")
    .select("role")
    .eq("user_id", user.id)
    .single();

  if (userRole?.role !== "admin") {
    return encodedRedirect(
      "error",
      "/dashboard",
      "Access denied. Admin role required.",
    );
  }

  const id = formData.get("id")?.toString();

  if (!id) {
    return encodedRedirect("error", "/dashboard", "E-book ID is required");
  }

  const { error } = await serviceSupabase.from("ebooks").delete().eq("id", id);

  if (error) {
    return encodedRedirect("error", "/dashboard", "Failed to delete e-book");
  }

  return encodedRedirect(
    "success",
    "/dashboard",
    "E-book deleted successfully",
  );
};

export const updateReadingProgressAction = async (formData: FormData) => {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return encodedRedirect("error", "/dashboard", "Unauthorized");
  }

  const ebookId = formData.get("ebook_id")?.toString();
  const currentPage = parseInt(formData.get("current_page")?.toString() || "1");
  const totalPages = parseInt(formData.get("total_pages")?.toString() || "1");

  if (!ebookId) {
    return encodedRedirect("error", "/dashboard", "E-book ID is required");
  }

  const { error } = await supabase.from("reading_progress").upsert({
    user_id: user.id,
    ebook_id: ebookId,
    current_page: currentPage,
    total_pages: totalPages,
    last_read_at: new Date().toISOString(),
  });

  if (error) {
    console.error("Failed to update reading progress:", error);
  }

  return { success: true };
};

export const signInWithGoogleAction = async () => {
  const supabase = await createClient();
  const origin = headers().get("origin");

  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${origin}/api/auth/google`,
      },
    });

    if (error) {
      console.error("Google OAuth Error:", error);

      // Handle specific Google OAuth errors
      if (
        error.message.includes("provider is not enabled") ||
        error.message.includes("Unsupported provider") ||
        error.message.includes("Invalid provider")
      ) {
        // Return error object instead of redirect for client-side handling
        return {
          error:
            "Google Sign-In belum dikonfigurasi. Silakan gunakan email dan password untuk masuk.",
        };
      }

      return {
        error: error.message || "Terjadi kesalahan saat masuk dengan Google",
      };
    }

    if (data.url) {
      return redirect(data.url);
    }

    return {
      error: "Gagal mengarahkan ke Google Sign-In",
    };
  } catch (error: any) {
    console.error("Google Sign-In Exception:", error);
    return {
      error:
        "Google Sign-In belum dikonfigurasi. Silakan gunakan email dan password untuk masuk.",
    };
  }
};

export const makeUserAdminAction = async (formData: FormData) => {
  // This function is disabled for security reasons
  // Admin users are now created automatically for the first registered user
  // or through database management
  return encodedRedirect(
    "error",
    "/dashboard",
    "Admin creation through UI is disabled for security reasons",
  );
};

export const updatePageContentAction = async (formData: FormData) => {
  const supabase = await createClient();
  const serviceSupabase = createServiceClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return encodedRedirect("error", "/dashboard", "Unauthorized");
  }

  // Check if user is admin
  const { data: userRole } = await serviceSupabase
    .from("user_roles")
    .select("role")
    .eq("user_id", user.id)
    .single();

  if (userRole?.role !== "admin") {
    return encodedRedirect(
      "error",
      "/dashboard",
      "Access denied. Admin role required.",
    );
  }

  const pageType = formData.get("page_type")?.toString();

  if (!pageType) {
    return encodedRedirect("error", "/dashboard", "Page type is required");
  }

  // Build content object from form data
  const contentData: any = {};

  // Get all form entries and build content object
  for (const [key, value] of formData.entries()) {
    if (key !== "page_type" && value) {
      contentData[key] = value.toString();
    }
  }

  const content = JSON.stringify(contentData);

  const { error } = await serviceSupabase.from("page_contents").upsert({
    page_type: pageType,
    content: content,
    updated_by: user.id,
    updated_at: new Date().toISOString(),
  });

  if (error) {
    return encodedRedirect(
      "error",
      "/dashboard",
      "Failed to update page content",
    );
  }

  return encodedRedirect(
    "success",
    "/dashboard",
    `Pengaturan ${pageType} berhasil diperbarui`,
  );
};
