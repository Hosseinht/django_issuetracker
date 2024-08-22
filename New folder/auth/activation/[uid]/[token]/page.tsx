"use client";
import useActivatingUser from "@/app/hooks/auth/useActivatingUser";
import { useEffect } from "react";
import ActivationError from "@/app/auth/_components/ActivationError";

interface Props {
  params: {
    uid: string;
    token: string;
  };
}
const UserActivationPage = ({ params }: Props) => {
  const { uid, token } = params;
  const { mutate, error, isPending, isSuccess } = useActivatingUser();

  useEffect(() => {
    mutate({ uid, token });
  }, []);

  return (
    <ActivationError
      error={error}
      isPending={isPending}
      isSuccess={isSuccess}
    />
  );
};

export default UserActivationPage;
