
# US Cities & Zipcode Utilities

A lightweight TypeScript utility library to work with US cities and ZIP codes — perfect for filters, maps, address lookups, and geolocation logic.

---

## Features

- 🔍 **Get states** and cities from a normalized dataset
- 📬 Lookup city data by ZIP code
- 🗺️ Find the **nearest city** by coordinates (lat/lon)
- 🏙️ Search cities by name (fuzzy search)
- 📌 Filter cities by **state**, **county**, or ZIP
- 📦 Pure, fast, and dependency-free

---

## Installation

```bash
npm install @mardillu/us-cities-utils
# or
yarn add @mardillu/us-cities-utils
````

---

## Usage

```ts
import {
  getStates,
  getCities,
  getCity,
  getAllZips,
  searchCities,
  groupCitiesByState,
  getCitiesByCounty,
  getNearestCity
} from '@mardillu/us-cities-utils';
```

---

## API Reference

### `getStates(): State[]`

Returns a list of all US states in `{ id: string, name: string }` format.

---

### `getCities(stateAbbr: string): CuCity[]`

Returns all cities in a given state abbreviation (e.g. `'NY'`, `'CA'`).

---

### `getCity(zip: string): CuCity | undefined`

Returns city information for a given ZIP code.

---

### `searchCities(query: string): CuCity[]`

Returns cities whose names match (or partially match) the search string.

---

### `groupCitiesByState(): Record<string, CuCity[]>`

Groups all cities in the dataset by their state abbreviation.

---

### `getAllZips(): string[]`

Returns a list of all ZIP codes in the dataset.

---

### `getCitiesByCounty(county: string): CuCity[]`

Returns a list of cities belonging to a given county name.

---

### `getNearestCity(lat: number, lon: number): CuCity | undefined`

Finds and returns the city nearest to the given latitude and longitude using the Haversine formula.

---

## Testing

```bash
npm test
```

Includes robust unit tests for all exported functions and geolocation logic.

---

## Data Format

Each city is in the format:

```ts
interface CuCity {
  zip: string;
  city: string;
  state: string;
  state_abbr: string;
  county: string;
  count_code: string;
  latitude: number;
  longitude: number;
}
```

---

## Roadmap

* [ ] Add support for Canadian provinces
* [ ] Add caching for nearest city lookup
* [ ] Add fuzzy scoring to `searchCities()`

---

## Contribution

PRs are welcome! If you'd like to contribute, open an issue or submit a PR.

---

## License

MIT © \Mardillu

```