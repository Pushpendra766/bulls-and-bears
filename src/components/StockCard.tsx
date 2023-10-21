import Image from "next/image";

export default function StockCard() {
  return (
    <div className="flex gap-8 border rounded-md p-4">
      {" "}
      <Image
        className="rounded-full py-3"
        src="/google.png"
        height={70}
        width={70}
        alt="Stock icon"
      />
      <div>
        <h2 className="font-semibold">Google</h2>
        <p className="text-slate-500">GOOGL</p>
        <p>$139.72 </p>
        <p className="text-green-600 text-sm font-semibold">+45.72</p>{" "}
      </div>
    </div>
  );
}
