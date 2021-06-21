import React, { useState, useEffect } from 'react';
import storage from "local-storage-fallback";
import Header from 'components/header/Header';
import Search from 'components/search/Search';
import WeatherWidget from 'components/weatherWidget/WeatherWidget';
import { Location } from 'core/types';
import './App.scss';

function App() {
  const [location, setLocation] = useState<Location>();
  const handleSetLocation = (value: Location): void => {
    setLocation(value);
    storage.setItem("location", JSON.stringify(value));
  }
  useEffect(() => {
    storage.clear();
    const savedLocationString = storage.getItem("location");
    if (savedLocationString) {
      handleSetLocation(JSON.parse(savedLocationString));
    }
  }, []);

  return (
    <div className="App">
      <Header />
      <Search handleSetLocation={handleSetLocation} />
      {
        location ? <WeatherWidget location={location} /> : ''
      }
    </div>
  );
}

export default App;
