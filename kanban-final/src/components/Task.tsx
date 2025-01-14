import React from "react";
import { useTasks } from "../hooks/useTasks";
import trash from "../assets/R.png";
import { TaskProps } from "../interface/task";

const Task: React.FC<TaskProps> = ({ title }) => {
  const { tasks, deleteTask, setDraggedTask } = useTasks();
  const task = tasks.find((task) => task.title === title);

  if (!task) return null;

  return (
    <div
      className={`bg-white rounded-lg p-4 min-h-[5rem] mb-2 cursor-move
        ${task.state === "ONGOING" ? "bg-blue-200" : ""}
        ${task.state === "DONE" ? "bg-red-200" : ""}
      `}
      draggable
      onDragStart={() => setDraggedTask(task.title)}
    >
      <div className="font-bold text-green-700">{task.title}</div>
      <div className="flex justify-between items-center mt-2">
        <div>
          <img
            src={trash}
            alt="Delete"
            className="h-5 cursor-pointer"
            onClick={() => deleteTask(task.title)}
          />
        </div>
        <div
          className={`text-xs px-2 py-1 rounded ${
            task.state === "ONGOING" ? "bg-blue-300" : ""
          } ${task.state === "DONE" ? "bg-red-300" : ""}`}
        >
          {task.state}
        </div>
      </div>
    </div>
  );
};

export default Task;
