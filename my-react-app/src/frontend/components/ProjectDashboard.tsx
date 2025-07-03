import React, { useState, useEffect } from 'react';
import type { ProjectData, Tab } from '../types/project';
// Remove the local ProjectDashboardProps interface
import DashboardCard from './DashboardCard';
import MetricCard from './MetricCard';
import TabNavigation from './tabs/TabNavigation';
import { apiService } from '../../services/api';
import '../styles/ProjectDashboard.css';

interface ProjectDashboardProps {
  project?: ProjectData;
}

const ProjectDashboard: React.FC<ProjectDashboardProps> = () => {
  const [activeTab, setActiveTab] = useState('engineering');
  const [projectData, setProjectData] = useState<{ [key: string]: ProjectData }>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Define the 9 projects/teams across the company
  const tabs: Tab[] = [
    { id: 'engineering', name: 'Engineering', icon: '⚙️', department: 'Technology', projectId: 'proj-eng-001' },
    { id: 'product', name: 'Product', icon: '📱', department: 'Product Management', projectId: 'proj-prod-001' },
    { id: 'design', name: 'Design', icon: '🎨', department: 'User Experience', projectId: 'proj-design-001' },
    { id: 'marketing', name: 'Marketing', icon: '📢', department: 'Marketing', projectId: 'proj-mkt-001' },
    { id: 'sales', name: 'Sales', icon: '💼', department: 'Sales', projectId: 'proj-sales-001' },
    { id: 'support', name: 'Support', icon: '🎧', department: 'Customer Success', projectId: 'proj-support-001' },
    { id: 'hr', name: 'Human Resources', icon: '👥', department: 'People Operations', projectId: 'proj-hr-001' },
    { id: 'finance', name: 'Finance', icon: '💰', department: 'Finance', projectId: 'proj-finance-001' },
    { id: 'operations', name: 'Operations', icon: '🔧', department: 'Operations', projectId: 'proj-ops-001' }
  ];

  useEffect(() => {
    const fetchProjectData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Fetch data for all projects
        const projectDataPromises = tabs.map(async (tab) => {
          try {
            const response = await apiService.getProjectData(tab.projectId);
            return { [tab.id]: response.data };
          } catch (err) {
            console.error(`Failed to fetch data for project ${tab.name}:`, err);
            // Return mock data for failed requests
            return { 
              [tab.id]: {
                id: tab.projectId,
                name: tab.name,
                department: tab.department,
                description: `${tab.name} project dashboard`,
                status: 'active' as const,
                progress: Math.floor(Math.random() * 40) + 60,
                startDate: '2024-01-01',
                metrics: [
                  {
                    id: `${tab.id}-metric-1`,
                    title: 'Active Tasks',
                    value: Math.floor(Math.random() * 50) + 10,
                    trend: 'up' as const,
                    percentage: Math.floor(Math.random() * 20) + 5,
                    icon: '📊'
                  },
                  {
                    id: `${tab.id}-metric-2`,
                    title: 'Project Progress',
                    value: Math.floor(Math.random() * 100) + 50,
                    trend: 'up' as const,
                    percentage: Math.floor(Math.random() * 15) + 2,
                    unit: '%',
                    icon: '📈'
                  },
                  {
                    id: `${tab.id}-metric-3`,
                    title: 'Completed Milestones',
                    value: Math.floor(Math.random() * 20) + 5,
                    trend: 'neutral' as const,
                    percentage: Math.floor(Math.random() * 10),
                    icon: '✅'
                  },
                  {
                    id: `${tab.id}-metric-4`,
                    title: 'Open Issues',
                    value: Math.floor(Math.random() * 15) + 2,
                    trend: 'down' as const,
                    percentage: -Math.floor(Math.random() * 8) - 1,
                    icon: '🔧'
                  }
                ],
                charts: {
                  sales_chart: {
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                    values: Array.from({ length: 6 }, () => Math.floor(Math.random() * 50000) + 10000)
                  },
                  user_activity: {
                    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
                    values: Array.from({ length: 4 }, () => Math.floor(Math.random() * 5000) + 1000)
                  },
                  performance_chart: {
                    labels: ['Q1', 'Q2', 'Q3', 'Q4'],
                    values: Array.from({ length: 4 }, () => Math.floor(Math.random() * 100) + 50)
                  }
                },
                teamLead: `${tab.name} Lead`,
                memberCount: Math.floor(Math.random() * 15) + 5,
                lastUpdated: new Date().toISOString()
              }
            };
          }
        });
        
        const projectDataResults = await Promise.all(projectDataPromises);
        const combinedProjectData = projectDataResults.reduce((acc, curr) => ({ ...acc, ...curr }), {});
        
        setProjectData(combinedProjectData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred while fetching project data');
        console.error('Error fetching project data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjectData();
  }, []);

  const getCurrentProjectData = (): ProjectData | null => {
    return projectData[activeTab] || null;
  };

  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'active': return 'success';
      case 'completed': return 'info';
      case 'on-hold': return 'warning';
      case 'planning': return 'neutral';
      default: return 'neutral';
    }
  };

  const renderProjectDashboard = () => {
    if (loading) {
      return (
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <p>Loading project data...</p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="error-state">
          <h3>Error Loading Data</h3>
          <p>{error}</p>
          <button onClick={() => window.location.reload()}>Retry</button>
        </div>
      );
    }

    const currentProject = getCurrentProjectData();
    
    if (!currentProject) {
      return (
        <div className="no-data-state">
          <h3>No Data Available</h3>
          <p>No data available for this project. Please try again later.</p>
        </div>
      );
    }

    return (
      <div className="project-dashboard-content">
        {/* Project Header */}
        <div className="project-header">
          <div className="project-info">
            <h2 className="project-name">{currentProject.name}</h2>
            <p className="project-department">{currentProject.department}</p>
            {currentProject.description && (
              <p className="project-description">{currentProject.description}</p>
            )}
            <div className="project-meta">
              <span className={`project-status project-status--${getStatusColor(currentProject.status)}`}>
                Status: {currentProject.status.charAt(0).toUpperCase() + currentProject.status.slice(1)}
              </span>
              {currentProject.progress && (
                <span className="project-progress">Progress: {currentProject.progress}%</span>
              )}
              {currentProject.teamLead && (
                <span className="project-lead">Lead: {currentProject.teamLead}</span>
              )}
              {currentProject.memberCount && (
                <span className="member-count">Team Size: {currentProject.memberCount}</span>
              )}
              {currentProject.lastUpdated && (
                <span className="last-updated">
                  Updated: {new Date(currentProject.lastUpdated).toLocaleDateString()}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Project Metrics */}
        <div className="project-metrics">
          <h3>Key Metrics</h3>
          <div className="metrics-grid">
            {currentProject.metrics && currentProject.metrics.length > 0 ? (
              currentProject.metrics.map((metric) => (
                <MetricCard key={metric.id} metric={metric} />
              ))
            ) : (
              <div className="no-metrics">No metrics available</div>
            )}
          </div>
        </div>

        {/* Project Charts */}
        <div className="project-charts">
          <h3>Analytics</h3>
          <div className="charts-grid">
            <DashboardCard title="Performance Trends" variant="chart" size="large">
              <div className="chart-placeholder">
                <p>Performance data for {currentProject.name}</p>
                <div className="chart-data">
                  {currentProject.charts?.performance_chart ? (
                    <div>
                      <strong>Latest Data Points:</strong>
                      <ul>
                        {currentProject.charts.performance_chart.labels.map((label: string, index: number) => (
                          <li key={`perf-${index}`}>
                            {label}: {currentProject.charts.performance_chart.values[index]}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <p>No performance data available</p>
                  )}
                </div>
              </div>
            </DashboardCard>

            <DashboardCard title="Activity Overview" variant="chart" size="medium">
              <div className="chart-placeholder">
                <p>Activity data for {currentProject.name}</p>
                <div className="chart-data">
                  {currentProject.charts?.user_activity ? (
                    <div>
                      <strong>Activity Levels:</strong>
                      <ul>
                        {currentProject.charts.user_activity.labels.map((label: string, index: number) => (
                          <li key={`activity-${index}`}>
                            {label}: {currentProject.charts.user_activity.values[index]}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <p>No activity data available</p>
                  )}
                </div>
              </div>
            </DashboardCard>

            <DashboardCard title="Revenue Data" variant="chart" size="medium">
              <div className="chart-placeholder">
                <p>Revenue data for {currentProject.name}</p>
                <div className="chart-data">
                  {currentProject.charts?.sales_chart ? (
                    <div>
                      <strong>Revenue Metrics:</strong>
                      <ul>
                        {currentProject.charts.sales_chart.labels.map((label: string, index: number) => (
                          <li key={`sales-${index}`}>
                            {label}: ${currentProject.charts.sales_chart.values[index].toLocaleString()}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <p>No revenue data available</p>
                  )}
                </div>
              </div>
            </DashboardCard>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="project-dashboard">
      {/* Main Header */}
      <div className="project-header">
        <div className="project-info">
          <h1 className="project-title">
            Smith & Nephew Project Dashboard
          </h1>
          <p className="project-description">
            Comprehensive insights on AGILE processes for Smith & Nephew R&D teams.
          </p>
        </div>
      </div>

      {/* Tab Navigation */}
      <TabNavigation
        activeTab={activeTab}
        onTabChange={setActiveTab}
        tabs={tabs}
      />

      {/* Project Dashboard Content */}
      <div className="tab-content">
        {renderProjectDashboard()}
      </div>
    </div>
  );
};

export default ProjectDashboard;
