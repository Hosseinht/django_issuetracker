"use client";
import { Button } from "@radix-ui/themes";
import Link from "next/link";
import useAuthStore from "@/app/store";

const IssueActions = () => {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  if (isAuthenticated) {
    return (
      <div className="mb-5">
        <Button>
          <Link href="/issues/new">New Issue</Link>
        </Button>
      </div>
    );
  }
};

export default IssueActions;
