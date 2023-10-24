"use client";
import Image from "next/image";
import Link from "next/link";
import SearchBar from "./SearchBar";
import { useTheme } from "next-themes";
import { BsFillMoonFill, BsFillSunFill } from "react-icons/bs";
import useThemeZustand from "@/store/themeStore";
import { useEffect } from "react";

export default function Navbar() {
  const { themeZustand, toggleThemeZustand } = useThemeZustand.getState();
  const { theme, setTheme } = useTheme();
  useEffect(() => {
    setTheme(themeZustand);
  }, []);

  return (
    <div className="flex gap-6 md:gap-10 lg:gap-20 dark:bg-slate-900 px-4 md:px-10 lg:px-20 xl:px-40 py-5 border-b dark:border-slate-600">
      <Link href="/">
        <div className="flex gap-2 lg:gap-4">
          <Image
            src="/icons/bullsandbears.png"
            width={40}
            height={40}
            alt="Bulls & Bears Icon"
          />
          <h1 className="hidden lg:flex text-xl pt-2 font-bold whitespace-nowrap">
            Bulls & Bears
          </h1>
          <h1 className="lg:hidden text-xl whitespace-nowrap pt-2 font-bold">
            B&B
          </h1>
        </div>
      </Link>
      <div></div>
      <SearchBar />
      <button
        className={`px-3 font-semibold text-white rounded-full`}
        onClick={() => {
          setTheme(theme === "dark" ? "light" : "dark");
          toggleThemeZustand(theme);
        }}
      >
        {theme === "dark" ? (
          <BsFillSunFill color="#fff" size={20} />
        ) : (
          <BsFillMoonFill color="#000" size={20} />
        )}
      </button>
    </div>
  );
}
