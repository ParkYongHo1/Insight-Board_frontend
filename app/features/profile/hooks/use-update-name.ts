import { ApiError, UseMutationCallbacks } from "@/app/shared/types";
import { useMutation } from "@tanstack/react-query";
import { updateName } from "../api";

export function useUpdateName(
  callbacks?: UseMutationCallbacks<{ message: string; name: string }, ApiError>,
) {
  return useMutation<{ message: string; name: string }, ApiError, string>({
    mutationFn: updateName,
    onSuccess: (data) => callbacks?.onSuccess?.(data),
    onError: (error) => callbacks?.onError?.(error),
  });
}
