"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { TeamMember } from "../api";

interface EditRoleModalProps {
  isOpen: boolean;
  onClose: () => void;
  member: TeamMember | null;
  onConfirm: (memberId: number, role: string) => void;
  isPending?: boolean;
}

export const EditRoleModal = ({
  isOpen,
  onClose,
  member,
  onConfirm,
  isPending,
}: EditRoleModalProps) => {
  const [selectedRole, setSelectedRole] = useState(member?.role ?? "VIEWER");

  if (!member) return null;

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
            className="relative bg-white w-full max-w-lg rounded-[40px] p-8 md:p-10 shadow-2xl"
          >
            <div className="flex items-center justify-between mb-10">
              <h3 className="text-2xl font-bold text-[#191f28]">역할 변경</h3>
              <button
                onClick={onClose}
                className="p-2 hover:bg-[#f2f4f6] rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-[#adb5bd]" />
              </button>
            </div>

            <div className="space-y-8">
              <div className="px-4 py-3 bg-[#f9fafb] rounded-2xl border border-[#eff1f3]">
                <p className="text-xs font-bold text-[#8b95a1] mb-1">
                  대상 팀원
                </p>
                <p className="text-sm font-bold text-[#191f28]">
                  {member.name}
                </p>
                <p className="text-xs text-[#4e5968]">{member.email}</p>
              </div>

              <div className="space-y-2">
                <p className="text-xs font-bold text-[#8b95a1] ml-1">
                  변경할 역할
                </p>
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
                onClick={() => onConfirm(member.id, selectedRole)}
                disabled={isPending || selectedRole === member.role}
                className="w-full h-16 bg-[#3182f6] hover:bg-[#1b64da] text-white rounded-[24px] font-bold text-lg shadow-lg shadow-blue-200 transition-all disabled:opacity-50"
              >
                {isPending ? "변경 중..." : "역할 변경하기"}
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
