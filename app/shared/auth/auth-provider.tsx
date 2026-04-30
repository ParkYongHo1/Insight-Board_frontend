"use client";

import { useEffect } from "react";
import { publicClient } from "../api/axios/base";
import useUserStore, { User } from "@/app/store/session";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const isLoaded = useUserStore((state) => state.isLoaded);

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
      } catch (error) {
        console.error("세션 복구 중 에러 발생:", error);
      } finally {
        useUserStore.getState().setLoaded();
      }
    };

    initAuth();
  }, []);

  if (!isLoaded) {
    return null;
  }

  return <>{children}</>;
}
