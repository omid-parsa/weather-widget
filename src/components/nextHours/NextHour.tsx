import React from 'react';
import { TimeSerie } from 'core/types';
import './nextHour.scss';

interface NextHoursProps {
  nextStatus: TimeSerie,
}
export default function NextHour({ nextStatus }: NextHoursProps) {
  if (!nextStatus) {
    return null;
  }
  return (
    <>
      <div className="next-hours">
        <img className="next-hours--image" src={`/icons/${nextStatus.data.next_1_hours.summary.symbol_code}.svg`} alt={nextStatus.data.next_1_hours.summary.symbol_code} />
        <p className="next-hours--text__time">{nextStatus.time.slice(11, 16)}</p>
        <p className="next-hours--degree">{Math.floor(nextStatus.data.instant.details.air_temperature)}&deg;C</p>
      </div>
    </>
  );
}