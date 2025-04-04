import { Check, Trash2, Edit3, Plus } from 'lucide-react';
import { useTodo } from '../context/TodoContext';
import { Todo } from '../types';
import { useState } from 'react';
import { TodoForm } from './TodoForm'; 

export function TodoList() {
  const { todos, users, toggleTodo, deleteTodo, editTodo } = useTodo();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [todoToDelete, setTodoToDelete] = useState<string | null>(null);
  const [showAddTodoModal, setShowAddTodoModal] = useState(false); 
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

  const handleDelete = (id: string) => {
    setTodoToDelete(id);
    setShowModal(true);
  };

  const confirmDelete = () => {
    if (todoToDelete) {
      deleteTodo(todoToDelete);
      setTodoToDelete(null);
    }
    setShowModal(false);
  };

  const cancelDelete = () => {
    setTodoToDelete(null);
    setShowModal(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Todo List</h1>
        <button
          onClick={() => setShowAddTodoModal(true)} // Show Add Todo modal
          className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          <Plus size={20} />
          <span>Add Todo</span>
        </button>
      </div>

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
                onClick={() => !todo.completed && toggleTodo(todo.id)} // Prevent toggling if completed
                className={`p-2 rounded-full ${
                  todo.completed ? 'bg-green-100 text-green-600 cursor-not-allowed' : 'bg-gray-100 text-gray-600 hover:bg-opacity-75'
                } transition-colors`}
                disabled={todo.completed} // Disable button if completed
              >
                <Check size={20} />
              </button>
              {!todo.completed && (
                <>
                  <button
                    onClick={() => handleEdit(todo)}
                    className="p-2 rounded-full bg-blue-100 text-blue-600 hover:bg-opacity-75 transition-colors"
                  >
                    <Edit3 size={20} />
                  </button>
                  <button
                    onClick={() => handleDelete(todo.id)}
                    className="p-2 rounded-full bg-red-100 text-red-600 hover:bg-opacity-75 transition-colors"
                  >
                    <Trash2 size={20} />
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      ))}
      {todos.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <div className="flex justify-center items-center gap-4">
            <span className='text-2xl'>🥺</span>
            <p>No todos yet. Create one to get started!</p>
            <span className='text-2xl'>👆</span>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-bold mb-4">Confirm Delete</h2>
            <p className="text-gray-600 mb-4">Are you sure you want to delete this task?</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={cancelDelete}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Todo Modal */}
      {showAddTodoModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-bold mb-4">Add New Todo</h2>
            <TodoForm
              onSuccess={() => setShowAddTodoModal(false)} 
            />
            <button
              onClick={() => setShowAddTodoModal(false)}
              className="mt-4 px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}