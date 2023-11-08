"use client";
import axios from "axios";
import useIntradayData from "@/store/intradayDataStore";
import { intradayData } from "@/data/demo-graph-data";

async function fetchIntradayData(setXAxisData: any, setYAxisData: any) {
  const INTRADAY_DATA_ENDPOINT = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&apikey=demo`;

  const { intradayDataZustand, addIntradayDataZustand } =
    useIntradayData.getState();

  const intradayZustand = intradayDataZustand.find(
    (item: any) => item["Meta Data"]["2. Symbol"] === "IBM"
  );

  if (intradayZustand) {
    const tempDataArray = Object.entries(intradayZustand["Time Series (5min)"])
      .reverse()
      .map(([key, value]) => ({
        date: key,
        open: (value as { "1. open": string })["1. open"],
      }));
    setXAxisData(
      tempDataArray.map((data) => data.date.split(" ")[1].slice(0, 5))
    );
    setYAxisData(tempDataArray.map((data) => data.open));
    return;
  }

  (async () => {
    try {
      const res = await axios.get(INTRADAY_DATA_ENDPOINT);
      if (
        Object.keys(res.data)[0] === "Note" ||
        Object.keys(res.data)[0] === "Information"
      ) {
        console.log("Req exceeded : Intraday Data");
        const tempDataArray = Object.entries(intradayData["Time Series (5min)"])
          .reverse()
          .map(([key, value]) => ({
            date: key,
            open: (value as { "1. open": string })["1. open"],
          }));
        setXAxisData(
          tempDataArray.map((data) => data.date.split(" ")[1].slice(0, 5))
        );
        setYAxisData(tempDataArray.map((data) => data.open));
      } else {
        addIntradayDataZustand(res.data);
        const tempDataArray = Object.entries(res.data["Time Series (5min)"])
          .reverse()
          .map(([key, value]) => ({
            date: key,
            open: (value as { "1. open": string })["1. open"],
          }));
        setXAxisData(
          tempDataArray.map((data) => data.date.split(" ")[1].slice(0, 5))
        );
        setYAxisData(tempDataArray.map((data) => data.open));
      }
    } catch (error) {
      console.log(error);
    }
  })();
}

export default fetchIntradayData;
