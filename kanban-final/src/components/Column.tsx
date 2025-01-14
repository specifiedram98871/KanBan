import React, { useState } from "react";
import { useTasks } from "../hooks/useTasks";
import Task from "../components/Task";
import { TaskState } from "../interface/task";

export const Column: React.FC<{ state: TaskState }> = ({ state }) => {
  const [text, setText] = useState("");
  const [open, setOpen] = useState(false);
  const [drop, setDrop] = useState(false);

  const { tasks, addTask, setDraggedTask, draggedTask, moveTask } = useTasks();

  const filteredTasks = tasks.filter((task) => task.state === state);

  const handleDrop = () => {
    if (draggedTask) {
      moveTask(draggedTask, state);
      setDraggedTask(null);
    }
    setDrop(false);
  };

  return (
    <div
      className={`p-4 rounded-lg min-h-[20rem] bg-gray-700 text-white w-1/3 max-w-[20rem] mx-2
        ${drop ? "border-dashed border-white" : ""}`}
      onDragOver={(e) => {
        setDrop(true);
        e.preventDefault();
      }}
      onDragLeave={(e) => {
        setDrop(false);
        e.preventDefault();
      }}
      onDrop={handleDrop}
    >
      <div className="flex justify-between items-center mb-4">
        <p>{state}</p>
        <button
          className="bg-white text-black px-4 py-2 rounded hover:bg-gray-300"
          onClick={() => setOpen(true)}
        >
          Add
        </button>
      </div>

      {filteredTasks.map((task) => (
        <Task key={task.title} title={task.title} />
      ))}

      {open && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-4 rounded w-[20rem]">
            <input
              className="border p-2 w-full text-black rounded mb-4"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded"
              onClick={() => {
                addTask(text, state as TaskState); // Explicit cast to TaskState
                setText("");
                setOpen(false);
              }}
            >
              Submit
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
