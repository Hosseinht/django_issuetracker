"use client";
import IssueForm from "@/app/issues/_components/IssueForm";
import useIssue from "@/app/hooks/issues/useIssue";

interface Props {
  params: { id: string };
}
const EditIssuePage = ({ params }: Props) => {
  const id = parseInt(params.id);
  const { data: issue } = useIssue(id);

  return (
    <div>
      <IssueForm issue={issue} />
    </div>
  );
};

export default EditIssuePage;
