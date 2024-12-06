import { Config } from '../../interfaces';

export const configTemplate: Config = {
  WEATHER_API_KEY: '',
  appsSameTab: true,
  bookmarksSameTab: true,
  customTitle: 'New Tab',
  daySchema: 'Sunday;Monday;Tuesday;Wednesday;Thursday;Friday;Saturday',
  defaultSearchProvider: 'l',
  defaultTheme: 'nord',
  disableAutofocus: false,
  dockerApps: false,
  dockerHost: 'localhost',
  greetingsSchema: 'Good evening!;Good afternoon!;Good morning!;Good night!',
  hideApps: false,
  hideCategories: false,
  hideDate: false,
  hideHeader: false,
  hideSearch: false,
  isCelsius: false,
  isKilometer: false,
  kubernetesApps: false,
  lat: 0,
  long: 0,
  monthSchema: 'January;February;March;April;May;June;July;August;September;October;November;December',
  pinAppsByDefault: true,
  pinCategoriesByDefault: true,
  searchSameTab: false,
  secondarySearchProvider: 'd',
  showTime: true,
  unpinStoppedApps: false,
  useAmericanDate: true,
  useOrdering: 'name',
  weatherData: 'humidity',
  weatherDetailsUrl: '',
};
