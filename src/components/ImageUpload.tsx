import React from 'react';
import { Upload } from 'lucide-react';
import { ImagePreview } from './ImagePreview';

interface ImageUploadProps {
  onImageSelect: (file: File | null) => void;
}

export function ImageUpload({ onImageSelect }: ImageUploadProps) {
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setSelectedFile(file || null);
    onImageSelect(file || null);
  };

  const handleClear = () => {
    setSelectedFile(null);
    onImageSelect(null);
  };

  if (selectedFile) {
    return <ImagePreview file={selectedFile} onClear={handleClear} />;
  }

  return (
    <div className="w-full">
      <label
        htmlFor="image-upload"
        className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <Upload className="w-10 h-10 mb-3 text-gray-400" />
          <p className="mb-2 text-sm text-gray-500">
            <span className="font-semibold">Click to upload</span> or drag and drop
          </p>
          <p className="text-xs text-gray-500">PNG, JPG or WEBP (MAX. 5MB)</p>
        </div>
        <input
          id="image-upload"
          type="file"
          className="hidden"
          accept="image/*"
          onChange={handleFileChange}
        />
      </label>
    </div>
  );
}