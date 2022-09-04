import { Notify } from 'notiflix/build/notiflix-notify-aio';

const NOTIFICATIONS = {
  TOO_MANY_MATCHES:
    'Too many matches found. Please enter a more specific name.',
  NO_MATCHES: 'Oops, there is no country with that name',
  ERROR: 'Something went wrong',
};

const BASE_URL = 'https://restcountries.com/v3.1/name';
const FILTERS = ['name', 'capital', 'population', 'flags', 'languages'];

class ApiService {
  constructor() {
    this.searchQuery = '';
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }

  getCountries() {
    const url = `${BASE_URL}/${this.searchQuery}?fields=${FILTERS.join(',')}`;

    return fetch(url)
      .then(res => {
        if (!res.ok) {
          Notify.failure(NOTIFICATIONS.NO_MATCHES);
          return [];
        }

        return res.json();
      })
      .then(countries => {
        if (countries.length > 10) {
          Notify.info(NOTIFICATIONS.TOO_MANY_MATCHES);
          return [];
        }

        return countries;
      })
      .catch(err => {
        Notify.failure(NOTIFICATIONS.ERROR);
        return err;
      });
  }
}

export default ApiService;
