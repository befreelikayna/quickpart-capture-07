import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from 'sonner';

const Home = () => {
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    console.log('Loading timer started');
    const timer = setTimeout(() => {
      console.log('Loading complete');
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Password submitted:', password);
    
    if (password === 'nadinadi') {
      console.log('Password correct, authenticating...');
      sessionStorage.setItem('isAuthenticated', 'true');
      toast.success('Successfully authenticated!');
      navigate('/');
    } else {
      console.log('Incorrect password');
      toast.error('Incorrect password');
    }
  };

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">
        <div className="text-center group relative">
          <img 
            src="/lovable-uploads/0a32041a-b5ba-43b3-808b-11f1f9068ecc.png" 
            alt="Logo" 
            className="mx-auto h-32 w-auto mb-4 animate-bounce drop-shadow-lg"
          />
          <div className="mt-4 animate-pulse text-2xl font-semibold text-blue-600">
            Loading...
          </div>
          <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-blue-400 text-sm">
            Edit with Lovable
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <img 
          src="/lovable-uploads/0a32041a-b5ba-43b3-808b-11f1f9068ecc.png" 
          alt="Logo" 
          className="mx-auto h-24 w-auto mb-8"
        />
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            className="w-full"
          />
          <Button type="submit" className="w-full">
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Home;