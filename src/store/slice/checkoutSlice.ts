// checkoutSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  name: string;
  email: string;
  phone: string;
}

interface CheckoutState {
  numSim: number;
  users: User[];
}

const initialState: CheckoutState = {
  numSim: 1,
  users: [{ name: "", email: "", phone: "" }],
};

export const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    increment: (state) => {
      state.numSim += 1;
      state.users.push({ name: "", email: "", phone: "" }); // add a new user
    },
    decrement: (state) => {
      if (state.numSim > 1) {
        state.numSim -= 1;
        state.users.pop(); // remove last user
      }
    },
    setUserField: (
      state,
      action: PayloadAction<{ index: number; field: keyof User; value: string }>
    ) => {
      const { index, field, value } = action.payload;
      state.users[index][field] = value;
    },
  },
});

export const { increment, decrement, setUserField } = checkoutSlice.actions;
export default checkoutSlice.reducer;
