import { authClient } from "@/app/shared/api/axios/client";
import { DashboardDto } from "../model/type";

/**
 * 🚀 대시보드 생성
 * 더 이상 컴포넌트단에서 projectId를 넘겨받지 않으므로, data만 깔끔하게 보냅니다.
 * (필요시 백엔드에서 세션 정보를 바탕으로 생성하거나 고정 엔드포인트로 처리)
 */
export const createDashboard = async (
  data: Omit<DashboardDto, "id" | "createdAt">,
) => {
  const response = await authClient.post("/api/dashboard", data);
  return response.data;
};

/**
 * 🚀 전체 대시보드 목록 조회
 * 프로젝트 아이디 없이 현재 로그인한 유저의 대시보드를 바로 가져옵니다.
 * DashboardListPage의 useQuery 함수 호출부와 완벽히 싱크가 맞습니다.
 */
export const getDashboards = async () => {
  const response = await authClient.get("/api/dashboard");
  return response.data;
};

/**
 * 🚀 대시보드 상세 조회
 */
export const getDashboardDetail = async (dashboardId: number) => {
  const response = await authClient.get(`/api/dashboard/${dashboardId}`);
  return response.data;
};

/**
 * 🚀 대시보드 수정
 */
export const updateDashboard = async ({
  dashboardId,
  data,
}: {
  dashboardId: number;
  data: Partial<DashboardDto>;
}) => {
  const response = await authClient.patch(
    `/api/dashboard/${dashboardId}`,
    data,
  );
  return response.data;
};

/**
 * 🚀 대시보드 삭제
 */
export const deleteDashboard = async (dashboardId: number) => {
  const response = await authClient.delete(`/api/dashboard/${dashboardId}`);
  return response.data;
};
