import React from "react";
import { Checkbox, Dropdown, InputComp, SaveButton } from "../Common";
import { useStore } from "@/store";
import { observer } from "mobx-react-lite";

const labs = ["Lab 1", "Lab 2", "Lab 3"]; // Replace with your available labs

const AddUserComponentComp = () => {
  const store = useStore();
  const userStore = store?.user;
  const showModal = userStore?.showAddUserModal;
  const email = userStore?.addUserEmail;
  const password = userStore?.addUserPassword;
  const error = userStore?.addUserErrors;
  const onClose = () => (userStore.showAddUserModal = false);
  const labs = store.laboratory.labModel.labsForSelect;
  return (
    showModal && (
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="fixed inset-0 bg-black opacity-50"></div>

        <div className="bg-white p-6 rounded-lg max-w-md w-full relative">
          <h2 className="text-xl font-bold mb-4">Add User</h2>
          <InputComp
            title={"Email"}
            value={email}
            error={error?.email}
            fieldId={"email"}
            onChangeValue={(val) => (userStore.addUserEmail = val)}
          />
          <InputComp
            title={"Password"}
            value={password}
            error={error?.password}
            fieldId={"password"}
            onChangeValue={(val) => (userStore.addUserPassword = val)}
            isPasswordField
          />

          <div className="mb-4">
            <Checkbox
              val={userStore?.isUserAddSuperUser}
              setValue={(val) => (userStore.isUserAddSuperUser = val)}
              fieldId="superUserCheckbox"
              title="Create as Super User"
            />
          </div>

          {!userStore?.isUserAddSuperUser && (
            <Dropdown
              error={error?.lab}
              fieldId="lab"
              onChangeValue={(val) => (userStore.addUserAccessLab = val)}
              title="Access to Lab"
              value={userStore.addUserAccessLab}
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
              loading={userStore?.addUserLoading}
              onClick={() => userStore.onAddUser()}
              text="Create"
            />
          </div>
        </div>
      </div>
    )
  );
};

export const AddUserComponent = observer(AddUserComponentComp);
