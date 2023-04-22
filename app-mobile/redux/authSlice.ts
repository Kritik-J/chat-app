import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IUser } from "../types";
import axios from "axios";
import Constants from "expo-constants";

const apiUrl = Constants.expoConfig?.extra?.apiUrl;

type AuthState = {
  user: IUser | null;
  isAuth: boolean;
  loading: boolean;
  error: Error | null;
};

const initialState: AuthState = {
  loading: false,
  isAuth: false,
  user: null,
  error: null,
};

// register user

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (
    {
      displayName,
      email,
      password,
    }: {
      displayName: string;
      email: string;
      password: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await axios.post(
        `${apiUrl}/auth/register`,
        {
          displayName,
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      return data.user as IUser;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// login user

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (
    {
      email,
      password,
    }: {
      email: string;
      password: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await axios.post(
        `${apiUrl}/auth/login`,
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      return data.user as IUser;
    } catch (error) {
      return rejectWithValue(error as Error);
    }
  }
);

// logout user

export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${apiUrl}/auth/logout`, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      return data.user as IUser;
    } catch (error) {
      return rejectWithValue(error as Error);
    }
  }
);

// profile

export const loadProfile = createAsyncThunk(
  "auth/loadProfile",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${apiUrl}/auth/profile`, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      return data.user as IUser;
    } catch (error) {
      return rejectWithValue(error as Error);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.loading = false;
      state.isAuth = true;
      state.user = action.payload;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as Error;
    });

    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.loading = false;
      state.isAuth = true;
      state.user = action.payload;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as Error;
    });

    builder.addCase(logoutUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(logoutUser.fulfilled, (state, action) => {
      state.loading = false;
      state.isAuth = false;
      state.user = null;
    });
    builder.addCase(logoutUser.rejected, (state) => {
      state.loading = false;
    });

    builder.addCase(loadProfile.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(loadProfile.fulfilled, (state, action) => {
      state.loading = false;
      state.isAuth = true;
      state.user = action.payload;
    });
    builder.addCase(loadProfile.rejected, (state) => {
      state.loading = false;
    });
  },
});

export default authSlice.reducer;
