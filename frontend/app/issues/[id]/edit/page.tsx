"use client";
import IssueForm from "@/app/issues/_components/IssueForm";
import useIssue from "@/app/hooks/issues/useIssue";
import LoadingEditIssuePage from "@/app/issues/[id]/edit/loading";

interface Props {
  params: { id: string };
}
const EditIssuePage = ({ params }: Props) => {
  const id = parseInt(params.id);
  const { data: issue, isPending } = useIssue(id);

  if (isPending) {
    return <LoadingEditIssuePage />;
  }

  return (
    <div>
      <title>{issue?.title}</title>
      <meta name="description" content={"Edit issue " + issue?.title} />
      <IssueForm issue={issue} />
    </div>
  );
};

export default EditIssuePage;
