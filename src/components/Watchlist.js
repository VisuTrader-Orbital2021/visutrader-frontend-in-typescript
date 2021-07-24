import React from "react";
import { useSelector } from "react-redux";
import ListItem from "@material-ui/core/ListItem";
import Typography from "@material-ui/core/Typography";
import Skeleton from "@material-ui/lab/Skeleton";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  listItem: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
}));

// WORK IN PROGRESS
export default function Watchlist({ company, onClick }) {
  const classes = useStyles();

  const handleChange = () => {
    onClick(company);
  };

  const {
    dailyStockData: stockData,
    dailyStockLoading: loading,
    companyData,
  } = useSelector((state) => state.stock);

  if (!loading && stockData && companyData) {
    return (
      <ListItem button onClick={handleChange} className={classes.listItem}>
        <Typography variant="h3">{companyData["Symbol"]}</Typography>
        <div className={classes.listItem}>
          <Typography variant="h3" color="secondary">
            ${companyData["AnalystTargetPrice"]}
          </Typography>
          <Typography
            variant="h3"
            color="secondary"
            style={{ marginLeft: "40px" }}
          >
            2.44%
          </Typography>
        </div>
      </ListItem>
    );
  } else {
    return (
      <ListItem>
        <Skeleton variant="rect" />
      </ListItem>
    );
  }
}
