import { useState } from 'react';
import { 
  X, 
  Clock, 
  MapPin, 
  ShieldCheck, 
  Star, 
  Wifi, 
  Zap, 
  Check, 
  CreditCard, 
  AlertCircle, 
  Train, 
  Bus, 
  Plane, 
  Calendar,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { TransportOption } from '../types/travel';

interface TransportDetailsModalProps {
  transport: TransportOption | null;
  onClose: () => void;
  onBook: (transport: TransportOption) => void;
  passengersCount: number;
}

export function TransportDetailsModal({
  transport,
  onClose,
  onBook,
  passengersCount
}: TransportDetailsModalProps) {
  const [activeTab, setActiveTab] = useState<'schedule' | 'amenities' | 'fare' | 'policy' | 'reviews'>('schedule');

  if (!transport) return null;

  const totalFare = transport.fareBreakdown.totalPerPerson * passengersCount;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header bar */}
        <div className="p-5 sm:p-6 bg-stone-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-800 text-amber-300 flex items-center justify-center font-bold">
              {transport.transportType === 'train' && <Train className="w-5 h-5" />}
              {transport.transportType === 'bus' && <Bus className="w-5 h-5" />}
              {transport.transportType === 'flight' && <Plane className="w-5 h-5" />}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-white">{transport.operatorName}</h3>
                <span className="text-xs text-stone-400">#{transport.operatorCode}</span>
              </div>
              <p className="text-xs text-stone-300">{transport.seatingType} · {transport.originCity} to {transport.destinationCity}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick summary strip */}
        <div className="bg-stone-50 border-b border-stone-200 px-6 py-3.5 flex flex-wrap items-center justify-between text-xs gap-3">
          <div className="flex items-center gap-4">
            <div>
              <span className="text-stone-400 block text-[10px]">Departure</span>
              <span className="font-bold text-stone-900">{transport.departureTime}</span>
            </div>
            <div className="h-6 w-px bg-stone-200" />
            <div>
              <span className="text-stone-400 block text-[10px]">Duration</span>
              <span className="font-bold text-stone-900">{transport.duration}</span>
            </div>
            <div className="h-6 w-px bg-stone-200" />
            <div>
              <span className="text-stone-400 block text-[10px]">Arrival</span>
              <span className="font-bold text-stone-900">{transport.arrivalTime}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-stone-500 font-medium">Rating:</span>
            <div className="flex items-center gap-1 font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
              <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
              <span>{transport.rating}</span>
            </div>
            <span className="text-stone-400">({transport.reviewCount} reviews)</span>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="border-b border-stone-200 px-6 flex items-center gap-4 overflow-x-auto text-xs font-semibold">
          <button
            onClick={() => setActiveTab('schedule')}
            className={`py-3 relative transition-colors ${
              activeTab === 'schedule' ? 'text-emerald-900 font-bold' : 'text-stone-500 hover:text-stone-800'
            }`}
          >
            Route Schedule
            {activeTab === 'schedule' && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-900" />}
          </button>

          <button
            onClick={() => setActiveTab('amenities')}
            className={`py-3 relative transition-colors ${
              activeTab === 'amenities' ? 'text-emerald-900 font-bold' : 'text-stone-500 hover:text-stone-800'
            }`}
          >
            Amenities
            {activeTab === 'amenities' && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-900" />}
          </button>

          <button
            onClick={() => setActiveTab('fare')}
            className={`py-3 relative transition-colors ${
              activeTab === 'fare' ? 'text-emerald-900 font-bold' : 'text-stone-500 hover:text-stone-800'
            }`}
          >
            Fare Breakdown
            {activeTab === 'fare' && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-900" />}
          </button>

          <button
            onClick={() => setActiveTab('policy')}
            className={`py-3 relative transition-colors ${
              activeTab === 'policy' ? 'text-emerald-900 font-bold' : 'text-stone-500 hover:text-stone-800'
            }`}
          >
            Cancellation Policy
            {activeTab === 'policy' && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-900" />}
          </button>

          <button
            onClick={() => setActiveTab('reviews')}
            className={`py-3 relative transition-colors ${
              activeTab === 'reviews' ? 'text-emerald-900 font-bold' : 'text-stone-500 hover:text-stone-800'
            }`}
          >
            Reviews ({transport.reviews.length})
            {activeTab === 'reviews' && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-900" />}
          </button>
        </div>

        {/* Tab Content (Scrollable) */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6 text-sm text-stone-700">
          
          {/* TAB 1: Route & Schedule */}
          {activeTab === 'schedule' && (
            <div className="space-y-6">
              {/* Boarding and Dropping Points */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-emerald-50/70 p-4 rounded-2xl border border-emerald-200/70">
                  <div className="flex items-center gap-2 text-emerald-900 font-bold text-xs uppercase tracking-wider mb-1">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>Boarding Point</span>
                  </div>
                  <h4 className="font-bold text-stone-900">{transport.originTerminal}</h4>
                  <p className="text-xs text-stone-600 mt-1">
                    Reporting time: 20 minutes prior to scheduled departure ({transport.departureTime}).
                  </p>
                </div>

                <div className="bg-amber-50/70 p-4 rounded-2xl border border-amber-200/70">
                  <div className="flex items-center gap-2 text-amber-900 font-bold text-xs uppercase tracking-wider mb-1">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>Dropping Point</span>
                  </div>
                  <h4 className="font-bold text-stone-900">{transport.destinationTerminal}</h4>
                  <p className="text-xs text-stone-600 mt-1">
                    Estimated arrival at {transport.arrivalTime}. Connects to local Cabs & Metro.
                  </p>
                </div>
              </div>

              {/* Full stops timeline */}
              <div>
                <h4 className="font-bold text-stone-900 text-xs uppercase tracking-wider mb-3">
                  Full Travel Stops & Route Timeline
                </h4>
                <div className="relative pl-6 space-y-4 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-stone-200">
                  {transport.routeStops.map((stop, i) => (
                    <div key={i} className="relative flex items-start justify-between text-xs">
                      <div className={`absolute -left-6 top-1 w-2.5 h-2.5 rounded-full border-2 border-white ${
                        i === 0 ? 'bg-emerald-700' : i === transport.routeStops.length - 1 ? 'bg-orange-600' : 'bg-stone-400'
                      }`} />
                      <div>
                        <span className="font-bold text-stone-900">{stop.station}</span>
                        {stop.haltMinutes && (
                          <span className="text-[11px] text-stone-400 ml-2">({stop.haltMinutes} min halt)</span>
                        )}
                      </div>
                      <span className="font-mono text-stone-500 font-medium">{stop.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Amenities */}
          {activeTab === 'amenities' && (
            <div className="space-y-4">
              <h4 className="font-bold text-stone-900 text-xs uppercase tracking-wider">
                Included Onboard Amenities
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {transport.amenities.map((amenity, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3 rounded-xl border border-stone-200 bg-stone-50/50">
                    <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                      <Check className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-semibold text-stone-800">{amenity}</span>
                  </div>
                ))}
              </div>

              <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 text-xs text-stone-600 space-y-1">
                <span className="font-bold text-stone-900 block">Operator Hygiene & Safety Guarantee</span>
                <p>All bedrolls are freshly laundered, coaches sanitized prior to departure, and emergency medical kits are stored in the primary cabin.</p>
              </div>
            </div>
          )}

          {/* TAB 3: Fare Breakdown */}
          {activeTab === 'fare' && (
            <div className="space-y-4">
              <h4 className="font-bold text-stone-900 text-xs uppercase tracking-wider">
                Transparent Fare Breakdown
              </h4>
              <div className="bg-stone-50 rounded-2xl p-4 border border-stone-200 space-y-2 text-xs">
                <div className="flex justify-between py-1 border-b border-stone-200/70">
                  <span className="text-stone-600">Base Ticket Fare</span>
                  <span className="font-medium text-stone-900">₹{transport.fareBreakdown.baseFare.toLocaleString()}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-stone-200/70">
                  <span className="text-stone-600">Operator Reservation & Maintenance Fee</span>
                  <span className="font-medium text-stone-900">₹{transport.fareBreakdown.operatorFee.toLocaleString()}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-stone-200/70">
                  <span className="text-stone-600">Applicable GST & Transit Cess (5%)</span>
                  <span className="font-medium text-stone-900">₹{transport.fareBreakdown.taxesAndGst.toLocaleString()}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-stone-200/70">
                  <span className="text-stone-600">Convenience & Platform Fee</span>
                  <span className="font-medium text-stone-900">₹{transport.fareBreakdown.convenienceFee.toLocaleString()}</span>
                </div>
                <div className="flex justify-between pt-2 text-sm font-bold text-stone-900">
                  <span>Fare per Traveler</span>
                  <span className="text-emerald-900">₹{transport.fareBreakdown.totalPerPerson.toLocaleString()}</span>
                </div>
              </div>

              {passengersCount > 1 && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between text-xs">
                  <span className="font-semibold text-emerald-950">
                    Total for {passengersCount} Travelers:
                  </span>
                  <span className="text-base font-extrabold text-emerald-950">
                    ₹{totalFare.toLocaleString()}
                  </span>
                </div>
              )}
            </div>
          )}

          {/* TAB 4: Cancellation Policy */}
          {activeTab === 'policy' && (
            <div className="space-y-4">
              <h4 className="font-bold text-stone-900 text-xs uppercase tracking-wider">
                Cancellation & Refund Guidelines
              </h4>
              <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 space-y-3 text-xs">
                <p className="text-stone-800 font-medium">
                  {transport.cancellationPolicy}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2 border-t border-stone-200">
                  <div className="p-2.5 bg-white rounded-xl border border-stone-100">
                    <span className="font-bold text-emerald-800 block">&gt; 24h prior</span>
                    <span className="text-stone-500 text-[11px]">Up to 90% Refund</span>
                  </div>
                  <div className="p-2.5 bg-white rounded-xl border border-stone-100">
                    <span className="font-bold text-amber-700 block">12h - 24h prior</span>
                    <span className="text-stone-500 text-[11px]">50% Refund</span>
                  </div>
                  <div className="p-2.5 bg-white rounded-xl border border-stone-100">
                    <span className="font-bold text-rose-700 block">&lt; 6h prior</span>
                    <span className="text-stone-500 text-[11px]">No Refund</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: Reviews */}
          {activeTab === 'reviews' && (
            <div className="space-y-4">
              <h4 className="font-bold text-stone-900 text-xs uppercase tracking-wider">
                Recent Traveler Reviews
              </h4>
              <div className="space-y-3">
                {transport.reviews.map((rev) => (
                  <div key={rev.id} className="p-4 rounded-2xl border border-stone-200 bg-stone-50/40 space-y-1.5 text-xs">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-emerald-800 text-amber-200 flex items-center justify-center font-bold text-[10px]">
                          {rev.userName.charAt(0)}
                        </div>
                        <span className="font-bold text-stone-900">{rev.userName}</span>
                      </div>
                      <div className="flex items-center gap-1 text-amber-500 font-bold">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                        <span>{rev.rating}</span>
                        <span className="text-stone-400 font-normal ml-1">· {rev.date}</span>
                      </div>
                    </div>
                    <p className="text-stone-600 leading-relaxed">{rev.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Footer CTA */}
        <div className="p-5 border-t border-stone-200 bg-white flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <span className="text-xs text-stone-500 block">
              Total ({passengersCount} {passengersCount > 1 ? 'travelers' : 'traveler'}):
            </span>
            <span className="text-2xl font-black text-emerald-950">
              ₹{totalFare.toLocaleString()}
            </span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-stone-300 text-stone-700 font-semibold text-xs hover:bg-stone-50 transition-colors"
            >
              Close
            </button>
            <button
              onClick={() => {
                onBook(transport);
                onClose();
              }}
              className="flex-1 sm:flex-initial px-6 py-2.5 bg-emerald-900 hover:bg-emerald-800 active:scale-95 text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center justify-center gap-1.5"
            >
              <span>Book & Add Last-Mile</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
