import axios from "axios";
import { toast } from "react-toastify";

export default async function initiateSocialAuth(
  provider: string,
  redirect: string,
) {
  try {
    const url = `${process.env.NEXT_PUBLIC_HOST}/auth/o/${provider}/?redirect_uri=${process.env.NEXT_PUBLIC_REDIRECT_URL}/auth/${redirect}`;

    const res = await axios.get(url, {
      headers: {
        Accept: "application/json",
      },
      withCredentials: true,
    });

    const data = res.data;

    if (res.status === 200 && typeof window !== "undefined") {
      window.location.replace(data.authorization_url);
    } else {
      toast.error("Something went wrong");
    }
  } catch (err) {
    toast.error("Something went wrong");
  }
}

// Google OAuth Authentication Flow
// 1. User Initiates Login:
//     The user clicks the Google login button in the LoginForm component.
//     This calls useGoogle(), which internally uses initiateSocialAuth to start the OAuth process with Google.
//
// 2. OAuth Process Begins:
//     initiateSocialAuth constructs a URL to the backend (Django) for OAuth with Google.
//     The browser is redirected to Google for user consent.
//
// 3. User Consents and Redirects Back:
//     After Google authentication, the user is redirected back to your frontend at /auth/google with state and code parameters.
//
// 4. Frontend Handles Redirect:
//     GoogleAuthPage captures these parameters and uses useSocialAuth hook.
//     useSocialAuth identifies the provider (Google) and calls useGoogleAuth.
//
// 5. Final Authentication:
//     useGoogleAuth:
//          Sends the state and code to your backend using AuthClient.
//          If successful, it logs in the user, fetches user details, and redirects to /issues.
//          If failed, it shows an error and redirects to the login page.
