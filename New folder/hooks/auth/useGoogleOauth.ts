import React, { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const UseGoogleOauth = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const state = searchParams.get("state");
    const code = searchParams.get("code");
    if (state && code) {
    }
  }, []);
};

export default UseGoogleOauth;
