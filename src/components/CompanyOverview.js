import React, { useState, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import { getCompanyOverview } from "./APIConnector";
import "../styles/CompanyOverview.css";

// TODO: Remove styling with CSS
export default function CompanyOverview({ company }) {
  const [companyData, setCompanyData] = useState([]);

  useEffect(() => {
    const fetchCompanyData = async () => {
      const result = await getCompanyOverview(company);
      setCompanyData(result.data);
    };

    fetchCompanyData();
  }, []);

  return (
    <div className="overview">
      <Typography className="overview-symbol" variant="h2" color="primary">
        {companyData["Symbol"]}
      </Typography>
      <Typography className="overview-name" variant="h3">
        {companyData["Name"]}
      </Typography>
      <Typography className="overview-industry" variant="body2">
        {companyData["Industry"]}
      </Typography>
      <Typography className="overview-analyst-target-price" variant="h1">
        ${companyData["AnalystTargetPrice"]}
      </Typography>
    </div>
  );
}
