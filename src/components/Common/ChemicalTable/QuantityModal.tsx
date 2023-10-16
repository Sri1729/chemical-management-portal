import React, { useState } from "react";
import { DateComp, NumberComp, SaveButton } from "..";
import { useStore } from "@/store";
import { observer } from "mobx-react-lite";
import { UpdateActions } from "@/types";

interface Props {
  isFromStorePage: boolean;
}

const AddQuantityModalComp = ({ isFromStorePage }: Props) => {
  const store = useStore();
  const compStore = isFromStorePage ? store?.chemicals : store?.individualLab;
  const chemicalModel = compStore.chemicalModel;
  const showModal = chemicalModel?.showAddChemicalModal;
  const onClose = () => (chemicalModel.showAddChemicalModal = false);
  const chemical = chemicalModel?.selectedChemical;

  const quantity = chemicalModel?.updateChemicalQuantity;
  const selectedDate = chemicalModel?.updateChemicalDate;
  const selectedTime = chemicalModel?.updateChemicalTime;

  return (
    showModal && (
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="fixed inset-0 bg-black opacity-50"></div>

        <div className="bg-white p-6 rounded-lg max-w-md w-full relative">
          <h2 className="text-xl font-bold mb-4">{`Add Quantity for ${chemical?.name} (${chemical?.formula})`}</h2>

          <NumberComp
            title="Quantity to Add"
            fieldId="quantityToAdd"
            error={chemicalModel?.updateChemicalError?.quantity}
            onChangeValue={(val) =>
              (chemicalModel.updateChemicalQuantity = val)
            }
            value={quantity}
          />
          <DateComp
            selectedDate={selectedDate}
            selectedTime={selectedTime}
            setSelectedDate={(val) => (chemicalModel.updateChemicalDate = val)}
            setSelectedTime={(val) => (chemicalModel.updateChemicalTime = val)}
          />

          <div className="flex justify-center">
            <button
              className="bg-gray-300 text-gray-700 hover:bg-gray-400 py-2 px-6 rounded mr-2"
              onClick={onClose}
            >
              Cancel
            </button>
            <SaveButton
              text="Save"
              loading={chemicalModel.updateChemicalLoading}
              onClick={() => compStore?.onUpdateChemical(UpdateActions.ADD)}
            />
          </div>
        </div>
      </div>
    )
  );
};

export const AddQuantityModal = observer(AddQuantityModalComp);
