import axios from "axios";
import { BACKEND_URL } from "./constants";

const axiosInstance = axios.create({
  baseURL: BACKEND_URL,
});

/**
 * A function to help send request to backend.
 */
export const sendRequest = async (path, token, method, request) => {
  const headers = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers.Authorization = `Token ${token}`;
  }

  const config = { headers };

  switch (method) {
    case "get":
      return (await axiosInstance.get(path, config)).data;
    case "post":
      return (await axiosInstance.post(path, request, config)).data;
    case "put":
      return (await axiosInstance.put(path, request, config)).data;
    case "delete":
      return (await axiosInstance.delete(path, config)).data;
    default:
      return Promise.resolve();
  }
};
