import React, { useState, useCallback } from 'react';
import { debounce } from 'lodash';
import Autosuggest, { SuggestionsFetchRequestedParams } from 'react-autosuggest';
import { fetchLocations } from './api';
import { Location } from 'core/types';
import Spinner from 'components/spinner/Spinner';
import './search.scss'

export default function Search() {
  const [value, setValue] = useState<string>('');
  const [location, setLocation] = useState<Location>();
  const [locations, setLocations] = useState<Array<Location>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  console.log(location);
  const debouncedFetch = useCallback(
    debounce(
      async (e: SuggestionsFetchRequestedParams): Promise<void> => {
        if (!e.value) {
          return
        }
        const result = await fetchLocations(e.value);
        setLocations(result.geonames);
        setIsLoading(false);
      }, 1000)
    , []);

  const handleChange = (e: SuggestionsFetchRequestedParams) => {
    setIsLoading(true);
    setLocations([]);
    debouncedFetch(e);
  }
  const selectLocation = (suggestion: Location) => {
    setLocation(suggestion);
    setValue(suggestion.name);
  }
  return (
    <div className="search-box">
      {isLoading ? <div className="search-box--spinner"><Spinner /></div> : ''}
      <Autosuggest
        suggestions={locations}
        onSuggestionsFetchRequested={(e) => handleChange(e)}
        onSuggestionsClearRequested={() => {
          setLocations([]);
          setIsLoading(false);
        }
        }
        getSuggestionValue={location => location.name}
        renderSuggestion={location => <div>{location.name} - {location.countryName}</div>}
        onSuggestionSelected={(event, { suggestion, method }) => {
          selectLocation(suggestion);
        }
        }
        inputProps={{
          placeholder: "Enter a city",
          autoComplete: "off",
          value: value,
          name: "city",
          spellCheck: false,
          onChange: (_event, { newValue }) => {
            setValue(newValue);
          },
        }}
      />
    </div>
  );
}
