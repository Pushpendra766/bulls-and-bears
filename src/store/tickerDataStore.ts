import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

const tickerDataStore = (set: any) => ({
  tickerDataZustand: [],
  addTickerZustand: (ticker: any) => {
    set((state: any) => ({
      tickerDataZustand: [ticker, ...state.tickerDataZustand],
    }));
  },
});

const useTickerDataStore = create(
  devtools(
    persist(tickerDataStore, {
      name: "tickerData",
    })
  )
);

export default useTickerDataStore;
