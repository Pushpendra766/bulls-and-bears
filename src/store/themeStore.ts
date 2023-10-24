import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

const themeData = (set: any) => ({
  themeZustand: "light",
  toggleThemeZustand: (themeData: any) => {
    set((state: any) => ({
      themeZustand: themeData === "light" ? "dark" : "light",
    }));
  },
});

const useThemeZustand = create(
  devtools(
    persist(themeData, {
      name: "theme",
    })
  )
);

export default useThemeZustand;
