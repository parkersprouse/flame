import { WeatherData } from '../types';

export interface Config {
  WEATHER_API_KEY: string;
  appsSameTab: boolean;
  bookmarksSameTab: boolean;
  customTitle: string;
  daySchema: string;
  defaultSearchProvider: string;
  defaultTheme: string;
  disableAutofocus: boolean;
  dockerApps: boolean;
  dockerHost: string;
  greetingsSchema: string;
  hideApps: boolean;
  hideCategories: boolean;
  hideDate: boolean;
  hideHeader: boolean;
  hideSearch: boolean;
  isCelsius: boolean;
  isKilometer: boolean;
  kubernetesApps: boolean;
  lat: number;
  long: number;
  monthSchema: string;
  pinAppsByDefault: boolean;
  pinCategoriesByDefault: boolean;
  searchSameTab: boolean;
  secondarySearchProvider: string;
  showTime: boolean;
  unpinStoppedApps: boolean;
  useAmericanDate: boolean;
  useOrdering: string;
  weatherData: WeatherData;
  weatherDetailsUrl: string;
}
