export interface BirthData {
  date: string;
  time: string;
  location: {
    name: string;
    lat: number;
    lon: number;
    timezone: string;
  };
}

export interface PlanetPosition {
  planet: string;
  longitude: number;
  latitude: number;
  rightAscension: number;
  declination: number;
}

export interface AstrocartographyLine {
  planet: string;
  type: 'ascendant' | 'descendant' | 'midheaven' | 'nadir';
  coordinates: Array<{ lat: number; lon: number }>;
  color: string;
  influence: string;
}

export interface LocationRecommendation {
  id: string;
  name: string;
  country: string;
  lat: number;
  lon: number;
  image: string;
  primaryInfluence: {
    planet: string;
    type: string;
    color: string;
  };
  description: string;
  themes: string[];
  strength: number;
}

export interface AstroCalculationResult {
  birthData: BirthData;
  planets: PlanetPosition[];
  lines: AstrocartographyLine[];
  recommendations: LocationRecommendation[];
}
