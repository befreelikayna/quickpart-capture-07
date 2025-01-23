import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sword, Hammer, Grid3X3, Calculator } from 'lucide-react';

const Home = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        <h1 className="text-4xl font-bold">Welcome to Our Platform</h1>
        <div className="grid gap-4 md:grid-cols-4">
          <Link to="/marber">
            <Button variant="outline" className="w-full">
              <Hammer className="mr-2 h-4 w-4" />
              Marber
            </Button>
          </Link>
          <Link to="/blade">
            <Button variant="outline" className="w-full">
              <Sword className="mr-2 h-4 w-4" />
              Blade
            </Button>
          </Link>
          <Link to="/">
            <Button variant="outline" className="w-full">
              <Grid3X3 className="mr-2 h-4 w-4" />
              Part Documentation
            </Button>
          </Link>
          <Link to="/calculator">
            <Button variant="outline" className="w-full">
              <Calculator className="mr-2 h-4 w-4" />
              Calculator
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;