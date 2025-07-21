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

  if (user) {
    try {
      // Use service client to bypass RLS for initial user creation
      const serviceSupabase = createServiceClient();

      // Check if user already exists to prevent duplicate key error
      const { data: existingUser } = await serviceSupabase
        .from("users")
        .select("id")
        .eq("id", user.id)
        .single();

      if (!existingUser) {
        const { error: updateError } = await serviceSupabase
          .from("users")
          .insert({
            id: user.id,
            name: fullName,
            full_name: fullName,
            email: email,
            user_id: user.id,
            token_identifier: user.id,
            created_at: new Date().toISOString(),
          });

        if (updateError) {
          console.error("Error updating user profile:", updateError);
        }
      }
    } catch (err) {
      console.error("Error in user profile creation:", err);
    }
  }

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

export const makeUserAdminAction = async (formData: FormData) => {
  const serviceSupabase = createServiceClient();
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return encodedRedirect("error", "/dashboard", "Unauthorized");
  }

  const userId = formData.get("user_id")?.toString() || user.id;

  const { error } = await serviceSupabase.from("user_roles").upsert({
    user_id: userId,
    role: "admin",
  });

  if (error) {
    return encodedRedirect("error", "/dashboard", "Failed to make user admin");
  }

  return encodedRedirect("success", "/dashboard", "User is now an admin");
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
  const content = formData.get("content")?.toString();

  if (!pageType || !content) {
    return encodedRedirect(
      "error",
      "/dashboard",
      "Page type and content are required",
    );
  }

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
    `${pageType} page updated successfully`,
  );
};
