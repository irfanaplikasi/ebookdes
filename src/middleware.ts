import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  let res = NextResponse.next({
    request: {
      headers: req.headers,
    },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return req.cookies.getAll().map(({ name, value }) => ({
            name,
            value,
          }));
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            req.cookies.set(name, value);
            res = NextResponse.next({
              request: {
                headers: req.headers,
              },
            });
            res.cookies.set(name, value, options);
          });
        },
      },
    },
  );

  // Refresh session if expired - required for Server Components
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) {
    // Only log specific auth errors, not session missing errors
    if (
      !error.message?.includes("Auth session missing") &&
      error.name !== "AuthSessionMissingError"
    ) {
      console.error("Auth session error:", error);
    }

    // Handle refresh token errors by redirecting to sign-in
    if (
      error.message?.includes("refresh_token_not_found") ||
      error.message?.includes("Invalid Refresh Token") ||
      error.message?.includes("JWT expired")
    ) {
      // Clear any existing auth cookies
      res.cookies.delete("sb-access-token");
      res.cookies.delete("sb-refresh-token");
      res.cookies.delete("supabase-auth-token");

      // Only redirect to sign-in if we're not already on an auth page
      if (
        !req.nextUrl.pathname.startsWith("/sign-in") &&
        !req.nextUrl.pathname.startsWith("/sign-up") &&
        !req.nextUrl.pathname.startsWith("/forgot-password") &&
        !req.nextUrl.pathname.startsWith("/auth")
      ) {
        return NextResponse.redirect(new URL("/sign-in", req.url));
      }
    }
  }

  // Protected routes
  if (req.nextUrl.pathname.startsWith("/dashboard") && !user) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  if (req.nextUrl.pathname.startsWith("/read") && !user) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  return res;
}

// Ensure the middleware is only called for relevant paths
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public (public files)
     * - api/auth (auth API routes)
     */
    "/((?!_next/static|_next/image|favicon.ico|public).*)",
  ],
};
