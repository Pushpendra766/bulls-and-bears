import Image from "next/image";

type ObjectType = {
  Symbol: string;
  AssetType: string;
  Name: string;
  Exchange: string;
};

type StockHeaderProps = {
  company: ObjectType;
};

const StockHeader: React.FC<StockHeaderProps> = ({ company }) => {
  const price = "$567.32";
  const high = "+6.71";
  const isGainer = true;

  return (
    <div className="flex justify-between">
      <div className="flex gap-3 md:gap-8">
        <div
          className={`flex justify-center items-center px-9 rounded-full bg-gradient-to-r from-[#90EE91] to-[#BFF4BE]`}
        >
          <h1 className={`text-xl font-bold text-[#097969]`}>
            {company.Symbol[0]}
          </h1>
        </div>
        <div>
          <h1 className="text-lg font-semibold">{company.Name}</h1>
          <p className="text-gray-700 font-semibold">
            {company.Symbol}, {company.AssetType}
          </p>
          <p className="text-gray-400 font-semibold">{company.Exchange}</p>
        </div>
      </div>
      <div className="flex flex-col justify-center">
        <p className="font-bold">{price}</p>
        <span className="flex gap-2">
          <p className="font-semibold text-[#008000] text-md">{high}</p>
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
