import { authClient } from "@/app/shared/api/axios/client";

export interface UpdateThemeResponse {
  message: string;
  interestTheme: string;
}

/**
 * 1. 유저 이름 변경 API
 */
export async function updateName(
  name: string,
): Promise<{ message: string; name: string }> {
  const res = await authClient.patch("/api/user/name", { name });
  return res.data as { message: string; name: string };
}

/**
 * 2. 유저 비밀번호 변경 API
 */
export async function updatePassword(
  newPassword: string,
  confirmPassword: string,
): Promise<{ message: string }> {
  const res = await authClient.patch("/api/user/password", {
    newPassword,
    confirmPassword,
  });
  return res.data as { message: string };
}

/**
 * 3. 유저 관심 분석 테마 변경 API (새로 추가)
 */
export async function updateTheme(
  interestTheme: string,
): Promise<UpdateThemeResponse> {
  const res = await authClient.patch<UpdateThemeResponse>("/api/user/theme", {
    interestTheme,
  });
  return res.data;
}
