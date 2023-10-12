import React from "react";

const labs = ["Lab 1", "Lab 2", "Lab 3"]; // Replace with your available labs

interface AddUserComponentProps {
  showModal: boolean;
  onClose: () => void;
}
export const AddUserComponent = ({
  showModal,
  onClose,
}: AddUserComponentProps) => {
  return (
    showModal && (
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="fixed inset-0 bg-black opacity-50"></div>

        <div className="bg-white p-6 rounded-lg max-w-md w-full relative">
          <h2 className="text-xl font-bold mb-4">Add User</h2>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Email"
              className="w-full border border-gray-300 rounded py-2 px-3"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              className="w-full border border-gray-300 rounded py-2 px-3"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="lab"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Access to Lab
            </label>
            <select
              id="lab"
              className="w-full border border-gray-300 rounded py-2 px-3"
            >
              {labs.map((lab) => (
                <option key={lab} value={lab}>
                  {lab}
                </option>
              ))}
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
              className="bg-blue-500 text-white hover:bg-blue-600 py-2 px-6 rounded"
              onClick={() => {
                // Add your create user logic here
                console.log("Creating user...");
                onClose(); // Close the modal after creating the user
              }}
            >
              Create
            </button>
          </div>
        </div>
      </div>
    )
  );
};
