import { ApiError, UseMutationCallbacks } from "@/app/shared/types";
import { useMutation } from "@tanstack/react-query";
import { patchMemberRole } from "../api";

export function usePatchRole(callbacks?: UseMutationCallbacks<void, ApiError>) {
  return useMutation<void, ApiError, { memberId: number; newRole: string }>({
    mutationFn: patchMemberRole,
    onSuccess: () => {
      callbacks?.onSuccess?.();
    },
    onError: (error) => {
      callbacks?.onError?.(error);
    },
  });
}
