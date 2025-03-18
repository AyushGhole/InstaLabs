import React, { useState, useEffect } from "react";
import { useDrop } from "react-dnd";
import ElementForm from "./ElementForm";
import DroppedElement from "./DroppedElement";
import { motion } from "framer-motion";

const templates = {
  Portfolio: [
    {
      id: 1,
      type: "text",
      content: "Welcome to My Portfolio",
      position: { x: 220, y: 100 },
    },
    {
      id: 2,
      type: "image",
      src: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmxvZ3xlbnwwfHwwfHx8MA%3D%3D",
      height: "50px",

      position: { x: 80, y: 180 },
    },
    {
      id: 3,
      type: "button",
      label: "Contact Me",
      position: { x: 250, y: 550 },
    },
  ],
  Blog: [
    {
      id: 1,
      type: "text",
      content: "My Blog Title",
      position: { x: 320, y: 100 },
    },
    {
      id: 2,
      type: "text",
      content: "This is a sample blog post.",
      position: { x: 280, y: 180 },
    },
    { id: 3, type: "button", label: "Read More", position: { x: 320, y: 250 } },
  ],
};

const Canvas = () => {
  const [elements, setElements] = useState([]);
  const [selectedElement, setSelectedElement] = useState(null);

  useEffect(() => {
    const savedElements = JSON.parse(localStorage.getItem("elements"));
    if (savedElements) setElements(savedElements);
  }, []);

  useEffect(() => {
    localStorage.setItem("elements", JSON.stringify(elements));
  }, [elements]);

  const addElement = (newElement) => {
    const updatedElement = { id: elements.length + 1, ...newElement };
    setElements((prev) => [...prev, updatedElement]);
    setSelectedElement(updatedElement); // Auto-select the new element
  };

  const updateElement = (id, updatedData) => {
    setElements((prev) =>
      prev.map((el) => (el.id === id ? { ...el, ...updatedData } : el))
    );

    setSelectedElement((prev) =>
      prev && prev.id === id ? { ...prev, ...updatedData } : prev
    );
  };

  const deleteElement = (id) => {
    setElements((prev) => prev.filter((el) => el.id !== id));
    setSelectedElement(null);
  };

  const loadTemplate = (templateName) => {
    setElements(templates[templateName] || []);
    setSelectedElement(null); // Reset selection when loading a template
  };

  // Save project as JSON
  const saveProject = () => {
    const json = JSON.stringify(elements);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "project.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  // Load project from JSON
  const loadProject = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setElements(JSON.parse(e.target.result));
      };
      reader.readAsText(file);
    }
  };

  const [{ isOver }, drop] = useDrop(() => ({
    accept: ["ELEMENT", "FILE"],
    drop: (item, monitor) => {
      const offset = monitor.getClientOffset();
      const dropArea = document.getElementById("drop-area");

      if (!offset || !dropArea) return;

      const dropRect = dropArea.getBoundingClientRect();

      // Default element size assumptions (can be adjusted dynamically)
      const elementWidth = 150; // Approximate width of dropped element
      const elementHeight = 50; // Approximate height of dropped element

      // Center the element at the drop location
      const position = {
        x: offset.x - dropRect.left - elementWidth / 2,
        y: offset.y - dropRect.top - elementHeight / 2,
      };

      let newElement = null;
      if (item.type) {
        newElement = {
          id: elements.length + 1,
          type: item.type,
          content: item.type === "text" ? "Text Element" : "",
          label: item.type === "button" ? "Click Me" : "",
          position,
          color: "#000000",
        };
      }

      if (newElement) {
        addElement(newElement);
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  return (
    <div className="flex flex-col md:flex-row flex-1 min-h-screen">
      {/* Sidebar Controls */}
      <div className="p-4 bg-gray-100 w-64 border-r shadow-md">
        <h2 className="text-lg font-bold mb-4">Templates</h2>
        <select
          className="w-full p-2 border rounded-md"
          onChange={(e) => loadTemplate(e.target.value)}>
          <option value="">Select a Template</option>
          <option value="Portfolio">Portfolio</option>
          <option value="Blog">Blog</option>
        </select>

        <h2 className="text-lg font-bold mt-4 mb-2">Project Controls</h2>
        <button
          onClick={saveProject}
          className="w-full bg-green-500 text-white px-4 py-2 mt-2 rounded-md shadow-md hover:bg-green-600">
          Save Project
        </button>
        <input
          type="file"
          accept="application/json"
          className="mt-2 w-full"
          onChange={loadProject}
        />
      </div>

      {/* Canvas */}
      <motion.div
        ref={drop}
        id="drop-area"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className={`relative flex-1 p-6 bg-gray-100 border md:rounded-lg shadow-md transition-all
        ${
          isOver ? "border-blue-500 shadow-lg bg-gray-200" : "border-gray-300"
        }`}
        onClick={() => setSelectedElement(null)}>
        <h2 className="text-xl font-bold mb-4 text-gray-700">
          Canvas (Drop Here)
        </h2>

        {elements.map((el) => (
          <DroppedElement
            key={el.id}
            element={el}
            onSelect={(selected) => {
              console.log("Selected Element:", selected); // Debugging
              setSelectedElement(selected); // Ensure form updates
            }}
            onDelete={() => deleteElement(el.id)}
          />
        ))}
      </motion.div>

      {/* Edit Form */}
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full md:w-[300px] bg-white p-4 border-l shadow-lg md:rounded-lg max-h-screen overflow-y-auto">
        {selectedElement ? (
          <ElementForm
            selectedElement={selectedElement}
            updateElement={updateElement}
          />
        ) : (
          <div className="text-gray-500 text-center p-6">
            Select an element to edit
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Canvas;
