"use client";
import { weeklyData, dailyData } from "@/data/demo-graph-data";
import fetchIntradayData from "./graphDataServices/intradayDataFetcher";

const dailyDataArray = Object.entries(dailyData["Time Series (Daily)"]).map(
  ([key, value]) => ({
    date: key,
    open: value["1. open"],
  })
);

const weeklyDataArray = Object.entries(weeklyData["Weekly Time Series"]).map(
  ([key, value]) => ({
    date: key,
    open: value["1. open"],
  })
);

function fetchGraphData(idx: number, setXAxisData: any, setYAxisData: any) {
  switch (idx) {
    case 0:
      fetchIntradayData(setXAxisData, setYAxisData);
      break;
    case 1:
    case 2:
      setXAxisData(
        dailyDataArray
          .slice(0, 15 * idx)
          .reverse()
          .map((data) => data.date)
      );
      setYAxisData(
        dailyDataArray
          .slice(0, 15 * idx)
          .reverse()
          .map((data) => data.open)
      );
      break;
    case 3:
      setXAxisData(
        dailyDataArray
          .slice(0, 91)
          .reverse()
          .map((data) => data.date)
      );
      setYAxisData(
        dailyDataArray
          .slice(0, 91)
          .reverse()
          .map((data) => data.open)
      );
      break;
    case 4:
    case 5:
      setXAxisData(
        weeklyDataArray
          .slice(0, 30 * (idx - 3) + 1)
          .reverse()
          .map((data) => data.date)
      );
      setYAxisData(
        weeklyDataArray
          .slice(0, 30 * (idx - 3) + 1)
          .reverse()
          .map((data) => data.open)
      );
      break;
  }
}

export default fetchGraphData;
