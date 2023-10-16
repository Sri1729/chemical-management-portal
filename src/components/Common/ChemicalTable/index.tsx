import React, { useState } from "react";
import { AddQuantityModal } from "./QuantityModal";
import { RemoveQuantityModal } from "./RemoveQuantity";
import { ViewLogsModal } from "./ViewLogModal";
import { ArrowDown, ArrowUp } from "react-feather";
import { AddChemicalModal } from "./AddChemicalModal";
import { useStore } from "@/store";
import { observer } from "mobx-react-lite";
import { SearchBox } from "..";
import { Sort } from "@/types";

interface ChemicalTableCompProps {
  from: "ALL" | "SINGLE";
}
const ChemicalTableComp = ({ from }: ChemicalTableCompProps) => {
  const store = useStore();
  const isFromStorePage = from === "ALL";
  const compStore = isFromStorePage ? store?.chemicals : store?.individualLab;
  const chemicalModel = compStore?.chemicalModel;
  const chemicals = chemicalModel?.chemicals;
  const searchText = chemicalModel?.searchText;
  const sortBy = chemicalModel?.sortBy;

  return (
    <div>
      <div className="flex justify-between my-4">
        <SearchBox
          value={searchText}
          setValue={(val) => (chemicalModel.searchText = val)}
        />
        {isFromStorePage && (
          <button
            className="bg-blue-500 text-white hover:bg-blue-600 py-2 px-6 rounded mr-2"
            onClick={() => (chemicalModel.newChemicalModalOpen = true)}
          >
            Add New Chemical
          </button>
        )}
      </div>

      {searchText && (
        <div className="mb-2">
          Showing results for : <b>{searchText}</b>
        </div>
      )}

      <table className="w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="py-4 px-6 text-center">Name</th>
            <th className="py-4 px-6 text-center">Formula</th>
            <th
              className="py-4 px-6 text-center cursor-pointer"
              onClick={() => chemicalModel.alterSortBy()}
            >
              <div className="flex items-center justify-center">
                <p className="">Quantity</p>
                <span className="ml-2">
                  {sortBy === Sort.DECREASE ? <ArrowUp /> : <ArrowDown />}
                </span>
              </div>
            </th>
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
                {isFromStorePage && (
                  <button
                    className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                    onClick={() => {
                      chemicalModel.selectedChemical = chemical;
                      chemicalModel.showAddChemicalModal = true;
                    }}
                  >
                    Add Quantity
                  </button>
                )}
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded"
                  onClick={() => {
                    chemicalModel.selectedChemical = chemical;
                    chemicalModel.showRemoveChemicalModal = true;
                  }}
                >
                  Remove Quantity
                </button>
                <button
                  className="bg-gray-500 text-white px-2 py-1 rounded ml-2"
                  onClick={() => {
                    chemicalModel.selectedChemical = chemical;
                    chemicalModel.showViewChemicalLogModal = true;
                  }}
                >
                  View Logs
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Show Quantity Modal */}
      <AddQuantityModal isFromStorePage={isFromStorePage} />

      {/* Show Remove Quantity Modal */}
      <RemoveQuantityModal isFromStorePage={isFromStorePage} />

      {/* Show View Logs Modal */}
      <ViewLogsModal isFromStorePage={isFromStorePage} />

      {/*Show Add chemical modal */}
      <AddChemicalModal isFromStorePage={isFromStorePage} />
    </div>
  );
};

export const ChemicalTable = observer(ChemicalTableComp);
