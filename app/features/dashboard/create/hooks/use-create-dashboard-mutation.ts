import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ApiError, UseMutationCallbacks } from "@/app/shared/types";
import { createDashboard } from "../../api";
import { DashboardDto } from "../../model/type";

// 🚀 projectId 매개변수 전면 제거
export function useCreateDashboardMutation(
  callbacks?: UseMutationCallbacks<void, ApiError>,
) {
  const queryClient = useQueryClient();

  return useMutation<void, ApiError, Omit<DashboardDto, "id" | "createdAt">>({
    mutationFn: (data) => createDashboard(data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["dashboards"] });
      callbacks?.onSuccess?.(data);
    },
    onError: (error) => {
      callbacks?.onError?.(error);
    },
  });
}
