import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sword, Hammer, Grid3X3, Calculator } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const Home = () => {
  const carouselImages = [
    "/slider1.jpg",
    "/slider2.jpg",
    "/slider3.jpg",
    "/slider4.jpg"
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto text-center space-y-8">
        <div className="mb-12">
          <Carousel className="w-full max-w-5xl mx-auto">
            <CarouselContent>
              {carouselImages.map((image, index) => (
                <CarouselItem key={index}>
                  <div className="p-1">
                    <img 
                      src={image} 
                      alt={`Slide ${index + 1}`}
                      className="w-full h-[400px] object-cover rounded-lg"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>

        <div className="space-y-8">
          <img 
            src="/logo.png" 
            alt="Biostone Logo" 
            className="h-16 mx-auto"
          />
          <h1 className="text-4xl font-bold">Welcome to Biostone Platform</h1>
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
    </div>
  );
};

export default Home;