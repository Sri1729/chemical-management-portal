import React, { useState } from "react";
import { DateComp, InputComp, NumberComp, SaveButton } from "..";
import { useStore } from "@/store";
import { observer } from "mobx-react-lite";

interface Props {
  isFromStorePage: boolean;
}
const AddChemicalModalComp = ({ isFromStorePage }: Props) => {
  const store = useStore();
  const chemicalStore = store?.chemicals;
  const chemicalModel = chemicalStore?.chemicalModel;
  const name = chemicalModel?.newChemicalName;
  const formula = chemicalModel?.newChemicalFormula;
  const initialQuantity = chemicalModel?.newChemicalQuantity;
  const selectedDate = chemicalModel?.newChemicalDate;
  const selectedTime = chemicalModel?.newChemicalTime;
  const errors = chemicalModel?.newChemicalError;

  const showModal = chemicalModel?.newChemicalModalOpen;
  const onClose = () => (chemicalModel.newChemicalModalOpen = false);

  return (
    showModal && (
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="fixed inset-0 bg-black opacity-50"></div>

        <div className="bg-white p-6 rounded-lg max-w-md w-full relative">
          <h2 className="text-xl font-bold mb-4">Add New Chemical</h2>
          <InputComp
            title="Name"
            error={errors.name}
            onChangeValue={(val) => (chemicalModel.newChemicalName = val)}
            value={name}
            fieldId="name"
          />

          <InputComp
            title="Formula"
            error={errors?.formula}
            value={formula}
            onChangeValue={(val) => (chemicalModel.newChemicalFormula = val)}
            fieldId="formula"
          />

          <DateComp
            selectedDate={selectedDate}
            selectedTime={selectedTime}
            setSelectedDate={(val) => (chemicalModel.newChemicalDate = val)}
            setSelectedTime={(val) => (chemicalModel.newChemicalTime = val)}
          />
          <NumberComp
            error={errors?.quantity}
            title="Initial Quantity"
            fieldId="quantity"
            onChangeValue={(val) => (chemicalModel.newChemicalQuantity = val)}
            value={initialQuantity}
          />

          <div className="flex justify-center">
            <button
              className="bg-gray-300 text-gray-700 hover:bg-gray-400 py-2 px-6 rounded mr-2"
              onClick={onClose}
            >
              Cancel
            </button>
            <SaveButton
              onClick={() => {
                chemicalStore?.onAddNewChemical();
              }}
              loading={chemicalModel.newChemicalAddLoading}
            />
          </div>
        </div>
      </div>
    )
  );
};

export const AddChemicalModal = observer(AddChemicalModalComp);
