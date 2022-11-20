import { useState, React, useEffect } from "react";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";

import co from "../assets/pollution-icons/co.png";

const AirPollution = ({ airPollution }) => {
    const getAirPollution = airPollution?.list?.map((item) => item);
    const getAqi = getAirPollution?.[0]?.main?.aqi;
    const getCO = getAirPollution?.[0]?.components?.co;
    const getNO = getAirPollution?.[0]?.components?.no;
    const getNO2 = getAirPollution?.[0]?.components?.no2;
    const getO3 = getAirPollution?.[0]?.components?.o3;
    const getSO2 = getAirPollution?.[0]?.components?.so2;
    const getPM2_5 = getAirPollution?.[0]?.components?.pm2_5;
    const getPM10 = getAirPollution?.[0]?.components?.pm10;
    const getNH3 = getAirPollution?.[0]?.components?.nh3;

    function getWindowDimensions() {
        const { innerWidth: width, innerHeight: height } = window;
        return {
            width,
            height,
        };
    }

    function useWindowDimensions() {
        const [windowDimensions, setWindowDimensions] = useState(
            getWindowDimensions()
        );

        useEffect(() => {
            function handleResize() {
                setWindowDimensions(getWindowDimensions());
            }

            window.addEventListener("resize", handleResize);
            return () => window.removeEventListener("resize", handleResize);
        }, []);

        return windowDimensions;
    }

    const { width } = useWindowDimensions();

    return (
        <>
            {airPollution?.length !== 0 ? (
                <div className="text-center mt-[10%]">
                    <h2 className="text-2xl font-bold mb-10">
                        Air Quality Index : {`${getAqi} `}
                        <span
                            className={`${
                                (getAqi === 1 && "text-blue-600") ||
                                (getAqi === 2 && "text-green-600") ||
                                (getAqi === 3 && "text-yellow-700") ||
                                (getAqi === 4 && "text-yellow-900") ||
                                (getAqi === 5 && "text-red-600")
                            }`}
                        >
                            {(getAqi === 1 && "Good") ||
                                (getAqi === 2 && "Fair") ||
                                (getAqi === 3 && "Moderate") ||
                                (getAqi === 4 && "Poor") ||
                                (getAqi === 5 && "Very Poor")}
                        </span>
                    </h2>

                    <Swiper
                        slidesPerView={
                            (width < 440 && 1.4) || (width < 640 && 2.5) || 3.5
                        }
                        grabCursor={true}
                        pagination={{
                            clickable: true,
                        }}
                    >
                        <SwiperSlide>
                            <div className="flex flex-col   text-center items-center m-2">
                                <img src={co} alt="" className="w-10" />

                                <span className="mt-3 text-[16px] text-gray-500">
                                    {getCO} μg/m3
                                </span>
                                <span className="mt-1">Carbon monoxide</span>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="flex flex-col  text-center items-center m-2">
                                <img src={co} alt="" className="w-10" />

                                <span className="mt-3 text-[16px] text-gray-500">
                                    {getNO} μg/m3
                                </span>
                                <span className="mt-1">Nitrogen monoxide</span>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="flex flex-col  text-center items-center m-2">
                                <img src={co} alt="" className="w-10" />

                                <span className="mt-3 text-[16px] text-gray-500">
                                    {getNO2} μg/m3
                                </span>
                                <span className="mt-1">Nitrogen dioxide</span>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="flex flex-col  text-center items-center m-2">
                                <img src={co} alt="" className="w-10" />

                                <span className="mt-3 text-[16px] text-gray-500">
                                    {getO3} μg/m3
                                </span>
                                <span className="mt-1">Ozone</span>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="flex flex-col  text-center items-center m-2">
                                <img src={co} alt="" className="w-10" />

                                <span className="mt-3 text-[16px] text-gray-500">
                                    {getSO2} μg/m3
                                </span>
                                <span className="mt-1">Sulphur dioxide</span>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="flex flex-col  text-center items-center m-2">
                                <img src={co} alt="" className="w-10" />

                                <span className="mt-3 text-[16px] text-gray-500">
                                    {getPM2_5} μg/m3
                                </span>
                                <span className="mt-1">
                                    Fine particles matter
                                </span>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="flex flex-col  text-center items-center m-2">
                                <img src={co} alt="" className="w-10" />

                                <span className="mt-3 text-[16px] text-gray-500">
                                    {getPM10} μg/m3
                                </span>
                                <span className="mt-1">
                                    Coarse particulate matter
                                </span>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="flex flex-col  text-center items-center m-2">
                                <img src={co} alt="" className="w-10" />

                                <span className="mt-3 text-[16px] text-gray-500">
                                    {getNH3} μg/m3
                                </span>
                                <span className="mt-1">Ammonia</span>
                            </div>
                        </SwiperSlide>
                    </Swiper>
                </div>
            ) : (
                <p className="text-xl text-center mt-10 mb-5 lg:mt-52">
                    no data
                </p>
            )}
        </>
    );
};

export default AirPollution;
