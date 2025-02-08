
import React from 'react';

const Footer = () => {
  return (
    <footer className="mt-auto py-4 px-6 bg-white/80 backdrop-blur-sm border-t shadow-sm">
      <div className="container mx-auto flex justify-center items-center">
        <p className="text-gray-800 text-sm">
          Designed by{' '}
          <span className="font-signature text-primary italic text-lg">Nadi</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
