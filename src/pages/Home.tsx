
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import Footer from '@/components/Footer';

const Home = () => {
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if already authenticated
    const isAuthenticated = sessionStorage.getItem('isAuthenticated');
    if (isAuthenticated === 'true') {
      console.log('User is already authenticated');
    }

    // Set loading timer
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password === 'nadinadi') {
      sessionStorage.setItem('isAuthenticated', 'true');
      toast.success('Access granted!');
      navigate('/');
    } else {
      toast.error('Incorrect password');
      setPassword('');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <div className="flex-grow flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">
          <div className="text-center">
            <img 
              src="/lovable-uploads/0a32041a-b5ba-43b3-808b-11f1f9068ecc.png" 
              alt="Logo" 
              className="mx-auto h-32 w-auto mb-4 animate-bounce drop-shadow-lg"
            />
            <div className="mt-4 animate-pulse text-2xl font-semibold text-blue-600">
              Loading...
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow flex items-center justify-center">
        <div className="w-full max-w-md px-4">
          <div className="text-center mb-8">
            <img 
              src="/lovable-uploads/0a32041a-b5ba-43b3-808b-11f1f9068ecc.png" 
              alt="Logo" 
              className="mx-auto h-16 w-auto mb-4"
            />
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Welcome</h1>
            <p className="text-gray-600">Please enter the password to continue</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full"
                autoFocus
              />
            </div>
            <Button type="submit" className="w-full">
              Enter
            </Button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
