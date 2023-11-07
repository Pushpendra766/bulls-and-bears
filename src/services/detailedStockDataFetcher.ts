"use client";
import axios from "axios";
import useDetailedStockData from "@/store/detailedStockData";
import { dummyDetailedData } from "@/data/demo-stock-data";

async function fetchDetailedStockData(
  ticker: string,
  setDetailedStockData: any
) {
  const DETAILED_DATA_ENDPOINT = `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${ticker}&apikey=${process.env.NEXT_PUBLIC_API_KEY_B}`;

  const { detailedDataZustand, addDetailedDataZustand } =
    useDetailedStockData.getState();

  const tickerZustand = detailedDataZustand.find(
    (item: any) => item.Symbol === ticker
  );

  if (tickerZustand) {
    setDetailedStockData(tickerZustand);
    return;
  }

  (async () => {
    try {
      const res = await axios.get(DETAILED_DATA_ENDPOINT);

      if (
        Object.keys(res.data)[0] === "Note" ||
        Object.keys(res.data)[0] === "Information"
      ) {
        console.log("Req exceeded: Detailed data");
        setDetailedStockData(dummyDetailedData);
      } else {
        addDetailedDataZustand(res.data);
        setDetailedStockData(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  })();
}

export default fetchDetailedStockData;
