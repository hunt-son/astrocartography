import { useState } from 'react';
import { Shield, Search, Wand2, Lock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { BirthData } from '@/types/astro';
import { searchLocations, LocationSearchResult } from '@/lib/location-data';

interface BirthDataFormProps {
  onSubmit: (birthData: BirthData) => void;
  isGenerating: boolean;
}

export function BirthDataForm({ onSubmit, isGenerating }: BirthDataFormProps) {
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    location: '',
  });
  
  const [locationSuggestions, setLocationSuggestions] = useState<LocationSearchResult[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<LocationSearchResult | null>(null);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleLocationSearch = (value: string) => {
    setFormData({ ...formData, location: value });
    
    if (value.length >= 2) {
      const suggestions = searchLocations(value);
      setLocationSuggestions(suggestions);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleLocationSelect = (location: LocationSearchResult) => {
    setFormData({ ...formData, location: `${location.name}, ${location.country}` });
    setSelectedLocation(location);
    setShowSuggestions(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.date || !formData.time || !selectedLocation) {
      return;
    }

    const birthData: BirthData = {
      date: formData.date,
      time: formData.time,
      location: {
        name: `${selectedLocation.name}, ${selectedLocation.country}`,
        lat: selectedLocation.lat,
        lon: selectedLocation.lon,
        timezone: selectedLocation.timezone,
      },
    };

    onSubmit(birthData);
  };

  return (
    <Card className="sticky top-8" data-testid="card-birth-form">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-slate-900">Your Birth Information</h3>
          <div className="flex items-center text-xs text-green-600">
            <Shield className="mr-1 h-3 w-3" />
            <span>Private</span>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4" data-testid="form-birth-data">
          {/* Date Input */}
          <div>
            <Label htmlFor="birthDate" className="block text-sm font-medium text-slate-700 mb-2">
              Birth Date
            </Label>
            <Input
              id="birthDate"
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="focus:ring-2 focus:ring-cosmic-500 focus:border-transparent"
              required
              data-testid="input-birth-date"
            />
          </div>
          
          {/* Time Input */}
          <div>
            <Label htmlFor="birthTime" className="block text-sm font-medium text-slate-700 mb-2">
              Birth Time
            </Label>
            <Input
              id="birthTime"
              type="time"
              value={formData.time}
              onChange={(e) => setFormData({ ...formData, time: e.target.value })}
              className="focus:ring-2 focus:ring-cosmic-500 focus:border-transparent"
              required
              data-testid="input-birth-time"
            />
            <p className="text-xs text-slate-500 mt-1">Time zone will be automatically detected</p>
          </div>
          
          {/* Location Input */}
          <div className="relative">
            <Label htmlFor="birthLocation" className="block text-sm font-medium text-slate-700 mb-2">
              Birth Location
            </Label>
            <div className="relative">
              <Input
                id="birthLocation"
                type="text"
                placeholder="Enter city name..."
                value={formData.location}
                onChange={(e) => handleLocationSearch(e.target.value)}
                onFocus={() => formData.location.length >= 2 && setShowSuggestions(true)}
                className="pl-10 focus:ring-2 focus:ring-cosmic-500 focus:border-transparent"
                required
                data-testid="input-birth-location"
              />
              <Search className="absolute left-3 top-3 text-slate-400 h-4 w-4" />
            </div>
            
            {/* Location Suggestions */}
            {showSuggestions && locationSuggestions.length > 0 && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-slate-300 rounded-lg shadow-lg max-h-40 overflow-y-auto">
                {locationSuggestions.map((location, index) => (
                  <button
                    key={`${location.name}-${location.country}`}
                    type="button"
                    onClick={() => handleLocationSelect(location)}
                    className="w-full text-left px-3 py-2 hover:bg-slate-50 border-b last:border-b-0"
                    data-testid={`option-location-${index}`}
                  >
                    <div className="text-sm font-medium">{location.name}</div>
                    <div className="text-xs text-slate-500">{location.country}</div>
                  </button>
                ))}
              </div>
            )}
          </div>
          
          {/* Generate Button */}
          <Button
            type="submit"
            className="w-full bg-cosmic-600 text-white hover:bg-cosmic-700 focus:ring-2 focus:ring-cosmic-500 focus:ring-offset-2"
            disabled={isGenerating || !formData.date || !formData.time || !selectedLocation}
            data-testid="button-generate-map"
          >
            {isGenerating ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Generating...
              </>
            ) : (
              <>
                <Wand2 className="mr-2 h-4 w-4" />
                Generate My Astrocartography Map
              </>
            )}
          </Button>
        </form>
        
        {/* Privacy Notice */}
        <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-start space-x-3">
            <Lock className="text-green-600 mt-0.5 h-4 w-4 shrink-0" />
            <div>
              <h4 className="text-sm font-medium text-green-800">Privacy Guaranteed</h4>
              <p className="text-xs text-green-700 mt-1">
                Your birth information is processed entirely in your browser. 
                No personal data is ever sent to any server or stored anywhere.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
