import React, { useState, useCallback } from 'react';
import { debounce } from 'lodash';
import Autosuggest, { SuggestionsFetchRequestedParams } from 'react-autosuggest';
import { fetchLocations } from './api';
import { Location } from 'core/types';
import Spinner from 'components/spinner/Spinner';
import './search.scss'

interface SearchProps {
  handleSetLocation: (value: Location) => void
}
export default function Search({ handleSetLocation }: SearchProps) {
  const [value, setValue] = useState<string>('');
  const [locations, setLocations] = useState<Array<Location>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const debouncedFetch = useCallback(
    debounce(
      async (e: SuggestionsFetchRequestedParams): Promise<void> => {
        const result = await fetchLocations(e.value);
        setLocations(result.geonames);
        setIsLoading(false);
      }, 1000)
    , []);

  const handleChange = (e: SuggestionsFetchRequestedParams): void => {
    if (e.value && e.reason !== "input-focused") {
      debouncedFetch(e);
      setIsLoading(true);
      setLocations([]);
    }
  }
  const selectLocation = (suggestion: Location): void => {
    handleSetLocation(suggestion);
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
