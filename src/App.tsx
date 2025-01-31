import { useState, useEffect } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { toast } from 'sonner';
import { ThemeProvider } from "./components/ThemeProvider";
import Header from "./components/Header";
import Home from "./pages/Home";
import Index from "./pages/Index";
import Portfolio from "./pages/Portfolio";
import MarberPage from "./pages/MarberPage";
import BladePage from "./pages/BladePage";
import MarberPortfolio from "./pages/MarberPortfolio";
import BladePortfolio from "./pages/BladePortfolio";
import Calculator from "./pages/Calculator";
import { DocumentedPart } from "./types/parts";
import { 
  loadMarberParts, 
  saveMarberParts, 
  loadBladeParts, 
  saveBladeParts,
  loadLanguage, 
  saveLanguage 
} from "./utils/dataStorage";

const queryClient = new QueryClient();

const App = () => {
  const [marberParts, setMarberParts] = useState<DocumentedPart[]>([]);
  const [bladeParts, setBladeParts] = useState<DocumentedPart[]>([]);
  const [language, setLanguage] = useState<'en' | 'ar' | 'fr'>('en');

  useEffect(() => {
    const detectLanguage = async () => {
      try {
        // Using the Cloudflare-based geolocation which is more reliable
        const response = await fetch('https://cloudflare.com/cdn-cgi/trace');
        const data = await response.text();
        
        // Parse the response text to get the country code
        const lines = data.split('\n');
        const locLine = lines.find(line => line.startsWith('loc='));
        const countryCode = locLine ? locLine.split('=')[1] : 'US';
        
        // Map country codes to our supported languages
        const countryToLanguage: { [key: string]: 'en' | 'ar' | 'fr' } = {
          'US': 'en',
          'GB': 'en',
          'SA': 'ar',
          'AE': 'ar',
          'EG': 'ar',
          'FR': 'fr',
          'CA': 'fr',
        };

        const detectedLanguage = countryToLanguage[countryCode] || 'en';
        
        // Only set language if it hasn't been manually set before
        const savedLanguage = loadLanguage();
        if (!savedLanguage) {
          setLanguage(detectedLanguage);
          saveLanguage(detectedLanguage);
          toast.success(`Language automatically set to ${detectedLanguage}`);
        } else {
          setLanguage(savedLanguage as 'en' | 'ar' | 'fr');
        }
      } catch (error) {
        console.error('Error detecting language:', error);
        // Fallback to saved language or default
        const savedLanguage = loadLanguage();
        if (savedLanguage) {
          setLanguage(savedLanguage as 'en' | 'ar' | 'fr');
        } else {
          // If no saved language and detection fails, default to English
          setLanguage('en');
          saveLanguage('en');
          toast.error('Could not detect location, defaulting to English');
        }
      }
    };

    detectLanguage();
  }, []);

  useEffect(() => {
    const savedMarberParts = loadMarberParts();
    const savedBladeParts = loadBladeParts();
    setMarberParts(savedMarberParts);
    setBladeParts(savedBladeParts);
  }, []);

  useEffect(() => {
    saveMarberParts(marberParts);
  }, [marberParts]);

  useEffect(() => {
    saveBladeParts(bladeParts);
  }, [bladeParts]);

  useEffect(() => {
    saveLanguage(language);
    // Set HTML dir attribute for RTL support
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  }, [language]);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Header />
            <Routes>
              <Route path="/home" element={<Home />} />
              <Route path="/calculator" element={<Calculator />} />
              <Route path="/" element={<Index documentedParts={[...marberParts, ...bladeParts]} setDocumentedParts={() => {}} language={language} setLanguage={setLanguage} />} />
              <Route path="/portfolio" element={<Portfolio documentedParts={[...marberParts, ...bladeParts]} setDocumentedParts={() => {}} language={language} />} />
              <Route path="/marber" element={<MarberPage documentedParts={marberParts} setDocumentedParts={setMarberParts} language={language} setLanguage={setLanguage} />} />
              <Route path="/marber-portfolio" element={<MarberPortfolio documentedParts={marberParts} setDocumentedParts={setMarberParts} language={language} />} />
              <Route path="/blade" element={<BladePage documentedParts={bladeParts} setDocumentedParts={setBladeParts} language={language} setLanguage={setLanguage} />} />
              <Route path="/blade-portfolio" element={<BladePortfolio documentedParts={bladeParts} setDocumentedParts={setBladeParts} language={language} />} />
              <Route path="*" element={<Navigate to="/home" replace />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;