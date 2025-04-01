import React, { useState } from 'react';
import './MeetingScheduler.css';

const MeetingScheduler = () => {
  const [meetings, setMeetings] = useState([]);
  const [meetingName, setMeetingName] = useState('');
  const [meetingTime, setMeetingTime] = useState('');

  const scheduleMeeting = () => {
    if (meetingName && meetingTime) {
      setMeetings([...meetings, { name: meetingName, time: meetingTime }]);
      setMeetingName('');
      setMeetingTime('');
    }
  };

  return (
    <div className="meeting-container">
      <h2>Meeting Scheduler</h2>
      <div className="meeting-form">
        <input type="text" placeholder="Meeting Name" value={meetingName} onChange={(e) => setMeetingName(e.target.value)} />
        <input type="datetime-local" value={meetingTime} onChange={(e) => setMeetingTime(e.target.value)} />
        <button onClick={scheduleMeeting}>Schedule</button>
      </div>
      <div className="meeting-list">
        <h3>Scheduled Meetings</h3>
        <ul>
          {meetings.map((meet, index) => (
            <li key={index}>{meet.name} - {meet.time}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MeetingScheduler;
