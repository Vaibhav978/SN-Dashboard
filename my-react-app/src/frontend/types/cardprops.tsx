export interface DashboardCardProps {
  title: string
  children?: React.ReactNode
  className?: string
  variant?: 'default' | 'primary' | 'secondary'
  size?: 'small' | 'medium' | 'large'
}

// You can add more interfaces here as your dashboard grows
export interface ChartData {
  labels: string[]
  values: number[]
}

export interface MetricCardProps {
  title: string
  value: string | number
  trend?: 'up' | 'down' | 'neutral'
  percentage?: number
}

