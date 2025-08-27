import { BirthData, PlanetPosition, AstrocartographyLine, AstroCalculationResult, LocationRecommendation } from '@/types/astro';
import { worldCities } from '@/lib/location-data';

// Simple astronomical calculations for demonstration
// In a production app, you would use libraries like astronomia or swiss ephemeris
export class AstroCalculations {
  
  static calculatePlanetPositions(birthData: BirthData): PlanetPosition[] {
    const date = new Date(`${birthData.date}T${birthData.time}`);
    const jd = this.getJulianDate(date);
    
    // Simplified planet calculations - in reality you'd use precise ephemeris data
    const planets: PlanetPosition[] = [
      {
        planet: 'Sun',
        longitude: this.calculateSunLongitude(jd),
        latitude: 0,
        rightAscension: 0,
        declination: 0,
      },
      {
        planet: 'Moon',
        longitude: this.calculateMoonLongitude(jd),
        latitude: 0,
        rightAscension: 0,
        declination: 0,
      },
      {
        planet: 'Mercury',
        longitude: this.calculatePlanetLongitude(jd, 'Mercury'),
        latitude: 0,
        rightAscension: 0,
        declination: 0,
      },
      {
        planet: 'Venus',
        longitude: this.calculatePlanetLongitude(jd, 'Venus'),
        latitude: 0,
        rightAscension: 0,
        declination: 0,
      },
      {
        planet: 'Mars',
        longitude: this.calculatePlanetLongitude(jd, 'Mars'),
        latitude: 0,
        rightAscension: 0,
        declination: 0,
      },
      {
        planet: 'Jupiter',
        longitude: this.calculatePlanetLongitude(jd, 'Jupiter'),
        latitude: 0,
        rightAscension: 0,
        declination: 0,
      },
      {
        planet: 'Saturn',
        longitude: this.calculatePlanetLongitude(jd, 'Saturn'),
        latitude: 0,
        rightAscension: 0,
        declination: 0,
      },
    ];
    
    return planets;
  }
  
  static calculateAstrocartographyLines(birthData: BirthData, planets: PlanetPosition[]): AstrocartographyLine[] {
    const lines: AstrocartographyLine[] = [];
    
    planets.forEach(planet => {
      // Calculate lines for each planet
      // This is a simplified version - real astrocartography requires complex calculations
      
      // Ascendant line (where planet rises)
      lines.push({
        planet: planet.planet,
        type: 'ascendant',
        coordinates: this.calculateLineCoordinates(planet.longitude, 'ascendant', birthData),
        color: this.getPlanetColor(planet.planet),
        influence: this.getPlanetInfluence(planet.planet, 'ascendant'),
      });
      
      // Midheaven line (where planet culminates)
      lines.push({
        planet: planet.planet,
        type: 'midheaven',
        coordinates: this.calculateLineCoordinates(planet.longitude, 'midheaven', birthData),
        color: this.getPlanetColor(planet.planet),
        influence: this.getPlanetInfluence(planet.planet, 'midheaven'),
      });
    });
    
    return lines;
  }
  
  static generateLocationRecommendations(lines: AstrocartographyLine[], birthData: BirthData): LocationRecommendation[] {
    
    // Calculate distance from birth location for weighting
    const birthLat = birthData.location.lat;
    const birthLon = birthData.location.lon;
    
    // Get strongest planetary lines (by type and strength)
    const strongLines = lines.filter(line => 
      line.type === 'ascendant' || line.type === 'midheaven'
    ).slice(0, 5);
    
    const recommendations: LocationRecommendation[] = [];
    let recommendationId = 1;
    
    // For each strong line, find cities close to the line coordinates
    strongLines.forEach(line => {
      const planetInfo = this.getPlanetInfo(line.planet);
      
      // Find cities within reasonable distance of line coordinates
      const nearbyCities = worldCities.filter((city: any) => {
        // Check if city is close to any point on the line
        return line.coordinates.some(coord => {
          const distance = this.calculateDistance(
            city.lat, city.lon, 
            coord.lat, coord.lon
          );
          return distance < 500; // Within 500km of the line
        });
      });
      
      // Select 1-2 cities per line, prioritizing major cities
      const selectedCities = nearbyCities
        .filter((city: any) => {
          // Prioritize major cities and diverse locations
          const majorCities = [
            'London', 'Paris', 'Tokyo', 'New York', 'Los Angeles', 'Sydney', 
            'Mumbai', 'Delhi', 'Shanghai', 'Beijing', 'São Paulo', 'Rio de Janeiro',
            'Mexico City', 'Cairo', 'Istanbul', 'Moscow', 'Berlin', 'Rome',
            'Madrid', 'Barcelona', 'Amsterdam', 'Vienna', 'Prague', 'Budapest',
            'Bangkok', 'Singapore', 'Seoul', 'Osaka', 'Jakarta', 'Manila',
            'Buenos Aires', 'Lima', 'Bogotá', 'Santiago', 'Caracas',
            'Lagos', 'Nairobi', 'Cape Town', 'Johannesburg', 'Casablanca',
            'Tel Aviv', 'Dubai', 'Riyadh', 'Tehran', 'Baghdad',
            'Toronto', 'Vancouver', 'Montreal', 'Chicago', 'Miami', 'San Francisco'
          ];
          return majorCities.includes(city.name);
        })
        .slice(0, 2);
      
      selectedCities.forEach((city: any) => {
        const distanceFromBirth = this.calculateDistance(
          birthLat, birthLon, city.lat, city.lon
        );
        
        recommendations.push({
          id: recommendationId.toString(),
          name: city.name,
          country: city.country,
          lat: city.lat,
          lon: city.lon,
          image: this.getCityImage(city.name),
          primaryInfluence: {
            planet: line.planet,
            type: line.type.charAt(0).toUpperCase() + line.type.slice(1) + ' Line',
            color: line.color,
          },
          description: `${line.influence}. ${planetInfo.locationBenefit}`,
          themes: planetInfo.themes,
          strength: Math.max(0.7, 1 - (distanceFromBirth / 20000)), // Higher for closer locations
        });
        
        recommendationId++;
      });
    });
    
    // If not enough recommendations, add some based on planetary strength
    if (recommendations.length < 3) {
      const fallbackCities = [
        { name: 'Bali', country: 'Indonesia', lat: -8.3405, lon: 115.0920, planet: 'Venus' },
        { name: 'Sedona', country: 'United States', lat: 34.8697, lon: -111.7610, planet: 'Moon' },
        { name: 'Machu Picchu', country: 'Peru', lat: -13.1631, lon: -72.5450, planet: 'Jupiter' },
      ].filter(city => !recommendations.find(rec => rec.name === city.name));
      
      fallbackCities.slice(0, 3 - recommendations.length).forEach(city => {
        const planetInfo = this.getPlanetInfo(city.planet);
        recommendations.push({
          id: recommendationId.toString(),
          name: city.name,
          country: city.country,
          lat: city.lat,
          lon: city.lon,
          image: this.getCityImage(city.name),
          primaryInfluence: {
            planet: city.planet,
            type: 'General Influence',
            color: this.getPlanetColor(city.planet),
          },
          description: planetInfo.locationBenefit,
          themes: planetInfo.themes,
          strength: 0.75,
        });
        recommendationId++;
      });
    }
    
    // Sort by strength and return top 6
    return recommendations
      .sort((a, b) => b.strength - a.strength)
      .slice(0, 6);
  }
  
  private static getPlanetInfo(planet: string) {
    const planetData: { [key: string]: { themes: string[], locationBenefit: string } } = {
      Sun: {
        themes: ['Identity', 'Leadership', 'Confidence'],
        locationBenefit: 'Perfect for building self-confidence and taking on leadership roles.'
      },
      Moon: {
        themes: ['Intuition', 'Emotions', 'Home'],
        locationBenefit: 'Ideal for emotional healing and connecting with your intuitive side.'
      },
      Mercury: {
        themes: ['Communication', 'Learning', 'Travel'],
        locationBenefit: 'Excellent for intellectual pursuits and communication skills.'
      },
      Venus: {
        themes: ['Love', 'Creativity', 'Beauty'],
        locationBenefit: 'Great for romantic relationships and artistic expression.'
      },
      Mars: {
        themes: ['Action', 'Energy', 'Competition'],
        locationBenefit: 'Perfect for taking initiative and pursuing ambitious goals.'
      },
      Jupiter: {
        themes: ['Growth', 'Learning', 'Expansion'],
        locationBenefit: 'Ideal for personal growth and expanding your horizons.'
      },
      Saturn: {
        themes: ['Discipline', 'Structure', 'Career'],
        locationBenefit: 'Great for building long-term stability and career advancement.'
      },
    };
    
    return planetData[planet] || planetData.Sun;
  }
  
  private static getCityImage(cityName: string): string {
    const cityImages: { [key: string]: string } = {
      'London': 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200',
      'Paris': 'https://images.unsplash.com/photo-1502602898536-47ad22581b52?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200',
      'Tokyo': 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200',
      'New York': 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200',
      'Sydney': 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200',
      'Bali': 'https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200',
      'Rome': 'https://images.unsplash.com/photo-1552832230-c0197047daf9?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200',
      'Barcelona': 'https://images.unsplash.com/photo-1544793058-6d51b9e6bbee?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200',
      'Amsterdam': 'https://images.unsplash.com/photo-1534351590666-13e3e96b5017?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200',
      'Istanbul': 'https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200',
      'Santorini': 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200',
      'Prague': 'https://images.unsplash.com/photo-1541849546-216549ae216d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200',
      'Vienna': 'https://images.unsplash.com/photo-1516550893923-42d28e5677af?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200',
      'Bangkok': 'https://images.unsplash.com/photo-1528181304800-259b08848526?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200',
      'Singapore': 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200',
      'Seoul': 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200',
      'Mumbai': 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200',
      'Delhi': 'https://images.unsplash.com/photo-1587474260584-136574528ed5?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200',
      'Sedona': 'https://images.unsplash.com/photo-1444927714506-8492d94b5ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200',
      'Machu Picchu': 'https://images.unsplash.com/photo-1526392060635-9d6019884377?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200',
    };
    
    return cityImages[cityName] || 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200';
  }
  
  private static calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371; // Earth's radius in kilometers
    const dLat = this.toRadians(lat2 - lat1);
    const dLon = this.toRadians(lon2 - lon1);
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(this.toRadians(lat1)) * Math.cos(this.toRadians(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  }
  
  private static toRadians(degrees: number): number {
    return degrees * (Math.PI / 180);
  }
  
  private static getJulianDate(date: Date): number {
    return (date.getTime() / 86400000) + 2440587.5;
  }
  
  private static calculateSunLongitude(jd: number): number {
    // Simplified sun longitude calculation
    const n = jd - 2451545.0;
    const L = (280.460 + 0.9856474 * n) % 360;
    return L;
  }
  
  private static calculateMoonLongitude(jd: number): number {
    // Simplified moon longitude calculation
    const n = jd - 2451545.0;
    const L = (218.316 + 13.176396 * n) % 360;
    return L;
  }
  
  private static calculatePlanetLongitude(jd: number, planet: string): number {
    // Very simplified planet calculations - real implementation would use proper ephemeris
    const n = jd - 2451545.0;
    const baseValues: { [key: string]: { base: number; rate: number } } = {
      Mercury: { base: 252.25, rate: 4.092339 },
      Venus: { base: 181.98, rate: 1.602136 },
      Mars: { base: 355.43, rate: 0.524033 },
      Jupiter: { base: 34.35, rate: 0.083056 },
      Saturn: { base: 50.07, rate: 0.033526 },
    };
    
    const planetData = baseValues[planet] || { base: 0, rate: 1 };
    return (planetData.base + planetData.rate * n) % 360;
  }
  
  private static calculateLineCoordinates(longitude: number, lineType: string, birthData: BirthData): Array<{ lat: number; lon: number }> {
    const coordinates: Array<{ lat: number; lon: number }> = [];
    
    // Simplified line calculation - real astrocartography lines are more complex
    const baseLon = lineType === 'ascendant' ? longitude : (longitude + 90) % 360;
    
    for (let lat = -80; lat <= 80; lat += 5) {
      // Adjust longitude based on latitude for curved lines
      const adjustedLon = (baseLon + Math.sin(lat * Math.PI / 180) * 10) % 360;
      coordinates.push({
        lat,
        lon: adjustedLon > 180 ? adjustedLon - 360 : adjustedLon,
      });
    }
    
    return coordinates;
  }
  
  private static getPlanetColor(planet: string): string {
    const colors: { [key: string]: string } = {
      Sun: '#F59E0B',
      Moon: '#3B82F6',
      Mercury: '#10B981',
      Venus: '#EC4899',
      Mars: '#EF4444',
      Jupiter: '#3B82F6',
      Saturn: '#8B5CF6',
    };
    return colors[planet] || '#6B7280';
  }
  
  private static getPlanetInfluence(planet: string, lineType: string): string {
    const influences: { [key: string]: { [key: string]: string } } = {
      Sun: {
        ascendant: 'Personal identity and self-expression',
        midheaven: 'Career recognition and leadership',
      },
      Moon: {
        ascendant: 'Emotional sensitivity and intuition',
        midheaven: 'Public recognition and popularity',
      },
      Venus: {
        ascendant: 'Love, beauty, and artistic expression',
        midheaven: 'Creative career success',
      },
      Jupiter: {
        ascendant: 'Growth, expansion, and good fortune',
        midheaven: 'Career advancement and success',
      },
    };
    
    return influences[planet]?.[lineType] || 'General planetary influence';
  }
}

export function calculateAstrocartography(birthData: BirthData): AstroCalculationResult {
  const planets = AstroCalculations.calculatePlanetPositions(birthData);
  const lines = AstroCalculations.calculateAstrocartographyLines(birthData, planets);
  const recommendations = AstroCalculations.generateLocationRecommendations(lines, birthData);
  
  return {
    birthData,
    planets,
    lines,
    recommendations,
  };
}
