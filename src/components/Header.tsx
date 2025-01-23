import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Sword, 
  Hammer, 
  Grid3X3, 
  Calculator, 
  Languages 
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const location = useLocation();
  
  const handleLanguageChange = (lang: 'en' | 'ar' | 'fr') => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    localStorage.setItem('selectedLanguage', lang);
    window.location.reload();
  };
  
  return (
    <header className="border-b">
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between h-16">
          <Link to="/home" className="font-bold text-lg">
            Home
          </Link>
          <div className="flex gap-4">
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
                Portfolio
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
            <Link to="/calculator">
              <Button 
                variant={location.pathname === '/calculator' ? 'default' : 'ghost'}
              >
                <Calculator className="mr-2 h-4 w-4" />
                Calculator
              </Button>
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <Languages className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => handleLanguageChange('en')}>
                  English
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleLanguageChange('ar')}>
                  العربية
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleLanguageChange('fr')}>
                  Français
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;