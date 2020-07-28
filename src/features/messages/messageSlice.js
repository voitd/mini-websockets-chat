import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import axios from 'axios';
import routes from '../../routes.js';

export const addNewMessage = createAsyncThunk('messages/AddNewMessages', async (message) => {
  const body = { data: { attributes: message } };
  const { data } = await axios.post(routes.channelMessagesPath(message.channelId), body);
  return data.attributes;
});

const messageSlice = createSlice({
  name: 'messages',
  initialState: [],
  reducers: {
    updateMessages(state, { payload }) {
      state.push(...payload);
    },
    addMessageSuccess(state, { payload }) {
      state.push(payload);
    }
  },
  extraReducers: {
    'chat/removeChannel/fulfilled': (state, { meta }) => {
      const id = meta.arg;
      return state.filter((msg) => msg.channelId !== id);
    }
  }
});

export const { addMessageSuccess, updateMessages } = messageSlice.actions;

export default messageSlice.reducer;

export const selectMessages = (state) => state;
export const selectMsgById = (state, id) => state.messages.filter((msg) => msg.channelId === id);