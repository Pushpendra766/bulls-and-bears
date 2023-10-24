import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

const detailedStockData = (set: any) => ({
  detailedDataZustand: [],
  addDetailedDataZustand: (data: any) => {
    set((state: any) => ({
      detailedDataZustand: [data, ...state.detailedDataZustand],
    }));
  },
});

const useDetailedStockData = create(
  devtools(
    persist(detailedStockData, {
      name: "detailedStockData",
    })
  )
);

export default useDetailedStockData;
