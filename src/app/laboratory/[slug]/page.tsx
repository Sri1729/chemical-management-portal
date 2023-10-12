import { LabDashboard } from "@/components/LaboratoryDashboard";
import React from "react";

export async function generateStaticParams() {
  return [{ slug: "1" }];
}

const Page = ({ params }: { params: { slug: string } }) => {
  return (
    <div>
      <LabDashboard id={params?.slug} />
    </div>
  );
};
export default Page;
