import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

const weeklyData = (set: any) => ({
  weeklyDataZustand: [],
  addWeeklyDataZustand: (data: any) => {
    set((state: any) => ({
      weeklyDataZustand: [data, ...state.weeklyDataZustand],
    }));
  },
});

const useWeeklyData = create(
  devtools(
    persist(weeklyData, {
      name: "weeklyData",
    })
  )
);

export default useWeeklyData;
