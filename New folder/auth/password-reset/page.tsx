"use client";

import dynamic from "next/dynamic";

import LoadingPasswordResetPage from "@/app/auth/password-reset/loading";
const PasswordResetForm = dynamic(
  () => import("@/app/auth/_components/PasswordResetForm"),
  {
    ssr: false,
    loading: () => <LoadingPasswordResetPage />,
  },
);
const PasswordResetPage = () => {
  return (
    <>
      <PasswordResetForm />
    </>
  );
};

export default PasswordResetPage;
