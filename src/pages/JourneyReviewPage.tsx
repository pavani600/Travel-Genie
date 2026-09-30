import { useState } from 'react';
import { 
  ArrowLeft, 
  ArrowRight, 
  Edit3, 
  Train, 
  Bus, 
  Plane, 
  Car, 
  Building, 
  User, 
  MapPin, 
  Calendar, 
  Clock, 
  ShieldCheck, 
  Info,
  CheckCircle2,
  Sparkles,
  Compass
} from 'lucide-react';
import { 
  TransportOption, 
  LocalTransportBooking, 
  HotelBookingConfig, 
  PassengerDetail, 
  ContactInfo, 
  DynamicFareBreakdown, 
  SearchParams 
} from '../types/travel';

interface JourneyReviewPageProps {
  searchParams: SearchParams;
  transport: TransportOption | null;
  selectedClassId?: string;
  localTransport: LocalTransportBooking | null;
  hotelConfig: HotelBookingConfig | null;
  passengers: PassengerDetail[];
  contactInfo: ContactInfo;
  includeInsurance: boolean;
  fareBreakdown: DynamicFareBreakdown;
  onEditSearch: () => void;
  onEditTransport: () => void;
  onEditLocalTransport: () => void;
  onEditHotel: () => void;
  onEditPassengers: () => void;
  onGoBack: () => void;
  onProceedToPassengers: () => void;
  onProceedToPaymentDirect: () => void;
}

export function JourneyReviewPage({
  searchParams,
  transport,
  selectedClassId,
  localTransport,
  hotelConfig,
  passengers,
  contactInfo,
  includeInsurance,
  fareBreakdown,
  onEditSearch,
  onEditTransport,
  onEditLocalTransport,
  onEditHotel,
  onEditPassengers,
  onGoBack,
  onProceedToPassengers,
  onProceedToPaymentDirect
}: JourneyReviewPageProps) {
  const [showFullFareBreakdown, setShowFullFareBreakdown] = useState(false);

  const selectedClassName = transport?.availableClasses?.find(c => c.id === selectedClassId)?.name || transport?.seatingType;

  return (
    <div className="min-h-screen bg-[#FAF8F5] pb-24">
      
      {/* Context Step Bar */}
      <div className="bg-white border-b border-stone-200/80 py-4 shadow-xs">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onGoBack}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-stone-300 hover:border-emerald-800 text-stone-700 hover:text-emerald-950 font-bold text-xs bg-stone-50 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Hotel Selection</span>
            </button>
            <span className="text-xs font-bold text-emerald-900 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
              Step 5: Complete Journey Review
            </span>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <span className="text-stone-500">Total Estimated Fare:</span>
            <span className="text-base font-extrabold text-emerald-950">₹{fareBreakdown.grandTotal.toLocaleString()}</span>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-6">
        
        {/* Title and Safe Review Notice */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
              Pre-Payment Review
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight mt-1">
              Review Your Complete Itinerary
            </h1>
            <p className="text-xs sm:text-sm text-stone-600 mt-1">
              Verify all details below. Use the Edit buttons to modify any selection without restarting your search.
            </p>
          </div>

          <div className="bg-emerald-50 border border-emerald-200 rounded-xl px-3 py-2 text-xs text-emerald-900 font-semibold flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
            <span>Zero obligation · No payment charged during review</span>
          </div>
        </div>

        {/* 1. Journey Route & Search Details */}
        <div className="bg-white rounded-2xl border border-stone-200/90 p-5 shadow-xs space-y-3">
          <div className="flex items-center justify-between pb-3 border-b border-stone-100">
            <div className="flex items-center gap-2">
              <Compass className="w-4 h-4 text-emerald-800" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-stone-900">
                1. Route & Travel Schedule
              </h3>
            </div>
            <button
              type="button"
              onClick={onEditSearch}
              className="flex items-center gap-1 text-xs font-bold text-emerald-800 hover:text-emerald-950 bg-emerald-50 hover:bg-emerald-100 px-2.5 py-1 rounded-lg transition-colors"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit Route</span>
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
            <div>
              <span className="text-stone-400 block text-[11px]">From</span>
              <span className="font-bold text-stone-900 text-sm">{searchParams.fromCity}</span>
            </div>
            <div>
              <span className="text-stone-400 block text-[11px]">Destination</span>
              <span className="font-bold text-emerald-900 text-sm">{searchParams.toCity}</span>
            </div>
            <div>
              <span className="text-stone-400 block text-[11px]">Travel Date</span>
              <span className="font-bold text-stone-900 text-sm">{searchParams.departureDate}</span>
            </div>
            <div>
              <span className="text-stone-400 block text-[11px]">Travelers</span>
              <span className="font-bold text-stone-900 text-sm">{passengers.length} {passengers.length > 1 ? 'Persons' : 'Person'}</span>
            </div>
          </div>
        </div>

        {/* 2. Main Transport Section */}
        <div className="bg-white rounded-2xl border border-stone-200/90 p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-stone-100">
            <div className="flex items-center gap-2">
              <Train className="w-4 h-4 text-emerald-800" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-stone-900">
                2. Main Transport Option
              </h3>
            </div>
            <button
              type="button"
              onClick={onEditTransport}
              className="flex items-center gap-1 text-xs font-bold text-emerald-800 hover:text-emerald-950 bg-emerald-50 hover:bg-emerald-100 px-2.5 py-1 rounded-lg transition-colors"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Change Transport</span>
            </button>
          </div>

          {transport ? (
            <div className="space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-stone-100 flex items-center justify-center font-bold">
                    {transport.transportType === 'train' && <Train className="w-4 h-4 text-emerald-800" />}
                    {transport.transportType === 'bus' && <Bus className="w-4 h-4 text-orange-600" />}
                    {transport.transportType === 'flight' && <Plane className="w-4 h-4 text-sky-700" />}
                  </div>
                  <div>
                    <h4 className="font-bold text-stone-900 text-sm">
                      {transport.operatorName} ({transport.operatorCode})
                    </h4>
                    <p className="text-xs text-stone-500 font-medium">
                      Class: <span className="text-emerald-900 font-bold">{selectedClassName}</span>
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-xs text-stone-400 block">Total Fare ({passengers.length} pax)</span>
                  <span className="text-base font-extrabold text-emerald-950">
                    ₹{fareBreakdown.transportTotal.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Timing timeline */}
              <div className="bg-stone-50 p-3 rounded-xl border border-stone-100 flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-stone-900 block text-sm">{transport.departureTime}</span>
                  <span className="text-stone-600">{transport.originTerminal.split('·')[0]}</span>
                </div>
                <div className="text-center px-4">
                  <span className="text-[11px] text-stone-400 block">{transport.duration}</span>
                  <div className="w-24 h-0.5 bg-stone-300 relative my-0.5">
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-emerald-800" />
                  </div>
                  <span className="text-[10px] text-emerald-700 font-semibold">Direct</span>
                </div>
                <div className="text-right">
                  <span className="font-bold text-stone-900 block text-sm">{transport.arrivalTime}</span>
                  <span className="text-stone-600">{transport.destinationTerminal.split('·')[0]}</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-4 bg-stone-50 rounded-xl text-xs text-stone-500 text-center">
              No main transport chosen. Click Change Transport to select.
            </div>
          )}
        </div>

        {/* 3. Local Transportation Section */}
        <div className="bg-white rounded-2xl border border-stone-200/90 p-5 shadow-xs space-y-3">
          <div className="flex items-center justify-between pb-3 border-b border-stone-100">
            <div className="flex items-center gap-2">
              <Car className="w-4 h-4 text-orange-600" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-stone-900">
                3. Last-Mile Local Transit
              </h3>
            </div>
            <button
              type="button"
              onClick={onEditLocalTransport}
              className="flex items-center gap-1 text-xs font-bold text-emerald-800 hover:text-emerald-950 bg-emerald-50 hover:bg-emerald-100 px-2.5 py-1 rounded-lg transition-colors"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Modify Transit</span>
            </button>
          </div>

          {localTransport ? (
            <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="space-y-1">
                <span className="font-bold text-stone-900 text-sm block">
                  {localTransport.option.title} ({localTransport.option.vehicleModel})
                </span>
                <p className="text-stone-500">
                  <span className="font-semibold text-stone-700">Pickup:</span> {localTransport.pickupLocation}
                </p>
                <p className="text-stone-500">
                  <span className="font-semibold text-stone-700">Drop:</span> {localTransport.dropLocation}
                </p>
                <p className="text-stone-400 text-[11px]">
                  Estimated travel duration: {localTransport.option.estimatedTime}
                </p>
              </div>

              <div className="text-right">
                <span className="text-xs text-stone-400 block">Prepaid Transit Fare</span>
                <span className="text-base font-extrabold text-stone-900">
                  ₹{fareBreakdown.localTransportTotal.toLocaleString()}
                </span>
              </div>
            </div>
          ) : (
            <div className="p-4 bg-stone-50 rounded-xl text-xs text-stone-500 text-center">
              No local transportation selected. Click Modify Transit to add.
            </div>
          )}
        </div>

        {/* 4. Hotel Stay Section */}
        <div className="bg-white rounded-2xl border border-stone-200/90 p-5 shadow-xs space-y-3">
          <div className="flex items-center justify-between pb-3 border-b border-stone-100">
            <div className="flex items-center gap-2">
              <Building className="w-4 h-4 text-emerald-800" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-stone-900">
                4. Hotel Accommodation
              </h3>
            </div>
            <button
              type="button"
              onClick={onEditHotel}
              className="flex items-center gap-1 text-xs font-bold text-emerald-800 hover:text-emerald-950 bg-emerald-50 hover:bg-emerald-100 px-2.5 py-1 rounded-lg transition-colors"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Modify Hotel</span>
            </button>
          </div>

          {hotelConfig && hotelConfig.isIncluded && hotelConfig.hotel ? (
            <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="space-y-1">
                <span className="font-bold text-stone-900 text-sm block">
                  {hotelConfig.hotel.name}
                </span>
                <p className="text-stone-500">
                  {hotelConfig.hotel.roomType} · {hotelConfig.roomCount} {hotelConfig.roomCount > 1 ? 'Rooms' : 'Room'}
                </p>
                <p className="text-stone-500">
                  Dates: {hotelConfig.checkInDate} to {hotelConfig.checkOutDate} ({hotelConfig.nights} {hotelConfig.nights > 1 ? 'nights' : 'night'})
                </p>
                <p className="text-stone-400 text-[11px]">
                  Location: {hotelConfig.hotel.location}, {hotelConfig.hotel.city}
                </p>
              </div>

              <div className="text-right">
                <span className="text-xs text-stone-400 block">Total Stay Cost</span>
                <span className="text-base font-extrabold text-stone-900">
                  ₹{fareBreakdown.hotelTotal.toLocaleString()}
                </span>
              </div>
            </div>
          ) : (
            <div className="p-4 bg-stone-50 rounded-xl text-xs text-stone-500 flex items-center justify-between">
              <span>No hotel accommodation included in this booking.</span>
              <button
                type="button"
                onClick={onEditHotel}
                className="text-xs font-bold text-emerald-800 underline"
              >
                Add Hotel Stay
              </button>
            </div>
          )}
        </div>

        {/* 5. Passenger Information Section */}
        <div className="bg-white rounded-2xl border border-stone-200/90 p-5 shadow-xs space-y-3">
          <div className="flex items-center justify-between pb-3 border-b border-stone-100">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-emerald-800" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-stone-900">
                5. Passenger & Contact Information
              </h3>
            </div>
            <button
              type="button"
              onClick={onEditPassengers}
              className="flex items-center gap-1 text-xs font-bold text-emerald-800 hover:text-emerald-950 bg-emerald-50 hover:bg-emerald-100 px-2.5 py-1 rounded-lg transition-colors"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit Passengers</span>
            </button>
          </div>

          <div className="space-y-2 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {passengers.map((p, i) => (
                <div key={p.id} className="p-2.5 rounded-xl bg-stone-50 border border-stone-100 flex items-center justify-between">
                  <div>
                    <span className="font-bold text-stone-900 block">{p.fullName || `Traveler ${i + 1}`}</span>
                    <span className="text-[11px] text-stone-500">{p.age} yrs · {p.gender} · {p.seatPreference}</span>
                  </div>
                  <span className="text-[10px] text-stone-400">Seat {i + 1}</span>
                </div>
              ))}
            </div>

            <div className="pt-2 text-[11px] text-stone-500 flex flex-wrap gap-4 border-t border-stone-100">
              <span><strong className="text-stone-700">Email:</strong> {contactInfo.email}</span>
              <span><strong className="text-stone-700">Mobile:</strong> {contactInfo.phone}</span>
              <span><strong className="text-stone-700">Insurance:</strong> {includeInsurance ? 'Included (+₹30)' : 'Not Included'}</span>
            </div>
          </div>
        </div>

        {/* 6. Total Estimated Cost & Fare Breakdown */}
        <div className="bg-white rounded-3xl border border-stone-200/90 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400 block">
                Total Estimated Payable
              </span>
              <span className="text-3xl font-black text-emerald-950 block mt-0.5">
                ₹{fareBreakdown.grandTotal.toLocaleString()}
              </span>
              <span className="text-xs text-stone-500">All inclusive for {passengers.length} travelers</span>
            </div>

            <button
              type="button"
              onClick={() => setShowFullFareBreakdown(!showFullFareBreakdown)}
              className="text-xs font-bold text-emerald-800 hover:text-emerald-950 underline"
            >
              {showFullFareBreakdown ? 'Hide Fare Details' : 'View Itemized Fare'}
            </button>
          </div>

          {showFullFareBreakdown && (
            <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 text-xs space-y-2 text-stone-600 animate-in fade-in duration-200">
              <div className="flex justify-between py-1 border-b border-stone-200/60">
                <span>Main Transport Fare ({passengers.length} travelers)</span>
                <span className="font-semibold text-stone-900">₹{fareBreakdown.transportTotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-stone-200/60">
                <span>Local Station/Airport Transit Transfer</span>
                <span className="font-semibold text-stone-900">₹{fareBreakdown.localTransportTotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-stone-200/60">
                <span>Hotel Accommodation ({fareBreakdown.hotelNights} nights)</span>
                <span className="font-semibold text-stone-900">₹{fareBreakdown.hotelTotal.toLocaleString()}</span>
              </div>
              {includeInsurance && (
                <div className="flex justify-between py-1 border-b border-stone-200/60 text-emerald-800">
                  <span>Travel Insurance ({passengers.length} pax)</span>
                  <span className="font-semibold">₹{fareBreakdown.insuranceTotal.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between py-1 border-b border-stone-200/60">
                <span>GST (5%)</span>
                <span className="font-semibold text-stone-900">₹{fareBreakdown.taxesAndGst.toLocaleString()}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-stone-200/60">
                <span>Platform Convenience Fee</span>
                <span className="font-semibold text-stone-900">₹{fareBreakdown.convenienceFee.toLocaleString()}</span>
              </div>
              <div className="flex justify-between pt-2 text-sm font-bold text-stone-900">
                <span>Total Amount</span>
                <span className="text-emerald-950 text-base font-black">₹{fareBreakdown.grandTotal.toLocaleString()}</span>
              </div>
            </div>
          )}

          {/* Action CTAs */}
          <div className="pt-4 border-t border-stone-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <button
              type="button"
              onClick={onGoBack}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-stone-300 text-stone-700 font-semibold text-xs hover:bg-stone-50 transition-colors"
            >
              ← Back to Hotel Selection
            </button>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                type="button"
                onClick={onProceedToPassengers}
                className="w-full sm:w-auto px-6 py-3 bg-emerald-900 hover:bg-emerald-800 active:scale-[0.98] text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center justify-center gap-1.5"
              >
                <span>Continue to Passenger Details</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
