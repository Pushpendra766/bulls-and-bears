import Image from "next/image";

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
    <div className="flex gap-8 border rounded-md p-4 cursor-pointer">
      <div className="bg-[#fff000] flex justify-center items-center px-7 rounded-full">
        <h1 className="text-xl font-bold">{data.ticker[0]}</h1>
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
  );
};

export default StockCard;
