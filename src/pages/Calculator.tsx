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
    <div className="container mx-auto px-4 py-4 sm:py-8 animate-fade-in">
      <div className="max-w-lg mx-auto">
        <div className="mb-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent animate-scale-in">
            {t.title}
          </h1>
          <div className="flex gap-2 animate-fade-in">
            <Button 
              variant={currentLanguage === 'en' ? "default" : "outline"}
              onClick={() => setCurrentLanguage('en')}
              className="px-3 py-1 text-sm hover:scale-105 transition-transform duration-200"
            >
              EN
            </Button>
            <Button 
              variant={currentLanguage === 'ar' ? "default" : "outline"}
              onClick={() => setCurrentLanguage('ar')}
              className="px-3 py-1 text-sm hover:scale-105 transition-transform duration-200"
            >
              AR
            </Button>
            <Button 
              variant={currentLanguage === 'fr' ? "default" : "outline"}
              onClick={() => setCurrentLanguage('fr')}
              className="px-3 py-1 text-sm hover:scale-105 transition-transform duration-200"
            >
              FR
            </Button>
          </div>
        </div>

        <Card className="p-4 sm:p-6 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
          <div className="space-y-4">
            <div className="animate-fade-in [animation-delay:100ms]">
              <Label htmlFor="length" className="text-sm sm:text-base font-medium text-gray-700">
                {t.length}
              </Label>
              <Input
                id="length"
                type="number"
                placeholder={t.enterLength}
                value={length}
                onChange={(e) => setLength(e.target.value)}
                className="mt-1 transition-all duration-200 hover:border-purple-400 focus:border-purple-500"
              />
            </div>

            <div className="animate-fade-in [animation-delay:200ms]">
              <Label htmlFor="width" className="text-sm sm:text-base font-medium text-gray-700">
                {t.width}
              </Label>
              <Input
                id="width"
                type="number"
                placeholder={t.enterWidth}
                value={width}
                onChange={(e) => setWidth(e.target.value)}
                className="mt-1 transition-all duration-200 hover:border-purple-400 focus:border-purple-500"
              />
            </div>

            <div className="animate-fade-in [animation-delay:300ms]">
              <Label htmlFor="tranches" className="text-sm sm:text-base font-medium text-gray-700">
                {t.tranches}
              </Label>
              <Input
                id="tranches"
                type="number"
                placeholder={t.enterTranches}
                value={tranches}
                onChange={(e) => setTranches(e.target.value)}
                className="mt-1 transition-all duration-200 hover:border-purple-400 focus:border-purple-500"
              />
            </div>

            <div className="animate-fade-in [animation-delay:400ms]">
              <Label htmlFor="price" className="text-sm sm:text-base font-medium text-gray-700">
                {t.price}
              </Label>
              <Input
                id="price"
                type="number"
                placeholder={t.enterPrice}
                value={pricePerMeter}
                onChange={(e) => setPricePerMeter(e.target.value)}
                className="mt-1 transition-all duration-200 hover:border-purple-400 focus:border-purple-500"
              />
            </div>

            <Button 
              onClick={calculate} 
              className="w-full bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 transition-all duration-300 transform hover:scale-[1.02] animate-fade-in [animation-delay:500ms]"
            >
              {t.calculate}
            </Button>
          </div>

          {(results.totalArea > 0 || results.totalPrice > 0) && (
            <div className="mt-6 space-y-3 rounded-lg bg-gradient-to-r from-purple-50 to-blue-50 p-6 shadow-lg animate-scale-in">
              <div className="flex items-center justify-between p-3 rounded-md bg-white/80 backdrop-blur-sm hover:bg-white/90 transition-all duration-200 shadow-sm">
                <span className="font-medium text-purple-800">{t.totalArea}</span>
                <span className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-md">
                  {results.totalArea.toFixed(2)} {t.squareMeters}
                </span>
              </div>
              
              <div className="flex items-center justify-between p-3 rounded-md bg-white/80 backdrop-blur-sm hover:bg-white/90 transition-all duration-200 shadow-sm">
                <span className="font-medium text-purple-800">{t.perTranche}</span>
                <span className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-md">
                  {results.areaPerTranche.toFixed(2)} {t.squareMeters}
                </span>
              </div>
              
              <div className="flex items-center justify-between p-3 rounded-md bg-white/80 backdrop-blur-sm hover:bg-white/90 transition-all duration-200 shadow-sm">
                <span className="font-medium text-purple-800">{t.totalPrice}</span>
                <span className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-md">
                  {results.totalPrice.toFixed(2)} {t.currency}
                </span>
              </div>
            </div>
          )}
        </Card>

        <div className="mt-6 animate-fade-in [animation-delay:600ms]">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800">{t.calculationHistory}</h2>
            {history.length > 0 && (
              <Button 
                variant="destructive" 
                onClick={clearHistory} 
                className="text-sm hover:scale-105 transition-transform duration-200"
              >
                {t.clearHistory}
              </Button>
            )}
          </div>

          <div className="space-y-4">
            {history.map((item, index) => (
              <Card 
                key={index} 
                className="p-4 bg-white/80 backdrop-blur-sm shadow hover:shadow-md transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${(index + 1) * 100}ms` }}
              >
                <div className="text-xs sm:text-sm text-gray-500 mb-2">
                  {new Date(item.timestamp).toLocaleString()}
                </div>
                <div className="space-y-1 text-sm sm:text-base text-gray-700">
                  <p>{t.totalArea} {item.totalArea.toFixed(2)} {t.squareMeters}</p>
                  <p>{t.perTranche} {item.areaPerTranche.toFixed(2)} {t.squareMeters}</p>
                  <p>{t.totalPrice} {item.totalPrice.toFixed(2)} {t.currency}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
