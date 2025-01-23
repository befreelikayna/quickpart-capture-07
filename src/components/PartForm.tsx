import React from 'react';
import { useForm } from 'react-hook-form';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { toast } from 'sonner';

interface PartFormProps {
  onSubmit: (data: PartFormData) => void;
}

export interface PartFormData {
  name: string;
  length: string;
  width: string;
  height: string;
  weight: string;
  notes: string;
}

const PartForm = ({ onSubmit }: PartFormProps) => {
  const { register, handleSubmit, reset } = useForm<PartFormData>();

  const onSubmitForm = (data: PartFormData) => {
    onSubmit(data);
    reset();
    toast.success("Part documented successfully!");
  };

  return (
    <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-4">
      <div>
        <Label htmlFor="name">Part Name</Label>
        <Input id="name" {...register('name')} placeholder="Enter part name" required />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="length">Length (mm)</Label>
          <Input
            id="length"
            type="number"
            {...register('length')}
            placeholder="0"
            required
          />
        </div>
        <div>
          <Label htmlFor="width">Width (mm)</Label>
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
          <Label htmlFor="height">Height (mm)</Label>
          <Input
            id="height"
            type="number"
            {...register('height')}
            placeholder="0"
            required
          />
        </div>
        <div>
          <Label htmlFor="weight">Weight (g)</Label>
          <Input
            id="weight"
            type="number"
            {...register('weight')}
            placeholder="0"
            required
          />
        </div>
      </div>

      <div>
        <Label htmlFor="notes">Notes</Label>
        <Input id="notes" {...register('notes')} placeholder="Additional details" />
      </div>

      <Button type="submit" className="w-full">Document Part</Button>
    </form>
  );
};

export default PartForm;