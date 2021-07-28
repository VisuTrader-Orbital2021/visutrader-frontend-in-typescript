import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import {
  sendLatestStockPriceRequest,
  sendDailyStockRequest,
  sendIntradayStockRequest,
  sendCompanyRequest,
} from "../../utils/api";
import { AMAZON, TESLA, MICROSOFT } from "../../utils/constants";

const initialState = {
  latestStockPrice: 0,
  latestStockPriceLoading: true,
  dailyStockData: [],
  dailyStockLoading: true,
  intradayStockData: [],
  intradayStockLoading: true,
  companyDataList: [],
  companyDataListLoading: true,
  currentCompany: AMAZON,
};

export const getLatestStockPrice = createAsyncThunk(
  "stock/getLatestStockPrice",
  async (symbol, { rejectWithValue }) => {
    try {
      const stockData = await sendLatestStockPriceRequest(symbol);
      return stockData.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

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
      const { currentCompany: symbol, interval } = symbolAndInterval;
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

export const getCompanyDataList = createAsyncThunk(
  "stock/getCompanyDataList",
  async (_, { rejectWithValue }) => {
    try {
      const companyData = await Promise.all([
        sendCompanyRequest(AMAZON),
        sendCompanyRequest(TESLA),
        sendCompanyRequest(MICROSOFT),
      ]).then((res) => res.map((companyData) => companyData.data));
      return companyData;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const stockSlice = createSlice({
  name: "stock",
  initialState,
  reducers: {
    setCurrentCompany: (state, action) => {
      state.currentCompany = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getLatestStockPrice.pending, (state) => {
      state.latestStockPriceLoading = true;
    });
    builder.addCase(getLatestStockPrice.fulfilled, (state, { payload }) => {
      state.latestStockPrice = payload;
      state.latestStockPriceLoading = false;
    });
    builder.addCase(getLatestStockPrice.rejected, (state) => {
      state.latestStockPriceLoading = false;
    });

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

    builder.addCase(getCompanyDataList.pending, (state) => {
      state.companyDataListLoading = true;
    });
    builder.addCase(getCompanyDataList.fulfilled, (state, { payload }) => {
      state.companyDataList = payload;
      state.companyDataListLoading = false;
    });
    builder.addCase(getCompanyDataList.rejected, (state) => {
      state.companyDataListLoading = false;
    });
  },
});

export const { setCurrentCompany } = stockSlice.actions;

export default stockSlice.reducer;

export const companySelector = (state, symbol) => {
  const companyDataList = state.stock.companyDataList;
  let selectedCompany = {};
  for (const companyData of companyDataList) {
    if (companyData["Symbol"] === symbol) {
      selectedCompany = companyData;
    }
  }
  return selectedCompany;
};

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
