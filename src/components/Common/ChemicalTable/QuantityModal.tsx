import React, { useState } from "react";
import {
  DateComp,
  ManufacturingAndExpiryInput,
  NumberComp,
  SaveButton,
} from "..";
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
  const selectedMfgDate = chemicalModel?.updateChemicalMfgDate;
  const selectedExpDate = chemicalModel?.updateChemicalExpDate;
  const selectedShowExpDate = chemicalModel?.updateChemicalShowExpDate;
  const selectedCost = chemicalModel?.updateChemicalCost;

  return (
    showModal && (
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="fixed inset-0 bg-black opacity-50"></div>

        <div className="bg-white p-6 rounded-lg max-w-md w-full relative">
          <h2 className="text-xl font-bold mb-4">{`Add Quantity for ${chemical?.name}`}</h2>

          <NumberComp
            title="Quantity to Add"
            fieldId="quantityToAdd"
            error={chemicalModel?.updateChemicalError?.quantity}
            onChangeValue={(val) =>
              (chemicalModel.updateChemicalQuantity = val)
            }
            value={quantity}
            showDisabledQuantity={true}
            quantatiyFieldId="units"
            quantatiyTitle="Unit(s)"
            quantatiyValue={chemicalModel?.selectedChemical?.units || ""}
            quantatiyError=""
            onQuantatiyChangeValue={(val) => null}
          />
          <DateComp
            selectedDate={selectedDate}
            selectedTime={selectedTime}
            setSelectedDate={(val) => (chemicalModel.updateChemicalDate = val)}
            setSelectedTime={(val) => (chemicalModel.updateChemicalTime = val)}
            chemicalCost={selectedCost}
            setChemicalCost={(val) => (chemicalModel.updateChemicalCost = val)}
            chemicalCostError={chemicalModel?.updateChemicalError?.cost}
          />

          <ManufacturingAndExpiryInput
            manufacturingDate={selectedMfgDate}
            expiryDate={selectedExpDate}
            showExpiry={selectedShowExpDate}
            onManufacturingDateChange={(val) =>
              (chemicalModel.updateChemicalMfgDate = val)
            }
            onExpiryDateChange={(val) =>
              (chemicalModel.updateChemicalExpDate = val)
            }
            onShowExpiryChange={(val) =>
              (chemicalModel.updateChemicalShowExpDate = val)
            }
            manufacturingDateError={
              chemicalModel?.updateChemicalError?.manufactureDate
            }
            expiryDateError={chemicalModel?.updateChemicalError?.expiryDate}
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
