import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CurrencyState {
  currency:  "BDT" | "USD" | "AED";
}

const initialState: CurrencyState = {
  currency: "BDT",
};

export const currencySlice = createSlice({
  name: "currency",
  initialState,
  reducers: {
    setCurrency: (state, action: PayloadAction<"BDT" | "USD" | "AED">) => {
      state.currency = action.payload;
    },
  },
});

export const { setCurrency } = currencySlice.actions;
export default currencySlice.reducer;
