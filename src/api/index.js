import axios from "axios";
import {
    timeStampToWeekDay,
    timeStampToHoursMinutes
} from "../utils/dateHelper"


const weatherApiKey = process.env.REACT_APP_WEATHER_API_KEY;
const weatherApi = axios.create({
    baseURL: "https://api.openweathermap.org/data/2.5/",
    headers: { "Content-type": "Applications/json" }
})

const locationApiKey = process.env.REACT_APP_LOCATION_API_KEY;
const locationApi = axios.create({
    baseURL: "https://api.opencagedata.com/geocode/v1/",
    headers: { "Content-type": "Applications/json" }
})

export const getDailyWeatherByCityCountry = async ({ city, country }, success, failure) => {
    try {
        const { data: locdata } = await locationApi.get(`json?q=${city}, ${country}&key=${locationApiKey}`);
        const { lat, lng } = locdata.results[0].geometry;
        const { data: weatherData } = await weatherApi.get(`onecall?lat=${lat}&lon=${lng}&units=metric&exclude=hourly,alerts,current,minutely&appid=${weatherApiKey}`)
        const formatedDays = weatherData.daily.map(({ temp, clouds, dt, sunrise, sunset, wind_deg, wind_speed }) => ({
            temp: temp.day,
            cloudPercentage: clouds,
            weekDate: timeStampToWeekDay(dt),
            sunrise: timeStampToHoursMinutes(sunrise),
            sunset: timeStampToHoursMinutes(sunset),
            windSpeed: wind_speed,
            windDeg: wind_deg
        }))
        success(formatedDays)
    } catch (error) {
        failure(error)
    }
}
