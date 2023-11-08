"use client";
import { Line } from "react-chartjs-2";
import { useState, useEffect } from "react";
import fetchGraphData from "@/services/graphDataFetcher";

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
  const durationBtns = ["1D", "2W", "1M", "3M", "6M", "1Y"];
  const [activeDurationBtn, setActiveDurationBtn] = useState(0);

  const [xAxisData, setXAxisData] = useState([]);
  const [yAxisData, setYAxisData] = useState([]);

  const handleDurationChange = (idx: any) => {
    setActiveDurationBtn(idx);
    fetchGraphData(idx, setXAxisData, setYAxisData);
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

  useEffect(() => {
    fetchGraphData(0, setXAxisData, setYAxisData);
  }, []);

  return (
    <div className="border-2 rounded-md dark:border-slate-600">
      <div className="lg:px-20 cursor-pointer">
        <Line data={data}></Line>
      </div>
      <div className="flex justify-center py-4">
        <div className="flex gap-2 md:gap-4 border-2 px-2 md:px-6 rounded-full py-2 dark:border-slate-600">
          {durationBtns.map((button, idx) => {
            return (
              <button
                className={`${
                  idx === activeDurationBtn && "bg-blue-300 dark:text-black"
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
