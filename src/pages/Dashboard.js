// src/components/Dashboard.js
import React, { useState } from "react";
import { Doughnut, Bar, Line } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, PointElement, LineElement } from "chart.js";
import { FiBell, FiUser, FiSettings, FiTrendingUp, FiCheckCircle, FiClock, FiAlertCircle } from "react-icons/fi";
import "./styles.css";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, PointElement, LineElement);

const Dashboard = () => {
  const [timeRange, setTimeRange] = useState("week");

  // Pending Work Tracker (Doughnut Chart)
  const pendingWorkData = {
    labels: ["High", "Medium", "Low"],
    datasets: [{
      data: [5, 7, 8], 
      backgroundColor: ["#E57373", "#FFB74D", "#81C784"]
    }]
  };

  // Performance Improvement (Line Chart)
  const performanceData = {
    labels: ["Jan", "Feb", "Mar", "Apr"],
    datasets: [{
      label: "Performance Trend",
      data: [20, 35, 30, 50],
      borderColor: "#42A5F5",
      fill: true,
      backgroundColor: "rgba(66, 165, 245, 0.2)"
    }]
  };

  // Completed Work Overview (Bar Chart)
  const completedWorkData = {
    labels: ["Jan", "Feb", "Mar", "Apr"],
    datasets: [
      { label: "Features Developed", data: [8, 7, 9, 6], backgroundColor: "#42A5F5" },
      { label: "Documents Completed", data: [6, 5, 7, 4], backgroundColor: "#FFB74D" }
    ]
  };

  // Notifications Dashboard (Doughnut Chart)
  const notificationsData = {
    labels: ["Mentions", "Meeting Reminders", "Deadlines"],
    datasets: [{
      data: [40, 4, 2],
      backgroundColor: ["#42A5F5", "#FFB74D", "#E57373"]
    }]
  };

  // Quick Stats Data
  const quickStats = [
    { icon: <FiTrendingUp />, title: "Total Tasks", value: "24", trend: "+12%" },
    { icon: <FiCheckCircle />, title: "Completed", value: "18", trend: "+8%" },
    { icon: <FiClock />, title: "In Progress", value: "6", trend: "-2%" },
    { icon: <FiAlertCircle />, title: "Overdue", value: "2", trend: "-5%" }
  ];

  // Recent Activity Data
  const recentActivity = [
    { user: "John Doe", action: "completed", target: "Project Review", time: "2 hours ago" },
    { user: "Jane Smith", action: "commented on", target: "Design Document", time: "3 hours ago" },
    { user: "Mike Johnson", action: "started", target: "New Feature", time: "4 hours ago" },
    { user: "Sarah Wilson", action: "updated", target: "Task Status", time: "5 hours ago" }
  ];

  return (
    <div className="dashboard">
      {/* Header Section */}
      <div className="dashboard-header">
        <div className="header-left">
          <h1>Dashboard</h1>
          <div className="time-range-selector">
            <button 
              className={timeRange === "day" ? "active" : ""} 
              onClick={() => setTimeRange("day")}
            >
              Day
            </button>
            <button 
              className={timeRange === "week" ? "active" : ""} 
              onClick={() => setTimeRange("week")}
            >
              Week
            </button>
            <button 
              className={timeRange === "month" ? "active" : ""} 
              onClick={() => setTimeRange("month")}
            >
              Month
            </button>
          </div>
        </div>
        <div className="header-right">
          <button className="icon-button">
            <FiBell />
            <span className="notification-badge">3</span>
          </button>
          <button className="icon-button">
            <FiSettings />
          </button>
          <div className="user-profile">
            <FiUser />
            <span>John Doe</span>
          </div>
        </div>
      </div>

      {/* Quick Stats Section */}
      <div className="quick-stats">
        {quickStats.map((stat, index) => (
          <div key={index} className="stat-card">
            <div className="stat-icon">{stat.icon}</div>
            <div className="stat-info">
              <h3>{stat.title}</h3>
              <div className="stat-value">
                <span className="value">{stat.value}</span>
                <span className={`trend ${stat.trend.startsWith('+') ? 'positive' : 'negative'}`}>
                  {stat.trend}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Charts Grid */}
      <div className="dashboard-grid">
        <div className="chart-card">
          <div className="chart-header">
            <h3>Pending Work Tracker</h3>
            <button className="chart-options">...</button>
          </div>
          <Doughnut data={pendingWorkData} />
        </div>
        <div className="chart-card">
          <div className="chart-header">
            <h3>Performance Improvement Analysis</h3>
            <button className="chart-options">...</button>
          </div>
          <Line data={performanceData} />
        </div>
        <div className="chart-card">
          <div className="chart-header">
            <h3>Completed Work Overview</h3>
            <button className="chart-options">...</button>
          </div>
          <Bar data={completedWorkData} />
        </div>
        <div className="chart-card">
          <div className="chart-header">
            <h3>Notifications Dashboard</h3>
            <button className="chart-options">...</button>
          </div>
          <Doughnut data={notificationsData} />
        </div>
      </div>

      {/* Recent Activity Section */}
      <div className="recent-activity">
        <h3>Recent Activity</h3>
        <div className="activity-list">
          {recentActivity.map((activity, index) => (
            <div key={index} className="activity-item">
              <div className="activity-icon">
                {activity.action === "completed" && <FiCheckCircle className="completed" />}
                {activity.action === "commented on" && <FiUser className="commented" />}
                {activity.action === "started" && <FiTrendingUp className="started" />}
                {activity.action === "updated" && <FiSettings className="updated" />}
              </div>
              <div className="activity-content">
                <p>
                  <strong>{activity.user}</strong> {activity.action} <strong>{activity.target}</strong>
                </p>
                <span className="activity-time">{activity.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
