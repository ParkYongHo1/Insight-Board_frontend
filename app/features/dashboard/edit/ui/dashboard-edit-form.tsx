"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { getDashboardDetail } from "../../api";
import { useDashboardEdit } from "../hooks/use-dashboard-edit";
import { DashboardBasicInfo } from "../../ui/dashboard-basic-info";
import { DashboardGroupSection } from "../../ui/dashboard-group-section";
import { DashboardMetricSection } from "../../ui/dashboard-metric-section";
import { DashboardPreview } from "../../ui/dashboard-preview";
import useUserStore from "@/app/store/session";
import { isDemoAccount } from "@/app/shared/utils/is-demo";

interface BackendGroupItem {
  id?: string;
  key?: string;
  dbCol?: string;
  value?: string;
  actualValue?: string;
  alias: string;
}

interface BackendMetricItem {
  id?: string;
  column?: string;
  dbCol?: string;
  alias: string;
}

export const DashboardEditForm = () => {
  const router = useRouter();
  const { id } = useParams();
  const user = useUserStore((state) => state.user);
  const isDemo = isDemoAccount(user?.email);

  const { data: dashboard, isLoading } = useQuery({
    queryKey: ["dashboard", id],
    queryFn: () => getDashboardDetail(Number(id)),
    enabled: !!id,
  });

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
  } = useDashboardEdit(Number(id), dashboard, {
    onSuccess: () => {
      toast.success("대시보드가 수정되었습니다!", { position: "top-center" });
      router.push("/dashboard");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "수정에 실패했습니다.", {
        position: "top-center",
      });
    },
  });

  useEffect(() => {
    if (!dashboard) return;
    setTitle(dashboard.title);
    setDesc(dashboard.desc || "");

    if (dashboard.groups) {
      setGroups(
        (dashboard.groups as BackendGroupItem[]).map((g, index) => ({
          id:
            g.id && g.id.trim() !== ""
              ? g.id
              : `g-db-${String(id)}-${index}-${Math.random().toString(36).slice(2, 7)}`,
          dbCol: g.dbCol || g.key || "ticker",
          actualValue: g.actualValue || g.value || "",
          alias: g.alias,
        })),
      );
    }

    if (dashboard.metrics) {
      setMetrics(
        (dashboard.metrics as BackendMetricItem[]).map((m, index) => ({
          id:
            m.id && m.id.trim() !== ""
              ? m.id
              : `m-db-${String(id)}-${index}-${Math.random().toString(36).slice(2, 7)}`,
          dbCol: m.dbCol || m.column || "price",
          alias: m.alias,
        })),
      );
    }
  }, [dashboard, id, setTitle, setDesc, setGroups, setMetrics]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <Loader2 className="w-10 h-10 animate-spin text-[#3182f6]" />
        <p className="font-bold text-[#4e5968]">설정을 불러오는 중입니다...</p>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-white font-sans text-zinc-900 pb-24">
      <div className="w-full max-w-300 mx-auto py-8 px-4 md:py-12 md:px-6 flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-extrabold text-zinc-900">
            대시보드 수정
          </h1>
          {isDemo && (
            <p className="text-sm text-amber-600 bg-amber-50 border border-amber-200 px-4 py-2 rounded-xl font-medium w-fit">
              데모 계정은 조회만 가능합니다.
            </p>
          )}
        </div>

        <div className="flex flex-col gap-8">
          <DashboardBasicInfo
            title={title}
            desc={desc}
            onTitleChange={isDemo ? () => {} : setTitle}
            onDescChange={isDemo ? () => {} : setDesc}
          />
          <DashboardGroupSection
            groups={groups}
            newGroup={newGroup}
            onNewGroupChange={setNewGroup}
            onAdd={addGroup}
            onRemove={(groupId) =>
              setGroups(groups.filter((g) => g.id !== groupId))
            }
            onDragEnd={onDragEnd}
          />
          <DashboardMetricSection
            metrics={metrics}
            newMetric={newMetric}
            allColumns={allColumns}
            onNewMetricChange={setNewMetric}
            onAdd={addMetric}
            onRemove={(metricId) =>
              setMetrics(metrics.filter((m) => m.id !== metricId))
            }
            onDragEnd={onDragEnd}
          />
          <DashboardPreview groups={groups} metrics={metrics} />
        </div>

        <div className="flex items-center justify-center gap-4 pt-4">
          <Button
            type="button"
            onClick={() => router.back()}
            className="h-12 px-8 bg-[#f2f4f6] hover:bg-[#e5e8eb] text-[#4e5968] font-bold rounded-2xl cursor-pointer"
          >
            {isDemo ? "돌아가기" : "취소"}
          </Button>
          {!isDemo && (
            <Button
              onClick={handleSave}
              disabled={isPending}
              className="h-12 px-10 bg-[#3182f6] hover:bg-[#1b64da] text-white font-bold rounded-2xl cursor-pointer min-w-40 shadow-[0_8px_16px_rgba(49,130,246,0.2)]"
            >
              {isPending ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                "수정사항 저장"
              )}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
