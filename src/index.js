import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Authprovider } from './context/AuthProvider.jsx';
// import "bootstrap/dist/css/bootstrap.css";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Authprovider>
    <App />
    </Authprovider>
  </React.StrictMode>
);
