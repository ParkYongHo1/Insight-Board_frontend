export const STOCK_COLUMNS = [
  { value: "price", label: "현재가($)" },
  { value: "changePercent", label: "등락률(%)" },
  { value: "ma20", label: "20일 이동평균" },
  { value: "ma50", label: "50일 이동평균" },
  { value: "ma200", label: "200일 이동평균" },
  { value: "above20MA", label: "20일선 대비(%)" },
  { value: "above50MA", label: "50일선 대비(%)" },
  { value: "above200MA", label: "200일선 대비(%)" },
  { value: "rsi", label: "RSI" },
  { value: "analystBuy", label: "매수 추천수" },
  { value: "analystHold", label: "보유 추천수" },
  { value: "analystSell", label: "매도 추천수" },
  { value: "analystScore", label: "애널리스트 매수비율(%)" },
  { value: "analystTotal", label: "애널리스트 커버리지" },
  { value: "purchaseScore", label: "매수매력도 점수" },
  { value: "purchaseZone", label: "매수구간 판정" },
  { value: "momentum", label: "모멘텀 오실레이터" },
  { value: "momentumSignal", label: "모멘텀 신호" },
];

export interface DashboardItemDetail {
  alias: string;
}

export interface DashboardDto {
  id: number;
  title: string;
  desc?: string;
  author: string;
  createdAt: string;
  groups: DashboardItemDetail[];
  metrics: DashboardItemDetail[];
}

export interface Group {
  id: string;
  dbCol: string;
  actualValue: string;
  alias: string;
}

export type RawDataItem = Record<string, string | number>;

export interface ChartData {
  id: string;
  label: string;
  value: number;
  color?: string;
}

export interface SocketResponse {
  groupData: ChartData[];
  metricData: ChartData[];
  tableData: RawDataItem[];
}
