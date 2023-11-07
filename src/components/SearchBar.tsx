"use client";
import { useState } from "react";
import Link from "next/link";
import axios, { CancelTokenSource } from "axios";
import { AiOutlineSearch } from "react-icons/ai";

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
    if (!e.target.value) return;

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
          `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${e.target.value}&apikey=${process.env.NEXT_PUBLIC_API_KEY_C}`,
          {
            cancelToken: newCancelToken.token,
          }
        );
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
  };

  return (
    <div className="border w-full px-4 rounded-full dark:bg-slate-800 dark:border-slate-600">
      <div className="flex gap-2 pt-2">
        <AiOutlineSearch size={17} className="mt-1" />
        <input
          type="text"
          placeholder="Search"
          className="w-full focus:outline-none dark:bg-slate-800"
          value={searchTerm}
          onChange={handleChange}
        />
      </div>
      <div
        className={`${
          searchTerm.length === 0 && "hidden"
        } absolute flex flex-col border-t-0 bg-[#fff] dark:bg-slate-800 dark:border-slate-600 border py-2`}
      >
        {loading ? (
          <p className="px-5 py-3">Loading...</p>
        ) : searchResult.length !== 0 ? (
          searchResult.map((result: any, idx) => {
            return (
              <Link
                href={`/stock/${result["1. symbol"]}`}
                className="text-left hover:bg-gray-200 px-5 py-3 dark:hover:bg-slate-700"
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
                    <p className="border border-blue-500 bg-blue-100 rounded-full px-2 dark:text-slate-900">
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
