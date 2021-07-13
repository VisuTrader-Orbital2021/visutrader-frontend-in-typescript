import React, { useState, useEffect } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Fade from "@material-ui/core/Fade";
import TextField from '@material-ui/core/TextField';
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";

const MARKET = "MARKET";
const LIMIT = "LIMIT";

const useStyles = makeStyles((theme) => ({
  paperTrading: {
    display: "flex",
    flexDirection: "column",
  },
  side: {
    marginTop: "10px",
    height: "24px",
  },
  buyButton: {
    display: "flex",
    backgroundColor: "#e6ebed",
    "&:hover": {
      backgroundColor: "#edf3f5",
    },
    color: "#02d158",
    justifyContent: "flex-start",
    paddingLeft: "16px",
  },
  sellButton: {
    display: "flex",
    backgroundColor: "#e6ebed",
    "&:hover": {
      backgroundColor: "#edf3f5",
    },
    color: "#ff3911",
    justifyContent: "flex-end",
    paddingRight: "16px",
  },
  orderTypeAndQuantity: {
    display: "flex",
    flexDirection: "row",
  },
  orderType: {
    display: "flex",
    flexDirection: "column",
  },
  quantity: {
    display: "flex",
    flexDirection: "column",
  },
}));

export default function PaperTrading() {
  const theme = useTheme();
  const classes = useStyles(theme);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [orderType, setOrderType] = React.useState(MARKET);
  const handleOrderTypeClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleOrderTypeClose = (orderType) => {
    setAnchorEl(null);
    setOrderType(orderType);
    console.log(orderType);
  };

  return (
    <div className={classes.paperTrading}>
      <Typography variant="h2" color="primary">
        PAPER TRADING
      </Typography>
      <Typography className={classes.side} variant="body3">
        Side
      </Typography>
      <ButtonGroup variant="contained" size="small" fullWidth disableElevation>
        <Button className={classes.buyButton}>
          <Typography variant="body3">
            <strong>BUY</strong>
          </Typography>
        </Button>
        <Button className={classes.sellButton}>
          <Typography variant="body3">
            <strong>SELL</strong>
          </Typography>
        </Button>
      </ButtonGroup>

      <Typography variant="body3">Order Type</Typography>
      <div className={classes.orderTypeAndQuantity}>
          <Button
            aria-controls="fade-menu"
            aria-haspopup="true"
            onClick={handleOrderTypeClick}
          >
            {orderType}
          </Button>
          <Menu
            id="fade-menu"
            anchorEl={anchorEl}
            keepMounted
            open={open}
            onClose={() => handleOrderTypeClose(orderType)}
            TransitionComponent={Fade}
          >
            <MenuItem onClick={() => handleOrderTypeClose(MARKET)}>
              <Typography variant="body3">MARKET</Typography>
            </MenuItem>
            <MenuItem onClick={() => handleOrderTypeClose(LIMIT)}>
              <Typography variant="body3">LIMIT</Typography>
            </MenuItem>
          </Menu>
          <TextField
            id="standard-number"
            label="Quantity"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
          />
      </div>
    </div>
  );
}
