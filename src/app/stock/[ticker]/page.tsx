import StockHeader from "@/components/StockPage/StockHeader";
import StockDetails from "@/components/StockPage/StockDetails";

interface ProductPageProps {
  params: {
    ticker: string;
  };
}

export default function ProductPage({ params: { ticker } }: ProductPageProps) {
  console.log(ticker);
  return (
    <div className="flex flex-col gap-6 md:gap-10 mx-4 mx-10 md:mx-16 lg:mx-20 xl:mx-48 m-10">
      <StockHeader />
      <div className="flex border-2 p-10 rounded-md bg-[#ffff91]">graph</div>
      <StockDetails />
    </div>
  );
}
