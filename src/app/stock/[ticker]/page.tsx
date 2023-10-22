"use client";
import { useEffect, useState } from "react";
import StockHeader from "@/components/StockPage/StockHeader";
import StockDetails from "@/components/StockPage/StockDetails";
import StockGraph from "@/components/StockPage/StockGraph";
import axios from "axios";

type StockData = {
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
  const [stockData, setStockData] = useState<StockData>({
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
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    (async () => {
      try {
        setLoading(true);
        setError(false);
        const res = await axios.get(
          `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${ticker}&apikey=${process.env.API_KEY}`
        );
        setStockData(res.data);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
        console.log(error);
      }
    })();
  }, []);
  return (
    <div className="flex flex-col gap-6 md:gap-10 mx-4 mx-10 md:mx-16 lg:mx-20 xl:mx-48 m-10">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {stockData.Symbol ? (
            <StockHeader company={stockData} />
          ) : (
            <p>Data Not Found</p>
          )}
          <StockGraph />
          <StockDetails company={stockData} />
        </>
      )}
    </div>
  );
}
