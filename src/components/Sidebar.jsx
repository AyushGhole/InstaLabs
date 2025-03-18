import React, { useState } from "react";
import DraggableElement from "./DraggableElement";
import { Menu, X, Upload } from "lucide-react"; // Icons for UI
import { motion } from "framer-motion";

const elements = [
  { id: 1, type: "text", label: "Text" },
  {
    id: 2,
    type: "image",
    src: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmxvZ3xlbnwwfHwwfHx8MA%3D%3D",
    label: "Image",
  },
  { id: 3, type: "button", label: "Button" },
];

const Sidebar = ({ handleFileUpload }) => {
  const [isOpen, setIsOpen] = useState(true);

  // Handle Image Upload from System
  const onImageUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        handleFileUpload({
          type: "image",
          src: e.target.result,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        className="md:hidden fixed top-4 left-4 bg-gray-900 text-white p-2 rounded-full shadow-lg z-50"
        onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <motion.aside
        initial={{ x: -250 }}
        animate={{ x: isOpen ? 0 : -250 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={`fixed md:relative top-0 left-0 h-full w-64 bg-white/80 backdrop-blur-md p-6 shadow-lg 
        transform md:translate-x-0 transition-transform duration-300 ease-in-out z-40 border-r border-gray-300`}>
        <h2 className="text-lg font-bold mb-4 text-gray-800">Elements</h2>
        <div className="space-y-2">
          {elements.map((el) => (
            <DraggableElement key={el.id} element={el} />
          ))}
        </div>

        {/* Upload Image from System */}
        <div className="mt-6">
          <label
            htmlFor="image-upload"
            className="flex items-center justify-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-md shadow-md cursor-pointer hover:bg-blue-600 transition">
            <Upload size={18} />
            Upload Image
          </label>
          <input
            id="image-upload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={onImageUpload}
          />
        </div>
      </motion.aside>

      {/* Background Overlay (Mobile) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 md:hidden"
          onClick={() => setIsOpen(false)}></div>
      )}
    </>
  );
};

export default Sidebar;
