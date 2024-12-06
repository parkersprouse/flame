import { useState, useEffect, Fragment } from 'react';
import axios from 'axios';

// Redux
import { useSelector } from 'react-redux';

// Typescript
import { Weather, ApiResponse } from '../../../interfaces';

// CSS
import classes from './WeatherWidget.module.css';

// UI
import { WeatherIcon } from '../../UI';
import { State } from '../../../store/reducers';
import { weatherTemplate } from '../../../utility/templateObjects/weatherTemplate';

export const WeatherWidget = (): JSX.Element => {
  const { loading: configLoading, config } = useSelector(
    (state: State) => state.config
  );

  const [weather, setWeather] = useState<Weather>(weatherTemplate);
  const [isLoading, setIsLoading] = useState(true);

  // Initial request to get data
  useEffect(() => {
    axios
      .get<ApiResponse<Weather[]>>('/api/weather')
      .then((data) => {
        const weatherData = data.data.data[0];
        if (weatherData) {
          setWeather(weatherData);
        }
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  // Open socket for data updates
  useEffect(() => {
    const socketProtocol =
      document.location.protocol === 'http:' ? 'ws:' : 'wss:';
    const socketAddress = `${socketProtocol}//${window.location.host}/socket`;
    const webSocketClient = new WebSocket(socketAddress);

    webSocketClient.onmessage = (e) => {
      const data = JSON.parse(e.data);
      setWeather({
        ...weather,
        ...data,
      });
    };

    return () => webSocketClient.close();
  }, []);

  const widget_contents = configLoading ||
    (config.WEATHER_API_KEY && weather.id > 0 && (
      <Fragment>
        <div className={classes.WeatherIcon}>
          <WeatherIcon
            weatherStatusCode={weather.conditionCode}
            isDay={weather.isDay}
          />
        </div>
        <div className={classes.WeatherDetails}>
          {/* TEMPERATURE */}
          {config.isCelsius ? (
            <span>{weather.tempC}&deg;C</span>
          ) : (
            <span>{Math.round(weather.tempF)}&deg;F</span>
          )}

          {/* ADDITIONAL DATA */}
          <span>{weather[config.weatherData]}%</span>
        </div>
      </Fragment>
    ));

  if (config.weatherDetailsUrl) {
    return (
      <a
        className={classes.WeatherWidget}
        href={config.weatherDetailsUrl}
        target='_blank'
        rel='noopener noreferrer'
      >
        {widget_contents}
      </a>
    );
  } else {
    return (
      <div className={classes.WeatherWidget}>
        {widget_contents}
      </div>
    )
  }
};
