import { useState } from 'react';
import { Compass } from 'lucide-react';

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  className?: string;
  aspectRatio?: 'video' | 'square' | 'portrait' | 'wide' | 'auto';
  fallbackTitle?: string;
  category?: string;
}

export function ImageWithFallback({
  src,
  alt,
  className = '',
  aspectRatio = 'auto',
  fallbackTitle,
  category = 'Travel'
}: ImageWithFallbackProps) {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  if (hasError || !src) {
    return (
      <div
        className={`relative overflow-hidden flex flex-col items-center justify-center bg-gradient-to-br from-emerald-900 via-stone-900 to-stone-950 text-white p-6 text-center select-none ${className}`}
        role="img"
        aria-label={alt}
      >
        {/* Subtle patterned overlay */}
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
        
        <div className="relative z-10 flex flex-col items-center gap-2 max-w-xs">
          <div className="w-10 h-10 rounded-xl bg-emerald-800/80 border border-emerald-600/40 flex items-center justify-center shadow-inner">
            <Compass className="w-5 h-5 text-emerald-300 animate-pulse" />
          </div>
          <span className="text-[11px] font-semibold uppercase tracking-wider text-emerald-400/90">{category}</span>
          <p className="text-sm font-medium text-stone-200 line-clamp-2">{fallbackTitle || alt}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden bg-stone-100 ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 bg-stone-200 animate-pulse flex items-center justify-center text-stone-400">
          <Compass className="w-6 h-6 animate-spin text-stone-400" />
        </div>
      )}
      <img
        src={src}
        alt={alt}
        referrerPolicy="no-referrer"
        onLoad={() => setIsLoading(false)}
        onError={() => setHasError(true)}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
      />
    </div>
  );
}
