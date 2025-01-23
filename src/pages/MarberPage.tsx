import React from 'react';
import { Link } from 'react-router-dom';
import PhotoUpload from '@/components/PhotoUpload';
import PartForm, { PartFormData } from '@/components/PartForm';
import { Button } from '@/components/ui/button';
import { DocumentedPart } from '@/types/parts';
import { Globe, Grid } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface MarberPageProps {
  documentedParts: DocumentedPart[];
  setDocumentedParts: React.Dispatch<React.SetStateAction<DocumentedPart[]>>;
  language: 'en' | 'ar' | 'fr';
  setLanguage: React.Dispatch<React.SetStateAction<'en' | 'ar' | 'fr'>>;
}

const translations = {
  en: {
    title: 'Marber Documentation',
    viewPortfolio: 'View Portfolio',
    newPart: 'Document New Marber'
  },
  ar: {
    title: 'توثيق ماربر',
    viewPortfolio: 'عرض المحفظة',
    newPart: 'توثيق ماربر جديد'
  },
  fr: {
    title: 'Documentation Marber',
    viewPortfolio: 'Voir Portfolio',
    newPart: 'Documenter Nouveau Marber'
  }
};

const languageNames = {
  en: 'English',
  ar: 'العربية',
  fr: 'Français'
};

const MarberPage = ({ documentedParts, setDocumentedParts, language, setLanguage }: MarberPageProps) => {
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
        image: currentImage,
        type: 'marber'
      }, ...prev]);
      setCurrentImage(null);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="flex justify-end mb-8">
        <div className="flex gap-2">
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
          <Link to="/marber-portfolio">
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
          <PartForm onSubmit={handlePartSubmit} language={language} type="marber" />
        </div>
      </div>
    </div>
  );
};

export default MarberPage;