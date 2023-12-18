import axios from "axios";

// Using axios.create to create an instance with custom config
const axiosInstance = axios.create({
  baseURL: "http://localhost:8000",
  headers: {"Content-Type": "application/json"},
  withCredentials: true,
});

const endpoint = "/api/auth/refresh";

const useRefreshToken = () => {
  const refresh = async () => {
    // Using the axios instance for the request
    await axiosInstance.post(endpoint);
  };

  return refresh;
};

export default useRefreshToken;
