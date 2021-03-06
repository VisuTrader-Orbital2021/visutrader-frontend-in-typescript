import React, { useEffect } from "react";
import { useSnackbar } from "notistack";
import Slide from "@material-ui/core/Slide";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
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
import { useDispatch, useSelector } from "react-redux";
import { userSelector } from "../redux/slices/user";
import { getWalletDetail } from "../redux/slices/wallet";
import { unwrapResult } from "@reduxjs/toolkit";
import { parseISO, format } from "date-fns";

const useStyles = makeStyles({
  fillHeight: {
    height: "100%",
  },
  cashFlowStyle: {
    height: "240px",
  },
});

function getBalanceHistory(initial, history, userJoinDate) {
  history = [...history];
  history.sort((a, b) => parseISO(b.createdAt) - parseISO(a.createdAt));

  let timeline = [];
  let currentValue = Number(initial);

  history.forEach(({ transactionType, amount, createdAt }) => {
    timeline.push({
      amount: Number(currentValue),
      date: format(parseISO(createdAt), "MM/dd/yyyy"),
    });

    if (transactionType === "sell") {
      currentValue -= Number(amount);
    } else {
      currentValue += Number(amount);
    }
  });

  timeline.push({
    amount: Number(currentValue),
    date: format(parseISO(userJoinDate), "MM/dd/yyyy"),
  });

  return timeline.reverse();
}

export default function Wallet({ classes }) {
  const theme = useTheme();
  const walletStyle = useStyles();

  const user = useSelector(userSelector);

  const RenderWallet = () => {
    const dispatch = useDispatch();
    const walletData = useSelector((state) => state.wallet);
    const userJoinDate = useSelector((state) => state.user.dateJoined);

    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
      dispatch(getWalletDetail())
        .then(unwrapResult)
        .catch((err) =>
          enqueueSnackbar("Failed to fetch wallet.", {
            variant: "error",
            anchorOrigin: {
              vertical: "top",
              horizontal: "center",
            },
            TransitionComponent: Slide,
          })
        );
    }, [dispatch, enqueueSnackbar]);

    const data = [
      { name: "Inflow", value: walletData.profit, fill: "#3FE06D" },
      { name: "Outflow", value: walletData.expense, fill: "#E05555" },
    ];

    const timelineData = getBalanceHistory(
      walletData.balance,
      walletData.history,
      userJoinDate
    );

    return (
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container direction="column" spacing={3} alignItems="stretch">
            <Grid container item spacing={3} alignItems="stretch">
              <Grid container item spacing={3} xs={4} direction="column">
                <Grid item>
                  <Card>
                    <CardContent>
                      <Box mb={2}>
                        <Typography variant="h2" color="primary">
                          ACCOUNT DETAILS
                        </Typography>
                      </Box>
                      <Typography variant="body1">
                        Balance: ${walletData.balance}
                      </Typography>
                      <Typography variant="body1">
                        Inflow: ${walletData.profit}
                      </Typography>
                      <Typography variant="body1">
                        Outflow: ${walletData.expense}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>

                <Grid item>
                  <Card>
                    <CardContent>
                      <Typography variant="h2" color="primary">
                        CASH FLOW
                      </Typography>
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
                    <Typography variant="h2" color="primary">
                      BALANCE TREND
                    </Typography>
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
                        <YAxis dataKey="amount" />
                        <Tooltip />
                        <Area
                          type="monotone"
                          dataKey="amount"
                          stroke="#8884d8"
                          fill="#8884d8"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>

            <Grid container item spacing={3}>
              <Grid item xs={8}>
                <Card classes={{ root: walletStyle.fillHeight }}>
                  <CardContent>
                    <Typography variant="h2" color="primary">
                      HISTORY
                    </Typography>
                    <TableContainer>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell align="center">Date and Time</TableCell>
                            <TableCell align="center">
                              Transaction Type
                            </TableCell>
                            <TableCell align="center">Quantity</TableCell>
                            <TableCell align="center">Total Price</TableCell>
                            <TableCell align="center">Market</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {walletData.history.map((row) => {
                            return (
                              <TableRow key={row.amount + row.createdAt}>
                                <TableCell
                                  component="th"
                                  scope="row"
                                  align="center"
                                >
                                  {format(
                                    parseISO(row.createdAt),
                                    "dd/MM/yyyy HH:mm:ss O"
                                  )}
                                </TableCell>
                                <TableCell align="center">
                                  {row.transactionType.toUpperCase()}
                                </TableCell>
                                <TableCell align="center">
                                  {row.quantity}
                                </TableCell>
                                <TableCell align="center">
                                  {row.amount}
                                </TableCell>
                                <TableCell align="center">
                                  {row.market}
                                </TableCell>
                              </TableRow>
                            );
                          })}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={4}>
                <Card classes={{ root: walletStyle.fillHeight }}>
                  <CardContent>
                    <Typography variant="h2" color="primary">
                      POSITION
                    </Typography>
                    <TableContainer>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell align="center">Symbol</TableCell>
                            <TableCell align="center">Stock(s)</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {Object.entries(walletData.position).map(
                            ([symbol, stock]) => {
                              if (stock === 0) {
                                return null;
                              }

                              return (
                                <TableRow key={symbol + stock}>
                                  <TableCell
                                    component="th"
                                    scope="row"
                                    align="center"
                                  >
                                    {symbol}
                                  </TableCell>
                                  <TableCell align="center">{stock}</TableCell>
                                </TableRow>
                              );
                            }
                          )}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Grid>

          <Box pt={4}>
            <Copyright />
          </Box>
        </Container>
      </main>
    );
  };

  if (user.authenticated) {
    return RenderWallet();
  } else {
    return (
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Box pt={4}>
            <Typography variant="h3" align="center">
              Sign up to unlock this feature
            </Typography>
          </Box>
          <Box pt={4}>
            <Copyright />
          </Box>
        </Container>
      </main>
    );
  }
}
