import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

const Calculator = () => {
  const [display, setDisplay] = useState('0');
  const [firstNumber, setFirstNumber] = useState('');
  const [operation, setOperation] = useState('');
  const [newNumber, setNewNumber] = useState(true);

  const handleNumber = (number: string) => {
    if (newNumber) {
      setDisplay(number);
      setNewNumber(false);
    } else {
      setDisplay(display === '0' ? number : display + number);
    }
  };

  const handleOperation = (op: string) => {
    setFirstNumber(display);
    setOperation(op);
    setNewNumber(true);
  };

  const handleEqual = () => {
    if (!operation || !firstNumber) return;

    const num1 = parseFloat(firstNumber);
    const num2 = parseFloat(display);
    let result = 0;

    switch (operation) {
      case '+':
        result = num1 + num2;
        break;
      case '-':
        result = num1 - num2;
        break;
      case '*':
        result = num1 * num2;
        break;
      case '/':
        if (num2 === 0) {
          toast.error("Cannot divide by zero!");
          return;
        }
        result = num1 / num2;
        break;
    }

    setDisplay(result.toString());
    setFirstNumber('');
    setOperation('');
    setNewNumber(true);
  };

  const handleClear = () => {
    setDisplay('0');
    setFirstNumber('');
    setOperation('');
    setNewNumber(true);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto bg-card p-6 rounded-lg shadow-lg">
        <Input 
          value={display} 
          readOnly 
          className="text-right text-2xl mb-4"
        />
        <div className="grid grid-cols-4 gap-2">
          {/* Numbers */}
          <Button onClick={() => handleNumber('7')}>7</Button>
          <Button onClick={() => handleNumber('8')}>8</Button>
          <Button onClick={() => handleNumber('9')}>9</Button>
          <Button onClick={() => handleOperation('/')} variant="secondary">/</Button>
          
          <Button onClick={() => handleNumber('4')}>4</Button>
          <Button onClick={() => handleNumber('5')}>5</Button>
          <Button onClick={() => handleNumber('6')}>6</Button>
          <Button onClick={() => handleOperation('*')} variant="secondary">×</Button>
          
          <Button onClick={() => handleNumber('1')}>1</Button>
          <Button onClick={() => handleNumber('2')}>2</Button>
          <Button onClick={() => handleNumber('3')}>3</Button>
          <Button onClick={() => handleOperation('-')} variant="secondary">-</Button>
          
          <Button onClick={() => handleNumber('0')}>0</Button>
          <Button onClick={() => handleNumber('.')}>.</Button>
          <Button onClick={handleEqual} variant="default">=</Button>
          <Button onClick={() => handleOperation('+')} variant="secondary">+</Button>
          
          <Button onClick={handleClear} variant="destructive" className="col-span-4">
            Clear
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Calculator;