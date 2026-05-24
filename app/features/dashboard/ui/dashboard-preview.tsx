import { Table as TableIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Group, Metric } from "../model/type";

interface DashboardPreviewProps {
  groups: Group[];
  metrics: Metric[];
}

export const DashboardPreview = ({
  groups,
  metrics,
}: DashboardPreviewProps) => (
  <section className="bg-white border border-zinc-200 shadow-sm p-6 space-y-4">
    <div className="flex items-center gap-2">
      <div className="w-8 h-8 bg-blue-600 flex items-center justify-center shadow-sm shadow-blue-200">
        <TableIcon className="w-4 h-4 text-white" />
      </div>
      <div>
        <h2 className="text-[15px] font-bold text-zinc-800">미리보기</h2>
        <p className="text-[11px] text-zinc-400">
          저장 후 대시보드에서 실제 데이터가 표시됩니다.
        </p>
      </div>
    </div>

    {groups.length > 0 && metrics.length > 0 ? (
      <div className="border border-zinc-200 overflow-hidden overflow-x-auto">
        <table className="w-full text-center border-collapse text-sm">
          <thead className="bg-zinc-50 border-b border-zinc-300">
            <tr>
              <th className="relative w-35 min-w-35 h-14 border-r border-zinc-200 bg-zinc-50 p-0 overflow-hidden">
                <svg
                  className="absolute inset-0 w-full h-full"
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                >
                  <line
                    x1="0"
                    y1="0"
                    x2="100"
                    y2="100"
                    stroke="#e5e7eb"
                    strokeWidth="1"
                  />
                </svg>
                <span className="absolute bottom-2 left-3 text-[11px] font-bold text-zinc-600">
                  그룹항목
                </span>
                <span className="absolute top-2 right-3 text-[11px] font-bold text-blue-600">
                  집계항목
                </span>
              </th>
              {metrics.map((m, i) => (
                <th
                  key={i}
                  className={cn(
                    "px-6 py-4 bg-zinc-50 border-b border-zinc-300",
                    i !== metrics.length - 1 && "border-r border-zinc-300",
                  )}
                >
                  <div className="flex flex-col items-center justify-center gap-1">
                    <span className="text-blue-600 font-bold tracking-tight">
                      {m.alias}
                    </span>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {groups.map((g, idx) => (
              <tr
                key={idx}
                className="border-b border-zinc-200 hover:bg-blue-50/20 transition-colors"
              >
                <td className="px-6 py-5 border-r border-zinc-300 text-left bg-white">
                  <div className="flex flex-col gap-0.5">
                    <span className="font-bold text-zinc-700">{g.alias}</span>
                    <span className="text-[10px] text-zinc-300">
                      {g.dbCol} = {g.actualValue}
                    </span>
                  </div>
                </td>
                {metrics.map((_, mIdx) => (
                  <td
                    key={mIdx}
                    className={cn(
                      "px-6 py-5 text-zinc-200 font-mono text-sm",
                      mIdx !== metrics.length - 1 && "border-r border-zinc-200",
                    )}
                  >
                    —
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    ) : (
      <div className="h-36 border-2 border-dashed border-zinc-200 flex items-center justify-center text-zinc-300 text-sm">
        그룹항목과 집계항목을 추가하면 미리보기가 표시됩니다.
      </div>
    )}
  </section>
);
