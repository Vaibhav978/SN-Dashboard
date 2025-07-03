from flask import Flask, jsonify, request
from flask_cors import CORS
import json
from datetime import datetime
import random

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Sample data for your dashboard
sample_dashboard_data = {
    "metrics": [
        {"id": "1", "title": "Jira: Time to go from Open -> Closed", "value": 125000, "trend": "up", "percentage": 12.5, "icon": "📊"},
        {"id": "2", "title": "First Commit -> Merge", "value": 8420, "trend": "up", "percentage": 8.2, "icon": "📈"},
        {"id": "3", "title": "Number of Tickets re-opened", "value": 95000, "trend": "down", "percentage": -3.1, "icon": "🔧"},
        {"id": "4", "title": "Total Active Issues", "value": 1250, "trend": "up", "percentage": 15.3, "icon": "✅"}
    ],
    "charts": {
        "sales_chart": {
            "labels": ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
            "values": [12000, 19000, 15000, 25000, 22000, 30000]
        },
        "user_activity": {
            "labels": ["Week 1", "Week 2", "Week 3", "Week 4"],
            "values": [2100, 2800, 2400, 3200]
        },
        "performance_chart": {
            "labels": ["Q1", "Q2", "Q3", "Q4"],
            "values": [75, 82, 78, 85]
        }
    }
}

@app.route('/')
def home():
    return jsonify({
        "message": "Smith & Nephew Dashboard API",
        "status": "running",
        "timestamp": datetime.now().isoformat()
    })

@app.route('/api/dashboard', methods=['GET'])
def get_dashboard_data():
    """Get all dashboard data"""
    return jsonify({
        "success": True,
        "data": sample_dashboard_data,
        "timestamp": datetime.now().isoformat()
    })

@app.route('/api/metrics', methods=['GET'])
def get_metrics():
    """Get metrics data"""
    return jsonify({
        "success": True,
        "data": sample_dashboard_data["metrics"],
        "timestamp": datetime.now().isoformat()
    })

@app.route('/api/charts/<chart_type>', methods=['GET'])
def get_chart_data(chart_type):
    """Get specific chart data"""
    if chart_type in sample_dashboard_data["charts"]:
        return jsonify({
            "success": True,
            "data": sample_dashboard_data["charts"][chart_type],
            "timestamp": datetime.now().isoformat()
        })
    else:
        return jsonify({
            "success": False,
            "message": f"Chart type '{chart_type}' not found"
        }), 404

# ADD THIS NEW ENDPOINT
@app.route('/api/projects/<project_id>', methods=['GET'])
def get_project_data(project_id):
    """Get project data for a specific project"""
    # Generate mock project data
    project_data = {
        "id": project_id,
        "name": f"Project {project_id}",
        "department": "Technology",
        "description": f"Project dashboard for {project_id}",
        "status": "active",
        "progress": random.randint(60, 95),
        "startDate": "2024-01-01",
        "metrics": [
            {
                "id": f"{project_id}-metric-1",
                "title": "Active Tasks",
                "value": random.randint(10, 60),
                "trend": "up",
                "percentage": random.randint(5, 25),
                "icon": "📊"
            },
            {
                "id": f"{project_id}-metric-2",
                "title": "Project Progress",
                "value": random.randint(50, 150),
                "trend": "up",
                "percentage": random.randint(2, 17),
                "unit": "%",
                "icon": "📈"
            },
            {
                "id": f"{project_id}-metric-3",
                "title": "Completed Milestones",
                "value": random.randint(5, 25),
                "trend": "neutral",
                "percentage": random.randint(0, 10),
                "icon": "✅"
            },
            {
                "id": f"{project_id}-metric-4",
                "title": "Open Issues",
                "value": random.randint(2, 17),
                "trend": "down",
                "percentage": -random.randint(1, 9),
                "icon": "🔧"
            }
        ],
        "charts": {
            "sales_chart": {
                "labels": ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
                "values": [random.randint(10000, 60000) for _ in range(6)]
            },
            "user_activity": {
                "labels": ["Week 1", "Week 2", "Week 3", "Week 4"],
                "values": [random.randint(1000, 6000) for _ in range(4)]
            },
            "performance_chart": {
                "labels": ["Q1", "Q2", "Q3", "Q4"],
                "values": [random.randint(50, 150) for _ in range(4)]
            }
        },
        "teamLead": f"Team Lead for {project_id}",
        "memberCount": random.randint(5, 20),
        "lastUpdated": datetime.now().isoformat()
    }
    
    return jsonify({
        "success": True,
        "data": project_data,
        "timestamp": datetime.now().isoformat()
    })

@app.route('/api/metrics', methods=['POST'])
def update_metrics():
    """Update metrics data"""
    try:
        data = request.get_json()
        return jsonify({
            "success": True,
            "message": "Metrics updated successfully",
            "data": data,
            "timestamp": datetime.now().isoformat()
        })
    except Exception as e:
        return jsonify({
            "success": False,
            "message": str(e)
        }), 400

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        "status": "healthy",
        "timestamp": datetime.now().isoformat()
    })

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5001)
