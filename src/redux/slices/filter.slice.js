import { createSlice } from '@reduxjs/toolkit';

const initialState = '';

const filterSlice = createSlice({
  name: 'filterPost',
  initialState,
  reducers: {
    setFilterParams: (_state, action) => {
      return action.payload;
    },
    resetParams: () => {
      return '';
    },
  },
});

export const { setFilterParams, resetParams } = filterSlice.actions;

export default filterSlice.reducer;
