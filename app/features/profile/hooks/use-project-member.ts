import { useQuery } from "@tanstack/react-query";
import { useSelectedProjectId } from "@/app/store/session";
import { getProjectMembers, TeamMember } from "../api";
import { ApiError, UseQueryCallbacks } from "@/app/shared/types";

export function useProjectMembers(callbacks?: UseQueryCallbacks<TeamMember[]>) {
  const selectedProjectId = useSelectedProjectId();

  return useQuery<TeamMember[], ApiError>({
    queryKey: ["project-members", selectedProjectId],
    queryFn: () => getProjectMembers(selectedProjectId!),
    enabled: !!selectedProjectId,
    select: (data) => {
      callbacks?.onSuccess?.(data);
      return data;
    },
    throwOnError: (error) => {
      callbacks?.onError?.(error);
      return false;
    },
  });
}
