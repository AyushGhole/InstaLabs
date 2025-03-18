import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Sidebar from "./components/Sidebar";
import Canvas from "./components/Canvas";
import "./App.css";

function App() {
  const handleDragOver = (e) => e.preventDefault();
  const handleDrop = (e) => e.preventDefault(); // Prevent default file behavior

  return (
    <DndProvider backend={HTML5Backend}>
      <div
        className="flex h-screen"
        onDragOver={handleDragOver}
        onDrop={handleDrop}>
        <Sidebar />
        <Canvas />
      </div>
    </DndProvider>
  );
}

export default App;
