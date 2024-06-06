import { LabDashboard } from "@/components/LaboratoryDashboard";
import { getAllLaboratory } from "@/services";
import { GetStaticPaths, GetStaticProps } from "next";

export const getStaticPaths: GetStaticPaths = async () => {
  const lab = await getAllLaboratory();
  const paths = lab.map((item) => ({ params: { slug: item.id } }));
  return { paths, fallback: "blocking" };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  return {
    props: {
      params,
    },
  };
};

const LabPage = ({ params }: { params: { slug: string } }) => {
  return (
    <div>
      <LabDashboard id={params?.slug} />
    </div>
  );
};

export default LabPage;
