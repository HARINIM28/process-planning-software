import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

import { io } from "socket.io-client";

// Setup Socket connection
const socket = io("http://localhost:5000");

const ChatRoom = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [username, setUsername] = useState("");
  const [isUrgent, setIsUrgent] = useState(false);
  const navigate = useNavigate();
navigate('/some-route');

  // Handle new message
  useEffect(() => {
    socket.on("newMessage", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });
  }, []);

  // Join the chat room with a username
  const joinChat = () => {
    socket.emit("join", { name: username });
  };

  const sendMessage = () => {
    const message = {
      text: newMessage,
      urgent: isUrgent,
      username: username,
    };
    socket.emit("sendMessage", message);
    setNewMessage("");
  };

  const handleUrgentToggle = () => {
    setIsUrgent(!isUrgent);
  };

  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredMessages = messages.filter((msg) =>
      msg.text.toLowerCase().includes(searchTerm)
    );
    setMessages(filteredMessages);
  };
  

  const handleMessageWithMentions = (message) => {
    // Basic mention system: Look for `@username`
    const mentionRegex = new RegExp(`@${username}`, 'g');
    if (mentionRegex.test(message.text)) {
      alert(`You were mentioned in a message: ${message.text}`);
    }
    return message;
  };
  
  useEffect(() => {
    socket.on("newMessage", (message) => {
      const messageWithMentions = handleMessageWithMentions(message);
      setMessages((prevMessages) => [...prevMessages, messageWithMentions]);
    });
  }, []);
  
  return (
    <div>
      <h2>Chat Room</h2>
      <input
        type="text"
        placeholder="Enter Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button onClick={joinChat}>Join</button>
      <div>
        <input
          type="text"
          placeholder="Search messages"
          onChange={handleSearch}
        />
      </div>
      <div>
        <label>
          <input type="checkbox" checked={isUrgent} onChange={handleUrgentToggle} />
          Mark as Urgent
        </label>
      </div>
      <div className="messages">
        {messages.map((message, index) => (
          <div key={index} style={{ color: message.urgent ? "red" : "black" }}>
            <strong>{message.username}:</strong> {message.text}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        placeholder="Type a message"
      />
      <button onClick={sendMessage}>Send</button>
      <button onClick={() => navigate.push("/schedule")}>Schedule a Meeting</button>
    </div>
  );
};

export default ChatRoom;
