import Image from "next/image";

type BasicObjectType = {
  "05. price": string;
};

type DetailedObjectType = {
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
  basicStockData: BasicObjectType;
  detailedStockData: DetailedObjectType;
};

const StockDetails: React.FC<StockDetailsProps> = ({
  basicStockData,
  detailedStockData,
}) => {
  const stats = [
    {
      name: "Market Cap",
      value:
        detailedStockData.MarketCapitalization === "None"
          ? "-"
          : "$" +
            (
              Math.abs(Number(detailedStockData.MarketCapitalization)) / 1.0e9
            ).toFixed(2) +
            "B",
    },
    {
      name: "P/E Ratio",
      value:
        detailedStockData.PERatio === "None" ? "-" : detailedStockData.PERatio,
    },
    {
      name: "Beta",
      value: detailedStockData.Beta === "None" ? "-" : detailedStockData.Beta,
    },
    {
      name: "Dividend Yield",
      value:
        detailedStockData.DividendYield === "0"
          ? "-"
          : detailedStockData.DividendYield + "%",
    },
    {
      name: "Profit Margin",
      value:
        detailedStockData.ProfitMargin === "0"
          ? "-"
          : detailedStockData.ProfitMargin,
    },
  ];

  return (
    <div className="border-2 rounded-md">
      <div className="border-b-2 w-full p-4 ">
        <h2 className="font-semibold">About {detailedStockData.Name}</h2>
      </div>
      <div className="flex flex-col gap-16 p-6 text-sm md:text-base">
        <p>
          {detailedStockData.Description === "None"
            ? "Not Provided"
            : detailedStockData.Description}
        </p>
        <div className="flex flex-col md:flex-row gap-2 md:gap-8">
          <p className="bg-[#E1BEE7] py-2 px-4 rounded-full">
            Sector: {detailedStockData.Sector}
          </p>
          <p className="bg-[#81D4FA] py-2 px-4 rounded-full">
            Industry: {detailedStockData.Industry}
          </p>
        </div>
        <div className="flex justify-between">
          <div>
            <p className="font-semibold text-gray-500">52-Week Low</p>
            <p className="font-semibold text-red-700">
              ${detailedStockData["52WeekLow"]}
            </p>
          </div>
          <div className="w-9/12">
            <p className="text-center font-semibold text-gray-500">
              Current price:{" "}
              <span className="text-blue-600">
                ${basicStockData["05. price"]}
              </span>
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
              ${detailedStockData["52WeekHigh"]}
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
