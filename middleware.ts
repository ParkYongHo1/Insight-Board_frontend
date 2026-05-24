import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const hasRefreshToken = req.cookies.has("refreshToken");

  if (!hasRefreshToken && isProtectedRoute(pathname)) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  if (hasRefreshToken && isAuthRoute(pathname)) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}

function isProtectedRoute(pathname: string) {
  return ["/dashboard", "/profile"].some((route) => pathname.startsWith(route));
}

function isAuthRoute(pathname: string) {
  return ["/sign-in", "/sign-up"].includes(pathname);
}

export const config = {
  matcher: ["/dashboard/:path*", "/profile/:path*", "/sign-in", "/sign-up"],
};
