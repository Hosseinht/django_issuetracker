import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:8000/auth",
});

class AuthClient<T> {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  post = async (data: T) => {
    const res = await axiosInstance.post<T>(this.endpoint, data);
    return res.data;
  };
  activate = async (uid: string, token: string) => {
    const res = await axiosInstance.post<T>(
      this.endpoint + "/" + uid + "/" + token + "/",
    );
    return res.data;
  };
}

export default AuthClient;
