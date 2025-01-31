import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import PartCard from '@/components/PartCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DocumentedPart } from '@/types/parts';
import { useToast } from '@/components/ui/use-toast';

interface PortfolioProps {
  documentedParts: DocumentedPart[];
  language: 'en' | 'ar' | 'fr';
  setDocumentedParts?: React.Dispatch<React.SetStateAction<DocumentedPart[]>>;
}

const translations = {
  en: {
    title: 'Portfolio',
    backToCapture: 'Back to Capture',
    noParts: 'No parts documented yet',
    clearAll: 'Clear All',
    clearConfirm: 'All parts have been cleared',
    searchPlaceholder: 'Search parts...',
    noResults: 'No parts found matching your search'
  },
  ar: {
    title: 'المحفظة',
    backToCapture: 'العودة إلى التصوير',
    noParts: 'لم يتم توثيق أي قطع بعد',
    clearAll: 'مسح الكل',
    clearConfirm: 'تم مسح جميع القطع',
    searchPlaceholder: 'البحث عن القطع...',
    noResults: 'لم يتم العثور على قطع مطابقة لبحثك'
  },
  fr: {
    title: 'Portfolio',
    backToCapture: 'Retour à la Capture',
    noParts: 'Aucune pièce documentée',
    clearAll: 'Tout Effacer',
    clearConfirm: 'Toutes les pièces ont été effacées',
    searchPlaceholder: 'Rechercher des pièces...',
    noResults: 'Aucune pièce trouvée correspondant à votre recherche'
  }
};

const Portfolio = ({ documentedParts, language, setDocumentedParts }: PortfolioProps) => {
  const t = translations[language];
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');

  const handleClearAll = () => {
    if (setDocumentedParts) {
      setDocumentedParts([]);
      toast({
        description: t.clearConfirm,
      });
    }
  };

  const filteredParts = documentedParts.filter(part => 
    part.data.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

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

      <div className="relative mb-6">
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
      ) : filteredParts.length === 0 ? (
        <p className="text-center text-muted-foreground">{t.noResults}</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2">
          {filteredParts.map((part, index) => (
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