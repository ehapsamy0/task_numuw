// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import axios from 'axios';  // Import axios
import { ChatProvider } from './ChatContext'; 
// Configure axios to include token in requests
axios.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

ReactDOM.render(
  <React.StrictMode>
    <ChatProvider>
      <App />

    </ChatProvider>
  </React.StrictMode>,
  document.getElementById('root')
);


