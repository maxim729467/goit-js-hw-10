import debounce from 'lodash.debounce';
import './css/styles.css';
import ApiService from './apiService';
import countryMarkup from './markup/country.hbs';
import countriesMarkup from './markup/countries.hbs';

const DEBOUNCE_DELAY = 300;
const input = document.getElementById('search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

const apiService = new ApiService();
input.addEventListener('input', debounce(onInputChangeHandler, DEBOUNCE_DELAY));

function onInputChangeHandler(e) {
  countryList.innerHTML = '';
  countryInfo.innerHTML = '';

  if (!e.target.value.trim().length) return;
  apiService.query = e.target.value;

  apiService
    .getCountries()
    .then(countries => {
      if (!countries.length) return;

      if (countries.length > 1) {
        countryList.innerHTML = countriesMarkup({ countries });
        return;
      }

      const [info] = countries;
      countryInfo.innerHTML = countryMarkup(info);
    })
    .catch(console.log);
}
