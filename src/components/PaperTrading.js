import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import { trade } from "../redux/slices/wallet";
import { useDispatch, useSelector } from "react-redux";
import { companySelector } from "../redux/slices/stock";
import { unwrapResult } from "@reduxjs/toolkit";

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
  buyAndSell: {
    display: "flex",
    justifyContent: "space-around",
  },
  buyButton: {
    flex: 1,
    backgroundColor: theme.palette.success.main,
    "&:hover": {
      backgroundColor: theme.palette.success.light,
    },
    color: "#ffffff", // white
  },
  sellButton: {
    flex: 1,
    backgroundColor: theme.palette.error.main,
    "&:hover": {
      backgroundColor: theme.palette.error.light,
    },
    color: "#ffffff", // white
  },
  orderTypeAndQuantity: {
    display: "flex",
    flexDirection: "row",
    marginBottom: theme.spacing(3),
  },
  title: {
    marginBottom: theme.spacing(3),
  },
  orderType: {
    display: "flex",
    flexDirection: "column",
  },
  quantity: {
    display: "flex",
    flexDirection: "column",
  },
  buttons: {
    marginBottom: theme.spacing(3),
  },
  textField: {
    flex: 1,
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  dateField: {
    display: "flex",
    justifyContent: "center",
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(3),
  },
}));

export default function PaperTrading() {
  const BUY = "buy";
  const SELL = "sell";

  const theme = useTheme();
  const classes = useStyles(theme);

  const dispatch = useDispatch();
  const {
    dailyStockData: stockData,
    dailyStockLoading: stockLoading,
    companyDataListLoading: companyLoading,
    currentCompany,
  } = useSelector((state) => state.stock);

  const companyData = useSelector((state) =>
    companySelector(state, currentCompany)
  );

  const [quantity, setQuantity] = React.useState(0);
  const handleChangeQuantity = (e) => {
    setQuantity(e.target.value);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [orderType, setOrderType] = React.useState(MARKET);
  const handleOrderTypeClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleOrderTypeClose = (orderType) => {
    setAnchorEl(null);
    setOrderType(orderType);
  };

  const tradeHandler = async (transactionType) => {
    console.log("Called");
    const values = {
      transaction_type: transactionType,
      quantity: quantity,
      amount: quantity * stockData[0].close,
      market: companyData["Symbol"],
    };

    if (!stockLoading && !companyLoading) {
      await dispatch(trade(values))
        .then(unwrapResult)
        .then(() => alert("Transaction successful"))
        .catch((err) => alert(JSON.stringify(err)));
    }
  };

  return (
    <div className={classes.paperTrading}>
      <Typography variant="h2" color="primary" className={classes.title}>
        PAPER TRADING
      </Typography>

      <div className={classes.orderTypeAndQuantity}>
        <TextField
          select
          label="Order Type"
          InputLabelProps={{
            shrink: true,
          }}
          className={classes.textField}
          defaultValue={MARKET}
        >
          <MenuItem value={MARKET}>MARKET</MenuItem>
        </TextField>
        <TextField
          id="standard-number"
          label="Quantity"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          onChange={handleChangeQuantity}
          className={classes.textField}
        />
      </div>

      <Box mb={3} mx="auto">
        <Typography variant="h3">
          Total price:{" USD $"}
          {stockLoading ? 0 : (quantity * stockData[0].close).toFixed(2)}
        </Typography>
      </Box>

      <div className={classes.buyAndSell}>
        <Box width="30%" align="center">
          <Button
            className={classes.buyButton}
            onClick={() => tradeHandler(BUY)}
          >
            BUY
          </Button>
        </Box>
        <Box width="30%" align="center">
          <Button
            className={classes.sellButton}
            onClick={() => tradeHandler(SELL)}
          >
            SELL
          </Button>
        </Box>
      </div>
    </div>
  );
}
