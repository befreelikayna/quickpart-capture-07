import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Disc, 
  Hammer, 
  Grid3X3, 
  Calculator
} from 'lucide-react';

const translations = {
  en: {
    blade: 'Blade',
    marber: 'Marber',
    portfolio: 'Portfolio',
    calculator: 'Calculator'
  },
  ar: {
    blade: 'شفرة',
    marber: 'ماربر',
    portfolio: 'المحفظة',
    calculator: 'الحاسبة'
  },
  fr: {
    blade: 'Lame',
    marber: 'Marber',
    portfolio: 'Portfolio',
    calculator: 'Calculatrice'
  }
};

const Header = () => {
  const location = useLocation();
  // Default to English if language is not set in localStorage
  const currentLanguage = (localStorage.getItem('language') || 'en') as 'en' | 'ar' | 'fr';
  const t = translations[currentLanguage];
  
  return (
    <header className="border-b">
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between h-16">
          <Link to="/home" aria-label="Home">
            <img 
              src="/lovable-uploads/0a32041a-b5ba-43b3-808b-11f1f9068ecc.png" 
              alt="Logo" 
              className="h-8 w-auto hover:opacity-80 transition-opacity"
            />
          </Link>
          <div className="flex gap-4">
            <Link to="/blade">
              <Button 
                variant={location.pathname === '/blade' ? 'default' : 'ghost'}
              >
                <Disc className="mr-2 h-4 w-4" />
                {t.blade}
              </Button>
            </Link>
            <Link to="/marber">
              <Button 
                variant={location.pathname === '/marber' ? 'default' : 'ghost'}
              >
                <Hammer className="mr-2 h-4 w-4" />
                {t.marber}
              </Button>
            </Link>
            <Link to="/">
              <Button 
                variant={location.pathname === '/' ? 'default' : 'ghost'}
              >
                <Grid3X3 className="mr-2 h-4 w-4" />
                {t.portfolio}
              </Button>
            </Link>
            <Link to="/calculator">
              <Button 
                variant={location.pathname === '/calculator' ? 'default' : 'ghost'}
              >
                <Calculator className="mr-2 h-4 w-4" />
                {t.calculator}
              </Button>
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;