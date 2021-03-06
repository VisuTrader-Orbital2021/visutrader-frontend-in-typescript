import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { sendRequest } from "../../utils/api";
import { parseISO } from "date-fns";

const initialState = {
  balance: 0,
  expense: 0,
  profit: 0,
  history: [],
  position: {},
  loading: false,
};

export const getWalletDetail = createAsyncThunk(
  "wallet/getWalletDetail",
  async (_, { getState, rejectWithValue }) => {
    const token = getState().user.token;
    const wallet = getState().user.wallet;
    const position = getState().user.position;

    if (!token) {
      return rejectWithValue("token is required");
    }

    try {
      const walletData = await sendRequest(wallet, token, "get");

      const serializedHistory = walletData.history.map((transaction) =>
        sendRequest(transaction, token, "get")
      );

      const positionData = await sendRequest(position, token, "get");

      // TODO: is this the best way?
      await Promise.all(serializedHistory).then((data) => {
        walletData.history = data;
      });

      return { ...walletData, position: positionData.data };
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const trade = createAsyncThunk(
  "wallet/trade",
  async (request, { getState, rejectWithValue }) => {
    const token = getState().user.token;
    const wallet = getState().user.wallet;

    if (!token) {
      return rejectWithValue("token is required");
    }

    try {
      const url = wallet + "history/";

      await sendRequest(url, token, "post", request);

      return;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const walletSlice = createSlice({
  name: "wallet",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getWalletDetail.fulfilled, (state, { payload }) => {
      state.balance = payload.balance;
      state.history = payload.history;
      state.position = payload.position;
      state.profit = 0;
      state.expense = 0;

      if (state.history.length) {
        state.history = state.history.map((transaction) => ({
          transactionType: transaction.transaction_type,
          quantity: transaction.quantity,
          amount: transaction.amount,
          market: transaction.market,
          fromWallet: transaction.from_wallet,
          createdAt: transaction.created_at,
        }));

        state.history.sort(
          (a, b) => parseISO(a.createdAt) - parseISO(b.createdAt)
        );

        state.history.forEach(({ amount, transactionType }) => {
          if (transactionType === "sell") {
            state.profit += parseFloat(amount);
          } else {
            state.expense += parseFloat(amount);
          }
        });

        state.profit = Number(state.profit.toFixed(2));
        state.expense = Number(state.expense.toFixed(2));
      }
    });
  },
});

export default walletSlice.reducer;
