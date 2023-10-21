import Image from "next/image";

export default function Navbar() {
  return (
    <div className="flex justify-between gap-20 px-40 py-5">
      <span className="flex gap-4">
        <Image src="/bullsandbears.png" width={40} height={40} alt="Bulls & Bears Icon" />
        <h1 className="text-xl whitespace-nowrap pt-2 font-bold">
          Bulls & Bears
        </h1>
      </span>
      <div className="flex gap-2 border w-full px-4 rounded-full">
        <Image src="/search.svg" width={15} height={15} alt="search" />
        <input type="text" placeholder="What are you looking for today ?" className="w-full focus:outline-none"/>
      </div>

      <button className="bg-[#048000] px-4 font-semibold text-white rounded-full">
        Login/Register
      </button>
    </div>
  );
}
