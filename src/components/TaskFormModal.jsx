import React, { useState, useEffect, useContext } from 'react';
import { TaskContext } from '../context/TaskContext';

export default function TaskFormModal({ isOpen, onClose, taskToEdit }) {
  const { addTask, updateTask } = useContext(TaskContext);

  // create single source of truth taskData object
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('Pending');
  const [dueDate, setDueDate] = useState('');

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  useEffect(() => {
    if (taskToEdit) {
      setTitle(taskToEdit.title);
      setDescription(taskToEdit.description || '');
      setStatus(taskToEdit.status);
      setDueDate(taskToEdit.dueDate);
    } else {
      setTitle('');
      setDescription('');
      setStatus('Pending');
      setDueDate('');
    }
    setErrors({});
    setTouched({});
  }, [taskToEdit, isOpen]);

  if (!isOpen) return null;

  const validate = () => {
    const newErrors = {};
    if (!title.trim()) {
      newErrors.title = 'Title is required';
    }
    if (!dueDate) {
      newErrors.dueDate = 'Due date is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleBlur = (field) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    validate();
  };

  // useCallBack for handleSubmit
  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched({ title: true, dueDate: true });

    if (validate()) {
      const taskData = {
        title: title.trim(),
        description: description.trim(),
        status,
        dueDate
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
  };

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
              className={`form-input ${errors.title && touched.title ? 'error' : ''}`}
              placeholder="e.g. Design Login Page"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (errors.title) setErrors(prev => ({ ...prev, title: '' }));
              }}
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
              className="form-textarea"
              placeholder="Provide a detailed description of the task..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Status</label>
            <select
              className="form-select"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
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
              className={`form-input ${errors.dueDate && touched.dueDate ? 'error' : ''}`}
              value={dueDate}
              onChange={(e) => {
                setDueDate(e.target.value);
                if (errors.dueDate) setErrors(prev => ({ ...prev, dueDate: '' }));
              }}
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
