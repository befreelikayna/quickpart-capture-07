import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Disc, 
  Hammer, 
  Grid3X3, 
  Calculator
} from 'lucide-react';

const Header = () => {
  const location = useLocation();
  
  return (
    <header className="border-b">
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between h-16">
          <Link to="/home" className="flex items-center gap-2">
            <img 
              src="/lovable-uploads/0a32041a-b5ba-43b3-808b-11f1f9068ecc.png" 
              alt="Logo" 
              className="h-8 w-auto"
            />
            <span className="font-bold text-lg">Home</span>
          </Link>
          <div className="flex gap-4">
            <Link to="/blade">
              <Button 
                variant={location.pathname === '/blade' ? 'default' : 'ghost'}
              >
                <Disc className="mr-2 h-4 w-4" />
                Blade
              </Button>
            </Link>
            <Link to="/marber">
              <Button 
                variant={location.pathname === '/marber' ? 'default' : 'ghost'}
              >
                <Hammer className="mr-2 h-4 w-4" />
                Marber
              </Button>
            </Link>
            <Link to="/">
              <Button 
                variant={location.pathname === '/' ? 'default' : 'ghost'}
              >
                <Grid3X3 className="mr-2 h-4 w-4" />
                Portfolio
              </Button>
            </Link>
            <Link to="/calculator">
              <Button 
                variant={location.pathname === '/calculator' ? 'default' : 'ghost'}
              >
                <Calculator className="mr-2 h-4 w-4" />
                Calculator
              </Button>
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;