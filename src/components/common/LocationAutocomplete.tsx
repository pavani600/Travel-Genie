import { useState, useRef, useEffect } from 'react';
import { 
  MapPin, 
  Plane, 
  Train, 
  Bus, 
  Building, 
  Globe, 
  X, 
  Loader2, 
  AlertCircle, 
  Check 
} from 'lucide-react';
import { searchWorldwideLocations } from '../../services/geocodingService';
import { LocationItem } from '../../types/travel';

interface LocationAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  label: string;
  iconColor?: string;
  required?: boolean;
}

export function LocationAutocomplete({
  value,
  onChange,
  placeholder,
  label,
  iconColor = 'text-emerald-800',
  required = true
}: LocationAutocompleteProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState(value);
  const [results, setResults] = useState<LocationItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  // Sync with incoming value prop if changed externally (e.g. swap button or popular route click)
  useEffect(() => {
    setQuery(value);
  }, [value]);

  // Dynamic geocoding search with debounce
  useEffect(() => {
    if (!isOpen) return;

    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    const controller = new AbortController();
    abortControllerRef.current = controller;

    setIsLoading(true);
    setSearchError(null);

    const timer = setTimeout(async () => {
      try {
        const { results: matchedLocations, error } = await searchWorldwideLocations(
          query,
          8,
          controller.signal
        );
        if (!controller.signal.aborted) {
          setResults(matchedLocations);
          setSearchError(error || null);
          setIsLoading(false);
        }
      } catch {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    }, 200);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [query, isOpen]);

  // Click outside to close
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (item: LocationItem) => {
    // If it's a specific station or airport, keep the full name; if it's a city or country, use clear place name
    const selectedText = item.type === 'station' || item.type === 'airport' || item.type === 'bus_terminal'
      ? item.name
      : item.name.includes(',') 
        ? item.name 
        : item.country && item.country !== 'India' 
          ? `${item.name}, ${item.country}` 
          : item.name;

    setQuery(selectedText);
    onChange(selectedText);
    setIsOpen(false);
  };

  const handleUseCustomInput = () => {
    if (!query.trim()) return;
    onChange(query.trim());
    setIsOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVal = e.target.value;
    setQuery(newVal);
    onChange(newVal);
    setIsOpen(true);
  };

  const getTypeIcon = (type: LocationItem['type']) => {
    switch (type) {
      case 'airport':
        return <Plane className="w-3.5 h-3.5 text-sky-600 shrink-0" />;
      case 'station':
        return <Train className="w-3.5 h-3.5 text-emerald-700 shrink-0" />;
      case 'bus_terminal':
        return <Bus className="w-3.5 h-3.5 text-orange-600 shrink-0" />;
      case 'country':
        return <Globe className="w-3.5 h-3.5 text-indigo-600 shrink-0" />;
      default:
        return <Building className="w-3.5 h-3.5 text-stone-500 shrink-0" />;
    }
  };

  return (
    <div className="relative" ref={containerRef}>
      <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-500 mb-0.5">
        {label}
      </label>
      <div className="flex items-center gap-2">
        <MapPin className={`w-4 h-4 ${iconColor} shrink-0`} />
        <input
          type="text"
          required={required}
          value={query}
          onChange={handleInputChange}
          onFocus={() => setIsOpen(true)}
          placeholder={placeholder}
          className="w-full bg-transparent text-sm font-bold text-stone-900 placeholder:text-stone-400 focus:outline-none"
        />
        
        {/* Loading Spinner */}
        {isLoading && (
          <Loader2 className="w-3.5 h-3.5 text-emerald-700 animate-spin shrink-0" />
        )}

        {/* Clear input button */}
        {query && !isLoading && (
          <button
            type="button"
            onClick={() => {
              setQuery('');
              onChange('');
              setIsOpen(true);
            }}
            className="text-stone-300 hover:text-stone-600 p-0.5 transition-colors"
            title="Clear"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Autocomplete Dropdown */}
      {isOpen && (
        <div className="absolute left-0 right-0 top-full mt-2 bg-white rounded-xl shadow-2xl border border-stone-200 z-50 overflow-hidden py-1 max-h-72 overflow-y-auto min-w-[280px]">
          
          {/* Header */}
          <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-stone-400 bg-stone-50 border-b border-stone-100 flex justify-between items-center">
            <span>{query.trim() ? 'Worldwide Locations' : 'Popular Transit Hubs'}</span>
            <span className="text-[9px] text-emerald-800 font-semibold lowercase">live geocoder</span>
          </div>

          {/* Loading status bar */}
          {isLoading && results.length === 0 && (
            <div className="px-3 py-4 text-center text-xs text-stone-500 flex items-center justify-center gap-2">
              <Loader2 className="w-4 h-4 text-emerald-700 animate-spin" />
              <span>Searching worldwide places & transit hubs...</span>
            </div>
          )}

          {/* Location results */}
          {results.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => handleSelect(item)}
              className="w-full text-left px-3 py-2 hover:bg-emerald-50/60 transition-colors flex items-center justify-between gap-2 border-b border-stone-50 last:border-0 group"
            >
              <div className="flex items-center gap-2.5 truncate">
                <div className="w-6 h-6 rounded-lg bg-stone-100 group-hover:bg-emerald-100/70 flex items-center justify-center shrink-0 transition-colors">
                  {getTypeIcon(item.type)}
                </div>
                <div className="truncate">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-stone-900 truncate">{item.name}</span>
                    <span className="text-[10px] font-mono font-semibold text-emerald-800 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200 shrink-0">
                      {item.code}
                    </span>
                  </div>
                  <span className="text-[10px] text-stone-500 block truncate">
                    {[item.state, item.country].filter(Boolean).join(', ')}
                    {item.isInternational && (
                      <span className="ml-1 text-[9px] font-semibold text-sky-700 bg-sky-50 px-1 py-0.2 rounded border border-sky-200">
                        International
                      </span>
                    )}
                  </span>
                </div>
              </div>
              <span className="text-[9px] font-semibold text-stone-400 group-hover:text-emerald-800 uppercase tracking-wider shrink-0 transition-colors">
                {item.type.replace('_', ' ')}
              </span>
            </button>
          ))}

          {/* When no locations could be resolved for the query */}
          {!isLoading && searchError && (
            <div className="p-3 text-left">
              <div className="flex items-start gap-2 text-amber-700 bg-amber-50 p-2.5 rounded-lg border border-amber-200 text-xs">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-amber-600" />
                <div>
                  <p className="font-semibold text-amber-900">Location not recognized</p>
                  <p className="text-[11px] text-amber-800 mt-0.5 leading-snug">
                    {searchError}
                  </p>
                </div>
              </div>
              <div className="mt-2 flex justify-end">
                <button
                  type="button"
                  onClick={handleUseCustomInput}
                  className="text-xs font-semibold text-emerald-800 hover:text-emerald-950 hover:underline flex items-center gap-1"
                >
                  <Check className="w-3 h-3" />
                  <span>Use &quot;{query}&quot; anyway</span>
                </button>
              </div>
            </div>
          )}

          {/* Quick guidance footer */}
          <div className="px-3 py-1.5 bg-stone-50 border-t border-stone-100 text-[10px] text-stone-400 flex items-center justify-between">
            <span>Type any city, station, town, or country</span>
            <span>Worldwide search</span>
          </div>
        </div>
      )}
    </div>
  );
}
