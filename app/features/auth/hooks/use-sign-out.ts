import { ApiError, UseMutationCallbacks } from "@/app/shared/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signOut } from "../api";
import useUserStore from "@/app/store/session";
export function useSignOut(callbacks?: UseMutationCallbacks<void, ApiError>) {
  const queryClient = useQueryClient();
  return useMutation<void, ApiError>({
    mutationFn: signOut,
    onSuccess: () => {
      useUserStore.getState().clearSession();
      queryClient.clear();
      callbacks?.onSuccess?.();
    },
    onError: (error) => {
      useUserStore.getState().clearSession();
      callbacks?.onError?.(error);
    },
  });
}
