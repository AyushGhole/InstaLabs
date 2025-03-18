import React from "react";
import { motion } from "framer-motion";
import { Trash2 } from "lucide-react"; // Delete icon

const DroppedElement = ({ element, onSelect, onDelete }) => {
  return (
    <motion.div
      className="absolute p-2 border rounded-md cursor-pointer shadow-md bg-white group"
      style={{
        left: element.position.x,
        top: element.position.y,
        color: element.color,
      }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.05 }}
      onClick={(e) => {
        e.stopPropagation(); // Prevents deselection
        console.log("Selected Element:", element); // Debugging
        onSelect(element); // Ensures the edit form updates immediately
      }}>
      {/* Delete Button - Only visible on hover */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onDelete();
        }}
        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-md opacity-0 group-hover:opacity-100 transition">
        <Trash2 size={14} />
      </button>

      {/* Render Element Content */}
      {element.type === "text" && (
        <p className="font-semibold">{element.content}</p>
      )}
      {element.type === "image" && (
        <img
          src={element.src || "https://via.placeholder.com/50"}
          alt="Uploaded"
        />
      )}
      {element.type === "button" && (
        <button className="bg-blue-500 text-white px-3 py-1 rounded shadow">
          {element.label}
        </button>
      )}
    </motion.div>
  );
};

export default DroppedElement;
