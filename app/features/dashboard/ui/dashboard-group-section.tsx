import { GripVertical, Layers, Trash2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import { Group } from "../model/type";

interface DashboardGroupSectionProps {
  groups: Group[];
  newGroup: Omit<Group, "id">;
  onNewGroupChange: (g: Omit<Group, "id">) => void;
  onAdd: () => void;
  onRemove: (id: string) => void;
  onDragEnd: (result: DropResult, type: "groups") => void;
}

export const DashboardGroupSection = ({
  groups,
  newGroup,
  onNewGroupChange,
  onAdd,
  onRemove,
  onDragEnd,
}: DashboardGroupSectionProps) => {
  const [tickerError, setTickerError] = useState<string>("");

  const handleActualValueChange = (val: string) => {
    const upper = val.toUpperCase().trim();
    setTickerError("");
    onNewGroupChange({
      ...newGroup,
      dbCol: "ticker",
      actualValue: upper,
    });
  };

  const handleAdd = () => {
    const ticker = newGroup.actualValue.trim();

    // 티커 유효성 검사
    if (!ticker) {
      setTickerError("티커를 입력해주세요.");
      return;
    }
    if (!/^[A-Z]{1,5}$/.test(ticker)) {
      setTickerError("티커는 영문 1~5자리여야 합니다. (예: PL, RKLB, GOOG)");
      return;
    }
    // 중복 체크
    if (groups.some((g) => g.actualValue === ticker)) {
      setTickerError(`${ticker}는 이미 추가된 종목입니다.`);
      return;
    }
    if (!newGroup.alias.trim()) {
      setTickerError("별칭을 입력해주세요.");
      return;
    }

    setTickerError("");
    onAdd();
  };

  return (
    <section className="bg-white border border-zinc-200 shadow-sm p-6 space-y-4">
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2 text-blue-600 font-bold text-[15px]">
          <Layers className="w-4 h-4" />
          <span>그룹 항목 (세로 행)</span>
        </div>
        <p className="text-[12px] text-zinc-400 font-medium ml-6">
          테이블의 행을 구성합니다. 대상 주식의 티커(Ticker) 코드와 화면에
          표시할 별칭을 지정하세요.
        </p>
      </div>

      {tickerError && (
        <div className="flex items-center gap-2 text-red-500 text-xs bg-red-50 border border-red-100 px-3 py-2">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          {tickerError}
        </div>
      )}

      <DragDropContext onDragEnd={(res) => onDragEnd(res, "groups")}>
        <Droppable droppableId="groups">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="border border-zinc-200 overflow-x-auto"
            >
              <table className="w-full text-left">
                <thead className="bg-zinc-50 border-b border-zinc-200 text-[11px] font-bold text-zinc-400 uppercase tracking-wider">
                  <tr>
                    <th className="px-3 py-3 w-10"></th>
                    <th className="px-3 py-3 w-8 text-center">#</th>
                    <th className="px-4 py-3">티커</th>
                    <th className="px-4 py-3">별칭 (화면 표시명)</th>
                    <th className="px-4 py-3 w-14 text-center">삭제</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-50">
                  {groups.length === 0 && (
                    <tr>
                      <td
                        colSpan={5}
                        className="px-4 py-8 text-center text-zinc-300 text-sm"
                      >
                        등록된 주식 종목이 없습니다. 아래에서 티커를
                        추가해주세요.
                      </td>
                    </tr>
                  )}
                  {groups.map((g, idx) => (
                    <Draggable
                      key={g.id || `fallback-${idx}`}
                      draggableId={g.id || `fallback-${idx}`}
                      index={idx}
                    >
                      {(prov) => (
                        <tr
                          ref={prov.innerRef}
                          {...prov.draggableProps}
                          className="hover:bg-blue-50/20 text-sm transition-all"
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
                          <td className="px-4 py-3">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-md bg-blue-50 text-blue-600 text-xs font-bold font-mono">
                              {g.actualValue}
                            </span>
                          </td>
                          <td className="px-4 py-3 font-medium text-zinc-700">
                            {g.alias}
                          </td>
                          <td className="px-4 py-3 text-center">
                            <button
                              onClick={() => onRemove(g.id)}
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
                      <Input
                        value={newGroup.actualValue}
                        onChange={(e) =>
                          handleActualValueChange(e.target.value)
                        }
                        onKeyDown={(e) => e.key === "Enter" && handleAdd()}
                        placeholder="예: PL, RKLB, GOOG"
                        className="h-10 bg-white border-zinc-200 rounded-none uppercase font-mono"
                      />
                    </td>
                    <td className="px-2 py-3">
                      <Input
                        value={newGroup.alias}
                        onChange={(e) =>
                          onNewGroupChange({
                            ...newGroup,
                            alias: e.target.value,
                          })
                        }
                        onKeyDown={(e) => e.key === "Enter" && handleAdd()}
                        placeholder="예: 플래닛랩스"
                        className="h-10 bg-white border-zinc-200 rounded-none"
                      />
                    </td>
                    <td className="px-2 py-3 text-center">
                      <Button
                        onClick={handleAdd}
                        size="sm"
                        className="bg-blue-600 hover:bg-blue-700 rounded-none font-bold px-4 h-10 text-xs cursor-pointer"
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
