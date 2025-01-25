import React, { useState, useRef } from 'react';
import { Camera, Upload } from 'lucide-react';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';

interface PhotoUploadProps {
  onPhotoSelect: (file: File) => void;
}

const PhotoUpload = ({ onPhotoSelect }: PhotoUploadProps) => {
  const [preview, setPreview] = useState<string | null>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
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
    if (cameraInputRef.current) {
      cameraInputRef.current.click();
    }
  };

  const handleUploadClick = () => {
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
        ref={cameraInputRef}
      />
      <input
        type="file"
        accept="image/*"
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
          <div className="absolute bottom-2 right-2 flex gap-2">
            <Button
              variant="secondary"
              onClick={handleCameraClick}
              className="shadow-lg"
            >
              <Camera className="mr-2 h-4 w-4" />
              Retake
            </Button>
            <Button
              variant="secondary"
              onClick={handleUploadClick}
              className="shadow-lg"
            >
              <Upload className="mr-2 h-4 w-4" />
              Upload New
            </Button>
          </div>
        </div>
      ) : (
        <div className="w-full aspect-video mb-4 grid grid-cols-2 gap-4">
          <div
            className={cn(
              "col-span-1 border-2 border-dashed rounded-lg",
              "flex flex-col items-center justify-center cursor-pointer",
              "bg-muted hover:bg-muted/80 transition-colors"
            )}
            onClick={handleCameraClick}
          >
            <Camera className="h-12 w-12 mb-2 text-muted-foreground" />
            <p className="text-sm font-medium text-muted-foreground">
              Take a Photo
            </p>
          </div>
          <div
            className={cn(
              "col-span-1 border-2 border-dashed rounded-lg",
              "flex flex-col items-center justify-center cursor-pointer",
              "bg-muted hover:bg-muted/80 transition-colors"
            )}
            onClick={handleUploadClick}
          >
            <Upload className="h-12 w-12 mb-2 text-muted-foreground" />
            <p className="text-sm font-medium text-muted-foreground">
              Upload Image
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PhotoUpload;