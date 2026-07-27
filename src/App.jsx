import { useState, useContext, useCallback, useMemo } from 'react';
import { usePathRoute } from './hooks/usePathRoute';
import Navigation from './components/Navigation';
import DashboardSummary from './components/DashboardSummary';
import TaskList from './components/TaskList';
import TaskFormModal from './components/TaskFormModal';
import DeleteConfirmModal from './components/DeleteConfirmModal';
import { TaskContext } from './context/TaskContext';
import { ROUTES } from './utils/constants';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
  const { route, navigate } = usePathRoute();
  const { deleteTask } = useContext(TaskContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);

  // Custom Delete confirmation modal state
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);

  // Memoized handlers to optimize performance and prevent re-render cascades
  const handleEditClick = useCallback((task) => {
    setTaskToEdit(task);
    setIsModalOpen(true);
  }, []);

  const handleCreateAndCloseModal = useCallback(() => {
    setTaskToEdit(null);
    setIsModalOpen(prev => !prev);
  }, []);

  const handleDeleteRequest = useCallback((task) => {
    setTaskToDelete(task);
    setIsDeleteModalOpen(true);
  }, []);

  const handleConfirmDelete = useCallback(() => {
    if (taskToDelete) {
      deleteTask(taskToDelete.id);
      setIsDeleteModalOpen(false);
      setTaskToDelete(null);
    }
  }, [taskToDelete, deleteTask]);

  const handleCloseDeleteModal = useCallback(() => {
    setIsDeleteModalOpen(false);
    setTaskToDelete(null);
  }, []);

  // Switch-case evaluator for paths
  const getIsCompletedRoute = (currentRoute) => {
    switch (currentRoute) {
      case ROUTES.COMPLETED:
        return true;
      default:
        return false;
    }
  };

  const isCompletedRoute = useMemo(() => getIsCompletedRoute(route), [route]);

  return (
    <div className="app-container">
      {/* Sidebar Navigation */}
      <Navigation currentRoute={route} onNavigate={navigate} />

      {/* Main Content Pane */}
      <main className="main-content">
        <div className="dashboard-header">
          <div className="welcome-section">
            <h1>
              {isCompletedRoute ? 'Completed Tasks' : 'All Workspace Tasks'}
            </h1>
            <p>
              {isCompletedRoute
                ? 'Review and manage your successfully finished milestones.'
                : 'Monitor, organize, and prioritize your active flow.'}
            </p>
          </div>

          <button className="btn-primary" onClick={handleCreateAndCloseModal}>
            <span>✚</span> Create Task
          </button>
        </div>

        {/* Aggregate Status Counters */}
        <DashboardSummary />

        {/* Tasks grid with search/filter/sort */}
        <TaskList
          currentRoute={route}
          onEditTask={handleEditClick}
          onDeleteTask={handleDeleteRequest}
        />

        {/* Create/Edit Task Dialog Form */}
        <TaskFormModal
          isOpen={isModalOpen}
          onClose={handleCreateAndCloseModal}
          taskToEdit={taskToEdit}
        />

        {/* Custom Delete Confirmation Modal */}
        <DeleteConfirmModal
          isOpen={isDeleteModalOpen}
          onClose={handleCloseDeleteModal}
          onConfirm={handleConfirmDelete}
          taskTitle={taskToDelete ? taskToDelete.title : ''}
        />

        {/* Global Toast Notification Container */}
        <ToastContainer position="top-right" autoClose={2500} theme="light" />
      </main>
    </div>
  );
}
