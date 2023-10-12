import React, { useState } from "react";
import { QuantityModal } from "./QuantityModal";
import { RemoveQuantityModal } from "./RemoveQuantity";
import { ViewLogsModal } from "./ViewLogModal";
import { Search, ArrowDown, ArrowUp } from "react-feather";
import { AddChemicalModal } from "./AddChemicalModal";
export interface Chemical {
  id: number;
  name: string;
  formula: string;
  quantity: number;
}
const ChemicalTable = () => {
  const [chemicals, setChemicals] = useState([
    { id: 1, name: "Chemical A", formula: "AB2", quantity: 10 },
    { id: 2, name: "Chemical B", formula: "CDE", quantity: 20 },
    { id: 3, name: "Chemical C", formula: "FGH", quantity: 15 },
    { id: 4, name: "Chemical D", formula: "IJK", quantity: 12 },
    // Add more chemical data as needed
  ]);

  const [isSortedByQuantity, setIsSortedByQuantity] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showDelModal, setShowDelModal] = useState(false);
  const [showLogModal, setShowLogModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedChemical, setSelectedChemical] = useState<Chemical | null>(
    null
  );

  const handleAddQuantity = (chemical: Chemical) => {
    setSelectedChemical(chemical);
    setShowModal(true);
  };

  const handleAddChemical = () => {
    setShowAddModal(true);
  };

  const handleRemoveQuantity = (chemical: Chemical) => {
    setSelectedChemical(chemical);
    setShowDelModal(true);
  };

  const handleViewLogs = (chemical: Chemical) => {
    setSelectedChemical(chemical);
    setShowLogModal(true);
  };

  const handleSortByQuantity = () => {
    const sortedChemicals = [...chemicals].sort((a, b) => {
      return isSortedByQuantity
        ? a.quantity - b.quantity
        : b.quantity - a.quantity;
    });
    setChemicals(sortedChemicals);
    setIsSortedByQuantity(!isSortedByQuantity);
  };

  return (
    <div>
      <div className="flex justify-between my-4">
        <div className="relative">
          <input
            type="text"
            className="py-2 px-4 w-64 rounded-full border border-gray-300 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Search chemicals..."
          />
          <div className="absolute top-0 right-0 mt-2 mr-3 text-gray-500">
            <Search />
          </div>
        </div>
        <button
          className="bg-blue-500 text-white hover:bg-blue-600 py-2 px-6 rounded mr-2"
          onClick={() => setShowAddModal(true)}
        >
          Add New Chemical
        </button>
      </div>

      <table className="w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="py-4 px-6 text-center">Name</th>
            <th className="py-4 px-6 text-center">Formula</th>
            <th
              className="py-4 px-6 text-center cursor-pointer"
              onClick={handleSortByQuantity}
            >
              <div className="flex items-center justify-center">
                <p className="">Quantity</p>
                <span className="ml-2">
                  {isSortedByQuantity ? <ArrowUp /> : <ArrowDown />}
                </span>
              </div>
            </th>
            {/* <th
              className="py-4 px-6 text-center cursor-pointer"
              onClick={handleSortByQuantity}
            >
              Quantity
              {isSortedByQuantity ? <ArrowUp /> : <ArrowDown />}
            </th> */}
            <th className="py-4 px-6 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {chemicals.map((chemical, index) => (
            <tr
              key={chemical.id}
              className={index % 2 === 0 ? "bg-gray-100" : ""}
            >
              <td className="py-4 px-6 text-center">{chemical.name}</td>
              <td className="py-4 px-6 text-center">{chemical.formula}</td>
              <td className="py-4 px-6 text-center">{chemical.quantity}</td>
              <td className="py-4 px-6 text-center">
                <button
                  className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                  onClick={() => handleAddQuantity(chemical)}
                >
                  Add Quantity
                </button>
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded"
                  onClick={() => handleRemoveQuantity(chemical)}
                >
                  Remove Quantity
                </button>
                <button
                  className="bg-gray-500 text-white px-2 py-1 rounded ml-2"
                  onClick={() => handleViewLogs(chemical)}
                >
                  View Logs
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Show Quantity Modal */}
      <QuantityModal
        showModal={showModal}
        onClose={() => setShowModal(false)}
        chemical={selectedChemical}
      />

      {/* Show Remove Quantity Modal */}
      <RemoveQuantityModal
        showModal={showDelModal}
        onClose={() => setShowDelModal(false)}
        chemical={selectedChemical}
      />

      {/* Show View Logs Modal */}
      <ViewLogsModal
        showModal={showLogModal}
        onClose={() => setShowLogModal(false)}
        chemical={selectedChemical}
      />

      {/*Show Add chemical modal */}
      <AddChemicalModal
        showModal={showAddModal}
        onClose={() => setShowAddModal(false)}
      />
    </div>
  );
};

export default ChemicalTable;
