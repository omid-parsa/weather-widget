import { Dispatch } from "react";

export type Locations = {
  totalResultsCount: number,
  geonames: Array<Location>
}
export type Location = {
  countryCode: string,
  countryId: string,
  countryName: string,
  lat: string,
  lng: string,
  name: string,
  toponymName: string
}
export type Store = {
  location: Location | null
}
export enum ActionTypes {
  set_location
}
export type SetLocationAction = {
  type: ActionTypes.set_location,
  payload: Location
}