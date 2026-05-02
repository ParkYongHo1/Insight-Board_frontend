import { authClient } from "@/app/shared/api/axios/client";

export interface TeamMember {
  id: number;
  name: string;
  email: string;
  role: string;
  status: "ACTIVE" | "PENDING";
}

export interface InviteMemberParams {
  email: string;
  role: string;
  projectId?: number;
}
export async function getProjectMembers(
  projectId: string,
): Promise<TeamMember[]> {
  const res = await authClient.get(`/api/project/${projectId}/members`);
  return res.data as TeamMember[];
}

export async function inviteMember(
  params: InviteMemberParams[],
): Promise<void> {
  await authClient.post("/api/auth/invite", params);
}
