// types/esim.ts

export interface EsimItem {
  id: string;
  title: string;
  netPrice: string; // string because you use parseFloat
  data: string; // string because you use parseFloat
  day?: number; // validity in days
  voiceSms?: boolean; // optional boolean
  voice?: boolean; // optional boolean
  text?: boolean; // optional boolean
  pricePerGB?: number; // optional number for lowestPricePerGB sorting
  prices?: {
    recommended_retail_price?: Record<string, string>;
  };
}

export interface EsimFilters {
  priceRange: [number, number]; // min and max price
  planSize?: string; // string representing data size
  validity?: string; // string representing day count
  voice?: boolean | number;
  voiceSms?: boolean | number;
  text?: boolean | number;
  sortBy?: 'cheapest' | 'mostData' | 'leastData' | 'lowestPricePerGB';
}
