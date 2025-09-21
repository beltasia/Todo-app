import React, { useState } from 'react';
import { Todo } from '../types';

interface TodoItemProps {
  todo: Todo;
  onUpdate: (id: number, updates: Partial<Todo>) => void;
  onDelete: (id: number) => void;
  isLoading?: boolean;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onUpdate, onDelete, isLoading = false }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const [editDescription, setEditDescription] = useState(todo.description);

  const handleSave = () => {
    if (editTitle.trim()) {
      onUpdate(todo.id, {
        title: editTitle.trim(),
        description: editDescription.trim()
      });
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditTitle(todo.title);
    setEditDescription(todo.description);
    setIsEditing(false);
  };

  const handleToggleComplete = () => {
    onUpdate(todo.id, { completed: !todo.completed });
  };

  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      {isEditing ? (
        <div className="edit-mode">
          <label htmlFor={`edit-title-${todo.id}`} className="visually-hidden">Edit title</label>
          <input
            id={`edit-title-${todo.id}`}
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            disabled={isLoading}
            className="edit-input"
            placeholder="Edit todo title"
          />
          <label htmlFor={`edit-desc-${todo.id}`} className="visually-hidden">Edit description</label>
          <textarea
            id={`edit-desc-${todo.id}`}
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
            disabled={isLoading}
            className="edit-textarea"
            rows={3}
            placeholder="Edit description (optional)"
          />
          <div className="edit-actions">
            <button onClick={handleSave} disabled={isLoading || !editTitle.trim()}>
              Save
            </button>
            <button onClick={handleCancel} disabled={isLoading}>
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="view-mode">
          <div className="todo-content">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={handleToggleComplete}
              disabled={isLoading}
              className="todo-checkbox"
              aria-label="Mark todo as completed"
            />
            <div className="todo-details">
              <h3 className="todo-title">{todo.title}</h3>
              {todo.description && (
                <p className="todo-description">{todo.description}</p>
              )}
              <span className="todo-date">
                Updated: {todo.updatedAt.toLocaleDateString()}
              </span>
            </div>
          </div>
          <div className="todo-actions">
            <button
              onClick={() => setIsEditing(true)}
              disabled={isLoading}
              className="edit-button"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(todo.id)}
              disabled={isLoading}
              className="delete-button"
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoItem;