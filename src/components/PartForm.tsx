import React from 'react';
import { useForm } from 'react-hook-form';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { toast } from 'sonner';

interface PartFormProps {
  onSubmit: (data: PartFormData) => void;
  language?: 'en' | 'de' | 'ro';
}

export interface PartFormData {
  name: string;
  length: string;
  width: string;
  height: string;
  quantity: string;
  notes: string;
}

const translations = {
  en: {
    partName: 'Part Name',
    length: 'Length (mm)',
    width: 'Width (mm)',
    height: 'Height (mm)',
    quantity: 'Quantity',
    notes: 'Notes',
    documentPart: 'Document Part',
    enterPartName: 'Enter part name',
    additionalDetails: 'Additional details',
    success: 'Part documented successfully!'
  },
  de: {
    partName: 'Teilename',
    length: 'Länge (mm)',
    width: 'Breite (mm)',
    height: 'Höhe (mm)',
    quantity: 'Menge',
    notes: 'Notizen',
    documentPart: 'Teil dokumentieren',
    enterPartName: 'Teilename eingeben',
    additionalDetails: 'Zusätzliche Details',
    success: 'Teil erfolgreich dokumentiert!'
  },
  ro: {
    partName: 'Nume Piesă',
    length: 'Lungime (mm)',
    width: 'Lățime (mm)',
    height: 'Înălțime (mm)',
    quantity: 'Cantitate',
    notes: 'Note',
    documentPart: 'Documentează Piesa',
    enterPartName: 'Introduceți numele piesei',
    additionalDetails: 'Detalii suplimentare',
    success: 'Piesă documentată cu succes!'
  }
};

const PartForm = ({ onSubmit, language = 'en' }: PartFormProps) => {
  const { register, handleSubmit, reset } = useForm<PartFormData>();
  const t = translations[language];

  const onSubmitForm = (data: PartFormData) => {
    onSubmit(data);
    reset();
    toast.success(t.success);
  };

  return (
    <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-4">
      <div>
        <Label htmlFor="name">{t.partName}</Label>
        <Input id="name" {...register('name')} placeholder={t.enterPartName} required />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="length">{t.length}</Label>
          <Input
            id="length"
            type="number"
            {...register('length')}
            placeholder="0"
            required
          />
        </div>
        <div>
          <Label htmlFor="width">{t.width}</Label>
          <Input
            id="width"
            type="number"
            {...register('width')}
            placeholder="0"
            required
          />
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="height">{t.height}</Label>
          <Input
            id="height"
            type="number"
            {...register('height')}
            placeholder="0"
            required
          />
        </div>
        <div>
          <Label htmlFor="quantity">{t.quantity}</Label>
          <Input
            id="quantity"
            type="number"
            {...register('quantity')}
            placeholder="1"
            min="1"
            required
          />
        </div>
      </div>

      <div>
        <Label htmlFor="notes">{t.notes}</Label>
        <Input id="notes" {...register('notes')} placeholder={t.additionalDetails} />
      </div>

      <Button type="submit" className="w-full">{t.documentPart}</Button>
    </form>
  );
};

export default PartForm;