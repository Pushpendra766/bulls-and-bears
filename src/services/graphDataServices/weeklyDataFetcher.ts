"use client";
import axios from "axios";
import useWeeklyData from "@/store/weeklyDataStore";
import { weeklyData } from "@/data/demo-graph-data";

async function fetchWeeklyData(setXAxisData: any, setYAxisData: any) {
  const WEEKLY_DATA_ENDPOINT = `https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY&symbol=IBM&apikey=demo`;

  const { weeklyDataZustand, addWeeklyDataZustand } = useWeeklyData.getState();

  const weeklyZustand = weeklyDataZustand.find(
    (item: any) => item["Meta Data"]["2. Symbol"] === "IBM"
  );

  if (weeklyZustand) {
    const tempDataArray = Object.entries(weeklyZustand["Time Series (5min)"])
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
      const res = await axios.get(WEEKLY_DATA_ENDPOINT);
      if (
        Object.keys(res.data)[0] === "Note" ||
        Object.keys(res.data)[0] === "Information"
      ) {
        console.log("Req exceeded : Weekly Data");
        const tempDataArray = Object.entries(weeklyData["Weekly Time Series"])
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
        addWeeklyDataZustand(res.data);
        const tempDataArray = Object.entries(res.data["Weekly Time Series"])
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

export default fetchWeeklyData;
