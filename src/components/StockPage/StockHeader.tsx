import Image from "next/image";

type BasicObjectType = {
  "01. symbol": string;
  "05. price": string;
  "09. change": string;
};

type DetailedObjectType = {
  Symbol: string;
  AssetType: string;
  Exchange: string;
  Name: string;
};

type StockHeaderProps = {
  basicStockData: BasicObjectType;
  detailedStockData: DetailedObjectType;
};

const StockHeader: React.FC<StockHeaderProps> = ({
  basicStockData,
  detailedStockData,
}) => {
  const isGainer = Number(basicStockData["09. change"]) > 0;
  if (
    Object.keys(basicStockData).length === 0 ||
    Object.keys(detailedStockData).length === 0
  ) {
    return <p>Data not found, try again</p>;
  }
  return (
    <div className="flex justify-between">
      <div className="flex gap-3 md:gap-8">
        <div
          className={`flex w-16 md:w-20 h-16 md:h-20 justify-center items-center px-9 rounded-full bg-gradient-to-r from-[#90EE91] to-[#BFF4BE]`}
        >
          <h1 className={`text-xl font-bold text-[#097969]`}>
            {detailedStockData.Symbol[0]}
          </h1>
        </div>
        <div>
          <h1 className="text-sm md:text-lg font-semibold">
            {detailedStockData.Name}
          </h1>
          <p className="text-sm md:text-base text-gray-600 font-semibold">
            {detailedStockData.Symbol}, {detailedStockData.AssetType}
          </p>
          <p className="text-sm md:text-base text-gray-400 font-semibold">
            {detailedStockData.Exchange}
          </p>
        </div>
      </div>
      <div className="flex flex-col justify-center text-sm md:text-base">
        <p className="font-bold">${basicStockData["05. price"]}</p>
        <span className="flex gap-2">
          <p
            className={`font-semibold ${
              isGainer ? "text-green-500" : "text-red-500"
            } text-md`}
          >
            {isGainer && "+"}
            {basicStockData["09. change"]}
          </p>
          <Image
            src={isGainer ? "/icons/up_arrow.svg" : "/icons/down_arrow.svg"}
            height={20}
            width={20}
            alt="arrow up"
          />
        </span>
      </div>
    </div>
  );
};

export default StockHeader;
