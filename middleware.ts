import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("refreshToken")?.value;
  const { pathname } = request.nextUrl;

  const isAuthRelatedPage =
    pathname === "/sign-in" || pathname.startsWith("/sign-up");

  const isMainPage = pathname === "/";

  if (token && isAuthRelatedPage) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (!token) {
    if (!isAuthRelatedPage && !isMainPage) {
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|mockServiceWorker.js|favicon.ico).*)",
  ],
};
