import React, { useState } from "react";
import { Search } from "lucide-react";
import { useTodo } from "../context/TodoContext";
import { TodoFormData, TodoSchema } from "../types";

export function TodoForm({ onSuccess }: { onSuccess: () => void }) {
  const { users, addTodo } = useTodo();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<TodoFormData>({
    title: "",
    description: "",
    assignedTo: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [search, setSearch] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = TodoSchema.safeParse({
      ...formData,
      id: "",
      completed: false,
      createdAt: 0,
    });

    if (!result.success) {
      const formErrors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        formErrors[issue.path[0] as string] = issue.message;
      });
      setErrors(formErrors);
      return;
    }

    addTodo(formData);
    onSuccess();
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  if (step === 1) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md ">
        <h2 className="text-2xl font-bold mb-4">Create New Todo - Step 1</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, title: e.target.value }))
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">{errors.title}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
              rows={3}
            />
          </div>
          <button
            onClick={() => setStep(2)}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
          >
            Next Step
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Create New Todo - Step 2</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Assign To
          </label>
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search users..."
              className="pl-10 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
            />
          </div>
          <div className="mt-2 space-y-2">
            {filteredUsers.map((user) => (
              <div
                key={user.id}
                onClick={() =>
                  setFormData((prev) => ({ ...prev, assignedTo: user.id }))
                }
                className={`p-2 rounded-md cursor-pointer ${
                  formData.assignedTo === user.id
                    ? "bg-blue-100 border-blue-500"
                    : "hover:bg-gray-100"
                }`}
              >
                {user.name}
              </div>
            ))}
          </div>
          {errors.assignedTo && (
            <p className="text-red-500 text-sm mt-1">{errors.assignedTo}</p>
          )}
        </div>
        <div className="flex space-x-4">
          <button
            type="button"
            onClick={() => setStep(1)}
            className="flex-1 bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition-colors"
          >
            Back
          </button>
          <button
            type="submit"
            className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
          >
            Create Todo
          </button>
        </div>
      </form>
    </div>
  );
}
