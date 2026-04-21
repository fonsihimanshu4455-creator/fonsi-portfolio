import CaseStudyEditor from "@/components/admin/CaseStudyEditor";

export default async function EditCaseStudyPage({ params }) {
  const { id } = await params;
  return <CaseStudyEditor caseId={id} />;
}
