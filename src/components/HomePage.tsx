"use client";

import { useState, useEffect } from "react";
import StockCard from "./StockCard";
import axios from "axios";
import useStockStore from "@/store/stockStore";

const HomePage = () => {
  const {
    topGainersZustand,
    topLosersZustand,
    setTopGainersZustand,
    setTopLosersZustand,
  } = useStockStore.getState();

  const url =
    "https://www.alphavantage.co/query?function=TOP_GAINERS_LOSERS&apikey=demo";
  const [current, setCurrent] = useState("gainer");
  const [topGainers, setTopGainers] = useState([]);
  const [topLosers, setTopLosers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    console.table(topGainersZustand);
    if (topGainersZustand.length !== 0) {
      console.log("Getting data from zustand");
      setTopGainers(topGainersZustand);
      setTopLosers(topLosersZustand);
      return;
    }

    (async () => {
      try {
        setLoading(true);
        setError(false);

        const res = await axios.get(url);

        console.log("Getting data from API");
        setTopGainers(res.data.top_gainers);
        setTopLosers(res.data.top_losers);

        setTopGainersZustand(res.data.top_gainers);
        setTopLosersZustand(res.data.top_losers);

        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
        console.log(error);
      }
    })();
  }, []);

  return (
    <div className="mx-10 lg:mx-20 xl:mx-40 mt-5">
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
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4  mt-10">
        {loading
          ? "Loading..."
          : current === "gainer"
          ? topGainers.map((stock, idx) => {
              return <StockCard data={stock} key={idx} />;
            })
          : topLosers.map((stock, idx) => {
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
