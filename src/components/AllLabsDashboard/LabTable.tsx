import Link from "next/link";
import React from "react";
import { Eye } from "react-feather";
export const LabTable = () => {
  const labs = [
    { id: 1, name: "Lab 1", createdBy: "Admin", createdAt: "2023-10-15 14:30" },
    {
      id: 2,
      name: "Lab 2",
      createdBy: "Superuser",
      createdAt: "2023-10-16 10:45",
    },
    // Add more labs as needed
  ];

  return (
    <table className="w-full bg-white border border-gray-300">
      <thead>
        <tr>
          <th className="py-2 px-4">Lab ID</th>
          <th className="py-2 px-4">Lab Name</th>
          <th className="py-2 px-4">Created By</th>
          <th className="py-2 px-4">Created At</th>
          <th className="py-2 px-4">Actions</th>
        </tr>
      </thead>
      <tbody>
        {labs.map((lab, index) => (
          <tr key={index} className={index % 2 === 0 ? "bg-gray-100" : ""}>
            <td className="py-2 px-4 text-center">{lab.id}</td>
            <td className="py-2 px-4 text-center">{lab.name}</td>
            <td className="py-2 px-4 text-center">{lab.createdBy}</td>
            <td className="py-2 px-4 text-center">{lab.createdAt}</td>
            <td className="py-2 px-4 text-center items-center">
              <div className="text-blue-500 hover:text-blue-700 items-center">
                <button className="self-center">
                  <Link className="self-center" href={`/laboratory/${lab.id}`}>
                    <Eye />
                  </Link>
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
