import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface EsimItem {
  netPrice: string | number;
  data?: string | number | null;
  day?: string | number | null;
  voice?: string | number | null;
  text?: string | number | null;
}

interface FiltersState {
  priceRange: [number, number];
  sortBy: string;
  planSize: string | number | "";
  validity: string | number | "";
  voice: string | number | "";
  text: string | number | "";
  voiceSms: boolean;

  uniquePlanSizes: Array<string | number>;
  uniqueValidities: Array<string | number>;
  uniqueVoice: Array<string | number>;
  uniqueText: Array<string | number>;
}

const calculatePriceRange = (data: EsimItem[]): [number, number] => {
  if (!data || data.length === 0) return [100, 5000];

  const prices = data
    .map((item) => Number(item.netPrice))
    .filter((price) => !isNaN(price) && price > 0);

  if (prices.length === 0) return [100, 5000];

  return [Math.floor(Math.min(...prices)), Math.ceil(Math.max(...prices))];
};

const initialState: FiltersState = {
  priceRange: [100, 5000],
  sortBy: "cheapest",
  planSize: "",
  validity: "",
  voice: "",
  text: "",
  voiceSms: false,

  uniquePlanSizes: [],
  uniqueValidities: [],
  uniqueVoice: [],
  uniqueText: [],
};

const esimSlice = createSlice({
  name: "esim",
  initialState,
  reducers: {
    setFilters: (state, action: PayloadAction<Partial<FiltersState>>) => {
      return { ...state, ...action.payload };
    },

    setDynamicPriceRange: (state, action: PayloadAction<EsimItem[]>) => {
      state.priceRange = calculatePriceRange(action.payload);
    },

    setDynamicFilters: (state, action: PayloadAction<{ data: EsimItem[] }>) => {
      const { data } = action.payload;

      const cleanValues = (arr: any[]) =>
        Array.from(new Set(arr.filter((v) => v !== null && v !== undefined && v !== "")));

      state.uniquePlanSizes = cleanValues(data.map((item) => item.data));
      state.uniqueValidities = cleanValues(data.map((item) => item.day));
      state.uniqueVoice = cleanValues(data.map((item) => item.voice));
      state.uniqueText = cleanValues(data.map((item) => item.text));
    },

    resetFilters: () => initialState,
  },
});

export const {
  setFilters,
  resetFilters,
  setDynamicPriceRange,
  setDynamicFilters,
} = esimSlice.actions;

export default esimSlice.reducer;
