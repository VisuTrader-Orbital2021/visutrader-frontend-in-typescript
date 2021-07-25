import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getDailyStock,
  getIntradayStock,
  getCompanyDataList,
  setCurrentCompany,
} from "../redux/slices/stock";
import { AMAZON, TESLA, MICROSOFT } from "../utils/constants";
import { useSnackbar } from "notistack";
import Slide from "@material-ui/core/Slide";
import { unwrapResult } from "@reduxjs/toolkit";
import { useTheme } from "@material-ui/core/styles";
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
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import StockChart from "./StockChart";
import CompanyOverview from "./CompanyOverview";
import PaperTrading from "./PaperTrading";
import Watchlist from "./Watchlist";
import Copyright from "./Copyright";

const DAILY = "DAILY";
const INTRADAY = "INTRADAY";
const CANDLESTICK = "CANDLESTICK";
const SPLINE_AREA = "SPLINE AREA";

export default function Trade({ classes }) {
  const theme = useTheme();
  const currentCompany = useSelector((state) => state.stock.currentCompany);
  const dispatch = useDispatch();

  const handleCompany = (company) => {
    dispatch(setCurrentCompany(company));
  };

  const [interval, setInterval] = useState("60min");
  const handleInterval = (interval) => {
    setInterval(interval);
  };

  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    dispatch(getDailyStock(currentCompany))
      .then(unwrapResult)
      .catch((err) => {
        enqueueSnackbar(
          "API call is limited to 5 requests/minute. Please wait...",
          {
            variant: "error",
            anchorOrigin: {
              vertical: "top",
              horizontal: "center",
            },
            TransitionComponent: Slide,
          }
        );
        console.log(JSON.stringify(err));
      });
  }, [dispatch, currentCompany, enqueueSnackbar]);

  // useEffect(() => {
  //   dispatch(getIntradayStock({ currentCompany, interval }))
  //     .then(unwrapResult)
  //     .catch((err) =>
  //       enqueueSnackbar(
  //         "API call is limited to 5 requests/minute. Please wait...",
  //         {
  //           variant: "error",
  //           anchorOrigin: {
  //             vertical: "top",
  //             horizontal: "center",
  //           },
  //           TransitionComponent: Slide,
  //         }
  //       )
  //     );
  // }, [dispatch, currentCompany, interval, enqueueSnackbar]);

  useEffect(() => {
    dispatch(getCompanyDataList())
      .then(unwrapResult)
      .catch((err) => {
        enqueueSnackbar(
          "API call is limited to 5 requests/minute. Please wait...",
          {
            variant: "error",
            anchorOrigin: {
              vertical: "top",
              horizontal: "center",
            },
            TransitionComponent: Slide,
          }
        );
        console.log(JSON.stringify(err));
      });
  }, [dispatch, enqueueSnackbar]);

  const [anchorStock, setAnchorStock] = useState(null);
  const openStock = Boolean(anchorStock);
  const [stockType, setStockType] = useState(DAILY);
  const handleStockClick = (event) => {
    setAnchorStock(event.currentTarget);
  };
  const handleStockClose = (stockType) => {
    setAnchorStock(null);
    setStockType(stockType);
  };

  const [anchorChart, setAnchorChart] = useState(null);
  const openChart = Boolean(anchorChart);
  const [chartType, setChartType] = useState(CANDLESTICK);
  const handleChartClick = (event) => {
    setAnchorChart(event.currentTarget);
  };
  const handleChartClose = (chartType) => {
    setAnchorChart(null);
    setChartType(chartType);
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
                  <StockChart stockType={stockType} chartType={chartType} />
                </div>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={4}>
            <Card>
              <CardContent>
                <CompanyOverview />
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
                  <ListItem
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography variant="body2" className={classes.listHead}>
                      SYMBOL
                    </Typography>
                    <Typography variant="body2" className={classes.listHead}>
                      EXCHANGE
                    </Typography>
                    <Typography variant="body2" className={classes.listHead}>
                      MARKET CAP
                    </Typography>
                  </ListItem>
                  <Divider />
                  <Watchlist
                    classes={classes}
                    company={AMAZON}
                    onClick={handleCompany}
                  />
                  <Divider />
                  <Watchlist
                    classes={classes}
                    company={TESLA}
                    onClick={handleCompany}
                  />
                  <Divider />
                  <Watchlist
                    classes={classes}
                    company={MICROSOFT}
                    onClick={handleCompany}
                  />
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
