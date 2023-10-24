import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

const basicStockData = (set: any) => ({
  basicDataZustand: [],
  addBasicDataZustand: (data: any) => {
    set((state: any) => ({
      basicDataZustand: [data, ...state.basicDataZustand],
    }));
  },
});

const useBasicStockData = create(
  devtools(
    persist(basicStockData, {
      name: "basicStockData",
    })
  )
);

export default useBasicStockData;
