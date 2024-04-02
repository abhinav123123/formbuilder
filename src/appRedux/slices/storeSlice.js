


import { configureStore, createSlice } from '@reduxjs/toolkit';

const initialState = {};

const storeSlice = createSlice({
  name: 'jsonData',
  initialState,
  reducers: {
    addComponent: (state, action) => {
      const { tab, data } = action.payload;
      state[`active${tab}`] = [...data];
    },



  },
});

export const { addComponent } = storeSlice.actions;

export default storeSlice.reducer;
