import { NextRequest, NextResponse } from "next/server";
export function middleware(req: NextRequest) {
  const { pathname, searchParams } = req.nextUrl;

  if (pathname === "/sign-up" && searchParams.has("token")) {
    return NextResponse.next();
  }

  const hasRefreshToken = req.cookies.has("refreshToken");
  const hasSelectedProject = req.cookies.has("selectedProjectId");

  // 비로그인 → 보호 경로 접근 차단
  if (!hasRefreshToken && isProtectedRoute(pathname)) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  // 로그인 → 인증 페이지 접근 차단
  if (hasRefreshToken && isAuthRoute(pathname)) {
    return NextResponse.redirect(new URL("/project-selection", req.url));
  }

  // 로그인 + 프로젝트 미선택 → 대시보드 등 접근 차단
  if (hasRefreshToken && !hasSelectedProject && isDashboardRoute(pathname)) {
    return NextResponse.redirect(new URL("/project-selection", req.url));
  }

  return NextResponse.next();
}

function isProtectedRoute(pathname: string) {
  return ["/dashboard", "/profile", "/project-selection"].some((route) =>
    pathname.startsWith(route),
  );
}

function isDashboardRoute(pathname: string) {
  return ["/dashboard", "/profile"].some((route) => pathname.startsWith(route));
}

function isAuthRoute(pathname: string) {
  return ["/sign-in", "/sign-up"].includes(pathname);
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/profile/:path*",
    "/project-selection",
    "/sign-in",
    "/sign-up",
  ],
};
