import StockHeader from "./StockHeader";
import StockDetails from "./StockDetails";

export default function ProductPage() {
  return (
    <div className="flex flex-col gap-6 md:gap-10 mx-4 mx-10 md:mx-16 lg:mx-20 xl:mx-48 m-10">
      <StockHeader />
      <div className="flex border-2 p-10 rounded-md bg-[#ffff91]">graph</div>
      <StockDetails />
    </div>
  );
}
