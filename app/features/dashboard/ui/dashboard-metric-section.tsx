"use client";

import { GripVertical, BarChart3, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import { Metric } from "../model/type";
import { ColumnSelect } from "@/app/shared/ui/column-select";

interface DashboardMetricSectionProps {
  metrics: Metric[];
  newMetric: Omit<Metric, "id">;
  allColumns: { value: string; label: string }[];
  onNewMetricChange: (m: Omit<Metric, "id">) => void;
  onAdd: () => void;
  onRemove: (id: string) => void;
  onDragEnd: (result: DropResult, type: "metrics") => void;
}

export const DashboardMetricSection = ({
  metrics,
  newMetric,
  allColumns,
  onNewMetricChange,
  onAdd,
  onRemove,
  onDragEnd,
}: DashboardMetricSectionProps) => {
  return (
    <section className="bg-white border border-zinc-200 shadow-sm p-6 space-y-4">
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2 text-blue-600 font-bold text-[15px]">
          <BarChart3 className="w-4 h-4" />
          <span>집계 항목 (가로 열)</span>
        </div>
        <p className="text-[12px] text-zinc-400 font-medium ml-6">
          테이블의 열을 구성합니다. 보고 싶은 지표 컬럼을 선택하면 별칭이
          자동으로 설정됩니다.
        </p>
      </div>

      <DragDropContext onDragEnd={(res) => onDragEnd(res, "metrics")}>
        <Droppable droppableId="metrics">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="border border-zinc-200 overflow-x-auto"
            >
              <table className="w-full text-left border-collapse">
                <thead className="bg-zinc-50 border-b border-zinc-200 text-[11px] font-bold text-zinc-400 uppercase tracking-wider">
                  <tr>
                    <th className="px-3 py-3 w-10"></th>
                    <th className="px-3 py-3 w-8 text-center">#</th>
                    <th className="px-4 py-3">지표</th>
                    <th className="px-4 py-3 w-14 text-center">삭제</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-50">
                  {metrics.length === 0 && (
                    <tr>
                      <td
                        colSpan={4}
                        className="px-4 py-8 text-center text-zinc-300 text-sm"
                      >
                        집계 항목을 추가해주세요.
                      </td>
                    </tr>
                  )}
                  {metrics.map((m, idx) => (
                    <Draggable
                      key={m.id || `m-fallback-${idx}`}
                      draggableId={m.id || `m-fallback-${idx}`}
                      index={idx}
                    >
                      {(prov) => (
                        <tr
                          ref={prov.innerRef}
                          {...prov.draggableProps}
                          className="hover:bg-blue-50/20 transition-all text-sm"
                        >
                          <td
                            className="px-3 py-3 text-center"
                            {...prov.dragHandleProps}
                          >
                            <GripVertical className="w-4 h-4 text-zinc-300 mx-auto cursor-grab" />
                          </td>
                          <td className="px-3 py-3 text-center font-black text-blue-500">
                            {idx + 1}
                          </td>
                          <td className="px-4 py-3 font-medium text-zinc-700">
                            {m.alias}
                          </td>
                          <td className="px-4 py-3 text-center">
                            <button
                              type="button"
                              onClick={() => onRemove(m.id)}
                              className="text-zinc-300 hover:text-red-400 transition-colors p-1 hover:bg-red-50"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </tbody>
                <tfoot>
                  <tr className="bg-blue-50/30 border-t-2 border-blue-100">
                    <td className="px-3 py-3 text-center">
                      <span className="text-[10px] font-black text-blue-400 uppercase">
                        NEW
                      </span>
                    </td>
                    <td />
                    <td className="px-2 py-3">
                      <ColumnSelect
                        value={newMetric.dbCol}
                        onChange={(e) => {
                          const selected = allColumns.find(
                            (c) => c.value === e.target.value,
                          );
                          onNewMetricChange({
                            ...newMetric,
                            dbCol: e.target.value,
                            alias: selected?.label ?? e.target.value,
                          });
                        }}
                        placeholder="컬럼 선택"
                        columns={allColumns}
                      />
                    </td>
                    <td className="px-2 py-3 text-center">
                      <Button
                        onClick={onAdd}
                        size="sm"
                        disabled={!newMetric.dbCol}
                        className="bg-blue-600 hover:bg-blue-700 rounded-none font-bold px-4 h-10 text-xs cursor-pointer disabled:opacity-40"
                      >
                        추가
                      </Button>
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </section>
  );
};
