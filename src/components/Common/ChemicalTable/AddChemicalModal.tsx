import React, { useState } from "react";
import { DateComp, InputComp, NumberComp } from "..";

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
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  ); // Default to current date
  const [selectedTime, setSelectedTime] = useState("09:00"); // Default time value

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
          <InputComp
            title="Name"
            error=""
            onChangeValue={setName}
            value={name}
            fieldId="name"
          />

          <InputComp
            title="Formula"
            error=""
            value={formula}
            onChangeValue={setFormula}
            fieldId="formula"
          />

          <DateComp
            selectedDate={selectedDate}
            selectedTime={selectedTime}
            setSelectedDate={setSelectedDate}
            setSelectedTime={setSelectedTime}
          />
          <NumberComp
            error=""
            title="Initial Quantity"
            fieldId="quantity"
            onChangeValue={setInitialQuantity}
            value={initialQuantity}
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
