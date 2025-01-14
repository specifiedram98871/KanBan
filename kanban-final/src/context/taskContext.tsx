import React, { createContext, useState, useEffect, ReactNode } from "react";
import { Task } from "../interface/task";
import { TaskContextType } from "../interface/taskContext";

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export default TaskContext;

export const TaskProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [draggedTask, setDraggedTask] = useState<string | null>(null);
  const [tasksInOngoing, setTasksInOngoing] = useState<number>(0);

  const addTask = (title: string, state: Task["state"]) => {
    setTasks((prevTasks) => [...prevTasks, { title, state }]);
  };

  const deleteTask = (title: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.title !== title));
  };

  const moveTask = (title: string, state: Task["state"]) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.title === title ? { title, state } : task))
    );
  };

  useEffect(() => {
    setTasksInOngoing(tasks.filter((task) => task.state === "ONGOING").length);
  }, [tasks]);

  return (
    <TaskContext.Provider
      value={{
        tasks,
        draggedTask,
        tasksInOngoing,
        addTask,
        deleteTask,
        setDraggedTask,
        moveTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
