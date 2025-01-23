import { useState, useEffect } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Index from "./pages/Index";
import Portfolio from "./pages/Portfolio";
import MarberPage from "./pages/MarberPage";
import BladePage from "./pages/BladePage";
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
  const [language, setLanguage] = useState<'en' | 'de' | 'ro'>('en');

  // Load saved data on initial render
  useEffect(() => {
    const savedMarberParts = loadMarberParts();
    const savedBladeParts = loadBladeParts();
    const savedLanguage = loadLanguage();
    setMarberParts(savedMarberParts);
    setBladeParts(savedBladeParts);
    setLanguage(savedLanguage);
  }, []);

  // Save data whenever it changes
  useEffect(() => {
    saveMarberParts(marberParts);
  }, [marberParts]);

  useEffect(() => {
    saveBladeParts(bladeParts);
  }, [bladeParts]);

  useEffect(() => {
    saveLanguage(language);
  }, [language]);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/calculator" element={<Calculator />} />
            <Route 
              path="/" 
              element={
                <Index 
                  documentedParts={[...marberParts, ...bladeParts]} 
                  setDocumentedParts={() => {}} // Disabled as we now handle parts separately
                  language={language}
                  setLanguage={setLanguage}
                />
              } 
            />
            <Route 
              path="/portfolio" 
              element={
                <Portfolio 
                  documentedParts={[...marberParts, ...bladeParts]}
                  setDocumentedParts={() => {}} // Disabled as we now handle parts separately
                  language={language}
                />
              } 
            />
            <Route 
              path="/marber" 
              element={
                <MarberPage 
                  documentedParts={marberParts}
                  setDocumentedParts={setMarberParts}
                  language={language}
                  setLanguage={setLanguage}
                />
              } 
            />
            <Route 
              path="/blade" 
              element={
                <BladePage 
                  documentedParts={bladeParts}
                  setDocumentedParts={setBladeParts}
                  language={language}
                  setLanguage={setLanguage}
                />
              } 
            />
            <Route path="*" element={<Navigate to="/home" replace />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;