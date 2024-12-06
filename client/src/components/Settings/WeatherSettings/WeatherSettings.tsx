import { useState, ChangeEvent, useEffect, FormEvent } from 'react';
import axios from 'axios';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../../store';
import { State } from '../../../store/reducers';

// Typescript
import { ApiResponse, Weather, WeatherForm } from '../../../interfaces';

// CSS
import classes from './WeatherSettings.module.css';

// UI
import { InputGroup, Button, SettingsHeadline } from '../../UI';

// Utils
import { inputHandler, weatherSettingsTemplate } from '../../../utility';

export const WeatherSettings = (): JSX.Element => {
  const { loading, config } = useSelector((state: State) => state.config);

  const dispatch = useDispatch();
  const { createNotification, updateConfig } = bindActionCreators(
    actionCreators,
    dispatch
  );

  // Initial state
  const [formData, setFormData] = useState<WeatherForm>(
    weatherSettingsTemplate
  );

  // Get config
  useEffect(() => {
    setFormData({
      ...config,
    });
  }, [loading]);

  // Form handler
  const formSubmitHandler = async (e: FormEvent) => {
    e.preventDefault();

    // Check for api key input
    if ((formData.lat || formData.long) && !formData.WEATHER_API_KEY) {
      createNotification({
        title: 'Warning',
        message: 'API key is missing. Weather Module will NOT work',
      });
    }

    // Save settings
    await updateConfig(formData);

    // Update weather
    axios
      .get<ApiResponse<Weather>>('/api/weather/update')
      .then(() => {
        createNotification({
          title: 'Success',
          message: 'Weather updated',
        });
      })
      .catch((err) => {
        createNotification({
          title: 'Error',
          message: err.response.data.error,
        });
      });
  };

  // Input handler
  const inputChangeHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    options?: { isNumber?: boolean; isBool?: boolean }
  ) => {
    inputHandler<WeatherForm>({
      e,
      options,
      setStateHandler: setFormData,
      state: formData,
    });
  };

  // Get user location
  const getLocation = () => {
    window.navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setFormData({
          ...formData,
          lat: latitude,
          long: longitude,
        });
      }
    );
  };

  return (
    <form onSubmit={(e) => formSubmitHandler(e)}>
      <div className={classes.CategoryWrapper}>
        <SettingsHeadline text="API" />
        {/* API KEY */}
        <InputGroup>
          <label htmlFor="WEATHER_API_KEY">API Key</label>
          <input
            id="WEATHER_API_KEY"
            name="WEATHER_API_KEY"
            onChange={(e) => inputChangeHandler(e)}
            placeholder="API Key"
            type="text"
            value={formData.WEATHER_API_KEY}
          />
          <span>
            Using <a href="https://www.weatherapi.com/pricing.aspx" target="blank">Weather API</a>.
            {' '}
            An API key is required the use the weather module.
          </span>
        </InputGroup>
      </div>

      <div className={classes.CategoryWrapper}>
        <SettingsHeadline text="Location" />

        {/* LAT */}
        <InputGroup>
          <label htmlFor="lat">Latitude</label>
          <input
            id="lat"
            lang="en-150"
            name="lat"
            onChange={(e) => inputChangeHandler(e, { isNumber: true })}
            placeholder="52.22"
            step="any"
            type="number"
            value={formData.lat}
          />
        </InputGroup>

        {/* LONG */}
        <InputGroup>
          <label htmlFor="long">Longitude</label>
          <input
            id="long"
            lang="en-150"
            name="long"
            onChange={(e) => inputChangeHandler(e, { isNumber: true })}
            placeholder="21.01"
            step="any"
            type="number"
            value={formData.long}
          />
        </InputGroup>

        <a
          href="#"
          onClick={getLocation}
        >
          Use Current Location
        </a>
      </div>

      <div className={classes.CategoryWrapper}>
        <SettingsHeadline text="Other" />
        {/* TEMPERATURE */}
        <InputGroup>
          <label htmlFor="isCelsius">Temperature Unit</label>
          <select
            id="isCelsius"
            name="isCelsius"
            onChange={(e) => inputChangeHandler(e, { isBool: true })}
            value={formData.isCelsius ? 1 : 0}
          >
            <option value={1}>Celsius</option>
            <option value={0}>Fahrenheit</option>
          </select>
        </InputGroup>

        {/* WEATHER DATA */}
        <InputGroup>
          <label htmlFor="weatherData">Additional Weather Data</label>
          <select
            id="weatherData"
            name="weatherData"
            onChange={(e) => inputChangeHandler(e)}
            value={formData.weatherData}
          >
            <option value="cloud">Cloud Coverage</option>
            <option value="humidity">Humidity</option>
          </select>
        </InputGroup>

        {/* FULL DETAILS URL */}
        <InputGroup>
          <label htmlFor="weatherDetailsUrl">Full Details URL</label>
          <input
            id="weatherDetailsUrl"
            name="weatherDetailsUrl"
            onChange={(e) => inputChangeHandler(e)}
            placeholder="https://weather.com/weather/today/l/..."
            type="text"
            value={formData.weatherDetailsUrl}
          />
          <span>
            You can provide a URL here that will be linked to clicking on the Weather Widget
          </span>
        </InputGroup>
      </div>

      <Button type='submit'>Save Changes</Button>
    </form>
  );
};
