import axios, { AxiosRequestConfig } from "axios";

export interface FetchResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}
// Create an instance of axios with a base URL and credentials configuration.
const axiosInstance = axios.create({
  baseURL: "http://localhost:8000/api", // Base URL for all requests made with this instance.
  // withCredentials: true, // Include credentials (like cookies) in cross-site requests.
});

// Define a generic API client class for making HTTP requests.
class ApiClient<T> {
  endpoint: string; // Property to store the endpoint for this client.

  // Constructor to initialize the endpoint property.
  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  // Method to fetch all resources from the specified endpoint.
  getAll = async (config: AxiosRequestConfig = {}) => {
    const res = await axiosInstance.get<FetchResponse<T>>(
      this.endpoint,
      config,
    );
    return res.data;
  };

  getOne = async (id: number) => {
    const res = await axiosInstance.get<T>(this.endpoint + "/" + id + "/");
    return res.data;
  };

  post = async (data: T) => {
    const res = await axiosInstance.post<T>(this.endpoint, data);
    return res.data;
  };

  update = async (id: number, data: T) => {
    const res = await axiosInstance.patch<T>(
      this.endpoint + "/" + id + "/",
      data,
    );
    return res.data;
  };

  delete = async (id: number) => {
    const res = await axiosInstance.delete<T>(this.endpoint + "/" + id + "/");
    return res.data;
  };
}

export default ApiClient;
