import React, { useState } from "react";
import { DateComp, InputComp, SaveButton } from "../Common";
import { useStore } from "@/store";
import { observer } from "mobx-react-lite";

const AddNewLabModalComp = () => {
  const store = useStore();
  const labStore = store?.laboratory;
  const labModel = labStore?.labModel;
  const showModal = labModel?.showAddLabModal;
  const onClose = () => (labModel.showAddLabModal = false);

  const labId = labModel?.labId;
  const labName = labModel?.labName;
  const roomNumber = labModel?.labRoomNumber;
  const selectedDate = labModel?.labCreateDate;
  const selectedTime = labModel?.labCreationTime;
  const errors = labModel.labCreationErrors;

  return (
    showModal && (
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="fixed inset-0 bg-black opacity-50"></div>

        <div className="bg-white p-6 rounded-lg max-w-md w-full relative">
          <h2 className="text-xl font-bold mb-4">Add New Lab</h2>
          <InputComp
            title="Lab ID"
            error={errors.id}
            value={labId}
            onChangeValue={(val) => (labModel.labId = val)}
            fieldId="labIdInput"
          />

          <InputComp
            title="Name"
            error={errors.name}
            value={labName}
            onChangeValue={(val) => (labModel.labName = val)}
            fieldId="labName"
          />

          <InputComp
            title="Room Number"
            error={errors.roomNumber}
            value={roomNumber}
            onChangeValue={(val) => (labModel.labRoomNumber = val)}
            fieldId="roomNumber"
          />

          <DateComp
            selectedDate={selectedDate}
            selectedTime={selectedTime}
            setSelectedDate={(val) => (labModel.labCreateDate = val)}
            setSelectedTime={(val) => (labModel.labCreationTime = val)}
          />

          <div className="flex justify-center">
            <button
              className="bg-gray-300 text-gray-700 hover:bg-gray-400 py-2 px-6 rounded mr-2"
              onClick={onClose}
            >
              Cancel
            </button>
            <SaveButton
              onClick={() => labStore.onAddLab()}
              loading={labModel.labCreateLoading}
            />
          </div>
        </div>
      </div>
    )
  );
};

export const AddNewLabModal = observer(AddNewLabModalComp);
