import { AxiosResponse, AxiosError } from "axios";
import { publicClient } from "../base";
import { ApiResponse } from "@/app/shared/types";

publicClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError<ApiResponse<unknown>>) => {
    const errorData = error.response?.data || {
      status: error.response?.status || 500,
      message: error.message || "서버 연결에 실패했습니다.",
    };
    return Promise.reject(errorData);
  },
);
