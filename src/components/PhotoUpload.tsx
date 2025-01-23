import React, { useState, useRef } from 'react';
import { Camera, Upload } from 'lucide-react';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';

interface PhotoUploadProps {
  onPhotoSelect: (file: File) => void;
}

const PhotoUpload = ({ onPhotoSelect }: PhotoUploadProps) => {
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onPhotoSelect(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCameraClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="w-full">
      <input
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        onChange={handleFileSelect}
        ref={fileInputRef}
      />
      
      {preview ? (
        <div className="relative w-full aspect-video mb-4">
          <img
            src={preview}
            alt="Part preview"
            className="w-full h-full object-cover rounded-lg"
          />
          <Button
            variant="secondary"
            className="absolute bottom-2 right-2"
            onClick={handleCameraClick}
          >
            Retake
          </Button>
        </div>
      ) : (
        <div
          className={cn(
            "w-full aspect-video mb-4 border-2 border-dashed rounded-lg",
            "flex flex-col items-center justify-center cursor-pointer",
            "bg-muted hover:bg-muted/80 transition-colors"
          )}
          onClick={handleCameraClick}
        >
          <Camera className="h-12 w-12 mb-2 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">
            Click to take a photo or upload
          </p>
        </div>
      )}
    </div>
  );
};

export default PhotoUpload;