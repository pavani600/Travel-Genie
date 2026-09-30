import { useState } from 'react';
import { 
  Home, 
  Train, 
  Bus, 
  Plane, 
  Car, 
  Building, 
  MapPin, 
  ArrowRight, 
  Clock, 
  CreditCard, 
  Download, 
  Share2, 
  CheckCircle2, 
  Sparkles, 
  Calendar,
  Users,
  ShieldCheck,
  Compass
} from 'lucide-react';
import { TransportOption, LastMileOption, Hotel, SearchParams } from '../types/travel';
import { SAMPLE_TRANSPORTS, SAMPLE_LAST_MILE, SAMPLE_HOTELS } from '../data/mockTravelData';

interface TripSummaryPageProps {
  transport: TransportOption | null;
  lastMile: LastMileOption | null;
  hotel: Hotel | null;
  searchParams: SearchParams;
  onSaveToMyTrips: () => void;
  onNavigate: (page: string) => void;
}

export function TripSummaryPage({
  transport: propTransport,
  lastMile: propLastMile,
  hotel: propHotel,
  searchParams,
  onSaveToMyTrips,
  onNavigate
}: TripSummaryPageProps) {
  // Fallbacks to default rich demo state if not yet configured
  const transport = propTransport || SAMPLE_TRANSPORTS[0];
  const lastMile = propLastMile || SAMPLE_LAST_MILE[0];
  const hotel = propHotel || SAMPLE_HOTELS[0];
  const passengers = searchParams.passengers || 2;

  const [isCopied, setIsCopied] = useState(false);

  // Calculations
  const transportTotal = transport.pricePerPassenger * passengers;
  const lastMileTotal = lastMile.estimatedPrice;
  const hotelTotal = hotel.pricePerNight * 2; // 2 nights standard
  const estimatedTotal = transportTotal + lastMileTotal + hotelTotal;

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] pb-24">
      
      {/* Header bar */}
      <div className="bg-white border-b border-stone-200/80 shadow-xs">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200 mb-2">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>Multi-Modal Master Itinerary</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
                Complete Trip Summary
              </h1>
              <p className="text-xs sm:text-sm text-stone-500 mt-1">
                Door-to-door verified journey from {transport.originCity} to {hotel.name}
              </p>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <button
                onClick={handleShare}
                className="px-4 py-2.5 rounded-xl border border-stone-300 text-stone-700 hover:bg-stone-50 text-xs font-semibold flex items-center gap-1.5 transition-colors"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>{isCopied ? 'Link Copied!' : 'Share Itinerary'}</span>
              </button>
              <button
                onClick={handlePrint}
                className="px-4 py-2.5 rounded-xl border border-stone-300 text-stone-700 hover:bg-stone-50 text-xs font-semibold flex items-center gap-1.5 transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Print / PDF</span>
              </button>
              <button
                onClick={onSaveToMyTrips}
                className="px-5 py-2.5 bg-emerald-900 hover:bg-emerald-800 active:scale-95 text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center gap-1.5"
              >
                <CheckCircle2 className="w-4 h-4 text-amber-300" />
                <span>Save to My Trips</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 space-y-8">
        
        {/* TOP METRICS SUMMARY BAR */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-white rounded-2xl p-5 border border-stone-200/90 shadow-xs">
            <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider block">Estimated Total</span>
            <span className="text-2xl font-black text-emerald-950 mt-1 block">₹{estimatedTotal.toLocaleString()}</span>
            <span className="text-[11px] text-stone-500 mt-0.5 block">All inclusive for {passengers} pax</span>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-stone-200/90 shadow-xs">
            <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider block">Total Transit Time</span>
            <span className="text-2xl font-black text-stone-900 mt-1 block">~9h 15m</span>
            <span className="text-[11px] text-emerald-700 mt-0.5 block">Includes 30m station buffer</span>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-stone-200/90 shadow-xs">
            <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider block">Carbon Efficiency</span>
            <span className="text-2xl font-black text-emerald-800 mt-1 block">-68% CO₂</span>
            <span className="text-[11px] text-stone-500 mt-0.5 block">Electric rail vs flight corridor</span>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-stone-200/90 shadow-xs">
            <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider block">Booking Status</span>
            <span className="text-2xl font-black text-amber-600 mt-1 block">Ready</span>
            <span className="text-[11px] text-stone-500 mt-0.5 block">Verified operator slots</span>
          </div>
        </div>

        {/* JOURNEY TIMELINE (Home → Main Transport → Arrival → Local Transport → Hotel → Final Destination) */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-xs">
          <h2 className="text-base font-bold text-stone-900 uppercase tracking-wider mb-6 flex items-center gap-2">
            <Compass className="w-4 h-4 text-emerald-800" />
            <span>Door-to-Door Journey Timeline</span>
          </h2>

          <div className="relative pl-8 sm:pl-10 space-y-8 before:absolute before:left-3.5 sm:before:left-4.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-emerald-800/25">
            
            {/* Step 1: Home */}
            <div className="relative flex items-start gap-4 text-xs sm:text-sm">
              <div className="absolute -left-8 sm:-left-10 top-0.5 w-7 h-7 rounded-full bg-stone-900 text-white flex items-center justify-center font-bold shadow-xs">
                <Home className="w-3.5 h-3.5" />
              </div>
              <div className="flex-1 bg-stone-50/80 p-4 rounded-2xl border border-stone-200">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-stone-900">04:45 AM · Departure from Home</span>
                  <span className="text-[11px] text-stone-400">{transport.originCity} Area</span>
                </div>
                <p className="text-xs text-stone-600 mt-1">
                  Leave residence. 25-minute drive to {transport.originTerminal}.
                </p>
              </div>
            </div>

            {/* Step 2: Main Transport */}
            <div className="relative flex items-start gap-4 text-xs sm:text-sm">
              <div className="absolute -left-8 sm:-left-10 top-0.5 w-7 h-7 rounded-full bg-emerald-800 text-amber-300 flex items-center justify-center font-bold shadow-xs">
                {transport.transportType === 'train' && <Train className="w-3.5 h-3.5" />}
                {transport.transportType === 'bus' && <Bus className="w-3.5 h-3.5" />}
                {transport.transportType === 'flight' && <Plane className="w-3.5 h-3.5" />}
              </div>
              <div className="flex-1 bg-emerald-50/40 p-4 rounded-2xl border border-emerald-200/80">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <span className="font-bold text-emerald-950 text-sm">
                    {transport.departureTime} · Board {transport.operatorName}
                  </span>
                  <span className="font-extrabold text-emerald-900">
                    ₹{transportTotal.toLocaleString()} ({passengers} pax)
                  </span>
                </div>
                <div className="mt-2 text-xs text-stone-600 space-y-1">
                  <p><span className="font-medium text-stone-800">Route:</span> {transport.originTerminal} → {transport.destinationTerminal}</p>
                  <p><span className="font-medium text-stone-800">Seat Class:</span> {transport.seatingType} (Air-Conditioned)</p>
                  <p><span className="font-medium text-stone-800">Duration:</span> {transport.duration} direct service</p>
                </div>
              </div>
            </div>

            {/* Step 3: Arrival Hub */}
            <div className="relative flex items-start gap-4 text-xs sm:text-sm">
              <div className="absolute -left-8 sm:-left-10 top-0.5 w-7 h-7 rounded-full bg-stone-700 text-white flex items-center justify-center font-bold shadow-xs">
                <MapPin className="w-3.5 h-3.5" />
              </div>
              <div className="flex-1 bg-stone-50/80 p-4 rounded-2xl border border-stone-200">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-stone-900">{transport.arrivalTime} · Arrival at Destination Hub</span>
                  <span className="text-[11px] text-emerald-800 font-semibold">On-Time Buffer</span>
                </div>
                <p className="text-xs text-stone-600 mt-1">
                  Arrive at {transport.destinationTerminal}. Head to designated pickup lane for pre-booked local transit.
                </p>
              </div>
            </div>

            {/* Step 4: Local Transport */}
            <div className="relative flex items-start gap-4 text-xs sm:text-sm">
              <div className="absolute -left-8 sm:-left-10 top-0.5 w-7 h-7 rounded-full bg-orange-600 text-white flex items-center justify-center font-bold shadow-xs">
                <Car className="w-3.5 h-3.5" />
              </div>
              <div className="flex-1 bg-orange-50/40 p-4 rounded-2xl border border-orange-200/80">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <span className="font-bold text-orange-950 text-sm">
                    {lastMile.title} (Prepaid Transfer)
                  </span>
                  <span className="font-extrabold text-orange-900">₹{lastMileTotal}</span>
                </div>
                <p className="text-xs text-stone-600 mt-1">
                  Vehicle: {lastMile.vehicleModel} · Pickup from {lastMile.pickupPoint.split('/')[0]}
                </p>
                <p className="text-[11px] text-stone-500 mt-1">
                  Direct transfer to {hotel.name} (~{lastMile.estimatedTime}).
                </p>
              </div>
            </div>

            {/* Step 5: Hotel Stay */}
            <div className="relative flex items-start gap-4 text-xs sm:text-sm">
              <div className="absolute -left-8 sm:-left-10 top-0.5 w-7 h-7 rounded-full bg-emerald-900 text-white flex items-center justify-center font-bold shadow-xs">
                <Building className="w-3.5 h-3.5" />
              </div>
              <div className="flex-1 bg-stone-50/90 p-4 rounded-2xl border border-stone-200">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <span className="font-bold text-stone-900 text-sm">
                    Check-in at {hotel.name}
                  </span>
                  <span className="font-extrabold text-emerald-950">₹{hotelTotal.toLocaleString()} (2 Nights)</span>
                </div>
                <p className="text-xs text-stone-600 mt-1">
                  Location: {hotel.location}, {hotel.city}
                </p>
                <p className="text-xs text-stone-500 mt-1">
                  {hotel.roomType} · Complimentary breakfast included
                </p>
              </div>
            </div>

            {/* Step 6: Final Destination */}
            <div className="relative flex items-start gap-4 text-xs sm:text-sm">
              <div className="absolute -left-8 sm:-left-10 top-0.5 w-7 h-7 rounded-full bg-emerald-800 text-white flex items-center justify-center font-bold shadow-xs">
                <CheckCircle2 className="w-4 h-4 text-amber-300" />
              </div>
              <div className="flex-1 bg-emerald-900 text-white p-4 rounded-2xl">
                <span className="font-bold block text-sm">Final Destination Reached</span>
                <p className="text-xs text-stone-300 mt-0.5">
                  Trip plan executed. Relax and enjoy your stay in {transport.destinationCity}!
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* COST BREAKDOWN TABLE */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-xs">
          <h3 className="text-base font-bold text-stone-900 uppercase tracking-wider mb-4">
            Unified Financial Breakdown
          </h3>

          <div className="overflow-x-auto text-xs sm:text-sm">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-stone-200 text-stone-400 text-xs">
                  <th className="py-3 font-semibold">Service Description</th>
                  <th className="py-3 font-semibold">Quantity / Duration</th>
                  <th className="py-3 font-semibold text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 text-stone-700">
                <tr>
                  <td className="py-3 font-medium">
                    {transport.operatorName} ({transport.seatingType})
                  </td>
                  <td className="py-3 text-stone-500">{passengers} Passengers</td>
                  <td className="py-3 font-bold text-right text-stone-900">₹{transportTotal.toLocaleString()}</td>
                </tr>
                <tr>
                  <td className="py-3 font-medium">
                    {lastMile.title} ({lastMile.vehicleModel})
                  </td>
                  <td className="py-3 text-stone-500">1 Dedicated Transfer</td>
                  <td className="py-3 font-bold text-right text-stone-900">₹{lastMileTotal.toLocaleString()}</td>
                </tr>
                <tr>
                  <td className="py-3 font-medium">
                    {hotel.name} ({hotel.roomType})
                  </td>
                  <td className="py-3 text-stone-500">2 Nights Stay</td>
                  <td className="py-3 font-bold text-right text-stone-900">₹{hotelTotal.toLocaleString()}</td>
                </tr>
                <tr>
                  <td className="py-3 font-medium text-stone-500">
                    TripGenie Multi-Modal Integration & Transit Protection
                  </td>
                  <td className="py-3 text-stone-500">Free in Phase 1</td>
                  <td className="py-3 font-bold text-right text-emerald-800">₹0</td>
                </tr>
              </tbody>
              <tfoot>
                <tr className="border-t-2 border-stone-900 text-stone-900 font-extrabold text-base">
                  <td className="py-4">Grand Total Payable</td>
                  <td className="py-4 text-xs font-normal text-stone-500">Includes all taxes and fees</td>
                  <td className="py-4 text-right text-xl font-black text-emerald-950">
                    ₹{estimatedTotal.toLocaleString()}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 bg-stone-100/80 rounded-2xl border border-stone-200">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-emerald-800" />
            <span className="text-xs text-stone-600 font-medium">
              100% price lock guarantee. No surge during station transfer.
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('home')}
              className="px-4 py-2 rounded-xl border border-stone-300 text-stone-700 text-xs font-semibold hover:bg-stone-50"
            >
              Modify Trip
            </button>
            <button
              onClick={onSaveToMyTrips}
              className="px-6 py-2.5 bg-emerald-900 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl shadow-xs transition-all"
            >
              Confirm & Save to Dashboard
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
