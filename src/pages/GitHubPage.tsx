
import React, { useEffect } from 'react';
import { Github } from 'lucide-react';

const GitHubPage: React.FC = () => {
  useEffect(() => {
    // Redirect to the GitHub repository
    window.location.href = 'https://github.com/befreelikayna/biost-product-galaxy.git';
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Github className="w-16 h-16 mb-4 animate-pulse" />
      <h1 className="text-2xl font-semibold mb-2">Redirecting to GitHub...</h1>
      <p className="text-gray-500">
        If you are not redirected automatically, please click{' '}
        <a 
          href="https://github.com/befreelikayna/biost-product-galaxy.git" 
          className="text-blue-500 hover:underline"
          target="_blank" 
          rel="noopener noreferrer"
        >
          here
        </a>
        .
      </p>
    </div>
  );
};

export default GitHubPage;
