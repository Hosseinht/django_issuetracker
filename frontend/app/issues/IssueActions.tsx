"use client";
import { Button, Flex } from "@radix-ui/themes";
import Link from "next/link";
import useAuthStore from "@/app/store";
import IssueStatusFilter from "@/app/issues/IssueStatusFilter";

const IssueActions = () => {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  if (isAuthenticated) {
    return (
      <Flex justify="between">
        <IssueStatusFilter />
        <Button>
          <Link href="/issues/new">New Issue</Link>
        </Button>
      </Flex>
    );
  }
};

export default IssueActions;
