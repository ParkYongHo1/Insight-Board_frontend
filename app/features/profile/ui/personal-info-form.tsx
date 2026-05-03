"use client";

import useUserStore, { useUser } from "@/app/store/session";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import ProfileInput from "@/widgets/profile/ui/profile-input";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { useUpdateName } from "../hooks/use-update-name";
import { useUpdatePassword } from "../hooks/use-update-password";
import { Eye, EyeOff } from "lucide-react";

const PersonalInfoForm = () => {
  const user = useUser();

  const [userName, setUserName] = useState(user?.name ?? "");
  const [passwords, setPasswords] = useState({ new: "", confirm: "" });
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const passwordError = useMemo(() => {
    if (passwords.confirm && passwords.new !== passwords.confirm) {
      return "비밀번호가 일치하지 않습니다.";
    }
    return "";
  }, [passwords.new, passwords.confirm]);

  const { mutate: updateName, isPending: isPendingName } = useUpdateName({
    onSuccess: (data) => {
      const currentUser = useUserStore.getState().user;
      if (currentUser) {
        useUserStore.getState().setSession({
          user: { ...currentUser, name: data.name },
          accessToken: useUserStore.getState().accessToken!,
          accessTokenExpiresAt: useUserStore.getState().accessTokenExpiresAt!,
        });
      }
      toast.success("이름이 변경되었습니다.", { position: "top-center" });
    },
    onError: (error) => {
      toast.error(error?.message || "이름 변경에 실패했습니다.", {
        position: "top-center",
      });
    },
  });

  const { mutate: updatePassword, isPending: isPendingPassword } =
    useUpdatePassword({
      onSuccess: () => {
        setPasswords({ new: "", confirm: "" });
        toast.success("비밀번호가 변경되었습니다.", { position: "top-center" });
      },
      onError: (error) => {
        toast.error(error?.message || "비밀번호 변경에 실패했습니다.", {
          position: "top-center",
        });
      },
    });

  if (!user) return null;

  return (
    <section className="space-y-10">
      <h2 className="text-2xl font-bold border-b pb-6 text-[#191f28]">
        개인 정보 설정
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        <div className="md:col-span-2 text-sm font-bold text-zinc-500">
          기본 정보
        </div>
        <div className="md:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          <ProfileInput
            id="company"
            label="소속 기업"
            value={user.companyName}
            disabled
          />
          <ProfileInput
            id="email"
            label="이메일 주소"
            value={user.email}
            disabled
          />
        </div>
        <div className="hidden md:block md:col-span-2" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        <div className="md:col-span-2 text-sm font-bold text-zinc-500">
          이름
        </div>
        <div className="md:col-span-8">
          <ProfileInput
            id="name"
            label="이름"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
        <Button
          onClick={() => updateName(userName)}
          disabled={isPendingName || !userName.trim() || userName === user.name}
          className="md:col-span-2 h-14 bg-[#191f28] hover:bg-black text-white rounded-2xl font-bold transition-all disabled:opacity-50"
        >
          {isPendingName ? "변경 중..." : "변경"}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        <div className="md:col-span-2 text-sm font-bold text-zinc-500">
          비밀번호
        </div>
        <div className="md:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <ProfileInput
              id="new"
              label="새 비밀번호"
              type={showNewPassword ? "text" : "password"}
              value={passwords.new}
              onChange={(e) =>
                setPasswords({ ...passwords, new: e.target.value })
              }
            />
            {passwords.new && (
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 transition-colors"
                tabIndex={-1}
              >
                {showNewPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            )}
          </div>
          <div className="relative">
            <ProfileInput
              id="conf"
              label="비밀번호 확인"
              type={showConfirmPassword ? "text" : "password"}
              value={passwords.confirm}
              error={passwordError}
              onChange={(e) =>
                setPasswords({ ...passwords, confirm: e.target.value })
              }
            />
            {passwords.confirm && (
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 transition-colors"
                tabIndex={-1}
              >
                {showConfirmPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            )}
          </div>
        </div>
        <Button
          onClick={() =>
            updatePassword({
              newPassword: passwords.new,
              confirmPassword: passwords.confirm,
            })
          }
          disabled={
            isPendingPassword ||
            !!passwordError ||
            !passwords.new ||
            !passwords.confirm
          }
          className={cn(
            "md:col-span-2 h-14 rounded-2xl font-bold transition-all",
            passwordError || !passwords.new
              ? "bg-zinc-100 text-zinc-400 cursor-not-allowed"
              : "bg-[#3182f6] hover:bg-[#1b64da] text-white",
          )}
        >
          {isPendingPassword ? "저장 중..." : "저장"}
        </Button>
      </div>
    </section>
  );
};

export default PersonalInfoForm;
