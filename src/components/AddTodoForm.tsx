import React, { useState } from 'react';
import { TodoFormData } from '../types';

interface AddTodoFormProps {
  onSubmit: (todoData: TodoFormData) => void;
  isLoading?: boolean;
}

const AddTodoForm: React.FC<AddTodoFormProps> = ({ onSubmit, isLoading = false }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onSubmit({ title: title.trim(), description: description.trim() });
      setTitle('');
      setDescription('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="add-todo-form">
      <div className="form-group">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter todo title..."
          disabled={isLoading}
          required
        />
      </div>
      <div className="form-group">
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter description (optional)"
          disabled={isLoading}
          rows={3}
        />
      </div>
      <button type="submit" disabled={isLoading || !title.trim()}>
        {isLoading ? 'Adding...' : 'Add Todo'}
      </button>
    </form>
  );
};

export default AddTodoForm;