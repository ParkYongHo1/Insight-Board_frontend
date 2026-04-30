import { AxiosError } from "axios";

export interface Project {
  id: string;
  name: string;
  description: string;
  role: "ADMIN" | "VIEWER";
}

export interface LoginData {
  accessToken: string;
  accessTokenExpiresAt: string;
  email: string;
  name: string;
  companyName: string;
  projectList: Project[];
}

export interface SignInResponse {
  accessToken: string;
  accessTokenExpiresAt: string;
  email: string;
  name: string;
  companyName: string;
  projectList: Project[];
}
export interface ApiErrorResponse {
  message: string;
  error?: string;
  statusCode?: number;
}

export type ApiError = AxiosError<ApiErrorResponse>;
