import React, { useState } from "react";
import { Trash2 } from "react-feather";
import { AddUserComponent } from "./AddUserModal";
import { ConfirmationModal } from "./DeleteUserModal";
const users = [
  {
    id: 1,
    email: "user1@example.com",
    createdBy: "Admin",
    createdAt: "2023-10-12",
    accessLab: "Lab 1",
  },
  {
    id: 2,
    email: "user2@example.com",
    createdBy: "Admin",
    createdAt: "2023-10-13",
    accessLab: "Lab 2",
  },
  // Add more users as needed
];

export const Dashboard = () => {
  const [showModal, setShowModal] = useState(false);
  const [showConfModal, setShowConfModal] = useState(false);
  const [user, setUser] = useState("");
  return (
    <div className="p-4">
      <div className="flex justify-between mb-4">
        <h2 className="text-2xl font-bold">User Dashboard</h2>
        <button
          className="bg-blue-500 text-white hover:bg-blue-600 py-2 px-6 rounded"
          onClick={() => setShowModal(true)}
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
              <th className="py-2 px-4 border-b">Created At</th>
              <th className="py-2 px-4 border-b">Access to Lab</th>
              <th className="py-2 px-4 border-b">Actions</th>
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
                  {user.createdBy}
                </td>
                <td className="py-2 px-4 border-b text-center">
                  {user.createdAt}
                </td>
                <td className="py-2 px-4 border-b text-center">
                  {user.accessLab}
                </td>
                <td className="py-2 px-4 border-b text-center text-red-600">
                  <button
                    onClick={() => {
                      setUser(user.email);
                      setShowConfModal(true);
                    }}
                  >
                    <Trash2 />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add User Modal */}
      <AddUserComponent
        onClose={() => setShowModal(false)}
        showModal={showModal}
      />

      {/* Confirmation modal */}
      <ConfirmationModal
        showModal={showConfModal}
        onClose={() => setShowConfModal(false)}
        user={user}
      />
    </div>
  );
};
