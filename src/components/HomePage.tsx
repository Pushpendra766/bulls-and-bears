"use client";
import { useState, useEffect } from "react";
import StockCard from "./StockCard";
import fetchTopStocks from "@/services/topStockDataFetcher";

const HomePage = () => {
  const [current, setCurrent] = useState("gainer");
  const [topGainers, setTopGainers] = useState<any[]>([]);
  const [topLosers, setTopLosers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchTopStocks(setTopGainers, setTopLosers)
      .then(() => {
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  return (
    <div className="mx-10 lg:mx-20 xl:mx-40 pt-5">
      <div className="flex gap-6">
        <button
          onClick={() => setCurrent("gainer")}
          className={`pb-2 ${
            current === "gainer" &&
            "font-bold border-black border-b-2 dark:border-slate-500"
          }`}
        >
          Top Gainers
        </button>
        <button
          onClick={() => setCurrent("loser")}
          className={`pb-2 ${
            current === "loser" &&
            "font-bold border-black border-b-2 dark:border-slate-500"
          }`}
        >
          Top Losers
        </button>
      </div>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4  mt-10">
        {loading
          ? "Loading..."
          : current === "gainer"
          ? topGainers &&
            topGainers.map((stock, idx) => {
              return <StockCard data={stock} key={idx} />;
            })
          : topLosers &&
            topLosers.map((stock, idx) => {
              return <StockCard data={stock} key={idx} />;
            })}
      </div>
      <div className="w-40 mx-auto my-10">
        <button>Load More</button>
      </div>
    </div>
  );
};

export default HomePage;
