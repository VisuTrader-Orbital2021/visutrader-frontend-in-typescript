import React, { useState, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
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

const getCompanyOverview = (symbol) => {
  return axiosInstance.get("", {
    params: {
      function: "OVERVIEW",
      symbol,
      apikey: "Z3LIIQZIE0HPQWAQ",
    },
  });
};

export const CompanyOverview = () => {
  const [companyData, setCompanyData] = useState([]);

  useEffect(() => {
    const fetchCompanyData = async () => {
      const result = await getCompanyOverview("TSLA");
      setCompanyData(result.data);
      console.log(result.data); // to be removed
    };

    fetchCompanyData();
  }, []);

  return (
    <div>
      <Typography variant="h2" color="primary">
        {companyData["Symbol"]}
      </Typography>
      <Typography variant="h3">{companyData["Name"]}</Typography>
      <span>{companyData["Industry"]}</span>
      <Typography variant="h4">${companyData["AnalystTargetPrice"]}</Typography>
    </div>
  );
};
