import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  sendDailyStockRequest,
  sendIntradayStockRequest,
  sendCompanyRequest,
} from "../../utils/api";

const initialState = {
  dailyStockData: [],
  dailyStockLoading: true,
  intradayStockData: [],
  intradayStockLoading: true,
  companyData: {},
  companyLoading: true,
};

export const getDailyStock = createAsyncThunk(
  "stock/getDailyStock",
  async (symbol, { rejectWithValue }) => {
    try {
      const dailyStockData = await sendDailyStockRequest(symbol);
      return formatDailyStockData(
        dailyStockData.data["Time Series (Daily)"]
      ).slice(0, 280);
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getIntradayStock = createAsyncThunk(
  "stock/getIntradayStock",
  async (symbolAndInterval, { rejectWithValue }) => {
    try {
      const { company: symbol, interval } = symbolAndInterval;
      const intradayStockData = await sendIntradayStockRequest(
        symbol,
        interval
      );
      return formatIntradayStockData(
        intradayStockData.data[`Time Series (${interval})`]
      ).slice(0, 280);
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getCompanyOverview = createAsyncThunk(
  "stock/getCompanyOverview",
  async (symbol, { rejectWithValue }) => {
    try {
      const companyData = await sendCompanyRequest(symbol);
      return companyData.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const stockSlice = createSlice({
  name: "stock",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getDailyStock.pending, (state) => {
      state.dailyStockLoading = true;
    });
    builder.addCase(getDailyStock.fulfilled, (state, { payload }) => {
      state.dailyStockData = payload;
      state.dailyStockLoading = false;
    });
    builder.addCase(getDailyStock.rejected, (state) => {
      state.dailyStockLoading = false;
    });
    builder.addCase(getIntradayStock.pending, (state) => {
      state.intradayStockLoading = true;
    });
    builder.addCase(getIntradayStock.fulfilled, (state, { payload }) => {
      state.intradayStockData = payload;
      state.intradayStockLoading = false;
    });
    builder.addCase(getIntradayStock.rejected, (state) => {
      state.intradayStockLoading = false;
    });
    builder.addCase(getCompanyOverview.pending, (state) => {
      state.companyLoading = true;
    });
    builder.addCase(getCompanyOverview.fulfilled, (state, { payload }) => {
      state.companyData = payload;
      state.companyLoading = false;
    });
    builder.addCase(getCompanyOverview.rejected, (state) => {
      state.companyLoading = false;
    });
  },
});

export default stockSlice.reducer;

function formatDailyStockData(stockData) {
  return Object.entries(stockData).map((entries) => {
    const [date, priceData] = entries;
    return {
      date: date,
      open: Number(priceData["1. open"]),
      high: Number(priceData["2. high"]),
      low: Number(priceData["3. low"]),
      close: Number(priceData["4. close"]),
      volume: Number(priceData["5. volume"]),
    };
  });
}

function formatIntradayStockData(stockData) {
  return Object.entries(stockData).map((entries) => {
    const [dateAndTime, priceData] = entries;
    return {
      dateAndTime: dateAndTime,
      date: dateAndTime.split(" ")[0],
      time: dateAndTime.split(" ")[1],
      open: Number(priceData["1. open"]),
      high: Number(priceData["2. high"]),
      low: Number(priceData["3. low"]),
      close: Number(priceData["4. close"]),
    };
  });
}
