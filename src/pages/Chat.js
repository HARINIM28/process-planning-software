

import React, { useState, useEffect, useRef } from "react";
import { FiSearch, FiSend, FiMoon, FiSun, FiUserCheck, FiUserX } from "react-icons/fi";
import "./Chat.css";

const Chat = () => {
  const [messages, setMessages] = useState([
    { id: 1, name: "Sarah Watson", avatar: "👩‍🦰", text: "Hey! How’s it going?", time: "10:30 AM", type: "received" },
    { id: 2, name: "Jenny Wilson", avatar: "👨‍🦲", text: "Sure, that sounds good!", time: "10:32 AM", type: "sent" },
    { id: 3, name: "Jane Cooper", avatar: "👩🏽", text: "I’ll take care of it", time: "10:35 AM", type: "received", urgent: true },
    { id: 4, name: "Robert Fox", avatar: "👨🏾", text: "Are you available?", time: "10:37 AM", type: "sent" },
  ]);

  const [newMessage, setNewMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const chatEndRef = useRef(null);

  // Auto-scroll to latest message
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Typing indicator
  useEffect(() => {
    if (newMessage) {
      setIsTyping(true);
      const timer = setTimeout(() => setIsTyping(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [newMessage]);

  // Handle sending messages
  const handleSendMessage = () => {
    if (newMessage.trim() !== "") {
      const newMsg = {
        id: messages.length + 1,
        name: "You",
        avatar: "🧑‍💻",
        text: newMessage,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        type: "sent",
      };
      setMessages([...messages, newMsg]);
      setNewMessage("");
    }
  };

  // Filter messages based on search term
  const filteredMessages = messages.filter((msg) =>
    msg.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={`chat-container ${darkMode ? "dark" : ""}`}>
      {/* Chat Header */}
      <div className="chat-header">
        <div className="user-info">
          <h2>Chat Room</h2>
          <span className="user-status">
            {isOnline ? <FiUserCheck className="online-icon" /> : <FiUserX className="offline-icon" />}
            {isOnline ? "Online" : "Last seen at 10:45 AM"}
          </span>
        </div>

        <button className="theme-toggle" onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? <FiSun /> : <FiMoon />}
        </button>
      </div>

      {/* Search Bar */}
      <div className="search-bar">
        <FiSearch className="search-icon" />
        <input
          type="text"
          placeholder="Search messages..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Chat Messages */}
      <div className="chat-list">
        {filteredMessages.map((msg) => (
          <div key={msg.id} className={`chat-item ${msg.type}`}>
            <span className="avatar">{msg.avatar}</span>
            <div className="chat-details">
              <p className="chat-name">{msg.name}</p>
              <div className={`chat-bubble ${msg.type} ${msg.urgent ? "urgent" : ""}`}>
                {msg.text}
              </div>
              <span className="chat-time">{msg.time}</span>
            </div>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      {/* Typing Indicator */}
      {isTyping && <div className="typing-indicator">User is typing...</div>}

      {/* Message Input */}
      <div className="chat-input">
        <input
          type="text"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
        />
        <button onClick={handleSendMessage}>
          <FiSend />
        </button>
      </div>
    </div>
  );
};

export default Chat;
