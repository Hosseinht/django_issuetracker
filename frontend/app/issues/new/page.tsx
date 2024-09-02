import dynamic from "next/dynamic";
import LoadingNewIssuePage from "@/app/issues/new/loading";
import "easymde/dist/easymde.min.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Issue Tracker - New Issue",
  description: "Create a new Issue",
};

const IssueForm = dynamic(() => import("@/app/issues/_components/IssueForm"), {
  ssr: false,
  loading: () => <LoadingNewIssuePage />,
});
const NewIssuePage = () => {
  return (
    <div>
      <IssueForm />
    </div>
  );
};

export default NewIssuePage;
