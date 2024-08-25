"use client";
import { useSearchParams } from "next/navigation";
import useSocialAuth from "@/app/hooks/auth/useSocialAuth";
import Spinner from "@/app/components/Spinner";

const GoogleAuthPage = () => {
  const searchParams = useSearchParams();
  const state = searchParams.get("state");
  const code = searchParams.get("code");

  const { isPending } = useSocialAuth({ provider: "google", state, code });

  return (
    <div className="flex justify-center items-center h-lvh m-0 p-0">
      {isPending && <Spinner height="h-10" width="w-10" />}
    </div>
  );
};

export default GoogleAuthPage;
