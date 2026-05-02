import { Project } from "@/app/store/session";

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
