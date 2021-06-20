import AppSettings from 'AppSettings';
import { get } from 'core/communication';
import { Locations } from 'core/types';

const BASE_URL = AppSettings.apis.location.url;

export async function fetchLocations(text: string): Promise<Locations> {
  const username = 'eggstech';
  const url = `${BASE_URL}${text}&countryBias=no&maxRows=10&lang=en&username=${username}&orderBy=population&cities=cities500`;
  const result = await get<any>(url);
  return result;
}

