import React, { useState } from "react";
import { DateComp, InputComp, NumberComp, SaveButton } from "..";
import { useStore } from "@/store";
import { observer } from "mobx-react-lite";

const AddChemicalModalComp = () => {
  const store = useStore();
  const chemicalStore = store?.chemicals;
  const name = chemicalStore?.newChemicalName;
  const formula = chemicalStore?.newChemicalFormula;
  const initialQuantity = chemicalStore?.newChemicalQuantity;
  const selectedDate = chemicalStore?.newChemicalDate;
  const selectedTime = chemicalStore?.newChemicalTime;
  const errors = chemicalStore?.newChemicalError;

  const showModal = chemicalStore?.newChemicalModalOpen;
  const onClose = () => (chemicalStore.newChemicalModalOpen = false);

  return (
    showModal && (
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="fixed inset-0 bg-black opacity-50"></div>

        <div className="bg-white p-6 rounded-lg max-w-md w-full relative">
          <h2 className="text-xl font-bold mb-4">Add New Chemical</h2>
          <InputComp
            title="Name"
            error={errors.name}
            onChangeValue={(val) => (chemicalStore.newChemicalName = val)}
            value={name}
            fieldId="name"
          />

          <InputComp
            title="Formula"
            error={errors?.formula}
            value={formula}
            onChangeValue={(val) => (chemicalStore.newChemicalFormula = val)}
            fieldId="formula"
          />

          <DateComp
            selectedDate={selectedDate}
            selectedTime={selectedTime}
            setSelectedDate={(val) => (chemicalStore.newChemicalDate = val)}
            setSelectedTime={(val) => (chemicalStore.newChemicalTime = val)}
          />
          <NumberComp
            error={errors?.quantity}
            title="Initial Quantity"
            fieldId="quantity"
            onChangeValue={(val) => (chemicalStore.newChemicalQuantity = val)}
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
              loading={chemicalStore.newChemicalAddLoading}
            />
          </div>
        </div>
      </div>
    )
  );
};

export const AddChemicalModal = observer(AddChemicalModalComp);
