import React from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import {
  AreaChart,
  XAxis,
  YAxis,
  Area,
  CartesianGrid,
  PieChart,
  Pie,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Copyright from "./Copyright";

const useStyles = makeStyles({
  fillHeight: {
    height: "100%",
  },
  cashFlowStyle: {
    height: "240px",
  },
});

export default function Wallet({ classes, fixedHeightPaper }) {
  const theme = useTheme();
  const walletStyle = useStyles();

  const data = [
    { name: "Inflow", value: 5000, fill: "#3FE06D" },
    { name: "Outflow", value: 1000, fill: "#E05555" },
  ];

  const timelineData = [
    { date: "6/21/2020", value: 2000 },
    { date: "6/22/2020", value: 5000 },
    { date: "6/23/2020", value: 15000 },
    { date: "6/24/2020", value: 10000 },
  ];

  return (
    <main className={classes.content}>
      <div className={classes.appBarSpacer} />
      <Container maxWidth="lg" className={classes.container}>
        <Grid container spacing={3} alignItems="stretch">
          <Grid container item spacing={3} xs={4} direction="column">
            <Grid item>
              <Card>
                <CardContent>
                  <Typography variant="h2">Account Details</Typography>
                  <Typography variant="body1">Balance: $100,000</Typography>
                  <Typography variant="body1">Expenses: $100,000</Typography>
                  <Typography variant="body1">Profit: $100,000</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item>
              <Card>
                <CardContent>
                  <Typography variant="h2">Cash Flow</Typography>
                  <ResponsiveContainer width="100%" height={400}>
                    <PieChart width={300} height={300}>
                      <Pie
                        dataKey="value"
                        data={data}
                        startAngle={90}
                        endAngle={-270}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        label
                      />
                      <Legend />
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          <Grid item xs={8}>
            <Card classes={{ root: walletStyle.fillHeight }}>
              <CardContent classes={{ root: walletStyle.fillHeight }}>
                <Typography variant="h2">Balance Trend</Typography>
                <ResponsiveContainer width="100%" height={400}>
                  {/* TODO: Fix width. XAxis label seems to be cut on right side. */}
                  <AreaChart
                    width={500}
                    height={400}
                    data={timelineData}
                    margin={{
                      top: theme.spacing(3),
                      right: theme.spacing(3),
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis dataKey="value" />
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="value"
                      stroke="#8884d8"
                      fill="#8884d8"
                    />
                  </AreaChart>
                </ResponsiveContainer>
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
