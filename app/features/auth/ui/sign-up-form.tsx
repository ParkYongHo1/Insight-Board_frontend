"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, ArrowRight, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useSignUp } from "../hooks/use-sign-up";

export function SignUpForm() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");

  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const { mutate: signUp, isPending } = useSignUp({
    onSuccess: () => {
      toast.success("회원가입이 완료되었습니다!", {
        position: "top-center",
      });
      router.push("/dashboard");
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "회원가입에 실패했습니다.",
        { position: "top-center" },
      );
      setPassword("");
    },
  });

  const handleSignUpClick = () => {
    if (!email.trim() || !fullName.trim() || !password.trim()) {
      toast.warning("모든 정보를 입력해주세요.");
      return;
    }
    if (password.length < 8) {
      toast.warning("비밀번호는 8자리 이상이어야 합니다.");
      return;
    }

    signUp({
      email: email.trim(),
      name: fullName.trim(),
      password: password.trim(),
    });
  };

  const inputClassName =
    "h-14 px-5 py-4 transition-all duration-200 border-zinc-200 w-full";
  const focusedInputClassName = "border-blue-500 ring-1 ring-blue-500/10";
  const labelClassName =
    "absolute left-5 px-1 transition-all duration-200 pointer-events-none bg-white font-normal z-10";
  const focusedLabelClassName =
    "top-0 -translate-y-1/2 text-xs text-blue-500 font-medium";
  const defaultLabelClassName =
    "top-1/2 -translate-y-1/2 text-zinc-400 text-sm";

  const renderField = (
    id: "email" | "fullName" | "password",
    label: string,
    type: string,
    value: string,
    setter: (val: string) => void,
  ) => {
    const isPassword = id === "password";
    const isFocused = focusedField === id;

    return (
      <div className="relative group">
        <Input
          id={id}
          type={isPassword ? (showPassword ? "text" : "password") : type}
          value={value}
          onChange={(e) => setter(e.target.value)}
          onFocus={() => setFocusedField(id)}
          onBlur={() => setFocusedField(null)}
          required
          disabled={isPending}
          className={cn(
            inputClassName,
            isFocused && focusedInputClassName,
            isPassword && "pr-12",
          )}
        />
        <Label
          htmlFor={id}
          className={cn(
            labelClassName,
            isFocused || value ? focusedLabelClassName : defaultLabelClassName,
          )}
        >
          {label}
        </Label>

        {isPassword && value && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-zinc-400 hover:text-zinc-600 transition-colors"
            tabIndex={-1}
          >
            {showPassword ? (
              <EyeOff className="w-5 h-5" />
            ) : (
              <Eye className="w-5 h-5" />
            )}
          </button>
        )}
      </div>
    );
  };

  return (
    <div className="w-full max-w-md space-y-8 bg-white p-2">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900">
          Insight Board
        </h1>
        <p className="text-sm text-zinc-500">
          계정을 생성하고 나만의 맞춤형 통계 대시보드를 만나보세요.
        </p>
      </div>

      <div className="space-y-5">
        {renderField("email", "이메일 주소", "email", email, setEmail)}
        {renderField("fullName", "이름", "text", fullName, setFullName)}
        {renderField(
          "password",
          "비밀번호 (8자리 이상)",
          "password",
          password,
          setPassword,
        )}

        <Button
          onClick={handleSignUpClick}
          disabled={isPending}
          className="w-full h-14 bg-black hover:bg-zinc-800 text-white rounded-lg group transition-all mt-2 cursor-pointer"
        >
          {isPending ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <div className="flex items-center justify-center gap-2 font-semibold text-base">
              <span>계정 생성 및 시작하기</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </div>
          )}
        </Button>
      </div>
    </div>
  );
}
