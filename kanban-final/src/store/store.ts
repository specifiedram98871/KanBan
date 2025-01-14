import {produce} from "immer";
import { create } from "zustand";
import { devtools, persist, subscribeWithSelector } from "zustand/middleware";

// Define Task type
interface Task {
  title: string;
  state: "TODO" | "ONGOING" | "DONE";
}

// Define Store type
interface Store {
  tasks: Task[];
  draggedTask: string | null;
  tasksInOngoing: number;
  addTask: (title: string, state: Task["state"]) => void;
  deleteTask: (title: string) => void;
  setDraggedTask: (title: string | null) => void;
  moveTask: (title: string, state: Task["state"]) => void;
}

const store = (set: any) => ({
  tasks: [] as Task[],
  draggedTask: null as string | null,
  tasksInOngoing: 0,
  addTask: (title: string, state: Task["state"]) =>
    set(
      produce((store: Store) => {
        store.tasks.push({ title, state });
      }),
      false,
      "addTask"
    ),
  deleteTask: (title: string) =>
    set((store: Store) => ({
      tasks: store.tasks.filter((task) => task.title !== title),
    })),
  setDraggedTask: (title: string | null) => set({ draggedTask: title }),
  moveTask: (title: string, state: Task["state"]) =>
    set((store: Store) => ({
      tasks: store.tasks.map((task) =>
        task.title === title ? { title, state } : task
      ),
    })),
});

const log = (config: any) => (set: any, get: any, api: any) =>
  config(
    (...args: any[]) => {
      console.log(args);
      set(...args);
    },
    get,
    api
  );

export const useStore = create<Store>(
  subscribeWithSelector(log(persist(devtools(store), { name: "store" })))
);

useStore.subscribe(
  (store) => store.tasks,
  (newTasks, prevTasks) => {
    useStore.setState({
      tasksInOngoing: newTasks.filter((task) => task.state === "ONGOING")
        .length,
    });
  }
);
