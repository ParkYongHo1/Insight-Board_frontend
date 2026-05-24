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

export interface Metric {
  id: string;
  dbCol: string;
  alias: string;
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
