import IssuesPageClient from "@/app/issues/page.client";
import { IssueQuery } from "@/app/issues/IssueTable";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Issue Tracker - Issue List",
  description: "List of Issues",
};

interface Props {
  searchParams: IssueQuery;
}
const IssuesPage = ({ searchParams }: Props) => {
  return <IssuesPageClient searchParams={searchParams} />;
};

export default IssuesPage;
