import { ApiError, UseMutationCallbacks } from "@/app/shared/types";
import { useMutation } from "@tanstack/react-query";
import { removeMember } from "../api";

export function useRemoveMember(
  callbacks?: UseMutationCallbacks<void, ApiError>,
) {
  return useMutation<void, ApiError, number>({
    mutationFn: removeMember,
    onSuccess: () => {
      callbacks?.onSuccess?.();
    },
    onError: (error) => {
      callbacks?.onError?.(error);
    },
  });
}
