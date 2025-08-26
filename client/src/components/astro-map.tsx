import { useEffect, useRef } from 'react';
import { Info, Maximize2, Plus, Minus, Home } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AstrocartographyLine } from '@/types/astro';

interface AstroMapProps {
  lines: AstrocartographyLine[];
  isLoading?: boolean;
}

export function AstroMap({ lines, isLoading = false }: AstroMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize Leaflet map when the component mounts
    // This would be implemented with actual Leaflet integration
    if (mapRef.current && !isLoading && lines.length > 0) {
      // TODO: Initialize Leaflet map and add astrocartography lines
      console.log('Map should be initialized with lines:', lines);
    }
  }, [lines, isLoading]);

  return (
    <Card className="overflow-hidden" data-testid="card-astro-map">
      {/* Map Header */}
      <div className="p-6 border-b bg-slate-50">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-slate-900">Your Astrocartography Map</h3>
            <p className="text-sm text-slate-600 mt-1">Explore planetary line influences across the globe</p>
          </div>
          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              size="sm"
              data-testid="button-map-guide"
            >
              <Info className="mr-1 h-3 w-3" />
              Guide
            </Button>
            <Button
              variant="outline"
              size="sm"
              data-testid="button-map-fullscreen"
            >
              <Maximize2 className="mr-1 h-3 w-3" />
              Fullscreen
            </Button>
          </div>
        </div>
      </div>
      
      {/* Map Container */}
      <div className="h-96 relative overflow-hidden map-container" ref={mapRef}>
        {isLoading || lines.length === 0 ? (
          // Getting Started Overlay
          <div className="absolute inset-0 bg-white bg-opacity-90 flex items-center justify-center">
            <div className="text-center max-w-md px-6">
              <div className="w-16 h-16 bg-cosmic-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="text-cosmic-600 w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 01.553-.894L9 2l6 3 6-3v13l-6 3-6-3z" />
                </svg>
              </div>
              <h4 className="text-lg font-semibold text-slate-900 mb-2">Ready to Explore</h4>
              <p className="text-slate-600 text-sm mb-4">
                Enter your birth information on the left to generate your personalized astrocartography map with planetary line influences.
              </p>
              <div className="flex justify-center space-x-4 text-xs text-slate-500">
                <span><svg className="inline w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z" clipRule="evenodd" /></svg>Interactive</span>
                <span><svg className="inline w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M4 2a2 2 0 00-2 2v11a3 3 0 106 0V4a2 2 0 00-2-2H4z" clipRule="evenodd" /></svg>Color-coded</span>
                <span><svg className="inline w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" /></svg>Educational</span>
              </div>
            </div>
          </div>
        ) : (
          // Map with lines (placeholder for now)
          <>
            {/* Background Map Image */}
            <div 
              className="absolute inset-0 opacity-20 bg-cover bg-center"
              style={{
                backgroundImage: "url('https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=600')"
              }}
            />
            
            {/* Astrological Lines Overlay */}
            <div className="absolute inset-0">
              {lines.slice(0, 4).map((line, index) => (
                <div
                  key={`${line.planet}-${line.type}-${index}`}
                  className={`astro-line astro-line-${line.planet.toLowerCase()}`}
                  style={{
                    left: `${25 + index * 15}%`,
                    transform: `rotate(${-15 + index * 10}deg)`,
                    backgroundColor: line.color,
                  }}
                  data-testid={`line-${line.planet.toLowerCase()}-${index}`}
                />
              ))}
            </div>
          </>
        )}
        
        {/* Map Controls */}
        <div className="absolute top-4 right-4 flex flex-col space-y-2">
          <Button
            variant="outline"
            size="sm"
            className="w-8 h-8 p-0 bg-white shadow hover:bg-slate-50"
            data-testid="button-map-zoom-in"
          >
            <Plus className="h-3 w-3 text-slate-600" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="w-8 h-8 p-0 bg-white shadow hover:bg-slate-50"
            data-testid="button-map-zoom-out"
          >
            <Minus className="h-3 w-3 text-slate-600" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="w-8 h-8 p-0 bg-white shadow hover:bg-slate-50"
            data-testid="button-map-home"
          >
            <Home className="h-3 w-3 text-slate-600" />
          </Button>
        </div>
      </div>
      
      {/* Legend */}
      <div className="p-4 bg-slate-50 border-t">
        <h4 className="text-sm font-medium text-slate-700 mb-3">Planetary Line Legend</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
          <div className="flex items-center space-x-2" data-testid="legend-sun">
            <div className="w-3 h-3 bg-golden-500 rounded"></div>
            <span className="text-slate-600">Sun - Identity & Leadership</span>
          </div>
          <div className="flex items-center space-x-2" data-testid="legend-venus">
            <div className="w-3 h-3 bg-pink-500 rounded"></div>
            <span className="text-slate-600">Venus - Love & Beauty</span>
          </div>
          <div className="flex items-center space-x-2" data-testid="legend-mars">
            <div className="w-3 h-3 bg-red-500 rounded"></div>
            <span className="text-slate-600">Mars - Energy & Action</span>
          </div>
          <div className="flex items-center space-x-2" data-testid="legend-jupiter">
            <div className="w-3 h-3 bg-stellar-500 rounded"></div>
            <span className="text-slate-600">Jupiter - Growth & Luck</span>
          </div>
        </div>
      </div>
    </Card>
  );
}
