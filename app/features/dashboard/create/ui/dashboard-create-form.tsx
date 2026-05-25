"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDashboardCreate } from "../hooks/use-dashboard-create";
import { DashboardBasicInfo } from "../../ui/dashboard-basic-info";
import { DashboardGroupSection } from "../../ui/dashboard-group-section";
import { DashboardMetricSection } from "../../ui/dashboard-metric-section";
import { DashboardPreview } from "../../ui/dashboard-preview";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import useUserStore from "@/app/store/session";
import { isDemoAccount } from "@/app/shared/utils/is-demo";

export const DashboardCreateForm = () => {
  const router = useRouter();
  const user = useUserStore((state) => state.user);

  useEffect(() => {
    if (isDemoAccount(user?.email)) {
      toast.error("데모 계정은 사용할 수 없는 기능입니다.");
      router.push("/dashboard");
    }
  }, [user, router]);

  const {
    title,
    setTitle,
    desc,
    setDesc,
    groups,
    setGroups,
    newGroup,
    setNewGroup,
    metrics,
    setMetrics,
    newMetric,
    setNewMetric,
    allColumns,
    onDragEnd,
    addGroup,
    addMetric,
    handleSave,
    isPending,
  } = useDashboardCreate({
    onSuccess: () => {
      toast.success("대시보드가 성공적으로 생성되었습니다!", {
        position: "top-center",
      });
      router.push("/dashboard");
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message || "대시보드 생성에 실패했습니다.",
        { position: "top-center" },
      );
    },
  });

  return (
    <div className="w-full min-h-screen bg-white font-sans text-zinc-900 pb-24">
      <div className="w-full max-w-300 mx-auto py-8 px-4 md:py-12 md:px-6 flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-extrabold text-zinc-900">
            새 대시보드 생성
          </h1>
          <p className="text-sm text-zinc-400">
            종목과 지표를 설정하고 저장하세요.
          </p>
        </div>

        <div className="flex flex-col gap-8">
          <DashboardBasicInfo
            title={title}
            desc={desc}
            onTitleChange={setTitle}
            onDescChange={setDesc}
          />
          <DashboardGroupSection
            groups={groups}
            newGroup={newGroup}
            onNewGroupChange={setNewGroup}
            onAdd={addGroup}
            onRemove={(id) => setGroups(groups.filter((g) => g.id !== id))}
            onDragEnd={onDragEnd}
          />
          <DashboardMetricSection
            metrics={metrics}
            newMetric={newMetric}
            allColumns={allColumns}
            onNewMetricChange={setNewMetric}
            onAdd={addMetric}
            onRemove={(id) => setMetrics(metrics.filter((m) => m.id !== id))}
            onDragEnd={onDragEnd}
          />
          <DashboardPreview groups={groups} metrics={metrics} />
        </div>

        <div className="flex items-center justify-center gap-4 pt-4">
          <Button
            type="button"
            onClick={() => router.back()}
            disabled={isPending}
            className="h-12 px-8 bg-[#f2f4f6] hover:bg-[#e5e8eb] text-[#4e5968] font-bold rounded-2xl cursor-pointer"
          >
            취소
          </Button>
          <Button
            onClick={handleSave}
            disabled={isPending}
            className="h-12 px-10 bg-[#3182f6] hover:bg-[#1b64da] text-white font-bold rounded-2xl cursor-pointer min-w-40 shadow-[0_8px_16px_rgba(49,130,246,0.2)]"
          >
            {isPending ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              "대시보드 생성"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};
