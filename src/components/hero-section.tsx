import { Check } from 'lucide-react';

export function HeroSection() {
  return (
    <div className="text-center mb-12">
      <h2 className="text-4xl font-bold text-slate-900 mb-4">
        Discover Your Perfect Place
      </h2>
      <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-6">
        Find locations around the world where your astrological influences align for love, career, creativity, and personal growth—all while keeping your data completely private.
      </p>
      <div className="flex flex-wrap justify-center gap-4 text-sm text-slate-500">
        <span className="flex items-center">
          <Check className="text-green-500 mr-2 h-4 w-4" />
          No data transmission
        </span>
        <span className="flex items-center">
          <Check className="text-green-500 mr-2 h-4 w-4" />
          Open source code
        </span>
        <span className="flex items-center">
          <Check className="text-green-500 mr-2 h-4 w-4" />
          Offline capable
        </span>
      </div>
    </div>
  );
}
