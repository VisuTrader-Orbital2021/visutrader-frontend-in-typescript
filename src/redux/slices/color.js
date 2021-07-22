import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  primaryColor: "#536DFE",
  secondaryColor: "#EC407A",
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
      console.log(initialState);
      state.primaryColor = "#536DFE";
      state.secondaryColor = "#EC407A";
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
