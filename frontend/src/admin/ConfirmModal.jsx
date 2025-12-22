import React from 'react';
import { FaExclamationTriangle, FaCheck, FaTimes } from 'react-icons/fa';
import './ConfirmModal.css';

export default function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Delete",
  cancelText = "Cancel",
  type = "danger"
}) {
  if (!isOpen) return null;

  const getIcon = () => {
    switch (type) {
      case 'danger':
        return <FaExclamationTriangle className="modal-icon modal-icon-danger" />;
      case 'success':
        return <FaCheck className="modal-icon modal-icon-success" />;
      case 'warning':
        return <FaExclamationTriangle className="modal-icon modal-icon-warning" />;
      default:
        return <FaExclamationTriangle className="modal-icon modal-icon-danger" />;
    }
  };

  const getButtonClass = () => {
    switch (type) {
      case 'danger':
        return 'btn-confirm-danger';
      case 'success':
        return 'btn-confirm-success';
      case 'warning':
        return 'btn-confirm-warning';
      default:
        return 'btn-confirm-danger';
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          {getIcon()}
          <h3 className="modal-title">{title}</h3>
          <button className="modal-close-btn" onClick={onClose}>
            <FaTimes />
          </button>
        </div>
        
        <div className="modal-body">
          <p className="modal-message">{message}</p>
        </div>
        
        <div className="modal-footer">
          <button className="btn-cancel" onClick={onClose}>
            {cancelText}
          </button>
          <button 
            className={`btn-confirm ${getButtonClass()}`} 
            onClick={onConfirm}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}