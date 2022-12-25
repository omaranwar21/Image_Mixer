import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import TestApp from './TestApp';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
    {/* <TestApp /> */}
  </React.StrictMode>
);

