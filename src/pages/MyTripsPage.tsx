import { useState } from 'react';
import { 
  Calendar, 
  MapPin, 
  Train, 
  Bus, 
  Plane, 
  Car, 
  QrCode, 
  CheckCircle2, 
  Clock, 
  ArrowRight, 
  Download, 
  X, 
  AlertCircle,
  Building,
  RotateCcw,
  Sparkles,
  Info
} from 'lucide-react';
import { BookingRecord } from '../types/travel';
import { SAMPLE_BOOKINGS } from '../data/mockTravelData';

interface MyTripsPageProps {
  bookings: BookingRecord[];
  onCancelBooking: (bookingId: string) => void;
  onNavigate: (page: string) => void;
}

export function MyTripsPage({
  bookings,
  onCancelBooking,
  onNavigate
}: MyTripsPageProps) {
  const [activeTab, setActiveTab] = useState<'all' | 'Confirmed' | 'Completed' | 'Cancelled'>('all');
  const [ticketModalBooking, setTicketModalBooking] = useState<BookingRecord | null>(null);
  const [cancelModalBooking, setCancelModalBooking] = useState<BookingRecord | null>(null);
  const [actionSuccessMessage, setActionSuccessMessage] = useState<string | null>(null);

  const filteredBookings = bookings.filter((b) => {
    if (activeTab === 'all') return true;
    return b.status === activeTab;
  });

  const getStatusBadge = (status: BookingRecord['status']) => {
    switch (status) {
      case 'Confirmed':
        return (
          <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
            <span>Confirmed</span>
          </span>
        );
      case 'Completed':
        return (
          <span className="text-[11px] font-semibold text-stone-700 bg-stone-100 border border-stone-200 px-2.5 py-0.5 rounded-full">
            Completed
          </span>
        );
      case 'Cancelled':
        return (
          <span className="text-[11px] font-semibold text-rose-700 bg-rose-50 border border-rose-200 px-2.5 py-0.5 rounded-full">
            Cancelled
          </span>
        );
    }
  };

  const handleConfirmCancel = () => {
    if (cancelModalBooking) {
      onCancelBooking(cancelModalBooking.id);
      setActionSuccessMessage(`Booking ${cancelModalBooking.bookingRef} has been cancelled. Refund initiated.`);
      setCancelModalBooking(null);
      setTimeout(() => setActionSuccessMessage(null), 4000);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] pb-24">
      
      {/* Header bar */}
      <div className="bg-white border-b border-stone-200/80 shadow-xs">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                Traveler Dashboard
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight mt-0.5">
                My Trips & Tickets
              </h1>
              <p className="text-xs sm:text-sm text-stone-500 mt-1">
                Manage upcoming itineraries, view boarding passes, and download receipts.
              </p>
            </div>

            <button
              onClick={() => onNavigate('home')}
              className="self-start sm:self-auto px-4 py-2.5 bg-emerald-900 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center gap-1.5"
            >
              <span>Book New Journey</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Illustrative Demo Banner */}
      <div className="bg-amber-50/80 border-b border-amber-200/60 py-2 px-4 text-center">
        <div className="max-w-6xl mx-auto flex items-center justify-center gap-2 text-xs text-amber-900 font-medium">
          <Info className="w-3.5 h-3.5 text-amber-700 shrink-0" />
          <span>Demo Booking Records · Simulated interactive boarding passes and refund flows.</span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* Success toast notification */}
        {actionSuccessMessage && (
          <div className="mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-900 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>{actionSuccessMessage}</span>
            </div>
            <button onClick={() => setActionSuccessMessage(null)}>
              <X className="w-4 h-4 text-emerald-800" />
            </button>
          </div>
        )}

        {/* Status Filter Tabs */}
        <div className="flex items-center gap-2 mb-6 border-b border-stone-200 pb-3 overflow-x-auto text-xs font-semibold">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              activeTab === 'all' ? 'bg-emerald-900 text-white' : 'text-stone-600 hover:bg-stone-100'
            }`}
          >
            All Bookings ({bookings.length})
          </button>
          <button
            onClick={() => setActiveTab('Confirmed')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              activeTab === 'Confirmed' ? 'bg-emerald-900 text-white' : 'text-stone-600 hover:bg-stone-100'
            }`}
          >
            Upcoming Journeys
          </button>
          <button
            onClick={() => setActiveTab('Completed')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              activeTab === 'Completed' ? 'bg-emerald-900 text-white' : 'text-stone-600 hover:bg-stone-100'
            }`}
          >
            Past Trips
          </button>
          <button
            onClick={() => setActiveTab('Cancelled')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              activeTab === 'Cancelled' ? 'bg-emerald-900 text-white' : 'text-stone-600 hover:bg-stone-100'
            }`}
          >
            Cancelled
          </button>
        </div>

        {/* Trips List */}
        <div className="space-y-5">
          {filteredBookings.length === 0 ? (
            <div className="bg-white rounded-2xl border border-stone-200 p-12 text-center">
              <Calendar className="w-10 h-10 text-stone-300 mx-auto mb-3" />
              <h3 className="font-bold text-stone-900 text-base">No bookings found</h3>
              <p className="text-xs text-stone-500 mt-1">There are no trips matching this status tab.</p>
              <button
                onClick={() => onNavigate('home')}
                className="mt-4 px-4 py-2 bg-emerald-900 text-white text-xs font-bold rounded-xl"
              >
                Plan a Trip
              </button>
            </div>
          ) : (
            filteredBookings.map((booking) => (
              <div
                key={booking.id}
                className="bg-white rounded-2xl border border-stone-200/90 shadow-xs hover:shadow-md transition-all p-6 space-y-4"
              >
                {/* Header: Ref & Status */}
                <div className="flex flex-wrap items-center justify-between pb-3.5 border-b border-stone-100 gap-2">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs font-bold text-stone-900">
                      {booking.bookingRef}
                    </span>
                    <span className="text-xs text-stone-400">· Booked {booking.createdAt}</span>
                  </div>

                  <div className="flex items-center gap-3">
                    {getStatusBadge(booking.status)}
                    <span className="text-sm font-extrabold text-stone-900">
                      ₹{booking.totalAmount.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Journey Timeline */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                  
                  {/* Transport summary */}
                  <div className="md:col-span-8 space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-800 flex items-center justify-center font-bold">
                        {booking.transport.transportType === 'train' && <Train className="w-4 h-4" />}
                        {booking.transport.transportType === 'bus' && <Bus className="w-4 h-4" />}
                        {booking.transport.transportType === 'flight' && <Plane className="w-4 h-4" />}
                      </div>
                      <div>
                        <h4 className="font-bold text-stone-900 text-sm">
                          {booking.transport.operatorName} ({booking.transport.operatorCode})
                        </h4>
                        <p className="text-xs text-stone-500">
                          {booking.transport.seatingType} · Seats: {booking.seatNumbers.join(', ')} · {booking.pnrOrTicket}
                        </p>
                      </div>
                    </div>

                    {/* Timeline visualization */}
                    <div className="flex items-center justify-between bg-stone-50/70 p-3.5 rounded-xl border border-stone-200/70 text-xs">
                      <div>
                        <span className="font-bold text-stone-900 block text-sm">
                          {booking.transport.departureTime}
                        </span>
                        <span className="font-semibold text-stone-700">{booking.origin}</span>
                        <span className="text-[11px] text-stone-400 block">{booking.date}</span>
                      </div>

                      <div className="flex flex-col items-center px-4">
                        <span className="text-[11px] text-stone-500 mb-0.5">{booking.transport.duration}</span>
                        <div className="w-24 sm:w-36 h-0.5 bg-stone-300 relative">
                          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-emerald-800" />
                        </div>
                        <span className="text-[10px] text-emerald-700 mt-0.5 font-medium">Direct</span>
                      </div>

                      <div className="text-right">
                        <span className="font-bold text-stone-900 block text-sm">
                          {booking.transport.arrivalTime}
                        </span>
                        <span className="font-semibold text-stone-700">{booking.destination}</span>
                        <span className="text-[11px] text-stone-400 block">{booking.date}</span>
                      </div>
                    </div>

                    {/* Stitched Last-Mile & Hotel preview */}
                    <div className="flex flex-wrap gap-2 text-xs">
                      {booking.lastMile && (
                        <div className="flex items-center gap-1.5 px-3 py-1 bg-stone-100 rounded-lg text-stone-700">
                          <Car className="w-3.5 h-3.5 text-emerald-700" />
                          <span>Last-Mile: {booking.lastMile.title} (Prepaid)</span>
                        </div>
                      )}
                      {booking.hotel && (
                        <div className="flex items-center gap-1.5 px-3 py-1 bg-stone-100 rounded-lg text-stone-700">
                          <Building className="w-3.5 h-3.5 text-orange-600" />
                          <span>Stay: {booking.hotel.name}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Actions column */}
                  <div className="md:col-span-4 flex flex-col sm:flex-row md:flex-col gap-2 justify-end">
                    <button
                      onClick={() => setTicketModalBooking(booking)}
                      className="px-4 py-2.5 bg-emerald-900 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1.5"
                    >
                      <QrCode className="w-4 h-4 text-amber-300" />
                      <span>View Digital Ticket</span>
                    </button>

                    {booking.status === 'Confirmed' && (
                      <button
                        onClick={() => setCancelModalBooking(booking)}
                        className="px-4 py-2 rounded-xl border border-stone-300 hover:border-rose-400 text-stone-600 hover:text-rose-700 text-xs font-semibold bg-white transition-colors"
                      >
                        Manage / Cancel Booking
                      </button>
                    )}
                  </div>

                </div>
              </div>
            ))
          )}
        </div>

      </div>

      {/* Digital Ticket Modal */}
      {ticketModalBooking && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
          <div 
            className="bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Ticket header */}
            <div className="bg-emerald-950 text-white p-6 text-center relative">
              <button
                onClick={() => setTicketModalBooking(null)}
                className="absolute top-4 right-4 text-stone-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
              <span className="text-[11px] font-bold text-amber-300 uppercase tracking-widest block">
                Official E-Boarding Pass
              </span>
              <h3 className="text-xl font-extrabold mt-1">TripGenie Multimodal Pass</h3>
              <p className="text-xs text-emerald-300 font-mono mt-0.5">REF: {ticketModalBooking.bookingRef}</p>
            </div>

            {/* Ticket body with perforated notches */}
            <div className="p-6 space-y-5 text-xs text-stone-700 relative">
              <div className="grid grid-cols-2 gap-4 pb-4 border-b border-stone-200">
                <div>
                  <span className="text-stone-400 block text-[10px] uppercase">Passenger</span>
                  <span className="font-bold text-stone-900 text-sm">{ticketModalBooking.passengerName}</span>
                </div>
                <div className="text-right">
                  <span className="text-stone-400 block text-[10px] uppercase">PNR / Ticket No</span>
                  <span className="font-mono font-bold text-stone-900 text-sm">{ticketModalBooking.pnrOrTicket}</span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center py-2 bg-stone-50 rounded-xl p-3 border border-stone-100">
                <div className="text-left">
                  <span className="text-[10px] text-stone-400 block">DEPARTURE</span>
                  <span className="font-bold text-sm text-stone-900">{ticketModalBooking.transport.departureTime}</span>
                  <span className="text-[10px] text-stone-500 block">{ticketModalBooking.origin}</span>
                </div>
                <div>
                  <span className="text-[10px] text-stone-400 block">JOURNEY</span>
                  <span className="font-bold text-xs text-emerald-800">{ticketModalBooking.transport.duration}</span>
                  <span className="text-[10px] text-stone-500 block">{ticketModalBooking.transport.operatorName.split(' ')[0]}</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-stone-400 block">ARRIVAL</span>
                  <span className="font-bold text-sm text-stone-900">{ticketModalBooking.transport.arrivalTime}</span>
                  <span className="text-[10px] text-stone-500 block">{ticketModalBooking.destination}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-stone-400 block text-[10px] uppercase">Seats Assigned</span>
                  <span className="font-bold text-stone-900">{ticketModalBooking.seatNumbers.join(', ')}</span>
                </div>
                <div className="text-right">
                  <span className="text-stone-400 block text-[10px] uppercase">Date of Travel</span>
                  <span className="font-bold text-stone-900">{ticketModalBooking.date}</span>
                </div>
              </div>

              {/* QR Code Container */}
              <div className="pt-4 border-t border-dashed border-stone-300 flex flex-col items-center justify-center text-center">
                <div className="w-36 h-36 bg-stone-100 border border-stone-300 rounded-2xl flex items-center justify-center p-3 shadow-inner">
                  {/* Decorative High-density QR simulation */}
                  <div className="grid grid-cols-6 gap-1 w-full h-full p-2 bg-white rounded-lg">
                    {Array.from({ length: 36 }).map((_, i) => (
                      <div
                        key={i}
                        className={`rounded-xs ${
                          (i % 2 === 0 || i % 5 === 0) && i !== 7 ? 'bg-stone-900' : 'bg-transparent'
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-[11px] text-stone-400 mt-2">
                  Scan at station automated gates or show to train ticket examiner (TTE)
                </p>
              </div>
            </div>

            {/* Ticket Footer Actions */}
            <div className="p-4 bg-stone-50 border-t border-stone-200 flex items-center justify-between">
              <span className="text-xs font-bold text-stone-900">
                Paid: ₹{ticketModalBooking.totalAmount.toLocaleString()}
              </span>
              <button
                onClick={() => {
                  alert('Boarding pass downloaded as PDF (Demo simulation).');
                  setTicketModalBooking(null);
                }}
                className="px-4 py-2 bg-emerald-900 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 hover:bg-emerald-800 transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Pass (PDF)</span>
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Cancel Confirmation Modal */}
      {cancelModalBooking && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-md rounded-3xl p-6 shadow-2xl border border-stone-200 space-y-4">
            <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center">
              <AlertCircle className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-stone-900">Cancel Booking {cancelModalBooking.bookingRef}?</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Are you sure you want to cancel your trip from {cancelModalBooking.origin} to {cancelModalBooking.destination}? As per operator policy, 90% refund (₹{(cancelModalBooking.totalAmount * 0.9).toFixed(0)}) will be credited to your original payment method within 2 hours.
            </p>

            <div className="pt-2 flex items-center gap-3 justify-end">
              <button
                onClick={() => setCancelModalBooking(null)}
                className="px-4 py-2 rounded-xl border border-stone-300 text-xs font-semibold text-stone-700 hover:bg-stone-50"
              >
                Keep Booking
              </button>
              <button
                onClick={handleConfirmCancel}
                className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors"
              >
                Confirm Cancellation
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
