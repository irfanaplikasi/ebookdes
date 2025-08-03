import { createClient } from "../../../../../supabase/server";
import { NextRequest, NextResponse } from "next/server";
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get("code");
    const error = searchParams.get("error");
    const errorDescription = searchParams.get("error_description");
    const next = searchParams.get("next") ?? "/dashboard";

    // Handle OAuth errors
    if (error) {
      console.error("OAuth Error:", error, errorDescription);

      let errorMessage = "Terjadi kesalahan saat masuk dengan Google.";

      switch (error) {
        case "access_denied":
          errorMessage = "Akses ditolak. Silakan coba lagi.";
          break;
        case "invalid_request":
        case "unsupported_response_type":
        case "invalid_scope":
        case "server_error":
        case "temporarily_unavailable":
          errorMessage =
            "Google Sign-In belum dikonfigurasi. Silakan gunakan email dan password.";
          break;
        default:
          errorMessage =
            "Google Sign-In belum dikonfigurasi. Silakan gunakan email dan password.";
      }

      return NextResponse.redirect(
        new URL(
          `/sign-in?error=${encodeURIComponent(errorMessage)}`,
          request.url,
        ),
      );
    }

    if (code) {
      const supabase = await createClient();
      const { error: exchangeError } =
        await supabase.auth.exchangeCodeForSession(code);

      if (!exchangeError) {
        return NextResponse.redirect(new URL(next, request.url));
      }

      console.error("Session exchange error:", exchangeError);

      // Handle specific exchange errors
      let errorMessage = "Terjadi kesalahan saat masuk dengan Google.";

      if (
        exchangeError.message.includes("provider is not enabled") ||
        exchangeError.message.includes("Invalid provider") ||
        exchangeError.message.includes("Unsupported provider")
      ) {
        errorMessage =
          "Google Sign-In belum dikonfigurasi. Silakan gunakan email dan password.";
      }

      return NextResponse.redirect(
        new URL(
          `/sign-in?error=${encodeURIComponent(errorMessage)}`,
          request.url,
        ),
      );
    }

    // Return the user to sign-in page with error message
    return NextResponse.redirect(
      new URL(
        "/sign-in?error=Terjadi kesalahan saat masuk dengan Google.",
        request.url,
      ),
    );
  } catch (error) {
    console.error("Google OAuth callback error:", error);
    return NextResponse.redirect(
      new URL(
        "/sign-in?error=Google Sign-In belum dikonfigurasi. Silakan gunakan email dan password.",
        request.url,
      ),
    );
  }
}
