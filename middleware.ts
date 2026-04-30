import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("refreshToken")?.value;
  const { pathname } = request.nextUrl;

  const isAuthPage = pathname === "/sign-in" || pathname === "/sign-up";

  const isMainPage = pathname === "/";

  if (!token) {
    if (!isAuthPage && !isMainPage) {
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }
  }

  if (token) {
    if (isAuthPage) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|mockServiceWorker.js|favicon.ico).*)",
  ],
};
