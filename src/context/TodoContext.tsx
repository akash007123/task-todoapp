import React, { createContext, useContext, useEffect, useState } from 'react';
import { Todo, User } from '../types';

interface TodoContextType {
  todos: Todo[];
  users: User[];
  addTodo: (todo: Omit<Todo, 'id' | 'completed' | 'createdAt'>) => void;
  updateTodo: (id: string, todo: Partial<Todo>) => void;
  editTodo: (id: string, title: string, description: string) => void;
  deleteTodo: (id: string) => void;
  toggleTodo: (id: string) => void;
}

const TodoContext = createContext<TodoContextType | undefined>(undefined);

const STORAGE_KEY = 'todoApp';

export function TodoProvider({ children }: { children: React.ReactNode }) {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored).todos : [];
  });

  const [users] = useState<User[]>([
    { id: '1', name: 'Akash' },
    { id: '2', name: 'Aarav' },
    { id: '3', name: 'Deepak' },
    { id: '4', name: 'Devansh' },
    { id: '5', name: 'Gaurav' },
    { id: '6', name: 'Harsh' },
  ]);

  useEffect(() => {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ todos }));
  }, [todos]);

  const addTodo = (todoData: Omit<Todo, 'id' | 'completed' | 'createdAt'>) => {
    const newTodo: Todo = {
      ...todoData,
      id: crypto.randomUUID(),
      completed: false,
      createdAt: Date.now()
    };
    setTodos(prev => [...prev, newTodo]);
  };

  const updateTodo = (id: string, todoData: Partial<Todo>) => {
    setTodos(prev => prev.map(todo => 
      todo.id === id ? { ...todo, ...todoData } : todo
    ));
  };

  const editTodo = (id: string, title: string, description: string) => {
    setTodos(prev => prev.map(todo =>
      todo.id === id ? { ...todo, title, description } : todo
    ));
  };

  const deleteTodo = (id: string) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  };

  const toggleTodo = (id: string) => {
    setTodos(prev => prev.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  return (
    <TodoContext.Provider value={{ todos, users, addTodo, updateTodo, editTodo, deleteTodo, toggleTodo }}>
      {children}
    </TodoContext.Provider>
  );
}

export function useTodo() {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error('useTodo must be used within a TodoProvider');
  }
  return context;
}
