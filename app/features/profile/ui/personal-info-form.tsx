"use client";

import useUserStore, { useUser } from "@/app/store/session";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import ProfileInput from "@/widgets/profile/ui/profile-input";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { useUpdateName } from "../hooks/use-update-name";
import { useUpdatePassword } from "../hooks/use-update-password";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useSlackConnect } from "../hooks/use-slack-connect";
import Image from "next/image"; // 👈 Next.js Image 컴포넌트 임포트 추가

const PersonalInfoForm = () => {
  const user = useUser();

  const [userName, setUserName] = useState(user?.name ?? "");
  const [passwords, setPasswords] = useState({ new: "", confirm: "" });
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    isConnected,
    isLoading: isSlackLoading,
    handleConnect,
    handleDisconnect,
  } = useSlackConnect();

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
          계정 정보
        </div>
        <div className="md:col-span-8">
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
          className="md:col-span-2 h-14 bg-[#191f28] hover:bg-black text-white rounded-2xl font-bold transition-all disabled:opacity-50 cursor-pointer"
        >
          {isPendingName ? "변경 중..." : "변경"}
        </Button>
      </div>

      {/* 비밀번호 변경 */}
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
            "md:col-span-2 h-14 rounded-2xl font-bold transition-all cursor-pointer",
            passwordError || !passwords.new
              ? "bg-zinc-100 text-zinc-400 cursor-not-allowed"
              : "bg-[#3182f6] hover:bg-[#1b64da] text-white",
          )}
        >
          {isPendingPassword ? "저장 중..." : "저장"}
        </Button>
      </div>

      {/* Slack 알림 연동 */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        <div className="md:col-span-2 text-sm font-bold text-zinc-500">
          알림 연동
        </div>
        <div className="md:col-span-8">
          <div className="flex items-center justify-between min-h-14 px-5 py-3 border border-zinc-200 rounded-2xl bg-white">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-8 h-8 bg-[#4A154B] rounded-lg flex items-center justify-center shrink-0">
                {/* 🚀 퍼블릭 폴더의 slack.svg 이미지 주소로 교체 */}
                <Image
                  src="/slack.svg"
                  alt="Slack Logo"
                  width={16}
                  height={16}
                />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-bold text-zinc-800">Slack 알림</p>
                <p className="text-xs text-zinc-400 truncate">
                  매수매력도 알림을 Slack DM으로 받으세요
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0 ml-4">
              {isSlackLoading ? (
                <Loader2 className="w-5 h-5 animate-spin text-zinc-400" />
              ) : isConnected ? (
                <>
                  <span className="text-xs font-bold text-green-500 bg-green-50 px-3 py-1.5 rounded-full border border-green-100 whitespace-nowrap">
                    ✓ 연동됨
                  </span>
                  <Button
                    onClick={handleDisconnect}
                    variant="ghost"
                    size="sm"
                    className="cursor-pointer text-zinc-400 hover:text-red-500 hover:bg-red-50 whitespace-nowrap font-medium"
                  >
                    연동 해제
                  </Button>
                </>
              ) : (
                <Button
                  onClick={handleConnect}
                  size="sm"
                  className="cursor-pointer h-9 px-5 bg-zinc-900 hover:bg-black text-white font-bold rounded-xl"
                >
                  {/* 💡 기존 오타(bg-whit) 수정 및 스타일 보정 */}
                  연동하기
                </Button>
              )}
            </div>
          </div>
        </div>
        <div className="hidden md:block md:col-span-2" />
      </div>
    </section>
  );
};

export default PersonalInfoForm;
