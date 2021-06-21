import React, { useEffect, useState } from 'react';
import { Location, WeatherData } from 'core/types';
import { fetchWeatherData } from './api';
import { getNextTimeSpots, getCurrentStatus } from 'core/helper';
import NextHour from 'components/nextHours/NextHour';
import './weatherWidget.scss';

interface WeatherWidgetProps {
  location: Location
}
export default function WeatherWidget({ location }: WeatherWidgetProps) {
  const [weatherData, setWeatherData] = useState<WeatherData>();

  let currentStatus;
  let nextTimeSpotStatus;
  if (weatherData) {
    nextTimeSpotStatus = getNextTimeSpots(weatherData);
    currentStatus = getCurrentStatus(weatherData);
  }
  useEffect(() => {
    let isMounted = true;
    const fetch = async () => {
      const result = await fetchWeatherData(location.lat, location.lng);
      if (isMounted) {
        setWeatherData(result);
      }
    }
    fetch();
    return function cleanup() {
      isMounted = false;
    };
  }, [location])
  if (!currentStatus || !nextTimeSpotStatus) {
    return null;
  }
  return (
    <div className="widget">
      <div className="widget--current">
        <p className="widget--current--text__city">{location.name}</p>
        <img className="widget--current--image" src={`/icons/${currentStatus?.data.next_1_hours.summary.symbol_code}.svg`} alt={currentStatus?.data.next_1_hours.summary.symbol_code} />
        <p className="widget--current--text__degree">{Math.floor(currentStatus.data.instant.details.air_temperature)}&deg;C</p>
      </div>
      {
        nextTimeSpotStatus.map(element => element ? <NextHour key={element.time} nextStatus={element} /> : '')
      }
    </div>
  );
}