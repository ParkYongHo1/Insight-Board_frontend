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
  await authClient.post("/api/auth/invite", params, { timeout: 30000 });
}

export async function patchMemberRole({
  memberId,
  newRole,
}: {
  memberId: number;
  newRole: string;
}): Promise<void> {
  await authClient.patch(`/api/user/${memberId}/role`, { role: newRole });
}

export async function removeMember(memberId: number): Promise<void> {
  await authClient.delete(`/api/user/${memberId}`);
}

export async function updateName(
  name: string,
): Promise<{ message: string; name: string }> {
  const res = await authClient.patch("/api/user/name", { name });
  return res.data as { message: string; name: string };
}

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
