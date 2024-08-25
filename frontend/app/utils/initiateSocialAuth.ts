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
