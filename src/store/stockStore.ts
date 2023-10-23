import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

type Stock = {
  ticker: string;
  price: string;
  change_amount: string;
};

type StockStore = {
  topGainers: Stock[];
  topLosers: Stock[];
  setTopGainers: (data: Stock[]) => void;
  setTopLosers: (data: Stock[]) => void;
};

const stockStore = (set: any) => ({
  topGainersZustand: [],
  topLosersZustand: [],
  setTopGainersZustand: (data: Stock[]) => set({ topGainersZustand: data }),
  setTopLosersZustand: (data: Stock[]) => set({ topLosersZustand: data }),
});

const useStockStore = create(
  devtools(
    persist(stockStore, {
      name: "stocks",
    })
  )
);

export default useStockStore;
