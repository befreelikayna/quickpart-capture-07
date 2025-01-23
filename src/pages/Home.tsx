import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Home = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        <h1 className="text-4xl font-bold">Welcome to Our Platform</h1>
        <div className="grid gap-4 md:grid-cols-3">
          <Link to="/marber">
            <Button variant="outline" className="w-full">
              Marber
            </Button>
          </Link>
          <Link to="/">
            <Button variant="outline" className="w-full">
              Part Documentation
            </Button>
          </Link>
          <Link to="/blender">
            <Button variant="outline" className="w-full">
              Blender
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;