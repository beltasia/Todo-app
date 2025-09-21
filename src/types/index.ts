export interface Todo {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
  success: boolean;
}

export type TodoFormData = Omit<Todo, 'id' | 'completed' | 'createdAt' | 'updatedAt'>;