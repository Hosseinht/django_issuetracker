import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:8000/auth",
  withCredentials: true,
});

class AuthClient<T> {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  post = async (data?: T) => {
    const res = await axiosInstance.post<T>(this.endpoint, data, {
      withCredentials: true,
    });
    return res.data;
  };
  get = async () => {
    const res = await axiosInstance.get(this.endpoint, {
      withCredentials: true,
    });
    return res.data;
  };
}

export default AuthClient;
