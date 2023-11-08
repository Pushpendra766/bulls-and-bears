"use client";
import axios from "axios";
import useDailyData from "@/store/dailyDataStore";
import { dailyData } from "@/data/demo-graph-data";

async function fetchDailyData(setXAxisData: any, setYAxisData: any) {
  const DAILY_DATA_ENDPOINT = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=IBM&apikey=demo`;

  const { dailyDataZustand, addDailyDataZustand } =
    useDailyData.getState();

  const dailyZustand = dailyDataZustand.find(
    (item: any) => item["Meta Data"]["2. Symbol"] === "IBM"
  );

  if (dailyZustand) {
    const tempDataArray = Object.entries(dailyZustand["Time Series (5min)"])
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
      const res = await axios.get(DAILY_DATA_ENDPOINT);
      if (
        Object.keys(res.data)[0] === "Note" ||
        Object.keys(res.data)[0] === "Information"
      ) {
        console.log("Req exceeded : Daily Data");
        const tempDataArray = Object.entries(dailyData["Time Series (Daily)"])
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
        addDailyDataZustand(res.data);
        const tempDataArray = Object.entries(res.data["Time Series (Daily)"])
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

export default fetchDailyData;
