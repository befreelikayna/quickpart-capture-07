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
    bladeCategory: 'Blade Parts',
    marberCategory: 'Marber Parts',
    noBladeItems: 'No blade parts documented yet',
    noMarberItems: 'No marber parts documented yet'
  },
  de: {
    title: 'Portfolio',
    noParts: 'Noch keine Teile dokumentiert',
    bladeCategory: 'Klingen-Teile',
    marberCategory: 'Marber-Teile',
    noBladeItems: 'Noch keine Klingen-Teile dokumentiert',
    noMarberItems: 'Noch keine Marber-Teile dokumentiert'
  },
  ro: {
    title: 'Portofoliu',
    noParts: 'Nicio piesă documentată încă',
    bladeCategory: 'Piese Lamă',
    marberCategory: 'Piese Marber',
    noBladeItems: 'Nicio piesă lamă documentată încă',
    noMarberItems: 'Nicio piesă marber documentată încă'
  }
};

const languageNames = {
  en: 'English',
  de: 'Deutsch',
  ro: 'Română'
};

const Index = ({ documentedParts, language, setLanguage }: IndexProps) => {
  const t = translations[language];

  // Separate parts by category
  const bladeParts = documentedParts.filter(part => part.type === 'blade');
  const marberParts = documentedParts.filter(part => part.type === 'marber');

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
        <div className="space-y-12">
          {/* Blade Category */}
          <section>
            <h2 className="text-2xl font-semibold mb-6">{t.bladeCategory}</h2>
            {bladeParts.length === 0 ? (
              <p className="text-center text-muted-foreground">{t.noBladeItems}</p>
            ) : (
              <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {bladeParts.map((part, index) => (
                  <PartCard
                    key={index}
                    part={part.data}
                    image={part.image}
                    language={language}
                  />
                ))}
              </div>
            )}
          </section>

          {/* Marber Category */}
          <section>
            <h2 className="text-2xl font-semibold mb-6">{t.marberCategory}</h2>
            {marberParts.length === 0 ? (
              <p className="text-center text-muted-foreground">{t.noMarberItems}</p>
            ) : (
              <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {marberParts.map((part, index) => (
                  <PartCard
                    key={index}
                    part={part.data}
                    image={part.image}
                    language={language}
                  />
                ))}
              </div>
            )}
          </section>
        </div>
      )}
    </div>
  );
};

export default Index;