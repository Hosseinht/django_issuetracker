import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Issue Tracker - Signup",
  description: "Create an Account",
};

const SignupLayout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default SignupLayout;
