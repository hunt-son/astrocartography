import { Globe, Github, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Header() {
  return (
    <header className="bg-white shadow-xs border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 cosmic-gradient rounded-lg flex items-center justify-center">
              <Globe className="text-white h-4 w-4" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900">AstroPlace</h1>
              <p className="text-xs text-slate-500">Privacy-First Astrocartography</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              size="sm"
              className="bg-slate-100 hover:bg-slate-200"
              asChild
            >
              <a
                href="https://github.com/hunt-son/astrocartography"
                target="_blank"
                rel="noopener noreferrer"
                data-testid="link-github"
                className="flex items-center space-x-2"
              >
                <Github className="h-4 w-4 text-slate-600" />
                <span className="text-sm font-medium text-slate-700">Open Source</span>
              </a>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              data-testid="button-theme-toggle"
            >
              <Moon className="h-4 w-4 text-slate-400" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
