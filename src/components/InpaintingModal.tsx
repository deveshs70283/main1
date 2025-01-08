import React, { useState, useRef, useEffect } from 'react';
import { Stage, Layer, Rect, Image as KonvaImage } from 'react-konva';
import { X, Wand2, Loader2 } from 'lucide-react';
import { loadImageWithRetry } from '../utils/image';
import { storage } from '../lib/firebase';
import { ref, uploadString, getDownloadURL } from 'firebase/storage';
import { ImageComparison } from './ImageComparison';

interface InpaintingModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  onSuccess: (newImageUrl: string) => void;
}

export function InpaintingModal({ isOpen, onClose, imageUrl, onSuccess }: InpaintingModalProps) {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [selection, setSelection] = useState({ x: 0, y: 0, width: 0, height: 0 });
  const [isDrawing, setIsDrawing] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [resultImage, setResultImage] = useState<string | null>(null);
  
  const stageRef = useRef<any>(null);

  useEffect(() => {
    if (!isOpen || !imageUrl) return;

    const loadImage = async () => {
      try {
        const img = await loadImageWithRetry(imageUrl);
        
        const maxWidth = Math.min(800, window.innerWidth * 0.8);
        const maxHeight = Math.min(600, window.innerHeight * 0.6);
        
        let width = img.width;
        let height = img.height;
        
        const aspectRatio = width / height;
        
        if (width > maxWidth) {
          width = maxWidth;
          height = width / aspectRatio;
        }
        
        if (height > maxHeight) {
          height = maxHeight;
          width = height * aspectRatio;
        }
        
        setDimensions({ width, height });
        setImage(img);
        setError('');
      } catch (err) {
        console.error('Failed to load image:', imageUrl);
        setError('Failed to load image. Please try again.');
      }
    };

    loadImage();
  }, [imageUrl, isOpen]);

  const handleMouseDown = (e: any) => {
    const pos = e.target.getStage().getPointerPosition();
    setSelection({
      x: pos.x,
      y: pos.y,
      width: 0,
      height: 0
    });
    setIsDrawing(true);
  };

  const handleMouseMove = (e: any) => {
    if (!isDrawing) return;

    const pos = e.target.getStage().getPointerPosition();
    setSelection(prev => ({
      ...prev,
      width: pos.x - prev.x,
      height: pos.y - prev.y
    }));
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
    
    setSelection(prev => ({
      x: prev.width < 0 ? prev.x + prev.width : prev.x,
      y: prev.height < 0 ? prev.y + prev.height : prev.y,
      width: Math.abs(prev.width),
      height: Math.abs(prev.height)
    }));
  };

  const generateMask = async () => {
    if (!stageRef.current || !dimensions.width || !dimensions.height) return null;

    const canvas = document.createElement('canvas');
    canvas.width = dimensions.width;
    canvas.height = dimensions.height;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = 'white';
    ctx.fillRect(
      selection.x,
      selection.y,
      selection.width,
      selection.height
    );

    // Convert canvas to base64
    const maskDataUrl = canvas.toDataURL('image/png');
    
    // Upload mask to Firebase Storage
    const maskRef = ref(storage, `masks/${Date.now()}.png`);
    await uploadString(maskRef, maskDataUrl, 'data_url');
    return getDownloadURL(maskRef);
  };

  const handleSubmit = async () => {
    if (!prompt.trim()) {
      setError('Please enter a prompt');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const maskUrl = await generateMask();
      if (!maskUrl) {
        throw new Error('Failed to generate mask');
      }

      const response = await fetch('https://hook.eu2.make.com/rpm01b3uzj6q47ceakryfc9gg391jrn2', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          image: imageUrl,
          mask: maskUrl,
          prompt: prompt.trim()
        }),
      });

      if (!response.ok) {
        throw new Error('Inpainting failed');
      }

      const result = await response.json();
      setResultImage(result.output_url);
      onSuccess(result.output_url);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to process image');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-zinc-900 rounded-xl w-full max-w-3xl p-6 relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-zinc-400 hover:text-white"
        >
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-xl font-bold text-white mb-4">Add or Remove Object</h2>
        
        <div className="space-y-4">
          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400">
              {error}
            </div>
          )}

          <div className="relative bg-zinc-800 rounded-lg overflow-hidden flex justify-center">
            {resultImage ? (
              <ImageComparison beforeImage={imageUrl} afterImage={resultImage} />
            ) : (
              image && dimensions.width > 0 && dimensions.height > 0 ? (
                <Stage
                  ref={stageRef}
                  width={dimensions.width}
                  height={dimensions.height}
                  onMouseDown={handleMouseDown}
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUp}
                  className="touch-none"
                >
                  <Layer>
                    <KonvaImage
                      image={image}
                      width={dimensions.width}
                      height={dimensions.height}
                    />
                    <Rect
                      x={selection.x}
                      y={selection.y}
                      width={selection.width}
                      height={selection.height}
                      fill="rgba(255, 255, 255, 0.3)"
                      stroke="white"
                    />
                  </Layer>
                </Stage>
              ) : (
                <div className="flex items-center justify-center h-[400px] text-zinc-500">
                  Loading image...
                </div>
              )
            )}
          </div>

          <div className="space-y-2">
            <label className="block text-sm text-zinc-400">
              Describe what to add or remove
            </label>
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="E.g., Remove background, Add a tree"
              className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading || !prompt.trim()}
            className="w-full flex items-center justify-center gap-2 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Processing...</span>
              </>
            ) : (
              <>
                <Wand2 className="w-4 h-4" />
                <span>Apply Changes</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}