import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import ChatWindow from './components/ChatWindow';

function App() {
  return (
    <Router>
      <div className="h-screen flex">
        <Sidebar />
        <Routes>
          <Route path="/" element={<ChatWindow />} />
          <Route path="/chat/:id" element={<ChatWindow />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
