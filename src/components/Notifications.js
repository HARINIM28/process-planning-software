import React from 'react';
import { PieChart, Pie, Tooltip } from 'recharts';
import './Notifications.css';

const notificationData = [
  { name: 'Mentions', value: 5 },
  { name: 'Meeting Reminders', value: 8 },
  { name: 'Deadlines', value: 3 },
  { name: 'Project Updates', value: 7 }
];

const Notifications = () => {
  return (
    <div className="notifications-container">
      <h2>Notifications</h2>
      <PieChart width={300} height={300}>
        <Pie data={notificationData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} fill="#82ca9d" label />
        <Tooltip />
      </PieChart>
    </div>
  );
};

export default Notifications;
