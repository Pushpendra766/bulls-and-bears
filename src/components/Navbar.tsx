import Image from "next/image";

export default function Navbar() {
  return (
    <div className="flex gap-6 md:gap-10 lg:gap-20 px-4 md:px-10 lg:px-20 xl:px-40 py-5 border-b">
      <div className="flex gap-2 lg:gap-4">
        <Image
          src="/icons/bullsandbears.png"
          width={40}
          height={40}
          alt="Bulls & Bears Icon"
        />
        <h1 className="hidden lg:flex text-xl pt-2 font-bold whitespace-nowrap">
          Bulls & Bears
        </h1>
        <h1 className="lg:hidden text-xl whitespace-nowrap pt-2 font-bold">
          B&B
        </h1>
      </div>
      <div></div>
      <div className="flex gap-2 border w-full px-4 rounded-full">
        <Image src="/icons/search.svg" width={15} height={15} alt="search" />
        <input
          type="text"
          placeholder="Search"
          className="w-full focus:outline-none"
        />
      </div>
      <button className="bg-[#048000] px-4 font-semibold text-white rounded-full">
        Th
      </button>
    </div>
  );
}
