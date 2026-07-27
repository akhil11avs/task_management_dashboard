import { createContext, useState, useEffect, useMemo } from 'react';
import { toast } from 'react-toastify';

export const TaskContext = createContext();

const formatDate = (offsetDays) => {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  return d.toISOString().split('T')[0];
};

const DEFAULT_TASKS = [
  {
    id: 'task-1',
    title: 'Design Brand Identity Guidelines',
    description: 'Create color palette, typography patterns, and logo usage rules for the new web app.',
    status: 'In Progress',
    dueDate: formatDate(2),
    createdAt: new Date().toISOString()
  },
  {
    id: 'task-2',
    title: 'Implement Authentication Flow',
    description: 'Set up JWT-based authentication, user session persistence, and login screen validation.',
    status: 'Completed',
    dueDate: formatDate(-1),
    createdAt: new Date().toISOString()
  },
  {
    id: 'task-3',
    title: 'Optimize Performance & SEO',
    description: 'Audit bundle size, implement lazy loading, configure metadata, and set up dynamic sitemaps.',
    status: 'Pending',
    dueDate: formatDate(5),
    createdAt: new Date().toISOString()
  },
  {
    id: 'task-4',
    title: 'Draft Q3 Product Roadmap',
    description: 'Collaborate with product and engineering leads to prioritize features and allocate sprints for the next quarter.',
    status: 'Pending',
    dueDate: formatDate(8),
    createdAt: new Date().toISOString()
  },
  {
    id: 'task-5',
    title: 'Resolve Responsive Layout Bugs',
    description: 'Fix layout overlap on tablet viewports and adjust header navigation padding on mobile screens.',
    status: 'In Progress',
    dueDate: formatDate(0),
    createdAt: new Date().toISOString()
  }
];

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('dashboard_tasks');
    return saved ? JSON.parse(saved) : DEFAULT_TASKS;
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sortBy, setSortBy] = useState('dueDateAsc');

  useEffect(() => {
    localStorage.setItem('dashboard_tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task) => {
    const newTask = {
      ...task,
      id: `task-${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    setTasks(prev => [newTask, ...prev]);
    toast.success('Task created successfully!');
  };

  const updateTask = (updatedTask) => {
    setTasks(prev => prev.map(task => task.id === updatedTask.id ? updatedTask : task));
    toast.success('Task updated successfully!');
  };

  const deleteTask = (id) => {
    setTasks(prev => prev.filter(task => task.id !== id));
    toast.success('Task deleted successfully!');
  };

  const summary = useMemo(() => {
    const total = tasks.length;
    const pending = tasks.filter(t => t.status === 'Pending').length;
    const inProgress = tasks.filter(t => t.status === 'In Progress').length;
    const completed = tasks.filter(t => t.status === 'Completed').length;
    return { total, pending, inProgress, completed };
  }, [tasks]);

  return (
    <TaskContext.Provider value={{
      tasks,
      searchQuery,
      setSearchQuery,
      statusFilter,
      setStatusFilter,
      sortBy,
      setSortBy,
      addTask,
      updateTask,
      deleteTask,
      summary
    }}>
      {children}
    </TaskContext.Provider>
  );
}
