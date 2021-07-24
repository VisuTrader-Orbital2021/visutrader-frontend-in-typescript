import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/user";
import stockReducer from "./slices/stock";
import walletReducer from "./slices/wallet";
import newsReducer from "./slices/news";
import colorReducer from "./slices/color";

export default configureStore({
  reducer: {
    user: userReducer,
    stock: stockReducer,
    wallet: walletReducer,
    news: newsReducer,
    color: colorReducer,
  },
});
