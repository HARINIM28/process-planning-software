
// src/components/Dashboard.js
import React from "react";
import { Doughnut, Bar, Line } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, PointElement, LineElement } from "chart.js";
import "./styles.css";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, PointElement, LineElement);

const Dashboard = () => {
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

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <div className="dashboard-grid">
        <div className="chart-card">
          <h3>Pending Work Tracker</h3>
          <Doughnut data={pendingWorkData} />
        </div>
        <div className="chart-card">
          <h3>Performance Improvement Analysis</h3>
          <Line data={performanceData} />
        </div>
        <div className="chart-card">
          <h3>Completed Work Overview</h3>
          <Bar data={completedWorkData} />
        </div>
        <div className="chart-card">
          <h3>Notifications Dashboard</h3>
          <Doughnut data={notificationsData} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
