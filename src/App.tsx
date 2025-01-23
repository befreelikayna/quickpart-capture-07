import { useState, useEffect } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Portfolio from "./pages/Portfolio";
import { DocumentedPart } from "./types/parts";
import { loadDocumentedParts, saveDocumentedParts, loadLanguage, saveLanguage } from "./utils/dataStorage";

const queryClient = new QueryClient();

const App = () => {
  const [documentedParts, setDocumentedParts] = useState<DocumentedPart[]>([]);
  const [language, setLanguage] = useState<'en' | 'de' | 'ro'>('en');

  // Load saved data on initial render
  useEffect(() => {
    const savedParts = loadDocumentedParts();
    const savedLanguage = loadLanguage();
    setDocumentedParts(savedParts);
    setLanguage(savedLanguage);
  }, []);

  // Save data whenever it changes
  useEffect(() => {
    saveDocumentedParts(documentedParts);
  }, [documentedParts]);

  useEffect(() => {
    saveLanguage(language);
  }, [language]);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route 
              path="/" 
              element={
                <Index 
                  documentedParts={documentedParts} 
                  setDocumentedParts={setDocumentedParts}
                  language={language}
                  setLanguage={setLanguage}
                />
              } 
            />
            <Route 
              path="/portfolio" 
              element={
                <Portfolio 
                  documentedParts={documentedParts}
                  setDocumentedParts={setDocumentedParts}
                  language={language}
                />
              } 
            />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;