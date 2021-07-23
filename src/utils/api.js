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

const corsProxyUrl = "https://cors.bridged.cc/";

const axiosNewsHeadlineInstance = axios.create({
  baseURL: `${corsProxyUrl}https://newsapi.org/v2/top-headlines`,
});

export const sendNewsHeadlineRequest = () => {
  return axiosNewsHeadlineInstance.get("", {
    params: {
      country: "sg",
      category: "business",
      pageSize: 6,
      apiKey: process.env.REACT_APP_NEWS_API_KEY,
    },
  });
};

const axiosNewsSearchInstance = axios.create({
  baseUrl: `${corsProxyUrl}https://newsapi.org/v2/everything`,
});

export const sendNewsSearchRequest = (query) => {
  return axiosNewsSearchInstance.get("", {
    params: {
      q: query,
      language: "en",
      sortBy: "relevancy",
      pageSize: 4,
      apiKey: process.env.REACT_APP_NEWS_API_KEY,
    },
  });
};
