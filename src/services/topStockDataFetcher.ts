"use client";
import axios from "axios";
import useStockStore from "@/store/stockStore";
import { topGainerLoserData } from "@/data/demo-stock-data";

async function fetchTopStocks(setTopGainers: any, setTopLosers: any) {
  const API_ENDPOINT = `https://www.alphavantage.co/query?function=TOP_GAINERS_LOSERS&apikey=${process.env.NEXT_PUBLIC_API_KEY_D}`;

  const {
    topGainersZustand,
    topLosersZustand,
    setTopGainersZustand,
    setTopLosersZustand,
  } = useStockStore.getState();

  if (topGainersZustand.length !== 0) {
    setTopGainers(topGainersZustand);
    setTopLosers(topLosersZustand);
    return;
  }

  try {
    const res = await axios.get(API_ENDPOINT);
    if (
      Object.keys(res.data)[0] === "Note" ||
      Object.keys(res.data)[0] === "Information"
    ) {
      setTopGainers(topGainerLoserData.top_gainers);
      setTopLosers(topGainerLoserData.top_losers);
    } else {
      setTopGainers(res.data.top_gainers);
      setTopLosers(res.data.top_losers);
      setTopGainersZustand(res.data.top_gainers);
      setTopLosersZustand(res.data.top_losers);
    }
  } catch (error) {
    console.log(error);
  }
}

export default fetchTopStocks;
