import React from 'react';

export default function TaskCard({ task, onEdit, onDelete }) {
  // TODO: move dueDate formatting function to utils folder and export
  // define in comstant and keep in utils for getStatusClass 
  const getStatusClass = (status) => {
    switch (status) {
      case 'Pending': return 'pending';
      case 'In Progress': return 'progress';
      case 'Completed': return 'completed';
      default: return '';
    }
  };

  // move dueDate to utils
  const formatDateLabel = (dateStr) => {
    if (!dateStr) return '';
    const dateObj = new Date(dateStr);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const taskDate = new Date(dateObj);
    taskDate.setHours(0, 0, 0, 0);

    const diffTime = taskDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Tomorrow';
    if (diffDays === -1) return 'Yesterday';

    return dateObj.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  // movedueDate to utils
  const isOverdue = () => {
    if (task.status === 'Completed') return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const dueDateObj = new Date(task.dueDate);
    dueDateObj.setHours(0, 0, 0, 0);
    return dueDateObj < today;
  };

  return (
    <div className={`task-card ${getStatusClass(task.status)}`}>
      <div>
        <div className="task-header">
          <h3 className="task-title" title={task.title}>{task.title}</h3>
          <span className={`badge ${getStatusClass(task.status)}`}>
            {task.status}
          </span>
        </div>
        <p className="task-description">{task.description || 'No description provided.'}</p>
      </div>

      <div className="task-footer">
        <div className={`task-date ${isOverdue() ? 'overdue' : ''}`} style={isOverdue() ? { color: 'var(--danger)', fontWeight: '600' } : {}}>
          <span>📅</span>
          <span>
            {formatDateLabel(task.dueDate)}
            {isOverdue() && ' (Overdue)'}
          </span>
        </div>

        <div className="task-actions">
          <button
            className="action-btn edit"
            onClick={() => onEdit(task)}
            title="Edit Task"
          >
            ✏️
          </button>
          <button
            className="action-btn delete"
            onClick={() => onDelete(task)}
            title="Delete Task"
          >
            🗑️
          </button>
        </div>
      </div>
    </div>
  );
}
