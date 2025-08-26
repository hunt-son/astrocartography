import { Sun, MapPin, Compass, Shield } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export function EducationalSection() {
  return (
    <Card className="p-8 mb-12" data-testid="card-educational">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-slate-900 mb-4">Understanding Astrocartography</h3>
        <p className="text-slate-600 max-w-3xl mx-auto">
          Astrocartography maps show how planetary energies manifest differently across the globe based on your birth chart, 
          helping you understand where you might thrive in various aspects of life.
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="text-center" data-testid="feature-planetary-lines">
          <div className="w-12 h-12 bg-golden-100 rounded-xl flex items-center justify-center mx-auto mb-4">
            <Sun className="text-golden-600 h-6 w-6" />
          </div>
          <h4 className="font-semibold text-slate-900 mb-2">Planetary Lines</h4>
          <p className="text-sm text-slate-600">Each planet creates lines of influence across the Earth based on your birth moment.</p>
        </div>
        
        <div className="text-center" data-testid="feature-location-analysis">
          <div className="w-12 h-12 bg-cosmic-100 rounded-xl flex items-center justify-center mx-auto mb-4">
            <MapPin className="text-cosmic-600 h-6 w-6" />
          </div>
          <h4 className="font-semibold text-slate-900 mb-2">Location Analysis</h4>
          <p className="text-sm text-slate-600">Discover how different locations amplify or diminish planetary energies in your life.</p>
        </div>
        
        <div className="text-center" data-testid="feature-life-themes">
          <div className="w-12 h-12 bg-stellar-100 rounded-xl flex items-center justify-center mx-auto mb-4">
            <Compass className="text-stellar-600 h-6 w-6" />
          </div>
          <h4 className="font-semibold text-slate-900 mb-2">Life Themes</h4>
          <p className="text-sm text-slate-600">Understand which areas support love, career, creativity, spiritual growth, and more.</p>
        </div>
        
        <div className="text-center" data-testid="feature-privacy-first">
          <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
            <Shield className="text-green-600 h-6 w-6" />
          </div>
          <h4 className="font-semibold text-slate-900 mb-2">Privacy First</h4>
          <p className="text-sm text-slate-600">All calculations happen in your browser—your personal data never leaves your device.</p>
        </div>
      </div>
    </Card>
  );
}
