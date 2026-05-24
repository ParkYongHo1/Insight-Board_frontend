"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { ArrowRight, Loader2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { useSignIn } from "../hooks/use-sign-in";
import { useRouter } from "next/navigation";

const SignInForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const router = useRouter();
  const { mutate: signIn, isPending } = useSignIn({
    onSuccess: (data) => {
      const { name } = data;
      toast.success(`${name}님 반갑습니다!`, {
        position: "top-center",
      });

      router.push("/");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "로그인에 실패했습니다.", {
        position: "top-center",
      });
      setEmail("");
      setPassword("");
    },
  });

  const handleSignInClick = () => {
    if (!email.trim() || !password.trim()) {
      toast.warning("정보를 모두 입력해주세요.");
      return;
    }
    signIn({ email, password });
  };

  const handleDemoSignIn = () => {
    const demoData = {
      email: "admin@test.com",
      password: "password1234",
    };

    signIn(demoData);
  };

  return (
    <div className="w-full max-w-md space-y-8 bg-white p-2">
      <div className="text-center space-y-2">
        <Link href="/" className="">
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 my-2">
            Insight Board
          </h1>
        </Link>
        <p className="text-sm text-zinc-500">
          서비스 이용을 위해 로그인해주세요.
        </p>
      </div>

      <div className="space-y-6">
        <div className="relative">
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onFocus={() => setFocusedField("email")}
            onBlur={() => setFocusedField(null)}
            required
            disabled={isPending}
            className={cn(
              "h-14 px-5 py-4 transition-all duration-200",
              "focus-visible:ring-0 focus-visible:ring-offset-0 outline-none",
              focusedField === "email" ? "border-blue-500" : "border-zinc-200",
            )}
          />
          <Label
            htmlFor="email"
            className={cn(
              "absolute left-5 px-1 transition-all duration-200 pointer-events-none bg-white font-normal",
              focusedField === "email" || email
                ? "top-0 -translate-y-1/2 text-xs text-blue-500 font-medium"
                : "top-1/2 -translate-y-1/2 text-zinc-400 text-sm",
            )}
          >
            이메일 주소
          </Label>
        </div>

        <div className="relative">
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onFocus={() => setFocusedField("password")}
            onBlur={() => setFocusedField(null)}
            required
            disabled={isPending}
            className={cn(
              "h-14 px-5 py-4 transition-all duration-200",
              "focus-visible:ring-0 focus-visible:ring-offset-0 outline-none",
              focusedField === "password"
                ? "border-blue-500 "
                : "border-zinc-200",
            )}
          />
          <Label
            htmlFor="password"
            className={cn(
              "absolute left-5 px-1 transition-all duration-200 pointer-events-none bg-white font-normal",
              focusedField === "password" || password
                ? "top-0 -translate-y-1/2 text-xs text-blue-500 font-medium"
                : "top-1/2 -translate-y-1/2 text-zinc-400 text-sm",
            )}
          >
            비밀번호
          </Label>
        </div>

        <Button
          onClick={handleSignInClick}
          disabled={isPending}
          className="w-full h-14 bg-black hover:bg-zinc-800 text-white rounded-lg group transition-all cursor-pointer"
        >
          {isPending ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <div className="flex items-center justify-center gap-2 font-semibold text-base">
              <span>로그인</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </div>
          )}
        </Button>
      </div>

      {/* 🚀 하단 링크 영역 고도화 */}
      <div className="space-y-5 text-center pt-2">
        <Button
          onClick={handleDemoSignIn}
          variant="link"
          className="group mx-auto h-auto p-0 text-sm text-zinc-500 hover:text-zinc-900 no-underline hover:no-underline cursor-pointer"
        >
          <span>데모버전 로그인</span>
          <ArrowRight className="ml-1 w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Button>

        {/* 얇은 시각적 구분선 */}
        <div className="relative flex items-center justify-center">
          <div className="absolute w-full border-t border-zinc-100"></div>
          <span className="relative bg-white px-3 text-[11px] font-bold text-zinc-300 uppercase tracking-wider">
            OR
          </span>
        </div>

        <div className="text-xs text-zinc-400 flex flex-col items-center gap-1.5">
          <Link
            href="/sign-up"
            className="group inline-flex items-center gap-1 text-blue-600 font-semibold hover:text-blue-700 hover:underline transition-colors cursor-pointer"
          >
            <span>회원가입하기</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignInForm;
