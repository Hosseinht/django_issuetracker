"use client";
import { Button, Flex } from "@radix-ui/themes";
import Link from "next/link";
import useAuthStore from "@/app/store";
import IssueStatusFilter from "@/app/issues/IssueStatusFilter";
import IssueSearch from "@/app/issues/IssueSearch";

const IssueActions = () => {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  if (isAuthenticated) {
    return (
      <Flex justify="between">
        <Flex gap="2">
          <IssueSearch />
          <IssueStatusFilter />
        </Flex>
        <Button>
          <Link href="/issues/new">New Issue</Link>
        </Button>
      </Flex>
    );
  }
};

export default IssueActions;
