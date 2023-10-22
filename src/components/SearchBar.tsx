"use client";

import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import axios, { CancelTokenSource } from "axios";

const SearchBar = () => {
  const [searchResult, setSearchResult] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [reqExc, setReqExc] = useState(false);
  const [cancelToken, setCancelToken] = useState<CancelTokenSource | null>(
    null
  );

  const handleChange = (e: any) => {
    setSearchTerm(e.target.value);
    if (e.target.value !== "") {
      if (cancelToken) {
        cancelToken.cancel("Request cancelled due to new request.");
      }

      const newCancelToken = axios.CancelToken.source();
      setCancelToken(newCancelToken);

      (async () => {
        try {
          setLoading(true);
          setReqExc(false);
          const res = await axios.get(
            `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${e.target.value}&apikey=${process.env.API_KEY}`,
            {
              cancelToken: newCancelToken.token,
            }
          );
          console.log(res.data);
          if (
            Object.keys(res.data)[0] === "Note" ||
            Object.keys(res.data)[0] === "Information"
          ) {
            setReqExc(true);
            console.log("Req exceeded");
          } else {
            setSearchResult(res.data.bestMatches);
          }

          setLoading(false);
        } catch (error) {
          if (axios.isCancel(error)) {
            console.log("Request cancelled", error.message);
            return;
          }
          setLoading(false);
        }
      })();
    }
  };

  return (
    <div className="border w-full px-4 rounded-full">
      <div className="flex gap-2 pt-2">
        <Image src="/icons/search.svg" width={15} height={15} alt="search" />
        <input
          type="text"
          placeholder="Search"
          className="w-full focus:outline-none"
          value={searchTerm}
          onChange={handleChange}
        />
      </div>
      <div
        className={`${
          searchTerm.length === 0 && "hidden"
        } absolute flex flex-col border-t-0 bg-[#fff] border-2 py-2`}
      >
        {searchResult.length !== 0 ? (
          searchResult.map((result: any, idx) => {
            return (
              <Link
                href={`/stock/${result["1. symbol"]}`}
                className="text-left hover:bg-gray-200 px-5 py-3"
                onClick={() => setSearchTerm("")}
                key={idx}
              >
                <div className="flex gap-6 justify-between">
                  <div>
                    <p>{result["2. name"]}</p>
                    <p className="text-sm font-semibold text-gray-500">
                      {result["1. symbol"]}
                    </p>
                  </div>
                  <div className="text-right text-sm">
                    <p className="border border-blue-500 bg-blue-100 rounded-full px-2">
                      {result["3. type"]}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })
        ) : reqExc ? (
          <p className="px-5 py-3">API limit exceeded</p>
        ) : (
          <p className="px-5 py-3">No result found</p>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
