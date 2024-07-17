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
  getAll = () => {
    // Make a GET request to the endpoint, optionally with additional config.
    return axiosInstance.get<T>(this.endpoint).then((res) => res.data);
    // Return the data from the response.
  };
}

export default APIClient;
