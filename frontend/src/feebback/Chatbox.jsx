import React, { useState, useEffect, useRef } from "react";
import "../../../../Project/ITP/src/CSS/ChatBox.css";
import { FaRobot, FaUser, FaPaperPlane, FaTimes, FaComments } from "react-icons/fa";

const ChatBox = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const chatboxRef = useRef(null);

  const predefinedQuestions = [
    "What are your check-in/check-out times?",
    "Do you offer airport pickup?",
    "What payment methods do you accept?",
    "Is breakfast included?",
    "Do you have a swimming pool?",
    "What's your cancellation policy?",
    "Are pets allowed?",
    "Do you have parking facilities?"
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen) {
      setMessages([
        {
          text: "👋 Hello! I'm your AI assistant. How can I help you today?",
          sender: 'ai',
          timestamp: new Date()
        }
      ]);
    }
  }, [isOpen]);

  const toggleChatBox = () => {
    setIsOpen(!isOpen);
  };

  const handleSendMessage = async (message) => {
    if (!message.trim()) return;

    const userMessage = {
      text: message,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    try {
      const response = await fetch('http://localhost:5000/api/chat/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });

      const data = await response.json();
      
      setTimeout(() => {
        setMessages(prev => [...prev, {
          text: data.reply,
          sender: 'ai',
          timestamp: new Date()
        }]);
        setIsTyping(false);
      }, 1000);
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, {
        text: "I'm having trouble connecting. Please try again later.",
        sender: 'ai',
        timestamp: new Date()
      }]);
      setIsTyping(false);
    }
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="chatbox-wrapper" ref={chatboxRef}>
      {!isOpen && (
        <button className="help-btn" onClick={toggleChatBox}>
          <FaComments className="help-icon" />
          <span>Need Help?</span>
        </button>
      )}

      {isOpen && (
        <div className="chatbox-container">
          <div className="chatbox-header">
            <div className="header-content">
              <FaRobot className="robot-icon" />
              <h3>AI Assistant</h3>
            </div>
            <button className="cut-btn" onClick={toggleChatBox}>
              <FaTimes />
            </button>
          </div>

          <div className="predefined-messages">
            {predefinedQuestions.map((question, index) => (
              <button
                key={index}
                className="predefined-btn"
                onClick={() => handleSendMessage(question)}
              >
                {question}
              </button>
            ))}
          </div>

          <div className="chat-messages">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`message ${message.sender === 'user' ? 'user-message' : 'ai-message'}`}
              >
                <div className="message-content">
                  {message.sender === 'ai' && <FaRobot className="message-icon" />}
                  <div className="message-bubble">
                    <p>{message.text}</p>
                    <span className="message-time">{formatTime(message.timestamp)}</span>
                  </div>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="chat-input">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(input)}
            />
            <button 
              className="send-btn"
              onClick={() => handleSendMessage(input)}
              disabled={!input.trim()}
            >
              <FaPaperPlane />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBox;
