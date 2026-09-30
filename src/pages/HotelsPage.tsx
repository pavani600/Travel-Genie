import { useState, useMemo, useEffect } from 'react';
import { 
  Building, 
  MapPin, 
  Star, 
  Search, 
  Calendar, 
  Users, 
  Check, 
  Sparkles, 
  ArrowRight, 
  ArrowLeft, 
  Info, 
  X, 
  Plus, 
  Minus, 
  Trash2
} from 'lucide-react';
import { Hotel, HotelBookingConfig } from '../types/travel';
import { getHotelsForDestination } from '../services/hotelsEngine';
import { ImageWithFallback } from '../components/common/ImageWithFallback';

interface HotelsPageProps {
  selectedCity?: string;
  savedConfig?: HotelBookingConfig | null;
  onSaveHotelConfig: (config: HotelBookingConfig) => void;
  onProceedToReview: () => void;
  onGoBack: () => void;
  isEditingFromReview?: boolean;
  onReturnToReview?: () => void;
}

export function HotelsPage({
  selectedCity = 'Visakhapatnam',
  savedConfig,
  onSaveHotelConfig,
  onProceedToReview,
  onGoBack,
  isEditingFromReview = false,
  onReturnToReview
}: HotelsPageProps) {
  const [destination, setDestination] = useState(selectedCity);

  // Sync destination if selectedCity changes
  useEffect(() => {
    if (selectedCity && selectedCity !== destination) {
      setDestination(selectedCity);
    }
  }, [selectedCity]);

  // Retrieve destination-specific hotels dynamically
  const destinationHotels = useMemo(() => {
    return getHotelsForDestination(destination || selectedCity);
  }, [destination, selectedCity]);

  // Determine initial hotel based on city match
  const initialHotel = useMemo(() => {
    if (savedConfig?.hotel && savedConfig.hotel.city.toLowerCase() === (destination || selectedCity).toLowerCase()) {
      return savedConfig.hotel;
    }
    return destinationHotels[0] || null;
  }, [savedConfig?.hotel, destination, selectedCity, destinationHotels]);

  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(
    savedConfig?.isIncluded === false ? null : initialHotel
  );

  // Update selectedHotel when destination changes if current hotel belongs to another city
  useEffect(() => {
    if (selectedHotel && destinationHotels.length > 0) {
      const match = destinationHotels.find(h => h.id === selectedHotel.id);
      if (!match) {
        setSelectedHotel(destinationHotels[0] || null);
      }
    } else if (!selectedHotel && savedConfig?.isIncluded !== false && destinationHotels.length > 0) {
      setSelectedHotel(destinationHotels[0] || null);
    }
  }, [destinationHotels]);

  const [isIncluded, setIsIncluded] = useState<boolean>(savedConfig?.isIncluded ?? true);
  const [checkIn, setCheckIn] = useState(savedConfig?.checkInDate || '2026-10-14');
  const [checkOut, setCheckOut] = useState(savedConfig?.checkOutDate || '2026-10-16');
  const [roomCount, setRoomCount] = useState<number>(savedConfig?.roomCount || 1);
  const [guestCount, setGuestCount] = useState<number>(savedConfig?.guestCount || 2);
  const [maxBudget, setMaxBudget] = useState(10000);
  const [minRating, setMinRating] = useState(0);
  const [detailModalHotel, setDetailModalHotel] = useState<Hotel | null>(null);

  // Compute nights
  const nights = useMemo(() => {
    try {
      const d1 = new Date(checkIn);
      const d2 = new Date(checkOut);
      const diffTime = Math.abs(d2.getTime() - d1.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return isNaN(diffDays) || diffDays <= 0 ? 2 : diffDays;
    } catch {
      return 2;
    }
  }, [checkIn, checkOut]);

  const filteredHotels = useMemo(() => {
    return destinationHotels.filter((hotel) => {
      if (hotel.pricePerNight > maxBudget) return false;
      if (minRating > 0 && hotel.rating < minRating) return false;
      return true;
    });
  }, [destinationHotels, maxBudget, minRating]);

  const handleSelectHotelCard = (hotel: Hotel) => {
    setSelectedHotel(hotel);
    setIsIncluded(true);
  };

  const handleRemoveHotel = () => {
    setSelectedHotel(null);
    setIsIncluded(false);
  };

  const handleSaveAndProceed = () => {
    const config: HotelBookingConfig = {
      hotel: isIncluded ? selectedHotel : null,
      checkInDate: checkIn,
      checkOutDate: checkOut,
      nights,
      roomCount,
      guestCount,
      isIncluded: isIncluded && Boolean(selectedHotel)
    };
    onSaveHotelConfig(config);

    if (isEditingFromReview && onReturnToReview) {
      onReturnToReview();
    } else {
      onProceedToReview();
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] pb-24">
      
      {/* Context Step Bar */}
      <div className="bg-white border-b border-stone-200/80 py-4 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onGoBack}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-stone-300 hover:border-emerald-800 text-stone-700 hover:text-emerald-950 font-bold text-xs bg-stone-50 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Local Transit</span>
            </button>
            <span className="text-xs font-bold text-emerald-900 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
              Step 4: Accommodation in {destination}
            </span>
          </div>

          <div className="flex items-center gap-3">
            {isIncluded && selectedHotel && (
              <button
                type="button"
                onClick={handleRemoveHotel}
                className="text-xs text-rose-700 hover:text-rose-800 font-bold flex items-center gap-1 px-3 py-1.5 rounded-lg border border-rose-200 hover:bg-rose-50 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Remove Hotel from Trip</span>
              </button>
            )}

            {isEditingFromReview && onReturnToReview && (
              <button
                type="button"
                onClick={handleSaveAndProceed}
                className="px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-stone-950 font-bold text-xs shadow-xs transition-colors"
              >
                Save &amp; Return to Review (Step 5)
              </button>
            )}

            <button
              type="button"
              onClick={handleSaveAndProceed}
              className="px-4 py-2 bg-emerald-900 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center gap-1.5"
            >
              <span>{isEditingFromReview ? 'Save Hotel' : 'Proceed to Complete Review'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Unverified / Demo API Label Banner */}
      <div className="bg-stone-100/80 border-b border-stone-200/70 py-2 px-4 text-center">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 text-xs text-stone-600 font-medium">
          <Info className="w-3.5 h-3.5 text-stone-500 shrink-0" />
          <span>Demo Data Prototype · Hotel inventory for <strong>{destination}</strong> is simulated. Live GDS hotel connectivity is unverified.</span>
        </div>
      </div>

      {/* Hotel Search & Config Sub-Bar */}
      <div className="bg-stone-100/80 border-b border-stone-200/80 py-3.5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-4 text-xs">
          
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-xl border border-stone-200 shadow-xs">
              <MapPin className="w-3.5 h-3.5 text-orange-600 shrink-0" />
              <input
                type="text"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder="Destination city"
                className="font-bold text-stone-900 bg-transparent focus:outline-none w-36 text-xs"
              />
            </div>

            {/* Dates */}
            <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-xl border border-stone-200 shadow-xs">
              <Calendar className="w-3.5 h-3.5 text-stone-400" />
              <input
                type="date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                className="bg-transparent font-medium text-stone-800 focus:outline-none text-xs"
              />
              <span className="text-stone-300">→</span>
              <input
                type="date"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                className="bg-transparent font-medium text-stone-800 focus:outline-none text-xs"
              />
            </div>

            <span className="px-2 py-1 bg-stone-200/70 rounded-md font-bold text-stone-700">
              {nights} {nights > 1 ? 'Nights' : 'Night'}
            </span>

            {/* Room Count Stepper */}
            <div className="flex items-center gap-1.5 px-2.5 py-1 bg-white rounded-lg border border-stone-200">
              <span className="text-[11px] text-stone-500">Rooms:</span>
              <button
                type="button"
                onClick={() => setRoomCount(Math.max(1, roomCount - 1))}
                className="w-4 h-4 rounded bg-stone-100 flex items-center justify-center text-stone-700"
              >
                -
              </button>
              <span className="font-bold text-stone-900 px-1">{roomCount}</span>
              <button
                type="button"
                onClick={() => setRoomCount(Math.min(5, roomCount + 1))}
                className="w-4 h-4 rounded bg-stone-100 flex items-center justify-center text-stone-700"
              >
                +
              </button>
            </div>

            {/* Guest Count Stepper */}
            <div className="flex items-center gap-1.5 px-2.5 py-1 bg-white rounded-lg border border-stone-200">
              <Users className="w-3.5 h-3.5 text-stone-400" />
              <span className="text-[11px] text-stone-500">Guests:</span>
              <button
                type="button"
                onClick={() => setGuestCount(Math.max(1, guestCount - 1))}
                className="w-4 h-4 rounded bg-stone-100 flex items-center justify-center text-stone-700"
              >
                -
              </button>
              <span className="font-bold text-stone-900 px-1">{guestCount}</span>
              <button
                type="button"
                onClick={() => setGuestCount(Math.min(10, guestCount + 1))}
                className="w-4 h-4 rounded bg-stone-100 flex items-center justify-center text-stone-700"
              >
                +
              </button>
            </div>
          </div>

          {/* Current Selection Status */}
          <div className="text-right">
            {!isIncluded || !selectedHotel ? (
              <span className="font-bold text-amber-800 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200">
                No hotel selected (₹0 accommodation)
              </span>
            ) : (
              <span className="font-bold text-emerald-950">
                Selected: {selectedHotel.name.split(',')[0]} (₹{(selectedHotel.pricePerNight * nights * roomCount).toLocaleString()} total)
              </span>
            )}
          </div>

        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* Banner if hotel is removed */}
        {!isIncluded && (
          <div className="mb-6 p-4 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-between text-xs text-amber-950">
            <div className="flex items-center gap-2">
              <Info className="w-4 h-4 text-amber-700 shrink-0" />
              <span>
                <strong>Hotel selection is currently skipped.</strong> You can select any property below to add it back to your itinerary, or continue directly to the review step.
              </span>
            </div>
            {destinationHotels[0] && (
              <button
                type="button"
                onClick={() => {
                  setSelectedHotel(destinationHotels[0]);
                  setIsIncluded(true);
                }}
                className="font-bold text-emerald-900 underline whitespace-nowrap ml-2"
              >
                Add {destinationHotels[0].name.split(',')[0]}
              </button>
            )}
          </div>
        )}

        {/* Filters and Count */}
        <div className="bg-white rounded-2xl border border-stone-200 p-4 mb-8 shadow-xs flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-6 text-xs flex-wrap">
            <span className="font-bold text-stone-900">
              Showing {filteredHotels.length} verified stays in {destination}
            </span>

            {/* Budget Filter */}
            <div className="flex items-center gap-2">
              <span className="text-stone-500 font-medium">Max Price / night:</span>
              <input
                type="range"
                min={1500}
                max={12000}
                step={500}
                value={maxBudget}
                onChange={(e) => setMaxBudget(Number(e.target.value))}
                className="accent-emerald-800 w-28 cursor-pointer"
              />
              <span className="font-bold text-emerald-950">₹{maxBudget.toLocaleString()}</span>
            </div>

            {/* Rating Filter */}
            <div className="flex items-center gap-1.5">
              <span className="text-stone-500 font-medium">Rating:</span>
              {[0, 4.2, 4.6].map((rate) => (
                <button
                  key={rate}
                  type="button"
                  onClick={() => setMinRating(rate)}
                  className={`px-2 py-1 rounded-md text-xs font-semibold transition-colors ${
                    minRating === rate ? 'bg-emerald-900 text-white' : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                  }`}
                >
                  {rate === 0 ? 'All' : `${rate}+ ★`}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Hotel Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredHotels.map((hotel) => {
            const isSelected = isIncluded && selectedHotel?.id === hotel.id;
            const hotelTotalCost = hotel.pricePerNight * nights * roomCount;

            return (
              <div
                key={hotel.id}
                className={`bg-white rounded-2xl border overflow-hidden shadow-xs hover:shadow-lg transition-all flex flex-col justify-between ${
                  isSelected ? 'border-emerald-800 ring-2 ring-emerald-800/20 shadow-md' : 'border-stone-200/90'
                }`}
              >
                <div>
                  <div className="h-52 overflow-hidden relative">
                    <ImageWithFallback
                      src={hotel.imageUrl}
                      alt={hotel.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      fallbackTitle={hotel.name}
                      category="Hotel"
                    />
                    {hotel.tag && (
                      <span className="absolute top-3 left-3 bg-stone-900/90 text-amber-300 text-[10px] font-bold px-2.5 py-1 rounded-md backdrop-blur-xs">
                        {hotel.tag}
                      </span>
                    )}
                    <div className="absolute bottom-3 right-3 bg-white/95 text-stone-900 px-2 py-0.5 rounded-md text-xs font-bold shadow-xs flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span>{hotel.rating}</span>
                      <span className="text-[10px] text-stone-400 font-normal">({hotel.reviewCount})</span>
                    </div>
                  </div>

                  <div className="p-5 space-y-3">
                    <div>
                      <h3 className="font-bold text-stone-900 text-base">{hotel.name}</h3>
                      <p className="text-xs text-stone-500 flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3 text-emerald-800 shrink-0" />
                        <span className="truncate">{hotel.location}</span>
                      </p>
                    </div>

                    <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                      {hotel.description}
                    </p>

                    <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-100 text-[11px] text-stone-500 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                      <span className="truncate">{hotel.distanceFromHub}</span>
                    </div>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {hotel.amenities.slice(0, 3).map((amenity, idx) => (
                        <span key={idx} className="text-[10px] bg-stone-100 text-stone-700 px-2 py-0.5 rounded-md font-medium">
                          {amenity}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-3 border-t border-stone-100 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-stone-400 block">
                      ₹{hotel.pricePerNight.toLocaleString()} / night
                    </span>
                    <span className="text-lg font-black text-emerald-950">
                      ₹{hotelTotalCost.toLocaleString()}
                    </span>
                    <span className="text-[10px] text-stone-500 block">
                      {nights} {nights > 1 ? 'nights' : 'night'} · {roomCount} room
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setDetailModalHotel(hotel)}
                      className="px-3 py-2 rounded-xl border border-stone-300 hover:border-emerald-800 text-stone-700 hover:text-emerald-900 text-xs font-bold transition-colors"
                    >
                      Details
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSelectHotelCard(hotel)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-xs ${
                        isSelected
                          ? 'bg-emerald-950 text-white'
                          : 'bg-emerald-900 hover:bg-emerald-800 text-white'
                      }`}
                    >
                      {isSelected ? 'Selected ✓' : 'Select Hotel'}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Hotel Details Modal */}
      {detailModalHotel && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
          <div 
            className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-60 overflow-hidden">
              <ImageWithFallback
                src={detailModalHotel.imageUrl}
                alt={detailModalHotel.name}
                className="w-full h-full object-cover"
                fallbackTitle={detailModalHotel.name}
                category="Hotel"
              />
              <button
                onClick={() => setDetailModalHotel(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-stone-900/70 text-white hover:bg-stone-900 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="absolute bottom-4 left-6 text-white">
                <span className="text-xs font-bold bg-emerald-900/90 px-2 py-0.5 rounded-md mb-1 inline-block">
                  {detailModalHotel.city}
                </span>
                <h3 className="text-xl font-bold">{detailModalHotel.name}</h3>
              </div>
            </div>

            <div className="p-6 space-y-4 overflow-y-auto">
              <p className="text-xs text-stone-600 leading-relaxed">
                {detailModalHotel.description}
              </p>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-800 mb-2">
                  Featured Amenities
                </h4>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {detailModalHotel.amenities.map((a, i) => (
                    <div key={i} className="flex items-center gap-1.5 text-stone-700">
                      <Check className="w-3.5 h-3.5 text-emerald-700" />
                      <span>{a}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-stone-50 p-3 rounded-xl border border-stone-200 text-xs">
                <span className="font-bold text-stone-800 block">Cancellation Policy</span>
                <span className="text-stone-600">{detailModalHotel.cancellationPolicy}</span>
              </div>

              <div className="pt-2 flex items-center justify-between border-t border-stone-100">
                <div>
                  <span className="text-xs text-stone-500">Nightly Rate</span>
                  <span className="text-lg font-black text-emerald-950 block">₹{detailModalHotel.pricePerNight.toLocaleString()}</span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    handleSelectHotelCard(detailModalHotel);
                    setDetailModalHotel(null);
                  }}
                  className="px-6 py-2.5 bg-emerald-900 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl shadow-xs"
                >
                  Choose This Hotel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
