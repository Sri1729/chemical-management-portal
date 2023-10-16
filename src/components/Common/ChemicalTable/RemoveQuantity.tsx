import React, { useState } from "react";
import { DateComp, Dropdown, NumberComp, SaveButton } from "..";
import { useStore } from "@/store";
import { observer } from "mobx-react-lite";
import { UpdateActions } from "@/types";

const RemoveQuantityModalComp = () => {
  const store = useStore();
  const chemicalStore = store?.chemicals;
  const showModal = chemicalStore?.showRemoveChemicalModal;
  const onClose = () => (chemicalStore.showRemoveChemicalModal = false);
  const chemical = chemicalStore?.selectedChemical;

  const quantity = chemicalStore?.updateChemicalQuantity;
  const selectedDate = chemicalStore?.updateChemicalDate;
  const selectedTime = chemicalStore?.updateChemicalTime;
  const selectedLab = chemicalStore?.updateChemicalLab;
  const labs = store.laboratory?.labModel?.labsForSelect;

  return (
    showModal && (
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="fixed inset-0 bg-black opacity-50"></div>

        <div className="bg-white p-6 rounded-lg max-w-md w-full relative">
          <h2 className="text-xl font-bold mb-4">{`Remove Quantity for ${chemical?.name} (${chemical?.formula})`}</h2>

          <NumberComp
            title="Quantity to Remove"
            fieldId="quantityToRemove"
            error={chemicalStore?.updateChemicalError?.quantity}
            onChangeValue={(val) =>
              (chemicalStore.updateChemicalQuantity = val)
            }
            value={quantity}
          />
          <DateComp
            selectedDate={selectedDate}
            selectedTime={selectedTime}
            setSelectedDate={(val) => (chemicalStore.updateChemicalDate = val)}
            setSelectedTime={(val) => (chemicalStore.updateChemicalTime = val)}
          />
          <Dropdown
            title="Select Lab"
            value={selectedLab}
            error={chemicalStore.updateChemicalError.lab}
            fieldId={"labDropdown"}
            onChangeValue={(val) => (chemicalStore.updateChemicalLab = val)}
            labs={labs}
          />

          <div className="flex justify-center">
            <button
              className="bg-gray-300 text-gray-700 hover:bg-gray-400 py-2 px-6 rounded mr-2"
              onClick={onClose}
            >
              Cancel
            </button>
            <SaveButton
              text="Remove"
              loading={chemicalStore.updateChemicalLoading}
              onClick={() =>
                chemicalStore?.onUpdateChemical(UpdateActions.DELETE)
              }
            />
          </div>
        </div>
      </div>
    )
  );
};

export const RemoveQuantityModal = observer(RemoveQuantityModalComp);
