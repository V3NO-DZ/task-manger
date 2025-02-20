"use client"; // Ensures component runs on the client

import { useState, useEffect } from "react";
import { Trash, CheckCircle } from "lucide-react";

type Task = {
  id: number;
  text: string;
  completed: boolean;
};

// Define filter options
const FILTERS = {
  ALL: "All",
  COMPLETED: "Completed",
  PENDING: "Pending",
};

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskInput, setTaskInput] = useState("");
  const [filter, setFilter] = useState(FILTERS.ALL); // Track selected filter

  // Load tasks from local storage when the component mounts
  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  // Save tasks to local storage whenever the tasks array changes
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Add a new task
  const addTask = () => {
    if (!taskInput.trim()) return;

    const newTask: Task = {
      id: Date.now(),
      text: taskInput,
      completed: false,
    };

    setTasks([...tasks, newTask]);
    setTaskInput("");
  };

  // Toggle task completion
  const toggleTask = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Delete a task
  const deleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Apply filter logic
  const filteredTasks = tasks.filter((task) => {
    if (filter === FILTERS.COMPLETED) return task.completed;
    if (filter === FILTERS.PENDING) return !task.completed;
    return true; // Show all tasks
  });

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white p-6 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4">Task Manager</h1>

      {/* Task Input */}
      <div className="flex">
        <input
          type="text"
          placeholder="Add a new task..."
          className="flex-1 p-2 border rounded-l"
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-600"
          onClick={addTask}
        >
          Add
        </button>
      </div>

      {/* Filter Buttons */}
      <div className="flex justify-center space-x-2 mt-4">
        {Object.values(FILTERS).map((filterOption) => (
          <button
            key={filterOption}
            className={`px-4 py-2 rounded ${
              filter === filterOption
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => setFilter(filterOption)}
          >
            {filterOption}
          </button>
        ))}
      </div>

      {/* Task List */}
      <ul className="mt-4">
        {filteredTasks.length === 0 && (
          <p className="text-gray-500">No tasks found.</p>
        )}
        {filteredTasks.map((task) => (
          <li
            key={task.id}
            className="flex justify-between items-center bg-gray-100 p-2 my-2 rounded"
          >
            <span
              className={`flex-1 ${
                task.completed ? "line-through text-gray-500" : ""
              }`}
            >
              {task.text}
            </span>
            <div className="flex space-x-2">
              {/* Complete Task Button */}
              <button
                onClick={() => toggleTask(task.id)}
                className="text-green-500 hover:text-green-600"
              >
                completed
                <CheckCircle size={20} />
              </button>
              {/* Delete Task Button */}
              <button
                onClick={() => deleteTask(task.id)}
                className="text-red-500 hover:text-red-600"
              >
                delete
                <Trash size={20} />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
