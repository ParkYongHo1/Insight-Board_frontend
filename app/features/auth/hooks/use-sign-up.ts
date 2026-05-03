import { useMutation } from "@tanstack/react-query";
import { signUp, SignUpParams } from "../api";
import { ApiError, UseMutationCallbacks } from "@/app/shared/types";
import useUserStore from "@/app/store/session";
import { SignInResponse } from "../types";

export function useSignUp(
  callbacks?: UseMutationCallbacks<SignInResponse, ApiError>,
) {
  return useMutation<SignInResponse, ApiError, SignUpParams>({
    mutationFn: (params: SignUpParams) => signUp(params),
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
