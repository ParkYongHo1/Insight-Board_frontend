"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useDashboardCreate } from "../hooks/use-dashboard-create";
import { DashboardHeader } from "../../ui/dashboard-header";
import { DashboardBasicInfo } from "../../ui/dashboard-basic-info";
import { DashboardGroupSection } from "../../ui/dashboard-group-section";
import { DashboardMetricSection } from "../../ui/dashboard-metric-section";
import { DashboardPreview } from "../../ui/dashboard-preview";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export const DashboardCreateForm = () => {
  const router = useRouter();

  // 🚀 1. Number(projectId) 제거: 훅 스펙에 맞춰 callbacks만 깔끔하게 전달합니다.
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
      router.push("/dashboard"); // 단수형 경로 매핑 유지
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message || "대시보드 생성에 실패했습니다.",
        {
          position: "top-center",
        },
      );
    },
  });

  return (
    <div className="w-full min-h-screen bg-white font-sans text-zinc-900 pb-24">
      <div className="w-full max-w-300 mx-auto py-8 px-4 md:py-12 md:px-6 flex flex-col gap-8">
        {/* 상시 생성 모드이므로 isEdit={false} 처리 */}
        <DashboardHeader onSave={handleSave} isEdit={false} isAdmin={true} />

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

        {/* 🚀 2. 하단 액션 제어 버튼 컨트롤러 스타일을 다른 폼과 통일 (토스풍 라운드/컬러 피팅) */}
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
