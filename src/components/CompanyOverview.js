import React from "react";
import { useSelector } from "react-redux";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Skeleton from "@material-ui/lab/Skeleton";

const useStyles = makeStyles((theme) => ({
  companyGeneral: {
    display: "flex",
    flexDirection: "column",
  },
  companySymbol: {
    height: "40px",
    color: theme.palette.primary.main,
  },
  companyName: {
    height: "20px",
  },
  companyIndustry: {
    height: "36px",
  },
  companyStock: {
    height: "60px",
    display: "flex",
    flexDirection: "row",
  },
  stockPrice: {
    height: "60px",
  },
  whiteSpace: {
    height: "60px",
    width: "10px",
  },
  stockCurrency: {
    height: "60px",
  },
  companyStats: {
    display: "flex",
    flexDirection: "column",
  },
  keyStats: {
    height: "30px",
    color: theme.palette.primary.main,
  },
  companyStatsItem: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  companyPerformance: {
    display: "flex",
    flexDirection: "column",
  },
  performance: {
    height: "30px",
    marginTop: "16px",
    color: theme.palette.primary.main,
  },
  performanceRow: {
    display: "flex",
    flexDirection: "row",
  },
  performanceBox: {
    display: "flex",
    flexDirection: "column",
    width: "105px",
    padding: "2px",
    margin: "5px",
    textAlign: "center",
    background: (props) => {
      if (Number(props.percentage) > 0) {
        return "#d6ffd4";
      } else if (Number(props.percentage) === 0) {
        return "#fffc9c";
      } else if (Number(props.percentage) < 0) {
        return "#ffbaba";
      }
    },
    border: (props) => {
      if (Number(props.percentage) > 0) {
        return "2px solid #14960e";
      } else if (Number(props.percentage) === 0) {
        return "2px solid #b3a120";
      } else if (Number(props.percentage) < 0) {
        return "2px solid #910f0f";
      }
    },
  },
  performancePercentage: {
    color: (props) => {
      if (Number(props.percentage) > 0) {
        return "#14960e";
      } else if (Number(props.percentage) === 0) {
        return "#b3a120";
      } else if (Number(props.percentage) < 0) {
        return "#910f0f";
      }
    },
  },
  performanceRange: {
    color: "black",
  },
}));

export default function CompanyOverview() {
  const theme = useTheme();
  const classes = useStyles(theme);
  const {
    dailyStockData: stockData,
    dailyStockLoading: loading,
    companyData,
  } = useSelector((state) => state.stock);

  return (
    <div>
      <div className={classes.companyGeneral}>
        <Typography className={classes.companySymbol} variant="h2">
          {companyData["Symbol"]}
        </Typography>
        <Typography className={classes.companyName} variant="h3">
          {companyData["Name"]}
        </Typography>
        <Typography className={classes.companyIndustry} variant="body1">
          {companyData["Industry"]}
        </Typography>
      </div>
      <div className={classes.companyStock}>
        <Typography className={classes.stockPrice} variant="h1">
          {!loading && stockData && `$${stockData[0].close}`}
        </Typography>
        <Typography className={classes.whiteSpace}> </Typography>
        <Typography className={classes.stockCurrency} variant="h3">
          {companyData["Currency"]}
        </Typography>
      </div>
      <div className={classes.companyStats}>
        <Typography className={classes.keyStats} variant="h3">
          KEY STATISTICS
        </Typography>
        <div className={classes.companyStatsItem}>
          <Typography variant="body1">Volume</Typography>
          <Typography variant="body1">
            {!loading && stockData && (
              <strong>{formatAmount(Number(stockData[0].volume))}</strong>
            )}
          </Typography>
        </div>
        <div className={classes.companyStatsItem}>
          <Typography variant="body1">Market Capitalization</Typography>
          <Typography variant="body1">
            <strong>
              ${formatAmount(Number(companyData["MarketCapitalization"]))}
            </strong>
          </Typography>
        </div>
        <div className={classes.companyStatsItem}>
          <Typography variant="body1">EPS</Typography>
          <Typography variant="body1">
            <strong>{formatAmount(Number(companyData["EPS"]))}</strong>
          </Typography>
        </div>
        <div className={classes.companyStatsItem}>
          <Typography variant="body1">P/E Ratio</Typography>
          <Typography variant="body1">
            <strong>{formatAmount(Number(companyData["PERatio"]))}</strong>
          </Typography>
        </div>
        <div className={classes.companyStatsItem}>
          <Typography variant="body1">PEG Ratio</Typography>
          <Typography variant="body1">
            <strong>{formatAmount(Number(companyData["PEGRatio"]))}</strong>
          </Typography>
        </div>
        <div className={classes.companyStatsItem}>
          <Typography variant="body1">Shares Float</Typography>
          <Typography variant="body1">
            <strong>{formatAmount(Number(companyData["SharesFloat"]))}</strong>
          </Typography>
        </div>
      </div>
      <div className={classes.companyPerformance}>
        <Typography className={classes.performance} variant="h3">
          PERFORMANCE
        </Typography>
        <RenderPerformance
          classes={classes}
          loading={loading}
          stockData={stockData}
        />
      </div>
    </div>
  );
}

function RenderPerformance({ classes, loading, stockData }) {
  if (!loading && stockData) {
    return (
      <React.Fragment>
        <div className={classes.performanceRow}>
          <PerformanceBox
            percentage={calculatePercentage(stockData, "1D")}
            range="1D"
          />
          <PerformanceBox
            percentage={calculatePercentage(stockData, "1W")}
            range="1W"
          />
          <PerformanceBox
            percentage={calculatePercentage(stockData, "1M")}
            range="1M"
          />
        </div>
        <div className={classes.performanceRow}>
          <PerformanceBox
            percentage={calculatePercentage(stockData, "3M")}
            range="3M"
          />
          <PerformanceBox
            percentage={calculatePercentage(stockData, "6M")}
            range="6M"
          />
          <PerformanceBox
            percentage={calculatePercentage(stockData, "1Y")}
            range="1Y"
          />
        </div>
      </React.Fragment>
    );
  } else {
    return (
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <Skeleton
            variant="rect"
            height="40px"
            width="110px"
            style={{ marginRight: "10px" }}
          />
          <Skeleton
            variant="rect"
            height="40px"
            width="110px"
            style={{ marginRight: "10px" }}
          />
          <Skeleton variant="rect" height="40px" width="110px" />
        </div>
        <div
          style={{ display: "flex", flexDirection: "row", paddingTop: "10px" }}
        >
          <Skeleton
            variant="rect"
            height="40px"
            width="110px"
            style={{ marginRight: "10px" }}
          />
          <Skeleton
            variant="rect"
            height="40px"
            width="110px"
            style={{ marginRight: "10px" }}
          />
          <Skeleton variant="rect" height="40px" width="110px" />
        </div>
      </div>
    );
  }
}

function PerformanceBox(props) {
  const classes = useStyles(props);

  return (
    <div className={classes.performanceBox}>
      <Typography className={classes.performancePercentage} variant="body2">
        <strong>{props.percentage}</strong>%
      </Typography>
      <Typography className={classes.performanceRange} variant="body2">
        {props.range}
      </Typography>
    </div>
  );
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

// Note: Temporary solution
function calculatePercentage(stockData, range) {
  const currentPrice = stockData[0].close;
  let previousPrice = stockData[0].close;

  if (range === "1D") {
    previousPrice = stockData[1].close;
  } else if (range === "1W") {
    previousPrice = stockData[5].close;
  } else if (range === "1M") {
    previousPrice = stockData[22].close;
  } else if (range === "3M") {
    previousPrice = stockData[66].close;
  } else if (range === "6M") {
    previousPrice = stockData[130].close;
  } else if (range === "1Y") {
    previousPrice = stockData[261].close;
  }

  return (((currentPrice - previousPrice) / previousPrice) * 100).toFixed(2);
}
