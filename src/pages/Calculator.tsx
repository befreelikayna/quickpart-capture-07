import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Card } from '@/components/ui/card';

interface CalculationHistory {
  length: number;
  width: number;
  tranches: number;
  pricePerMeter: number;
  totalArea: number;
  areaPerTranche: number;
  totalPrice: number;
  timestamp: string;
}

const translations = {
  en: {
    title: 'Marble Size Calculator',
    length: 'Length (m):',
    width: 'Width (m):',
    tranches: 'Number of Tranches:',
    price: 'Price per m²:',
    calculate: 'Calculate',
    totalArea: 'Total Area:',
    perTranche: 'Area per Tranche:',
    totalPrice: 'Total Price:',
    squareMeters: 'square meters',
    currency: 'DH',
    enterLength: 'Enter length',
    enterWidth: 'Enter width',
    enterTranches: 'Enter number of tranches',
    enterPrice: 'Enter price per m²',
    history: 'History',
    clearHistory: 'Clear History',
    back: 'Back',
    calculationHistory: 'Calculation History'
  },
  ar: {
    title: 'حاسبة حجم الرخام',
    length: 'الطول (متر):',
    width: 'العرض (متر):',
    tranches: 'عدد الشرائح:',
    price: 'السعر لكل متر مربع:',
    calculate: 'احسب',
    totalArea: 'المساحة الكلية:',
    perTranche: 'المساحة لكل شريحة:',
    totalPrice: 'السعر الإجمالي:',
    squareMeters: 'متر مربع',
    currency: 'درهم',
    enterLength: 'أدخل الطول',
    enterWidth: 'أدخل العرض',
    enterTranches: 'أدخل عدد الشرائح',
    enterPrice: 'أدخل السعر لكل متر مربع',
    history: 'السجل',
    clearHistory: 'مسح السجل',
    back: 'رجوع',
    calculationHistory: 'سجل الحسابات'
  },
  fr: {
    title: 'Calculateur de Taille de Marbre',
    length: 'Longueur (m):',
    width: 'Largeur (m):',
    tranches: 'Nombre de Tranches:',
    price: 'Prix par m²:',
    calculate: 'Calculer',
    totalArea: 'Surface Totale:',
    perTranche: 'Surface par Tranche:',
    totalPrice: 'Prix Total:',
    squareMeters: 'mètres carrés',
    currency: 'DH',
    enterLength: 'Entrer la longueur',
    enterWidth: 'Entrer la largeur',
    enterTranches: 'Entrer le nombre de tranches',
    enterPrice: 'Entrer le prix par m²',
    history: 'Historique',
    clearHistory: "Effacer l'historique",
    back: 'Retour',
    calculationHistory: 'Historique des calculs'
  }
};

const Calculator = () => {
  const [currentLanguage, setCurrentLanguage] = useState<'en' | 'ar' | 'fr'>('en');
  const [length, setLength] = useState('');
  const [width, setWidth] = useState('');
  const [tranches, setTranches] = useState('');
  const [pricePerMeter, setPricePerMeter] = useState('');
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState<CalculationHistory[]>([]);
  const [results, setResults] = useState({
    totalArea: 0,
    areaPerTranche: 0,
    totalPrice: 0
  });

  const t = translations[currentLanguage];

  useEffect(() => {
    // Load history from localStorage
    const savedHistory = localStorage.getItem('calculationHistory');
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }

    // Set document direction based on language
    document.documentElement.dir = currentLanguage === 'ar' ? 'rtl' : 'ltr';
  }, [currentLanguage]);

  const calculate = () => {
    const lengthNum = parseFloat(length);
    const widthNum = parseFloat(width);
    const tranchesNum = parseInt(tranches) || 1;
    const priceNum = parseFloat(pricePerMeter);

    if (!lengthNum || !widthNum || !priceNum) {
      toast.error("Please fill in all required fields");
      return;
    }

    const totalArea = lengthNum * widthNum;
    const areaPerTranche = totalArea / tranchesNum;
    const totalPrice = totalArea * priceNum;

    const newResults = {
      totalArea,
      areaPerTranche,
      totalPrice
    };

    setResults(newResults);

    // Save to history
    const newCalculation: CalculationHistory = {
      length: lengthNum,
      width: widthNum,
      tranches: tranchesNum,
      pricePerMeter: priceNum,
      totalArea,
      areaPerTranche,
      totalPrice,
      timestamp: new Date().toISOString()
    };

    const updatedHistory = [newCalculation, ...history.slice(0, 9)];
    setHistory(updatedHistory);
    localStorage.setItem('calculationHistory', JSON.stringify(updatedHistory));
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem('calculationHistory');
    toast.success("History cleared successfully");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold">{t.title}</h1>
          <div className="space-x-2">
            <Button 
              variant={currentLanguage === 'en' ? "default" : "outline"}
              onClick={() => setCurrentLanguage('en')}
            >
              EN
            </Button>
            <Button 
              variant={currentLanguage === 'ar' ? "default" : "outline"}
              onClick={() => setCurrentLanguage('ar')}
            >
              AR
            </Button>
            <Button 
              variant={currentLanguage === 'fr' ? "default" : "outline"}
              onClick={() => setCurrentLanguage('fr')}
            >
              FR
            </Button>
          </div>
        </div>

        <Card className="p-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="length">{t.length}</Label>
              <Input
                id="length"
                type="number"
                placeholder={t.enterLength}
                value={length}
                onChange={(e) => setLength(e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="width">{t.width}</Label>
              <Input
                id="width"
                type="number"
                placeholder={t.enterWidth}
                value={width}
                onChange={(e) => setWidth(e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="tranches">{t.tranches}</Label>
              <Input
                id="tranches"
                type="number"
                placeholder={t.enterTranches}
                value={tranches}
                onChange={(e) => setTranches(e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="price">{t.price}</Label>
              <Input
                id="price"
                type="number"
                placeholder={t.enterPrice}
                value={pricePerMeter}
                onChange={(e) => setPricePerMeter(e.target.value)}
              />
            </div>

            <Button onClick={calculate} className="w-full">
              {t.calculate}
            </Button>
          </div>

          {(results.totalArea > 0 || results.totalPrice > 0) && (
            <div className="mt-6 space-y-2">
              <p>{t.totalArea} {results.totalArea.toFixed(2)} {t.squareMeters}</p>
              <p>{t.perTranche} {results.areaPerTranche.toFixed(2)} {t.squareMeters}</p>
              <p>{t.totalPrice} {results.totalPrice.toFixed(2)} {t.currency}</p>
            </div>
          )}
        </Card>

        <div className="mt-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">{t.calculationHistory}</h2>
            {history.length > 0 && (
              <Button variant="destructive" onClick={clearHistory}>
                {t.clearHistory}
              </Button>
            )}
          </div>

          <div className="space-y-4">
            {history.map((item, index) => (
              <Card key={index} className="p-4">
                <div className="text-sm text-muted-foreground mb-2">
                  {new Date(item.timestamp).toLocaleString()}
                </div>
                <p>{t.totalArea} {item.totalArea.toFixed(2)} {t.squareMeters}</p>
                <p>{t.perTranche} {item.areaPerTranche.toFixed(2)} {t.squareMeters}</p>
                <p>{t.totalPrice} {item.totalPrice.toFixed(2)} {t.currency}</p>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calculator;