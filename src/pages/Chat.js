import React, { useState, useEffect, useRef } from "react";
import { 
  FiSearch, FiSend, FiMoon, FiSun, FiUserCheck, FiUserX, 
  FiUsers, FiUser, FiCalendar, FiTag, FiStar, FiFilter,
  FiVideo, FiPhone, FiMoreVertical, FiPlus, FiMessageSquare,
  FiMenu
} from "react-icons/fi";
import "./Chat.css";

const Chat = () => {
  const [messages, setMessages] = useState([
    { 
      id: 1, 
      name: "Sarah Watson", 
      avatar: "👩‍🦰", 
      text: "Hey! How's it going?", 
      time: "10:30 AM", 
      type: "received",
      priority: "normal",
      isGroup: false,
      isMentioned: false
    },
    { 
      id: 2, 
      name: "Jenny Wilson", 
      avatar: "👨‍🦲", 
      text: "Sure, that sounds good!", 
      time: "10:32 AM", 
      type: "sent",
      priority: "normal",
      isGroup: false,
      isMentioned: false
    },
    { 
      id: 3, 
      name: "Jane Cooper", 
      avatar: "👩🏽", 
      text: "@John I'll take care of it", 
      time: "10:35 AM", 
      type: "received", 
      priority: "urgent",
      isGroup: true,
      isMentioned: true
    },
    { 
      id: 4, 
      name: "Robert Fox", 
      avatar: "👨🏾", 
      text: "Are you available?", 
      time: "10:37 AM", 
      type: "sent",
      priority: "normal",
      isGroup: false,
      isMentioned: false
    },
  ]);

  const [newMessage, setNewMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const [showMeetingModal, setShowMeetingModal] = useState(false);
  const [showNewChatModal, setShowNewChatModal] = useState(false);
  const [selectedChat, setSelectedChat] = useState(null);
  const [filterPriority, setFilterPriority] = useState("all");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [chats, setChats] = useState([
    { id: 1, name: "Sarah Watson", avatar: "👩‍🦰", lastMessage: "Hey! How's it going?", time: "10:30 AM", unread: 2, isGroup: false },
    { id: 2, name: "Project Team", avatar: "👥", lastMessage: "@John I'll take care of it", time: "10:35 AM", unread: 5, isGroup: true },
    { id: 3, name: "Robert Fox", avatar: "👨🏾", lastMessage: "Are you available?", time: "10:37 AM", unread: 0, isGroup: false },
  ]);
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
        priority: "normal",
        isGroup: selectedChat?.isGroup || false,
        isMentioned: false
      };
      setMessages([...messages, newMsg]);
      setNewMessage("");
    }
  };

  // Filter messages based on search term and priority
  const filteredMessages = messages.filter((msg) => {
    const matchesSearch = msg.text.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPriority = filterPriority === "all" || msg.priority === filterPriority;
    return matchesSearch && matchesPriority;
  });

  // Handle meeting scheduling
  const handleScheduleMeeting = (meetingDetails) => {
    // Implementation for meeting scheduling
    console.log("Scheduling meeting:", meetingDetails);
    setShowMeetingModal(false);
  };

  // Handle new chat creation
  const handleNewChat = (chatDetails) => {
    // Implementation for new chat creation
    console.log("Creating new chat:", chatDetails);
    setShowNewChatModal(false);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className={`chat-container ${darkMode ? "dark" : ""}`}>
      {/* Chat Sidebar */}
      <div className={`chat-sidebar ${isSidebarOpen ? 'active' : ''}`}>
        <div className="sidebar-header">
          <h2>Chats</h2>
          <button className="new-chat-btn" onClick={() => setShowNewChatModal(true)}>
            <FiPlus /> New Chat
          </button>
        </div>
        
        <div className="search-bar">
          <FiSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search conversations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="chat-list">
          {chats.map((chat) => (
            <div 
              key={chat.id} 
              className={`chat-item ${selectedChat?.id === chat.id ? 'active' : ''}`}
              onClick={() => setSelectedChat(chat)}
            >
              <span className="avatar">{chat.avatar}</span>
              <div className="chat-info">
                <div className="chat-name-row">
                  <span className="chat-name">{chat.name}</span>
                  {chat.isGroup && <FiUsers className="group-icon" />}
                </div>
                <span className="last-message">{chat.lastMessage}</span>
                <span className="chat-time">{chat.time}</span>
                {chat.unread > 0 && <span className="unread-badge">{chat.unread}</span>}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="chat-main">
        {selectedChat ? (
          <>
            <div className="chat-header">
              <div className="user-info">
                <button className="toggle-sidebar" onClick={toggleSidebar}>
                  <FiMenu />
                </button>
                <span className="avatar">{selectedChat.avatar}</span>
                <div>
                  <h2>{selectedChat.name}</h2>
                  <span className="user-status">
                    {isOnline ? <FiUserCheck className="online-icon" /> : <FiUserX className="offline-icon" />}
                    {isOnline ? "Online" : "Last seen at 10:45 AM"}
                  </span>
                </div>
              </div>

              <div className="header-actions">
                <button className="icon-button" onClick={() => setShowMeetingModal(true)}>
                  <FiCalendar />
                </button>
                <button className="icon-button">
                  <FiVideo />
                </button>
                <button className="icon-button">
                  <FiPhone />
                </button>
                <button className="icon-button">
                  <FiMoreVertical />
                </button>
              </div>
            </div>

            {/* Message Filter */}
            <div className="message-filter">
              <select value={filterPriority} onChange={(e) => setFilterPriority(e.target.value)}>
                <option value="all">All Messages</option>
                <option value="urgent">Urgent</option>
                <option value="important">Important</option>
                <option value="normal">Normal</option>
              </select>
            </div>

            {/* Chat Messages */}
            <div className="chat-messages">
              {filteredMessages.map((msg) => (
                <div key={msg.id} className={`message ${msg.type} ${msg.priority} ${msg.isMentioned ? 'mentioned' : ''}`}>
                  <span className="avatar">{msg.avatar}</span>
                  <div className="message-content">
                    <div className="message-header">
                      <span className="sender-name">{msg.name}</span>
                      <span className="message-time">{msg.time}</span>
                    </div>
                    <div className="message-bubble">
                      {msg.text}
                      {msg.isMentioned && <FiTag className="mention-icon" />}
                      {msg.priority === 'urgent' && <FiStar className="priority-icon" />}
                    </div>
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
          </>
        ) : (
          <div className="no-chat-selected">
            <button className="toggle-sidebar" onClick={toggleSidebar}>
              <FiMenu />
            </button>
            <FiMessageSquare />
            <h3>Select a chat to start messaging</h3>
          </div>
        )}
      </div>

      {/* Meeting Modal */}
      {showMeetingModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Schedule Meeting</h3>
            <form onSubmit={(e) => {
              e.preventDefault();
              handleScheduleMeeting({
                title: e.target.title.value,
                date: e.target.date.value,
                time: e.target.time.value,
                participants: e.target.participants.value.split(',').map(p => p.trim())
              });
            }}>
              <input type="text" name="title" placeholder="Meeting Title" required />
              <input type="date" name="date" required />
              <input type="time" name="time" required />
              <input type="text" name="participants" placeholder="Participants (comma-separated)" required />
              <div className="modal-actions">
                <button type="button" onClick={() => setShowMeetingModal(false)}>Cancel</button>
                <button type="submit">Schedule</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* New Chat Modal */}
      {showNewChatModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>New Chat</h3>
            <form onSubmit={(e) => {
              e.preventDefault();
              handleNewChat({
                name: e.target.name.value,
                type: e.target.type.value,
                participants: e.target.participants.value.split(',').map(p => p.trim())
              });
            }}>
              <input type="text" name="name" placeholder="Chat Name" required />
              <select name="type" required>
                <option value="private">Private Chat</option>
                <option value="group">Group Chat</option>
              </select>
              <input type="text" name="participants" placeholder="Participants (comma-separated)" required />
              <div className="modal-actions">
                <button type="button" onClick={() => setShowNewChatModal(false)}>Cancel</button>
                <button type="submit">Create</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chat;
