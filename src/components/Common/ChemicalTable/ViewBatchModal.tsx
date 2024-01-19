import { useStore } from "@/store";
import { observer } from "mobx-react-lite";
import React from "react";
import { Eye, X } from "react-feather";
import { ViewLogsModal } from "./ViewLogModal";

interface Props {
  isFromStorePage: boolean;
}

const ViewBatchModalComp = ({ isFromStorePage }: Props) => {
  const store = useStore();
  const compStore = isFromStorePage ? store?.chemicals : store?.individualLab;
  const chemicalModel = compStore?.chemicalModel;
  const showModal = chemicalModel?.showChemicalBatchModal;
  const onClose = () => (chemicalModel.showChemicalBatchModal = false);
  const chemical = chemicalModel.selectedChemical;

  return (
    showModal && (
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="fixed inset-0 bg-black opacity-50"></div>

        <div className="bg-white p-6 rounded-lg w-4/6 max-h-80vh overflow-y-auto relative">
          <div className="flex justify-between mb-4">
            <h2 className="text-xl font-bold">{`View batches for ${chemical?.name}`}</h2>
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
                <th className="py-2 px-4">Batch</th>
                <th className="py-2 px-4">Quantity</th>
                <th className="py-2 px-4">Cost</th>
                <th className="py-2 px-4">Mfg. Date</th>
                <th className="py-2 px-4">Exp. Date</th>
                <th className="py-2 px-4">Logs</th>
              </tr>
            </thead>
            <tbody>
              {chemical?.batches?.map((batch, index) => (
                <tr
                  key={index}
                  className={index % 2 === 0 ? "bg-gray-100" : ""}
                >
                  <td className="py-2 px-4 text-center">{`Batch ${
                    index + 1
                  }`}</td>
                  <td className="py-2 px-4 text-center">
                    {batch.quantity} {chemical.units}
                  </td>
                  <td className="py-2 px-4 text-center">{batch.cost} /-</td>
                  <td className="py-2 px-4 text-center">
                    {batch.manufacturingDate}
                  </td>
                  <td className="py-2 px-4 text-center">
                    {batch.expiryDate ? batch.expiryDate : "*"}
                  </td>
                  <td className="py-2 px-4 text-center">
                    <div className="text-blue-500 hover:text-blue-700 items-center">
                      <button
                        className="self-center"
                        onClick={() => {
                          chemicalModel.selectedChemicalBatchIndex = index;
                          chemicalModel.showViewChemicalBatchLogModal = true;
                        }}
                      >
                        <Eye />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <ViewLogsModal
          isFromStorePage={isFromStorePage}
          batch={chemical?.batches?.[chemicalModel?.selectedChemicalBatchIndex]}
          batchName={`Batch ${chemicalModel?.selectedChemicalBatchIndex + 1}`}
          chemicalName={chemical?.name}
          showModal={chemicalModel?.showViewChemicalBatchLogModal}
          onClose={() => (chemicalModel.showViewChemicalBatchLogModal = false)}
        />
      </div>
    )
  );
};

export const ViewBatchModal = observer(ViewBatchModalComp);
