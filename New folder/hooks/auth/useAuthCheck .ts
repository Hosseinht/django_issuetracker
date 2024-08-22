import { NextApiRequest, NextApiResponse } from "next";

import AuthClient from "@/app/services/auth-client";
import { UserEmail } from "@/app/entities/User";

const authClient = new AuthClient<UserEmail>("/check/");

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const token = req.cookies["access_token"];

  if (token) {
    try {
      const response = await authClient.get();
      if (response.status === 200 && response.isAuthenticated) {
        return res
          .status(200)
          .json({ isAuthenticated: true, user: response.user });
      }
    } catch (error) {
      console.error("Error verifying token:", error);
    }
  }

  return res.status(401).json({ isAuthenticated: false, user: null });
}

// import { useEffect } from "react";
// import useAuthStore from "@/app/store";
// import AuthClient from "@/app/services/auth-client";
// import { UserEmail } from "@/app/entities/User";
//
// const authClient = new AuthClient<UserEmail>("/check/");
//
// const useAuthCheck = () => {
//   const { login, logout, setLoading } = useAuthStore();
//
//   useEffect(() => {
//     setLoading(true);
//     (async () => {
//       try {
//         const response = await authClient.get();
//
//         if (response.isAuthenticated) {
//           login(response.user);
//         } else {
//           logout();
//         }
//       } catch (error) {
//         console.error("Error checking authentication:", error);
//         logout();
//       } finally {
//         setLoading(false);
//       }
//     })();
//   }, [login, logout]);
// };
// export default useAuthCheck;
