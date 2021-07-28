import axios from "axios";
import localforage from "localforage";
import { setupCache } from "axios-cache-adapter";
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

const axiosInstanceForLatestStockPrice = axios.create({
  baseURL: "https://cloud.iexapis.com/stable",
});

export const sendLatestStockPriceRequest = (symbol) => {
  return axiosInstanceForLatestStockPrice.get(
    `/stock/${symbol}/quote/latestPrice`,
    {
      params: {
        token: "pk_ba36c35bc6af438a96eec030457a7189",
      },
    }
  );
};

const cache = setupCache({
  maxAge: 60 * 60 * 1000,
  store: localforage,
  exclude: {
    query: false,
  },
});

const axiosStockInstance = axios.create({
  baseURL: "https://www.alphavantage.co/query",
  adapter: cache.adapter,
});

export const sendDailyStockRequest = (symbol) => {
  return axiosStockInstance.get("", {
    params: {
      function: "TIME_SERIES_DAILY",
      symbol: symbol,
      outputsize: "full",
      apikey: process.env.REACT_APP_ALPHA_VANTAGE_API_KEY,
    },
  });
};

export const sendIntradayStockRequest = (symbol, interval) => {
  return axiosStockInstance.get("", {
    params: {
      function: "TIME_SERIES_INTRADAY",
      symbol: symbol,
      interval: interval,
      outputsize: "full",
      apikey: process.env.REACT_APP_ALPHA_VANTAGE_API_KEY,
    },
  });
};

export const sendCompanyRequest = (symbol) => {
  return axiosStockInstance.get("", {
    params: {
      function: "OVERVIEW",
      symbol: symbol,
      apikey: process.env.REACT_APP_ALPHA_VANTAGE_API_KEY,
    },
  });
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
