import { useMutation } from "@tanstack/react-query";
import { updateTheme, UpdateThemeResponse } from "../api";
import { ApiError, UseMutationCallbacks } from "@/app/shared/types";
import useUserStore from "@/app/store/session"; // 🚀 Zustand 스토어 임포트

export function useUpdateTheme(
  callbacks?: UseMutationCallbacks<UpdateThemeResponse, ApiError>,
) {
  return useMutation<UpdateThemeResponse, ApiError, string>({
    mutationFn: (interestTheme: string) => updateTheme(interestTheme),

    onSuccess: (data: UpdateThemeResponse) => {
      const currentUser = useUserStore.getState().user;
      const accessToken = useUserStore.getState().accessToken;
      const accessTokenExpiresAt = useUserStore.getState().accessTokenExpiresAt;

      if (currentUser && accessToken && accessTokenExpiresAt) {
        useUserStore.getState().setSession({
          user: {
            ...currentUser,
            interestTheme: data.interestTheme,
          },
          accessToken,
          accessTokenExpiresAt,
        });
      }

      callbacks?.onSuccess?.(data);
    },
    onError: (error) => {
      callbacks?.onError?.(error);
    },
  });
}
