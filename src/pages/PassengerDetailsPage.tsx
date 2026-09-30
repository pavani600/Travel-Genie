import { useState } from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  ShieldCheck, 
  ArrowLeft, 
  ArrowRight, 
  Plus, 
  Trash2, 
  Info, 
  HeartHandshake,
  CheckCircle2
} from 'lucide-react';
import { PassengerDetail, ContactInfo, DynamicFareBreakdown } from '../types/travel';

interface PassengerDetailsPageProps {
  passengers: PassengerDetail[];
  contactInfo: ContactInfo;
  includeInsurance: boolean;
  fareBreakdown: DynamicFareBreakdown;
  onUpdatePassengers: (passengers: PassengerDetail[]) => void;
  onUpdateContactInfo: (contact: ContactInfo) => void;
  onToggleInsurance: (include: boolean) => void;
  onProceedToPayment: () => void;
  onGoBack: () => void;
  isEditingFromReview?: boolean;
  onReturnToReview?: () => void;
}

export function PassengerDetailsPage({
  passengers,
  contactInfo,
  includeInsurance,
  fareBreakdown,
  onUpdatePassengers,
  onUpdateContactInfo,
  onToggleInsurance,
  onProceedToPayment,
  onGoBack,
  isEditingFromReview = false,
  onReturnToReview
}: PassengerDetailsPageProps) {
  const [localPassengers, setLocalPassengers] = useState<PassengerDetail[]>(passengers);
  const [email, setEmail] = useState(contactInfo.email);
  const [phone, setPhone] = useState(contactInfo.phone);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handlePassengerChange = (index: number, field: keyof PassengerDetail, value: any) => {
    const updated = [...localPassengers];
    updated[index] = { ...updated[index], [field]: value };
    setLocalPassengers(updated);
    onUpdatePassengers(updated);
  };

  const handleAddPassenger = () => {
    const newPax: PassengerDetail = {
      id: `pax-${Date.now()}`,
      fullName: '',
      age: 28,
      gender: 'Male',
      seatPreference: 'Window'
    };
    const updated = [...localPassengers, newPax];
    setLocalPassengers(updated);
    onUpdatePassengers(updated);
  };

  const handleRemovePassenger = (index: number) => {
    if (localPassengers.length <= 1) return;
    const updated = localPassengers.filter((_, i) => i !== index);
    setLocalPassengers(updated);
    onUpdatePassengers(updated);
  };

  const validateAndProceed = () => {
    const newErrors: Record<string, string> = {};
    if (!email.trim() || !email.includes('@')) {
      newErrors.email = 'Valid email is required for e-ticket delivery';
    }
    if (!phone.trim() || phone.length < 8) {
      newErrors.phone = 'Valid phone number is required for SMS boarding alerts';
    }

    localPassengers.forEach((p, idx) => {
      if (!p.fullName.trim()) {
        newErrors[`name-${idx}`] = `Passenger ${idx + 1} name is required`;
      }
      if (!p.age || p.age < 1 || p.age > 120) {
        newErrors[`age-${idx}`] = `Valid age required`;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    onUpdateContactInfo({ email, phone });
    onUpdatePassengers(localPassengers);

    if (isEditingFromReview && onReturnToReview) {
      onReturnToReview();
    } else {
      onProceedToPayment();
    }
  };

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
              <span>Back to Review</span>
            </button>
            <span className="text-xs font-bold text-emerald-900 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
              Step 6: Passenger Information
            </span>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <span className="text-stone-500">Payable Total:</span>
            <span className="text-base font-extrabold text-emerald-950">₹{fareBreakdown.grandTotal.toLocaleString()}</span>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* Title */}
        <div className="mb-8">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
            Passenger Details
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight mt-1">
            Who is Traveling?
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 mt-1">
            Enter government-issued ID names for tickets, boarding passes, and emergency contacts.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Passenger List & Contact Forms */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Passenger Forms */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wider">
                  Traveler Details ({localPassengers.length})
                </h3>
                <button
                  type="button"
                  onClick={handleAddPassenger}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-xl border border-emerald-800/40 text-emerald-900 hover:bg-emerald-50 text-xs font-bold transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Another Traveler</span>
                </button>
              </div>

              {localPassengers.map((pax, idx) => (
                <div
                  key={pax.id}
                  className="bg-white rounded-2xl border border-stone-200/90 p-5 shadow-xs space-y-4 relative"
                >
                  <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                    <span className="text-xs font-bold text-stone-900 flex items-center gap-2">
                      <User className="w-4 h-4 text-emerald-800" />
                      <span>Traveler {idx + 1} {idx === 0 ? '(Primary Traveler)' : ''}</span>
                    </span>

                    {localPassengers.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemovePassenger(idx)}
                        className="text-stone-400 hover:text-rose-600 p-1 rounded-lg transition-colors"
                        title="Remove traveler"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 text-xs">
                    {/* Full Name */}
                    <div className="sm:col-span-6">
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-600 mb-1">
                        Full Name (as per Govt ID) *
                      </label>
                      <input
                        type="text"
                        value={pax.fullName}
                        onChange={(e) => handlePassengerChange(idx, 'fullName', e.target.value)}
                        placeholder="e.g. Sandya Pavani"
                        className={`w-full px-3 py-2 rounded-xl border bg-stone-50/50 text-xs text-stone-900 focus:outline-none focus:ring-1 focus:ring-emerald-800 ${
                          errors[`name-${idx}`] ? 'border-rose-400 bg-rose-50/30' : 'border-stone-200'
                        }`}
                      />
                      {errors[`name-${idx}`] && (
                        <span className="text-[10px] text-rose-600 mt-1 block">{errors[`name-${idx}`]}</span>
                      )}
                    </div>

                    {/* Age */}
                    <div className="sm:col-span-3">
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-600 mb-1">
                        Age *
                      </label>
                      <input
                        type="number"
                        min={1}
                        max={110}
                        value={pax.age}
                        onChange={(e) => handlePassengerChange(idx, 'age', Number(e.target.value))}
                        className="w-full px-3 py-2 rounded-xl border border-stone-200 bg-stone-50/50 text-xs text-stone-900 focus:outline-none focus:ring-1 focus:ring-emerald-800"
                      />
                    </div>

                    {/* Gender */}
                    <div className="sm:col-span-3">
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-600 mb-1">
                        Gender
                      </label>
                      <select
                        value={pax.gender}
                        onChange={(e) => handlePassengerChange(idx, 'gender', e.target.value as any)}
                        className="w-full px-3 py-2 rounded-xl border border-stone-200 bg-stone-50/50 text-xs text-stone-900 focus:outline-none cursor-pointer"
                      >
                        <option value="Female">Female</option>
                        <option value="Male">Male</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    {/* Seat Preference */}
                    <div className="sm:col-span-6">
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-600 mb-1">
                        Berth / Seat Preference
                      </label>
                      <select
                        value={pax.seatPreference}
                        onChange={(e) => handlePassengerChange(idx, 'seatPreference', e.target.value as any)}
                        className="w-full px-3 py-2 rounded-xl border border-stone-200 bg-stone-50/50 text-xs text-stone-900 focus:outline-none cursor-pointer"
                      >
                        <option value="Window">Window Seat</option>
                        <option value="Aisle">Aisle Seat</option>
                        <option value="Lower Berth">Lower Berth</option>
                        <option value="Upper Berth">Upper Berth</option>
                        <option value="No Preference">No Preference</option>
                      </select>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Primary Contact Details */}
            <div className="bg-white rounded-2xl border border-stone-200/90 p-5 shadow-xs space-y-4">
              <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wider flex items-center gap-2">
                <Mail className="w-4 h-4 text-emerald-800" />
                <span>Ticket Delivery & SMS Alerts</span>
              </h3>
              <p className="text-xs text-stone-500">
                Your digital boarding pass, PNR live status, and driver contact will be sent here.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-600 mb-1">
                    Email Address *
                  </label>
                  <div className="flex items-center gap-2 px-3 py-2 rounded-xl border border-stone-200 bg-stone-50/50 focus-within:border-emerald-800">
                    <Mail className="w-4 h-4 text-stone-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="pavanisandya15@gmail.com"
                      className="w-full bg-transparent text-xs text-stone-900 focus:outline-none"
                    />
                  </div>
                  {errors.email && <span className="text-[10px] text-rose-600 mt-1 block">{errors.email}</span>}
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-600 mb-1">
                    Mobile Number *
                  </label>
                  <div className="flex items-center gap-2 px-3 py-2 rounded-xl border border-stone-200 bg-stone-50/50 focus-within:border-emerald-800">
                    <Phone className="w-4 h-4 text-stone-400" />
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98480 22334"
                      className="w-full bg-transparent text-xs text-stone-900 focus:outline-none"
                    />
                  </div>
                  {errors.phone && <span className="text-[10px] text-rose-600 mt-1 block">{errors.phone}</span>}
                </div>
              </div>
            </div>

            {/* Travel Insurance Add-on */}
            <div className="bg-emerald-50/50 rounded-2xl border border-emerald-200/80 p-5 shadow-xs flex items-start gap-4">
              <div className="w-9 h-9 rounded-xl bg-emerald-800 text-amber-300 flex items-center justify-center shrink-0 mt-0.5">
                <ShieldCheck className="w-5 h-5 text-amber-300" />
              </div>
              <div className="flex-1 text-xs">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-emerald-950 text-sm">
                    TripGenie Passenger Travel Insurance
                  </h4>
                  <span className="font-extrabold text-emerald-900 text-xs">
                    +₹{fareBreakdown.insurancePerPerson}/traveler
                  </span>
                </div>
                <p className="text-stone-600 mt-1 leading-relaxed">
                  Covers baggage loss, accident hospitalization up to ₹2,50,000, and trip cancellation protection.
                </p>
                <div className="mt-3">
                  <label className="inline-flex items-center gap-2 cursor-pointer font-bold text-emerald-900">
                    <input
                      type="checkbox"
                      checked={includeInsurance}
                      onChange={(e) => onToggleInsurance(e.target.checked)}
                      className="rounded text-emerald-800 focus:ring-emerald-800 h-4 w-4"
                    />
                    <span>Yes, protect my journey ({localPassengers.length} travelers · ₹{fareBreakdown.insurancePerPerson * localPassengers.length})</span>
                  </label>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Dynamic Price Summary & Proceed CTA */}
          <div className="lg:col-span-4 bg-white rounded-2xl border border-stone-200/90 p-5 shadow-xs space-y-5 sticky top-36">
            <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wider pb-3 border-b border-stone-100">
              Price Breakdown
            </h3>

            <div className="space-y-2.5 text-xs text-stone-600">
              <div className="flex justify-between">
                <span>Transport ({localPassengers.length} pax)</span>
                <span className="font-medium text-stone-900">₹{fareBreakdown.transportTotal.toLocaleString()}</span>
              </div>

              {fareBreakdown.localTransportTotal > 0 && (
                <div className="flex justify-between">
                  <span>Local Transit Transfer</span>
                  <span className="font-medium text-stone-900">₹{fareBreakdown.localTransportTotal.toLocaleString()}</span>
                </div>
              )}

              {fareBreakdown.hotelTotal > 0 && (
                <div className="flex justify-between">
                  <span>Hotel Accommodation</span>
                  <span className="font-medium text-stone-900">₹{fareBreakdown.hotelTotal.toLocaleString()}</span>
                </div>
              )}

              {includeInsurance && (
                <div className="flex justify-between text-emerald-800">
                  <span>Travel Insurance</span>
                  <span className="font-medium">₹{fareBreakdown.insuranceTotal.toLocaleString()}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>GST (5%)</span>
                <span className="font-medium text-stone-900">₹{fareBreakdown.taxesAndGst.toLocaleString()}</span>
              </div>

              <div className="flex justify-between">
                <span>Platform Convenience Fee</span>
                <span className="font-medium text-stone-900">₹{fareBreakdown.convenienceFee.toLocaleString()}</span>
              </div>

              <div className="pt-3 border-t border-stone-200 flex justify-between text-sm font-extrabold text-stone-900">
                <span>Grand Total</span>
                <span className="text-xl text-emerald-950 font-black">₹{fareBreakdown.grandTotal.toLocaleString()}</span>
              </div>
            </div>

            <div className="pt-2 space-y-2">
              <button
                type="button"
                onClick={validateAndProceed}
                className="w-full py-3 bg-emerald-900 hover:bg-emerald-800 active:scale-[0.98] text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center justify-center gap-1.5"
              >
                <span>{isEditingFromReview ? 'Save & Return to Review' : 'Proceed to Payment'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={onGoBack}
                className="w-full py-2.5 rounded-xl border border-stone-300 text-stone-700 hover:bg-stone-50 font-semibold text-xs transition-colors"
              >
                Back to Review
              </button>
            </div>

            <div className="text-[11px] text-stone-400 text-center flex items-center justify-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
              <span>Zero cancellation fee on select routes</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
