"use client";

import Link from "next/link";
import { useState } from "react";
import {
  User,
  ChevronDown,
  Menu,
  X,
  Settings,
  LayoutGrid,
  PlusCircle,
  BookOpen,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useUser } from "@/app/store/session";
import SignOutButton from "@/app/features/auth/ui/sign-out-button";

const UserHeader = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const user = useUser();

  if (!user) return null;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/75 backdrop-blur-lg border-b border-[#eff1f3] transition-all duration-300">
      <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* LEFT: 로고 및 내비게이션 */}
        <div className="flex items-center gap-8">
          <Link
            href="/"
            className="text-xl font-extrabold tracking-tighter bg-gradient-to-r from-[#191f28] to-[#4e5968] bg-clip-text text-transparent hover:opacity-80 transition-opacity flex items-center gap-1.5"
          >
            Insight Board
          </Link>

          <div className="hidden md:flex items-center gap-1">
            <Link href="/dashboard">
              <Button
                variant="ghost"
                className="h-10 px-4 text-[#4e5968] font-bold hover:text-[#3182f6] hover:bg-[#3182f6]/5 rounded-xl transition-all text-sm cursor-pointer"
              >
                대시보드 조회
              </Button>
            </Link>
            <Link href="/dashboard/new">
              <Button
                variant="ghost"
                className="h-10 px-4 text-[#4e5968] font-bold hover:text-[#3182f6] hover:bg-[#3182f6]/5 rounded-xl transition-all text-sm cursor-pointer"
              >
                대시보드 생성
              </Button>
            </Link>
            <Link
              href="/guide"
              className="text-sm font-bold text-zinc-500 hover:text-zinc-900 transition-colors"
            >
              <Button
                variant="ghost"
                className="h-10 px-4 text-[#4e5968] font-bold hover:text-[#3182f6] hover:bg-[#3182f6]/5 rounded-xl transition-all text-sm cursor-pointer"
              >
                주식 사전
              </Button>
            </Link>
          </div>
        </div>

        {/* RIGHT: 유저 정보 및 드롭다운 */}
        <div className="hidden md:flex items-center gap-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="flex items-center gap-2 px-3 h-11 hover:bg-[#f2f4f6] rounded-2xl transition-all group cursor-pointer"
              >
                <div className="w-7 h-7 bg-gradient-to-br from-[#323d4c] to-[#191f28] rounded-full flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
                  <User className="w-3.5 h-3.5 text-white" />
                </div>
                <span className="text-[#191f28] text-sm font-bold tracking-tight">
                  {user.name}님
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-[#8b95a1] group-data-[state=open]:rotate-180 transition-transform duration-200" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              align="end"
              sideOffset={6}
              className="w-56 rounded-2xl p-1.5 shadow-[0_12px_42px_rgba(0,0,0,0.08)] border-[#eff1f3] bg-white/95 backdrop-blur-md"
            >
              <div className="px-3 py-2.5 pb-1.5">
                <p className="text-[11px] font-semibold text-[#8b95a1] tracking-wider uppercase">
                  내 계정
                </p>
                <p className="text-xs font-bold text-[#333d4b] truncate mt-0.5">
                  {user.email}
                </p>
              </div>

              <DropdownMenuSeparator className="bg-[#f2f4f6] my-1" />

              <DropdownMenuItem
                asChild
                className="rounded-xl cursor-pointer py-2.5 text-[#4e5968] focus:text-[#191f28] focus:bg-[#f2f4f6] transition-colors"
              >
                <Link href="/profile" className="flex items-center w-full">
                  <Settings className="w-4 h-4 mr-2.5 text-[#8b95a1]" />
                  <span className="text-sm font-bold">계정 설정</span>
                </Link>
              </DropdownMenuItem>

              <DropdownMenuSeparator className="bg-[#f2f4f6] my-1" />

              <DropdownMenuItem className="p-0 focus:bg-transparent w-full block">
                <div className="w-full flex items-center gap-2 px-2 py-2 rounded-xl text-sm text-[#f04452] font-bold hover:bg-[#fdf2f3] focus:bg-[#fdf2f3] transition-colors">
                  <SignOutButton variant="desktop" />
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <Button
          variant="ghost"
          className="md:hidden p-2 text-[#191f28] hover:bg-[#f2f4f6] rounded-xl"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </Button>
      </nav>

      {/* MOBILE MENU */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-lg border-b border-[#eff1f3] px-5 py-5 animate-in slide-in-from-top-4 duration-200">
          <div className="flex items-center justify-between mb-5 px-1">
            <div className="flex flex-col">
              <span className="text-lg font-extrabold text-[#191f28]">
                {user.name}님
              </span>
              <span className="text-xs text-[#8b95a1] font-medium mt-0.5">
                {user.email}
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <Link
              href="/dashboard"
              className="w-full group"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <div className="flex items-center gap-3.5 px-4 h-14 text-[#191f28] hover:bg-[#f2f4f6] rounded-2xl transition-all">
                <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-blue-50 text-blue-600 transition-colors shrink-0">
                  <LayoutGrid className="w-4 h-4" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[14px] font-bold">대시보드 조회</span>
                  <span className="text-[11px] text-[#8b95a1] font-medium leading-none mt-0.5">
                    내 모니터링 보드 확인하기
                  </span>
                </div>
              </div>
            </Link>

            <Link
              href="/dashboard/new"
              className="w-full group"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <div className="flex items-center gap-3.5 px-4 h-14 text-[#191f28] hover:bg-[#f2f4f6] rounded-2xl transition-all">
                <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 transition-colors shrink-0">
                  <PlusCircle className="w-4 h-4" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[14px] font-bold">대시보드 생성</span>
                  <span className="text-[11px] text-[#8b95a1] font-medium leading-none mt-0.5">
                    새로운 모니터링 지표 개설
                  </span>
                </div>
              </div>
            </Link>
            <Link
              href="/guide"
              className="w-full group"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <div className="flex items-center gap-3.5 px-4 h-14 text-[#191f28] hover:bg-[#f2f4f6] rounded-2xl transition-all">
                <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 transition-colors shrink-0">
                  <BookOpen className="w-4 h-4" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[14px] font-bold">주식 사전</span>
                  <span className="text-[11px] text-[#8b95a1] font-medium leading-none mt-0.5">
                    용어 설명과 대시보드 활용 팁
                  </span>
                </div>
              </div>
            </Link>

            <Link
              href="/profile"
              className="w-full"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <div className="flex items-center px-4 h-14 text-[#4e5968] font-bold hover:bg-[#f2f4f6] rounded-2xl transition-all">
                <div className="flex items-center justify-center w-9 h-9 mr-0.5 rounded-xl bg-zinc-50 text-[#8b95a1] shrink-0">
                  <Settings className="w-4 h-4" />
                </div>
                <span className="text-[14px] ml-3.5 text-[#191f28]">
                  계정 설정
                </span>
              </div>
            </Link>

            <div className="h-px bg-[#eff1f3] my-2 mx-1" />

            <div className="w-full flex items-center gap-2 px-2 py-2 rounded-xl text-sm text-[#f04452] font-bold hover:bg-[#fdf2f3] focus:bg-[#fdf2f3] transition-colors">
              <SignOutButton variant="mobile" />
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default UserHeader;
