import React from 'react';
import { Globe, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
  language: 'en' | 'ar' | 'fr';
  setLanguage: React.Dispatch<React.SetStateAction<'en' | 'ar' | 'fr'>>;
}

const translations = {
  en: {
    title: 'Portfolio',
    noParts: 'No parts documented yet',
    bladeCategory: 'Blade Parts',
    marberCategory: 'Marber Parts',
    noBladeItems: 'No blade parts documented yet',
    noMarberItems: 'No marber parts documented yet',
    searchPlaceholder: 'Search parts...'
  },
  ar: {
    title: 'المحفظة',
    noParts: 'لم يتم توثيق أي قطع بعد',
    bladeCategory: 'قطع الشفرة',
    marberCategory: 'قطع ماربر',
    noBladeItems: 'لم يتم توثيق أي قطع شفرة بعد',
    noMarberItems: 'لم يتم توثيق أي قطع ماربر بعد',
    searchPlaceholder: 'البحث عن القطع...'
  },
  fr: {
    title: 'Portfolio',
    noParts: 'Aucune pièce documentée',
    bladeCategory: 'Pièces Lame',
    marberCategory: 'Pièces Marber',
    noBladeItems: 'Aucune pièce lame documentée',
    noMarberItems: 'Aucune pièce marber documentée',
    searchPlaceholder: 'Rechercher des pièces...'
  }
};

const languageNames = {
  en: 'English',
  ar: 'العربية',
  fr: 'Français'
};

const Index = ({ documentedParts, language, setLanguage }: IndexProps) => {
  const t = translations[language];
  const [searchQuery, setSearchQuery] = React.useState('');

  // Filter parts based on search query
  const filteredParts = documentedParts.filter(part => 
    part.data.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Separate filtered parts by category
  const bladeParts = filteredParts.filter(part => part.type === 'blade');
  const marberParts = filteredParts.filter(part => part.type === 'marber');

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
            <DropdownMenuItem onClick={() => setLanguage('ar')}>
              العربية
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setLanguage('fr')}>
              Français
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Search Bar */}
      <div className="relative mb-8">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          type="text"
          placeholder={t.searchPlaceholder}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
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