import React, { useState, useEffect } from "react";
import ListItem from "@material-ui/core/ListItem";
import Typography from "@material-ui/core/Typography";
import { getCompanyOverview } from "./APIConnector";
import "../styles/Watchlist.css";

// TODO: Remove styling with CSS
export default function Watchlist({ company, onClick }) {
  const [companyData, setCompanyData] = useState([]);

  useEffect(() => {
    const fetchCompanyData = async () => {
      const result = await getCompanyOverview(company);
      setCompanyData(result.data);
    };
    fetchCompanyData();
  }, [company]);

  const handleChange = () => {
    onClick(company);
  };

  return (
    <ListItem button onClick={handleChange}>
      <Typography variant="h3">{companyData["Symbol"]}</Typography>
      <Typography variant="h3" color="secondary">
        ${companyData["AnalystTargetPrice"]}
      </Typography>
    </ListItem>
  );
}
