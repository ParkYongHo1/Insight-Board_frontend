"use client";

import { Button } from "@/components/ui/button";
import { UserPlus, Pencil, Trash2 } from "lucide-react";
import { InviteModal } from "./invite-modal";
import { EditRoleModal } from "./edit-role-modal";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useProjectMembers } from "../hooks/use-project-member";
import { useUser, useSelectedProjectId } from "@/app/store/session";
import { toast } from "sonner";
import { TeamMember } from "../api";
import { usePatchRole } from "../hooks/use-patch-role";
import { useRemoveMember } from "../hooks/use-remove-member";
import { useQueryClient } from "@tanstack/react-query";

const TeamMemberTable = () => {
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<TeamMember | null>(null);
  const { data: members = [], isLoading } = useProjectMembers();
  const user = useUser();
  const selectedProjectId = useSelectedProjectId();
  const queryClient = useQueryClient();

  const currentProjectRole = user?.projectList.find(
    (p) => p.id === selectedProjectId,
  )?.role;
  const isAdmin = currentProjectRole === "ADMIN";

  const handleAdminOnly = () => {
    if (!isAdmin) {
      toast.warning("관리자만 이용할 수 있는 기능입니다.", {
        position: "top-center",
      });
      return false;
    }
    return true;
  };

  const { mutate: patchRole, isPending: isPendingPatchRole } = usePatchRole({
    onSuccess: () => {
      toast.success("역할이 변경되었습니다.", { position: "top-center" });
      void queryClient.invalidateQueries({ queryKey: ["project-members"] });
      setEditTarget(null);
    },
    onError: (error) => {
      toast.error(error?.message || "역할 변경에 실패했습니다.", {
        position: "top-center",
      });
    },
  });

  const { mutate: removeMember } = useRemoveMember({
    onSuccess: () => {
      toast.success("팀원에서 제거되었습니다.", { position: "top-center" });
      void queryClient.invalidateQueries({ queryKey: ["project-members"] });
    },
    onError: (error) => {
      toast.error(error?.message || "팀원 제거에 실패했습니다.", {
        position: "top-center",
      });
    },
  });

  const handleEditRole = (member: TeamMember) => {
    if (!handleAdminOnly()) return;
    setEditTarget(member);
  };

  const handleRemoveMember = (member: TeamMember) => {
    if (!handleAdminOnly()) return;

    toast.custom(
      (t) => (
        <div className="bg-white rounded-2xl shadow-lg border border-[#eff1f3] p-5 w-80">
          <p className="text-sm font-bold text-[#191f28] mb-1">팀원 제거</p>
          <p className="text-sm text-[#4e5968] mb-4">
            {member.name} 님을 팀에서 제거할까요?
          </p>
          <div className="flex justify-end gap-2">
            <button
              onClick={() => toast.dismiss(t)}
              className="px-4 py-2 text-sm font-bold text-[#4e5968] bg-[#f2f4f6] hover:bg-[#e5e8eb] rounded-xl transition-colors"
            >
              취소
            </button>
            <button
              onClick={() => {
                removeMember(member.id);
                toast.dismiss(t);
              }}
              className="px-4 py-2 text-sm font-bold text-white bg-[#f04452] hover:bg-[#d63a47] rounded-xl transition-colors"
            >
              제거
            </button>
          </div>
        </div>
      ),
      { position: "top-center" },
    );
  };

  const handleRoleConfirm = (memberId: number, newRole: string) => {
    patchRole({ memberId, newRole });
  };

  return (
    <>
      <section className="pb-20">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold tracking-tight text-[#191f28]">
            팀원 관리
          </h2>
          {isAdmin && (
            <Button
              onClick={() => setIsInviteModalOpen(true)}
              className="bg-[#3182f6] hover:bg-[#1b64da] text-white rounded-xl h-12 font-bold px-6 transition-all"
            >
              <UserPlus className="w-4 h-4 mr-2" /> 팀원 초대
            </Button>
          )}
        </div>

        <div className="bg-white border border-[#eff1f3] rounded-[32px] overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left min-w-150">
              <thead className="bg-[#f9fafb] border-b border-[#eff1f3]">
                <tr>
                  <th className="px-8 py-5 text-xs font-bold text-[#8b95a1] uppercase">
                    이름
                  </th>
                  <th className="px-8 py-5 text-xs font-bold text-[#8b95a1] uppercase">
                    이메일
                  </th>
                  <th className="px-8 py-5 text-xs font-bold text-[#8b95a1] uppercase">
                    상태
                  </th>
                  <th className="px-8 py-5 text-xs font-bold text-[#8b95a1] uppercase">
                    역할
                  </th>
                  <th className="px-8 py-5 text-xs font-bold text-[#8b95a1] uppercase text-center">
                    수정
                  </th>
                  <th className="px-8 py-5 text-xs font-bold text-[#8b95a1] uppercase text-center">
                    삭제
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#eff1f3]">
                {isLoading ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-8 py-10 text-center text-sm text-[#8b95a1]"
                    >
                      불러오는 중...
                    </td>
                  </tr>
                ) : members.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-8 py-10 text-center text-sm text-[#8b95a1]"
                    >
                      팀원이 없습니다.
                    </td>
                  </tr>
                ) : (
                  members.map((member) => {
                    const isCurrentUser = member.email === user?.email;

                    return (
                      <tr
                        key={member.id}
                        className="hover:bg-[#f9fafb] transition-colors"
                      >
                        <td className="px-8 py-6 font-bold text-[#191f28]">
                          {member.name}
                          {isCurrentUser && (
                            <span className="ml-2 text-[10px] text-[#3182f6] font-black bg-[#e8f3ff] px-2 py-0.5 rounded-md">
                              나
                            </span>
                          )}
                        </td>
                        <td className="px-8 py-6 text-sm text-[#4e5968]">
                          {member.email}
                        </td>
                        <td className="px-8 py-6">
                          <span
                            className={cn(
                              "text-xs font-bold px-2.5 py-1 rounded-lg uppercase",
                              member.status === "ACTIVE"
                                ? "text-[#00d082] bg-[#e6faf2]"
                                : "text-[#f04452] bg-[#fff0f1]",
                            )}
                          >
                            {member.status}
                          </span>
                        </td>
                        <td className="px-8 py-6">
                          <span className="bg-[#f2f4f6] text-[#4e5968] px-3 py-1.5 rounded-lg text-[11px] font-black tracking-wider">
                            {member.role}
                          </span>
                        </td>
                        <td className="px-8 py-6 text-center">
                          <button
                            onClick={() => handleEditRole(member)}
                            disabled={isCurrentUser}
                            className={cn(
                              "p-2 rounded-xl transition-colors",
                              isCurrentUser
                                ? "text-[#d1d6db] cursor-not-allowed"
                                : isAdmin
                                  ? "hover:bg-[#f2f4f6] text-[#4e5968]"
                                  : "text-[#adb5bd] cursor-not-allowed",
                            )}
                          >
                            <Pencil className="w-4 h-4" />
                          </button>
                        </td>
                        <td className="px-8 py-6 text-center">
                          <button
                            onClick={() => handleRemoveMember(member)}
                            disabled={isCurrentUser}
                            className={cn(
                              "p-2 rounded-xl transition-colors",
                              isCurrentUser
                                ? "text-[#d1d6db] cursor-not-allowed"
                                : isAdmin
                                  ? "hover:bg-[#fff0f1] text-[#f04452]"
                                  : "text-[#adb5bd] cursor-not-allowed",
                            )}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <InviteModal
        isOpen={isInviteModalOpen}
        onClose={() => setIsInviteModalOpen(false)}
      />

      <EditRoleModal
        isOpen={!!editTarget}
        onClose={() => setEditTarget(null)}
        member={editTarget}
        onConfirm={handleRoleConfirm}
        isPending={isPendingPatchRole}
      />
    </>
  );
};

export default TeamMemberTable;
