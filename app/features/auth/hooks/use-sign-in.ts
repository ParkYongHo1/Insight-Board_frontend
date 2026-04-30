import { useMutation } from "@tanstack/react-query";
import { signIn, SigninParams } from "../api";
import useUserStore, { useAuthActions } from "@/app/store/session";
import { UseMutationCallbacks } from "@/app/shared/types";
import { ApiError, SignInResponse } from "../types";

export function useSignIn(
  callbacks?: UseMutationCallbacks<SignInResponse, ApiError>,
) {
  const { setSession } = useAuthActions();

  return useMutation<SignInResponse, ApiError, SigninParams>({
    mutationFn: signIn,
    onSuccess: (data: SignInResponse) => {
      const { accessToken, accessTokenExpiresAt, ...user } = data;

      setSession({
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
