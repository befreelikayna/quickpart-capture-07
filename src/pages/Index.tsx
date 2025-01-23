import React from 'react';
import { Link } from 'react-router-dom';
import PhotoUpload from '@/components/PhotoUpload';
import PartForm, { PartFormData } from '@/components/PartForm';
import { Button } from '@/components/ui/button';
import { DocumentedPart } from '@/types/parts';
import { Globe, Grid } from 'lucide-react';

interface IndexProps {
  documentedParts: DocumentedPart[];
  setDocumentedParts: React.Dispatch<React.SetStateAction<DocumentedPart[]>>;
  language: 'en' | 'de' | 'ro';
  setLanguage: React.Dispatch<React.SetStateAction<'en' | 'de' | 'ro'>>;
}

const translations = {
  en: {
    title: 'Part Documentation',
    viewPortfolio: 'View Portfolio',
    newPart: 'Document New Part'
  },
  de: {
    title: 'Teile-Dokumentation',
    viewPortfolio: 'Portfolio ansehen',
    newPart: 'Neues Teil dokumentieren'
  },
  ro: {
    title: 'Documentație Piese',
    viewPortfolio: 'Vezi Portofoliul',
    newPart: 'Documentează Piesă Nouă'
  }
};

const Index = ({ documentedParts, setDocumentedParts, language, setLanguage }: IndexProps) => {
  const [currentImage, setCurrentImage] = React.useState<string | null>(null);
  const t = translations[language];

  const handlePhotoSelect = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setCurrentImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handlePartSubmit = (data: PartFormData) => {
    if (currentImage) {
      setDocumentedParts(prev => [{
        data,
        image: currentImage
      }, ...prev]);
      setCurrentImage(null);
    }
  };

  const handleLanguageChange = () => {
    setLanguage(prev => {
      switch (prev) {
        case 'en':
          return 'de';
        case 'de':
          return 'ro';
        case 'ro':
          return 'en';
      }
    });
  };

  const getLanguageButton = () => {
    switch (language) {
      case 'en':
        return 'DE';
      case 'de':
        return 'RO';
      case 'ro':
        return 'EN';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">{t.title}</h1>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={handleLanguageChange}
            className="flex items-center gap-2"
          >
            <Globe className="h-4 w-4 md:h-5 md:w-5" />
            <span className="hidden md:inline">{getLanguageButton()}</span>
          </Button>
          <Link to="/portfolio">
            <Button variant="outline" className="flex items-center gap-2">
              <Grid className="h-4 w-4 md:h-5 md:w-5" />
              <span className="hidden md:inline">{t.viewPortfolio}</span>
            </Button>
          </Link>
        </div>
      </div>
      
      <div className="space-y-8">
        <div className="bg-card rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-4">{t.newPart}</h2>
          <PhotoUpload onPhotoSelect={handlePhotoSelect} />
          <PartForm onSubmit={handlePartSubmit} language={language} />
        </div>
      </div>
    </div>
  );
};

export default Index;