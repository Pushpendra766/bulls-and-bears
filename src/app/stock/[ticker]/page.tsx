"use client";
import { useEffect, useState } from "react";
import StockHeader from "@/components/StockPage/StockHeader";
import StockDetails from "@/components/StockPage/StockDetails";
import StockGraph from "@/components/StockPage/StockGraph";
import axios from "axios";
import useBasicStockData from "@/store/basicStockDataStore";
import useDetailedStockData from "@/store/detailedStockData";
import { dummyBasicData, dummyDetailedData } from "@/data/demo-stock-data";

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
  const BASIC_DATA_ENDPOINT = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${ticker}&apikey=${process.env.NEXT_PUBLIC_API_KEY_A}`;
  const DETAILED_DATA_ENDPOINT = `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${ticker}&apikey=${process.env.NEXT_PUBLIC_API_KEY_B}`;

  const { basicDataZustand, addBasicDataZustand } =
    useBasicStockData.getState();
  const { detailedDataZustand, addDetailedDataZustand } =
    useDetailedStockData.getState();

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
  const [error, setError] = useState(false);
  const [basicReqExc, setBasicReqExc] = useState(false);
  const [detailedReqExc, setDetailedReqExc] = useState(false);

  const fetchBasicData = () => {
    const basicZustand = basicDataZustand.find(
      (item: any) => item.Symbol === ticker
    );

    if (basicZustand) {
      setBasicStockData(basicZustand);
      return;
    }

    (async () => {
      try {
        setLoading(true);
        setError(false);
        const res = await axios.get(BASIC_DATA_ENDPOINT);
        if (
          Object.keys(res.data)[0] === "Note" ||
          Object.keys(res.data)[0] === "Information"
        ) {
          setBasicReqExc(true);
          setBasicStockData(dummyBasicData["Global Quote"]);
          console.log("Req exceeded");
          setBasicReqExc(false);
        } else {
          addBasicDataZustand(res.data["Global Quote"]);
          setBasicStockData(res.data["Global Quote"]);
        }

        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
        console.log(error);
      }
    })();
  };

  const fetchDetailedData = () => {
    const tickerZustand = detailedDataZustand.find(
      (item: any) => item.Symbol === ticker
    );

    if (tickerZustand) {
      setDetailedStockData(tickerZustand);
      return;
    }

    (async () => {
      try {
        setLoading(true);
        setError(false);
        const res = await axios.get(DETAILED_DATA_ENDPOINT);

        if (
          Object.keys(res.data)[0] === "Note" ||
          Object.keys(res.data)[0] === "Information"
        ) {
          setDetailedReqExc(true);
          setDetailedStockData(dummyDetailedData);
          console.log("Req exceeded");
          setDetailedReqExc(false);
        } else {
          addDetailedDataZustand(res.data);
          setDetailedStockData(res.data);
        }

        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
        console.log(error);
      }
    })();
  };

  useEffect(() => {
    fetchBasicData();
    fetchDetailedData();
  }, []);

  return (
    <div className="flex flex-col gap-6 md:gap-10 px-2 md:px-16 lg:px-20 xl:px-48 py-10 dark:bg-slate-900">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {basicReqExc || detailedReqExc ? (
            <p>API Request Exceeded. Try again after 1-minute.</p>
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
        </>
      )}
    </div>
  );
}
