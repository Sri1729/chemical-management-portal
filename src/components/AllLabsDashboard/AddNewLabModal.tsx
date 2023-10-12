import React, { useState } from "react";

interface AddNewLabModalProps {
  showModal: boolean;
  onClose: () => void;
}

const AddNewLabModal = ({ showModal, onClose }: AddNewLabModalProps) => {
  const [labId, setLabId] = useState("");
  const [labName, setLabName] = useState("");
  const [roomNumber, setRoomNumber] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  const handleSave = () => {
    // Add your logic to save the new lab
    console.log("Lab ID:", labId);
    console.log("Lab Name:", labName);
    console.log("Room Number:", roomNumber);
    console.log("Selected Date:", selectedDate);
    console.log("Selected Time:", selectedTime);
    onClose();
  };

  return (
    showModal && (
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="fixed inset-0 bg-black opacity-50"></div>

        <div className="bg-white p-6 rounded-lg max-w-md w-full relative">
          <h2 className="text-xl font-bold mb-4">Add New Lab</h2>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="labIdInput"
            >
              Lab ID
            </label>
            <input
              type="text"
              id="labIdInput"
              value={labId}
              onChange={(e) => setLabId(e.target.value)}
              placeholder="Enter Lab ID"
              className="w-full border border-gray-300 rounded py-2 px-3"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="labNameInput"
            >
              Lab Name
            </label>
            <input
              type="text"
              id="labNameInput"
              value={labName}
              onChange={(e) => setLabName(e.target.value)}
              placeholder="Enter Lab Name"
              className="w-full border border-gray-300 rounded py-2 px-3"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="roomNumberInput"
            >
              Room Number
            </label>
            <input
              type="text"
              id="roomNumberInput"
              value={roomNumber}
              onChange={(e) => setRoomNumber(e.target.value)}
              placeholder="Enter Room Number"
              className="w-full border border-gray-300 rounded py-2 px-3"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="dateInput"
            >
              Select Date
            </label>
            <input
              type="date"
              id="dateInput"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full border border-gray-300 rounded py-2 px-3"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="timeDropdown"
            >
              Select Time
            </label>
            <input
              type="time"
              id="timeDropdown"
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
              className="w-full border border-gray-300 rounded py-2 px-3"
            />
          </div>
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

export default AddNewLabModal;
