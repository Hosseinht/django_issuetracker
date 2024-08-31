import axios, { AxiosRequestConfig } from "axios";
import { FetchResponse } from "@/app/services/apiClient";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8000/auth",
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

  oauth = (config: { params: T }) => {
    return axiosInstance.post(this.endpoint, null, {
      params: config.params,
      withCredentials: true,
    });
  };

  get = async () => {
    const res = await axiosInstance.get<T>(this.endpoint, {
      withCredentials: true,
    });
    return res.data;
  };

  getAll = async (config: AxiosRequestConfig = {}) => {
    const res = await axiosInstance.get<FetchResponse<T>>(
      this.endpoint,
      config,
    );
    return res.data;
  };
}

export default AuthClient;
