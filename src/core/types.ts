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
export type WeatherData = {
  type: string,
  geometry: Geometry,
  properties: Properties
}
type Geometry = {
  coordinates: Array<number>
}
type Properties = {
  meta: {
    updated_at: string
  },
  timeseries: Array<TimeSerie>
}
export type TimeSerie = {
  time: string,
  data: {
    instant: {
      details: {
        air_pressure_at_sea_level: number,
        air_temperature: number,
        air_temperature_percentile_10: number,
        air_temperature_percentile_90: number,
        cloud_area_fraction: number,
        cloud_area_fraction_high: number,
        cloud_area_fraction_low: number,
        cloud_area_fraction_medium: number,
        dew_point_temperature: number,
        fog_area_fraction: number,
        relative_humidity: number,
        ultraviolet_index_clear_sky: number,
        wind_from_direction: number,
        wind_speed: number,
        wind_speed_of_gust: number,
        wind_speed_percentile_10: number,
        wind_speed_percentile_90: number,
      }
    },
    next_1_hours: NextHours,
    next_6_hours: NextHours,
    next_12_hours: NextHours,
  }
}

type NextHours = {
  details: {
    air_temperature_max: number,
    air_temperature_min: number,
    precipitation_amount: number,
    precipitation_amount_max: number,
    precipitation_amount_min: number,
    probability_of_precipitation: number,
    probability_of_thunder: number,
  },
  summary: {
    symbol_code: string
  }
}