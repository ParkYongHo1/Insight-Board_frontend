"use client";

import { useEffect } from "react";
import { publicClient } from "../api/axios/base";
import useUserStore from "@/app/store/session";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const isLoaded = useUserStore((state) => state.isLoaded);

  // 앱 초기화 또는 새로고침 시 세션 복구 시도
  useEffect(() => {
    const initAuth = async () => {
      try {
        const res = await publicClient.post("/api/auth/refresh");

        const { accessToken, accessTokenExpiresAt } = res.data;
        const currentUser = useUserStore.getState().user;
        if (accessToken) {
          if (currentUser) {
            useUserStore.getState().setSession({
              user: currentUser,
              accessToken,
              accessTokenExpiresAt,
            });
          } else {
            useUserStore.getState().clearSession();
          }
        }
      } catch {
        await fetch("/api/auth/logout", { method: "POST" });
        useUserStore.getState().clearSession();
        window.location.href = "/sign-in";
      } finally {
        useUserStore.getState().setLoaded();
      }
    };

    initAuth();
  }, []);

  // 1분마다 토큰 만료 체크 및 자동 갱신 시도
  useEffect(() => {
    const checkAndRefresh = async () => {
      const { accessToken, accessTokenExpiresAt } = useUserStore.getState();
      if (!accessToken) return;

      const now = Math.floor(Date.now() / 1000);
      const remaining = Number(accessTokenExpiresAt) - now;

      if (remaining < 60) {
        try {
          const res = await publicClient.post("/api/auth/refresh");
          const { accessToken: newToken, accessTokenExpiresAt: newExpiresAt } =
            res.data;
          useUserStore.getState().setSession({
            user: useUserStore.getState().user!,
            accessToken: newToken,
            accessTokenExpiresAt: newExpiresAt,
          });
        } catch {
          await fetch("/api/auth/logout", { method: "POST" });
          useUserStore.getState().clearSession();
          window.location.href = "/sign-in";
        }
      }
    };

    const interval = setInterval(checkAndRefresh, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!isLoaded) {
    return null;
  }

  return <>{children}</>;
}
