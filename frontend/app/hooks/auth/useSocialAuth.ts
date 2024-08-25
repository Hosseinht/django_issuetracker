import { useEffect, useRef } from "react";
import useGoogleAuth from "@/app/hooks/auth/useGoogleAuth";

interface Props {
  provider: string;
  state: string | null;
  code: string | null;
}

type MutateMap = {
  [key: string]: (params: { state: string; code: string }) => void;
};

const useSocialAuth = ({ provider, state, code }: Props) => {
  const effectRan = useRef(false);
  const { mutate: googleAuth, isPending } = useGoogleAuth();

  const mutateMap: MutateMap = {
    google: googleAuth,
  };

  useEffect(() => {
    if (provider && state && code && !effectRan.current) {
      const mutate = mutateMap[provider];
      if (mutate) {
        mutate({ state, code });
      } else {
        console.error(
          `No authentication method defined for provider: ${provider}`,
        );
      }
    }
    effectRan.current = true;
  }, [provider, state, code]);

  return {
    isPending,
  };
};

export default useSocialAuth;
