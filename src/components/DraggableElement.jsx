import React from "react";
import { useDrag } from "react-dnd";

const DraggableElement = ({ element }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "ELEMENT",
    item: { type: element.type },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className={`p-3 m-2 border rounded-md cursor-grab bg-gray-200 hover:bg-gray-300 transition-all shadow-md ${
        isDragging ? "opacity-50" : "opacity-100"
      }`}>
      {element.label}
    </div>
  );
};

export default DraggableElement;
