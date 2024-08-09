"use client";

import dynamic from "next/dynamic";
import LoadingCreateUserPage from "@/app/auth/signup/loading";
const SignupForm = dynamic(() => import("@/app/auth/_components/SignupForm"), {
  ssr: false,
  loading: () => <LoadingCreateUserPage />,
});
const Signup = () => {
  return (
    <div>
      <SignupForm />
    </div>
  );
};

export default Signup;
