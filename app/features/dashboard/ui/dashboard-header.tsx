import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface DashboardHeaderProps {
  onSave: () => void;
  isEdit?: boolean;
  isAdmin?: boolean;
}

export const DashboardHeader = ({
  onSave,
  isEdit = false,
  isAdmin = true,
}: DashboardHeaderProps) => {
  const router = useRouter();

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <p className="text-xs font-semibold text-blue-500 uppercase tracking-widest mb-1">
          Dashboard {isEdit ? "Editor" : "Designer"}
        </p>
        <h1 className="text-2xl md:text-3xl font-black tracking-tight text-zinc-900">
          대시보드 {isEdit ? "수정" : "생성"}
        </h1>
        <p className="text-zinc-400 text-sm mt-1">
          {isAdmin
            ? isEdit
              ? "기존 대시보드의 통계 조건을 수정합니다."
              : "통계 조건을 설정하여 대시보드를 구성합니다."
            : "대시보드 설정 내용을 확인합니다. (수정 권한 없음)"}
        </p>
      </div>
      <div className="flex items-center gap-3">
        <Button
          type="button"
          onClick={() => router.back()}
          className="h-10 px-6 bg-zinc-500 hover:bg-zinc-600 text-white font-bold rounded-none cursor-pointer"
        >
          뒤로
        </Button>
        {isAdmin && (
          <Button
            onClick={onSave}
            className="h-10 px-7 bg-green-600 hover:bg-green-700 text-white font-bold rounded-none cursor-pointer"
          >
            {isEdit ? "수정 완료" : "저장"}
          </Button>
        )}
      </div>
    </div>
  );
};
