import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/user";
import walletReducer from "./slices/wallet";

export default configureStore({
  reducer: {
    user: userReducer,
    wallet: walletReducer,
  },
});
