import { ApiError, UseMutationCallbacks } from "@/app/shared/types";
import { useMutation } from "@tanstack/react-query";
import { inviteMember, InviteMemberParams } from "../api";

export function useInviteMember(
  callbacks?: UseMutationCallbacks<void, ApiError>,
) {
  return useMutation<void, ApiError, InviteMemberParams[]>({
    mutationFn: inviteMember,
    onSuccess: () => {
      callbacks?.onSuccess?.();
    },
    onError: (error) => {
      callbacks?.onError?.(error);
    },
  });
}
