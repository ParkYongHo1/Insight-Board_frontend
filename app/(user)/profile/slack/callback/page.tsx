"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { authClient } from "@/app/shared/api/axios/client";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export default function SlackCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const code = searchParams.get("code");
    const error = searchParams.get("error");

    if (error) {
      toast.error("Slack 연동이 취소되었습니다.");
      router.push("/profile");
      return;
    }

    if (!code) {
      toast.error("잘못된 접근입니다.");
      router.push("/profile");
      return;
    }

    const connect = async () => {
      try {
        await authClient.post("/api/user/slack/connect", { code });
        toast.success("Slack 연동이 완료되었습니다!");
      } catch {
        toast.error("Slack 연동에 실패했습니다.");
      } finally {
        router.push("/profile");
      }
    };

    void connect();
  }, [searchParams, router]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
      <p className="text-zinc-500 font-medium">Slack 연동 처리 중...</p>
    </div>
  );
}
