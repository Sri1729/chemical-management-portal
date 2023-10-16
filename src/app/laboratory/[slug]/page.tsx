import { LabDashboard } from "@/components/LaboratoryDashboard";
import { getAllLaboratory } from "@/services";
import React from "react";

export async function generateStaticParams() {
  const lab = await getAllLaboratory();
  return lab.map((item) => ({ slug: item.id }));
}

const Page = ({ params }: { params: { slug: string } }) => {
  return (
    <div>
      <LabDashboard id={params?.slug} />
    </div>
  );
};
export default Page;
