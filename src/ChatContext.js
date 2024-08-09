import React, { createContext, useState } from 'react';

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [chats, setChats] = useState([
    { id: 1, name: 'Common Group', avatar: 'gray-400' },
    { id: 2, name: 'Kapil', avatar: 'green-400' },
    { id: 3, name: 'Daniel', avatar: 'blue-400' },
    // More chats can be added here
  ]);

  const [messages, setMessages] = useState({
    1: [
      { sender: 'parent', text: 'Hello!' },
      { sender: 'therapist', text: 'Hi, how can I help?' },
    ],
    2: [
      { sender: 'parent', text: 'Is the session on?' },
      { sender: 'therapist', text: 'Yes, it is scheduled for 3 PM.' },
    ],
    // Add more messages for other chats
  });

  return (
    <ChatContext.Provider value={{ chats, setChats, messages, setMessages }}>
      {children}
    </ChatContext.Provider>
  );
};
