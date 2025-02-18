
import React from 'react';
import { useForm } from 'react-hook-form';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { toast } from 'sonner';

interface PartFormProps {
  onSubmit: (data: PartFormData) => void;
  language?: 'en' | 'ar' | 'fr';
  type: 'blade' | 'marber';
}

export interface PartFormData {
  name: string;
  length: string;
  width: string;
  height: string;
  quantity: string;
  notes: string;
  price: string;
}

const translations = {
  en: {
    partName: 'Part Name',
    category: 'Category',
    length: 'Length (cm)',
    width: 'Width (cm)',
    height: 'Height (cm)',
    quantity: 'Quantity',
    notes: 'Notes',
    price: 'Price (DH)',
    documentPart: 'Document Part',
    enterPartName: 'Enter part name',
    additionalDetails: 'Additional details',
    success: 'Part documented successfully!',
    blade: 'Blade',
    marber: 'Marber'
  },
  ar: {
    partName: 'اسم القطعة',
    category: 'الفئة',
    length: 'الطول (سم)',
    width: 'العرض (سم)',
    height: 'الارتفاع (سم)',
    quantity: 'الكمية',
    notes: 'ملاحظات',
    price: 'السعر (درهم)',
    documentPart: 'توثيق القطعة',
    enterPartName: 'أدخل اسم القطعة',
    additionalDetails: 'تفاصيل إضافية',
    success: 'تم توثيق القطعة بنجاح!',
    blade: 'شفرة',
    marber: 'ماربر'
  },
  fr: {
    partName: 'Nom de la pièce',
    category: 'Catégorie',
    length: 'Longueur (cm)',
    width: 'Largeur (cm)',
    height: 'Hauteur (cm)',
    quantity: 'Quantité',
    notes: 'Notes',
    price: 'Prix (DH)',
    documentPart: 'Documenter la pièce',
    enterPartName: 'Entrez le nom de la pièce',
    additionalDetails: 'Détails supplémentaires',
    success: 'Pièce documentée avec succès!',
    blade: 'Lame',
    marber: 'Marber'
  }
};

const PartForm = ({ onSubmit, language = 'en', type }: PartFormProps) => {
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

      <div>
        <Label htmlFor="category">{t.category}</Label>
        <Input 
          id="category" 
          value={type === 'blade' ? t.blade : t.marber} 
          className="bg-gray-100"
          disabled 
        />
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
        <Label htmlFor="price">{t.price}</Label>
        <Input
          id="price"
          type="number"
          step="0.01"
          {...register('price')}
          placeholder="0.00"
          required
        />
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
