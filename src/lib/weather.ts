// @ts-nocheck
import axios from "axios";

export async function getWeatherByLocation({
  latitude,
  longitude,
}: {
  latitude: number;
  longitude: number;
}) {
  const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&appid=${process.env.OPENWEATHERMAP_API_KEY}`;
  const resp = await axios.request({
    url,
    method: "GET",
  });
  const current = resp.data.current.weather[0].description;
  const hourly = resp.data.hourly.slice(0, 12);
  const daily = resp.data.daily.slice(0, 2);
  const twelvehoursforecast = hourly.map(
    (item, index) => `Hour ${index + 1}. ${item.weather[0].description}`
  );

  const twodaysforecast = daily.map(
    (item, index) => `Day ${index + 1}. ${item.summary}`
  );
  const weather = `Current:${current}\nNext 12 hours forecast:-\n${twelvehoursforecast.join(
    "\n"
  )}\nNext 2 days forecase:-\n${twodaysforecast.join("\n")}`;
  return weather;
}
