import { combineReducers } from "@reduxjs/toolkit";
import uiReducer from "./uiSlice";
import authReducer from "./authSlice";
import userReducer from "./userSlice";
import messageReducer from "./messageSlice";

const rootReducer = combineReducers({
  ui: uiReducer,
  auth: authReducer,
  user: userReducer,
  message: messageReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
