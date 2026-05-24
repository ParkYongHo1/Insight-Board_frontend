"use client";

import { useEffect, useState, useRef } from "react";
import { io, Socket } from "socket.io-client";
import { ResponsivePie } from "@nivo/pie";
import {
  Pause,
  Play,
  RefreshCw,
  TrendingUp,
  TrendingDown,
  Minus,
  Activity,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useParams } from "next/navigation";

interface TableRow {
  groupName: string;
  groupColumn: string;
  [key: string]: string | number;
}

interface ChartItem {
  id: string;
  label: string;
  value: number;
}

interface DashboardData {
  tableData: TableRow[];
  groupData: ChartItem[];
  metricData: ChartItem[];
}

const DashboardViewPage = () => {
  const [data, setData] = useState<DashboardData | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [selectedMetric, setSelectedMetric] = useState<string>("");

  const isPausedRef = useRef(false); // 1. 초기값으로 선언
  const socketRef = useRef<Socket | null>(null);
  const params = useParams();
  const dashboardId = Number(params.id);

  useEffect(() => {
    isPausedRef.current = isPaused;
  }, [isPaused]);

  // useEffect 바깥에서 dashboardId 변경 시 초기화
  const prevDashboardId = useRef(dashboardId);

  useEffect(() => {
    // dashboardId 바뀌면 초기화
    if (prevDashboardId.current !== dashboardId) {
      prevDashboardId.current = dashboardId;
    }
  }, [dashboardId]);

  useEffect(() => {
    // setData(null) 제거
    const socket = io(
      process.env.NEXT_PUBLIC_WS_URL || "http://localhost:4000",
    );
    socketRef.current = socket;

    socket.on("connect", () => {
      setIsConnected(true);
      socket.emit("subscribe", { dashboardId });
    });

    socket.on("disconnect", () => {
      setIsConnected(false);
    });

    socket.on(`stats-${dashboardId}`, (incoming: DashboardData) => {
      if (isPausedRef.current) return;
      if (!incoming?.tableData) return;
      setData((prev) => {
        if (JSON.stringify(prev) === JSON.stringify(incoming)) return prev;
        return incoming;
      });
      setLastUpdated(new Date());
    });

    return () => {
      setData(null); // cleanup 시점에 초기화 → 다음 렌더 전에 실행
      socket.disconnect();
    };
  }, [dashboardId]);

  const metricHeaders =
    data?.tableData != null && data.tableData.length > 0
      ? Object.keys(data.tableData[0]).filter(
          (k) => k !== "groupName" && k !== "groupColumn",
        )
      : [];

  const activeMetric = selectedMetric || metricHeaders[0] || "";
  const groupChartData = (data?.groupData ?? []).filter((d) => d.value > 0);
  const metricChartData = (data?.tableData ?? [])
    .map((row) => ({
      id: row.groupName,
      label: row.groupName,
      value: Number(row[activeMetric] ?? 0),
    }))
    .filter((item) => item.value > 0);

  return (
    <div className="p-6 bg-[#f8f9fa] min-h-screen font-sans text-zinc-900">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-bold text-zinc-900">실시간 종목 분석</h2>
          {lastUpdated ? (
            <p className="text-xs text-zinc-400 mt-0.5">
              업데이트: {lastUpdated.toLocaleTimeString()}
            </p>
          ) : (
            <p className="text-xs text-zinc-400 mt-0.5">
              데이터 수신 대기 중...
            </p>
          )}
        </div>
        <div className="flex items-center gap-3">
          <div
            className={cn(
              "flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full border",
              isConnected
                ? "bg-blue-50 text-blue-600 border-blue-100"
                : "bg-zinc-50 text-zinc-400 border-zinc-100",
            )}
          >
            <span
              className={cn(
                "w-1.5 h-1.5 rounded-full",
                isConnected ? "bg-blue-500 animate-pulse" : "bg-zinc-300",
              )}
            />
            {isConnected ? "실시간 연결됨" : "연결 중..."}
          </div>
          <button
            onClick={() => setIsPaused((prev) => !prev)}
            className={cn(
              "flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full border transition-all cursor-pointer",
              isPaused
                ? "bg-amber-50 text-amber-600 border-amber-100"
                : "bg-zinc-50 text-zinc-500 border-zinc-200 hover:border-zinc-300",
            )}
          >
            {isPaused ? (
              <>
                <Play className="w-3 h-3" /> 재개
              </>
            ) : (
              <>
                <Pause className="w-3 h-3" /> 일시정지
              </>
            )}
          </button>
        </div>
      </div>

      {!data ? (
        <div className="flex flex-col items-center justify-center h-[60vh] gap-4">
          <div className="w-16 h-16 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center">
            <RefreshCw className="w-7 h-7 text-blue-400 animate-spin" />
          </div>
          <div className="text-center">
            <p className="text-zinc-700 font-bold text-sm">데이터 분석 중</p>
            <p className="text-zinc-400 text-xs mt-1">
              Finnhub에서 실시간 주식 데이터를 불러오고 있습니다
            </p>
          </div>
          <div
            className={cn(
              "flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full border",
              isConnected
                ? "text-blue-500 bg-blue-50 border-blue-100"
                : "text-zinc-400 bg-white border-zinc-200",
            )}
          >
            <span
              className={cn(
                "w-1.5 h-1.5 rounded-full",
                isConnected ? "bg-blue-400 animate-pulse" : "bg-zinc-300",
              )}
            />
            {isConnected ? "소켓 연결됨 · 데이터 대기 중" : "소켓 연결 중..."}
          </div>
        </div>
      ) : (
        <>
          {/* 차트 영역 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <div className="bg-white p-6 rounded-xl border border-zinc-200 shadow-sm">
              <div className="flex items-center gap-2 mb-1">
                <TrendingUp className="w-4 h-4 text-blue-500" />
                <h3 className="text-sm font-bold text-zinc-700">현재가 분포</h3>
              </div>
              <p className="text-[11px] text-zinc-400 mb-4">
                등록 종목별 현재가 비중
              </p>
              <div style={{ height: 240 }}>
                {groupChartData.length > 0 ? (
                  <ResponsivePie
                    data={groupChartData}
                    margin={{ top: 10, right: 130, bottom: 10, left: 20 }}
                    innerRadius={0.6}
                    padAngle={0.8}
                    cornerRadius={4}
                    colors={{ scheme: "nivo" }}
                    enableArcLinkLabels={false}
                    arcLabelsTextColor="#fff"
                    arcLabelsSkipAngle={10}
                    legends={[
                      {
                        anchor: "right",
                        direction: "column",
                        translateX: 120,
                        translateY: 0,
                        itemWidth: 110,
                        itemHeight: 22,
                        itemsSpacing: 6,
                        symbolSize: 10,
                        symbolShape: "circle",
                        itemTextColor: "#4e5968",
                      },
                    ]}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-xs text-zinc-300">
                    데이터 없음
                  </div>
                )}
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-zinc-200 shadow-sm">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-blue-500" />
                  <h3 className="text-sm font-bold text-zinc-700">
                    집계항목 분포
                  </h3>
                </div>
                {metricHeaders.length > 0 && (
                  <select
                    value={activeMetric}
                    onChange={(e) => setSelectedMetric(e.target.value)}
                    className="text-xs border border-zinc-200 rounded-lg px-2.5 py-1.5 outline-none font-semibold bg-zinc-50 text-zinc-600 cursor-pointer focus:border-blue-500"
                  >
                    {metricHeaders.map((h) => (
                      <option key={h} value={h}>
                        {h}
                      </option>
                    ))}
                  </select>
                )}
              </div>
              <p className="text-[11px] text-zinc-400 mb-4">
                선택한 지표 기준 종목별 비중
              </p>
              <div style={{ height: 240 }}>
                {metricChartData.length > 0 ? (
                  <ResponsivePie
                    data={metricChartData}
                    margin={{ top: 10, right: 130, bottom: 10, left: 20 }}
                    innerRadius={0.6}
                    padAngle={0.8}
                    cornerRadius={4}
                    colors={{ scheme: "category10" }}
                    enableArcLinkLabels={false}
                    arcLabelsTextColor="#fff"
                    arcLabelsSkipAngle={10}
                    legends={[
                      {
                        anchor: "right",
                        direction: "column",
                        translateX: 120,
                        translateY: 0,
                        itemWidth: 110,
                        itemHeight: 22,
                        itemsSpacing: 6,
                        symbolSize: 10,
                        symbolShape: "circle",
                        itemTextColor: "#4e5968",
                      },
                    ]}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-xs text-zinc-300">
                    데이터 없음
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* 테이블 */}
          <div className="bg-white rounded-xl border border-zinc-200 shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b bg-zinc-50 flex items-center justify-between">
              <span className="text-[13px] font-bold text-zinc-700">
                전체 지표 테이블
              </span>
              {isPaused && (
                <span className="text-[11px] font-bold text-amber-500 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-100">
                  일시정지 중
                </span>
              )}
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-[13px] text-center border-collapse">
                <thead className="bg-zinc-50 border-b border-zinc-200">
                  <tr>
                    <th className="relative w-44 min-w-44 h-14 border-r border-zinc-200 p-0 overflow-hidden">
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
                      <span className="absolute bottom-2 left-4 text-[10px] font-bold text-zinc-400">
                        종목
                      </span>
                      <span className="absolute top-2 right-4 text-[10px] font-bold text-blue-500">
                        지표
                      </span>
                    </th>
                    {metricHeaders.map((header, i) => (
                      <th
                        key={header}
                        className={cn(
                          "px-5 py-3 font-bold text-blue-600 bg-blue-50/10 whitespace-nowrap",
                          i !== metricHeaders.length - 1 &&
                            "border-r border-zinc-200",
                        )}
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100">
                  {data.tableData.map((row, idx) => (
                    <tr
                      key={idx}
                      className="hover:bg-zinc-50/80 transition-colors"
                    >
                      <td className="px-5 py-4 border-r border-zinc-200 text-left bg-zinc-50/30">
                        <p className="font-bold text-zinc-800">
                          {row.groupName}
                        </p>
                        <p className="text-[10px] text-zinc-400 font-mono mt-0.5">
                          {row.groupColumn}
                        </p>
                      </td>
                      {metricHeaders.map((header, i) => {
                        const val = row[header];
                        const isNum = typeof val === "number";
                        const isNeg = isNum && (val as number) < 0;
                        return (
                          <td
                            key={header}
                            className={cn(
                              "px-5 py-4 font-mono",
                              i !== metricHeaders.length - 1 &&
                                "border-r border-zinc-200",
                            )}
                          >
                            {val === 0 || val === "0" || val === "-" ? (
                              <span className="text-zinc-300">-</span>
                            ) : (
                              <span
                                className={cn(
                                  "font-semibold",
                                  isNeg ? "text-red-500" : "text-zinc-700",
                                )}
                              >
                                {isNum ? (val as number).toLocaleString() : val}
                              </span>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default DashboardViewPage;
