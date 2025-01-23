import React from 'react';
import { Link } from 'react-router-dom';
import PartCard from '@/components/PartCard';
import { Button } from '@/components/ui/button';
import { DocumentedPart } from '@/types/parts';
import { useToast } from '@/components/ui/use-toast';

interface PortfolioProps {
  documentedParts: DocumentedPart[];
  language: 'en' | 'de' | 'ro';
  setDocumentedParts?: React.Dispatch<React.SetStateAction<DocumentedPart[]>>;
}

const translations = {
  en: {
    title: 'Portfolio',
    backToCapture: 'Back to Capture',
    noParts: 'No parts documented yet',
    clearAll: 'Clear All',
    clearConfirm: 'All parts have been cleared'
  },
  de: {
    title: 'Portfolio',
    backToCapture: 'Zurück zur Erfassung',
    noParts: 'Noch keine Teile dokumentiert',
    clearAll: 'Alles löschen',
    clearConfirm: 'Alle Teile wurden gelöscht'
  },
  ro: {
    title: 'Portofoliu',
    backToCapture: 'Înapoi la Captură',
    noParts: 'Nicio piesă documentată încă',
    clearAll: 'Șterge tot',
    clearConfirm: 'Toate piesele au fost șterse'
  }
};

const Portfolio = ({ documentedParts, language, setDocumentedParts }: PortfolioProps) => {
  const t = translations[language];
  const { toast } = useToast();

  const handleClearAll = () => {
    if (setDocumentedParts) {
      setDocumentedParts([]);
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
          <Link to="/">
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

export default Portfolio;