import React, { useState } from 'react';
import './ChatSystem.css';

const ChatSystem = () => {
  const [messages, setMessages] = useState([
    { sender: 'Alice', text: 'Hey team!', priority: 'normal' },
    { sender: 'Bob', text: '@Alice Let’s schedule a meeting.', priority: 'urgent' }
  ]);
  const [input, setInput] = useState('');

  const sendMessage = () => {
    if (input.trim()) {
      setMessages([...messages, { sender: 'You', text: input, priority: 'normal' }]);
      setInput('');
    }
  };

  return (
    <div className="chat-container">
      <h2>Chat System</h2>
      <div className="chat-box">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.priority}`}>

            <strong>{msg.sender}: </strong>{msg.text}
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type a message..." />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatSystem;
