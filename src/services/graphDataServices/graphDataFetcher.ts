"use client";
import { intradayData, weeklyData, dailyData } from "@/data/demo-graph-data";

const intradayDataArray = Object.entries(intradayData["Time Series (5min)"])
  .reverse()
  .map(([key, value]) => ({
    date: key,
    open: (value as { "1. open": string })["1. open"],
  }));

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

function fetchGraphData(
  idx: number,
  setXAxisData: any,
  setYAxisData: any
) {
  switch (idx) {
    case 0:
      setXAxisData(
        intradayDataArray.map((data) => data.date.split(" ")[1].slice(0, 5))
      );
      setYAxisData(intradayDataArray.map((data) => data.open));
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
