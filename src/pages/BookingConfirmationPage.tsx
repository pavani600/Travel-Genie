import { 
  CheckCircle2, 
  Download, 
  QrCode, 
  Train, 
  Bus, 
  Plane, 
  Car, 
  Building, 
  MapPin, 
  Calendar, 
  Clock, 
  Share2, 
  ArrowRight,
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import { BookingRecord } from '../types/travel';

interface BookingConfirmationPageProps {
  booking: BookingRecord;
  onViewMyTrips: () => void;
  onBookAnother: () => void;
}

export function BookingConfirmationPage({
  booking,
  onViewMyTrips,
  onBookAnother
}: BookingConfirmationPageProps) {
  const handleDownload = () => {
    alert(`E-Ticket for booking ${booking.bookingRef} downloaded as PDF (Demo).`);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] pb-24">
      
      {/* Success Top Banner */}
      <div className="bg-emerald-900 text-white py-12 px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
        
        <div className="relative z-10 max-w-3xl mx-auto space-y-3">
          <div className="w-14 h-14 rounded-2xl bg-emerald-800 border-2 border-emerald-500/50 text-amber-300 flex items-center justify-center mx-auto shadow-md">
            <CheckCircle2 className="w-8 h-8 text-amber-300" />
          </div>

          <span className="text-xs font-bold uppercase tracking-widest text-emerald-300">
            Booking Confirmed &amp; Seats Allocated
          </span>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            You're All Set for {booking.destination.split(' ')[0]}!
          </h1>

          <p className="text-xs sm:text-sm text-stone-200 font-mono">
            Booking Reference: <strong className="text-amber-300 font-bold">{booking.bookingRef}</strong> · {booking.pnrOrTicket}
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={handleDownload}
              className="px-4 py-2 bg-white text-stone-900 hover:bg-stone-100 rounded-xl text-xs font-bold shadow-xs flex items-center gap-1.5 transition-colors"
            >
              <Download className="w-4 h-4 text-emerald-800" />
              <span>Download E-Ticket (PDF)</span>
            </button>

            <button
              type="button"
              onClick={onViewMyTrips}
              className="px-4 py-2 bg-emerald-800 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-xs flex items-center gap-1.5 transition-colors"
            >
              <span>View in My Trips</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        
        {/* Ticket Summary Card with Perforated Edge */}
        <div className="bg-white rounded-3xl border border-stone-200/90 shadow-xl overflow-hidden">
          
          <div className="p-6 sm:p-8 space-y-6">
            
            {/* Header row */}
            <div className="flex flex-wrap items-center justify-between pb-4 border-b border-stone-100 gap-3">
              <div>
                <span className="text-xs text-stone-400 block">Primary Passenger</span>
                <span className="text-base font-bold text-stone-900">{booking.passengerName}</span>
                <span className="text-xs text-stone-500 block">
                  {booking.passengersCount} {booking.passengersCount > 1 ? 'Travelers' : 'Traveler'} · Seats: {booking.seatNumbers.join(', ')}
                </span>
              </div>

              <div className="text-right">
                <span className="text-xs text-stone-400 block">Amount Paid (All Inclusive)</span>
                <span className="text-2xl font-black text-emerald-950">₹{booking.totalAmount.toLocaleString()}</span>
                <span className="text-[11px] text-emerald-800 font-semibold block">Payment Successful</span>
              </div>
            </div>

            {/* Main Transport Highlight */}
            <div className="bg-stone-50 p-4 sm:p-5 rounded-2xl border border-stone-200/80 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-emerald-800 text-amber-300 flex items-center justify-center font-bold">
                    {booking.transport.transportType === 'train' && <Train className="w-4 h-4" />}
                    {booking.transport.transportType === 'bus' && <Bus className="w-4 h-4" />}
                    {booking.transport.transportType === 'flight' && <Plane className="w-4 h-4" />}
                  </div>
                  <div>
                    <h4 className="font-bold text-stone-900 text-sm">
                      {booking.transport.operatorName} ({booking.transport.operatorCode})
                    </h4>
                    <span className="text-xs text-stone-500">{booking.selectedClassName || booking.transport.seatingType}</span>
                  </div>
                </div>

                <span className="text-xs font-mono font-bold text-emerald-900 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                  {booking.pnrOrTicket}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center pt-2 border-t border-stone-200/60 text-xs">
                <div className="text-left">
                  <span className="text-stone-400 text-[10px] block">DEPARTURE</span>
                  <span className="font-bold text-stone-900 text-sm">{booking.transport.departureTime}</span>
                  <span className="text-stone-600 block text-[11px] truncate">{booking.origin}</span>
                </div>
                <div>
                  <span className="text-stone-400 text-[10px] block">DURATION</span>
                  <span className="font-semibold text-emerald-800">{booking.transport.duration}</span>
                  <span className="text-[10px] text-stone-400 block">{booking.date}</span>
                </div>
                <div className="text-right">
                  <span className="text-stone-400 text-[10px] block">ARRIVAL</span>
                  <span className="font-bold text-stone-900 text-sm">{booking.transport.arrivalTime}</span>
                  <span className="text-stone-600 block text-[11px] truncate">{booking.destination}</span>
                </div>
              </div>
            </div>

            {/* Connected Local Transit & Hotel Stays */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              {booking.lastMile ? (
                <div className="p-4 rounded-2xl border border-stone-200 bg-stone-50/50 space-y-1">
                  <div className="flex items-center gap-2 text-stone-900 font-bold">
                    <Car className="w-4 h-4 text-orange-600" />
                    <span>Station/Airport Transfer</span>
                  </div>
                  <p className="text-stone-700 font-semibold">{booking.lastMile.title}</p>
                  <p className="text-stone-500 text-[11px]">
                    Pickup: {booking.localTransportDetails?.pickup || booking.lastMile.pickupPoint}
                  </p>
                  <p className="text-stone-500 text-[11px]">
                    Drop: {booking.localTransportDetails?.drop || 'Destination Hotel'}
                  </p>
                </div>
              ) : (
                <div className="p-4 rounded-2xl border border-stone-200 bg-stone-50/30 text-stone-400">
                  No local transit booked
                </div>
              )}

              {booking.hotel ? (
                <div className="p-4 rounded-2xl border border-stone-200 bg-stone-50/50 space-y-1">
                  <div className="flex items-center gap-2 text-stone-900 font-bold">
                    <Building className="w-4 h-4 text-emerald-800" />
                    <span>Hotel Reservation</span>
                  </div>
                  <p className="text-stone-700 font-semibold">{booking.hotel.name}</p>
                  <p className="text-stone-500 text-[11px]">
                    {booking.hotel.roomType} · {booking.hotelDetails?.nights || 2} Nights
                  </p>
                  <p className="text-stone-500 text-[11px]">
                    {booking.hotel.location}
                  </p>
                </div>
              ) : (
                <div className="p-4 rounded-2xl border border-stone-200 bg-stone-50/30 text-stone-400">
                  No hotel stay included
                </div>
              )}
            </div>

            {/* QR Code Boarding Validation */}
            <div className="pt-4 border-t border-dashed border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="space-y-1 text-center sm:text-left">
                <span className="text-xs font-bold text-stone-900 block">Boarding Pass QR Code</span>
                <p className="text-xs text-stone-500 max-w-sm">
                  Present this QR code at the station automated smart gates or show to train/flight conductor along with passenger photo ID.
                </p>
              </div>

              <div className="w-28 h-28 bg-stone-50 border border-stone-200 rounded-2xl p-2.5 flex items-center justify-center shrink-0">
                <div className="grid grid-cols-5 gap-1 w-full h-full bg-white p-1 rounded-lg">
                  {Array.from({ length: 25 }).map((_, i) => (
                    <div
                      key={i}
                      className={`rounded-xs ${
                        (i % 2 === 0 || i % 3 === 0) && i !== 6 ? 'bg-stone-900' : 'bg-transparent'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

          </div>

          {/* Card Footer */}
          <div className="bg-stone-50 border-t border-stone-200 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs text-stone-500">
              Trip details synced with your account dashboard.
            </span>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onBookAnother}
                className="px-4 py-2 rounded-xl border border-stone-300 text-stone-700 hover:bg-white text-xs font-bold transition-colors"
              >
                Plan Another Trip
              </button>
              <button
                type="button"
                onClick={onViewMyTrips}
                className="px-5 py-2.5 bg-emerald-900 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold shadow-xs transition-colors"
              >
                Go to My Trips
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
