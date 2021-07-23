import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  sendNewsHeadlineRequest,
  sendNewsSearchRequest,
} from "../../utils/api";

const initialState = {
  newsHeadline: [],
  newsHeadlineLoading: false,
  newsSearch: [],
  newsSearchLoading: false,
};

export const getNewsHeadline = createAsyncThunk(
  "news/getNewsHeadline",
  async (_, { rejectWithValue }) => {
    try {
      const newsHeadlineData = await sendNewsHeadlineRequest();
      return newsHeadlineData.data.value;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getNewsSearch = createAsyncThunk(
  "news/getNewsSearch",
  async (query, { rejectWithValue }) => {
    try {
      const newsSearchData = await sendNewsSearchRequest(query);
      return newsSearchData.data.value;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getNewsHeadline.pending, (state) => {
      state.newsHeadlineLoading = true;
    });
    builder.addCase(getNewsHeadline.fulfilled, (state, { payload }) => {
      state.newsHeadline = payload;
      state.newsHeadlineLoading = false;
    });
    builder.addCase(getNewsHeadline.rejected, (state) => {
      state.newsHeadlineLoading = false;
    });
    builder.addCase(getNewsSearch.pending, (state) => {
      state.newsSearchLoading = true;
    });
    builder.addCase(getNewsSearch.fulfilled, (state, { payload }) => {
      state.newsSearch = payload;
      state.newsSearchLoading = false;
    });
    builder.addCase(getNewsSearch.rejected, (state) => {
      state.newsSearchLoading = false;
    });
  },
});

export default newsSlice.reducer;
