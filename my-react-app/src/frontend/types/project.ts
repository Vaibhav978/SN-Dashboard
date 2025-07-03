// Core metric interface
export interface ProjectMetric {
  id: string;
  title: string;
  value: number;
  trend: 'up' | 'down' | 'neutral';
  percentage: number;
  unit?: string;
  icon?: string;
}

// Chart data interface
export interface ChartData {
  labels: string[];
  values: number[];
}

// Project data interface (each project represents a team)
export interface ProjectData {
  id: string;
  name: string;
  department: string;
  description?: string;
  status: 'active' | 'completed' | 'on-hold' | 'planning';
  progress?: number;
  startDate?: string;
  endDate?: string;
  metrics: ProjectMetric[];
  charts: {
    sales_chart: ChartData;
    user_activity: ChartData;
    performance_chart: ChartData;
    [key: string]: ChartData;
  };
  teamLead?: string;
  memberCount?: number;
  lastUpdated?: string;
}

// Tab interface for navigation (each tab represents a project/team)
export interface Tab {
  id: string;
  name: string;
  icon?: string;
  department: string;
  projectId: string;
}

// Tab navigation props
export interface TabProps {
  activeTab: string;
  onTabChange: (tabId: string) => void;
  tabs: Tab[];
  className?: string;
}

// Component prop interfaces
export interface ProjectDashboardProps {
  project?: ProjectData;
}

export interface MetricCardProps {
  metric: ProjectMetric;
  className?: string;
}

// Dashboard data interface
export interface DashboardData {
  metrics: ProjectMetric[];
  charts: {
    sales_chart: ChartData;
    user_activity: ChartData;
    [key: string]: ChartData;
  };
}

// API response wrapper
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  timestamp: string;
}

// Status and trend types
export type TrendType = 'up' | 'down' | 'neutral';
export type StatusType = 'active' | 'completed' | 'on-hold' | 'planning';
export type ChartType = 'line' | 'bar' | 'pie' | 'area';
export type CardSize = 'small' | 'medium' | 'large';
export type CardVariant = 'default' | 'metric' | 'chart' | 'info';
