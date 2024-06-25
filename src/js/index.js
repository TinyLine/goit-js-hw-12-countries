import fetchCountries from './fetchCountries';
import debounce from './lodash.debounce';

const searchInput = document.querySelector('#search');
const countryList = document.querySelector('#country-list');

searchInput.addEventListener('input', debounce(onSearch, 500));

function onSearch(event) {
  const query = event.target.value.trim();
  if (query === '') {
    countryList.innerHTML = '';
    return;
  }

  fetchCountries(query)
    .then(countries => {
      if (countries.length > 10) {
        alert('Too many matches found. Please enter a more specific query!');
        countryList.innerHTML = '';
      } else if (countries.length === 0) {
        alert('No countries found.');
        countryList.innerHTML = '';
      } else {
        renderCountries(countries);
      }
    })
    .catch(err => {
      console.error('Error fetching countries:', err.message || err);
      alert('No countries found with that name.');
      countryList.innerHTML = '';
    });
}

function renderCountries(countries) {
  countryList.innerHTML = countries
    .map(country => `
      <li>
        <img src="${country.flag}" alt="Flag of ${country.name}" width="30" height="20">
        <strong>${country.name}</strong> - Capital: ${country.capital}, Population: ${country.population}
      </li>
    `)
    .join('');
}



