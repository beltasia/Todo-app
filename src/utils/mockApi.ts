import { Todo, ApiResponse, TodoFormData } from '../types';

// Simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Mock data storage
let todos: Todo[] = [
  {
    id: 1,
    title: 'Learn React',
    description: 'Complete the React tutorial',
    completed: false,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15')
  },
  {
    id: 2,
    title: 'Build Todo App',
    description: 'Create a todo application with TypeScript',
    completed: true,
    createdAt: new Date('2024-01-16'),
    updatedAt: new Date('2024-01-17')
  }
];

let nextId = 3;

// Simulate API errors (10% chance)
const shouldFail = () => Math.random() < 0.1;

export const mockApi = {
  // GET all todos
  async getTodos(): Promise<ApiResponse<Todo[]>> {
    await delay(800);
    
    if (shouldFail()) {
      return {
        data: null,
        error: 'Failed to fetch todos. Please try again.',
        success: false
      };
    }

    return {
      data: [...todos],
      error: null,
      success: true
    };
  },

  // POST new todo
  async createTodo(todoData: TodoFormData): Promise<ApiResponse<Todo>> {
    await delay(500);
    
    if (shouldFail()) {
      return {
        data: null,
        error: 'Failed to create todo. Please try again.',
        success: false
      };
    }

    const newTodo: Todo = {
      id: nextId++,
      ...todoData,
      completed: false,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    todos.push(newTodo);
    
    return {
      data: newTodo,
      error: null,
      success: true
    };
  },

  // PUT update todo
  async updateTodo(id: number, updates: Partial<Todo>): Promise<ApiResponse<Todo>> {
    await delay(500);
    
    if (shouldFail()) {
      return {
        data: null,
        error: 'Failed to update todo. Please try again.',
        success: false
      };
    }

    const index = todos.findIndex(todo => todo.id === id);
    if (index === -1) {
      return {
        data: null,
        error: 'Todo not found',
        success: false
      };
    }

    const updatedTodo = {
      ...todos[index],
      ...updates,
      updatedAt: new Date()
    };

    todos[index] = updatedTodo;
    
    return {
      data: updatedTodo,
      error: null,
      success: true
    };
  },

  // DELETE todo
  async deleteTodo(id: number): Promise<ApiResponse<boolean>> {
    await delay(300);
    
    if (shouldFail()) {
      return {
        data: null,
        error: 'Failed to delete todo. Please try again.',
        success: false
      };
    }

    const initialLength = todos.length;
    todos = todos.filter(todo => todo.id !== id);
    
    return {
      data: initialLength !== todos.length,
      error: null,
      success: true
    };
  }
};