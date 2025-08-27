import { Shield } from 'lucide-react';

export function PrivacyBanner() {
  return (
    <div className="bg-cosmic-600 text-white py-3 px-4">
      <div className="container mx-auto flex items-center justify-center text-sm font-medium">
        <Shield className="mr-2 h-4 w-4" />
        <span>🔒 Your birth data never leaves your device - All calculations happen locally in your browser</span>
      </div>
    </div>
  );
}
