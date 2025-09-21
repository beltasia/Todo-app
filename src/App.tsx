import React, { useState, useEffect, useCallback } from 'react';
import { Todo, TodoFormData, ApiResponse } from './types';
import { mockApi } from './utils/mockApi';
import TodoList from './components/TodoList';
import AddTodoForm from './components/AddTodoForm';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';
import './App.css';

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const fetchTodos = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response: ApiResponse<Todo[]> = await mockApi.getTodos();
      if (response.success && response.data) {
        setTodos(response.data);
      } else {
        setError(response.error || 'Failed to fetch todos');
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  const handleAddTodo = async (todoData: TodoFormData) => {
    setIsAdding(true);
    setError(null);
    try {
      const response: ApiResponse<Todo> = await mockApi.createTodo(todoData);
      if (response.success && response.data) {
        setTodos(prev => [...prev, response.data!]);
      } else {
        setError(response.error || 'Failed to create todo');
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setIsAdding(false);
    }
  };

  const handleUpdateTodo = async (id: number, updates: Partial<Todo>) => {
    setIsUpdating(true);
    setError(null);
    try {
      const response: ApiResponse<Todo> = await mockApi.updateTodo(id, updates);
      if (response.success && response.data) {
        setTodos(prev =>
          prev.map(todo => (todo.id === id ? response.data! : todo))
        );
      } else {
        setError(response.error || 'Failed to update todo');
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDeleteTodo = async (id: number) => {
    setError(null);
    try {
      const response: ApiResponse<boolean> = await mockApi.deleteTodo(id);
      if (response.success && response.data) {
        setTodos(prev => prev.filter(todo => todo.id !== id));
      } else {
        setError(response.error || 'Failed to delete todo');
      }
    } catch (err) {
      setError('An unexpected error occurred');
    }
  };

  const isLoading = loading || isUpdating;

  return (
    <div className="app">
      <header className="app-header">
        <h1>Todo App</h1>
        <p>Manage your tasks efficiently</p>
      </header>

      <main className="app-main">
        <section className="add-todo-section">
          <h2>Add New Todo</h2>
          <AddTodoForm onSubmit={handleAddTodo} isLoading={isAdding} />
        </section>

        <section className="todos-section">
          <h2>Your Todos ({todos.length})</h2>
          
          {error && (
            <ErrorMessage message={error} onRetry={fetchTodos} />
          )}

          {loading ? (
            <LoadingSpinner />
          ) : (
            <TodoList
              todos={todos}
              onUpdateTodo={handleUpdateTodo}
              onDeleteTodo={handleDeleteTodo}
              isLoading={isLoading}
            />
          )}
        </section>
      </main>
    </div>
  );
};

export default App;