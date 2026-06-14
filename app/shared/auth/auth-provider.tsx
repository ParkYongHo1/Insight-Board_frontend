"use client";

import { useEffect } from "react";
import { publicClient } from "../api/axios/base";
import useUserStore from "@/app/store/session";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const isLoaded = useUserStore((state) => state.isLoaded);

  useEffect(() => {
    const initAuth = async () => {
      try {
        const res = await publicClient.post("/api/auth/refresh");
        const { accessToken, accessTokenExpiresAt } = res.data;
        const currentUser = useUserStore.getState().user;

        if (accessToken && currentUser) {
          useUserStore.getState().setSession({
            user: currentUser,
            accessToken,
            accessTokenExpiresAt,
          });
        } else {
          useUserStore.getState().clearSession();
        }
      } catch {
        useUserStore.getState().clearSession();
      } finally {
        useUserStore.getState().setLoaded();
      }
    };

    initAuth();
  }, []);

  if (!isLoaded) return null;

  return <>{children}</>;
}
