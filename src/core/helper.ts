import { TimeSerie, WeatherData } from "./types";


const currentDate = new Date();

// add 0 in the beginning of numbers
const pad = (n: number) => {
  return n < 10 ? '0' + n : n
}
// return timestamp according the server response
const timeString = (date: number | string, hour: number | string): string => {
  const dateAndTime = currentDate.getFullYear() + "-" + pad(currentDate.getMonth() + 1) + "-" + date + "T" + hour + ":00:00Z";
  return dateAndTime;
}
// return current weather status
export const getCurrentStatus = (weatherData: WeatherData): TimeSerie | undefined => {
  const timestamp = timeString(pad(currentDate.getDate()), pad(currentDate.getHours()));
  return weatherData.properties.timeseries.find((timeserie) => timeserie.time === timestamp);
}
// return next hours weather status up to 3
export const getNextTimeSpots = (weatherData: WeatherData): (TimeSerie | undefined)[] => {
  const firstSpot = pad((Math.floor(currentDate.getHours() / 6) + 1) * 6);
  let timestamp = ''
  if (firstSpot > 18) {
    timestamp = timeString(pad(currentDate.getDate() + 1), firstSpot);
  }
  timestamp = timeString(pad(currentDate.getDate()), firstSpot);

  const firstNextElement = weatherData.properties.timeseries.find((timeserie) => timeserie.time === timestamp);
  const firstIndex = weatherData.properties.timeseries.findIndex(timeserie => timeserie === firstNextElement);

  return [
    firstNextElement,
    weatherData.properties.timeseries[firstIndex + 6],
    weatherData.properties.timeseries[firstIndex + 12],
  ];
}