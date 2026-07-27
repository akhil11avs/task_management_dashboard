import { getStatusClass, formatDateLabel, isOverdue } from '../utils/taskHelpers';

export default function TaskCard({ task, onEdit, onDelete }) {
  const overdue = isOverdue(task.dueDate, task.status);

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
        <div className={`task-date ${overdue ? 'overdue' : ''}`} style={overdue ? { color: 'var(--danger)', fontWeight: '600' } : {}}>
          <span>📅</span>
          <span>
            {formatDateLabel(task.dueDate)}
            {overdue && ' (Overdue)'}
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
