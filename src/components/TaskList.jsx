import React, { useContext, useMemo } from 'react';
import { TaskContext } from '../context/TaskContext';
import TaskCard from './TaskCard';

export default function TaskList({ currentRoute, onEditTask, onDeleteTask }) {
  const {
    tasks,
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    sortBy,
    setSortBy
  } = useContext(TaskContext);

  const isCompletedRoute = currentRoute === '/completed';

  // Apply routing, filtering, search, and sorting
  // use memo to prevent unnecessary re-renders
  const filteredTasks = useMemo(() => {
    return tasks
      .filter(task => {
        // 1. Route filter
        if (isCompletedRoute) {
          return task.status === 'Completed';
        }
        // 2. Status filter (only applicable on All Tasks view)
        if (statusFilter !== 'All') {
          return task.status === statusFilter;
        }
        return true;
      })
      .filter(task => {
        // 3. Search query filter
        if (!searchQuery.trim()) return true;
        const query = searchQuery.toLowerCase();
        const matchTitle = task.title.toLowerCase().includes(query);
        const matchDesc = task.description ? task.description.toLowerCase().includes(query) : false;
        return matchTitle || matchDesc;
      })
      .sort((a, b) => {
        // 4. Sort by due date
        const dateA = new Date(a.dueDate || '9999-12-31');
        const dateB = new Date(b.dueDate || '9999-12-31');
        if (sortBy === 'dueDateAsc') {
          return dateA - dateB;
        } else {
          return dateB - dateA;
        }
      });
  }, [tasks, searchQuery, statusFilter, sortBy, isCompletedRoute]);

  return (
    <div>
      <div className="controls-bar">
        {/* Search */}
        <div className="search-container">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            className="search-input"
            placeholder="Search tasks by title or description..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Status Filter (Hidden/Disabled on Completed view) */}
        {!isCompletedRoute && (
          <div className="select-container">
            <select
              className="select-input"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              {/* map from constant status data instead of hardcoding */}
              <option value="All">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
        )}

        {/* Sort by Due Date */}
        <div className="select-container">
          <select
            className="select-input"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            {/* map from constant sort options instead of hardcoding */}
            <option value="dueDateAsc">Due Date: Soonest</option>
            <option value="dueDateDesc">Due Date: Latest</option>
          </select>
        </div>
      </div>

      {/* Task Grid */}
      <div className="tasks-grid">
        {filteredTasks.length > 0 ? (
          filteredTasks.map(task => (
            <TaskCard
              key={task.id}
              task={task}
              onEdit={onEditTask}
              onDelete={onDeleteTask}
            />
          ))
        ) : (
          <div className="no-tasks">
            <div className="no-tasks-icon">🔍</div>
            <h3>No Tasks Found</h3>
            <p>Try adjusting your search terms, status filters, or add a new task to get started.</p>
          </div>
        )}
      </div>
    </div>
  );
}
