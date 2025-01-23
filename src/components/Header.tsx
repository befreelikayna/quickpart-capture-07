import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';

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
                Marber
              </Button>
            </Link>
            <Link to="/">
              <Button 
                variant={location.pathname === '/' ? 'default' : 'ghost'}
              >
                Part Documentation
              </Button>
            </Link>
            <Link to="/blender">
              <Button 
                variant={location.pathname === '/blender' ? 'default' : 'ghost'}
              >
                Blender
              </Button>
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;