import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { PartFormData } from './PartForm';

interface PartCardProps {
  part: PartFormData;
  image: string;
}

const PartCard = ({ part, image }: PartCardProps) => {
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
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div>
            <p className="text-muted-foreground">Dimensions</p>
            <p>{part.length} × {part.width} × {part.height} mm</p>
          </div>
          <div>
            <p className="text-muted-foreground">Weight</p>
            <p>{part.weight} g</p>
          </div>
          {part.notes && (
            <div className="col-span-2">
              <p className="text-muted-foreground">Notes</p>
              <p>{part.notes}</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default PartCard;