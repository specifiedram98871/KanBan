export type TaskState = "PLANNED" | "ONGOING" | "DONE";

export interface Task {
  title: string;
  state: TaskState;
}

export interface TaskProps {
  title: string;
}
