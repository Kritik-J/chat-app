import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IMessage } from "../types";
import Constants from "expo-constants";
import axios from "axios";

const apiUrl = Constants.expoConfig?.extra?.apiUrl;

export const getMyMessages = createAsyncThunk(
  "message/getMyMessages",
  async ({ chatId }: { chatId: string }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${apiUrl}/messages/chats/${chatId}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      return response.data.messages;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const sendMessage = createAsyncThunk(
  "message/sendMessage",
  async (
    { chatId, text }: { chatId: string; text: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(
        `${apiUrl}/messages`,
        {
          chatId,
          text,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      return response.data.message as IMessage;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

type MessageState = {
  messages: IMessage[];
  loading: boolean;
  error: boolean | null;
};

const initialState: MessageState = {
  messages: [],
  loading: false,
  error: null,
};

export const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(getMyMessages.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getMyMessages.fulfilled, (state, action) => {
      state.loading = false;
      state.messages = action.payload;
      state.error = null;
    });
    builder.addCase(getMyMessages.rejected, (state, action) => {
      state.loading = false;
      // state.error = action.payload;
    });
    builder.addCase(sendMessage.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(sendMessage.fulfilled, (state, action) => {
      state.loading = false;
      state.messages = [action.payload, ...state.messages];
      state.error = null;
    });
    builder.addCase(sendMessage.rejected, (state, action) => {
      state.loading = false;
      // state.error = action.payload;
    });
  },
});

export default messageSlice.reducer;
