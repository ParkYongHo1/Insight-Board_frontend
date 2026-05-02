"use client";

import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import Cookies from "js-cookie";

export interface Project {
  id: string;
  name: string;
  description: string;
  role: "ADMIN" | "VIEWER";
  createdAt: string;
}

export interface User {
  email: string;
  name: string;
  companyName: string;
  projectList: Project[];
}

interface UserState {
  isLoaded: boolean;
  user: User | null;
  accessToken: string | null;
  accessTokenExpiresAt: string | null;
  selectedProjectId: string | null;

  setSession: (loginData: {
    user: User;
    accessToken: string;
    accessTokenExpiresAt: string;
  }) => void;
  updateToken: (accessToken: string, accessTokenExpiresAt: string) => void;
  setLoaded: () => void;
  clearSession: () => void;
  setSelectedProject: (projectId: string) => void;
}

const useUserStore = create<UserState>()(
  devtools(
    persist(
      (set) => ({
        isLoaded: false,
        user: null,
        accessToken: null,
        accessTokenExpiresAt: null,
        selectedProjectId: null,

        setSession: ({ user, accessToken, accessTokenExpiresAt }) =>
          set({
            user,
            accessToken,
            accessTokenExpiresAt,
            isLoaded: true,
          }),

        updateToken: (accessToken, accessTokenExpiresAt) =>
          set((state) => ({ ...state, accessToken, accessTokenExpiresAt })),

        setLoaded: () => set({ isLoaded: true }),

        setSelectedProject: (projectId: string) => {
          set({ selectedProjectId: projectId });

          Cookies.set("selectedProjectId", projectId, {
            expires: 7,
            path: "/",
            sameSite: "lax",
          });
        },

        clearSession: () => {
          Cookies.remove("selectedProjectId");

          set({
            user: null,
            accessToken: null,
            accessTokenExpiresAt: null,
            selectedProjectId: null,
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
          selectedProjectId: state.selectedProjectId,
        }),
        onRehydrateStorage: () => (state) => {
          if (state) {
            state.setLoaded();

            if (state.selectedProjectId) {
              Cookies.set("selectedProjectId", state.selectedProjectId, {
                expires: 7,
                path: "/",
              });
            }
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
export const useSelectedProjectId = () =>
  useUserStore((state) => state.selectedProjectId);

export const useAuthActions = () => {
  const {
    setSession,
    updateToken,
    clearSession,
    setLoaded,
    setSelectedProject,
  } = useUserStore();

  return {
    setSession,
    updateToken,
    clearSession,
    setLoaded,
    setSelectedProject,
  };
};

export default useUserStore;
