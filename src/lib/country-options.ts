import { getAllCountries } from 'countries-and-timezones';

export const countryOptions: Array<{
  label: string;
  value: string;
}> = [
  {
    label: 'Malaysia',
    value: 'Malaysia',
  },
];

const allCountries = Object.values(getAllCountries());

allCountries.sort((a, b) => {
  if (a.name < b.name) {
    return -1;
  }
  if (a.name > b.name) {
    return 1;
  }
  return 0;
});

allCountries.forEach((country) => {
  if (country.name !== 'Malaysia') {
    countryOptions.push({
      label: country.name,
      value: country.name,
    });
  }
});
