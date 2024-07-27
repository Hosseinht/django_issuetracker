// "use client";

import dynamic from "next/dynamic";
import LoadingNewIssuePage from "@/app/issues/new/loading";

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
