import { Star, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { LocationRecommendation } from '@/types/astro';

interface LocationRecommendationsProps {
  recommendations: LocationRecommendation[];
}

export function LocationRecommendations({ recommendations }: LocationRecommendationsProps) {
  if (recommendations.length === 0) {
    return null;
  }

  return (
    <div className="mb-12" data-testid="section-recommendations">
      <h3 className="text-2xl font-bold text-slate-900 mb-6 text-center">Recommended Locations</h3>
      <p className="text-slate-600 text-center mb-8">Based on your astrological influences, these locations may enhance different areas of your life</p>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recommendations.map((location, index) => (
          <Card
            key={location.id}
            className="hover:shadow-md transition-shadow"
            data-testid={`card-recommendation-${index}`}
          >
            <img
              src={location.image}
              alt={`${location.name} landscape`}
              className="w-full h-40 object-cover rounded-t-xl"
              data-testid={`img-location-${index}`}
            />
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-lg font-semibold text-slate-900" data-testid={`text-location-name-${index}`}>
                  {location.name}, {location.country}
                </h4>
                <div className="flex items-center" style={{ color: location.primaryInfluence.color }}>
                  <Star className="mr-1 h-3 w-3" fill="currentColor" />
                  <span className="text-sm font-medium" data-testid={`text-influence-${index}`}>
                    {location.primaryInfluence.planet} Line
                  </span>
                </div>
              </div>
              
              <p className="text-sm text-slate-600 mb-4" data-testid={`text-description-${index}`}>
                {location.description}
              </p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {location.themes.map((theme, themeIndex) => (
                  <Badge
                    key={theme}
                    variant="secondary"
                    className={`text-xs ${getThemeColor(theme)}`}
                    data-testid={`badge-theme-${index}-${themeIndex}`}
                  >
                    {theme}
                  </Badge>
                ))}
              </div>
              
              <Button
                variant="ghost"
                className="w-full text-cosmic-600 hover:text-cosmic-700 p-0 h-auto font-medium"
                data-testid={`button-analyze-${index}`}
              >
                View Detailed Analysis
                <ArrowRight className="ml-1 h-3 w-3" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

function getThemeColor(theme: string): string {
  const colors: { [key: string]: string } = {
    Love: 'bg-pink-100 text-pink-700',
    Creativity: 'bg-purple-100 text-purple-700',
    Beauty: 'bg-green-100 text-green-700',
    Career: 'bg-blue-100 text-blue-700',
    Growth: 'bg-yellow-100 text-yellow-700',
    Learning: 'bg-indigo-100 text-indigo-700',
    Identity: 'bg-orange-100 text-orange-700',
    Leadership: 'bg-red-100 text-red-700',
    Confidence: 'bg-yellow-100 text-yellow-700',
  };
  
  return colors[theme] || 'bg-gray-100 text-gray-700';
}
