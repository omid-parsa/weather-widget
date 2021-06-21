import AppSettings from 'AppSettings';
import { get } from 'core/communication';
import { WeatherData } from 'core/types';

const BASE_URL = AppSettings.apis.forecast.url;

export async function fetchWeatherData(lat: string, lng: string): Promise<WeatherData> {
  const url = `${BASE_URL}lat=${lat}&lon=${lng}`;
  const result = await get<WeatherData>(url);
  return result;
}

