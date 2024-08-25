"use client";

import dynamic from "next/dynamic";
import LoadingSignupPage from "@/app/auth/signup/loading";
const SignupForm = dynamic(() => import("@/app/auth/_components/SignupForm"), {
  ssr: false,
  loading: () => <LoadingSignupPage />,
});
const SignupPage = () => {
  return (
    <div>
      <SignupForm />
    </div>
  );
};

export default SignupPage;
