import React, { useState } from 'react';
import axios from 'axios';
import '../styles/chatbot.css'; // Make sure this exists

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hi! I’m your crop assistant. How can I help you today?' }
  ]);
  const [userInput, setUserInput] = useState('');

  const sendMessage = async () => {
    const input = userInput.trim();
    if (!input) return;

    const userMessage = { role: 'user', content: input };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setUserInput('');

    try {
      const res = await axios.post(
        'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyAjSp5d59v1DVKIjCzcjKKgKh5yNCQtz4g',
        {
          contents: [
            {
              role: 'user',
              parts: [{ text: input }]
            }
          ]
        }
      );

      const aiReply = res?.data?.candidates?.[0]?.content?.parts?.[0]?.text || 'Sorry, I could not understand that.';
      setMessages(prev => [...prev, { role: 'assistant', content: aiReply }]);
    } catch (err) {
      console.error('API error:', err);
      setMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, something went wrong.' }]);
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-box">
        {messages.map((msg, idx) => (
          <div key={idx} className={`chat-msg ${msg.role}`}>
            <span>{msg.content}</span>
          </div>
        ))}
      </div>

      <div className="chat-input">
        <input
          type="text"
          value={userInput}
          placeholder="Ask about crops, weather, tools..."
          onChange={(e) => setUserInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chatbot;
