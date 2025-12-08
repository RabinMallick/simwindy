import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Language = "en" | "bn";

interface LanguageState {
  value: Language;
}

const initialState: LanguageState = {
  value: "en", // default English
};

const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<Language>) => {
      state.value = action.payload;
    },
    toggleLanguage: (state) => {
      state.value = state.value === "en" ? "bn" : "en";
    },
  },
});

export const { setLanguage, toggleLanguage } = languageSlice.actions;
export default languageSlice.reducer;
