import { createSlice } from "@reduxjs/toolkit";
import { LIGHT_MODE } from "../constants/themes";

type UiState = {
  mode: "light" | "dark";
};

const initialState: UiState = {
  mode: LIGHT_MODE,
};

export const uiSlice = createSlice({
  name: "ui",
  initialState,

  reducers: {
    setMode: (state, action) => {
      state.mode = action.payload;
    },
  },
});

export const { setMode } = uiSlice.actions;

export default uiSlice.reducer;
