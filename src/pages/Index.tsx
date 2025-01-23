import React, { useState } from 'react';
import PhotoUpload from '@/components/PhotoUpload';
import PartForm, { PartFormData } from '@/components/PartForm';
import PartCard from '@/components/PartCard';
import { Button } from '@/components/ui/button';

interface DocumentedPart {
  data: PartFormData;
  image: string;
}

const Index = () => {
  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const [documentedParts, setDocumentedParts] = useState<DocumentedPart[]>([]);
  const [language, setLanguage] = useState<'en' | 'de' | 'ro'>('en');

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

  const getTitle = () => {
    switch (language) {
      case 'en':
        return 'Part Documentation';
      case 'de':
        return 'Teile-Dokumentation';
      case 'ro':
        return 'Documentație Piese';
    }
  };

  const getNewPartTitle = () => {
    switch (language) {
      case 'en':
        return 'Document New Part';
      case 'de':
        return 'Neues Teil dokumentieren';
      case 'ro':
        return 'Documentează Piesă Nouă';
    }
  };

  const getRecentPartsTitle = () => {
    switch (language) {
      case 'en':
        return 'Recent Parts';
      case 'de':
        return 'Aktuelle Teile';
      case 'ro':
        return 'Piese Recente';
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

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">{getTitle()}</h1>
        <Button
          variant="outline"
          onClick={handleLanguageChange}
        >
          {getLanguageButton()}
        </Button>
      </div>
      
      <div className="space-y-8">
        <div className="bg-card rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-4">{getNewPartTitle()}</h2>
          <PhotoUpload onPhotoSelect={handlePhotoSelect} />
          <PartForm onSubmit={handlePartSubmit} language={language} />
        </div>

        {documentedParts.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">{getRecentPartsTitle()}</h2>
            <div className="grid gap-6 sm:grid-cols-2">
              {documentedParts.map((part, index) => (
                <PartCard
                  key={index}
                  part={part.data}
                  image={part.image}
                  language={language}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;