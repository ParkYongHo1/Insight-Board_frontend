"use client";

import Link from "next/link";
import { useState } from "react";
import {
  User,
  ChevronDown,
  Menu,
  X,
  Settings,
  RefreshCw,
  LayoutGrid,
  PlusCircle,
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
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-[#eff1f3]">
      <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link
            href="/"
            className="text-xl font-bold tracking-tighter text-[#191f28] hover:opacity-80 transition-opacity"
          >
            Insight Board
          </Link>
          <Link href="/dashboard/new">
            <Button
              variant="ghost"
              className="hidden md:flex h-10 px-0 text-[#6b7684] font-bold hover:text-[#191f28] hover:bg-transparent transition-colors text-sm cursor-pointer"
            >
              대시보드 생성
            </Button>
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-2">
          <Link
            href="/project-selection"
            className="flex items-center gap-2 px-3 h-10 text-[#4e5968] font-bold hover:bg-[#f2f4f6] rounded-xl transition-all"
          >
            <Button
              variant="ghost"
              className="flex items-center gap-2 px-3 h-10 text-[#4e5968] font-bold hover:bg-[#f2f4f6] rounded-xl transition-all cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
              <span className="text-sm">프로젝트 변경</span>
            </Button>
          </Link>
          <div className="w-px h-4 bg-[#eff1f3] mx-2" />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="flex items-center gap-2 px-3 h-10 hover:bg-[#f2f4f6] rounded-xl transition-all group cursor-pointer"
              >
                <div className="w-7 h-7 bg-[#191f28] rounded-full flex items-center justify-center shadow-sm">
                  <User className="w-4 h-4 text-white" />
                </div>
                <span className="text-[#191f28] text-sm font-bold">
                  {user.name}님
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-[#adb5bd]" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-56 rounded-2xl p-2 shadow-[0_10px_40px_rgba(0,0,0,0.08)] border-[#eff1f3] mt-2"
            >
              <div className="px-3 py-3 mb-1">
                <p className="text-[11px] font-bold text-[#3182f6] mb-0.5">
                  소속 기업
                </p>
                <p className="text-[14px] font-bold text-[#191f28]">
                  {user.companyName}
                </p>
              </div>

              <DropdownMenuSeparator className="bg-[#f2f4f6] mx-1" />

              <DropdownMenuItem
                asChild
                className="rounded-xl cursor-pointer py-3 text-[#4e5968] focus:text-[#191f28] focus:bg-[#f2f4f6] mt-1"
              >
                <Link href="/profile" className="flex items-center w-full">
                  <Settings className="w-4 h-4 mr-2" />
                  <span className="text-sm font-bold">계정 설정</span>
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem>
                <SignOutButton variant="desktop" />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <Button
          variant="ghost"
          className="md:hidden p-2 text-[#191f28]"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </Button>
      </nav>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-[#eff1f3] px-6 py-6 animate-in slide-in-from-top duration-200">
          <div className="flex flex-col gap-1 mb-6">
            <span className="text-[12px] text-[#3182f6] font-bold">
              {user.companyName}
            </span>
            <span className="text-xl font-bold text-[#191f28]">
              {user.name}님
            </span>
          </div>
          <div className="flex flex-col gap-2">
            <Link href="/dashboard/new" className="w-full group">
              <div className="flex items-center gap-4 px-4 h-16 text-[#191f28] hover:bg-[#f2f4f6] rounded-2xl transition-all active:scale-[0.98]">
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors shrink-0">
                  <PlusCircle className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[15px] font-bold">대시보드 생성</span>
                  <span className="text-[11px] text-[#8b95a1] font-medium leading-none mt-1">
                    새로운 대시보드 만들기
                  </span>
                </div>
              </div>
            </Link>

            <Link href="/project-selection" className="w-full group">
              <div className="flex items-center gap-4 px-4 h-16 text-[#191f28] hover:bg-[#f2f4f6] rounded-2xl transition-all active:scale-[0.98]">
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-[#f2f4f6] text-[#4e5968] group-hover:bg-[#e5e8eb] transition-colors shrink-0">
                  <LayoutGrid className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[15px] font-bold">프로젝트 변경</span>
                  <span className="text-[11px] text-[#8b95a1] font-medium leading-none mt-1">
                    다른 프로젝트로 이동
                  </span>
                </div>
              </div>
            </Link>
            <Link href="/profile" className="w-full">
              <div className="flex items-center px-4 h-14 text-[#4e5968] font-bold hover:bg-[#f2f4f6] rounded-2xl transition-all active:scale-[0.98]">
                <div className="flex items-center justify-center w-10 h-10 mr-4 text-[#8b95a1] shrink-0">
                  <Settings className="w-5 h-5" />
                </div>
                <span className="text-[15px]">계정 설정</span>
              </div>
            </Link>
            <div className="h-px bg-[#eff1f3] my-3 mx-2" />

            <SignOutButton variant="mobile" />
          </div>
        </div>
      )}
    </header>
  );
};

export default UserHeader;
