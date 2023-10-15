import React, { useState } from "react";
import { Chemical } from ".";
import { DateComp } from "..";

interface RemoveQuantityModalProps {
  showModal: boolean;
  onClose: () => void;
  chemical: Chemical | null;
}
export const RemoveQuantityModal = ({
  showModal,
  onClose,
  chemical,
}: RemoveQuantityModalProps) => {
  const [quantityToRemove, setQuantityToRemove] = useState("");
  const [selectedLab, setSelectedLab] = useState("");
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  ); // Default to current date
  const [selectedTime, setSelectedTime] = useState("09:00"); // Default time value

  const handleSave = () => {
    // Add your logic to remove the quantity
    console.log("Removing quantity:", quantityToRemove);
    console.log("Selected Lab:", selectedLab);
    console.log("Selected Date:", selectedDate);
    console.log("Selected Time:", selectedTime);
    onClose();
  };

  return (
    showModal && (
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="fixed inset-0 bg-black opacity-50"></div>

        <div className="bg-white p-6 rounded-lg max-w-md w-full relative">
          <h2 className="text-xl font-bold mb-4">{`Remove Quantity for ${chemical?.name} (${chemical?.formula})`}</h2>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="quantityToRemove"
            >
              Quantity to Remove
            </label>
            <input
              type="number"
              id="quantityToRemove"
              value={quantityToRemove}
              onChange={(e) => setQuantityToRemove(e.target.value)}
              placeholder="Enter quantity to remove"
              className="w-full border border-gray-300 rounded py-2 px-3"
            />
          </div>
          <DateComp
            selectedDate={selectedDate}
            selectedTime={selectedTime}
            setSelectedDate={setSelectedDate}
            setSelectedTime={setSelectedTime}
          />
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="labDropdown"
            >
              Select Lab
            </label>
            <select
              id="labDropdown"
              value={selectedLab}
              onChange={(e) => setSelectedLab(e.target.value)}
              className="w-full border border-gray-300 rounded py-2 px-3"
            >
              <option value="">Select a lab</option>
              <option value="Lab 1">Lab 1</option>
              <option value="Lab 2">Lab 2</option>
              {/* Add more options based on available labs */}
            </select>
          </div>
          <div className="flex justify-center">
            <button
              className="bg-gray-300 text-gray-700 hover:bg-gray-400 py-2 px-6 rounded mr-2"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className="bg-red-500 text-white hover:bg-red-600 py-2 px-6 rounded"
              onClick={handleSave}
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    )
  );
};
