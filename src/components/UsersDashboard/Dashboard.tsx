import React from "react";
import { Trash2, UserCheck, UserX } from "react-feather";
import { AddUserComponent } from "./AddUserModal";
import { ConfirmationModal } from "./DeleteUserModal";
import { useStore } from "@/store";
import { observer } from "mobx-react-lite";

const DashboardComp = () => {
  const store = useStore();
  const users = store.user.users;
  return (
    <div className="p-4">
      <div className="flex justify-between mb-4">
        <h2 className="text-2xl font-bold">User Dashboard</h2>
        <button
          className="bg-blue-500 text-white hover:bg-blue-600 py-2 px-6 rounded"
          onClick={() => (store.user.showAddUserModal = true)}
        >
          Add User
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Email ID</th>
              <th className="py-2 px-4 border-b">Created By</th>
              <th className="py-2 px-4 border-b">IsSuperUser</th>
              <th className="py-2 px-4 border-b">Created At</th>
              <th className="py-2 px-4 border-b">Access to Lab</th>
              {/* <th className="py-2 px-4 border-b">Actions</th> */}
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr
                key={user.id}
                className={index % 2 === 0 ? "bg-gray-100" : ""}
              >
                <td className="py-2 px-4 border-b text-center">{user.email}</td>
                <td className="py-2 px-4 border-b text-center">
                  {user.createdBy ?? "-"}
                </td>
                <td
                  className={`py-2 px-4 border-b text-center ${
                    user.isSuperUser ? "text-green-500" : "text-red-500"
                  }`}
                >
                  <button className="cursor-auto">
                    {user.isSuperUser ? <UserCheck /> : <UserX />}
                  </button>
                </td>
                <td className="py-2 px-4 border-b text-center">
                  {user.createdAt}
                </td>
                <td className="py-2 px-4 border-b text-center">
                  {user.isSuperUser ? "*" : user?.labAccess}
                </td>
                {/* <td className="py-2 px-4 border-b text-center text-red-600">
                  <button
                    onClick={() => {
                      store.user.selectedUser = user;
                      store.user.showDeleteUserModal = true;
                    }}
                  >
                    <Trash2 />
                  </button>
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add User Modal */}
      <AddUserComponent />

      {/* Confirmation modal */}
      <ConfirmationModal />
    </div>
  );
};

export const Dashboard = observer(DashboardComp);
