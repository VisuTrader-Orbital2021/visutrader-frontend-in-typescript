import React, { useState, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import { getCompanyOverview } from "./APIConnector";
import "../styles/CompanyOverview.css";

export default function CompanyOverview() {
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
    <div className="overview">
      <Typography className="symbol" variant="h2" color="primary">
        {companyData["Symbol"]}
      </Typography>
      <Typography className="name" variant="h3">{companyData["Name"]}</Typography>
      <Typography className="industry" variant="body2">{companyData["Industry"]}</Typography>
      <Typography className="analyst-target-price" variant="h1">${companyData["AnalystTargetPrice"]}</Typography>
    </div>
  );
};
