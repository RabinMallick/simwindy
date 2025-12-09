// utils/esimSort.ts

// 🔹 Define types
export interface EsimItem {
  id: string;
  netPrice: string;
  day: number;
  data: string;
  voice?: number;
  text?: number;
  voiceSms?: string;
  [key: string]: any; // extra optional fields
}

export interface EsimFilters {
  priceRange: [number, number];
  planSize?: string;
  validity?: string;
  voice?: number;
  text?: number;
  voiceSms?: string;
  sortBy?: 'cheapest' | 'mostData' | 'leastData' | 'lowestPricePerGB';
}

// 🔹 Extended type for calculations
interface EsimItemWithCalc extends EsimItem {
  netPriceNum: number;
  dataNum: number;
  pricePerGB: number;
  prices?: {
    recommended_retail_price?: Record<string, string>;
  };
}

// 🔹 Main filter and sort function
export const filterAndSortEsim = (
  esim: EsimItem[],
  filters: EsimFilters,
  currency: string
): EsimItemWithCalc[] => {
  if (!esim?.length) return [];

  const data: EsimItemWithCalc[] = esim
    .map((item) => ({
      ...item,
      netPriceNum: parseFloat(
        item.prices?.recommended_retail_price?.[currency] ?? '0'
      ),
      dataNum: parseFloat(item.data),
      pricePerGB:
        parseFloat(item.prices?.recommended_retail_price?.[currency] ?? '0') /
        parseFloat(item.data),
    }))
    .filter((item) => {
      return (
        item.netPriceNum >= filters.priceRange[0] &&
        item.netPriceNum <= filters.priceRange[1] &&
        (!filters.planSize || item.dataNum === parseFloat(filters.planSize)) &&
        (!filters.validity || item.day === parseInt(filters.validity)) &&
        (!filters.voiceSms || item.voiceSms === filters.voiceSms) &&
        (!filters.voice || item.voice === filters.voice) &&
        (!filters.text || item.text === filters.text)
      );
    });

  // 🔹 Sorting
  data.sort((a, b) => {
    switch (filters.sortBy) {
      case 'cheapest':
        return a.netPriceNum - b.netPriceNum;
      case 'mostData':
        return b.dataNum - a.dataNum;
      case 'leastData':
        return a.dataNum - b.dataNum;
      case 'lowestPricePerGB':
        return a.pricePerGB - b.pricePerGB;
      default:
        return 0;
    }
  });

  return data;
};
