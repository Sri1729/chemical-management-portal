import { LabDashboard } from "@/components/LaboratoryDashboard";
import React from "react";

const Page = ({ params }: { params: { slug: string } }) => {
  return (
    <div>
      <LabDashboard id={params?.slug} />
    </div>
  );
};
export default Page;
