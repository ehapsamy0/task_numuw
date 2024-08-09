import React, { useContext, useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { ChatContext } from '../ChatContext';

function ChatWindow() {
  const { id } = useParams();
  const { messages, setMessages } = useContext(ChatContext);
  const [newMessage, setNewMessage] = useState('');
  const [socket, setSocket] = useState(null);
  const messagesEndRef = useRef(null);

  const chatMessages = messages[id] || [];

  useEffect(() => {
    const ws = new WebSocket(`ws://localhost:8000/ws/chat/${id}/`);
    setSocket(ws);

    ws.onmessage = (e) => {
      const data = JSON.parse(e.data);
      const updatedMessages = {
        ...messages,
        [id]: [...chatMessages, data.message],
      };
      setMessages(updatedMessages);
    };

    return () => {
      ws.close();
    };
  }, [id, messages, setMessages, chatMessages]);

  const handleSendMessage = (e) => {
    if (e.key === 'Enter' || e.type === 'click') {
      if (newMessage.trim() === '') return;

      const messageData = {
        message: newMessage,
        sender_id: localStorage.getItem('user_id'),
      };

      if (socket) {
        socket.send(JSON.stringify(messageData));
      }

      const updatedMessages = {
        ...messages,
        [id]: [...chatMessages, { sender: 'parent', text: newMessage }],
      };

      setMessages(updatedMessages);
      setNewMessage('');
    }
  };

  return (
    <div className="w-3/4 bg-gray-100 p-4 flex flex-col">
      <h2 className="text-xl font-bold mb-4">Chat {id}</h2>
      <div className="flex-grow overflow-y-auto">
        {chatMessages.map((msg, index) => (
          <div
            key={index}
            className={`p-3 rounded-lg mb-2 max-w-xs ${
              msg.sender === 'parent' ? 'bg-purple-600 text-white self-end' : 'bg-gray-300 text-gray-800'
            }`}
          >
            <p className="text-sm">{msg.text}</p>
            {msg.file && (
              <div>
                <a href={msg.file} target="_blank" rel="noopener noreferrer" className="text-blue-500">
                  View Attachment
                </a>
              </div>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="mt-4 flex">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={handleSendMessage}
          className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Type your message"
        />
        <button
          onClick={handleSendMessage}
          className="ml-2 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default ChatWindow;
