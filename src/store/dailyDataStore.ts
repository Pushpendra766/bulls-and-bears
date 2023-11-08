import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

const dailyData = (set: any) => ({
  dailyDataZustand: [],
  addDailyDataZustand: (data: any) => {
    set((state: any) => ({
      dailyDataZustand: [data, ...state.dailyDataZustand],
    }));
  },
});

const useDailyData = create(
  devtools(
    persist(dailyData, {
      name: "dailyData",
    })
  )
);

export default useDailyData;
