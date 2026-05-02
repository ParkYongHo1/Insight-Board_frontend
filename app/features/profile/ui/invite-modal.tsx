"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useInviteMember } from "../hooks/use-invite-mamber";
import { useSelectedProjectId } from "@/app/store/session";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

interface InviteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InviteModal = ({ isOpen, onClose }: InviteModalProps) => {
  const [emailInput, setEmailInput] = useState("");
  const [selectedRole, setSelectedRole] = useState("VIEWER");
  const [inviteList, setInviteList] = useState<
    { email: string; role: string }[]
  >([]);

  const addInvitee = () => {
    if (!emailInput.includes("@")) return;
    setInviteList([...inviteList, { email: emailInput, role: selectedRole }]);
    setEmailInput("");
  };
  const queryClient = useQueryClient();

  const removeInvitee = (idx: number) => {
    setInviteList(inviteList.filter((_, i) => i !== idx));
  };
  const selectedProjectId = useSelectedProjectId();

  const { mutate: inviteMember, isPending } = useInviteMember({
    onSuccess: () => {
      setInviteList([]);
      void queryClient.invalidateQueries({ queryKey: ["project-members"] });
      onClose();
      toast.success("팀원 초대 링크가 발송되었습니다!", {
        position: "top-center",
      });
    },
    onError: (error) => {
      toast.error(error?.message || "팀원 초대에 실패했습니다.", {
        position: "top-center",
      });
    },
  });

  const handleInvite = () => {
    if (inviteList.length === 0) return;
    inviteMember(
      inviteList.map((item) => ({
        email: item.email,
        role: item.role,
        projectId: selectedProjectId ? Number(selectedProjectId) : undefined,
      })),
    );
  };
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          />
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            className="relative bg-white w-full max-w-2xl rounded-[40px] p-8 md:p-10 shadow-2xl overflow-hidden"
          >
            <div className="flex items-center justify-between mb-10">
              <h3 className="text-2xl font-bold text-[#191f28]">
                새로운 팀원 초대
              </h3>
              <button
                onClick={onClose}
                className="p-2 hover:bg-[#f2f4f6] rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-[#adb5bd]" />
              </button>
            </div>

            <div className="space-y-8">
              <div className="space-y-2">
                <Label className="text-xs font-bold text-[#8b95a1] ml-1">
                  초대할 이메일
                </Label>
                <Input
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="example@company.com"
                  className="h-14 rounded-2xl border-[#eff1f3] focus:border-[#3182f6] transition-all"
                />
              </div>

              <div className="flex flex-col md:flex-row gap-4 items-end">
                <div className="flex-1 w-full space-y-2">
                  <Label className="text-xs font-bold text-[#8b95a1] ml-1">
                    역할 설정
                  </Label>
                  <div className="flex p-1.5 bg-[#f2f4f6] rounded-2xl h-14">
                    {["VIEWER", "ADMIN"].map((role) => (
                      <button
                        key={role}
                        onClick={() => setSelectedRole(role)}
                        className={cn(
                          "flex-1 flex items-center justify-center rounded-xl text-sm font-bold transition-all",
                          selectedRole === role
                            ? "bg-white text-[#3182f6] shadow-sm"
                            : "text-[#8b95a1] hover:text-[#4e5968]",
                        )}
                      >
                        {role}
                      </button>
                    ))}
                  </div>
                </div>
                <Button
                  onClick={addInvitee}
                  className="h-14 px-10 bg-[#191f28] hover:bg-black text-white rounded-2xl font-bold w-full md:w-auto"
                >
                  추가
                </Button>
              </div>

              <div className="min-h-40 p-6 bg-[#f9fafb] rounded-[32px] border border-dashed border-[#eff1f3] flex flex-wrap gap-3 items-start content-start">
                {inviteList.length === 0 ? (
                  <div className="w-full h-full flex flex-col items-center justify-center py-8 text-[#adb5bd]">
                    <p className="text-sm">초대할 팀원을 추가해주세요.</p>
                  </div>
                ) : (
                  inviteList.map((item, idx) => (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      key={idx}
                      className="flex items-center gap-3 bg-white pl-4 pr-2 py-2 rounded-2xl border border-[#eff1f3] shadow-sm"
                    >
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-[#191f28]">
                          {item.email}
                        </span>
                        <span className="text-[10px] text-[#3182f6] font-black">
                          {item.role}
                        </span>
                      </div>
                      <button
                        onClick={() => removeInvitee(idx)}
                        className="p-1 hover:bg-[#fff0f1] hover:text-[#f04452] rounded-lg transition-colors text-[#adb5bd]"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </motion.div>
                  ))
                )}
              </div>

              <Button
                onClick={handleInvite}
                disabled={isPending || inviteList.length === 0}
                className="w-full h-16 bg-[#3182f6] hover:bg-[#1b64da] text-white rounded-[24px] font-bold text-lg shadow-lg shadow-blue-200 transition-all disabled:opacity-50"
              >
                {isPending ? "발송 중..." : "초대 링크 보내기"}
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
