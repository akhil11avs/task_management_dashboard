export const ROUTES = {
  ALL: '/',
  COMPLETED: '/completed'
};

export const STATUS = {
  ALL: 'All',
  PENDING: 'Pending',
  IN_PROGRESS: 'In Progress',
  COMPLETED: 'Completed'
};

export const STATUS_OPTIONS = [
  { value: STATUS.ALL, label: 'All Statuses' },
  { value: STATUS.PENDING, label: 'Pending' },
  { value: STATUS.IN_PROGRESS, label: 'In Progress' },
  { value: STATUS.COMPLETED, label: 'Completed' }
];

export const SORT_OPTIONS = [
  { value: 'dueDateAsc', label: 'Due Date: Soonest' },
  { value: 'dueDateDesc', label: 'Due Date: Latest' }
];
