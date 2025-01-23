import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sword, Hammer, Grid3X3 } from 'lucide-react';

const Header = () => {
  const location = useLocation();
  
  return (
    <header className="border-b">
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between h-16">
          <Link to="/home" className="font-bold text-lg">
            Home
          </Link>
          <div className="flex gap-4">
            <Link to="/marber">
              <Button 
                variant={location.pathname === '/marber' ? 'default' : 'ghost'}
              >
                <Hammer className="mr-2 h-4 w-4" />
                Marber
              </Button>
            </Link>
            <Link to="/blade">
              <Button 
                variant={location.pathname === '/blade' ? 'default' : 'ghost'}
              >
                <Sword className="mr-2 h-4 w-4" />
                Blade
              </Button>
            </Link>
            <Link to="/">
              <Button 
                variant={location.pathname === '/' ? 'default' : 'ghost'}
              >
                <Grid3X3 className="mr-2 h-4 w-4" />
                Part Documentation
              </Button>
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;