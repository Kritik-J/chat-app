import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IUser } from "../types";
import axios from "axios";
import Constants from "expo-constants";

const apiUrl = Constants.expoConfig?.extra?.apiUrl;

export const searchUsers = createAsyncThunk(
  "user/fetchUsers",
  async ({ search, page = 1 }: { search: string; page: number }) => {
    const response = await axios.get(
      `${apiUrl}/users?email=${search}&page=${page}&limit=10`
    );

    return response.data.users as IUser[];
  }
);

type UserState = {
  users: IUser[];
  loading: boolean;
  error: Error | null;
};

const initialState: UserState = {
  loading: false,
  users: [],
  error: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,

  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(searchUsers.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(searchUsers.fulfilled, (state, { payload }) => {
      state.users = payload;
      state.loading = false;
    });
    builder.addCase(searchUsers.rejected, (state, { error }) => {
      state.loading = false;
    });
  },
});

export default userSlice.reducer;
