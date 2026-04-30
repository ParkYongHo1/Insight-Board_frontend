import { UseMutationCallbacks } from "@/app/shared/types";
import { ApiError } from "../types";
import { useMutation } from "@tanstack/react-query";
import { signOut } from "../api";
import useUserStore from "@/app/store/session";
export function useSignOut(callbacks?: UseMutationCallbacks<void, ApiError>) {
  return useMutation<void, ApiError>({
    mutationFn: signOut,
    onSuccess: () => {
      useUserStore.getState().clearSession();
      callbacks?.onSuccess?.();
    },
    onError: (error) => {
      useUserStore.getState().clearSession();
      callbacks?.onError?.(error);
    },
  });
}
