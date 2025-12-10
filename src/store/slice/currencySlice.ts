import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CurrencyState {
  currency: "BDT" | "USD" | "AED";
  symbol: string;
}

const initialState: CurrencyState = {
  currency: "BDT",
  symbol: "৳", // initial symbol for BDT
};

// helper to get symbol
const getCurrencySymbol = (currency: "BDT" | "USD" | "AED") => {
  switch (currency) {
    case "AED":
      return "د.إ";
    case "USD":
      return "$";
    case "BDT":
      return "৳";
    default:
      return currency;
  }
};

export const currencySlice = createSlice({
  name: "currency",
  initialState,
  reducers: {
    setCurrency: (state, action: PayloadAction<"BDT" | "USD" | "AED">) => {
      state.currency = action.payload;
      state.symbol = getCurrencySymbol(action.payload); // update symbol automatically
    },
  },
});

export const { setCurrency } = currencySlice.actions;
export default currencySlice.reducer;
