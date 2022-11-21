import React from "react";

import cloudyIcon from "../assets/weather-icons/cloudy.svg";
import humidityIcon from "../assets/weather-icons/humidity.svg";
import sunriseIcon from "../assets/weather-icons/sunrise.svg";
import sunsetIcon from "../assets/weather-icons/sunset.svg";
import windIcon from "../assets/weather-icons/wind.svg";
import thermometerIcon from "../assets/weather-icons/thermometer-celsius.svg";
import pressureIcon from "../assets/weather-icons/wi_pressure-low.svg";

import moment from "moment";

// lottie animation
import { Player } from "@lottiefiles/react-lottie-player";

const Weather = ({ cordWeather, cordLocation, loadingWeather, forecast }) => {
    const icon = cordWeather?.weather?.map((item) => item?.icon);
    const weatherDesc = cordWeather?.weather?.map((item) => item?.description);
    const windSpeed = cordWeather?.wind?.speed;
    const humidity = cordWeather?.main?.humidity;
    const pressure = cordWeather?.main?.pressure;
    const feelsLike = cordWeather?.main?.feels_like;
    const clouds = cordWeather?.clouds?.all;

    const date = new Date();
    const localTime = date.getTime();
    const localOffset = date.getTimezoneOffset() * 60000;
    const utc = localTime + localOffset;
    const timezone = cordWeather?.timezone;
    const localTimezone = utc + 1000 * timezone;
    const localDate = new Date(localTimezone);
    const getLocalTime = moment(localDate).format("llll");

    // * sunsite, sunrise are with UTC time
    const sunrise = cordWeather?.sys?.sunrise;
    const getLocalTimeSunrise = moment
        .utc(sunrise, "X")
        .add(timezone, "seconds")
        .format("LTS");

    const sunsite = cordWeather?.sys?.sunset;
    const getLocalTimeSunset = moment
        .utc(sunsite, "X")
        .add(timezone, "seconds")
        .format("LTS");

    return (
        <>
            {loadingWeather && (
                <Player
                    autoplay
                    loop
                    src="https://assets9.lottiefiles.com/packages/lf20_l11veb0d.json"
                    style={{ height: "300px", width: "300px" }}
                ></Player>
            )}
            {cordWeather?.length !== 0 ? (
                <>
                    <div>
                        <h1 className="text-2xl font-bold mb-5">
                            Weather in {cordLocation}
                        </h1>
                        <div
                            className={`flex flex-row justify-around gap-5 text-center flex-wrap items-center`}
                        >
                            <div>
                                <img
                                    src={`https://openweathermap.org/img/wn/${icon}.png`}
                                    alt="weather-icon"
                                    className="ml-8 w-32"
                                />
                                <p className="text-4xl ">
                                    {Math.round(cordWeather?.main?.temp)}°C
                                </p>
                                <h3 className="uppercase text-[13px] text-gray-500">
                                    {weatherDesc}
                                </h3>
                                <p className="text-2xl">
                                    {cordWeather?.description}
                                </p>
                                <p>{getLocalTime}</p>
                            </div>
                            <div className="items-start flex flex-col">
                                <div className="flex items-center">
                                    <img
                                        src={thermometerIcon}
                                        alt="thermometer"
                                        className="w-11 mr-2"
                                    />
                                    <p>Feels like : {feelsLike}°C</p>
                                </div>
                                <div className="flex items-center">
                                    <img
                                        src={cloudyIcon}
                                        alt="clouds"
                                        className="w-11 mr-2"
                                    />
                                    <p>Clouds : {clouds}%</p>
                                </div>
                                <div className="flex items-center">
                                    <img
                                        src={humidityIcon}
                                        alt="humidity"
                                        className="w-11 mr-2"
                                    />
                                    <p>Humidity : {humidity}%</p>
                                </div>
                                <div className="flex items-center">
                                    <img
                                        src={windIcon}
                                        alt="wind"
                                        className="w-11 mr-2"
                                    />
                                    <p>Wind speed: {windSpeed} m/s</p>
                                </div>
                                <div className="flex items-center">
                                    <img
                                        src={pressureIcon}
                                        alt="pressure"
                                        className="w-11 mr-2"
                                    />
                                    <p>Pressure : {pressure} hPa</p>
                                </div>
                                <div className="flex items-center">
                                    <img
                                        src={sunriseIcon}
                                        alt="sunrise"
                                        className="w-11 mr-2"
                                    />
                                    <p>Sunrise : {getLocalTimeSunrise}</p>
                                </div>
                                <div className="flex items-center">
                                    <img
                                        src={sunsetIcon}
                                        alt="sunset"
                                        className="w-11 mr-2"
                                    />
                                    <p>Sunset : {getLocalTimeSunset}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <p className="text-xl text-center mt-10 mb-5 lg:mt-52">
                    no data
                </p>
            )}
        </>
    );
};

export default Weather;
