import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const ElementForm = ({ selectedElement, updateElement }) => {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    setFormData(selectedElement || {});
  }, [selectedElement]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateElement(selectedElement.id, formData);
  };

  if (!selectedElement) {
    return (
      <div className="w-full md:w-[300px] min-h-screen flex items-center justify-center text-gray-500 text-center border-l shadow-md bg-white">
        <p>Select an element to edit</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full md:w-[300px] min-h-screen bg-white p-6 border-l shadow-lg flex flex-col justify-start">
      <h2 className="text-lg font-bold mb-4 text-gray-800 border-b pb-2">
        Edit Element
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        {/* Input for text elements */}
        {selectedElement.type === "text" && (
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium">Text:</label>
            <input
              name="content"
              value={formData.content || ""}
              onChange={handleChange}
              placeholder="Enter text"
              className="w-full p-3 mt-1 border rounded-md shadow-sm focus:ring focus:ring-blue-300 text-gray-900"
            />
          </div>
        )}

        {/* Input for button label */}
        {selectedElement.type === "button" && (
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium">Button Label:</label>
            <input
              name="label"
              value={formData.label || ""}
              onChange={handleChange}
              placeholder="Enter button text"
              className="w-full p-3 mt-1 border rounded-md shadow-sm focus:ring focus:ring-blue-300 text-gray-900"
            />
          </div>
        )}

        {/* Color Picker */}
        <div className="flex flex-col">
          <label className="text-gray-700 font-medium">Color:</label>
          <input
            name="color"
            type="color"
            value={formData.color || "#000000"}
            onChange={handleChange}
            className="w-12 h-12 mt-2 border rounded shadow-md cursor-pointer"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-3 rounded-md shadow-md hover:bg-blue-600 transition w-full font-semibold text-lg">
          Update
        </button>
      </form>
    </motion.div>
  );
};

export default ElementForm;
