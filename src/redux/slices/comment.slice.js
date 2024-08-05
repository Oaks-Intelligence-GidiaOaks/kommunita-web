import { createSlice } from '@reduxjs/toolkit';

const commentSlice = createSlice({
  name: 'comment',
  initialState: {
    isCommentOpen: false,
  },
  reducers: {
    toggleComment: (state) => {
      state.isCommentOpen = !state.isCommentOpen;
    },
    openComment: (state) => {
      state.isCommentOpen = true;
    },
    closeComment: (state) => {
      state.isCommentOpen = false;
    },
  },
});

export const { toggleComment, openComment, closeComment } = commentSlice.actions;
export default commentSlice.reducer;
