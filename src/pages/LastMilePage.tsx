import { useState, useMemo, useEffect } from 'react';
import { 
  Car, 
  Users2, 
  Zap, 
  Clock, 
  Star, 
  MapPin, 
  Check, 
  ArrowRight, 
  ArrowLeft, 
  ShieldCheck, 
  Sparkles, 
  Info, 
  Building, 
  Plus, 
  Minus 
} from 'lucide-react';
import { LastMileOption, TransportOption, LocalTransportBooking } from '../types/travel';
import { getLastMileOptions } from '../services/travelEngine';

interface LastMilePageProps {
  selectedTransport: TransportOption | null;
  savedBooking?: LocalTransportBooking | null;
  onSaveLocalTransport: (booking: LocalTransportBooking) => void;
  onProceedToHotels: () => void;
  onGoBack: () => void;
  isEditingFromReview?: boolean;
  onReturnToReview?: () => void;
}

export function LastMilePage({
  selectedTransport,
  savedBooking,
  onSaveLocalTransport,
  onProceedToHotels,
  onGoBack,
  isEditingFromReview = false,
  onReturnToReview
}: LastMilePageProps) {
  const destinationCity = selectedTransport?.destinationCity || 'Destination';
  const arrivalHub = selectedTransport?.destinationTerminal || `${destinationCity} Central Hub`;

  // Dynamically generated last-mile options for this destination
  const availableOptions = useMemo(() => {
    return getLastMileOptions(destinationCity, arrivalHub);
  }, [destinationCity, arrivalHub]);

  const defaultPickup = selectedTransport 
    ? `${selectedTransport.destinationTerminal} (Designated Bay)` 
    : `${destinationCity} Arrival Station / Terminal Bay 1`;
  
  const defaultDrop = `${destinationCity} City Center / Hotel Area`;

  const [currentSelectedId, setCurrentSelectedId] = useState<string>(
    savedBooking?.option?.id || availableOptions[0]?.id || 'lm-cab'
  );
  
  const [pickupLocation, setPickupLocation] = useState(savedBooking?.pickupLocation || defaultPickup);
  const [dropLocation, setDropLocation] = useState(savedBooking?.dropLocation || defaultDrop);
  const [paxCount, setPaxCount] = useState<number>(savedBooking?.passengerCount || 2);

  // Sync if selected transport changed to another city
  useEffect(() => {
    if (selectedTransport) {
      const newDefaultPickup = `${selectedTransport.destinationTerminal} (Designated Bay)`;
      const newDefaultDrop = `${selectedTransport.destinationCity} City Center / Hotel Area`;
      
      // If previous locations were for a different city or default, update them
      if (!savedBooking || !savedBooking.pickupLocation.includes(selectedTransport.destinationCity)) {
        setPickupLocation(newDefaultPickup);
        setDropLocation(newDefaultDrop);
      }
    }
  }, [selectedTransport]);

  const activeOption = availableOptions.find(o => o.id === currentSelectedId) || availableOptions[0];

  const handleSelectCard = (option: LastMileOption) => {
    setCurrentSelectedId(option.id);
    onSaveLocalTransport({
      option,
      pickupLocation,
      dropLocation,
      passengerCount: paxCount
    });
  };

  const handleSaveAndProceed = () => {
    const booking: LocalTransportBooking = {
      option: activeOption,
      pickupLocation,
      dropLocation,
      passengerCount: paxCount
    };
    onSaveLocalTransport(booking);

    if (isEditingFromReview && onReturnToReview) {
      onReturnToReview();
    } else {
      onProceedToHotels();
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] pb-24">
      
      {/* Context Step Bar */}
      <div className="bg-white border-b border-stone-200/80 py-4 shadow-xs">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onGoBack}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-stone-300 hover:border-emerald-800 text-stone-700 hover:text-emerald-950 font-bold text-xs bg-stone-50 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Transport</span>
            </button>

            <span className="text-xs font-bold text-emerald-900 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
              Step 3: Local Transportation in {destinationCity}
            </span>
          </div>

          <div className="flex items-center gap-3">
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
              <span>{isEditingFromReview ? 'Save Transit' : 'Continue to Hotel Selection'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* Main Headline */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
            Frictionless Arrival Transfer
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight mt-1">
            How would you like to reach your destination in {destinationCity}?
          </h1>
          <p className="text-sm text-stone-600 mt-2 leading-relaxed">
            Eliminate taxi haggling upon arrival at {arrivalHub}. Modify pickup/drop addresses and passenger capacity below.
          </p>
        </div>

        {/* Customizable Pickup & Drop Address Card */}
        <div className="mb-8 bg-white rounded-2xl border border-stone-200/90 p-5 shadow-xs space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-stone-900 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-emerald-800" />
            <span>Customize Pickup &amp; Drop Locations</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 text-xs">
            {/* Pickup */}
            <div className="md:col-span-5">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-500 mb-1">
                Pickup Point (Hub Terminal)
              </label>
              <div className="flex items-center gap-2 px-3 py-2 rounded-xl border border-stone-200 bg-stone-50/60 focus-within:border-emerald-800">
                <MapPin className="w-4 h-4 text-emerald-800 shrink-0" />
                <input
                  type="text"
                  value={pickupLocation}
                  onChange={(e) => setPickupLocation(e.target.value)}
                  placeholder={`e.g. ${arrivalHub} Exit Gate`}
                  className="w-full bg-transparent text-xs text-stone-900 focus:outline-none font-medium"
                />
              </div>
            </div>

            {/* Drop */}
            <div className="md:col-span-5">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-500 mb-1">
                Drop Destination (Hotel or Address in {destinationCity})
              </label>
              <div className="flex items-center gap-2 px-3 py-2 rounded-xl border border-stone-200 bg-stone-50/60 focus-within:border-emerald-800">
                <Building className="w-4 h-4 text-orange-600 shrink-0" />
                <input
                  type="text"
                  value={dropLocation}
                  onChange={(e) => setDropLocation(e.target.value)}
                  placeholder={`e.g. ${destinationCity} Central Hotel / Residence`}
                  className="w-full bg-transparent text-xs text-stone-900 focus:outline-none font-medium"
                />
              </div>
            </div>

            {/* Passenger Count Modifier */}
            <div className="md:col-span-2">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-500 mb-1">
                Passengers
              </label>
              <div className="flex items-center justify-between px-2 py-1.5 rounded-xl border border-stone-200 bg-stone-50/60">
                <button
                  type="button"
                  onClick={() => setPaxCount(Math.max(1, paxCount - 1))}
                  className="w-6 h-6 rounded-lg bg-white border border-stone-200 flex items-center justify-center text-stone-700 hover:bg-stone-100"
                >
                  <Minus className="w-3 h-3" />
                </button>
                <span className="font-bold text-stone-900">{paxCount}</span>
                <button
                  type="button"
                  onClick={() => setPaxCount(Math.min(8, paxCount + 1))}
                  className="w-6 h-6 rounded-lg bg-white border border-stone-200 flex items-center justify-center text-stone-700 hover:bg-stone-100"
                >
                  <Plus className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Cards: Cab, Shared transport, Auto, Public Metro */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {availableOptions.map((option) => {
            const isSelected = option.id === currentSelectedId;
            return (
              <div
                key={option.id}
                onClick={() => handleSelectCard(option)}
                className={`group cursor-pointer bg-white rounded-2xl p-6 border transition-all relative flex flex-col justify-between ${
                  isSelected
                    ? 'border-emerald-800 ring-2 ring-emerald-800/15 shadow-md -translate-y-1'
                    : 'border-stone-200/90 hover:border-emerald-600/40 shadow-xs hover:shadow-md'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center transition-colors ${
                      isSelected ? 'bg-emerald-900 text-amber-300' : 'bg-stone-100 text-stone-700 group-hover:bg-emerald-50 group-hover:text-emerald-900'
                    }`}>
                      {option.type === 'cab' && <Car className="w-5 h-5" />}
                      {option.type === 'shared' && <Users2 className="w-5 h-5" />}
                      {option.type === 'auto' && <Zap className="w-5 h-5 text-amber-600" />}
                      {option.type === 'metro' && <Sparkles className="w-5 h-5 text-sky-600" />}
                    </div>

                    <span className="text-[11px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200 flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      {option.rating}
                    </span>
                  </div>

                  <h3 className="font-bold text-stone-900 text-base">{option.title}</h3>
                  <p className="text-xs text-stone-500 mt-1">{option.vehicleModel}</p>

                  <div className="my-4 pt-3 border-t border-stone-100 space-y-2 text-xs">
                    <div className="flex items-center justify-between text-stone-600">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-stone-400" />
                        <span>Transit Time</span>
                      </span>
                      <span className="font-semibold text-stone-900">{option.estimatedTime}</span>
                    </div>

                    <div className="flex items-center justify-between text-stone-600">
                      <span className="flex items-center gap-1">
                        <Users2 className="w-3.5 h-3.5 text-stone-400" />
                        <span>Capacity</span>
                      </span>
                      <span className="font-semibold text-stone-900">Up to {option.passengerCapacity} pax</span>
                    </div>

                    <div className="flex items-center justify-between text-stone-600">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-stone-400" />
                        <span>Boarding Bay</span>
                      </span>
                      <span className="font-semibold text-emerald-900 text-right truncate max-w-[130px]" title={option.pickupPoint}>
                        {option.pickupPoint}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-1.5 mb-4">
                    {option.features.slice(0, 3).map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-1.5 text-[11px] text-stone-600">
                        <Check className="w-3 h-3 text-emerald-700 shrink-0" />
                        <span className="truncate">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-stone-400 block">Fixed Fare</span>
                    <span className="text-lg font-black text-emerald-950">₹{option.estimatedPrice}</span>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelectCard(option);
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      isSelected
                        ? 'bg-emerald-950 text-white'
                        : 'bg-stone-100 hover:bg-emerald-50 text-stone-800 hover:text-emerald-950'
                    }`}
                  >
                    {isSelected ? 'Selected ✓' : 'Select'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Reassurance strip */}
        <div className="mt-8 bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-4 text-xs text-emerald-950">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0" />
            <div>
              <span className="font-bold block">100% On-time Arrival &amp; Driver Waiting Guarantee</span>
              <span className="text-emerald-800 text-[11px]">
                Your driver monitors train/flight arrival numbers and waits up to 45 minutes after actual arrival at no extra charge.
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleSaveAndProceed}
            className="px-4 py-2 bg-emerald-900 hover:bg-emerald-800 text-white font-bold rounded-xl shadow-xs transition-colors self-end sm:self-auto"
          >
            Confirm &amp; Go to Hotels →
          </button>
        </div>

      </div>
    </div>
  );
}
