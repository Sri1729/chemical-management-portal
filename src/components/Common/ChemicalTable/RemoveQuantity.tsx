import React, { useState } from "react";
import { DateComp, Dropdown, NumberComp, SaveButton } from "..";
import { useStore } from "@/store";
import { observer } from "mobx-react-lite";
import { UpdateActions } from "@/types";

interface Props {
  isFromStorePage: boolean;
}

const RemoveQuantityModalComp = ({ isFromStorePage }: Props) => {
  const store = useStore();
  const compStore = isFromStorePage ? store?.chemicals : store?.individualLab;
  const chemicalModel = compStore?.chemicalModel;
  const showModal = chemicalModel?.showRemoveChemicalModal;
  const onClose = () => (chemicalModel.showRemoveChemicalModal = false);
  const chemical = chemicalModel?.selectedChemical;

  const quantity = chemicalModel?.updateChemicalQuantity;
  const selectedDate = chemicalModel?.updateChemicalDate;
  const selectedTime = chemicalModel?.updateChemicalTime;
  const selectedLab = chemicalModel?.updateChemicalLab;
  const labs = store.laboratory?.labModel?.labsForSelect;
  const batches = chemicalModel?.batches;
  const selectedBatch = chemicalModel?.updateChemicalBatch;

  return (
    showModal && (
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="fixed inset-0 bg-black opacity-50"></div>

        <div className="bg-white p-6 rounded-lg max-w-md w-full relative">
          <h2 className="text-xl font-bold mb-4">{`Remove Quantity for ${chemical?.name}`}</h2>

          <Dropdown
            title={"Select Batch"}
            value={selectedBatch}
            error={chemicalModel.updateChemicalError.batch}
            fieldId={"batch"}
            onChangeValue={(val: string) =>
              (chemicalModel.updateChemicalBatch = val)
            }
            values={batches}
          />
          <NumberComp
            title="Quantity to Remove"
            fieldId="quantityToRemove"
            error={chemicalModel?.updateChemicalError?.quantity}
            onChangeValue={(val) =>
              (chemicalModel.updateChemicalQuantity = val)
            }
            value={quantity}
            quantatiyTitle={"Unit(s)"}
            quantatiyValue={chemicalModel?.selectedChemical?.units || ""}
            quantatiyError={""}
            quantatiyFieldId={"units"}
            onQuantatiyChangeValue={(val: string) => null}
            showDisabledQuantity={true}
            maxQuantityValue={chemicalModel?.maxQuantity}
          />
          <DateComp
            selectedDate={selectedDate}
            selectedTime={selectedTime}
            setSelectedDate={(val) => (chemicalModel.updateChemicalDate = val)}
            setSelectedTime={(val) => (chemicalModel.updateChemicalTime = val)}
            showCost={false}
            chemicalCost={""}
            setChemicalCost={(val: string) => null}
            chemicalCostError={""}
          />
          {isFromStorePage && (
            <Dropdown
              title="Select Lab"
              value={selectedLab}
              error={chemicalModel.updateChemicalError.lab}
              fieldId={"labDropdown"}
              onChangeValue={(val) => (chemicalModel.updateChemicalLab = val)}
              values={labs}
            />
          )}
          <div className="flex justify-center">
            <button
              className="bg-gray-300 text-gray-700 hover:bg-gray-400 py-2 px-6 rounded mr-2"
              onClick={onClose}
            >
              Cancel
            </button>
            <SaveButton
              text="Remove"
              loading={chemicalModel.updateChemicalLoading}
              onClick={() => compStore?.onUpdateChemical(UpdateActions.DELETE)}
            />
          </div>
        </div>
      </div>
    )
  );
};

export const RemoveQuantityModal = observer(RemoveQuantityModalComp);
