import React from "react";

interface ConfirmationModalProps {
  showModal: boolean;
  onClose: () => void;
  user: string;
}
export const ConfirmationModal = ({
  showModal,
  onClose,
  user,
}: ConfirmationModalProps) => {
  return (
    showModal && (
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="fixed inset-0 bg-black opacity-50"></div>

        <div className="bg-white p-6 rounded-lg max-w-md w-full relative">
          <p className="text-gray-700 mb-6">
            <i className="text-xl font-bold mb-4">{`${user}`}</i>
            <br />
            <br />
            Are you sure you want to remove this user permanently?
          </p>
          <div className="flex justify-center">
            <button
              className="bg-gray-300 text-gray-700 hover:bg-gray-400 py-2 px-6 rounded mr-2"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className="bg-red-500 text-white hover:bg-red-600 py-2 px-6 rounded"
              onClick={() => {
                // Add your delete user logic here
                console.log("Deleting user...");
                onClose(); // Close the modal after deleting the user
              }}
            >
              Proceed
            </button>
          </div>
        </div>
      </div>
    )
  );
};
