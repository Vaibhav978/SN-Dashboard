import React from 'react';
import type { CardSize, CardVariant } from '../types/project';
import '../styles/DashboardCard.css';

interface DashboardCardProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  icon?: string;
  size?: CardSize;
  variant?: CardVariant;
  loading?: boolean;
  error?: string;
}

const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  children,
  className = '',
  icon,
  size = 'medium',
  variant = 'default',
  loading = false,
  error
}) => {
  const cardClasses = [
    'dashboard-card',
    `dashboard-card--${size}`,
    `dashboard-card--${variant}`,
    className
  ].filter(Boolean).join(' ');

  if (loading) {
    return (
      <div className={cardClasses}>
        <div className="dashboard-card__header">
          <h3 className="dashboard-card__title">
            {icon && <span className="dashboard-card__icon">{icon}</span>}
            {title}
          </h3>
        </div>
        <div className="dashboard-card__content">
          <div className="dashboard-card__loading">
            <div className="loading-spinner"></div>
            <p>Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={cardClasses}>
        <div className="dashboard-card__header">
          <h3 className="dashboard-card__title">
            {icon && <span className="dashboard-card__icon">{icon}</span>}
            {title}
          </h3>
        </div>
        <div className="dashboard-card__content">
          <div className="dashboard-card__error">
            <p>Error: {error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={cardClasses}>
      <div className="dashboard-card__header">
        <h3 className="dashboard-card__title">
          {icon && <span className="dashboard-card__icon">{icon}</span>}
          {title}
        </h3>
      </div>
      <div className="dashboard-card__content">
        {children}
      </div>
    </div>
  );
};

export default DashboardCard;
