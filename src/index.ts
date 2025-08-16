import {cityList, states} from "./data/states";
import {CuCity} from "./data/types";

const cities = cityList as unknown as CuCity[];

export function getStates() {
    return states;
}

export function getCities(stateAbbr: string): CuCity[] {
    return cities.filter(city => city.stateAbbr === stateAbbr.toUpperCase());
}

export function getCity(zip: string): CuCity | undefined {
    return cities.find(city => city.zip === zip);
}

export function searchCities(query: string): CuCity[] {
    const q = query.toLowerCase();
    return cities.filter(city => city.city.toLowerCase().includes(q));
}

export function groupCitiesByState(): Record<string, CuCity[]> {
    return cities.reduce((acc, city) => {
        if (!acc[city.stateAbbr]) acc[city.stateAbbr] = [];
        acc[city.stateAbbr].push(city);
        return acc;
    }, {} as Record<string, CuCity[]>);
}

export function getAllZips(): string[] {
    return cities.map(c => c.zip);
}

export function getCitiesByCounty(county: string): CuCity[] {
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

export function getNearestCity(lat: number, lon: number): CuCity | undefined {
    let minDist = Infinity;
    let nearest: CuCity | undefined;

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