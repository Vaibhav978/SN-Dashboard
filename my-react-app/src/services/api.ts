const API_BASE_URL = 'http://127.0.0.1:5001/api'

export interface MetricData {
  id: string
  title: string
  value: number
  trend: 'up' | 'down' | 'neutral'
  percentage: number
  unit?: string
  icon?: string
}

export interface ChartData {
  labels: string[]
  values: number[]
}

export interface ProjectData {
  id: string
  name: string
  department: string
  description?: string
  status: 'active' | 'completed' | 'on-hold' | 'planning'
  progress?: number
  startDate?: string
  endDate?: string
  metrics: MetricData[]
  charts: {
    sales_chart: ChartData
    user_activity: ChartData
    performance_chart: ChartData
    [key: string]: ChartData
  }
  teamLead?: string
  memberCount?: number
  lastUpdated?: string
}

export interface DashboardData {
  metrics: MetricData[]
  charts: {
    sales_chart: ChartData
    user_activity: ChartData
    [key: string]: ChartData
  }
}

export interface ApiResponse<T> {
  success: boolean
  data: T
  message?: string
  timestamp: string
}

export const apiService = {
  async getDashboardData(): Promise<ApiResponse<DashboardData>> {
    const response = await fetch(`${API_BASE_URL}/dashboard`)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    return response.json()
  },

  async getMetrics(): Promise<ApiResponse<MetricData[]>> {
    const response = await fetch(`${API_BASE_URL}/metrics`)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    return response.json()
  },

  async getChartData(chartType: string): Promise<ApiResponse<ChartData>> {
    const response = await fetch(`${API_BASE_URL}/charts/${chartType}`)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    return response.json()
  },

  // Add the missing getProjectData method
  async getProjectData(projectId: string): Promise<ApiResponse<ProjectData>> {
    // Since the backend doesn't have this endpoint, we'll simulate it
    const response = await fetch(`${API_BASE_URL}/dashboard`)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const dashboardData = await response.json()
    
    // Transform dashboard data to project data format
    const projectData: ProjectData = {
      id: projectId,
      name: 'Sample Project',
      department: 'Technology',
      description: 'Sample project description',
      status: 'active',
      progress: 75,
      startDate: '2024-01-01',
      metrics: dashboardData.data.metrics,
      charts: {
        ...dashboardData.data.charts,
        performance_chart: dashboardData.data.charts.sales_chart // Use sales chart as performance
      },
      teamLead: 'Team Lead',
      memberCount: 8,
      lastUpdated: new Date().toISOString()
    }
    
    return {
      success: true,
      data: projectData,
      timestamp: new Date().toISOString()
    }
  }
}
