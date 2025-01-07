import React from 'react';
import { X } from 'lucide-react';

interface ImagePreviewProps {
  file: File;
  onClear: () => void;
}

export function ImagePreview({ file, onClear }: ImagePreviewProps) {
  const imageUrl = React.useMemo(() => URL.createObjectURL(file), [file]);

  React.useEffect(() => {
    return () => {
      URL.revokeObjectURL(imageUrl);
    };
  }, [imageUrl]);

  return (
    <div className="relative">
      <img
        src={imageUrl}
        alt="Preview"
        className="w-full h-64 object-cover rounded-lg"
      />
      <button
        onClick={onClear}
        className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-md hover:bg-gray-100"
        aria-label="Remove image"
      >
        <X className="w-5 h-5 text-gray-600" />
      </button>
    </div>
  );
}