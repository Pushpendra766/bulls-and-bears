"use client";
import { useEffect, useState } from "react";
import StockHeader from "@/components/StockPage/StockHeader";
import StockDetails from "@/components/StockPage/StockDetails";
import StockGraph from "@/components/StockPage/StockGraph";
import fetchBasicStockData from "@/services/basicStockDataFetcher";
import fetchDetailedStockData from "@/services/detailedStockDataFetcher";

type BasicStockData = {
  "01. symbol": string;
  "05. price": string;
  "09. change": string;
};

type DetailedStockData = {
  Symbol: string;
  AssetType: string;
  Exchange: string;
  Name: string;
  Description: string;
  Sector: string;
  Industry: string;
  MarketCapitalization: string;
  PERatio: string;
  Beta: string;
  DividendYield: string;
  ProfitMargin: string;
  "52WeekHigh": string;
  "52WeekLow": string;
};

interface ProductPageProps {
  params: {
    ticker: string;
  };
}

export default function ProductPage({ params: { ticker } }: ProductPageProps) {
  const [basicStockData, setBasicStockData] = useState<BasicStockData>({
    "01. symbol": "",
    "05. price": "",
    "09. change": "",
  });

  const [detailedStockData, setDetailedStockData] = useState<DetailedStockData>(
    {
      Symbol: "",
      AssetType: "",
      Name: "",
      Exchange: "",
      Description: "",
      Sector: "",
      Industry: "",
      MarketCapitalization: "",
      PERatio: "",
      Beta: "",
      DividendYield: "",
      ProfitMargin: "",
      "52WeekHigh": "",
      "52WeekLow": "",
    }
  );

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    Promise.allSettled([
      fetchBasicStockData(ticker, setBasicStockData),
      fetchDetailedStockData(ticker, setDetailedStockData),
    ]).finally(() => setLoading(false));
  }, []);

  return (
    <div className="flex flex-col gap-6 md:gap-10 px-2 md:px-16 lg:px-20 xl:px-48 py-10 dark:bg-slate-900">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <StockHeader
            basicStockData={basicStockData}
            detailedStockData={detailedStockData}
          />
          <StockGraph />
          <StockDetails
            basicStockData={basicStockData}
            detailedStockData={detailedStockData}
          />
        </>
      )}
    </div>
  );
}
