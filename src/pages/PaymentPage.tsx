import { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  ShieldCheck, 
  Lock, 
  CreditCard, 
  Smartphone, 
  Building2, 
  AlertTriangle, 
  CheckCircle2, 
  RotateCw, 
  Info,
  Clock,
  Sparkles
} from 'lucide-react';
import { 
  DynamicFareBreakdown, 
  BookingStatus, 
  PassengerDetail, 
  TransportOption 
} from '../types/travel';

interface PaymentPageProps {
  fareBreakdown: DynamicFareBreakdown;
  passengers: PassengerDetail[];
  transport: TransportOption | null;
  status: BookingStatus;
  onPaymentSuccess: () => void;
  onPaymentFailure: (reason: string) => void;
  onGoBack: () => void;
  onReturnToReview: () => void;
  onUpdateFareDelta?: (delta: number) => void;
}

export function PaymentPage({
  fareBreakdown,
  passengers,
  transport,
  status,
  onPaymentSuccess,
  onPaymentFailure,
  onGoBack,
  onReturnToReview,
  onUpdateFareDelta
}: PaymentPageProps) {
  // Payment methods: 'upi' | 'card' | 'netbanking'
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'netbanking'>('upi');
  const [upiId, setUpiId] = useState('traveler@okhdfcbank');
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [cardExpiry, setCardExpiry] = useState('08/29');
  const [cardCvv, setCardCvv] = useState('•••');
  const [selectedBank, setSelectedBank] = useState('HDFC Bank');

  // Pre-payment live revalidation state
  const [isRevalidating, setIsRevalidating] = useState(true);
  const [revalidationDone, setRevalidationDone] = useState(false);
  const [hasPriceChanged, setHasPriceChanged] = useState(false);
  const [priceChangeAccepted, setPriceChangeAccepted] = useState(false);
  const [priceDelta, setPriceDelta] = useState(0);

  // Payment processing state
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Simulate live price & seat inventory check on load
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsRevalidating(false);
      setRevalidationDone(true);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  const handleSimulatePriceChange = () => {
    const delta = 150; // ₹150 operator surcharge
    setPriceDelta(delta);
    setHasPriceChanged(true);
    setPriceChangeAccepted(false);
    if (onUpdateFareDelta) {
      onUpdateFareDelta(delta);
    }
  };

  const handleAcceptPriceChange = () => {
    setPriceChangeAccepted(true);
  };

  const handleProcessPayment = () => {
    if (hasPriceChanged && !priceChangeAccepted) {
      setErrorMessage('Please accept the updated fare before proceeding with payment.');
      return;
    }

    if (isProcessing) return; // Prevent duplicate payment submissions

    setErrorMessage(null);
    setIsProcessing(true);

    // Simulate safe payment gateway processing
    setTimeout(() => {
      setIsProcessing(false);
      onPaymentSuccess();
    }, 1800);
  };

  const displayTotal = fareBreakdown.grandTotal + (hasPriceChanged && priceChangeAccepted ? priceDelta : 0);

  return (
    <div className="min-h-screen bg-[#FAF8F5] pb-24">
      
      {/* Context Step Bar */}
      <div className="bg-white border-b border-stone-200/80 py-4 shadow-xs">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              type="button"
              disabled={isProcessing}
              onClick={onGoBack}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-stone-300 hover:border-emerald-800 text-stone-700 hover:text-emerald-950 font-bold text-xs bg-stone-50 transition-colors disabled:opacity-50"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Passengers</span>
            </button>
            <span className="text-xs font-bold text-emerald-900 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
              Step 7: Secure Payment
            </span>
          </div>

          <button
            type="button"
            disabled={isProcessing}
            onClick={onReturnToReview}
            className="text-xs font-bold text-emerald-800 hover:text-emerald-950 underline"
          >
            Return to Review / Edit Selections
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-6">
        
        {/* Title */}
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
            Payment & Confirmation
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight mt-1">
            Complete Your Booking
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 mt-1">
            All transactions are 256-bit encrypted. No payment is finalized until inventory is locked.
          </p>
        </div>

        {/* 1. Pre-Payment Revalidation Banner */}
        {isRevalidating ? (
          <div className="bg-sky-50 border border-sky-200 rounded-2xl p-4 flex items-center gap-3 text-xs text-sky-900">
            <RotateCw className="w-4 h-4 text-sky-700 animate-spin shrink-0" />
            <div className="flex-1">
              <span className="font-bold block">Revalidating Live Inventory & Fare Rules...</span>
              <span className="text-sky-700 text-[11px]">Connecting to carrier dispatch server to ensure confirmed seats.</span>
            </div>
          </div>
        ) : revalidationDone && !hasPriceChanged ? (
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex items-center justify-between gap-3 text-xs text-emerald-950">
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
              <div>
                <span className="font-bold block">Live Inventory & Prices Verified</span>
                <span className="text-emerald-800 text-[11px]">
                  Seats locked for {transport?.operatorName || 'selected transport'} ({passengers.length} travelers) at original rate.
                </span>
              </div>
            </div>

            {/* Test Simulation Button */}
            <button
              type="button"
              onClick={handleSimulatePriceChange}
              className="text-[10px] font-bold px-2 py-1 bg-white border border-emerald-300 rounded-lg text-emerald-900 hover:bg-emerald-100/50 transition-colors"
              title="Click to test price change safety notice"
            >
              Simulate Price Change
            </button>
          </div>
        ) : null}

        {/* Price Change Safety Alert Banner */}
        {hasPriceChanged && (
          <div className="bg-amber-50 border border-amber-300 rounded-2xl p-5 text-xs text-amber-950 space-y-3 animate-in fade-in">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-sm text-amber-900">Operator Fare Update Notice</h4>
                <p className="text-stone-700 mt-1 leading-relaxed">
                  The operator updated peak travel surcharges by <strong>+₹{priceDelta}</strong>.
                  Before we process your payment, please accept the updated total or return to modify your transport selection.
                </p>
                <div className="mt-2 text-stone-800 font-medium">
                  Previous Total: <span className="line-through text-stone-500">₹{fareBreakdown.grandTotal.toLocaleString()}</span> → New Total: <span className="font-extrabold text-amber-950">₹{(fareBreakdown.grandTotal + priceDelta).toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2 border-t border-amber-200">
              {!priceChangeAccepted ? (
                <button
                  type="button"
                  onClick={handleAcceptPriceChange}
                  className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors"
                >
                  Accept Updated Price & Proceed
                </button>
              ) : (
                <span className="text-xs font-bold text-emerald-800 flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Price change accepted. You may now complete payment.</span>
                </span>
              )}
              <button
                type="button"
                onClick={onReturnToReview}
                className="px-3 py-2 rounded-xl border border-stone-300 text-stone-700 hover:bg-white text-xs font-semibold"
              >
                Change Selections
              </button>
            </div>
          </div>
        )}

        {errorMessage && (
          <div className="p-3.5 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl text-xs font-bold">
            {errorMessage}
          </div>
        )}

        {/* Payment Gateway Box */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          
          {/* Payment Method Selector */}
          <div className="md:col-span-8 bg-white rounded-2xl border border-stone-200/90 p-6 shadow-xs space-y-5">
            <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wider">
              Select Payment Method
            </h3>

            {/* Method Tabs */}
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setPaymentMethod('upi')}
                className={`p-3 rounded-xl border text-center transition-all ${
                  paymentMethod === 'upi'
                    ? 'border-emerald-800 bg-emerald-50/60 font-bold text-emerald-950 shadow-xs ring-1 ring-emerald-800'
                    : 'border-stone-200 text-stone-600 hover:bg-stone-50'
                }`}
              >
                <Smartphone className="w-5 h-5 mx-auto mb-1 text-emerald-800" />
                <span className="text-xs block">UPI / QR</span>
                <span className="text-[10px] text-stone-400">GPay, PhonePe</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={`p-3 rounded-xl border text-center transition-all ${
                  paymentMethod === 'card'
                    ? 'border-emerald-800 bg-emerald-50/60 font-bold text-emerald-950 shadow-xs ring-1 ring-emerald-800'
                    : 'border-stone-200 text-stone-600 hover:bg-stone-50'
                }`}
              >
                <CreditCard className="w-5 h-5 mx-auto mb-1 text-emerald-800" />
                <span className="text-xs block">Cards</span>
                <span className="text-[10px] text-stone-400">Visa, RuPay</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('netbanking')}
                className={`p-3 rounded-xl border text-center transition-all ${
                  paymentMethod === 'netbanking'
                    ? 'border-emerald-800 bg-emerald-50/60 font-bold text-emerald-950 shadow-xs ring-1 ring-emerald-800'
                    : 'border-stone-200 text-stone-600 hover:bg-stone-50'
                }`}
              >
                <Building2 className="w-5 h-5 mx-auto mb-1 text-emerald-800" />
                <span className="text-xs block">Net Banking</span>
                <span className="text-[10px] text-stone-400">All Indian Banks</span>
              </button>
            </div>

            {/* UPI Form */}
            {paymentMethod === 'upi' && (
              <div className="p-4 bg-stone-50 rounded-xl border border-stone-200/80 space-y-3 text-xs">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-600">
                  Virtual Payment Address (UPI ID)
                </label>
                <div className="flex items-center gap-2 px-3 py-2 bg-white rounded-xl border border-stone-200">
                  <input
                    type="text"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    placeholder="mobile@upi or user@okhdfcbank"
                    className="w-full bg-transparent text-xs text-stone-900 focus:outline-none font-medium"
                  />
                  <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                    Verified
                  </span>
                </div>
                <p className="text-[11px] text-stone-400">
                  You will receive a payment request notification on your UPI app to authorize ₹{displayTotal.toLocaleString()}.
                </p>
              </div>
            )}

            {/* Card Form */}
            {paymentMethod === 'card' && (
              <div className="p-4 bg-stone-50 rounded-xl border border-stone-200/80 space-y-3 text-xs">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-600 mb-1">
                    Card Number
                  </label>
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className="w-full px-3 py-2 bg-white rounded-xl border border-stone-200 font-mono text-xs"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-600 mb-1">
                      Expiry (MM/YY)
                    </label>
                    <input
                      type="text"
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      className="w-full px-3 py-2 bg-white rounded-xl border border-stone-200 font-mono text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-600 mb-1">
                      CVV
                    </label>
                    <input
                      type="password"
                      maxLength={4}
                      value={cardCvv}
                      onChange={(e) => setCardCvv(e.target.value)}
                      className="w-full px-3 py-2 bg-white rounded-xl border border-stone-200 font-mono text-xs"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Net Banking Form */}
            {paymentMethod === 'netbanking' && (
              <div className="p-4 bg-stone-50 rounded-xl border border-stone-200/80 space-y-3 text-xs">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-600">
                  Select Bank
                </label>
                <select
                  value={selectedBank}
                  onChange={(e) => setSelectedBank(e.target.value)}
                  className="w-full px-3 py-2 bg-white rounded-xl border border-stone-200 font-semibold text-xs"
                >
                  <option value="HDFC Bank">HDFC Bank</option>
                  <option value="State Bank of India">State Bank of India (SBI)</option>
                  <option value="ICICI Bank">ICICI Bank</option>
                  <option value="Axis Bank">Axis Bank</option>
                  <option value="Kotak Mahindra Bank">Kotak Mahindra Bank</option>
                </select>
              </div>
            )}

            <div className="pt-2 flex items-center justify-between text-[11px] text-stone-500">
              <span className="flex items-center gap-1">
                <Lock className="w-3.5 h-3.5 text-emerald-800" />
                <span>256-Bit SSL Secured Payment</span>
              </span>
              <span>PCI-DSS Level 1 Certified</span>
            </div>
          </div>

          {/* Right Summary & Confirm Pay Button */}
          <div className="md:col-span-4 bg-white rounded-2xl border border-stone-200/90 p-5 shadow-xs space-y-4">
            <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider pb-3 border-b border-stone-100">
              Final Amount
            </h4>

            <div className="space-y-2 text-xs text-stone-600">
              <div className="flex justify-between">
                <span>Calculated Total</span>
                <span className="font-semibold text-stone-900">₹{fareBreakdown.grandTotal.toLocaleString()}</span>
              </div>

              {hasPriceChanged && (
                <div className="flex justify-between text-amber-800 font-semibold">
                  <span>Fare Surcharge</span>
                  <span>+₹{priceDelta}</span>
                </div>
              )}

              <div className="pt-3 border-t border-stone-200 flex justify-between text-sm font-extrabold text-stone-900">
                <span>Final Payable</span>
                <span className="text-2xl text-emerald-950 font-black">₹{displayTotal.toLocaleString()}</span>
              </div>
            </div>

            <button
              type="button"
              disabled={isProcessing || isRevalidating || (hasPriceChanged && !priceChangeAccepted)}
              onClick={handleProcessPayment}
              className="w-full py-3.5 bg-emerald-900 hover:bg-emerald-800 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98] text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
            >
              {isProcessing ? (
                <>
                  <RotateCw className="w-4 h-4 animate-spin text-amber-300" />
                  <span>Processing Payment...</span>
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4 text-amber-300" />
                  <span>Pay ₹{displayTotal.toLocaleString()} & Confirm</span>
                </>
              )}
            </button>

            <button
              type="button"
              disabled={isProcessing}
              onClick={onReturnToReview}
              className="w-full py-2.5 rounded-xl border border-stone-300 text-stone-700 hover:bg-stone-50 font-semibold text-xs transition-colors"
            >
              Return to Review / Edit Selections
            </button>

            <p className="text-[10px] text-stone-400 text-center leading-relaxed">
              By confirming, you agree to operator cancellation policies and verified transit terms.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}
