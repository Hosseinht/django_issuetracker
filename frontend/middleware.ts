import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const isLoggedIn = request.cookies.get("logged_in")?.value === "true";
  const isDevelopment = process.env.NODE_ENV === "development";
  const baseUrl = isDevelopment
    ? process.env.NEXT_PUBLIC_DEV_URL
    : "https://domain.com";

  if (!isLoggedIn && !request.nextUrl.pathname.startsWith("/auth")) {
    return NextResponse.redirect(new URL(`/auth/login`, `${baseUrl}`));
  }

  if (
    isLoggedIn &&
    (request.nextUrl.pathname === "/auth/login" ||
      request.nextUrl.pathname === "/auth/signup")
  ) {
    return NextResponse.redirect(new URL("/issues", `${baseUrl}`));
  }
}

export const config = {
  matcher: ["/issues/new", "/issues/:id/edit/", "/auth/login", "/auth/signup"],
};
