import { STATUS } from "./constants";

export const getStatusClass = (status) => {
  switch (status) {
    case STATUS.PENDING: return 'pending';
    case STATUS.IN_PROGRESS: return 'progress';
    case STATUS.COMPLETED: return 'completed';
    default: return '';
  }
};

export const formatDateLabel = (dateStr) => {
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

export const isOverdue = (dueDate, status) => {
  if (status === STATUS.COMPLETED) return false;
  if (!dueDate) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const dueDateObj = new Date(dueDate);
  dueDateObj.setHours(0, 0, 0, 0);
  return dueDateObj < today;
};
