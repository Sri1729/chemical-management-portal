import React, { useState } from "react";

interface AddChemicalModalProps {
  showModal: boolean;
  onClose: () => void;
}
export const AddChemicalModal = ({
  showModal,
  onClose,
}: AddChemicalModalProps) => {
  const [name, setName] = useState("");
  const [formula, setFormula] = useState("");
  const [initialQuantity, setInitialQuantity] = useState("");

  const handleSave = () => {
    // Add your save logic here
    console.log("Saving...");
    onClose(); // Close the modal after saving
  };

  return (
    showModal && (
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="fixed inset-0 bg-black opacity-50"></div>

        <div className="bg-white p-6 rounded-lg max-w-md w-full relative">
          <h2 className="text-xl font-bold mb-4">Add New Chemical</h2>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            className="w-full border border-gray-300 rounded py-2 px-3 mb-4"
          />
          <input
            type="text"
            value={formula}
            onChange={(e) => setFormula(e.target.value)}
            placeholder="Formula"
            className="w-full border border-gray-300 rounded py-2 px-3 mb-4"
          />
          <input
            type="number"
            value={initialQuantity}
            onChange={(e) => setInitialQuantity(e.target.value)}
            placeholder="Initial Quantity"
            className="w-full border border-gray-300 rounded py-2 px-3 mb-6"
          />
          <div className="flex justify-center">
            <button
              className="bg-gray-300 text-gray-700 hover:bg-gray-400 py-2 px-6 rounded mr-2"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className="bg-blue-500 text-white hover:bg-blue-600 py-2 px-6 rounded"
              onClick={handleSave}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    )
  );
};
