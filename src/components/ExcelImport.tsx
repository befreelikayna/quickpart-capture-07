
import React from 'react';
import { read, utils } from 'xlsx';
import { Button } from './ui/button';
import { toast } from 'sonner';
import { DocumentedPart } from '@/types/parts';

interface ExcelImportProps {
  onImport: (parts: DocumentedPart[]) => void;
  type: 'blade' | 'marber';
  language?: 'en' | 'ar' | 'fr';
}

const translations = {
  en: {
    importExcel: 'Import from Excel',
    success: 'Parts imported successfully',
    error: 'Error importing file',
    invalidFormat: 'Invalid file format. Please use Excel files (.xlsx, .xls)',
    missingColumns: 'Missing required columns in Excel file'
  },
  ar: {
    importExcel: 'استيراد من إكسل',
    success: 'تم استيراد القطع بنجاح',
    error: 'خطأ في استيراد الملف',
    invalidFormat: 'تنسيق ملف غير صالح. يرجى استخدام ملفات إكسل (.xlsx, .xls)',
    missingColumns: 'أعمدة مطلوبة مفقودة في ملف إكسل'
  },
  fr: {
    importExcel: 'Importer depuis Excel',
    success: 'Pièces importées avec succès',
    error: 'Erreur lors de l\'importation du fichier',
    invalidFormat: 'Format de fichier invalide. Veuillez utiliser des fichiers Excel (.xlsx, .xls)',
    missingColumns: 'Colonnes requises manquantes dans le fichier Excel'
  }
};

const ExcelImport = ({ onImport, type, language = 'en' }: ExcelImportProps) => {
  const t = translations[language];

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Check file extension
    const fileExt = file.name.split('.').pop()?.toLowerCase();
    if (!['xlsx', 'xls'].includes(fileExt || '')) {
      toast.error(t.invalidFormat);
      return;
    }

    try {
      const data = await file.arrayBuffer();
      const workbook = read(data);
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = utils.sheet_to_json(worksheet);

      // Validate required columns
      const requiredColumns = ['name', 'length', 'width', 'height', 'quantity', 'notes', 'price'];
      const hasRequiredColumns = jsonData.length > 0 && 
        requiredColumns.every(col => Object.keys(jsonData[0]).includes(col));

      if (!hasRequiredColumns) {
        toast.error(t.missingColumns);
        return;
      }

      // Convert Excel data to DocumentedPart format
      const parts: DocumentedPart[] = jsonData.map((row: any) => ({
        type,
        data: {
          name: row.name?.toString() || '',
          length: row.length?.toString() || '0',
          width: row.width?.toString() || '0',
          height: row.height?.toString() || '0',
          quantity: row.quantity?.toString() || '1',
          notes: row.notes?.toString() || '',
          price: row.price?.toString() || '0'
        },
        image: '/placeholder.svg' // Default placeholder image
      }));

      onImport(parts);
      toast.success(t.success);
    } catch (error) {
      console.error('Excel import error:', error);
      toast.error(t.error);
    }

    // Reset input
    event.target.value = '';
  };

  return (
    <div>
      <input
        type="file"
        accept=".xlsx,.xls"
        onChange={handleFileUpload}
        className="hidden"
        id={`excel-import-${type}`}
      />
      <label htmlFor={`excel-import-${type}`}>
        <Button variant="outline" className="cursor-pointer" asChild>
          <span>{t.importExcel}</span>
        </Button>
      </label>
    </div>
  );
};

export default ExcelImport;
