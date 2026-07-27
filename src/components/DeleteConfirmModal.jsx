import React from 'react';

export default function DeleteConfirmModal({ isOpen, onClose, onConfirm, taskTitle }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '420px' }}>
        <div className="modal-header">
          <h2>Delete Task?</h2>
          <button className="modal-close-btn" onClick={onClose}>×</button>
        </div>
        
        <div style={{ marginBottom: '2rem', color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.6' }}>
          Are you sure you want to delete <strong style={{ color: 'var(--text-primary)' }}>"{taskTitle}"</strong>? This action is permanent and cannot be undone.
        </div>

        <div className="form-actions" style={{ marginTop: '1.5rem' }}>
          <button className="btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button 
            className="btn-primary" 
            onClick={onConfirm} 
            style={{ 
              background: 'linear-gradient(135deg, var(--danger), var(--danger-hover))', 
              boxShadow: '0 4px 15px rgba(239, 68, 68, 0.3)' 
            }}
          >
            Delete Task
          </button>
        </div>
      </div>
    </div>
  );
}
