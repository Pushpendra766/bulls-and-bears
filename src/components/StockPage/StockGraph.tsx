"use client";
import { Line } from "react-chartjs-2";

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
  const timeSeriesArray = Object.entries(dailyData["Time Series (5min)"])
    .reverse()
    .map(([key, value]) => ({
      date: key,
      open: value["1. open"],
      close: value["4. close"],
    }));

  const data = {
    labels: timeSeriesArray.map((data) => data.date.split(" ")[1].slice(0, 5)),
    datasets: [
      {
        label: "Stock Price",
        data: timeSeriesArray.map((data) => data.open),
        borderColor: "red",
        borderWidth: 1,
        pointRadius:0,
        tension: 0,
      },
    ],
  };

  // const options = {
  //   plugins: {
  //     legend: {
  //       display: true,
  //     },
  //   },
  //   responsive: true,
  //   scales: {
  //     y: {
  //       ticks: {
  //         font: {
  //           size: 17,
  //           weight: "bold",
  //         },
  //       },
  //       title: {
  //         display: true,
  //         text: "Sales",
  //         padding: {
  //           bottom: 10,
  //         },
  //         font: {
  //           size: 30,
  //           style: "italic",
  //           family: "Arial",
  //         },
  //       },
  //       min: 50,
  //     },
  //     x: {
  //       ticks: {
  //         font: {
  //           size: 17,
  //           weight: "bold",
  //         },
  //       },
  //       title: {
  //         display: true,
  //         text: "Month",
  //         padding: {
  //           top: 10,
  //         },
  //         font: {
  //           size: 30,
  //           style: "italic",
  //           family: "Arial",
  //         },
  //       },
  //     },
  //   },
  // };

  return (
    <div className="border-2 rounded-md">
      <div className="lg:px-20 cursor-pointer">
        <Line data={data}></Line>
      </div>
      <div className="flex justify-center py-4">
        <div className="flex gap-4 border-2 px-6 rounded-full py-2">
          <button>1D</button>
          <button>1W</button>
          <button>1M</button>
          <button>3M</button>
          <button>6M</button>
          <button>1Y</button>
        </div>
      </div>
    </div>
  );
}

export default StockGraph;

const dailyData = {
  "Meta Data": {
    "1. Information":
      "Intraday (5min) open, high, low, close prices and volume",
    "2. Symbol": "IBM",
    "3. Last Refreshed": "2023-10-20 19:55:00",
    "4. Interval": "5min",
    "5. Output Size": "Compact",
    "6. Time Zone": "US/Eastern",
  },
  "Time Series (5min)": {
    "2023-10-20 19:55:00": {
      "1. open": "137.1500",
      "2. high": "137.1500",
      "3. low": "137.1000",
      "4. close": "137.1000",
      "5. volume": "26",
    },
    "2023-10-20 19:35:00": {
      "1. open": "137.0700",
      "2. high": "137.0700",
      "3. low": "137.0700",
      "4. close": "137.0700",
      "5. volume": "1",
    },
    "2023-10-20 19:30:00": {
      "1. open": "137.1500",
      "2. high": "137.1500",
      "3. low": "137.1500",
      "4. close": "137.1500",
      "5. volume": "18",
    },
    "2023-10-20 19:25:00": {
      "1. open": "137.3500",
      "2. high": "137.3500",
      "3. low": "137.2800",
      "4. close": "137.2800",
      "5. volume": "11",
    },
    "2023-10-20 19:15:00": {
      "1. open": "137.3300",
      "2. high": "137.3300",
      "3. low": "137.3300",
      "4. close": "137.3300",
      "5. volume": "1",
    },
    "2023-10-20 19:00:00": {
      "1. open": "137.1600",
      "2. high": "137.1600",
      "3. low": "137.0100",
      "4. close": "137.0100",
      "5. volume": "609930",
    },
    "2023-10-20 18:55:00": {
      "1. open": "137.3400",
      "2. high": "137.3400",
      "3. low": "137.0100",
      "4. close": "137.0100",
      "5. volume": "16",
    },
    "2023-10-20 18:50:00": {
      "1. open": "137.0100",
      "2. high": "137.0100",
      "3. low": "137.0100",
      "4. close": "137.0100",
      "5. volume": "15",
    },
    "2023-10-20 18:40:00": {
      "1. open": "137.0400",
      "2. high": "137.0400",
      "3. low": "137.0400",
      "4. close": "137.0400",
      "5. volume": "13",
    },
    "2023-10-20 18:35:00": {
      "1. open": "137.3500",
      "2. high": "137.3500",
      "3. low": "137.0500",
      "4. close": "137.0700",
      "5. volume": "28",
    },
    "2023-10-20 18:30:00": {
      "1. open": "137.1600",
      "2. high": "137.1600",
      "3. low": "137.1600",
      "4. close": "137.1600",
      "5. volume": "609879",
    },
    "2023-10-20 18:15:00": {
      "1. open": "137.0100",
      "2. high": "137.0410",
      "3. low": "137.0100",
      "4. close": "137.0410",
      "5. volume": "46",
    },
    "2023-10-20 18:05:00": {
      "1. open": "137.2700",
      "2. high": "137.3400",
      "3. low": "137.0160",
      "4. close": "137.0160",
      "5. volume": "65",
    },
    "2023-10-20 18:00:00": {
      "1. open": "137.4000",
      "2. high": "137.4000",
      "3. low": "137.4000",
      "4. close": "137.4000",
      "5. volume": "2",
    },
    "2023-10-20 17:55:00": {
      "1. open": "137.0700",
      "2. high": "137.0700",
      "3. low": "137.0700",
      "4. close": "137.0700",
      "5. volume": "1",
    },
    "2023-10-20 17:40:00": {
      "1. open": "137.0100",
      "2. high": "137.0100",
      "3. low": "137.0100",
      "4. close": "137.0100",
      "5. volume": "5",
    },
    "2023-10-20 17:35:00": {
      "1. open": "137.0100",
      "2. high": "137.0100",
      "3. low": "137.0100",
      "4. close": "137.0100",
      "5. volume": "1",
    },
    "2023-10-20 17:30:00": {
      "1. open": "137.0120",
      "2. high": "137.0120",
      "3. low": "137.0120",
      "4. close": "137.0120",
      "5. volume": "25",
    },
    "2023-10-20 17:20:00": {
      "1. open": "137.3400",
      "2. high": "137.3400",
      "3. low": "137.3400",
      "4. close": "137.3400",
      "5. volume": "1",
    },
    "2023-10-20 17:15:00": {
      "1. open": "137.3900",
      "2. high": "137.3900",
      "3. low": "137.0100",
      "4. close": "137.0100",
      "5. volume": "7",
    },
    "2023-10-20 17:10:00": {
      "1. open": "137.1700",
      "2. high": "137.1800",
      "3. low": "137.0700",
      "4. close": "137.0700",
      "5. volume": "105",
    },
    "2023-10-20 17:05:00": {
      "1. open": "137.4000",
      "2. high": "137.4000",
      "3. low": "137.1600",
      "4. close": "137.1800",
      "5. volume": "313",
    },
    "2023-10-20 16:55:00": {
      "1. open": "137.1600",
      "2. high": "137.1600",
      "3. low": "137.1600",
      "4. close": "137.1600",
      "5. volume": "12485",
    },
    "2023-10-20 16:50:00": {
      "1. open": "137.3800",
      "2. high": "137.3800",
      "3. low": "137.3800",
      "4. close": "137.3800",
      "5. volume": "2",
    },
    "2023-10-20 16:40:00": {
      "1. open": "137.0000",
      "2. high": "137.0000",
      "3. low": "137.0000",
      "4. close": "137.0000",
      "5. volume": "80",
    },
    "2023-10-20 16:35:00": {
      "1. open": "137.3800",
      "2. high": "137.4300",
      "3. low": "137.3800",
      "4. close": "137.4300",
      "5. volume": "791",
    },
    "2023-10-20 16:30:00": {
      "1. open": "137.4000",
      "2. high": "137.4000",
      "3. low": "137.4000",
      "4. close": "137.4000",
      "5. volume": "5",
    },
    "2023-10-20 16:25:00": {
      "1. open": "137.1400",
      "2. high": "138.2000",
      "3. low": "137.1400",
      "4. close": "138.2000",
      "5. volume": "20",
    },
    "2023-10-20 16:20:00": {
      "1. open": "137.1600",
      "2. high": "137.1600",
      "3. low": "137.0000",
      "4. close": "137.0000",
      "5. volume": "7366",
    },
    "2023-10-20 16:15:00": {
      "1. open": "137.1600",
      "2. high": "137.1600",
      "3. low": "137.0000",
      "4. close": "137.0000",
      "5. volume": "301",
    },
    "2023-10-20 16:10:00": {
      "1. open": "137.1600",
      "2. high": "137.1600",
      "3. low": "137.1600",
      "4. close": "137.1600",
      "5. volume": "609879",
    },
    "2023-10-20 16:05:00": {
      "1. open": "137.1600",
      "2. high": "137.1600",
      "3. low": "137.1600",
      "4. close": "137.1600",
      "5. volume": "2431",
    },
    "2023-10-20 16:00:00": {
      "1. open": "137.1300",
      "2. high": "137.3000",
      "3. low": "136.9400",
      "4. close": "137.0000",
      "5. volume": "1544264",
    },
    "2023-10-20 15:55:00": {
      "1. open": "137.2300",
      "2. high": "137.3600",
      "3. low": "137.1200",
      "4. close": "137.1600",
      "5. volume": "264696",
    },
    "2023-10-20 15:50:00": {
      "1. open": "137.2500",
      "2. high": "137.3150",
      "3. low": "137.1850",
      "4. close": "137.2300",
      "5. volume": "141377",
    },
    "2023-10-20 15:45:00": {
      "1. open": "137.2000",
      "2. high": "137.3050",
      "3. low": "137.1300",
      "4. close": "137.2900",
      "5. volume": "83925",
    },
    "2023-10-20 15:40:00": {
      "1. open": "137.3800",
      "2. high": "137.3800",
      "3. low": "137.2000",
      "4. close": "137.2100",
      "5. volume": "62707",
    },
    "2023-10-20 15:35:00": {
      "1. open": "137.3500",
      "2. high": "137.4750",
      "3. low": "137.2900",
      "4. close": "137.3900",
      "5. volume": "34536",
    },
    "2023-10-20 15:30:00": {
      "1. open": "137.3550",
      "2. high": "137.4000",
      "3. low": "137.2720",
      "4. close": "137.3600",
      "5. volume": "40531",
    },
    "2023-10-20 15:25:00": {
      "1. open": "137.2500",
      "2. high": "137.3900",
      "3. low": "137.2100",
      "4. close": "137.3600",
      "5. volume": "32237",
    },
    "2023-10-20 15:20:00": {
      "1. open": "137.5700",
      "2. high": "137.5700",
      "3. low": "137.2500",
      "4. close": "137.2500",
      "5. volume": "31879",
    },
    "2023-10-20 15:15:00": {
      "1. open": "137.2900",
      "2. high": "137.6200",
      "3. low": "137.2500",
      "4. close": "137.5950",
      "5. volume": "55610",
    },
    "2023-10-20 15:10:00": {
      "1. open": "137.3400",
      "2. high": "137.3700",
      "3. low": "137.1600",
      "4. close": "137.3100",
      "5. volume": "35534",
    },
    "2023-10-20 15:05:00": {
      "1. open": "137.3600",
      "2. high": "137.4300",
      "3. low": "137.3500",
      "4. close": "137.3500",
      "5. volume": "30827",
    },
    "2023-10-20 15:00:00": {
      "1. open": "137.3200",
      "2. high": "137.4800",
      "3. low": "137.3000",
      "4. close": "137.3600",
      "5. volume": "29841",
    },
    "2023-10-20 14:55:00": {
      "1. open": "137.3700",
      "2. high": "137.4900",
      "3. low": "137.2900",
      "4. close": "137.3260",
      "5. volume": "28485",
    },
    "2023-10-20 14:50:00": {
      "1. open": "137.3800",
      "2. high": "137.4350",
      "3. low": "137.3400",
      "4. close": "137.3500",
      "5. volume": "30588",
    },
    "2023-10-20 14:45:00": {
      "1. open": "137.4900",
      "2. high": "137.5880",
      "3. low": "137.3900",
      "4. close": "137.3900",
      "5. volume": "51762",
    },
    "2023-10-20 14:40:00": {
      "1. open": "137.4750",
      "2. high": "137.5100",
      "3. low": "137.3800",
      "4. close": "137.4900",
      "5. volume": "20351",
    },
    "2023-10-20 14:35:00": {
      "1. open": "137.3250",
      "2. high": "137.5200",
      "3. low": "137.3050",
      "4. close": "137.4800",
      "5. volume": "39673",
    },
    "2023-10-20 14:30:00": {
      "1. open": "137.1900",
      "2. high": "137.3500",
      "3. low": "137.1200",
      "4. close": "137.3100",
      "5. volume": "27226",
    },
    "2023-10-20 14:25:00": {
      "1. open": "137.2300",
      "2. high": "137.2400",
      "3. low": "137.1600",
      "4. close": "137.1950",
      "5. volume": "31380",
    },
    "2023-10-20 14:20:00": {
      "1. open": "137.2700",
      "2. high": "137.3100",
      "3. low": "137.2300",
      "4. close": "137.2300",
      "5. volume": "74442",
    },
    "2023-10-20 14:15:00": {
      "1. open": "137.4300",
      "2. high": "137.4600",
      "3. low": "137.2500",
      "4. close": "137.2700",
      "5. volume": "68607",
    },
    "2023-10-20 14:10:00": {
      "1. open": "137.6600",
      "2. high": "137.6600",
      "3. low": "137.4300",
      "4. close": "137.4600",
      "5. volume": "29887",
    },
    "2023-10-20 14:05:00": {
      "1. open": "137.6850",
      "2. high": "137.7400",
      "3. low": "137.5600",
      "4. close": "137.6700",
      "5. volume": "25496",
    },
    "2023-10-20 14:00:00": {
      "1. open": "137.8200",
      "2. high": "137.8350",
      "3. low": "137.6900",
      "4. close": "137.6900",
      "5. volume": "32418",
    },
    "2023-10-20 13:55:00": {
      "1. open": "137.6600",
      "2. high": "137.8200",
      "3. low": "137.6400",
      "4. close": "137.8100",
      "5. volume": "46841",
    },
    "2023-10-20 13:50:00": {
      "1. open": "137.5900",
      "2. high": "137.6500",
      "3. low": "137.5400",
      "4. close": "137.6500",
      "5. volume": "30612",
    },
    "2023-10-20 13:45:00": {
      "1. open": "137.7500",
      "2. high": "137.7600",
      "3. low": "137.5600",
      "4. close": "137.5850",
      "5. volume": "38286",
    },
    "2023-10-20 13:40:00": {
      "1. open": "137.6500",
      "2. high": "137.8040",
      "3. low": "137.6500",
      "4. close": "137.7400",
      "5. volume": "26389",
    },
    "2023-10-20 13:35:00": {
      "1. open": "137.8000",
      "2. high": "137.8200",
      "3. low": "137.6100",
      "4. close": "137.6400",
      "5. volume": "24789",
    },
    "2023-10-20 13:30:00": {
      "1. open": "137.8200",
      "2. high": "137.8700",
      "3. low": "137.6900",
      "4. close": "137.8100",
      "5. volume": "33019",
    },
    "2023-10-20 13:25:00": {
      "1. open": "138.0100",
      "2. high": "138.0100",
      "3. low": "137.8000",
      "4. close": "137.8100",
      "5. volume": "29110",
    },
    "2023-10-20 13:20:00": {
      "1. open": "138.0850",
      "2. high": "138.0850",
      "3. low": "137.9100",
      "4. close": "138.0180",
      "5. volume": "29765",
    },
    "2023-10-20 13:15:00": {
      "1. open": "137.7360",
      "2. high": "138.1700",
      "3. low": "137.6800",
      "4. close": "138.0950",
      "5. volume": "61260",
    },
    "2023-10-20 13:10:00": {
      "1. open": "137.8500",
      "2. high": "137.8900",
      "3. low": "137.7400",
      "4. close": "137.7400",
      "5. volume": "51003",
    },
    "2023-10-20 13:05:00": {
      "1. open": "138.0300",
      "2. high": "138.0300",
      "3. low": "137.8500",
      "4. close": "137.8600",
      "5. volume": "247628",
    },
    "2023-10-20 13:00:00": {
      "1. open": "138.3400",
      "2. high": "138.3400",
      "3. low": "138.0200",
      "4. close": "138.0300",
      "5. volume": "28068",
    },
    "2023-10-20 12:55:00": {
      "1. open": "138.1600",
      "2. high": "138.3900",
      "3. low": "138.1600",
      "4. close": "138.3300",
      "5. volume": "39883",
    },
    "2023-10-20 12:50:00": {
      "1. open": "138.3200",
      "2. high": "138.3200",
      "3. low": "138.1500",
      "4. close": "138.1600",
      "5. volume": "41288",
    },
    "2023-10-20 12:45:00": {
      "1. open": "138.1150",
      "2. high": "138.3200",
      "3. low": "138.1100",
      "4. close": "138.3100",
      "5. volume": "34763",
    },
    "2023-10-20 12:40:00": {
      "1. open": "138.3700",
      "2. high": "138.3700",
      "3. low": "138.1100",
      "4. close": "138.1200",
      "5. volume": "42118",
    },
    "2023-10-20 12:35:00": {
      "1. open": "138.2600",
      "2. high": "138.4100",
      "3. low": "138.2200",
      "4. close": "138.3600",
      "5. volume": "54483",
    },
    "2023-10-20 12:30:00": {
      "1. open": "138.3000",
      "2. high": "138.3600",
      "3. low": "138.2600",
      "4. close": "138.2600",
      "5. volume": "28206",
    },
    "2023-10-20 12:25:00": {
      "1. open": "138.4700",
      "2. high": "138.4700",
      "3. low": "138.2850",
      "4. close": "138.2900",
      "5. volume": "33554",
    },
    "2023-10-20 12:20:00": {
      "1. open": "138.3300",
      "2. high": "138.4500",
      "3. low": "138.2900",
      "4. close": "138.4500",
      "5. volume": "34255",
    },
    "2023-10-20 12:15:00": {
      "1. open": "138.2700",
      "2. high": "138.3800",
      "3. low": "138.2400",
      "4. close": "138.3300",
      "5. volume": "22058",
    },
    "2023-10-20 12:10:00": {
      "1. open": "138.2800",
      "2. high": "138.3070",
      "3. low": "138.2400",
      "4. close": "138.2600",
      "5. volume": "21501",
    },
    "2023-10-20 12:05:00": {
      "1. open": "138.3100",
      "2. high": "138.3200",
      "3. low": "138.1500",
      "4. close": "138.2800",
      "5. volume": "22909",
    },
    "2023-10-20 12:00:00": {
      "1. open": "138.4800",
      "2. high": "138.4900",
      "3. low": "138.2000",
      "4. close": "138.3500",
      "5. volume": "41073",
    },
    "2023-10-20 11:55:00": {
      "1. open": "138.4300",
      "2. high": "138.5200",
      "3. low": "138.4300",
      "4. close": "138.4700",
      "5. volume": "29019",
    },
    "2023-10-20 11:50:00": {
      "1. open": "138.5400",
      "2. high": "138.5400",
      "3. low": "138.3590",
      "4. close": "138.4300",
      "5. volume": "20112",
    },
    "2023-10-20 11:45:00": {
      "1. open": "138.3200",
      "2. high": "138.5300",
      "3. low": "138.2600",
      "4. close": "138.5200",
      "5. volume": "41622",
    },
    "2023-10-20 11:40:00": {
      "1. open": "138.5700",
      "2. high": "138.5700",
      "3. low": "138.3300",
      "4. close": "138.3300",
      "5. volume": "44627",
    },
    "2023-10-20 11:35:00": {
      "1. open": "138.5200",
      "2. high": "138.6350",
      "3. low": "138.4700",
      "4. close": "138.5700",
      "5. volume": "57648",
    },
    "2023-10-20 11:30:00": {
      "1. open": "138.4350",
      "2. high": "138.5300",
      "3. low": "138.3300",
      "4. close": "138.5150",
      "5. volume": "38820",
    },
    "2023-10-20 11:25:00": {
      "1. open": "138.4600",
      "2. high": "138.5000",
      "3. low": "138.3400",
      "4. close": "138.4500",
      "5. volume": "41724",
    },
    "2023-10-20 11:20:00": {
      "1. open": "138.6000",
      "2. high": "138.6000",
      "3. low": "138.4100",
      "4. close": "138.4600",
      "5. volume": "24008",
    },
    "2023-10-20 11:15:00": {
      "1. open": "138.7000",
      "2. high": "138.7300",
      "3. low": "138.4700",
      "4. close": "138.6000",
      "5. volume": "48404",
    },
    "2023-10-20 11:10:00": {
      "1. open": "138.6100",
      "2. high": "138.7200",
      "3. low": "138.5300",
      "4. close": "138.6900",
      "5. volume": "45921",
    },
    "2023-10-20 11:05:00": {
      "1. open": "138.5300",
      "2. high": "138.6400",
      "3. low": "138.5150",
      "4. close": "138.6300",
      "5. volume": "36508",
    },
    "2023-10-20 11:00:00": {
      "1. open": "138.3300",
      "2. high": "138.6000",
      "3. low": "138.3100",
      "4. close": "138.5400",
      "5. volume": "88771",
    },
    "2023-10-20 10:55:00": {
      "1. open": "138.4800",
      "2. high": "138.5320",
      "3. low": "138.3100",
      "4. close": "138.3400",
      "5. volume": "20067",
    },
    "2023-10-20 10:50:00": {
      "1. open": "138.5330",
      "2. high": "138.5330",
      "3. low": "138.4100",
      "4. close": "138.4900",
      "5. volume": "30529",
    },
    "2023-10-20 10:45:00": {
      "1. open": "138.4190",
      "2. high": "138.5800",
      "3. low": "138.3600",
      "4. close": "138.5200",
      "5. volume": "22680",
    },
    "2023-10-20 10:40:00": {
      "1. open": "138.4750",
      "2. high": "138.5100",
      "3. low": "138.3300",
      "4. close": "138.4100",
      "5. volume": "35124",
    },
    "2023-10-20 10:35:00": {
      "1. open": "138.5450",
      "2. high": "138.6150",
      "3. low": "138.4400",
      "4. close": "138.4900",
      "5. volume": "25901",
    },
    "2023-10-20 10:30:00": {
      "1. open": "138.5400",
      "2. high": "138.6200",
      "3. low": "138.3600",
      "4. close": "138.5600",
      "5. volume": "39370",
    },
    "2023-10-20 10:25:00": {
      "1. open": "138.4500",
      "2. high": "138.6300",
      "3. low": "138.4500",
      "4. close": "138.5650",
      "5. volume": "22317",
    },
  },
};