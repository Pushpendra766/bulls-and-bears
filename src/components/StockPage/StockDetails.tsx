import Image from "next/image";

type ObjectType = {
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

type StockDetailsProps = {
  company: ObjectType;
};

const StockDetails: React.FC<StockDetailsProps> = ({ company }) => {
  // const company = {
  //   Symbol: "IBM",
  //   AssetType: "Common Stock",
  //   Name: "International Business Machines",
  //   Description:
  //     "International Business Machines Corporation (IBM) is an American multinational technology company headquartered in Armonk, New York, with operations in over 170 countries. The company began in 1911, founded in Endicott, New York, as the Computing-Tabulating-Recording Company (CTR) and was renamed International Business Machines in 1924. IBM is incorporated in New York. IBM produces and sells computer hardware, middleware and software, and provides hosting and consulting services in areas ranging from mainframe computers to nanotechnology. IBM is also a major research organization, holding the record for most annual U.S. patents generated by a business (as of 2020) for 28 consecutive years. Inventions by IBM include the automated teller machine (ATM), the floppy disk, the hard disk drive, the magnetic stripe card, the relational database, the SQL programming language, the UPC barcode, and dynamic random-access memory (DRAM). The IBM mainframe, exemplified by the System/360, was the dominant computing platform during the 1960s and 1970s.",
  //   CIK: "51143",
  //   Exchange: "NYSE",
  //   Currency: "USD",
  //   Country: "USA",
  //   Sector: "TECHNOLOGY",
  //   Industry: "COMPUTER & OFFICE EQUIPMENT",
  //   Address: "1 NEW ORCHARD ROAD, ARMONK, NY, US",
  //   FiscalYearEnd: "December",
  //   LatestQuarter: "2023-06-30",
  //   MarketCapitalization: "125727932000",
  //   EBITDA: "12985000000",
  //   PERatio: "58.73",
  //   PEGRatio: "1.276",
  //   BookValue: "24.37",
  //   DividendPerShare: "6.61",
  //   DividendYield: "0.0481",
  //   EPS: "2.35",
  //   RevenuePerShareTTM: "66.75",
  //   ProfitMargin: "0.0335",
  //   OperatingMarginTTM: "0.141",
  //   ReturnOnAssetsTTM: "0.0411",
  //   ReturnOnEquityTTM: "0.104",
  //   RevenueTTM: "60524999000",
  //   GrossProfitTTM: "32688000000",
  //   DilutedEPSTTM: "2.35",
  //   QuarterlyEarningsGrowthYOY: "0.126",
  //   QuarterlyRevenueGrowthYOY: "-0.004",
  //   AnalystTargetPrice: "146",
  //   TrailingPE: "58.73",
  //   ForwardPE: "15.55",
  //   PriceToSalesRatioTTM: "2.108",
  //   PriceToBookRatio: "6.75",
  //   EVToRevenue: "2.969",
  //   EVToEBITDA: "25.81",
  //   Beta: "0.771",
  //   "52WeekHigh": "151.93",
  //   "52WeekLow": "118.71",
  //   "50DayMovingAverage": "143.8",
  //   "200DayMovingAverage": "135.44",
  //   SharesOutstanding: "911006000",
  //   DividendDate: "2023-09-09",
  //   ExDividendDate: "2023-08-09",
  // };

  const stats = [
    {
      name: "Market Cap",
      value:
        company.MarketCapitalization === "None"
          ? "-"
          : "$" +
            (Math.abs(Number(company.MarketCapitalization)) / 1.0e9).toFixed(
              2
            ) +
            "B",
    },
    {
      name: "P/E Ratio",
      value: company.PERatio === "None" ? "-" : company.PERatio,
    },
    { name: "Beta", value: company.Beta === "None" ? "-" : company.Beta },
    {
      name: "Dividend Yield",
      value: company.DividendYield === "0" ? "-" : company.DividendYield + "%",
    },
    {
      name: "Profit Margin",
      value: company.ProfitMargin === "0" ? "-" : company.ProfitMargin,
    },
  ];

  return (
    <div className="border-2 rounded-md">
      <div className="border-b-2 w-full p-4 ">
        <h2 className="font-semibold">About {company.Name}</h2>
      </div>
      <div className="flex flex-col gap-16 p-6 text-sm md:text-base">
        <p>
          {company.Description === "None"
            ? "Not Provided"
            : company.Description}
        </p>
        <div className="flex flex-col md:flex-row gap-2 md:gap-8">
          <p className="bg-[#E1BEE7] py-2 px-4 rounded-full">
            Sector: {company.Sector}
          </p>
          <p className="bg-[#81D4FA] py-2 px-4 rounded-full">
            Industry: {company.Industry}
          </p>
        </div>
        <div className="flex justify-between">
          <div>
            <p className="font-semibold text-gray-500">52-Week Low</p>
            <p className="font-semibold text-red-700">
              ${company["52WeekLow"]}
            </p>
          </div>
          <div className="w-9/12">
            <p className="text-center font-semibold text-gray-500">
              Current price: <span className="text-blue-600">$45</span>
            </p>
            <div className="text-center mx-auto w-4">
              <Image
                src="/icons/down_arrow_blue.svg"
                height={18}
                width={18}
                alt="arrow up"
              />
            </div>
            <div className="border border-gray-400 w-full"></div>
          </div>
          <div className="text-right">
            <p className="font-semibold text-gray-500">52-Week High</p>
            <p className="font-semibold text-green-700">
              ${company["52WeekHigh"]}
            </p>
          </div>
        </div>
        <div className="grid grid-cols-3 md:grid-cols-5 gap-6 justify-between place-items-center">
          {stats.map((stat, idx) => {
            return (
              <div className="text-center" key={idx}>
                <p className="text-gray-500 font-semibold whitespace-nowrap">
                  {stat.name}
                </p>
                <p className="font-semibold">{stat.value}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default StockDetails;
