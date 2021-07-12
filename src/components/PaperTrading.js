import React, { useState, useEffect } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
  },
  buyButton: {
    backgroundColor: "#e6ebed",
    "&:hover": {
      backgroundColor: "#edf3f5",
    },
    color: "#02d158",
  },
  sellButton: {
    backgroundColor: "#e6ebed",
    "&:hover": {
      backgroundColor: "#edf3f5",
    },
    color: "#ff3911",
  },
  // margin: {
  //   margin: theme.spacing(1),
  // },
  // buttons: {
  //   display: "flex",
  //   flexDirection: "row",
  //   justifyContent: "space-around",
  // },
  // buttonStyle: {
  //   background: (props) => (props.color === "rising" ? "#04f77e" : "#ff3911"),
  //   color: "white",
  // },
}));

export default function PaperTrading() {
  const theme = useTheme();
  const classes = useStyles(theme);
  const [amount, setAmount] = React.useState();

  const handleChange = (prop) => (event) => {
    setAmount(amount);
  };

  return (
    <div className={classes.root}>
      <Typography variant="h2" color="primary">
        PAPER TRADING
      </Typography>
      <ButtonGroup variant="contained" fullWidth disableElevation>
        <Button className={classes.buyButton}><Typography variant="body3"><strong>BUY</strong></Typography></Button>
        <Button className={classes.sellButton}><Typography variant="body3"><strong>SELL</strong></Typography></Button>
        {/* <TradeButton color="rising" fullWidth disableElevation><strong>BUY</strong></TradeButton>
        <TradeButton color="falling" fullWidth disableElevation><strong>SELL</strong></TradeButton> */}
      </ButtonGroup>
    </div>
  );
}
