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
import { CandlestickChart, SplineAreaChart } from "./StockChart";
import CompanyOverview from "./CompanyOverview";
import PaperTrade from "./PaperTrade";
import Watchlist from "./Watchlist";
import Copyright from "./Copyright";
import "../styles/Trade.css";

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
                    <CandlestickChart />
                  ) : (
                    <SplineAreaChart />
                  )}
                </div>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={3}>
            <Card>
              <CardContent>
                <CompanyOverview />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={6}>
            <Card>
              <CardContent>
                <PaperTrade />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={3}>
            <Card>
              <CardContent>
                <Watchlist />
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
