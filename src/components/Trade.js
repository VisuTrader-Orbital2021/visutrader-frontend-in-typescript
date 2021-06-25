import React, { useEffect } from "react";
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
import List from '@material-ui/core/List';
import { CandlestickChart, SplineAreaChart } from "./StockChart";
import CompanyOverview from "./CompanyOverview";
import PaperTrading from "./PaperTrading";
import Watchlist from "./Watchlist";
import Copyright from "./Copyright";
import "../styles/Trade.css";

// TODO: Fix watchlist not updating the stock chart
// TODO: Remove styling with CSS
export default function Trade({ classes, fixedHeightPaper }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [chartType, setChartType] = React.useState("CANDLESTICK");
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (type) => {
    setAnchorEl(null);
    setChartType(type);
  };
  const [option, setOptionType] = React.useState("AMZN");
  const handleOption = (choice) => {
    setOptionType(choice);
    console.log(choice);    // to be removed
  }

  return (
    <main className={classes.content}>
      <div className={classes.appBarSpacer} />
      <Container maxWidth="lg" className={classes.container}>
        <Grid container item spacing={3} alignItems="stretch">
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <div className="chart-header">
                  <Typography variant="h2" color="primary">
                    STOCK CHART
                  </Typography>
                  <Button
                    aria-controls="fade-menu"
                    aria-haspopup="true"
                    onClick={handleClick}
                  >
                    {chartType}
                  </Button>
                  <Menu
                    id="fade-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={open}
                    TransitionComponent={Fade}
                  >
                    <MenuItem onClick={() => handleClose("CANDLESTICK")}>
                      CANDLESTICK
                    </MenuItem>
                    <MenuItem onClick={() => handleClose("SPLINE AREA")}>
                      SPLINE AREA
                    </MenuItem>
                  </Menu>
                </div>
                <div className="chart-content">
                  {chartType === "CANDLESTICK" ? (
                    <CandlestickChart>{option}</CandlestickChart>
                  ) : (
                    <SplineAreaChart>{option}</SplineAreaChart>
                  )}
                </div>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={4}>
            <Card>
              <CardContent>
                <CompanyOverview>{option}</CompanyOverview>
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
                  <Watchlist onClick={handleOption}>AMZN</Watchlist>
                  <Watchlist onClick={handleOption}>AAPL</Watchlist>
                  <Watchlist onClick={handleOption}>TSLA</Watchlist>
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
