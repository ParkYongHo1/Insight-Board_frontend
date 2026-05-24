import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ApiError, UseMutationCallbacks } from "@/app/shared/types";
import { deleteDashboard } from "../../api";

// 🚀 projectId 매개변수 전면 제거
export function useDeleteDashboardMutation(
  callbacks?: UseMutationCallbacks<void, ApiError>,
) {
  const queryClient = useQueryClient();

  return useMutation<void, ApiError, number>({
    mutationFn: (dashboardId: number) => deleteDashboard(dashboardId),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["dashboards"] });
      callbacks?.onSuccess?.(data);
    },
    onError: (error) => {
      callbacks?.onError?.(error);
    },
  });
}
