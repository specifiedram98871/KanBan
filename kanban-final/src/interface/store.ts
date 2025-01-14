import { Task, TaskState } from "../interface/task";

export interface StoreState {
  tasks: Task[];
  draggedTask: string | null;
  tasksInOngoing: number;
  addTask: (title: string, state: TaskState) => void;
  deleteTask: (title: string) => void;
  setDraggedTask: (title: string | null) => void;
  moveTask: (title: string, state: TaskState) => void;
}
