import React from 'react';
import type { ProjectMetric } from '../types/project';
import DashboardCard from './DashboardCard';
import '../styles/MetrixCard.css';  // ← This import

interface MetricCardProps {
  metric: ProjectMetric;
  className?: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ metric, className }) => {
  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return '↗️';
      case 'down': return '↘️';
      default: return '➡️';
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up': return 'success';
      case 'down': return 'danger';
      default: return 'neutral';
    }
  };

  const formatValue = (value: number) => {
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(1)}M`;
    } else if (value >= 1000) {
      return `${(value / 1000).toFixed(1)}K`;
    }
    return value.toLocaleString();
  };

  return (
    <DashboardCard 
      title={metric.title} 
      className={className}
      icon={metric.icon}
      size="small"
      variant="metric"
    >
      <div className="metric-display">
        <div className="metric-value">
          <span className="value">{formatValue(metric.value)}</span>
          {metric.unit && <span className="unit">{metric.unit}</span>}
        </div>
        <div className={`metric-trend metric-trend--${getTrendColor(metric.trend)}`}>
          <span className="trend-icon">{getTrendIcon(metric.trend)}</span>
          <span className="trend-percentage">
            {metric.percentage > 0 ? '+' : ''}{metric.percentage.toFixed(1)}%
          </span>
        </div>
      </div>
    </DashboardCard>
  );
};

export default MetricCard;
