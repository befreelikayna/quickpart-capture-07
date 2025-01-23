import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { PartFormData } from './PartForm';

interface PartCardProps {
  part: PartFormData;
  image: string;
  language?: 'en' | 'de' | 'ro';
}

const translations = {
  en: {
    dimensions: 'Dimensions',
    notes: 'Notes'
  },
  de: {
    dimensions: 'Abmessungen',
    notes: 'Notizen'
  },
  ro: {
    dimensions: 'Dimensiuni',
    notes: 'Note'
  }
};

const PartCard = ({ part, image, language = 'en' }: PartCardProps) => {
  const t = translations[language];
  
  return (
    <Card className="overflow-hidden">
      <div className="aspect-video w-full">
        <img
          src={image}
          alt={part.name}
          className="w-full h-full object-cover"
        />
      </div>
      <CardHeader>
        <CardTitle>{part.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-2 text-sm">
          <div>
            <p className="text-muted-foreground">{t.dimensions}</p>
            <p>{part.length} × {part.width} × {part.height} mm</p>
          </div>
          {part.notes && (
            <div>
              <p className="text-muted-foreground">{t.notes}</p>
              <p>{part.notes}</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default PartCard;