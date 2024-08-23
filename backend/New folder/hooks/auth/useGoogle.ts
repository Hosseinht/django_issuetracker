import axios from "axios";
import { toast } from "react-toastify";

const useGoogle = async () => {
  try {
    const url =
      "http://127.0.0.1:8000/auth/o/google-oauth2/?redirect_uri=http://127.0.0.1:3000/auth/google";

    const res = await axios.get(url, {
      headers: {
        Accept: "application/json",
      },
      withCredentials: true,
    });

    const data = res.data;
    console.log("data", data);

    if (res.status === 200 && typeof window !== "undefined") {
      console.log("url", data.authorization_url);
      window.location.replace(data.authorization_url);
    } else {
      toast.error("Something went wrong");
    }
  } catch (err) {
    toast.error("Something went wrong");
  }
};

export default useGoogle;

// const useGoogle = async () => {
//   try {
//     const url =
//       "http://127.0.0.1:8000/auth/o/google-oauth2/?redirect_uri=http://127.0.0.1:3000/auth/google";
//
//     const res = await axios.get(url, {
//       headers: {
//         Accept: "application/json",
//       },
//       withCredentials: true,
//     });
//
//     const data = res.data;
//     console.log("data", data);
//
//     if (res.status === 200 && typeof window !== "undefined") {
//       console.log("url", data.authorization_url);
//       window.location.replace(data.authorization_url);
//     } else {
//       toast.error("Something went wrong");
//     }
//   } catch (err) {
//     toast.error(err?.message);
//   }
// };
//
// export default useGoogle;
// export default async function useGoogle() {
//   try {
//     const url =
//       "http://127.0.0.1:8000/auth/o/google-oauth2/?redirect_uri=http://127.0.0.1:3000/auth/google";
//
//     const res = await fetch(url, {
//       method: "GET",
//       headers: {
//         Accept: "application/json",
//       },
//       credentials: "include",
//     });
//     const data = await res.json();
//     console.log("data", data);
//
//     if (res.status === 200 && typeof window !== "undefined") {
//       // window.location.replace(data.authorization_url);
//       console.log("url", data.authorization_url);
//     } else {
//       toast.error("Something went wrong");
//     }
//   } catch (err) {
//     toast.error("Something went wrong");
//   }
// }

// const useGoogle = () => {
//   const { data, isLoading } = useQuery({
//     queryKey: ["url"],
//     queryFn: () => {
//       try {
//         const data = authClient.get();
//         console.log("data", data);
//       } catch (e) {
//         console.log("error", e);
//       }
//     },
//     staleTime: 60 * 1000,
//     retry: 3,
//   });
//
//   return {
//     data,
//   };
// };
