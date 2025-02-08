
import React from 'react';

const Footer = () => {
  return (
    <footer className="mt-auto py-4 px-6 bg-background/50 backdrop-blur-sm border-t">
      <div className="container mx-auto flex justify-center items-center">
        <p className="text-muted-foreground text-sm">
          Designed by{' '}
          <span className="font-signature text-primary italic">Nadi</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
