import { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { TodoList } from '../components/TodoList';
import { TodoForm } from '../components/TodoForm';

export function TodoPage() {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Todo List</h1>
        <button
          onClick={() => setIsFormOpen(true)}
          className="flex items-center gap-2 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
        >
          <Plus size={20} />
          Add Todo
        </button>
      </div>

      {isFormOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="relative w-full max-w-md">
            <button
              onClick={() => setIsFormOpen(false)}
              className="absolute -top-2 -right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
            >
              <X size={20} />
            </button>
            <TodoForm onSuccess={() => setIsFormOpen(false)} />
          </div>
        </div>
      )}

      <TodoList />
    </div>
  );
}