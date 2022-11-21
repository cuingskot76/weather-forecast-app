import React, { useState, useEffect } from "react";

import {
    getApi,
    GEO_API_URL,
    WEATHER_API_URL,
    WEATHER_API_KEY,
} from "../components/api/getApi";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import ForecastToday from "../components/ForecastToday";
import Search from "../components/Search";
import Weather from "../components/Weather";
import AirPollution from "../components/AirPollution";
import Links from "../components/Links";

const Home = () => {
    const [search, setSearch] = useState("");
    const [result, setResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingWeather, setLoadingWeather] = useState(false);
    const [forecast, setForecast] = useState(null);
    const [cordLocation, setCordLocation] = useState("");
    const [cordWeather, setCordWeather] = useState([]);
    const [airPollution, setAirPollution] = useState([]);

    useEffect(() => {
        setLoading(true);
        // setTimeout, to handle error from search input.
        // Because if we type fast, the api will return error
        const fetchApi = setTimeout(() => {
            try {
                const fetchData = async () => {
                    // limit search max 10 of requests to the API
                    const res = await fetch(
                        `${GEO_API_URL}/cities?limit=10&namePrefix=${search}`,
                        getApi
                    );
                    const data = await res.json();
                    const newData = data?.data?.map((city) => {
                        return {
                            value: `${city?.latitude} ${city?.longitude}`,
                            label: `${city?.name}, ${city?.country}`,
                        };
                    });
                    setResult(newData);
                };

                fetchData();
                setLoading(false);
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        }, 600);

        return () => {
            clearTimeout(fetchApi);
        };
    }, [search]);

    const onGetCity = (cordLocation) => {
        const [lat, lon] = cordLocation?.value?.split(" ");

        setLoadingWeather(true);

        // metric, to get the temperature in Celsius
        const currentWeather = fetch(
            `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
        );

        const forecastWeather = fetch(
            `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
        );

        // air quality index
        const airPollution = fetch(
            `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}`
        );

        Promise.all([currentWeather, forecastWeather, airPollution])
            .then(async (res) => {
                setLoadingWeather(false);

                const weatherRes = await res[0].json();
                const forecastRes = await res[1].json();
                const airPollutionRes = await res[2].json();

                // * based on the current weather, to get the location name
                setCordLocation(
                    `${weatherRes?.name}, ${weatherRes?.sys?.country}`
                );

                // * based on the geoDB api
                setCordWeather(weatherRes);
                // * get the forecast weather
                setForecast(forecastRes);
                setAirPollution(airPollutionRes);
                // console.log(airPollutionRes);
            })
            .catch((error) => {
                console.log(error);
            });

        // setSearch("");
        setSearch(cordLocation?.label);
    };

    return (
        <BrowserRouter>
            <div className=" bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-blue-100 via-blue-300 to-blue-500 w-screen lg:h-screen p-10">
                <div className="flex flex-col gap-5 lg:h-full lg:gap-0 lg:flex-row justify-center">
                    <div className=" card-section h-[576px] lg:w-[576px] rounded-2xl lg:h-full lg:rounded-none lg:rounded-l-2xl">
                        <Search
                            search={search}
                            setSearch={setSearch}
                            result={result}
                            onGetCity={onGetCity}
                            loading={loading}
                            cordLocation={cordLocation}
                        />
                    </div>
                    <div className=" lg:w-[576px] mb-10 text-gray-700 rounded-2xl lg:rounded-r-2xl backdrop-blur-sm bg-white/30 lg:rounded-none p-5 lg:h-full ">
                        <nav>
                            <Links />
                        </nav>

                        <Routes>
                            <Route
                                path="/"
                                element={
                                    <>
                                        <Weather
                                            cordLocation={cordLocation}
                                            cordWeather={cordWeather}
                                            loadingWeather={loadingWeather}
                                            forecast={forecast}
                                        />
                                        <ForecastToday forecast={forecast} />
                                    </>
                                }
                            ></Route>

                            <Route
                                path="/air-pollutions"
                                element={
                                    <AirPollution
                                        airPollution={airPollution}
                                        cordWeather={cordWeather}
                                    />
                                }
                            ></Route>
                        </Routes>
                    </div>
                </div>
            </div>
        </BrowserRouter>
    );
};

export default Home;
