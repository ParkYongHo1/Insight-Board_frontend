"use client";

import { useState } from "react";
import {
  UserPlus,
  ShieldCheck,
  Eye,
  CheckCircle2,
  CircleDashed,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const CURRENT_USER = {
  name: "박용호",
  email: "yongho@example.com",
  company: "(주)인사이트테크",
  role: "ADMIN",
};

const TEAM_MEMBERS = [
  {
    id: 1,
    name: "김철수",
    email: "chulsoo@example.com",
    status: "ACTIVE",
    role: "ADMIN",
    createdAt: "2026.03.15",
  },
  {
    id: 2,
    name: "이영희",
    email: "younghee@example.com",
    status: "PENDING",
    role: "VIEWER",
    createdAt: "2026.04.10",
  },
  {
    id: 3,
    name: "최민수",
    email: "minsoo@example.com",
    status: "ACTIVE",
    role: "VIEWER",
    createdAt: "2026.04.11",
  },
];

/**
 * [플로팅 라벨 인풋] 이미지 ac2ac2 로그인 폼 스타일 적용
 */
const ProfileInput = ({
  id,
  label,
  value,
  onChange,
  type = "text",
  disabled = false,
  placeholder = "",
}: {
  id: string;
  label: string;
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  disabled?: boolean;
  placeholder?: string;
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="relative w-full">
      <Input
        id={id}
        type={type}
        value={value || ""}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        disabled={disabled}
        placeholder={isFocused ? placeholder : ""}
        className={cn(
          "h-14 px-5 py-4 transition-all duration-200 bg-white border-zinc-200 rounded-2xl",
          "focus-visible:ring-0 focus-visible:ring-offset-0 outline-none",
          isFocused ? "border-blue-500" : "border-zinc-200",
          disabled && "bg-[#f2f4f6] border-[#e5e8eb] cursor-not-allowed",
        )}
      />
      <Label
        htmlFor={id}
        className={cn(
          "absolute left-5 px-1 transition-all duration-200 pointer-events-none bg-white font-normal",
          isFocused || value || disabled
            ? "top-0 -translate-y-1/2 text-xs text-blue-500 font-medium"
            : "top-1/2 -translate-y-1/2 text-zinc-400 text-sm",
        )}
      >
        {label}
      </Label>
    </div>
  );
};

const LargeProfilePage = () => {
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [userName, setUserName] = useState(CURRENT_USER.name || "");
  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  const [emailInput, setEmailInput] = useState("");
  const [inviteList, setInviteList] = useState<
    { email: string; role: string }[]
  >([]);
  const [selectedRole, setSelectedRole] = useState("VIEWER");

  const addInvitee = () => {
    if (!emailInput.includes("@")) return;
    setInviteList([...inviteList, { email: emailInput, role: selectedRole }]);
    setEmailInput("");
  };

  return (
    /* 스크롤 해결 핵심: 
      1. 최상위 부모에 h-screen 대신 min-h-screen 사용
      2. overflow-y-auto를 명시적으로 부여하여 컨텐츠가 길어지면 브라우저 스크롤 생성
    */
    <div className="w-full min-h-screen bg-white overflow-y-auto">
      <div className="w-full max-w-[1200px] mx-auto py-10 px-4 md:px-8 flex flex-col gap-12">
        {/* 프로필 섹션 */}
        <section className="space-y-10">
          <h2 className="text-2xl font-bold border-b pb-6">개인 정보 설정</h2>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-2 text-sm font-bold text-zinc-500">
              기본 정보
            </div>
            <div className="md:col-span-10 grid grid-cols-1 md:grid-cols-2 gap-4">
              <ProfileInput
                id="company"
                label="소속 기업"
                value={CURRENT_USER.company}
                disabled
              />
              <ProfileInput
                id="email"
                label="이메일 주소"
                value={CURRENT_USER.email}
                disabled
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-2 text-sm font-bold text-zinc-500">
              이름
            </div>
            <div className="md:col-span-8">
              <ProfileInput
                id="name"
                label="이름"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
            <Button className="md:col-span-2 h-14 bg-zinc-900 rounded-2xl font-bold">
              변경
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            <div className="md:col-span-2 text-sm font-bold text-zinc-500 mt-4">
              비밀번호
            </div>
            <div className="md:col-span-8 space-y-6">
              <ProfileInput
                id="curr"
                label="현재 비밀번호"
                type="password"
                value={passwords.current}
                onChange={(e) =>
                  setPasswords({ ...passwords, current: e.target.value })
                }
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ProfileInput
                  id="new"
                  label="새 비밀번호"
                  type="password"
                  value={passwords.new}
                  onChange={(e) =>
                    setPasswords({ ...passwords, new: e.target.value })
                  }
                />
                <ProfileInput
                  id="conf"
                  label="확인"
                  type="password"
                  value={passwords.confirm}
                  onChange={(e) =>
                    setPasswords({ ...passwords, confirm: e.target.value })
                  }
                />
              </div>
            </div>
            <Button className="md:col-span-2 h-14 bg-blue-600 rounded-2xl font-bold">
              저장
            </Button>
          </div>
        </section>

        {/* 팀원 관리 섹션 - 이미지 ac390e 대응 */}
        <section className="mt-10 pb-20">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold tracking-tight">팀원 관리</h2>
            <Button
              onClick={() => setIsInviteModalOpen(true)}
              className="bg-blue-600 rounded-xl h-12 font-bold px-6"
            >
              <UserPlus className="w-4 h-4 mr-2" /> 팀원 초대
            </Button>
          </div>

          {/* 테이블 가로 스크롤 허용 */}
          <div className="bg-white border border-zinc-100 rounded-[32px] overflow-x-auto shadow-sm">
            <table className="w-full text-left min-w-[600px]">
              <thead className="bg-zinc-50 border-b border-zinc-100">
                <tr>
                  <th className="px-8 py-5 text-xs font-bold text-zinc-400">
                    이름
                  </th>
                  <th className="px-8 py-5 text-xs font-bold text-zinc-400">
                    이메일
                  </th>
                  <th className="px-8 py-5 text-xs font-bold text-zinc-400">
                    상태
                  </th>
                  <th className="px-8 py-5 text-xs font-bold text-zinc-400">
                    역할
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-50">
                {TEAM_MEMBERS.map((member) => (
                  <tr key={member.id} className="hover:bg-zinc-50/50">
                    <td className="px-8 py-6 font-bold">{member.name}</td>
                    <td className="px-8 py-6 text-sm text-zinc-500">
                      {member.email}
                    </td>
                    <td className="px-8 py-6 text-xs font-bold text-green-600 uppercase">
                      {member.status}
                    </td>
                    <td className="px-8 py-6">
                      <span className="bg-zinc-100 px-2.5 py-1 rounded text-[10px] font-black">
                        {member.role}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>

      {/* 초대 모달 - 이미지 ac3589(버튼 역할선택) + abc8e9(태그 목록) 스타일 */}
      <AnimatePresence>
        {isInviteModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsInviteModalOpen(false)}
              className="absolute inset-0 bg-zinc-900/40 backdrop-blur-sm"
            />
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative bg-white w-full max-w-2xl rounded-[40px] p-8 md:p-10 shadow-2xl max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-bold">새로운 팀원 초대</h3>
                <button onClick={() => setIsInviteModalOpen(false)}>
                  <X className="w-6 h-6 text-zinc-400" />
                </button>
              </div>

              <div className="space-y-8">
                <div>
                  <Label className="text-xs font-bold text-zinc-500 mb-2 block ml-1">
                    초대할 이메일
                  </Label>
                  <Input
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    placeholder="example@company.com"
                    className="h-14 rounded-2xl"
                  />
                </div>

                <div className="flex flex-col md:flex-row gap-4 items-end">
                  <div className="flex-1 w-full">
                    <Label className="text-xs font-bold text-zinc-500 mb-2 block ml-1">
                      역할
                    </Label>
                    <div className="flex p-1 bg-zinc-100 rounded-2xl h-14">
                      {["VIEWER", "ADMIN"].map((role) => (
                        <button
                          key={role}
                          onClick={() => setSelectedRole(role)}
                          className={cn(
                            "flex-1 flex items-center justify-center rounded-xl text-sm font-bold transition-all",
                            selectedRole === role
                              ? "bg-white text-blue-600 shadow-sm"
                              : "text-zinc-400",
                          )}
                        >
                          {role}
                        </button>
                      ))}
                    </div>
                  </div>
                  <Button
                    onClick={addInvitee}
                    className="h-14 px-8 bg-zinc-900 rounded-2xl font-bold w-full md:w-auto"
                  >
                    추가
                  </Button>
                </div>

                {/* 초대 목록 (이미지 abc8e9 스타일) */}
                <div className="min-h-[140px] p-6 bg-zinc-50/50 rounded-[32px] border border-dashed border-zinc-200 grid grid-cols-1 md:grid-cols-2 gap-3">
                  {inviteList.length === 0 ? (
                    <p className="text-zinc-400 text-sm m-auto col-span-full">
                      초대할 이메일을 추가해주세요.
                    </p>
                  ) : (
                    inviteList.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between bg-white px-4 py-3 rounded-2xl border border-zinc-100 shadow-sm"
                      >
                        <div className="flex flex-col overflow-hidden">
                          <span className="text-sm font-bold truncate">
                            {item.email}
                          </span>
                          <span className="text-[10px] text-blue-500 font-black">
                            {item.role}
                          </span>
                        </div>
                        <button
                          onClick={() =>
                            setInviteList(
                              inviteList.filter((_, i) => i !== idx),
                            )
                          }
                          className="text-zinc-400 ml-2"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))
                  )}
                </div>

                <Button className="w-full h-16 bg-blue-600 text-white rounded-[24px] font-bold text-lg">
                  초대 링크 보내기
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LargeProfilePage;
