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

const axiosNewsInstance = axios.create({
  baseURL:
    "https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/search/NewsSearchAPI",
  headers: {
    "x-rapidapi-key": "f25f84ae50msh67f1e24b6ae1bb8p1f5db7jsnbc2b827d78f7",
    "x-rapidapi-host": "contextualwebsearch-websearch-v1.p.rapidapi.com",
  },
});

export const sendNewsHeadlineRequest = () => {
  return axiosNewsInstance.get("", {
    params: {
      q: "stock market",
      pageNumber: "1",
      pageSize: "6",
      autoCorrect: "false",
      safeSearch: "true",
      withThumbnails: "true",
      fromPublishedDate: "null",
      toPublishedDate: "null",
    },
  });
};

export const sendNewsSearchRequest = (query) => {
  return axiosNewsInstance.get("", {
    params: {
      q: query,
      pageNumber: "1",
      pageSize: "4",
      autoCorrect: "true",
      safeSearch: "true",
      withThumbnails: "true",
      fromPublishedDate: "null",
      toPublishedDate: "null",
    },
  });
};
