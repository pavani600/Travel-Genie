import { Compass, ShieldCheck, HeartHandshake, Zap, ArrowUpRight } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="bg-stone-900 text-stone-300 border-t border-stone-800 text-sm">
      {/* Top Banner highlights */}
      <div className="border-b border-stone-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-emerald-900/60 border border-emerald-700/40 flex items-center justify-center text-emerald-400 shrink-0">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-semibold text-stone-100 text-sm">Multi-Modal Comparison</h4>
                <p className="text-xs text-stone-400 mt-0.5">Compare train, flight, bus and local cabs in one unified view.</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-emerald-900/60 border border-emerald-700/40 flex items-center justify-center text-emerald-400 shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-semibold text-stone-100 text-sm">Zero Hidden Fees</h4>
                <p className="text-xs text-stone-400 mt-0.5">Clear base fares, verified operator pricing, and taxes explained.</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-emerald-900/60 border border-emerald-700/40 flex items-center justify-center text-emerald-400 shrink-0">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-semibold text-stone-100 text-sm">AI Assistant Genie</h4>
                <p className="text-xs text-stone-400 mt-0.5">Custom personalized recommendations built for your exact budget.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main navigation links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-700 flex items-center justify-center">
                <Compass className="w-4 h-4 text-amber-300" />
              </div>
              <span className="text-lg font-bold tracking-tight text-white">
                TripGenie<span className="text-orange-500">.ai</span>
              </span>
            </div>
            <p className="text-xs text-stone-400 max-w-sm leading-relaxed">
              Your Journey. Your Budget. Your Way. Intelligently stitching long-distance transit, local last-mile shuttles, and curated hotel stays into one frictionless itinerary.
            </p>
            <div className="pt-2">
              <span className="inline-flex items-center gap-1.5 text-xs text-emerald-400 font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Phase 1 Prototype Active · Interactive UI Mode
              </span>
            </div>
          </div>

          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-stone-200 mb-3">Explore</h5>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <button onClick={() => onNavigate('explore')} className="hover:text-white transition-colors">
                  Travel Results
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('hotels')} className="hover:text-white transition-colors">
                  Hotel Discovery
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('assistant')} className="hover:text-white transition-colors">
                  AI Travel Genie
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('trips')} className="hover:text-white transition-colors">
                  My Trips Dashboard
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-stone-200 mb-3">Popular Routes</h5>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <button onClick={() => onNavigate('explore')} className="hover:text-white transition-colors flex items-center gap-1">
                  Visakhapatnam → Hyderabad <ArrowUpRight className="w-3 h-3 text-stone-500" />
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('explore')} className="hover:text-white transition-colors flex items-center gap-1">
                  Hyderabad → Goa <ArrowUpRight className="w-3 h-3 text-stone-500" />
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('explore')} className="hover:text-white transition-colors flex items-center gap-1">
                  Visakhapatnam → Chennai <ArrowUpRight className="w-3 h-3 text-stone-500" />
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('explore')} className="hover:text-white transition-colors flex items-center gap-1">
                  Bengaluru → Kochi <ArrowUpRight className="w-3 h-3 text-stone-500" />
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-stone-200 mb-3">Multi-Modal Modes</h5>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>Vande Bharat & Superfast Trains</li>
              <li>Multi-Axle Volvo Sleepers</li>
              <li>Domestic Airlines</li>
              <li>Prepaid City Cabs & Autos</li>
              <li>Connected Metro Transit</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-stone-800 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
          <p>© 2026 TripGenie AI. Designed for modern multimodal travelers.</p>
          <div className="flex items-center gap-6">
            <span>Demo Mode Prototype</span>
            <span>Zero Slop Design</span>
            <span>All Data Illustrative</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
