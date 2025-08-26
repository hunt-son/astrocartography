import { useState } from 'react';
import { PrivacyBanner } from '@/components/privacy-banner';
import { Header } from '@/components/header';
import { HeroSection } from '@/components/hero-section';
import { BirthDataForm } from '@/components/birth-data-form';
import { AstroMap } from '@/components/astro-map';
import { LocationRecommendations } from '@/components/location-recommendations';
import { EducationalSection } from '@/components/educational-section';
import { BirthData, AstroCalculationResult } from '@/types/astro';
import { calculateAstrocartography } from '@/lib/astro-calculations';
import { useToast } from '@/hooks/use-toast';

export default function Home() {
  const [astroResult, setAstroResult] = useState<AstroCalculationResult | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const handleBirthDataSubmit = async (birthData: BirthData) => {
    setIsGenerating(true);
    
    try {
      // Simulate processing time for better UX
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const result = calculateAstrocartography(birthData);
      setAstroResult(result);
      
      toast({
        title: "Astrocartography Map Generated!",
        description: "Your personalized map is ready. Explore the planetary influences and location recommendations below.",
      });
      
    } catch (error) {
      console.error('Error generating astrocartography:', error);
      toast({
        title: "Generation Failed",
        description: "There was an error generating your astrocartography map. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50" data-testid="page-home">
      <PrivacyBanner />
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <HeroSection />
        
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {/* Birth Data Form */}
          <div className="lg:col-span-1">
            <BirthDataForm
              onSubmit={handleBirthDataSubmit}
              isGenerating={isGenerating}
            />
          </div>
          
          {/* Interactive Map Section */}
          <div className="lg:col-span-2">
            <AstroMap
              lines={astroResult?.lines || []}
              isLoading={isGenerating}
            />
          </div>
        </div>
        
        {/* Location Recommendations */}
        {astroResult && (
          <LocationRecommendations recommendations={astroResult.recommendations} />
        )}
        
        {/* Educational Section */}
        <EducationalSection />
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            
            {/* Brand */}
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 cosmic-gradient rounded-lg flex items-center justify-center">
                  <svg className="text-white h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold">AstroPlace</h3>
                  <p className="text-xs text-slate-400">Open Source Astrocartography</p>
                </div>
              </div>
              <p className="text-slate-300 text-sm mb-4 max-w-md">
                Discover your ideal locations through the lens of astrology while maintaining complete privacy. 
                Your personal data never leaves your browser.
              </p>
              <div className="flex space-x-4">
                <a href="https://github.com" className="text-slate-400 hover:text-white transition-colors" data-testid="link-footer-github">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-slate-400 hover:text-white transition-colors" data-testid="link-footer-twitter">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="text-slate-400 hover:text-white transition-colors" data-testid="link-footer-contact">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </a>
              </div>
            </div>
            
            {/* Links */}
            <div>
              <h4 className="font-semibold mb-4">Learn</h4>
              <ul className="space-y-2 text-sm text-slate-300">
                <li><a href="#" className="hover:text-white transition-colors">How It Works</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Astrocartography Guide</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Planetary Influences</a></li>
                <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
              </ul>
            </div>
            
            {/* Privacy */}
            <div>
              <h4 className="font-semibold mb-4">Privacy & Open Source</h4>
              <ul className="space-y-2 text-sm text-slate-300">
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Source Code</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contributing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">MIT License</a></li>
              </ul>
            </div>
          </div>
          
          {/* Bottom */}
          <div className="border-t border-slate-800 pt-8 mt-8">
            <div className="flex flex-col md:flex-row justify-between items-center text-sm text-slate-400">
              <p>&copy; 2024 AstroPlace. Open source software under MIT License.</p>
              <p className="mt-2 md:mt-0">Built with privacy by design • No tracking • No cookies</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
