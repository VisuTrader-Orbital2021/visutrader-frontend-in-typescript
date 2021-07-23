import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { sendNewsHeadlineRequest } from "../../utils/api";

const initialState = {
  news: [],
  loading: false,
};

export const getNewsHeadline = createAsyncThunk(
  "news/getNewsHeadline",
  async (_, { rejectWithValue }) => {
    try {
      const newsData = await sendNewsHeadlineRequest();
      return newsData.data.articles;
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
      state.loading = true;
    });
    builder.addCase(getNewsHeadline.fulfilled, (state, { payload }) => {
      state.news = payload;
      state.loading = false;
    });
    builder.addCase(getNewsHeadline.rejected, (state) => {
      state.loading = false;
    });
  },
});

export default newsSlice.reducer;
