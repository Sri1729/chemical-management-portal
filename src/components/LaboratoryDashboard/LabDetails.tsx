import React from "react";
import { ChemicalTable } from "../Common/ChemicalTable";
import { observer } from "mobx-react-lite";
import { useStore } from "@/store";

const LabDetailsComp = ({ labId }: { labId: string }) => {
  // Sample lab details (replace with your data fetching logic)
  const store = useStore();
  const labDetails = store.individualLab.currentLabDetails;

  const labDetailItems = [
    { label: "Lab ID", value: labDetails?.id },
    { label: "Lab Name", value: labDetails?.name },
    { label: "Created By", value: labDetails?.createdBy },
    { label: "Created At", value: labDetails?.createdAt },
  ];

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Lab Dashboard</h2>
      <div className="bg-white p-6 rounded-lg shadow grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-2">
        {labDetailItems.map((item, index) => (
          <div key={index} className="flex flex-col mb-2">
            <div className="font-bold">{item.label}:</div>
            <div>{item.value}</div>
          </div>
        ))}
      </div>

      <ChemicalTable from="SINGLE" />
    </div>
  );
};

export const LabDetails = observer(LabDetailsComp);
