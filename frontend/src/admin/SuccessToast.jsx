// SuccessToast.js
import React, { useEffect } from 'react';
import { FaCheckCircle, FaTimes } from 'react-icons/fa';
import './SuccessToast.css';

export default function SuccessToast({ message, onClose, duration = 3000 }) {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div className="success-toast">
      <div className="toast-content">
        <div className="toast-icon">
          <FaCheckCircle />
        </div>
        <div className="toast-message">{message}</div>
        <button className="toast-close" onClick={onClose}>
          <FaTimes />
        </button>
      </div>
    </div>
  );
}