"use client";

import { useState } from "react";
import StockCard from "./StockCard";

const HomePage = () => {
  const [current, setCurrent] = useState("gainer");
  return (
    <div className="mx-40 mt-5">
      <div className="flex gap-6">
        <button
          onClick={() => setCurrent("gainer")}
          className={`pb-2 ${
            current === "gainer" && "font-bold border-black border-b-2"
          }`}
        >
          Top Gainers
        </button>
        <button
          onClick={() => setCurrent("loser")}
          className={`pb-2 ${
            current === "loser" && "font-bold border-black border-b-2"
          }`}
        >
          Top Losers
        </button>
      </div>
      <div className="grid grid-cols-4 gap-4  mt-10">
        <StockCard />
        <StockCard />
        <StockCard />
        <StockCard />
        <StockCard />
        <StockCard />
        <StockCard />
        <StockCard />
        <StockCard />
        <StockCard />
        <StockCard />
        <StockCard />
        <StockCard />
        <StockCard />
        <StockCard />
        <StockCard />
        <StockCard />
        <StockCard />
        <StockCard />
        <StockCard />
      </div>
      <div className="w-40 mx-auto my-10">
        <button>Load More</button>
      </div>
    </div>
  );
};

export default HomePage;
