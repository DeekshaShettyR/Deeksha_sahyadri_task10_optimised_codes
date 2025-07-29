import React from 'react';
import ReactDOM from 'react-dom/client'; // ✅ For React 18+
import App from './App';
import './index.css';

import 'react-toastify/dist/ReactToastify.css'; // ✅ Import toastify styles

// ✅ Create root and render App
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
