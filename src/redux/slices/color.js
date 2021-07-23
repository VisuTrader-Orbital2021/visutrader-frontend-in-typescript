import { createSlice } from "@reduxjs/toolkit";
import {
  DEFAULT_PRIMARY_COLOR,
  DEFAULT_SECONDARY_COLOR,
} from "../../utils/constants";

const initialState = {
  primaryColor: DEFAULT_PRIMARY_COLOR,
  secondaryColor: DEFAULT_SECONDARY_COLOR,
  themeMode: "light",
};

const colorSlice = createSlice({
  name: "color",
  initialState,
  reducers: {
    changePrimaryColor: (state, action) => {
      state.primaryColor = action.payload;
    },
    changeSecondaryColor: (state, action) => {
      state.secondaryColor = action.payload;
    },
    changeThemeMode: (state, action) => {
      state.themeMode = action.payload;
    },
    resetDefault: (state) => {
      state.primaryColor = DEFAULT_PRIMARY_COLOR;
      state.secondaryColor = DEFAULT_SECONDARY_COLOR;
      state.themeMode = "light";
    },
  },
});

export const {
  changePrimaryColor,
  changeSecondaryColor,
  changeThemeMode,
  resetDefault,
} = colorSlice.actions;

export default colorSlice.reducer;
