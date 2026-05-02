"use client";

import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";
import { InviteModal } from "./invite-modal";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useProjectMembers } from "../hooks/use-project-member";

const TeamMemberTable = () => {
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const { data: members = [], isLoading } = useProjectMembers();

  return (
    <>
      <section className="pb-20">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold tracking-tight text-[#191f28]">
            팀원 관리
          </h2>
          <Button
            onClick={() => setIsInviteModalOpen(true)}
            className="bg-[#3182f6] hover:bg-[#1b64da] text-white rounded-xl h-12 font-bold px-6 transition-all"
          >
            <UserPlus className="w-4 h-4 mr-2" /> 팀원 초대
          </Button>
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
                </tr>
              </thead>
              <tbody className="divide-y divide-[#eff1f3]">
                {isLoading ? (
                  <tr>
                    <td
                      colSpan={4}
                      className="px-8 py-10 text-center text-sm text-[#8b95a1]"
                    >
                      불러오는 중...
                    </td>
                  </tr>
                ) : members.length === 0 ? (
                  <tr>
                    <td
                      colSpan={4}
                      className="px-8 py-10 text-center text-sm text-[#8b95a1]"
                    >
                      팀원이 없습니다.
                    </td>
                  </tr>
                ) : (
                  members.map((member) => (
                    <tr
                      key={member.id}
                      className="hover:bg-[#f9fafb] transition-colors"
                    >
                      <td className="px-8 py-6 font-bold text-[#191f28]">
                        {member.name}
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
                    </tr>
                  ))
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
    </>
  );
};

export default TeamMemberTable;
