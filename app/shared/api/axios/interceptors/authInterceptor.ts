import { AxiosResponse, AxiosError, InternalAxiosRequestConfig } from "axios";
import { publicClient, authClient } from "../base";
import useUserStore from "@/app/store/session";
import { ApiResponse } from "@/app/shared/types";

authClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const { accessToken } = useUserStore.getState();
    console.log(accessToken);

    if (!accessToken) {
      return Promise.reject(new Error("액세스 토큰이 없습니다."));
    }

    config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
  },
  (error) => Promise.reject(error),
);
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value: unknown) => void;
  reject: (reason?: unknown) => void;
}> = [];

const processQueue = (error: unknown = null) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) reject(error);
    else resolve(null);
  });
  failedQueue = [];
};

authClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError<ApiResponse<unknown>>) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(() => authClient(originalRequest))
          .catch((e) => Promise.reject(e));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const res = await publicClient.post("/api/auth/refresh");
        const { accessToken, accessTokenExpiresAt } = res.data;

        useUserStore.getState().setSession({
          user: useUserStore.getState().user!,
          accessToken,
          accessTokenExpiresAt,
        });

        processQueue(null);

        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return authClient(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError);
        useUserStore.getState().clearSession();

        if (typeof window !== "undefined") {
          window.location.href = "/sign-in";
        }
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }
    const errorData = error.response?.data || {
      status: error.response?.status || 500,
      message: error.message || "서버 연결에 실패했습니다.",
      data: null,
    };

    return Promise.reject(errorData);
  },
);
