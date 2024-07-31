import axios from "axios";

// Create an instance of axios with a base URL and credentials configuration.
const axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:8000/api", // Base URL for all requests made with this instance.
  // withCredentials: true, // Include credentials (like cookies) in cross-site requests.
});

// Define a generic API client class for making HTTP requests.
class APIClient<T> {
  endpoint: string; // Property to store the endpoint for this client.

  // Constructor to initialize the endpoint property.
  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  // Method to fetch all resources from the specified endpoint.
  getAll = async () => {
    // Make a GET request to the endpoint, optionally with additional config.
    const res = await axiosInstance.get<T>(this.endpoint);
    return res.data;
    // Return the data from the response.
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
    const res = await axiosInstance.delete(this.endpoint + "/" + id + "/");
    return res.data;
  };
}

export default APIClient;
