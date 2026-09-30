import { useState, useMemo, useEffect } from 'react';
import { 
  Train, 
  Bus, 
  Plane, 
  Clock, 
  Star, 
  SlidersHorizontal, 
  Info, 
  Calendar, 
  Users, 
  ArrowRight, 
  ArrowLeft, 
  Filter, 
  AlertCircle
} from 'lucide-react';
import { TransportOption, SearchParams, TransportType } from '../types/travel';
import { searchTravelOptions } from '../services/travelEngine';

interface TravelResultsPageProps {
  searchParams: SearchParams;
  selectedTransportId?: string;
  selectedClassId?: string;
  onModifySearch: () => void;
  onViewDetails: (option: TransportOption) => void;
  onBookNow: (option: TransportOption, classId?: string) => void;
  onGoBack?: () => void;
  isEditingFromReview?: boolean;
  onReturnToReview?: () => void;
}

export function TravelResultsPage({
  searchParams,
  selectedTransportId,
  selectedClassId,
  onModifySearch,
  onViewDetails,
  onBookNow,
  onGoBack,
  isEditingFromReview = false,
  onReturnToReview
}: TravelResultsPageProps) {
  // Query dynamic search options for the exact user origin & destination
  const allTransports = useMemo(() => {
    return searchTravelOptions(searchParams);
  }, [searchParams]);

  // Compute dynamic stats
  const cheapestPrice = useMemo(() => {
    if (allTransports.length === 0) return 0;
    return Math.min(...allTransports.map(t => t.pricePerPassenger));
  }, [allTransports]);

  const fastestDuration = useMemo(() => {
    if (allTransports.length === 0) return 'N/A';
    const sorted = [...allTransports].sort((a, b) => a.durationMinutes - b.durationMinutes);
    return sorted[0].duration;
  }, [allTransports]);

  const counts = useMemo(() => {
    return {
      train: allTransports.filter(t => t.transportType === 'train').length,
      bus: allTransports.filter(t => t.transportType === 'bus').length,
      flight: allTransports.filter(t => t.transportType === 'flight').length
    };
  }, [allTransports]);

  // Filter states
  const [selectedTypes, setSelectedTypes] = useState<Record<TransportType, boolean>>({
    train: true,
    bus: true,
    flight: true
  });

  const maxPriceInResults = useMemo(() => {
    if (allTransports.length === 0) return 10000;
    return Math.max(...allTransports.map(t => t.pricePerPassenger));
  }, [allTransports]);

  const [maxBudget, setMaxBudget] = useState<number>(() => Math.max(15000, maxPriceInResults));

  // Automatically adjust budget slider when route changes (e.g. international flights)
  useEffect(() => {
    if (maxPriceInResults > maxBudget) {
      setMaxBudget(Math.ceil(maxPriceInResults * 1.15));
    }
  }, [maxPriceInResults, maxBudget]);

  const [minRating, setMinRating] = useState<number>(0);
  const [acFilter, setAcFilter] = useState<'all' | 'ac' | 'non-ac'>('all');
  const [timeFilter, setTimeFilter] = useState<'all' | 'morning' | 'afternoon' | 'night'>('all');
  const [maxDurationHours, setMaxDurationHours] = useState<number>(36);

  // Sorting state
  const [sortBy, setSortBy] = useState<'cheapest' | 'fastest' | 'departure' | 'rating'>('cheapest');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Active class selection map per transport card (transportId -> classId)
  const [cardClassMap, setCardClassMap] = useState<Record<string, string>>(() => {
    const map: Record<string, string> = {};
    if (selectedTransportId && selectedClassId) {
      map[selectedTransportId] = selectedClassId;
    }
    return map;
  });

  // Filter & sort logic applied to dynamic results
  const filteredAndSortedTransports = useMemo(() => {
    return allTransports.filter((item) => {
      if (!selectedTypes[item.transportType]) return false;
      if (item.pricePerPassenger > maxBudget) return false;
      if (minRating > 0 && item.rating < minRating) return false;
      if (acFilter === 'ac' && !item.isAc) return false;
      if (acFilter === 'non-ac' && item.isAc) return false;

      const durationHours = item.durationMinutes / 60;
      if (durationHours > maxDurationHours) return false;

      if (timeFilter !== 'all') {
        const hour = parseInt(item.departureTime.split(':')[0], 10);
        if (timeFilter === 'morning' && (hour < 5 || hour >= 12)) return false;
        if (timeFilter === 'afternoon' && (hour < 12 || hour >= 18)) return false;
        if (timeFilter === 'night' && (hour >= 5 && hour < 18)) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'cheapest') return a.pricePerPassenger - b.pricePerPassenger;
      if (sortBy === 'fastest') return a.durationMinutes - b.durationMinutes;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'departure') return a.departureTime.localeCompare(b.departureTime);
      return 0;
    });
  }, [allTransports, selectedTypes, maxBudget, minRating, acFilter, timeFilter, maxDurationHours, sortBy]);

  const toggleType = (type: TransportType) => {
    setSelectedTypes(prev => ({ ...prev, [type]: !prev[type] }));
  };

  const getTransportIcon = (type: TransportType) => {
    switch (type) {
      case 'train': return <Train className="w-4 h-4 text-emerald-700" />;
      case 'bus': return <Bus className="w-4 h-4 text-orange-600" />;
      case 'flight': return <Plane className="w-4 h-4 text-sky-700" />;
    }
  };

  const handleSelectClass = (transportId: string, classId: string) => {
    setCardClassMap(prev => ({ ...prev, [transportId]: classId }));
  };

  const calculateCardPrice = (transport: TransportOption) => {
    const classId = cardClassMap[transport.id];
    let multiplier = 1.0;
    if (classId && transport.availableClasses) {
      const cls = transport.availableClasses.find(c => c.id === classId);
      if (cls) multiplier = cls.priceMultiplier;
    }
    const perPax = Math.round(transport.pricePerPassenger * multiplier);
    return {
      perPax,
      total: perPax * searchParams.passengers
    };
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] pb-20">
      
      {/* Top Search Context Bar with Visible Back Button */}
      <div className="bg-white border-b border-stone-200/80 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4">
          
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs text-stone-700">
            {/* Back Button */}
            <button
              type="button"
              onClick={onGoBack || onModifySearch}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-stone-300 hover:border-emerald-800 text-stone-700 hover:text-emerald-950 font-bold text-xs bg-stone-50 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Search</span>
            </button>

            <div className="flex items-center gap-1.5 font-bold text-stone-900 text-sm">
              <span className="text-stone-900">{searchParams.fromCity}</span>
              <ArrowRight className="w-3.5 h-3.5 text-stone-400" />
              <span className="text-emerald-900">{searchParams.toCity}</span>
            </div>
            
            <div className="flex items-center gap-1 text-stone-500">
              <Calendar className="w-3.5 h-3.5" />
              <span>{searchParams.departureDate || 'Selected Date'}</span>
            </div>

            <div className="flex items-center gap-1 text-stone-500">
              <Users className="w-3.5 h-3.5" />
              <span>{searchParams.passengers} {searchParams.passengers > 1 ? 'Travelers' : 'Traveler'}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isEditingFromReview && onReturnToReview && (
              <button
                type="button"
                onClick={onReturnToReview}
                className="px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-stone-950 font-bold text-xs shadow-xs transition-colors"
              >
                Return to Review (Step 5)
              </button>
            )}

            <button
              onClick={onModifySearch}
              className="px-3.5 py-1.5 rounded-xl border border-stone-300 hover:border-emerald-800 text-xs font-semibold text-stone-700 hover:text-emerald-900 bg-white transition-colors"
            >
              Modify Search
            </button>
            <button
              onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
              className="lg:hidden px-3.5 py-1.5 rounded-xl bg-emerald-900 text-white text-xs font-semibold flex items-center gap-1.5"
            >
              <Filter className="w-3.5 h-3.5" />
              <span>Filters</span>
            </button>
          </div>
        </div>
      </div>

      {/* Editing From Review Notice Banner */}
      {isEditingFromReview && (
        <div className="bg-amber-50 border-b border-amber-200 py-2.5 px-4 text-center">
          <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 text-xs text-amber-950 font-medium">
            <Info className="w-4 h-4 text-amber-700 shrink-0" />
            <span>
              <strong>Modification Mode:</strong> Choose a new transport or class below. Your hotel, transit, and passenger details will be preserved!
            </span>
          </div>
        </div>
      )}

      {/* Unverified / Demo API Label Banner */}
      <div className="bg-stone-100/80 border-b border-stone-200/70 py-2 px-4 text-center">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 text-xs text-stone-600 font-medium">
          <Info className="w-3.5 h-3.5 text-stone-500 shrink-0" />
          <span>Demo Data Prototype · Algorithmic multimodal routes for <strong>{searchParams.fromCity}</strong> to <strong>{searchParams.toCity}</strong>. Live availability is not currently connected for this transport provider.</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* Page Title & Fast Stat Badges */}
        <div className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
              Travel options from {searchParams.fromCity} to {searchParams.toCity}
            </h1>
            <p className="text-xs sm:text-sm text-stone-600 mt-1">
              Step 2 of 8: Choose your main transport. You can modify any unconfirmed selection before payment.
            </p>
          </div>

          <div className="flex items-center gap-3 text-xs">
            {cheapestPrice > 0 && (
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl px-3 py-1.5">
                <span className="text-emerald-800 block text-[10px] font-medium">Cheapest Fare</span>
                <span className="font-extrabold text-emerald-950">₹{cheapestPrice.toLocaleString()}</span>
              </div>
            )}
            {fastestDuration !== 'N/A' && (
              <div className="bg-sky-50 border border-sky-200 rounded-xl px-3 py-1.5">
                <span className="text-sky-800 block text-[10px] font-medium">Fastest Route</span>
                <span className="font-extrabold text-sky-950">{fastestDuration}</span>
              </div>
            )}
          </div>
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT FILTERS SIDEBAR */}
          <aside className={`lg:col-span-3 bg-white rounded-2xl border border-stone-200/90 p-5 shadow-xs space-y-6 ${
            mobileFilterOpen ? 'block' : 'hidden lg:block'
          }`}>
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <div className="flex items-center gap-2 font-bold text-stone-900 text-sm">
                <SlidersHorizontal className="w-4 h-4 text-emerald-800" />
                <span>Filter Results</span>
              </div>
              <button
                type="button"
                onClick={() => {
                  setSelectedTypes({ train: true, bus: true, flight: true });
                  setMaxBudget(10000);
                  setMinRating(0);
                  setAcFilter('all');
                  setTimeFilter('all');
                  setMaxDurationHours(24);
                }}
                className="text-[11px] font-semibold text-emerald-800 hover:text-emerald-950"
              >
                Reset All
              </button>
            </div>

            {/* Transport Mode */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-2.5">
                Transport Mode
              </label>
              <div className="space-y-2 text-xs">
                <label className="flex items-center justify-between text-stone-700 cursor-pointer p-1.5 rounded-lg hover:bg-stone-50">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={selectedTypes.train}
                      onChange={() => toggleType('train')}
                      className="rounded text-emerald-800 focus:ring-emerald-800 h-4 w-4"
                    />
                    <Train className="w-3.5 h-3.5 text-emerald-800" />
                    <span>Express Trains</span>
                  </div>
                  <span className="text-stone-400 text-[11px]">{counts.train} options</span>
                </label>

                <label className="flex items-center justify-between text-stone-700 cursor-pointer p-1.5 rounded-lg hover:bg-stone-50">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={selectedTypes.bus}
                      onChange={() => toggleType('bus')}
                      className="rounded text-emerald-800 focus:ring-emerald-800 h-4 w-4"
                    />
                    <Bus className="w-3.5 h-3.5 text-orange-600" />
                    <span>Buses &amp; Sleepers</span>
                  </div>
                  <span className="text-stone-400 text-[11px]">{counts.bus} options</span>
                </label>

                {counts.flight > 0 && (
                  <label className="flex items-center justify-between text-stone-700 cursor-pointer p-1.5 rounded-lg hover:bg-stone-50">
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={selectedTypes.flight}
                        onChange={() => toggleType('flight')}
                        className="rounded text-emerald-800 focus:ring-emerald-800 h-4 w-4"
                      />
                      <Plane className="w-3.5 h-3.5 text-sky-700" />
                      <span>Direct Flights</span>
                    </div>
                    <span className="text-stone-400 text-[11px]">{counts.flight} options</span>
                  </label>
                )}
              </div>
            </div>

            {/* Max Budget Slider */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold uppercase tracking-wider text-stone-700">
                  Max Budget
                </label>
                <span className="text-xs font-extrabold text-emerald-900">
                  Up to ₹{maxBudget.toLocaleString()}
                </span>
              </div>
              <input
                type="range"
                min={Math.max(100, cheapestPrice > 0 ? Math.floor(cheapestPrice * 0.8) : 200)}
                max={10000}
                step={100}
                value={maxBudget}
                onChange={(e) => setMaxBudget(Number(e.target.value))}
                className="w-full accent-emerald-800 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-stone-400 mt-1">
                <span>Min</span>
                <span>₹5,000</span>
                <span>₹10,000</span>
              </div>
            </div>

            {/* AC / Non-AC */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-2">
                Air Conditioning
              </label>
              <div className="grid grid-cols-3 gap-1 bg-stone-100 p-1 rounded-xl text-xs">
                <button
                  type="button"
                  onClick={() => setAcFilter('all')}
                  className={`py-1.5 rounded-lg font-medium transition-colors ${
                    acFilter === 'all' ? 'bg-white shadow-xs text-stone-900 font-bold' : 'text-stone-600'
                  }`}
                >
                  All
                </button>
                <button
                  type="button"
                  onClick={() => setAcFilter('ac')}
                  className={`py-1.5 rounded-lg font-medium transition-colors ${
                    acFilter === 'ac' ? 'bg-white shadow-xs text-emerald-900 font-bold' : 'text-stone-600'
                  }`}
                >
                  AC
                </button>
                <button
                  type="button"
                  onClick={() => setAcFilter('non-ac')}
                  className={`py-1.5 rounded-lg font-medium transition-colors ${
                    acFilter === 'non-ac' ? 'bg-white shadow-xs text-stone-900 font-bold' : 'text-stone-600'
                  }`}
                >
                  Non-AC
                </button>
              </div>
            </div>

            {/* Departure Time */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-2">
                Departure Time
              </label>
              <div className="grid grid-cols-2 gap-1.5 text-xs">
                <button
                  type="button"
                  onClick={() => setTimeFilter('all')}
                  className={`p-2 rounded-lg border text-left transition-colors ${
                    timeFilter === 'all' ? 'border-emerald-800 bg-emerald-50/60 font-bold text-emerald-950' : 'border-stone-200 text-stone-600 hover:bg-stone-50'
                  }`}
                >
                  <span>Any Time</span>
                  <span className="block text-[10px] text-stone-400">All 24 hours</span>
                </button>
                <button
                  type="button"
                  onClick={() => setTimeFilter('morning')}
                  className={`p-2 rounded-lg border text-left transition-colors ${
                    timeFilter === 'morning' ? 'border-emerald-800 bg-emerald-50/60 font-bold text-emerald-950' : 'border-stone-200 text-stone-600 hover:bg-stone-50'
                  }`}
                >
                  <span>Morning</span>
                  <span className="block text-[10px] text-stone-400">05:00 - 12:00</span>
                </button>
                <button
                  type="button"
                  onClick={() => setTimeFilter('afternoon')}
                  className={`p-2 rounded-lg border text-left transition-colors ${
                    timeFilter === 'afternoon' ? 'border-emerald-800 bg-emerald-50/60 font-bold text-emerald-950' : 'border-stone-200 text-stone-600 hover:bg-stone-50'
                  }`}
                >
                  <span>Afternoon</span>
                  <span className="block text-[10px] text-stone-400">12:00 - 18:00</span>
                </button>
                <button
                  type="button"
                  onClick={() => setTimeFilter('night')}
                  className={`p-2 rounded-lg border text-left transition-colors ${
                    timeFilter === 'night' ? 'border-emerald-800 bg-emerald-50/60 font-bold text-emerald-950' : 'border-stone-200 text-stone-600 hover:bg-stone-50'
                  }`}
                >
                  <span>Night/Sleeper</span>
                  <span className="block text-[10px] text-stone-400">18:00 - 05:00</span>
                </button>
              </div>
            </div>
          </aside>

          {/* RIGHT RESULTS LIST */}
          <main className="lg:col-span-9 space-y-4">
            
            {/* Sorting Tabs Bar */}
            <div className="bg-white rounded-xl border border-stone-200/90 p-2.5 flex items-center justify-between shadow-xs flex-wrap gap-2">
              <span className="text-xs text-stone-500 font-medium px-2">Sort by:</span>
              <div className="flex items-center gap-1 text-xs overflow-x-auto">
                <button
                  type="button"
                  onClick={() => setSortBy('cheapest')}
                  className={`px-3 py-1.5 rounded-lg font-semibold transition-all whitespace-nowrap ${
                    sortBy === 'cheapest' ? 'bg-emerald-900 text-white shadow-xs' : 'text-stone-600 hover:bg-stone-100'
                  }`}
                >
                  Cheapest first
                </button>
                <button
                  type="button"
                  onClick={() => setSortBy('fastest')}
                  className={`px-3 py-1.5 rounded-lg font-semibold transition-all whitespace-nowrap ${
                    sortBy === 'fastest' ? 'bg-emerald-900 text-white shadow-xs' : 'text-stone-600 hover:bg-stone-100'
                  }`}
                >
                  Fastest first
                </button>
                <button
                  type="button"
                  onClick={() => setSortBy('departure')}
                  className={`px-3 py-1.5 rounded-lg font-semibold transition-all whitespace-nowrap ${
                    sortBy === 'departure' ? 'bg-emerald-900 text-white shadow-xs' : 'text-stone-600 hover:bg-stone-100'
                  }`}
                >
                  Departure time
                </button>
                <button
                  type="button"
                  onClick={() => setSortBy('rating')}
                  className={`px-3 py-1.5 rounded-lg font-semibold transition-all whitespace-nowrap ${
                    sortBy === 'rating' ? 'bg-emerald-900 text-white shadow-xs' : 'text-stone-600 hover:bg-stone-100'
                  }`}
                >
                  Highest rated
                </button>
              </div>
            </div>

            {/* Empty State */}
            {filteredAndSortedTransports.length === 0 && (
              <div className="bg-white rounded-2xl border border-stone-200 p-8 text-center space-y-3">
                <AlertCircle className="w-8 h-8 text-amber-600 mx-auto" />
                <h3 className="font-bold text-stone-900">No transport options match the active filters</h3>
                <p className="text-xs text-stone-500 max-w-md mx-auto">
                  Try adjusting your budget slider, departure time, or transport type filters to see all available services from {searchParams.fromCity} to {searchParams.toCity}.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedTypes({ train: true, bus: true, flight: true });
                    setMaxBudget(10000);
                    setMinRating(0);
                    setAcFilter('all');
                    setTimeFilter('all');
                  }}
                  className="px-4 py-2 bg-emerald-900 text-white text-xs font-bold rounded-xl"
                >
                  Reset Filters
                </button>
              </div>
            )}

            {/* Travel Cards */}
            {filteredAndSortedTransports.map((transport) => {
              const isSelected = selectedTransportId === transport.id;
              const cardPrice = calculateCardPrice(transport);
              const activeClassId = cardClassMap[transport.id] || transport.availableClasses?.[0]?.id;

              return (
                <div
                  key={transport.id}
                  className={`bg-white rounded-2xl border p-5 shadow-xs transition-all relative ${
                    isSelected 
                      ? 'border-emerald-800 ring-2 ring-emerald-800/20 shadow-md' 
                      : 'border-stone-200/80 hover:border-emerald-600/40 hover:shadow-md'
                  }`}
                >
                  {/* Top row */}
                  <div className="flex items-center justify-between pb-3.5 border-b border-stone-100 flex-wrap gap-2">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-stone-100 flex items-center justify-center">
                        {getTransportIcon(transport.transportType)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-stone-900 text-sm">{transport.operatorName}</h3>
                          <span className="text-[11px] text-stone-400 font-medium">#{transport.operatorCode}</span>
                          {isSelected && (
                            <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                              Currently Selected
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-stone-500">{transport.seatingType}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {transport.tag && (
                        <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200/80 px-2.5 py-0.5 rounded-md">
                          {transport.tag}
                        </span>
                      )}
                      <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-md ${
                        transport.seatsAvailable < 10 
                          ? 'bg-rose-50 text-rose-700 border border-rose-200' 
                          : 'bg-stone-100 text-stone-700'
                      }`}>
                        {transport.seatsAvailable} seats available
                      </span>
                    </div>
                  </div>

                  {/* Middle row: Timeline & Fare */}
                  <div className="py-5 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                    
                    <div className="md:col-span-7 grid grid-cols-3 items-center text-center">
                      <div className="text-left">
                        <span className="text-2xl font-black text-stone-900 tracking-tight">
                          {transport.departureTime}
                        </span>
                        <span className="block text-xs font-semibold text-stone-700 mt-0.5 truncate max-w-[150px]">
                          {transport.originCity}
                        </span>
                        <span className="block text-[11px] text-stone-400 truncate max-w-[150px]">
                          {transport.originTerminal.split('·')[0]}
                        </span>
                      </div>

                      <div className="flex flex-col items-center px-2">
                        <span className="text-xs font-semibold text-stone-600 mb-1 flex items-center gap-1">
                          <Clock className="w-3 h-3 text-stone-400" />
                          {transport.duration}
                        </span>
                        <div className="w-full flex items-center gap-1">
                          <div className="h-0.5 w-full bg-stone-200 relative">
                            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-emerald-800" />
                          </div>
                        </div>
                        <span className="text-[10px] text-emerald-700 mt-1 font-medium">Direct Route</span>
                      </div>

                      <div className="text-right">
                        <span className="text-2xl font-black text-stone-900 tracking-tight">
                          {transport.arrivalTime}
                        </span>
                        <span className="block text-xs font-semibold text-stone-700 mt-0.5 truncate max-w-[150px]">
                          {transport.destinationCity}
                        </span>
                        <span className="block text-[11px] text-stone-400 truncate max-w-[150px]">
                          {transport.destinationTerminal.split('·')[0]}
                        </span>
                      </div>
                    </div>

                    {/* Travel Class Selector (if available) */}
                    <div className="md:col-span-2 border-l border-stone-100 pl-4 space-y-1.5">
                      {transport.availableClasses && transport.availableClasses.length > 0 ? (
                        <div>
                          <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-500 mb-1">
                            Travel Class
                          </label>
                          <div className="space-y-1">
                            {transport.availableClasses.map((cls) => {
                              const isClassActive = (activeClassId || transport.availableClasses![0].id) === cls.id;
                              return (
                                <button
                                  key={cls.id}
                                  type="button"
                                  onClick={() => handleSelectClass(transport.id, cls.id)}
                                  className={`w-full text-left px-2 py-1 rounded text-[11px] font-medium transition-colors block truncate ${
                                    isClassActive
                                      ? 'bg-emerald-900 text-white font-bold'
                                      : 'bg-stone-50 text-stone-700 hover:bg-stone-100'
                                  }`}
                                >
                                  {cls.name.split('(')[0]}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      ) : (
                        <div className="text-[11px] text-stone-400">
                          <span>Standard Reserved Class</span>
                        </div>
                      )}
                    </div>

                    {/* Pricing & CTA */}
                    <div className="md:col-span-3 flex flex-col md:items-end justify-center border-t md:border-t-0 md:border-l border-stone-100 pt-3 md:pt-0 md:pl-4">
                      <div className="text-left md:text-right mb-2">
                        <div className="flex items-baseline md:justify-end gap-1">
                          <span className="text-xs text-stone-400">per person</span>
                          <span className="text-xl font-extrabold text-emerald-950">
                            ₹{cardPrice.perPax.toLocaleString()}
                          </span>
                        </div>
                        {searchParams.passengers > 1 && (
                          <span className="text-[11px] font-bold text-stone-500 block">
                            Total: ₹{cardPrice.total.toLocaleString()} ({searchParams.passengers} pax)
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-2 w-full justify-end">
                        <button
                          type="button"
                          onClick={() => onViewDetails(transport)}
                          className="px-3 py-2 rounded-xl border border-stone-300 hover:border-emerald-800 text-stone-700 hover:text-emerald-900 text-xs font-bold transition-colors whitespace-nowrap"
                        >
                          View Details
                        </button>
                        <button
                          type="button"
                          onClick={() => onBookNow(transport, activeClassId)}
                          className={`px-4 py-2 text-white text-xs font-bold rounded-xl shadow-xs transition-all active:scale-95 whitespace-nowrap ${
                            isSelected
                              ? 'bg-emerald-950 hover:bg-emerald-900'
                              : 'bg-emerald-900 hover:bg-emerald-800'
                          }`}
                        >
                          {isEditingFromReview 
                            ? 'Select & Return to Review' 
                            : isSelected ? 'Keep Selection' : 'Select Transport'}
                        </button>
                      </div>
                    </div>

                  </div>

                  {/* Bottom row: Ratings & Highlights */}
                  <div className="pt-2.5 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1 text-amber-500 font-bold">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span>{transport.rating}</span>
                      </div>
                      <span className="text-stone-300">·</span>
                      <span className="text-[11px]">{transport.reviewCount.toLocaleString()} verified ratings</span>
                    </div>

                    <div className="text-[11px] text-stone-400">
                      <span>Free cancellation available up to 24h</span>
                    </div>
                  </div>

                </div>
              );
            })}

          </main>
        </div>

      </div>
    </div>
  );
}
