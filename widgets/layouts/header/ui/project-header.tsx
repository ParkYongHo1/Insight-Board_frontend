"use client";

import Link from "next/link";
import { useState } from "react";
import { User, LogOut, ChevronDown, Menu, X } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const ProjectHeader = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const user = {
    name: "박용호",
    companyName: "현대캐피탈",
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-[#eff1f3]">
      <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="text-xl font-bold tracking-tighter text-[#191f28] hover:opacity-80 transition-opacity"
        >
          Insight Board
        </Link>

        <div className="hidden md:flex items-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="flex items-center gap-2 px-3 h-10 hover:bg-[#f2f4f6] rounded-xl transition-all group"
              >
                <div className="w-7 h-7 bg-[#191f28] rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
                <span className="text-[#4e5968] text-sm font-bold group-hover:text-[#191f28]">
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

              <DropdownMenuItem className="rounded-xl cursor-pointer py-3 text-[#f04452] focus:text-[#f04452] focus:bg-[#fdf2f3] mt-1">
                <LogOut className="w-4 h-4 mr-2" />
                <span className="text-sm font-bold">로그아웃</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <button
          className="md:hidden p-2 text-[#191f28]"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
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
            <Button
              variant="ghost"
              className="justify-start px-4 h-12 text-[#f04452] font-bold hover:bg-[#fdf2f3] rounded-xl w-full"
            >
              <LogOut className="w-5 h-5 mr-3" /> 로그아웃
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default ProjectHeader;
