"use server";

import { encodedRedirect } from "@/utils/utils";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { createClient, createServiceClient } from "../../supabase/server";

// Tipe untuk hasil kembalian Server Actions
type ActionResult = {
  error?: string;
  success?: boolean;
  message?: string;
};

export const signUpAction = async (formData: FormData): Promise<ActionResult | void> => {
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();
  const fullName = formData.get("full_name")?.toString() || "";
  const supabase = await createClient();
  const origin = headers().get("origin");

  if (!email || !password) {
    return {
      error: "Email and password are required",
    };
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
    return {
      error: error.message,
    };
  }

  return encodedRedirect(
    "success",
    "/sign-up",
    "Thanks for signing up! Please check your email for a verification link."
  );
};

export const signInAction = async (formData: FormData): Promise<ActionResult | void> => {
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();
  const supabase = await createClient();

  if (!email || !password) {
    return {
      error: "Email and password are required",
    };
  }

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return {
      error: error.message,
    };
  }

  return redirect("/dashboard");
};

export const forgotPasswordAction = async (formData: FormData): Promise<ActionResult | void> => {
  const email = formData.get("email")?.toString();
  const supabase = await createClient();
  const origin = headers().get("origin");
  const callbackUrl = formData.get("callbackUrl")?.toString();

  if (!email) {
    return {
      error: "Email is required",
    };
  }

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/auth/callback?redirect_to=/protected/reset-password`,
  });

  if (error) {
    console.error(error.message);
    return {
      error: "Could not reset password",
    };
  }

  if (callbackUrl) {
    return redirect(callbackUrl);
  }

  return encodedRedirect(
    "success",
    "/forgot-password",
    "Check your email for a link to reset your password."
  );
};

export const resetPasswordAction = async (formData: FormData): Promise<ActionResult | void> => {
  const supabase = await createClient();
  const password = formData.get("password")?.toString();
  const confirmPassword = formData.get("confirmPassword")?.toString();

  if (!password || !confirmPassword) {
    return {
      error: "Password and confirm password are required",
    };
  }

  if (password !== confirmPassword) {
    return {
      error: "Passwords do not match",
    };
  }

  const { error } = await supabase.auth.updateUser({
    password,
  });

  if (error) {
    return {
      error: "Password update failed",
    };
  }

  return encodedRedirect("success", "/protected/reset-password", "Password updated");
};

export const signOutAction = async (): Promise<void> => {
  const supabase = await createClient();
  await supabase.auth.signOut();
  return redirect("/sign-in");
};

export const createEbookAction = async (formData: FormData): Promise<ActionResult | void> => {
  const supabase = await createClient();
  const serviceSupabase = createServiceClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    console.error("User fetch error:", userError?.message);
    return {
      error: "Unauthorized",
    };
  }

  const { data: userRole, error: roleError } = await serviceSupabase
    .from("user_roles")
    .select("role")
    .eq("user_id", user.id)
    .single();

  if (roleError || userRole?.role !== "admin") {
    console.error("Role check error:", roleError?.message || "User is not admin");
    return {
      error: "Access denied. Admin role required.",
    };
  }

  const title = formData.get("title")?.toString();
  const author = formData.get("author")?.toString();
  const description = formData.get("description")?.toString();
  const genre = formData.get("genre")?.toString();
  const coverImageUrl = formData.get("cover_image_url")?.toString();
  const pdfUrl = formData.get("pdf_url")?.toString();

  if (!title || !author || !pdfUrl) {
    return {
      error: "Title, author, and PDF URL are required",
    };
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
    console.error("Supabase insert error:", {
      message: error.message,
      details: error.details,
      hint: error.hint,
      code: error.code,
    });
    return {
      error: "Failed to create e-book",
    };
  }

  return encodedRedirect("success", "/dashboard", "E-book created successfully");
};

export const updateEbookAction = async (formData: FormData): Promise<ActionResult | void> => {
  const supabase = await createClient();
  const serviceSupabase = createServiceClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    console.error("User fetch error:", userError?.message);
    return {
      error: "Unauthorized",
    };
  }

  const { data: userRole, error: roleError } = await serviceSupabase
    .from("user_roles")
    .select("role")
    .eq("user_id", user.id)
    .single();

  if (roleError || userRole?.role !== "admin") {
    console.error("Role check error:", roleError?.message || "User is not admin");
    return {
      error: "Access denied. Admin role required.",
    };
  }

  const id = formData.get("id")?.toString();
  const title = formData.get("title")?.toString();
  const author = formData.get("author")?.toString();
  const description = formData.get("description")?.toString();
  const genre = formData.get("genre")?.toString();
  const coverImageUrl = formData.get("cover_image_url")?.toString();
  const pdfUrl = formData.get("pdf_url")?.toString();

  if (!id || !title || !author || !pdfUrl) {
    return {
      error: "ID, title, author, and PDF URL are required",
    };
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
    console.error("Supabase update error:", {
      message: error.message,
      details: error.details,
      hint: error.hint,
      code: error.code,
    });
    return {
      error: "Failed to update e-book",
    };
  }

  return encodedRedirect("success", "/dashboard", "E-book updated successfully");
};

export const deleteEbookAction = async (formData: FormData): Promise<ActionResult | void> => {
  try {
    const supabase = await createClient();
    const serviceSupabase = createServiceClient();

    if (!serviceSupabase) {
      console.error("Failed to initialize Supabase service client");
      return {
        error: "Gagal menginisialisasi Supabase client",
      };
    }

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      console.error("User fetch error:", userError?.message);
      return encodedRedirect("error", "/dashboard", "Unauthorized");
    }

    const { data: userRole, error: roleError } = await serviceSupabase
      .from("user_roles")
      .select("role")
      .eq("user_id", user.id)
      .single();

    if (roleError || userRole?.role !== "admin") {
      console.error("Role check error:", roleError?.message || "User is not admin");
      return encodedRedirect(
        "error",
        "/dashboard",
        "Access denied. Admin role required."
      );
    }

    const id = formData.get("id")?.toString();

    if (!id) {
      console.error("Missing ebook ID in formData");
      return {
        error: "E-book ID is required",
      };
    }

    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(id)) {
      console.error("Invalid ebook ID format:", id);
      return {
        error: "ID e-book tidak valid",
      };
    }

    console.log("Attempting to delete ebook with ID:", id);

    const { data: ebookExists, error: checkError } = await serviceSupabase
      .from("ebooks")
      .select("id")
      .eq("id", id)
      .single();

    if (checkError || !ebookExists) {
      console.error("E-book not found or error checking:", checkError?.message);
      return {
        error: "E-book tidak ditemukan",
      };
    }

    const { error: deleteError } = await serviceSupabase
      .from("ebooks")
      .delete()
      .eq("id", id);

    if (deleteError) {
      console.error("Supabase delete error:", {
        message: deleteError.message,
        details: deleteError.details,
        hint: deleteError.hint,
        code: deleteError.code,
      });
      return {
        error: `Gagal menghapus e-book: ${deleteError.message}`,
      };
    }

    console.log("E-book deleted successfully, ID:", id);
    return encodedRedirect("success", "/dashboard", "E-book berhasil dihapus");
  } catch (error: any) {
    console.error("Unexpected error in deleteEbookAction:", {
      message: error.message,
      stack: error.stack,
    });
    return {
      error: "Terjadi kesalahan server saat menghapus e-book",
    };
  }
};

export const updateReadingProgressAction = async (formData: FormData): Promise<ActionResult> => {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    console.error("User fetch error:", userError?.message);
    return {
      error: "Unauthorized",
    };
  }

  const ebookId = formData.get("ebook_id")?.toString();
  const currentPage = parseInt(formData.get("current_page")?.toString() || "1");
  const totalPages = parseInt(formData.get("total_pages")?.toString() || "1");

  if (!ebookId) {
    return {
      error: "E-book ID is required",
    };
  }

  const { error } = await supabase.from("reading_progress").upsert({
    user_id: user.id,
    ebook_id: ebookId,
    current_page: currentPage,
    total_pages: totalPages,
    last_read_at: new Date().toISOString(),
  });

  if (error) {
    console.error("Failed to update reading progress:", {
      message: error.message,
      details: error.details,
      hint: error.hint,
      code: error.code,
    });
    return {
      error: "Failed to update reading progress",
    };
  }

  return { success: true };
};

export const signInWithGoogleAction = async (): Promise<ActionResult | void> => {
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
      return {
        error:
          "Google Sign-In belum dikonfigurasi. Silakan gunakan email dan password untuk masuk.",
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

export const makeUserAdminAction = async (formData: FormData): Promise<ActionResult | void> => {
  return encodedRedirect(
    "error",
    "/dashboard",
    "Admin creation through UI is disabled for security reasons"
  );
};

export const updatePageContentAction = async (formData: FormData): Promise<ActionResult | void> => {
  const supabase = await createClient();
  const serviceSupabase = createServiceClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    console.error("User fetch error:", userError?.message);
    return {
      error: "Unauthorized",
    };
  }

  const { data: userRole, error: roleError } = await serviceSupabase
    .from("user_roles")
    .select("role")
    .eq("user_id", user.id)
    .single();

  if (roleError || userRole?.role !== "admin") {
    console.error("Role check error:", roleError?.message || "User is not admin");
    return {
      error: "Access denied. Admin role required.",
    };
  }

  const pageType = formData.get("page_type")?.toString();

  if (!pageType) {
    return {
      error: "Page type is required",
    };
  }

  const contentData: any = {};
  for (const [key, value] of formData.entries()) {
    if (key !== "page_type" && value) {
      contentData[key] = value.toString();
    }
  }

  const content = JSON.stringify(contentData);

  const { error } = await serviceSupabase.from("page_contents").upsert({
    page_type: pageType,
    content,
    updated_by: user.id,
    updated_at: new Date().toISOString(),
  });

  if (error) {
    console.error("Supabase upsert error:", {
      message: error.message,
      details: error.details,
      hint: error.hint,
      code: error.code,
    });
    return {
      error: "Failed to update page content",
    };
  }

  return encodedRedirect(
    "success",
    "/dashboard",
    `Pengaturan ${pageType} berhasil diperbarui`
  );
};
