import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CheckoutState {
  numSim: number;
}

const initialState: CheckoutState = {
  numSim: 1,
};

const checkoutSlice = createSlice({
  name: 'checkout',
  initialState,
  reducers: {
    increment: (state, action: PayloadAction<number | undefined>) => {
      const value = action.payload ?? 1; // default increment by 1
      state.numSim = Math.min(9, state.numSim + value);
    },
    decrement: (state, action: PayloadAction<number | undefined>) => {
      const value = action.payload ?? 1; // default decrement by 1
      state.numSim = Math.max(1, state.numSim - value);
    },
  },
});

export const { increment, decrement } = checkoutSlice.actions;
export default checkoutSlice.reducer;
