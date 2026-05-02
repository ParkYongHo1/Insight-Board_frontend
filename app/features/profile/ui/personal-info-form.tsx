import { useUser } from "@/app/store/session";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import ProfileInput from "@/widgets/profile/ui/profile-input";
import { useMemo, useState } from "react";

const PersonalInfoForm = () => {
  const user = useUser();

  const [userName, setUserName] = useState(user?.name || "");
  const [passwords, setPasswords] = useState({
    new: "",
    confirm: "",
  });

  const passwordError = useMemo(() => {
    if (passwords.confirm && passwords.new !== passwords.confirm) {
      return "비밀번호가 일치하지 않습니다.";
    }
    return "";
  }, [passwords.new, passwords.confirm]);
  if (!user) {
    return null;
  }
  return (
    <section className="space-y-10">
      <h2 className="text-2xl font-bold border-b pb-6 text-[#191f28]">
        개인 정보 설정
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        <div className="md:col-span-2 text-sm font-bold text-zinc-500">
          기본 정보
        </div>
        <div className="md:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          <ProfileInput
            id="company"
            label="소속 기업"
            value={user.companyName}
            disabled
          />
          <ProfileInput
            id="email"
            label="이메일 주소"
            value={user.email}
            disabled
          />
        </div>
        <div className="hidden md:block md:col-span-2" />
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
        <Button className="md:col-span-2 h-14 bg-[#191f28] hover:bg-black text-white rounded-2xl font-bold transition-all">
          변경
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        <div className="md:col-span-2 text-sm font-bold text-zinc-500">
          비밀번호
        </div>
        <div className="md:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-4">
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
            label="비밀번호 확인"
            type="password"
            value={passwords.confirm}
            error={passwordError}
            onChange={(e) =>
              setPasswords({ ...passwords, confirm: e.target.value })
            }
          />
        </div>
        <Button
          disabled={!!passwordError || !passwords.new || !passwords.confirm}
          className={cn(
            "md:col-span-2 h-14 rounded-2xl font-bold transition-all",
            passwordError || !passwords.new
              ? "bg-zinc-100 text-zinc-400 cursor-not-allowed"
              : "bg-[#3182f6] hover:bg-[#1b64da] text-white",
          )}
        >
          저장
        </Button>
      </div>
    </section>
  );
};
export default PersonalInfoForm;
