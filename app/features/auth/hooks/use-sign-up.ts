import { useMutation } from "@tanstack/react-query";
import { signUp, SignUpParams, signOut } from "../api";
import { ApiError, UseMutationCallbacks } from "@/app/shared/types";
import useUserStore from "@/app/store/session";
import { SignInResponse } from "../types";
import { toast } from "sonner";
import Cookies from "js-cookie";

export function useSignUp(
  callbacks?: UseMutationCallbacks<SignInResponse, ApiError>,
) {
  return useMutation<SignInResponse, ApiError, SignUpParams>({
    mutationFn: async (params: SignUpParams) => {
      const hasSession =
        useUserStore.getState().user !== null || !!Cookies.get("refreshToken");

      if (hasSession) {
        try {
          await signOut();
        } catch (error) {
          toast.error(`기존 세션 종료 중 오류가 발생했습니다. ${error}`);
        }
      }

      return signUp(params);
    },
    onSuccess: (data: SignInResponse) => {
      const { accessToken, accessTokenExpiresAt, ...user } = data;

      useUserStore.getState().clearSession();

      useUserStore.getState().setSession({
        user: {
          email: user.email,
          name: user.name,
          companyName: user.companyName,
          projectList: user.projectList,
        },
        accessToken,
        accessTokenExpiresAt,
      });

      callbacks?.onSuccess?.(data);
    },
    onError: (error) => {
      callbacks?.onError?.(error);
    },
  });
}
