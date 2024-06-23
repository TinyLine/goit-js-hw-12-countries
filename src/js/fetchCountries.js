export default function fetchCountries(searchQuery) {
  const url = `https://restcountries.com/v2/name/${searchQuery}`;
  return fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then(data => {
      return data.map(country => ({
        name: country.name,
        capital: country.capital,
        population: country.population,
        flag: country.flag,
      }));
    });
}
