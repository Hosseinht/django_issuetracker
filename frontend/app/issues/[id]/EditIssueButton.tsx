import React from "react";
import { Pencil2Icon } from "@radix-ui/react-icons";
import Link from "next/link";
import { Button } from "@radix-ui/themes";

const EditIssueButton = ({ issueId }: { issueId: number }) => {
  return (
    <div>
      <Button>
        <Pencil2Icon />
        <Link href={`/issues/${issueId}/edit`}>Edit Issue</Link>
      </Button>
    </div>
  );
};

export default EditIssueButton;
