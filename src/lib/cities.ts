export type City = {
  name: string;
  country: string;
  lat: number;
  lon: number;
  tz?: string;
  pop?: number;
};

let _cache: City[] | null = null;

export async function loadCities(): Promise<City[]> {
  if (_cache) return _cache;
  const res = await fetch('/cities.json', { cache: 'force-cache' });
  if (!res.ok) throw new Error('Failed to load cities.json');
  _cache = await res.json();
  return _cache!;
}

export async function searchCities(query: string, max = 10): Promise<City[]> {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const cities = await loadCities();
  return cities
    .filter(c =>
      c.name.toLowerCase().includes(q) ||
      `${c.name}, ${c.country}`.toLowerCase().includes(q)
    )
    .sort((a, b) => (b.pop ?? 0) - (a.pop ?? 0))
    .slice(0, max);
}
