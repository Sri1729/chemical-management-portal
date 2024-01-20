import { LabDashboard } from "@/components/LaboratoryDashboard";
import React from "react";

interface PageProps {
  params: {
    slug: string;
  };
}

const Page: React.FC<PageProps> = ({ params }) => {
  const slug = params?.slug;
  return (
    <div>
      <LabDashboard id={slug} />
    </div>
  );
};
export default Page;
