
import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Disc, 
  Hammer, 
  Grid3X3, 
  Calculator,
  Menu,
  Package
} from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

const translations = {
  en: {
    blade: 'Blade',
    marber: 'Marber',
    portfolio: 'Portfolio',
    calculator: 'Calculator',
    amayouStock: 'Amayou Stock'
  },
  ar: {
    blade: 'شفرة',
    marber: 'ماربر',
    portfolio: 'المحفظة',
    calculator: 'الحاسبة',
    amayouStock: 'مخزون أمايو'
  },
  fr: {
    blade: 'Lame',
    marber: 'Marber',
    portfolio: 'Portfolio',
    calculator: 'Calculatrice',
    amayouStock: 'Stock Amayou'
  }
};

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const currentLanguage = (localStorage.getItem('language') || 'en') as 'en' | 'ar' | 'fr';
  const t = translations[currentLanguage];

  useEffect(() => {
    const checkAuth = () => {
      const auth = sessionStorage.getItem('isAuthenticated') === 'true';
      setIsAuthenticated(auth);
      
      if (!auth && location.pathname !== '/home') {
        navigate('/home');
      }
    };

    checkAuth();
    window.addEventListener('storage', checkAuth);
    
    return () => {
      window.removeEventListener('storage', checkAuth);
    };
  }, [location.pathname, navigate]);
  
  if (!isAuthenticated && location.pathname !== '/home') {
    return null;
  }
  
  const NavItems = () => (
    <>
      <Link to="/amayou-stock">
        <Button 
          variant={location.pathname === '/amayou-stock' ? 'default' : 'ghost'}
          className="w-full justify-start md:w-auto"
        >
          <Package className="mr-2 h-4 w-4" />
          {t.amayouStock}
        </Button>
      </Link>
      <Link to="/blade">
        <Button 
          variant={location.pathname === '/blade' ? 'default' : 'ghost'}
          className="w-full justify-start md:w-auto"
        >
          <Disc className="mr-2 h-4 w-4" />
          {t.blade}
        </Button>
      </Link>
      <Link to="/marber">
        <Button 
          variant={location.pathname === '/marber' ? 'default' : 'ghost'}
          className="w-full justify-start md:w-auto"
        >
          <Hammer className="mr-2 h-4 w-4" />
          {t.marber}
        </Button>
      </Link>
      <Link to="/">
        <Button 
          variant={location.pathname === '/' ? 'default' : 'ghost'}
          className="w-full justify-start md:w-auto"
        >
          <Grid3X3 className="mr-2 h-4 w-4" />
          {t.portfolio}
        </Button>
      </Link>
      <Link to="/calculator">
        <Button 
          variant={location.pathname === '/calculator' ? 'default' : 'ghost'}
          className="w-full justify-start md:w-auto"
        >
          <Calculator className="mr-2 h-4 w-4" />
          {t.calculator}
        </Button>
      </Link>
    </>
  );
  
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
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-4">
            <NavItems />
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <div className="flex flex-col gap-4 mt-8">
                  <NavItems />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
