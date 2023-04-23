import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Constants from "expo-constants";
import { IChat } from "../types";

const apiUrl = Constants.expoConfig?.extra?.apiUrl;

export const fetchChats = createAsyncThunk(
  "chat/fetchChats",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${apiUrl}/chats`, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      return data.chats as IChat[];
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchChat = createAsyncThunk(
  "chat/fetchChat",
  async (chatId: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${apiUrl}/chats/${chatId}?page=1`, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      return response.data.chat as IChat;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

type ChatState = {
  chats: IChat[];
  loading: boolean;
  loadingChat: boolean;
  chat: IChat | null;
  error: Error | null;
};

const initialState: ChatState = {
  loading: false,
  chats: [],
  loadingChat: false,
  chat: null,
  error: null,
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(fetchChats.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchChats.fulfilled, (state, action) => {
      state.loading = false;
      state.chats = action.payload;
    });
    builder.addCase(fetchChats.rejected, (state, action) => {
      state.loading = false;
      // state.error = action.error;
    });
    builder.addCase(fetchChat.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchChat.fulfilled, (state, action) => {
      state.loading = false;
      state.chat = action.payload;
    });
    builder.addCase(fetchChat.rejected, (state, action) => {
      state.loading = false;
      // state.error = action.error;
    });
  },
});

export default chatSlice.reducer;
