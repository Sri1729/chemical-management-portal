import React from "react";
import { LabTable } from "./LabTable";
import { AddNewLabModal } from "./AddNewLabModal";
import { useStore } from "@/store";

export const LabsDashboard = () => {
  const store = useStore();
  const labModal = store?.laboratory?.labModel;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">All Labs</h2>
      <button
        className="bg-blue-500 text-white py-2 px-4 rounded mb-4"
        onClick={() => (labModal.showAddLabModal = true)}
      >
        Add New Lab
      </button>

      <LabTable />

      {/* Modal for adding a new lab */}

      <AddNewLabModal />
    </div>
  );
};
