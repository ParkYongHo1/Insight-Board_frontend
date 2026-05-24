import { useState, useMemo, useCallback } from "react";
import { toast } from "sonner";
import { DropResult } from "@hello-pangea/dnd";
import { Group, Metric } from "../../model/type";
import useUserStore from "@/app/store/session";
import { useCreateDashboardMutation } from "./use-create-dashboard-mutation";
import { ApiError, UseMutationCallbacks } from "@/app/shared/types";
import { STOCK_COLUMNS } from "../../model/constants";

export const useDashboardCreate = (
  callbacks?: UseMutationCallbacks<void, ApiError>,
) => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [groups, setGroups] = useState<Group[]>([]);
  const [metrics, setMetrics] = useState<Metric[]>([]);

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

  const { mutate, isPending } = useCreateDashboardMutation(callbacks);

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
      toast.error("티커와 별칭을 입력해주세요.");
      return;
    }
    if (groups.some((g) => g.actualValue === ticker)) {
      toast.error(`${ticker}는 이미 추가된 종목입니다.`);
      return;
    }
    const id = `g-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    setGroups([...groups, { ...newGroup, id, dbCol: "ticker" }]);
    setNewGroup({ dbCol: "", actualValue: "", alias: "" });
    toast.success("그룹 항목이 추가되었습니다.");
  };

  const addMetric = () => {
    if (!newMetric.dbCol || !newMetric.alias) {
      toast.error("컬럼을 선택해주세요.");
      return;
    }
    if (metrics.some((m) => m.dbCol === newMetric.dbCol)) {
      toast.error("이미 추가된 항목입니다.");
      return;
    }
    const id = `m-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    setMetrics([...metrics, { ...newMetric, id }]);
    setNewMetric({ dbCol: "", alias: "" });
    toast.success("집계 항목이 추가되었습니다.");
  };
  const userName = useUserStore((state) => state.user?.name);

  const handleSave = useCallback(() => {
    if (!title.trim()) {
      toast.warning("대시보드 제목을 입력해주세요.");
      return;
    }

    const payload = {
      title,
      desc,
      author: userName ?? "Unknown",
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
  }, [title, desc, metrics, groups, mutate, userName]);

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
