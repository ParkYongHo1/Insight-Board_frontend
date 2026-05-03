import { ApiError, UseMutationCallbacks } from "@/app/shared/types";
import { useMutation } from "@tanstack/react-query";
import { updatePassword } from "../api";

export function useUpdatePassword(
  callbacks?: UseMutationCallbacks<{ message: string }, ApiError>,
) {
  return useMutation<
    { message: string },
    ApiError,
    { newPassword: string; confirmPassword: string }
  >({
    mutationFn: ({ newPassword, confirmPassword }) =>
      updatePassword(newPassword, confirmPassword),
    onSuccess: (data) => callbacks?.onSuccess?.(data),
    onError: (error) => callbacks?.onError?.(error),
  });
}
