import { Task } from "./task";

export type TaskState = "PLANNED" | "ONGOING" | "DONE";

export interface TaskContextType {
  tasks: Task[];
  draggedTask: string | null;
  tasksInOngoing: number;
  addTask: (title: string, state: Task["state"]) => void;
  deleteTask: (title: string) => void;
  setDraggedTask: (title: string | null) => void;
  moveTask: (title: string, state: Task["state"]) => void;
}
