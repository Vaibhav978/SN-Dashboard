import React from 'react';

export interface BaseCardProps {
  title: string;
  className?: string;
  children?: React.ReactNode;
  icon?: string;
}

export interface DashboardCardProps extends BaseCardProps {
  size?: 'small' | 'medium' | 'large';
  variant?: 'default' | 'metric' | 'chart' | 'info';
  loading?: boolean;
  error?: string;
}

export interface MetricCardProps extends BaseCardProps {
  value: number;
  trend: 'up' | 'down' | 'neutral';
  percentage: number;
  unit?: string;
  previousValue?: number;
}

export interface ChartCardProps extends BaseCardProps {
  chartType: 'line' | 'bar' | 'pie' | 'area';
  data: {
    labels: string[];
    values: number[];
  };
  height?: number;
  showLegend?: boolean;
}

// Team-specific interfaces
export interface TeamData {
  id: string;
  name: string;
  department: string;
  metrics: TeamMetric[];
  charts: {
    [key: string]: ChartData;
  };
}

export interface TeamMetric {
  id: string;
  title: string;
  value: number;
  trend: 'up' | 'down' | 'neutral';
  percentage: number;
  unit?: string;
  icon?: string;
}

export interface ChartData {
  labels: string[];
  values: number[];
}
