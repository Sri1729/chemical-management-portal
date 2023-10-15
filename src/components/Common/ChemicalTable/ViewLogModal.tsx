import { useStore } from "@/store";
import { UpdateActions } from "@/types";
import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import { X } from "react-feather";

const ViewLogsModalComp = () => {
  const store = useStore();
  const chemicalStore = store?.chemicals;
  const showModal = chemicalStore?.showViewChemicalLogModal;
  const onClose = () => (chemicalStore.showViewChemicalLogModal = false);
  const chemical = chemicalStore.selectedChemical;
  return (
    showModal && (
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="fixed inset-0 bg-black opacity-50"></div>

        <div className="bg-white p-6 rounded-lg w-4/6 max-h-80vh overflow-y-auto relative">
          <div className="flex justify-between mb-4">
            <h2 className="text-xl font-bold">{`View Logs for ${chemical?.name} (${chemical?.formula})`}</h2>
            <button
              className="text-gray-700 hover:text-gray-900"
              onClick={onClose}
            >
              <X />
            </button>
          </div>
          <table className="w-full border border-gray-300">
            <thead>
              <tr>
                <th className="py-2 px-4">Date</th>
                <th className="py-2 px-4">Time</th>
                <th className="py-2 px-4">Quantity</th>
                <th className="py-2 px-4">Action</th>
                <th className="py-2 px-4">Lab Value (if Decrement)</th>
              </tr>
            </thead>
            <tbody>
              {chemical?.logs?.map((log, index) => (
                <tr
                  key={index}
                  className={index % 2 === 0 ? "bg-gray-100" : ""}
                >
                  <td className="py-2 px-4 text-center">{log.date}</td>
                  <td className="py-2 px-4 text-center">{log.time}</td>
                  <td className="py-2 px-4 text-center">{log.quantity}</td>
                  <td className="py-2 px-4 text-center">{log.action}</td>
                  <td className="py-2 px-4 text-center">
                    {log.action === UpdateActions.ADD ? "-" : log?.lab}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )
  );
};

export const ViewLogsModal = observer(ViewLogsModalComp);
