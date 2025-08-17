import {cityList, states} from "./data/states";
import {UsCity} from "./data/types";

const cities = cityList as unknown as UsCity[];

export function getStates() {
    return states;
}

export function getCities(stateAbbr: string): UsCity[] {
    const filteredCities = cities.filter(city => city.stateAbbr === stateAbbr.toUpperCase());

    // Use a Set to filter out duplicate city names
    const uniqueCities = filteredCities.filter((value, index, self) =>
            index === self.findIndex((t) => (
                t.name === value.name
            ))
    );

    return uniqueCities.sort((a, b) => a.name.localeCompare(b.name));
}

export function getCitiesBySateName(state: string): UsCity[] {
    const filteredCities = cities.filter(city => city.state.toLowerCase() === state.toLowerCase());

    const uniqueCities = filteredCities.filter((value, index, self) =>
            index === self.findIndex((t) => (
                t.name === value.name
            ))
    );

    return uniqueCities.sort((a, b) => a.name.localeCompare(b.name));
}

export function getZipcodes(stateAbbr: string): UsCity[] {
    return cities.filter(city => city.stateAbbr === stateAbbr.toUpperCase());
}

export function getZipcodesBySateName(state: string): UsCity[] {
    return cities.filter(city => city.state.toLowerCase() === state.toLowerCase());
}

export function getCity(zip: string): UsCity | undefined {
    return cities.find(city => city.zip === zip);
}

export function searchCities(query: string): UsCity[] {
    const q = query.toLowerCase();
    const filteredCities = cities.filter(city => city.name.toLowerCase().includes(q));

    const uniqueCities = filteredCities.filter((value, index, self) =>
            index === self.findIndex((t) => (
                t.name === value.name
            ))
    );

    return uniqueCities.sort((a, b) => a.name.localeCompare(b.name));
}

export function searchCitiesInSate(stateAbbr: string, query: string): UsCity[] {
    const q = query.toLowerCase();
    const filteredCities = cities.filter(city =>  city.stateAbbr === stateAbbr.toUpperCase() && city.name.toLowerCase().includes(q));

    const uniqueCities = filteredCities.filter((value, index, self) =>
            index === self.findIndex((t) => (
                t.name === value.name
            ))
    );

    return uniqueCities.sort((a, b) => a.name.localeCompare(b.name));
}

export function searchCitiesInSateByStateName(state: string, query: string): UsCity[] {
    const q = query.toLowerCase();
    const filteredCities = cities.filter(city =>  city.state === state.toUpperCase() && city.name.toLowerCase().includes(q));

    const uniqueCities = filteredCities.filter((value, index, self) =>
            index === self.findIndex((t) => (
                t.name === value.name
            ))
    );

    return uniqueCities.sort((a, b) => a.name.localeCompare(b.name));
}

export function groupCitiesByState(): Record<string, UsCity[]> {
    return cities.reduce((acc, city) => {
        if (!acc[city.stateAbbr]) acc[city.stateAbbr] = [];
        acc[city.stateAbbr].push(city);
        return acc;
    }, {} as Record<string, UsCity[]>);
}

export function getAllZips(): string[] {
    return cities.map(c => c.zip);
}

export function getCitiesByCounty(county: string): UsCity[] {
    const normalized = county.toLowerCase();
    return cities.filter(city => city.county.toLowerCase() === normalized);
}

function deg2rad(value: number): number {
    return value * (Math.PI / 180);
}

function haversine(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a = Math.sin(dLat / 2) ** 2 +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return 3961 * c; // Miles
}

export function getNearestCity(lat: number, lon: number): UsCity | undefined {
    let minDist = Infinity;
    let nearest: UsCity | undefined;

    for (const city of cities) {
        const dist = haversine(lat, lon, parseFloat(city.latitude), parseFloat(city.longitude));
        if (dist < minDist) {
            minDist = dist;
            nearest = city;
        }
    }
    return nearest;
}

export const __internal__ = {
    deg2rad,
    haversine,
};