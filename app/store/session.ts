"use client";

import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

export interface User {
  email: string;
  name: string;
}

interface UserState {
  isLoaded: boolean;
  user: User | null;
  accessToken: string | null;
  accessTokenExpiresAt: string | null;

  setSession: (loginData: {
    user: User;
    accessToken: string;
    accessTokenExpiresAt: string;
  }) => void;
  updateToken: (accessToken: string, accessTokenExpiresAt: string) => void;
  setLoaded: () => void;
  clearSession: () => void;
}

const useUserStore = create<UserState>()(
  devtools(
    persist(
      (set) => ({
        isLoaded: false,
        user: null,
        accessToken: null,
        accessTokenExpiresAt: null,

        setSession: ({ user, accessToken, accessTokenExpiresAt }) =>
          set({ user, accessToken, accessTokenExpiresAt, isLoaded: true }),

        updateToken: (accessToken, accessTokenExpiresAt) =>
          set((state) => ({ ...state, accessToken, accessTokenExpiresAt })),

        setLoaded: () => set({ isLoaded: true }),

        clearSession: () => {
          set({
            user: null,
            accessToken: null,
            accessTokenExpiresAt: null,
            isLoaded: true,
          });
        },
      }),
      {
        name: "user-storage",
        partialize: (state) => ({
          user: state.user,
          accessToken: state.accessToken,
          accessTokenExpiresAt: state.accessTokenExpiresAt,
        }),
        onRehydrateStorage: () => (state) => {
          if (state) {
            state.setLoaded();
          }
        },
      },
    ),
    { name: "UserStore" },
  ),
);

export const useUser = () => useUserStore((state) => state.user);
export const useAccessToken = () => useUserStore((state) => state.accessToken);
export const useIsLoggedIn = () => useUserStore((state) => !!state.user);
export const useIsSessionLoaded = () => useUserStore((state) => state.isLoaded);

export const useAuthActions = () => {
  const { setSession, updateToken, clearSession, setLoaded } = useUserStore();

  return {
    setSession,
    updateToken,
    clearSession,
    setLoaded,
  };
};

export default useUserStore;
