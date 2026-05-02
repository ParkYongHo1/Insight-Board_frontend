export interface Metric {
  id: string;
  dbCol: string;
  actualValue: string;
  alias: string;
}

export interface Group {
  id: string;
  dbCol: string;
  type: string;
  cond: string;
  value: string;
  statType: string;
  alias: string;
}

export interface DashboardData {
  title?: string;
  desc?: string;
  metrics?: Metric[];
  groups?: Group[];
}

export interface DashboardFormProps {
  initialData?: DashboardData;
}
