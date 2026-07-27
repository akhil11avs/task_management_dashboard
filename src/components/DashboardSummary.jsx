import { useContext } from 'react';
import { TaskContext } from '../context/TaskContext';
import { STATUS } from '../utils/constants';

export default function DashboardSummary() {
  const { tasks } = useContext(TaskContext);

  const total = tasks.length;
  const pending = tasks.filter(t => t.status === STATUS.PENDING).length;
  const inProgress = tasks.filter(t => t.status === STATUS.IN_PROGRESS).length;
  const completed = tasks.filter(t => t.status === STATUS.COMPLETED).length;

  return (
    <div className="summary-grid">
      <div className="summary-card total">
        <div className="summary-icon">📁</div>
        <div className="summary-details">
          <h3>Total Tasks</h3>
          <span>{total}</span>
        </div>
      </div>

      <div className="summary-card pending">
        <div className="summary-icon">⏳</div>
        <div className="summary-details">
          <h3>{STATUS.PENDING}</h3>
          <span>{pending}</span>
        </div>
      </div>

      <div className="summary-card progress">
        <div className="summary-icon">⚙️</div>
        <div className="summary-details">
          <h3>{STATUS.IN_PROGRESS}</h3>
          <span>{inProgress}</span>
        </div>
      </div>

      <div className="summary-card completed">
        <div className="summary-icon">✅</div>
        <div className="summary-details">
          <h3>{STATUS.COMPLETED}</h3>
          <span>{completed}</span>
        </div>
      </div>
    </div>
  );
}
