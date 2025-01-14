import React from "react";
import {Column} from "./components/Column";

const App: React.FC = () => {
  return (
    <div className="bg-gray-800">
      <div className="relative top-40 text-center">
        <h1 className="text-5xl font-bold text-white">KanBan Board</h1>
        <p className="text-white pt-4">Manage your tasks with ease</p>
      </div>
    <div className="flex justify-center items-center min-h-screen">
      <Column state="PLANNED" />
      <Column state="ONGOING" />
      <Column state="DONE" />
      </div>
      </div>
  );
};

export default App;
