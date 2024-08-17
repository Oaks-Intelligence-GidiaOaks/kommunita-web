import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const storiesSlice = createSlice({
  name: 'stories',
  initialState,
  reducers: {
    setNewStories: (_state, action) => {
      return action.payload;
    },
  },
});

export const { setNewStories } = storiesSlice.actions;

export default storiesSlice.reducer;
