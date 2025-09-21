import React from 'react';
import { Todo } from '../types';
import TodoItem from './TodoItem';

interface TodoListProps {
  todos: Todo[];
  onUpdateTodo: (id: number, updates: Partial<Todo>) => void;
  onDeleteTodo: (id: number) => void;
  isLoading?: boolean;
}

const TodoList: React.FC<TodoListProps> = ({
  todos,
  onUpdateTodo,
  onDeleteTodo,
  isLoading = false
}) => {
  if (todos.length === 0) {
    return (
      <div className="empty-state">
        <p>No todos yet. Add your first todo to get started!</p>
      </div>
    );
  }

  return (
    <div className="todo-list">
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onUpdate={onUpdateTodo}
          onDelete={onDeleteTodo}
          isLoading={isLoading}
        />
      ))}
    </div>
  );
};

export default TodoList;