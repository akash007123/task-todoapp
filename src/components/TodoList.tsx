import { Check, Trash2, Edit3 } from 'lucide-react';
import { useTodo } from '../context/TodoContext';
import { Todo } from '../types';
import { useState } from 'react';

export function TodoList() {
  const { todos, users, toggleTodo, deleteTodo, editTodo } = useTodo();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');

  const getUserName = (userId: string) => {
    return users.find(user => user.id === userId)?.name || 'Unknown User';
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString();
  };

  const handleEdit = (todo: Todo) => {
    setEditingId(todo.id);
    setEditTitle(todo.title);
    setEditDescription(todo.description);
  };

  const handleSave = (id: string) => {
    editTodo(id, editTitle, editDescription);
    setEditingId(null);
  };

  return (
    <div className="space-y-4">
      {todos.map((todo: Todo) => (
        <div
          key={todo.id}
          className={`bg-white p-4 rounded-lg shadow-md transition-all ${
            todo.completed ? 'opacity-75' : ''
          }`}
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              {editingId === todo.id ? (
                <>
                  <input 
                    type="text" 
                    value={editTitle} 
                    onChange={(e) => setEditTitle(e.target.value)} 
                    className="w-full p-1 border rounded" 
                  />
                  <textarea 
                    value={editDescription} 
                    onChange={(e) => setEditDescription(e.target.value)} 
                    className="w-full p-1 border rounded mt-1" 
                  />
                  <button onClick={() => handleSave(todo.id)} className="mt-2 p-1 bg-blue-500 text-white rounded">Save</button>
                </>
              ) : (
                <>
                  <h3 className={`text-lg font-semibold ${todo.completed ? 'line-through text-gray-500' : ''}`}>
                    {todo.title}
                  </h3>
                  <p className="text-gray-600 mt-1">{todo.description}</p>
                  <div className="mt-2 text-sm text-gray-500">
                    <p>Assigned to: {getUserName(todo.assignedTo)}</p>
                    <p>Created: {formatDate(todo.createdAt)}</p>
                  </div>
                </>
              )}
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => toggleTodo(todo.id)}
                className={`p-2 rounded-full ${
                  todo.completed ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'
                } hover:bg-opacity-75 transition-colors`}
              >
                <Check size={20} />
              </button>
              <button
                onClick={() => handleEdit(todo)}
                className="p-2 rounded-full bg-blue-100 text-blue-600 hover:bg-opacity-75 transition-colors"
              >
                <Edit3 size={20} />
              </button>
              <button
                onClick={() => deleteTodo(todo.id)}
                className="p-2 rounded-full bg-red-100 text-red-600 hover:bg-opacity-75 transition-colors"
              >
                <Trash2 size={20} />
              </button>
            </div>
          </div>
        </div>
      ))}
      {todos.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <div className="flex justify-center items-center gap-4">
            <span className='text-2xl'>🥺</span>
          <p> No todos yet. Create one to get started!</p> 
          <span className='text-2xl'>👆</span>
          </div>
        </div>
      )}
    </div>
  );
}
