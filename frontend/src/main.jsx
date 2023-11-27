import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// eslint-disable-next-line react/no-deprecated
ReactDOM.render(
  <React.StrictMode>
      <App />
      <ToastContainer position="top-center"/>
  </React.StrictMode>,
  document.getElementById('root')
);