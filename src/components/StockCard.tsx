import Image from "next/image";
import Link from "next/link";

type ArrayObjectType = {
  ticker: string;
  price: string;
  change_amount: string;
};

type StockCardProps = {
  data: ArrayObjectType;
};

const StockCard: React.FC<StockCardProps> = ({ data }) => {
  const isGainer = parseFloat(data.change_amount) > 0;
  return (
    <Link href={`/stock/${data.ticker}`}>
      <div className="flex gap-8 border rounded-md p-4 cursor-pointer">
        <div
          className={`flex justify-center items-center px-7 rounded-full bg-gradient-to-r ${
            isGainer ? "from-[#90EE91]" : "from-[#F07470]"
          } ${isGainer ? "to-[#BFF4BE]" : "to-[#F6BDC0]"}`}
        >
          <h1
            className={`text-xl font-bold ${
              isGainer ? "text-[#097969]" : "text-[#AA4A44]"
            }`}
          >
            {data.ticker[0]}
          </h1>
        </div>
        <div>
          <h2 className="font-semibold">{data.ticker}</h2>
          <p>${data.price} </p>
          <p
            className={`flex gap-2 ${
              isGainer ? "text-green-600" : "text-red-600"
            } text-sm font-semibold`}
          >
            {isGainer && "+"}
            {data.change_amount}
            <Image
              src={isGainer ? "/icons/up_arrow.svg" : "/icons/down_arrow.svg"}
              height={15}
              width={15}
              alt="arrow up"
            />
          </p>{" "}
        </div>
      </div>
    </Link>
  );
};

export default StockCard;
