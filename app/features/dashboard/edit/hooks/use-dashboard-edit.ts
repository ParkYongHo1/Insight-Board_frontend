import { ApiError, UseMutationCallbacks } from "@/app/shared/types";
import { useCallback, useMemo, useState } from "react";
import { useEditDashboardMutation } from "./use-edit-dashboard-mutation";
import { DropResult } from "@hello-pangea/dnd";
import { toast } from "sonner";
import { Group, Metric } from "../../model/type";
import { STOCK_COLUMNS } from "../../model/constants";

interface DashboardDetail {
  id: number;
  title: string;
  desc?: string;
  author: string;
  createdAt: string;
  groups: Group[];
  metrics: Metric[];
}

export const useDashboardEdit = (
  dashboardId: number,
  initialData: DashboardDetail | undefined,
  callbacks?: UseMutationCallbacks<void, ApiError>,
) => {
  const [title, setTitle] = useState(initialData?.title || "");
  const [desc, setDesc] = useState(initialData?.desc || "");
  const [groups, setGroups] = useState<Group[]>(initialData?.groups || []);
  const [metrics, setMetrics] = useState<Metric[]>(initialData?.metrics || []);

  const [newGroup, setNewGroup] = useState<Omit<Group, "id">>({
    dbCol: "",
    actualValue: "",
    alias: "",
  });

  const [newMetric, setNewMetric] = useState<Omit<Metric, "id">>({
    dbCol: "",
    alias: "",
  });

  const allColumns = useMemo(() => STOCK_COLUMNS, []);

  const { mutate, isPending } = useEditDashboardMutation(
    dashboardId,
    callbacks,
  );

  const onDragEnd = (result: DropResult, listType: "metrics" | "groups") => {
    if (!result.destination) return;
    if (listType === "groups") {
      const items = Array.from(groups);
      const [item] = items.splice(result.source.index, 1);
      items.splice(result.destination.index, 0, item);
      setGroups(items);
    } else {
      const items = Array.from(metrics);
      const [item] = items.splice(result.source.index, 1);
      items.splice(result.destination.index, 0, item);
      setMetrics(items);
    }
  };

  const addGroup = () => {
    const ticker = newGroup.actualValue.trim();
    if (!ticker || !newGroup.alias.trim()) {
      return toast.error("티커와 별칭을 입력해주세요.");
    }
    if (groups.some((g) => g.actualValue === ticker)) {
      return toast.error(`${ticker}는 이미 추가된 종목입니다.`);
    }
    const id = `g-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    setGroups([...groups, { ...newGroup, id, dbCol: "ticker" }]);
    setNewGroup({ dbCol: "", actualValue: "", alias: "" });
  };

  const addMetric = () => {
    if (!newMetric.dbCol || !newMetric.alias) {
      return toast.error("컬럼을 선택해주세요.");
    }
    if (metrics.some((m) => m.dbCol === newMetric.dbCol)) {
      return toast.error("이미 추가된 항목입니다.");
    }
    const id = `m-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    setMetrics([...metrics, { ...newMetric, id }]);
    setNewMetric({ dbCol: "", alias: "" });
  };

  const handleSave = useCallback(() => {
    if (!title.trim()) return toast.warning("제목을 입력해주세요.");

    const payload = {
      title,
      desc,
      groups: groups.map((g) => ({
        key: g.dbCol || "ticker",
        value: g.actualValue || "",
        alias: g.alias,
      })),
      metrics: metrics.map((m) => ({
        column: m.dbCol || "price",
        alias: m.alias,
      })),
    };

    mutate(payload);
  }, [title, desc, metrics, groups, mutate]);

  return {
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
  };
};
