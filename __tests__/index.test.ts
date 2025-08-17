import {
    getStates,
    getCities,
    getCity,
    searchCities,
    groupCitiesByState,
    getAllZips,
    getCitiesByCounty,
    getNearestCity, __internal__,
    getCitiesBySateName,
    getZipcodes,
    getZipcodesBySateName
} from '../src';

jest.mock('../src/data/us_cities.json', () => ({
    __esModule: true,
    default: require('../__mocks__/mockCities').mockCities,
}));

describe('City Utilities', () => {
    test('getStates() returns list of state objects', () => {
        const states = getStates();
        expect(states).toContainEqual({ nameAbbr: 'NY', name: 'New York' });
        expect(states.length).toBeGreaterThan(0);
    });

    test('getCities(stateAbbr) returns unique cities in the state', () => {
        const cities = getCities('NY');
        expect(cities).toHaveLength(1);
        expect(cities[0].name).toBe('New York');
    });

    test('getCitiesBySateName(state) returns unique cities in the state', () => {
        const cities = getCitiesBySateName('New York');
        expect(cities).toHaveLength(1);
        expect(cities[0].name).toBe('New York');
    });

    test('getZipcodes(state) returns cities in the state', () => {
        const cities = getZipcodes('NY');
        expect(cities).toHaveLength(2);
        expect(cities[0].zip).toBe('10001');
        expect(cities[1].zip).toBe('10002');
    });

    test('getZipcodesBySateName(state) returns cities in the state', () => {
        const cities = getZipcodesBySateName('New York');
        expect(cities).toHaveLength(2);
        expect(cities[0].zip).toBe('10001');
        expect(cities[1].zip).toBe('10002');
    });

    test('getCity(zip) returns the correct city object', () => {
        const city = getCity('90001');
        expect(city?.name).toBe('Los Angeles');
        expect(city?.stateAbbr).toBe('CA');
    });

    test('searchCities(query) returns partial matches', () => {
        const results = searchCities('los');
        expect(results).toHaveLength(1);
        expect(results[0].name).toBe('Los Angeles');
    });

    test('groupCitiesByState() groups correctly', () => {
        const grouped = groupCitiesByState();
        expect(grouped.NY[0].name).toBe('New York');
        expect(grouped.CA[0].name).toBe('Los Angeles');
    });

    test('getAllZips() returns all ZIPs', () => {
        const zips = getAllZips();
        expect(zips).toContain('10001');
        expect(zips).toContain('10002');
        expect(zips).toContain('90001');
        expect(zips.length).toBe(4);
    });

    test('getCitiesByCounty(county) returns matches', () => {
        const cities = getCitiesByCounty('Cook');
        expect(cities).toHaveLength(1);
        expect(cities[0].name).toBe('Chicago');
    });

    test('deg2rad() returns correct conversion', () => {
        expect(__internal__.deg2rad(180)).toBeCloseTo(Math.PI);
    });

    test('haversine() returns correct distance in miles', () => {
        const dist = __internal__.haversine(40.7484, -73.9967, 33.9739, -118.2487); // NY to LA
        expect(dist).toBeGreaterThan(2400);
        expect(dist).toBeLessThan(3000);
    });

    test('getNearestCity(lat, lon) finds the closest city', () => {
        const nearest = getNearestCity(41.88, -87.62); // Chicago
        expect(nearest?.name).toBe('Chicago');
    });
});
