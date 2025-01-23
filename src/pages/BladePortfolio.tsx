import React from 'react';
import { Link } from 'react-router-dom';
import PartCard from '@/components/PartCard';
import { Button } from '@/components/ui/button';
import { DocumentedPart } from '@/types/parts';
import { useToast } from '@/components/ui/use-toast';
import { loadBladeParts, saveBladeParts } from '@/utils/dataStorage';

interface BladePortfolioProps {
  documentedParts: DocumentedPart[];
  language: 'en' | 'de' | 'ro';
  setDocumentedParts: React.Dispatch<React.SetStateAction<DocumentedPart[]>>;
}

const translations = {
  en: {
    title: 'Blade Portfolio',
    backToCapture: 'Back to Capture',
    noParts: 'No blade parts documented yet',
    clearAll: 'Clear All',
    clearConfirm: 'All blade parts have been cleared'
  },
  de: {
    title: 'Klingen Portfolio',
    backToCapture: 'Zurück zur Erfassung',
    noParts: 'Noch keine Klingen-Teile dokumentiert',
    clearAll: 'Alles löschen',
    clearConfirm: 'Alle Klingen-Teile wurden gelöscht'
  },
  ro: {
    title: 'Portofoliu Lamă',
    backToCapture: 'Înapoi la Captură',
    noParts: 'Nicio piesă lamă documentată încă',
    clearAll: 'Șterge tot',
    clearConfirm: 'Toate piesele lamă au fost șterse'
  }
};

const BladePortfolio = ({ documentedParts, language, setDocumentedParts }: BladePortfolioProps) => {
  const t = translations[language];
  const { toast } = useToast();

  const handleClearAll = () => {
    if (setDocumentedParts) {
      setDocumentedParts([]);
      saveBladeParts([]);
      toast({
        description: t.clearConfirm,
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">{t.title}</h1>
        <div className="flex gap-2">
          <Button 
            variant="destructive" 
            onClick={handleClearAll}
            disabled={documentedParts.length === 0}
          >
            {t.clearAll}
          </Button>
          <Link to="/blade">
            <Button variant="outline">{t.backToCapture}</Button>
          </Link>
        </div>
      </div>

      {documentedParts.length === 0 ? (
        <p className="text-center text-muted-foreground">{t.noParts}</p>
      ) : (
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
      )}
    </div>
  );
};

export default BladePortfolio;