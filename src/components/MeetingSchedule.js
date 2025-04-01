import React, { useState } from "react";

const MeetingSchedule = () => {
  const [meetingTitle, setMeetingTitle] = useState("");
  const [meetingDate, setMeetingDate] = useState("");
  const [room, setRoom] = useState("");
  const [scheduledMeetings, setScheduledMeetings] = useState([]);

  const handleSchedule = () => {
    const newMeeting = { title: meetingTitle, date: meetingDate, room: room };
    setScheduledMeetings((prevMeetings) => [...prevMeetings, newMeeting]);
    setMeetingTitle("");
    setMeetingDate("");
    setRoom("");
  };

  return (
    <div>
      <h2>Schedule a Meeting</h2>
      <input
        type="text"
        placeholder="Meeting Title"
        value={meetingTitle}
        onChange={(e) => setMeetingTitle(e.target.value)}
      />
      <input
        type="datetime-local"
        value={meetingDate}
        onChange={(e) => setMeetingDate(e.target.value)}
      />
      <input
        type="text"
        placeholder="Room"
        value={room}
        onChange={(e) => setRoom(e.target.value)}
      />
      <button onClick={handleSchedule}>Schedule Meeting</button>

      <div>
        <h3>Scheduled Meetings</h3>
        {scheduledMeetings.length > 0 ? (
          <ul>
            {scheduledMeetings.map((meeting, index) => (
              <li key={index}>
                {meeting.title} | {meeting.date} | Room: {meeting.room}
              </li>
            ))}
          </ul>
        ) : (
          <p>No meetings scheduled yet.</p>
        )}
      </div>
    </div>
  );
};

export default MeetingSchedule;
