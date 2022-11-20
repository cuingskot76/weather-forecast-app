import React from "react";
import moment from "moment";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";

const ForecastToday = ({ forecast }) => {
    // * for forecast in a week
    // {forecast?.list?.slice(0, 7).map((item, index) => (
    //                 <div key={index} className="flex flex-col items-center">
    //                     <p className="text-white text-xl font-extralight">
    //                         {forecastDays[index]}
    //                     </p>
    //                     <p className="text-white text-3xl font-medium">
    //                         {Math.round(item?.main?.temp)}°C
    //                     </p>
    //                     <img
    //                         src={`http://openweathermap.org/img/wn/${item?.weather[0]?.icon}.png`}
    //                         alt="weather-icon"
    //                         className="w-32"
    //                     />
    //                     <p className="text-white text-2xl font-medium">
    //                         {item?.weather[0]?.description}
    //                     </p>
    //                 </div>
    //             ))}

    // const WEEK_DAYS = [
    //     "Monday",
    //     "Tuesday",
    //     "Wednesday",
    //     "Thursday",
    //     "Friday",
    //     "Saturday",
    //     "Sunday",
    // ];
    // const forecastDays = WEEK_DAYS.slice(dayInAWeek, WEEK_DAYS.length).concat(
    //     WEEK_DAYS.slice(0, dayInAWeek)
    // );

    const getToday = new Date().getDay();
    const getForecastToday = forecast?.list?.filter((item) => {
        const date = new Date(item.dt_txt);
        const day = date.getDay();
        return day === getToday;
    });

    return (
        <>
            <h1
                className={`text-2xl font-bold mt-10 mb-7 ${
                    forecast ? "block" : "hidden"
                }`}
            >
                Forecast Daily
            </h1>

            <Swiper
                slidesPerView={2.5}
                grabCursor={true}
                pagination={{
                    clickable: true,
                }}
            >
                <div>
                    {getForecastToday?.map((item) => (
                        <SwiperSlide>
                            <div
                                key={item?.dt}
                                className="flex flex-col items-center "
                            >
                                <p className="text-black text-xl font-extralight">
                                    {moment(item.dt_txt).format("LT")}
                                </p>
                                <img
                                    src={`http://openweathermap.org/img/wn/${item?.weather[0]?.icon}.png`}
                                    alt="weather-icon"
                                    className="w-32"
                                />
                                <p className="text-black text-2xl ">
                                    {Math.round(item?.main?.temp)}°C
                                </p>
                                <p className=" text-[16px] text-gray-500">
                                    {item?.weather[0]?.description}
                                </p>
                            </div>
                        </SwiperSlide>
                    ))}
                </div>
            </Swiper>
        </>
    );
};

export default ForecastToday;
