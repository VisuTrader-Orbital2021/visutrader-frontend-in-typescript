import React from "react";
import { useSelector } from "react-redux";
import { companySelector } from "../redux/slices/stock";
import ListItem from "@material-ui/core/ListItem";
import Typography from "@material-ui/core/Typography";
import Skeleton from "@material-ui/lab/Skeleton";
import { useTheme } from "@material-ui/core/styles";

export default function Watchlist({ classes, company, onClick }) {
  const theme = useTheme();

  const handleChange = () => {
    onClick(company);
  };

  const { companyDataListLoading: loading } = useSelector(
    (state) => state.stock
  );

  const companyData = useSelector((state) => companySelector(state, company));

  if (!loading) {
    return (
      <ListItem
        button
        onClick={handleChange}
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Typography
          variant="h3"
          style={{ width: "100px", textAlign: "center" }}
        >
          {companyData["Symbol"]}
        </Typography>
        <Typography
          variant="h4"
          style={{
            width: "100px",
            color: theme.palette.primary.dark,
            textAlign: "center",
          }}
        >
          {companyData["Exchange"]}
        </Typography>
        <Typography
          variant="h4"
          style={{ width: "100px", textAlign: "center" }}
        >
          {formatAmount(Number(companyData["MarketCapitalization"]))}
        </Typography>
      </ListItem>
    );
  } else {
    return (
      <ListItem
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Skeleton variant="rect" className={classes.listHead} />
      </ListItem>
    );
  }
}

function formatAmount(amount) {
  const oneT = 1000000000000;
  const oneB = 1000000000;
  const oneM = 1000000;
  const oneK = 1000;
  let suffix = "";

  if (amount >= oneT) {
    amount /= oneT;
    suffix = "T";
  } else if (amount >= oneB) {
    amount /= oneB;
    suffix = "B";
  } else if (amount >= oneM) {
    amount /= oneM;
    suffix = "M";
  } else if (amount >= oneK) {
    amount /= oneK;
    suffix = "K";
  }

  return String(amount.toFixed(3)) + suffix;
}
