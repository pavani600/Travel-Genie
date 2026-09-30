import { ArrowLeft, Check, Sparkles } from 'lucide-react';
import { BookingStatus } from '../../types/travel';

export interface BookingStepperProps {
  currentStep: number;
  maxReachedStep: number;
  onNavigateStep: (stepNumber: number) => void;
  onGoBack: () => void;
  canGoBack: boolean;
  backLabel?: string;
  status: BookingStatus;
}

const STEPS = [
  { step: 1, label: 'Search', shortLabel: 'Search' },
  { step: 2, label: 'Main Transport', shortLabel: 'Transport' },
  { step: 3, label: 'Local Transit', shortLabel: 'Transit' },
  { step: 4, label: 'Hotel Stay', shortLabel: 'Hotel' },
  { step: 5, label: 'Journey Review', shortLabel: 'Review' },
  { step: 6, label: 'Passengers', shortLabel: 'Passengers' },
  { step: 7, label: 'Payment', shortLabel: 'Payment' },
  { step: 8, label: 'Confirmation', shortLabel: 'Confirmed' }
];

export function BookingStepper({
  currentStep,
  maxReachedStep,
  onNavigateStep,
  onGoBack,
  canGoBack,
  backLabel = 'Back',
  status
}: BookingStepperProps) {
  return (
    <div className="bg-white border-b border-stone-200/90 shadow-xs sticky top-18 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          
          {/* Left: Visible Back Button & Status */}
          <div className="flex items-center gap-3">
            {canGoBack && (
              <button
                type="button"
                onClick={onGoBack}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-stone-300 hover:border-emerald-800 text-stone-700 hover:text-emerald-950 font-bold text-xs bg-stone-50 hover:bg-white transition-all shadow-2xs active:scale-95 group"
                title="Return to previous step without losing selections"
              >
                <ArrowLeft className="w-4 h-4 text-emerald-800 group-hover:-translate-x-0.5 transition-transform" />
                <span>{backLabel}</span>
              </button>
            )}

            <div className="flex items-center gap-2">
              <span className="text-[11px] font-semibold text-stone-500 hidden sm:inline">Booking Status:</span>
              <span className={`text-[11px] font-bold px-2 py-0.5 rounded-md border ${
                status === 'Confirmed'
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                  : status === 'Payment Processing'
                  ? 'bg-amber-50 text-amber-800 border-amber-300 animate-pulse'
                  : status === 'Awaiting Payment'
                  ? 'bg-sky-50 text-sky-800 border-sky-300'
                  : 'bg-stone-100 text-stone-700 border-stone-200'
              }`}>
                {status}
              </span>
            </div>
          </div>

          {/* Right: Stepper Bar */}
          <div className="flex items-center overflow-x-auto py-1 scrollbar-none gap-1 sm:gap-1.5">
            {STEPS.map((s, index) => {
              const isCurrent = s.step === currentStep;
              const isCompleted = s.step < currentStep || (maxReachedStep >= s.step && !isCurrent);
              const isClickable = s.step <= maxReachedStep && s.step !== currentStep;

              return (
                <div key={s.step} className="flex items-center">
                  <button
                    type="button"
                    disabled={!isClickable}
                    onClick={() => isClickable && onNavigateStep(s.step)}
                    className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                      isCurrent
                        ? 'bg-emerald-900 text-white shadow-xs font-bold'
                        : isCompleted
                        ? 'bg-emerald-50 text-emerald-900 hover:bg-emerald-100 cursor-pointer'
                        : 'text-stone-400 bg-stone-100/60 cursor-not-allowed opacity-60'
                    }`}
                  >
                    <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold ${
                      isCurrent 
                        ? 'bg-amber-400 text-emerald-950' 
                        : isCompleted 
                        ? 'bg-emerald-800 text-white' 
                        : 'bg-stone-300 text-stone-600'
                    }`}>
                      {isCompleted && !isCurrent ? <Check className="w-2.5 h-2.5 stroke-[3]" /> : s.step}
                    </span>
                    <span className="hidden lg:inline text-[11px]">{s.label}</span>
                    <span className="lg:hidden text-[11px]">{s.shortLabel}</span>
                  </button>

                  {index < STEPS.length - 1 && (
                    <span className={`mx-0.5 sm:mx-1 text-[10px] ${
                      s.step < currentStep ? 'text-emerald-700 font-bold' : 'text-stone-300'
                    }`}>
                      →
                    </span>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </div>
  );
}
