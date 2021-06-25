import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
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
  margin: {
    margin: theme.spacing(1),
  },
  buttons: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  buttonStyle: {
    background: (props) => (props.color === "rising" ? "#04f77e" : "#ff3911"),
    color: "white",
  },
}));

export default function PaperTrading() {
  const classes = useStyles();
  const [amount, setAmount] = React.useState();

  const handleChange = (prop) => (event) => {
    setAmount(amount);
  };

  return (
    <div className={classes.root}>
      <Typography variant="h2" color="primary">
        PAPER TRADING
      </Typography>
      {/* TODO: Create input field for date? */}
      <FormControl fullWidth className={classes.margin}>
        <InputLabel htmlFor="amount">Amount</InputLabel>
        <Input
          id="amount"
          value={amount}
          onChange={handleChange}
          startAdornment={<InputAdornment position="start">$</InputAdornment>}
        />
      </FormControl>
      <div className={classes.buttons}>
        <TradeButton color="rising">BUY</TradeButton>
        <TradeButton color="falling">SELL</TradeButton>
      </div>
    </div>
  );
}

function TradeButton(props) {
  const { color, ...other } = props;
  const classes = useStyles(props);
  return (
    <Button
      className={classes.buttonStyle}
      {...other}
      variant="contained"
      disableElevation
    >
      {props.children}
    </Button>
  );
}
