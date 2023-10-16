import { useStore } from "@/store";
import { observer } from "mobx-react-lite";
import Link from "next/link";
import React from "react";
import { Eye } from "react-feather";
const LabTableComp = () => {
  const store = useStore();
  const labs = store?.laboratory?.labModel?.allLabs;

  return (
    <table className="w-full bg-white border border-gray-300">
      <thead>
        <tr>
          <th className="py-2 px-4">Lab ID</th>
          <th className="py-2 px-4">Lab Name</th>
          <th className="py-2 px-4">Room Number</th>
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
            <td className="py-2 px-4 text-center">{lab.roomNumber}</td>
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

export const LabTable = observer(LabTableComp);
