"use client";
import { Line } from "react-chartjs-2";
import { useState } from "react";
import { intradayData, weeklyData, dailyData } from "@/data/demo-graph-data";

import {
  Chart as ChartJS,
  LineElement,
  CategoryScale, // x axis
  LinearScale, // y axis
  PointElement,
  Legend,
  Tooltip,
  Filler,
} from "chart.js";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Tooltip,
  Filler
);

function StockGraph() {
  const intradayDataArray = Object.entries(intradayData["Time Series (5min)"])
    .reverse()
    .map(([key, value]) => ({
      date: key,
      open: value["1. open"],
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

  const durationBtns = ["1D", "2W", "1M", "3M", "6M", "1Y"];
  const [activeDurationBtn, setActiveDurationBtn] = useState(0);

  const [xAxisData, setXAxisData] = useState(
    intradayDataArray.map((data) => data.date.split(" ")[1].slice(0, 5))
  );
  const [yAxisData, setYAxisData] = useState(
    intradayDataArray.map((data) => data.open)
  );

  const [isGainer, setIsGainer] = useState(
    Number(yAxisData[yAxisData.length - 1]) - Number(yAxisData[0]) > 0
  );

  const handleDurationChange = (idx: any) => {
    setActiveDurationBtn(idx);
    if (idx === 0) {
      setXAxisData(
        intradayDataArray.map((data) => data.date.split(" ")[1].slice(0, 5))
      );
      setYAxisData(intradayDataArray.map((data) => data.open));
    } else if (idx === 4 || idx === 5) {
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
    } else if (idx === 1 || idx === 2) {
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
    } else if (idx === 3) {
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
    }
    setIsGainer(
      Number(yAxisData[yAxisData.length - 1]) - Number(yAxisData[0]) > 0
    );
  };

  const data = {
    labels: xAxisData,
    datasets: [
      {
        label: "Stock Price",
        data: yAxisData,
        borderColor:
          Number(yAxisData[yAxisData.length - 1]) - Number(yAxisData[0]) > 0
            ? "green"
            : "red",
        borderWidth: 1,
        pointRadius: 2,
        tension: 0,
      },
    ],
  };

  return (
    <div className="border-2 rounded-md">
      <div className="lg:px-20 cursor-pointer">
        <Line data={data}></Line>
      </div>
      <div className="flex justify-center py-4">
        <div className="flex gap-2 md:gap-4 border-2 px-2 md:px-6 rounded-full py-2">
          {durationBtns.map((button, idx) => {
            return (
              <button
                className={`${
                  idx === activeDurationBtn && "bg-blue-300"
                } px-2 rounded-full text-sm md:text-base`}
                key={idx}
                onClick={() => handleDurationChange(idx)}
              >
                {button}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default StockGraph;
