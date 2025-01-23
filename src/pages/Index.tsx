import React from 'react';
import { Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PartCard from '@/components/PartCard';
import { DocumentedPart } from '@/types/parts';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface IndexProps {
  documentedParts: DocumentedPart[];
  setDocumentedParts: React.Dispatch<React.SetStateAction<DocumentedPart[]>>;
  language: 'en' | 'de' | 'ro';
  setLanguage: React.Dispatch<React.SetStateAction<'en' | 'de' | 'ro'>>;
}

const translations = {
  en: {
    title: 'Portfolio',
    noParts: 'No parts documented yet',
  },
  de: {
    title: 'Portfolio',
    noParts: 'Noch keine Teile dokumentiert',
  },
  ro: {
    title: 'Portofoliu',
    noParts: 'Nicio piesă documentată încă',
  }
};

const languageNames = {
  en: 'English',
  de: 'Deutsch',
  ro: 'Română'
};

const Index = ({ documentedParts, language, setLanguage }: IndexProps) => {
  const t = translations[language];

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">{t.title}</h1>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="flex items-center gap-2"
            >
              <Globe className="h-4 w-4 md:h-5 md:w-5" />
              <span className="hidden md:inline">{languageNames[language]}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setLanguage('en')}>
              English
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setLanguage('de')}>
              Deutsch
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setLanguage('ro')}>
              Română
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {documentedParts.length === 0 ? (
        <p className="text-center text-muted-foreground">{t.noParts}</p>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {documentedParts.map((part, index) => (
            <PartCard
              key={index}
              part={part.data}
              image={part.image}
              language={language}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Index;