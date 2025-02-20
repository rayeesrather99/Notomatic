import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';  // Ensure the CSS file is properly linked
import App from './App';  // Make sure the path is correct

const root = ReactDOM.createRoot(document.getElementById('root'));  // 'root' should match the id in index.html
root.render(<App />);
