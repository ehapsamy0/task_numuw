import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ChatContext } from '../ChatContext';

function Sidebar() {
  const { chats } = useContext(ChatContext);

  return (
    <div className="w-1/4 bg-gray-200 p-4">
      <h2 className="text-xl font-bold mb-4">Chat List</h2>
      <div className="space-y-2">
        {chats.map((chat) => (
          <Link to={`/chat/${chat.id}`} key={chat.id}>
            <div className="p-2 bg-orange-100 rounded-lg cursor-pointer">
              <div className="flex items-center">
                <div className={`w-10 h-10 rounded-full bg-${chat.avatar} mr-2`}></div>
                <div>{chat.name}</div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
