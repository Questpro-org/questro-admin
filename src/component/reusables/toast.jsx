// Toast.js
import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Toast = () => {
  const defaultOptions = {
    position: 'bottom-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  };

  const containerStyle = {
    marginTop: '60px',
    marginRight: 'auto',
    marginLeft: 'auto',
    width: '2px',
    border: '2px',
  };

  return (
    <ToastContainer {...defaultOptions} style={containerStyle} className="toast-message-container" />
  );
};

export const showToast = (message, status, options) => {
  const defaultSuccessMessage = 'Operation successful';
  const defaultErrorMessage = 'Operation failed'; 

  const toastOptions = {
    className: status ? 'toast-success' : 'toast-error',
    ...options,
  };

  toast(message || (status ? defaultSuccessMessage : defaultErrorMessage), toastOptions);
};

export default Toast;