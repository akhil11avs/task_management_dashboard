import { useState, useEffect, useContext, useCallback } from 'react';
import { TaskContext } from '../context/TaskContext';

export default function TaskFormModal({ isOpen, onClose, taskToEdit }) {
  const { addTask, updateTask } = useContext(TaskContext);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'Pending',
    dueDate: ''
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  useEffect(() => {
    if (taskToEdit) {
      setFormData({
        title: taskToEdit.title,
        description: taskToEdit.description || '',
        status: taskToEdit.status,
        dueDate: taskToEdit.dueDate
      });
    } else {
      setFormData({
        title: '',
        description: '',
        status: 'Pending',
        dueDate: ''
      });
    }
    setErrors({});
    setTouched({});
  }, [taskToEdit, isOpen]);

  const validate = useCallback(() => {
    const newErrors = {};
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    if (!formData.dueDate) {
      newErrors.dueDate = 'Due date is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData.title, formData.dueDate]);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  }, []);

  const handleBlur = useCallback((field) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    validate();
  }, [validate]);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    setTouched({ title: true, dueDate: true });

    // Validate using latest form data
    const runValidation = () => {
      const newErrors = {};
      if (!formData.title.trim()) {
        newErrors.title = 'Title is required';
      }
      if (!formData.dueDate) {
        newErrors.dueDate = 'Due date is required';
      }
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    };

    if (runValidation()) {
      const taskData = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        status: formData.status,
        dueDate: formData.dueDate
      };

      if (taskToEdit) {
        updateTask({
          ...taskToEdit,
          ...taskData
        });
      } else {
        addTask(taskData);
      }
      onClose();
    }
  }, [formData, taskToEdit, addTask, updateTask, onClose]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{taskToEdit ? 'Edit Task' : 'Create Task'}</h2>
          <button className="modal-close-btn" onClick={onClose}>×</button>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label className="form-label">Task Title *</label>
            <input
              type="text"
              name="title"
              className={`form-input ${errors.title && touched.title ? 'error' : ''}`}
              placeholder="e.g. Design Login Page"
              value={formData.title}
              onChange={handleChange}
              onBlur={() => handleBlur('title')}
              required
            />
            {errors.title && touched.title && (
              <span className="error-text">{errors.title}</span>
            )}
          </div>

          <div className="form-group">
            <label className="form-label">Description</label>
            <textarea
              name="description"
              className="form-textarea"
              placeholder="Provide a detailed description of the task..."
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Status</label>
            <select
              name="status"
              className="form-select"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Due Date *</label>
            <input
              type="date"
              name="dueDate"
              className={`form-input ${errors.dueDate && touched.dueDate ? 'error' : ''}`}
              value={formData.dueDate}
              onChange={handleChange}
              onBlur={() => handleBlur('dueDate')}
              required
            />
            {errors.dueDate && touched.dueDate && (
              <span className="error-text">{errors.dueDate}</span>
            )}
          </div>

          <div className="form-actions">
            <button type="button" className="btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              {taskToEdit ? 'Save Changes' : 'Add Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
