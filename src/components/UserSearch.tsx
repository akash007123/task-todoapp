import { useState } from "react";
import { useTodo } from "../context/TodoContext";

export function UserSearch() {
  const { users } = useTodo();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredUsers = (users ?? []).filter((user) =>
    user?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-md mx-auto p-4">
      <input
        type="text"
        placeholder="Search for a user..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded mb-4"
      />
      <div className="max-h-48 overflow-y-auto border border-gray-300 rounded">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <div key={user.id} className="p-2 hover:bg-gray-100 cursor-pointer">
              {user.name}
            </div>
          ))
        ) : (
          <p className="p-2 text-gray-500">No users found</p>
        )}
      </div>
    </div>
  );
}
