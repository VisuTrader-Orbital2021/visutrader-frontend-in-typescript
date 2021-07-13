import React, { useState, useEffect } from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Fade from "@material-ui/core/Fade";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import { getDailyStockChart, getIntradayStockChart } from "./APIConnector";
import StockChart from "./StockChart";
import CompanyOverview from "./CompanyOverview";
import PaperTrading from "./PaperTrading";
import Watchlist from "./Watchlist";
import Copyright from "./Copyright";

const DAILY = "DAILY";
const INTRADAY = "INTRADAY";
const CANDLESTICK = "CANDLESTICK";
const SPLINE_AREA = "SPLINE AREA";

const AMAZON = "AMZN";
const APPLE = "AAPL";
const TESLA = "TSLA";

export default function Trade({ classes }) {
  const [company, setCompany] = React.useState(AMAZON);
  const handleCompany = (company) => {
    setCompany(company);
    // console.log(company); // to be removed
  };

  const [anchorStock, setAnchorStock] = React.useState(null);
  const openStock = Boolean(anchorStock);
  const [stockType, setStockType] = React.useState(DAILY);
  const handleStockClick = (event) => {
    setAnchorStock(event.currentTarget);
  };
  const handleStockClose = (stockType) => {
    setAnchorStock(null);
    setStockType(stockType);
    // console.log(stockType); // to be removed
  };

  const [stockData, setStockData] = useState([]);
  useEffect(() => {
    const fetchStockData = async () => {
      const result = await getDailyStockChart(company);
      setStockData(
        formatDailyStockData(result.data["Time Series (Daily)"]).slice(0, 280)
      );
    };
    fetchStockData();
  }, [company]);

  const [anchorChart, setAnchorChart] = React.useState(null);
  const openChart = Boolean(anchorChart);
  const [chartType, setChartType] = React.useState(CANDLESTICK);
  const handleChartClick = (event) => {
    setAnchorChart(event.currentTarget);
  };
  const handleChartClose = (chartType) => {
    setAnchorChart(null);
    setChartType(chartType);
    // console.log(chartType); // to be removed
  };

  return (
    <main className={classes.content}>
      <div className={classes.appBarSpacer} />
      <Container maxWidth="lg" className={classes.container}>
        <Grid container item spacing={3} alignItems="stretch">
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <div className={classes.chartHeader}>
                  <Typography variant="h2" color="primary">
                    STOCK CHART
                  </Typography>

                  {/* WORK IN PROGRESS */}
                  {/* <Button
                    aria-controls="fade-menu"
                    aria-haspopup="true"
                    onClick={handleStockClick}
                  >
                    {stockType}
                  </Button>
                  <Menu
                    id="fade-menu"
                    anchorEl={anchorStock}
                    keepMounted
                    open={openStock}
                    onClose={() => handleStockClose(stockType)}
                    TransitionComponent={Fade}
                  >
                    <MenuItem onClick={() => handleStockClose(INTRADAY)}>
                      INTRADAY
                    </MenuItem>
                    <MenuItem onClick={() => handleStockClose(DAILY)}>
                      DAILY
                    </MenuItem>
                  </Menu> */}

                  <Button
                    aria-controls="fade-menu"
                    aria-haspopup="true"
                    onClick={handleChartClick}
                  >
                    {chartType}
                  </Button>
                  <Menu
                    id="fade-menu"
                    anchorEl={anchorChart}
                    keepMounted
                    open={openChart}
                    onClose={() => handleChartClose(chartType)}
                    TransitionComponent={Fade}
                  >
                    <MenuItem onClick={() => handleChartClose(CANDLESTICK)}>
                      <Typography variant="body2">CANDLESTICK</Typography>
                    </MenuItem>
                    <MenuItem onClick={() => handleChartClose(SPLINE_AREA)}>
                      <Typography variant="body2">SPLINE AREA</Typography>
                    </MenuItem>
                  </Menu>
                </div>
                <div className="chart-content">
                  <StockChart
                    stockType={stockType}
                    stockData={stockData}
                    chartType={chartType}
                  />
                </div>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={4}>
            <Card>
              <CardContent>
                <CompanyOverview company={company} stockData={stockData} />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={4}>
            <Card>
              <CardContent>
                <PaperTrading />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={4}>
            <Card>
              <CardContent>
                <Typography variant="h2" color="primary">
                  MY WATCHLIST
                </Typography>
                <List>
                  <Watchlist company={AMAZON} onClick={handleCompany} />
                  <Divider />
                  <Watchlist company={APPLE} onClick={handleCompany} />
                  <Divider />
                  <Watchlist company={TESLA} onClick={handleCompany} />
                </List>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        <Box pt={4}>
          <Copyright />
        </Box>
      </Container>
    </main>
  );
}

function formatDailyStockData(stockData) {
  // console.log(stockData);
  return Object.entries(stockData).map((entries) => {
    const [date, priceData] = entries;
    return {
      date,
      open: Number(priceData["1. open"]),
      high: Number(priceData["2. high"]),
      low: Number(priceData["3. low"]),
      close: Number(priceData["4. close"]),
      volume: Number(priceData["5. volume"]),
    };
  });
}

// WORK IN PROGRESS
function formatIntradayStockData(stockData) {
  return Object.entries(stockData).map((entries) => {
    const [dateAndTime, priceData] = entries;
    return {
      dateAndTime,
      date: dateAndTime.split(" ")[0],
      time: dateAndTime.split(" ")[1],
      open: Number(priceData["1. open"]),
      high: Number(priceData["2. high"]),
      low: Number(priceData["3. low"]),
      close: Number(priceData["4. close"]),
    };
  });
}
