export interface LocationSearchResult {
  name: string;
  country: string;
  lat: number;
  lon: number;
  timezone: string;
}

// Sample location data for autocomplete
export const sampleLocations: LocationSearchResult[] = [
  { name: 'New York', country: 'United States', lat: 40.7128, lon: -74.0060, timezone: 'America/New_York' },
  { name: 'London', country: 'United Kingdom', lat: 51.5074, lon: -0.1278, timezone: 'Europe/London' },
  { name: 'Paris', country: 'France', lat: 48.8566, lon: 2.3522, timezone: 'Europe/Paris' },
  { name: 'Tokyo', country: 'Japan', lat: 35.6762, lon: 139.6503, timezone: 'Asia/Tokyo' },
  { name: 'Sydney', country: 'Australia', lat: -33.8688, lon: 151.2093, timezone: 'Australia/Sydney' },
  { name: 'Los Angeles', country: 'United States', lat: 34.0522, lon: -118.2437, timezone: 'America/Los_Angeles' },
  { name: 'Mumbai', country: 'India', lat: 19.0760, lon: 72.8777, timezone: 'Asia/Kolkata' },
  { name: 'São Paulo', country: 'Brazil', lat: -23.5505, lon: -46.6333, timezone: 'America/Sao_Paulo' },
  { name: 'Cairo', country: 'Egypt', lat: 30.0444, lon: 31.2357, timezone: 'Africa/Cairo' },
  { name: 'Bangkok', country: 'Thailand', lat: 13.7563, lon: 100.5018, timezone: 'Asia/Bangkok' },
];

export function searchLocations(query: string): LocationSearchResult[] {
  if (!query || query.length < 2) return [];
  
  const lowercaseQuery = query.toLowerCase();
  return sampleLocations.filter(location =>
    location.name.toLowerCase().includes(lowercaseQuery) ||
    location.country.toLowerCase().includes(lowercaseQuery)
  );
}

export function detectTimezone(lat: number, lon: number): string {
  // Simple timezone detection based on longitude
  // In production, you'd use a proper timezone API
  const timezoneOffset = Math.round(lon / 15);
  
  if (timezoneOffset >= -12 && timezoneOffset <= 12) {
    return `UTC${timezoneOffset >= 0 ? '+' : ''}${timezoneOffset}`;
  }
  
  return 'UTC';
}
