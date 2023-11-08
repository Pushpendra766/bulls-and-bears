import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

const intradayData = (set: any) => ({
  intradayDataZustand: [],
  addIntradayDataZustand: (data: any) => {
    set((state: any) => ({
      intradayDataZustand: [data, ...state.intradayDataZustand],
    }));
  },
});

const useIntradayData = create(
  devtools(
    persist(intradayData, {
      name: "intradayData",
    })
  )
);

export default useIntradayData;
