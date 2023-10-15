import React, { useState } from "react";
import { Chemical } from ".";
import { DateComp } from "..";

interface QuantityModalProps {
  showModal: boolean;
  onClose: () => void;
  chemical: Chemical | null;
}
export const QuantityModal = ({
  showModal,
  onClose,
  chemical,
}: QuantityModalProps) => {
  const [quantity, setQuantity] = useState("");
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  ); // Default to current date
  const [selectedTime, setSelectedTime] = useState("09:00"); // Default time value

  const handleSave = () => {
    // Add your logic to save the quantity
    console.log("Saving quantity:", quantity);
    console.log("Selected Date:", selectedDate);
    console.log("Selected Time:", selectedTime);
    onClose();
  };

  return (
    showModal && (
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="fixed inset-0 bg-black opacity-50"></div>

        <div className="bg-white p-6 rounded-lg max-w-md w-full relative">
          <h2 className="text-xl font-bold mb-4">{`Add Quantity for ${chemical?.name} (${chemical?.formula})`}</h2>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            placeholder="Enter quantity"
            className="w-full border border-gray-300 rounded py-2 px-3 mb-4"
          />
          <DateComp
            selectedDate={selectedDate}
            selectedTime={selectedTime}
            setSelectedDate={setSelectedDate}
            setSelectedTime={setSelectedTime}
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
