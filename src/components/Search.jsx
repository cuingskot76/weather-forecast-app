import React, { useEffect, useRef } from "react";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";

const Search = ({
    search,
    setSearch,
    result,
    onGetCity,
    loading,
    cordLocation,
    filteredData,
}) => {
    const ref = useRef();
    useEffect(() => {
        ref.current.focus();
    }, []);

    return (
        <>
            <div className="flex flex-wrap text-center justify-between items-center gap-5">
                <h1 className="text-[1rem] sm:text-lg md:text-2xl text-white font-medium">
                    Azl - Weather App
                </h1>
                <div className="flex flex-wrap text-center justify-center bg-gray-200 items-center py-2 px-3 md:py-3 md:px-5 rounded-xl text-gray-800">
                    <PlaceOutlinedIcon />
                    <p className="text-[13px] ml-1  sm:text-sm md:text-lg">
                        {(loading && <span>loading ...</span>) ||
                            (cordLocation ? (
                                <span>{cordLocation}</span>
                            ) : (
                                <span>unknown location</span>
                            ))}
                    </p>
                </div>
            </div>

            <div className="flex flex-col mt-32 lg:mt-52 justify-center text-center items-center gap-5">
                <p className="text-lg sm:text-2xl md:text-3xl text-white-500">
                    Real-Time & Historical <br /> Weather App !
                </p>
                <form className="w-3/4" onSubmit={(e) => e.preventDefault()}>
                    <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300">
                        Search
                    </label>
                    <div className="relative">
                        <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                            <svg
                                aria-hidden="true"
                                className="w-5 h-5 text-gray-500 dark:text-gray-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                ></path>
                            </svg>
                        </div>
                        <input
                            type="search"
                            id="default-search"
                            className=" block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="search location ..."
                            required=""
                            value={search}
                            onChange={(e) =>
                                setSearch(e.target.value, search.toLowerCase())
                            }
                            ref={ref}
                        />
                    </div>

                    {loading && <p>Loading...</p>}

                    {filteredData ? (
                        <p className="hidden">null</p>
                    ) : (
                        <p
                            className={`${
                                result?.length === 0 ? "hidden" : "block"
                            }`}
                        >
                            Location not found
                        </p>
                    )}

                    <div
                        className={`${
                            search?.length > 0
                                ? "block  bg-gray-50  border-gray-300 text-gray-900 text-sm rounded-lg  focus:border-blue-500  w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:right-0 dark:focus:border-blue-500 overflow-auto z-50 relative "
                                : "hidden "
                        } `}
                    >
                        <div className="text-start ">
                            {search &&
                                result?.map((item, i) => (
                                    <option
                                        className={`${
                                            item?.length === i + 1
                                                ? "border-b-0 border-none"
                                                : "border-b-2 border-blue-400 "
                                        } py-2 px-3 hover:bg-blue-400 hover:text-white cursor-pointer`}
                                        key={item?.value}
                                        onClick={() => onGetCity(item)}
                                    >
                                        {item.label}
                                    </option>
                                ))}
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
};

export default Search;
