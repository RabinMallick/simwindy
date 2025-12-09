import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "@/store/store";
import { esim } from "@/utils/simData";

// 🔹 Define ESIM item type
interface EsimItem {
    id: string;
    type: string;
    currency: string;
    netPrice: string;
    day: number;
    data: string;
    voice?: number | null;
    text?: number | null;
    voiceSms?: string;
    countries?: { countryCode: string; title: string; coverageCountry: string }[];
    [key: string]: any; // for extra fields
}

// 🔹 Extend ESIM item with calculated fields
interface EsimItemWithCalc extends EsimItem {
  netPriceNum: number;
  dataNum: number;
  pricePerGB: number;
  voice?: number | null;
  text?: number | null;
  prices?: {
    recommended_retail_price?: Record<string, string>;
  };
}


export const selectFilteredEsim = createSelector(
    [(state: RootState) => state.esim],
    (filters) => {
        if (!esim?.length) return [];

        // 🔹 Map data with calculated numeric values
        const data: EsimItemWithCalc[] = esim.map((item) => ({
            ...item,
            netPriceNum: parseFloat(item.netPrice),
            dataNum: parseFloat(item.data),
            pricePerGB: parseFloat(item.netPrice) / parseFloat(item.data),
        }));

        // 🔹 Filter based on Redux filters
        const filtered = data.filter((item) => {
            return (
                item.netPriceNum >= filters.priceRange[0] &&
                item.netPriceNum <= filters.priceRange[1] &&
                (!filters.planSize || item.dataNum === parseFloat(String(filters.planSize))) &&
                (!filters.validity || item.day === parseInt(String(filters.validity))) &&
                (!filters.voiceSms || item.voiceSms === String(filters.voiceSms)) &&
                (!filters.voice || item.voice === filters.voice) &&
                (!filters.text || item.text === filters.text)
            );
        });

        // 🔹 Sort based on Redux sortBy filter
        filtered.sort((a, b) => {
            switch (filters.sortBy) {
                case "cheapest":
                    return a.netPriceNum - b.netPriceNum;
                case "mostData":
                    return b.dataNum - a.dataNum;
                case "lowestPricePerGB":
                    return a.pricePerGB - b.pricePerGB;
                default:
                    return 0;
            }
        });

        return filtered;
    }
);
