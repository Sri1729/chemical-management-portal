import React, { useState } from "react";
import { LabTable } from "./LabTable";
import AddNewLabModal from "./AddNewLabModal";

export const LabsDashboard = () => {
  const [showAddLabModal, setShowAddLabModal] = useState(false);

  const handleAddLab = () => {
    // Implement logic to handle adding a new lab
    console.log("Adding a new lab...");
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">All Labs</h2>
      <button
        className="bg-blue-500 text-white py-2 px-4 rounded mb-4"
        onClick={() => setShowAddLabModal(true)}
      >
        Add New Lab
      </button>

      <LabTable />

      {/* Modal for adding a new lab */}

      <AddNewLabModal
        showModal={showAddLabModal}
        onClose={() => setShowAddLabModal(false)}
      />
    </div>
  );
};
