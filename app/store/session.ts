import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

// 1. 데이터 구조 정의 (Server Response DTO 기준)
export interface Project {
  id: string;
  name: string;
  description: string;
  role: "ADMIN" | "VIEWER";
}

export interface User {
  email: string;
  name: string;
  companyName: string;
  projectList: Project[];
}

// 2. 스토어 상태 및 액션 타입 정의
interface UserState {
  // 상태 (State)
  isLoaded: boolean;
  user: User | null;
  accessToken: string | null;
  accessTokenExpiresAt: string | null;

  // 액션 (Actions)
  setSession: (loginData: {
    user: User;
    accessToken: string;
    accessTokenExpiresAt: string;
  }) => void;
  updateToken: (accessToken: string, accessTokenExpiresAt: string) => void;
  setLoaded: () => void;
  clearSession: () => void;
}

// 3. 스토어 생성
// app/store/session.ts

const useUserStore = create<UserState>()(
  devtools(
    persist(
      (set) => ({
        isLoaded: false, // 초기값은 반드시 false
        user: null,
        accessToken: null,
        accessTokenExpiresAt: null,

        setSession: ({ user, accessToken, accessTokenExpiresAt }) =>
          set({ user, accessToken, accessTokenExpiresAt, isLoaded: true }),

        updateToken: (accessToken, accessTokenExpiresAt) =>
          set((state) => ({ ...state, accessToken, accessTokenExpiresAt })),

        setLoaded: () => set({ isLoaded: true }),

        clearSession: () =>
          set({
            user: null,
            accessToken: null,
            accessTokenExpiresAt: null,
            isLoaded: true,
          }),
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
  const setSession = useUserStore((state) => state.setSession);
  const updateToken = useUserStore((state) => state.updateToken);
  const clearSession = useUserStore((state) => state.clearSession);
  const setLoaded = useUserStore((state) => state.setLoaded);

  return { setSession, updateToken, clearSession, setLoaded };
};

export default useUserStore;
