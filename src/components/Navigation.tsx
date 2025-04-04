import { NavLink } from 'react-router-dom';
import { ListTodo, User } from 'lucide-react';

export function Navigation() {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-3xl mx-auto px-6">
        <div className="flex items-center justify-center h-16">
          <div className="flex space-x-4">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                  isActive
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`
              }
            >
              <ListTodo className="mr-2" size={20} />
              Todos
            </NavLink>
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                `flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                  isActive
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`
              }
            >
              <User className="mr-2" size={20} />
              Profile
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
}