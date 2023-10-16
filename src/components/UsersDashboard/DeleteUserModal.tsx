import { useStore } from "@/store";
import React from "react";
import { SaveButton } from "../Common";
import { observer } from "mobx-react-lite";

const ConfirmationModalComp = () => {
  const store = useStore();
  const showModal = store?.user?.showDeleteUserModal;
  const selectedUser = store?.user?.selectedUser;
  4;
  const loading = store?.user?.deleteUserLoading;

  return (
    showModal && (
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="fixed inset-0 bg-black opacity-50"></div>

        <div className="bg-white p-6 rounded-lg max-w-md w-full relative">
          <p className="text-gray-700 mb-6">
            <i className="text-xl font-bold mb-4">{`${selectedUser?.email}`}</i>
            <br />
            <br />
            Are you sure you want to remove this user permanently?
          </p>
          <div className="flex justify-center">
            <button
              className="bg-gray-300 text-gray-700 hover:bg-gray-400 py-2 px-6 rounded mr-2"
              onClick={() => (store.user.showAddUserModal = false)}
            >
              Cancel
            </button>
            <SaveButton
              onClick={() => store.user.deleteUser()}
              loading={loading}
              text="Proceed"
            />
          </div>
        </div>
      </div>
    )
  );
};

export const ConfirmationModal = observer(ConfirmationModalComp);
