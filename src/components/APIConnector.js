import axios from "axios";
import localforage from "localforage";
import { setupCache } from "axios-cache-adapter";

// cache every hour
const cache = setupCache({
  maxAge: 60 * 60 * 1000,
  store: localforage,
  exclude: {
    query: false,
  },
});

const axiosInstance = axios.create({
  baseURL: "https://www.alphavantage.co/query",
  adapter: cache.adapter,
});

export const getDailyStockChart = (symbol) => {
  return axiosInstance.get("", {
    params: {
      function: "TIME_SERIES_DAILY",
      symbol,
      outputsize: "full",
      apikey: process.env.REACT_APP_ALPHA_VANTAGE_API_KEY,
    },
  });
};

export const getCompanyOverview = (symbol) => {
  return axiosInstance.get("", {
    params: {
      function: "OVERVIEW",
      symbol,
      apikey: process.env.REACT_APP_ALPHA_VANTAGE_API_KEY,
    },
  });
};
