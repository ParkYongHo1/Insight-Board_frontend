import { authClient, publicClient } from "@/app/shared/api/axios/client";
import { ApiResponse } from "@/app/shared/types";
import { SignInResponse } from "../types";

export interface SigninParams {
  email: string;
  password: string;
}
export interface SignUpParams {
  token: string;
  name: string;
  password: string;
}
export async function signIn(params: SigninParams): Promise<SignInResponse> {
  const res = await publicClient.post<SignInResponse>(
    `/api/auth/login`,
    params,
  );

  return res.data;
}
export async function signUp(params: SignUpParams): Promise<SignInResponse> {
  const res = await publicClient.post(`/api/auth/register`, params);
  return res.data;
}

export async function signOut(): Promise<void> {
  await authClient.post(`/api/auth/logout`);
}
