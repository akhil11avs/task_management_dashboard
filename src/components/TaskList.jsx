import { useContext, useMemo } from 'react';
import { TaskContext } from '../context/TaskContext';
import TaskCard from './TaskCard';
import { ROUTES, STATUS, STATUS_OPTIONS } from '../utils/constants';

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

  const isCompletedRoute = currentRoute === ROUTES.COMPLETED;

  const filteredTasks = useMemo(() => {
    return tasks
      .filter(task => {
        if (isCompletedRoute) {
          return task.status === STATUS.COMPLETED;
        }
        if (statusFilter !== STATUS.ALL) {
          return task.status === statusFilter;
        }
        return true;
      })
      .filter(task => {
        if (!searchQuery.trim()) return true;
        const query = searchQuery.toLowerCase();
        const matchTitle = task.title.toLowerCase().includes(query);
        const matchDesc = task.description ? task.description.toLowerCase().includes(query) : false;
        return matchTitle || matchDesc;
      })
      .sort((a, b) => {
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
              {STATUS_OPTIONS.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
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
