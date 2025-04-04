import { useTodo } from '../context/TodoContext';
import { CheckCircle, Clock, ListTodo } from 'lucide-react';

export function ProfilePage() {
  const { todos, users } = useTodo();
  const assignedUserId = todos.length > 0 ? todos[0].assignedTo : null;
  const currentUser = users.find(user => user.id === assignedUserId);

  if (!currentUser) {
    return <p className='text-center jusify-center mt-5'>No user assigned to the tasks yet. <br />Create one. 😊</p>
  }

  const stats = {
    total: todos.length,
    completed: todos.filter(todo => todo.completed).length,
    pending: todos.filter(todo => !todo.completed).length,
    assigned: todos.filter(todo => todo.assignedTo === currentUser.id).length
  };

  return (
    <>
      <div className="max-w-3xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center">
              <span className="text-2xl text-white font-bold">
                {currentUser.name.charAt(0)}
              </span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{currentUser.name}</h1>
              <p className="text-gray-600">Assigned User</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <ListTodo className="text-blue-500" />
                <h3 className="font-semibold">Total Todos</h3>
              </div>
              <p className="text-2xl font-bold text-blue-600">{stats.total}</p>
            </div>

            <div className="bg-green-50 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="text-green-500" />
                <h3 className="font-semibold">Completed</h3>
              </div>
              <p className="text-2xl font-bold text-green-600">{stats.completed}</p>
            </div>

            <div className="bg-yellow-50 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="text-yellow-500" />
                <h3 className="font-semibold">Pending</h3>
              </div>
              <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-4">Your Progress</h2>
          <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-500 transition-all"
              style={{
                width: `${stats.total > 0 ? (stats.completed / stats.total) * 100 : 0}%`
              }}
            />
          </div>
          <p className="text-gray-600 mt-2">
            You've completed {stats.completed} out of {stats.total} todos
          </p>
        </div>
      </div>

      
    </>
  );
}