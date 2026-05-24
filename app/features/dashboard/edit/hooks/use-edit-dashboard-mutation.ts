import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ApiError, UseMutationCallbacks } from "@/app/shared/types";
import { updateDashboard } from "../../api";
import { DashboardDto } from "../../model/type";

export function useEditDashboardMutation(
  dashboardId: number,
  callbacks?: UseMutationCallbacks<void, ApiError>,
) {
  const queryClient = useQueryClient();

  return useMutation<void, ApiError, Partial<DashboardDto>>({
    mutationFn: (data) => updateDashboard({ dashboardId, data }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["dashboards"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard", dashboardId] });
      callbacks?.onSuccess?.(data);
    },
    onError: (error) => {
      callbacks?.onError?.(error);
    },
  });
}
