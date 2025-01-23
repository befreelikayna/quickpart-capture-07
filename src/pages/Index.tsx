import React, { useState } from 'react';
import PhotoUpload from '@/components/PhotoUpload';
import PartForm, { PartFormData } from '@/components/PartForm';
import PartCard from '@/components/PartCard';

interface DocumentedPart {
  data: PartFormData;
  image: string;
}

const Index = () => {
  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const [documentedParts, setDocumentedParts] = useState<DocumentedPart[]>([]);

  const handlePhotoSelect = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setCurrentImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handlePartSubmit = (data: PartFormData) => {
    if (currentImage) {
      setDocumentedParts(prev => [{
        data,
        image: currentImage
      }, ...prev]);
      setCurrentImage(null);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-3xl font-bold mb-8 text-center">Part Documentation</h1>
      
      <div className="space-y-8">
        <div className="bg-card rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Document New Part</h2>
          <PhotoUpload onPhotoSelect={handlePhotoSelect} />
          <PartForm onSubmit={handlePartSubmit} />
        </div>

        {documentedParts.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Recent Parts</h2>
            <div className="grid gap-6 sm:grid-cols-2">
              {documentedParts.map((part, index) => (
                <PartCard
                  key={index}
                  part={part.data}
                  image={part.image}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;