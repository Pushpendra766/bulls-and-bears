"use client";
import axios from "axios";
import useBasicStockData from "@/store/basicStockDataStore";
import { dummyBasicData } from "@/data/demo-stock-data";

async function fetchBasicStockData(ticker: string, setBasicStockData: any) {
  const BASIC_DATA_ENDPOINT = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${ticker}&apikey=${process.env.NEXT_PUBLIC_API_KEY_A}`;

  const { basicDataZustand, addBasicDataZustand } =
    useBasicStockData.getState();

  const basicZustand = basicDataZustand.find(
    (item: any) => item.Symbol === ticker
  );

  if (basicZustand) {
    setBasicStockData(basicZustand);
    return;
  }

  (async () => {
    try {
      const res = await axios.get(BASIC_DATA_ENDPOINT);
      if (
        Object.keys(res.data)[0] === "Note" ||
        Object.keys(res.data)[0] === "Information"
      ) {
        console.log("Req exceeded : Basic Data");
        setBasicStockData(dummyBasicData["Global Quote"]);
      } else {
        addBasicDataZustand(res.data["Global Quote"]);
        setBasicStockData(res.data["Global Quote"]);
      }
    } catch (error) {
      console.log(error);
    }
  })();
}

export default fetchBasicStockData;
