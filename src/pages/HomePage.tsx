import { useState, useEffect } from 'react';
import { 
  ArrowRightLeft, 
  Search, 
  Calendar, 
  Users, 
  Wallet, 
  Clock, 
  Train, 
  Bus, 
  Plane, 
  Car, 
  Sparkles, 
  ShieldCheck, 
  CheckCircle2, 
  TrendingUp, 
  Route, 
  ArrowRight
} from 'lucide-react';
import { SearchParams } from '../types/travel';
import { POPULAR_DESTINATIONS } from '../data/mockTravelData';
import { ImageWithFallback } from '../components/common/ImageWithFallback';
import { LocationAutocomplete } from '../components/common/LocationAutocomplete';

interface HomePageProps {
  initialSearchParams?: SearchParams;
  onSearch: (params: SearchParams) => void;
  onSelectDestination: (city: string) => void;
  onNavigate: (page: string) => void;
}

export function HomePage({ initialSearchParams, onSearch, onSelectDestination, onNavigate }: HomePageProps) {
  const [fromCity, setFromCity] = useState(initialSearchParams?.fromCity || 'Visakhapatnam');
  const [toCity, setToCity] = useState(initialSearchParams?.toCity || 'Hyderabad');
  const [departureDate, setDepartureDate] = useState(initialSearchParams?.departureDate || '2026-10-14');
  const [returnDate, setReturnDate] = useState(initialSearchParams?.returnDate || '');
  const [departureTimePref, setDepartureTimePref] = useState<'any' | 'morning' | 'afternoon' | 'night'>(
    initialSearchParams?.departureTimePref || 'any'
  );
  const [passengers, setPassengers] = useState(initialSearchParams?.passengers || 2);
  const [budgetPref, setBudgetPref] = useState<'all' | 'economy' | 'moderate' | 'luxury'>(
    initialSearchParams?.budgetPref || 'all'
  );
  const [activeTransportTab, setActiveTransportTab] = useState<'all' | 'train' | 'bus' | 'flight'>('all');

  // Keep state synced when user modifies or navigates back with specific search parameters
  useEffect(() => {
    if (initialSearchParams) {
      if (initialSearchParams.fromCity) setFromCity(initialSearchParams.fromCity);
      if (initialSearchParams.toCity) setToCity(initialSearchParams.toCity);
      if (initialSearchParams.departureDate) setDepartureDate(initialSearchParams.departureDate);
      if (initialSearchParams.passengers) setPassengers(initialSearchParams.passengers);
      if (initialSearchParams.budgetPref) setBudgetPref(initialSearchParams.budgetPref);
      if (initialSearchParams.departureTimePref) setDepartureTimePref(initialSearchParams.departureTimePref);
    }
  }, [initialSearchParams]);

  const handleSwap = () => {
    const temp = fromCity;
    setFromCity(toCity);
    setToCity(temp);
  };

  const handleSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    onSearch({
      fromCity: fromCity.trim(),
      toCity: toCity.trim(),
      departureDate,
      returnDate: returnDate || undefined,
      departureTimePref,
      passengers,
      budgetPref
    });
  };

  const handleQuickDestination = (city: string) => {
    setToCity(city);
    onSearch({
      fromCity: fromCity.trim(),
      toCity: city,
      departureDate,
      returnDate: returnDate || undefined,
      departureTimePref,
      passengers,
      budgetPref
    });
  };

  const popularCities = ['Hyderabad', 'Visakhapatnam', 'Chennai', 'Bengaluru', 'Vijayawada', 'Tokyo', 'Moscow', 'New York'];

  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-stone-900 text-white min-h-[580px] lg:min-h-[640px] flex items-center justify-center">
        {/* Background Scenic Image & Scrim */}
        <div className="absolute inset-0 z-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2000&q=80"
            alt="Scenic coastline and mountain roadway"
            className="w-full h-full object-cover scale-105 transition-transform duration-1000"
            fallbackTitle="TripGenie AI Scenic Coastal Viaduct"
          />
          {/* Measured Scrim ensuring WCAG AA contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/75 to-stone-900/60" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-950/40 via-transparent to-stone-950/90" />
        </div>

        {/* Content container */}
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-center">
          
          {/* Clean metadata kicker */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-emerald-950/70 border border-emerald-500/30 text-emerald-300 text-xs font-semibold mb-6 backdrop-blur-sm">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Next-Gen Worldwide Multi-Modal Travel Engine</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-stone-50 max-w-4xl mx-auto leading-[1.12]">
            Your Next Adventure <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-orange-300 to-amber-100">Starts Here.</span>
          </h1>

          <p className="mt-5 text-base sm:text-lg lg:text-xl text-stone-300 max-w-2xl mx-auto font-normal leading-relaxed">
            Search any city, station, town, or country worldwide. Compare door-to-door transit, trains, buses, and flights with real geocoding.
          </p>

          {/* Quick Route Shortcuts */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-xs text-stone-300">
            <span className="text-stone-400">Popular destinations:</span>
            {popularCities.map((city) => (
              <button
                key={city}
                type="button"
                onClick={() => handleQuickDestination(city)}
                className="hover:text-amber-300 underline decoration-stone-600 underline-offset-4 transition-colors"
              >
                {city}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 2. PROMINENT TRAVEL SEARCH CARD (Floating over Hero seam) */}
      <section className="relative z-20 -mt-16 sm:-mt-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="bg-white rounded-2xl shadow-xl border border-stone-200/90 p-5 sm:p-7 transition-all">
          
          {/* Top transport mode switcher tab bar */}
          <div className="flex items-center justify-between border-b border-stone-100 pb-4 mb-6 gap-2 flex-wrap">
            <div className="flex items-center gap-1.5 p-1 bg-stone-100/90 rounded-xl">
              <button
                type="button"
                onClick={() => setActiveTransportTab('all')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  activeTransportTab === 'all'
                    ? 'bg-emerald-900 text-white shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                All Modes (Smart AI)
              </button>
              <button
                type="button"
                onClick={() => setActiveTransportTab('train')}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeTransportTab === 'train'
                    ? 'bg-emerald-900 text-white shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <Train className="w-3.5 h-3.5" />
                <span>Trains</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTransportTab('bus')}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeTransportTab === 'bus'
                    ? 'bg-emerald-900 text-white shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <Bus className="w-3.5 h-3.5" />
                <span>Buses</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTransportTab('flight')}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeTransportTab === 'flight'
                    ? 'bg-emerald-900 text-white shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <Plane className="w-3.5 h-3.5" />
                <span>Flights</span>
              </button>
            </div>

            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800">
              <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
              <span>Worldwide geocoding & multi-modal routing</span>
            </div>
          </div>

          {/* Main Search Form */}
          <form onSubmit={handleSearchSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
              
              {/* From & Destination with Swap button and Autocomplete */}
              <div className="md:col-span-6 grid grid-cols-1 sm:grid-cols-11 gap-2 items-center bg-stone-50/70 p-2 rounded-xl border border-stone-200">
                {/* From Location */}
                <div className="sm:col-span-5 px-1">
                  <LocationAutocomplete
                    label="From Location"
                    placeholder="e.g. Visakhapatnam, Tokyo, Moscow..."
                    value={fromCity}
                    onChange={setFromCity}
                    iconColor="text-emerald-800"
                    required={true}
                  />
                </div>

                {/* Swap button */}
                <div className="sm:col-span-1 flex justify-center py-1">
                  <button
                    type="button"
                    onClick={handleSwap}
                    title="Swap departure and destination"
                    className="w-8 h-8 rounded-full bg-white hover:bg-emerald-50 text-emerald-900 border border-stone-200 shadow-xs flex items-center justify-center transition-all hover:scale-105 active:scale-95"
                  >
                    <ArrowRightLeft className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Destination */}
                <div className="sm:col-span-5 px-1">
                  <LocationAutocomplete
                    label="Destination"
                    placeholder="e.g. New York, Anakapalle, Chennai..."
                    value={toCity}
                    onChange={setToCity}
                    iconColor="text-orange-600"
                    required={true}
                  />
                </div>
              </div>

              {/* Departure & Return Dates */}
              <div className="md:col-span-3 grid grid-cols-2 gap-2 bg-stone-50/70 p-2 rounded-xl border border-stone-200">
                <div className="px-2">
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-500 mb-0.5">
                    Departure
                  </label>
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-stone-500 shrink-0" />
                    <input
                      type="date"
                      required
                      value={departureDate}
                      onChange={(e) => setDepartureDate(e.target.value)}
                      className="w-full bg-transparent text-xs font-bold text-stone-900 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="px-2 border-l border-stone-200">
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-500 mb-0.5">
                    Return (Opt)
                  </label>
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-stone-400 shrink-0" />
                    <input
                      type="date"
                      value={returnDate}
                      onChange={(e) => setReturnDate(e.target.value)}
                      className="w-full bg-transparent text-xs font-medium text-stone-700 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Passengers & Budget */}
              <div className="md:col-span-3 grid grid-cols-2 gap-2 bg-stone-50/70 p-2 rounded-xl border border-stone-200">
                <div className="px-2">
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-500 mb-0.5">
                    Passengers
                  </label>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-stone-500 shrink-0" />
                    <select
                      value={passengers}
                      onChange={(e) => setPassengers(Number(e.target.value))}
                      className="w-full bg-transparent text-xs font-bold text-stone-900 focus:outline-none cursor-pointer"
                    >
                      <option value={1}>1 Traveler</option>
                      <option value={2}>2 Travelers</option>
                      <option value={3}>3 Travelers</option>
                      <option value={4}>4 Travelers</option>
                      <option value={5}>5+ Group</option>
                    </select>
                  </div>
                </div>

                <div className="px-2 border-l border-stone-200">
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-500 mb-0.5">
                    Budget Tier
                  </label>
                  <div className="flex items-center gap-1.5">
                    <Wallet className="w-4 h-4 text-stone-500 shrink-0" />
                    <select
                      value={budgetPref}
                      onChange={(e) => setBudgetPref(e.target.value as any)}
                      className="w-full bg-transparent text-xs font-bold text-stone-900 focus:outline-none cursor-pointer"
                    >
                      <option value="all">Any Budget</option>
                      <option value="economy">Economy</option>
                      <option value="moderate">Moderate</option>
                      <option value="luxury">Luxury</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Sub-row: Departure time preference + Submit CTA */}
            <div className="mt-4 pt-4 border-t border-stone-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <Clock className="w-4 h-4 text-stone-400" />
                <span className="text-xs text-stone-500 font-medium">Time preference:</span>
                <div className="flex items-center gap-1 bg-stone-100 p-0.5 rounded-lg text-xs">
                  <button
                    type="button"
                    onClick={() => setDepartureTimePref('any')}
                    className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                      departureTimePref === 'any' ? 'bg-white shadow-xs text-emerald-900 font-bold' : 'text-stone-600'
                    }`}
                  >
                    Anytime
                  </button>
                  <button
                    type="button"
                    onClick={() => setDepartureTimePref('morning')}
                    className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                      departureTimePref === 'morning' ? 'bg-white shadow-xs text-emerald-900 font-bold' : 'text-stone-600'
                    }`}
                  >
                    Morning
                  </button>
                  <button
                    type="button"
                    onClick={() => setDepartureTimePref('night')}
                    className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                      departureTimePref === 'night' ? 'bg-white shadow-xs text-emerald-900 font-bold' : 'text-stone-600'
                    }`}
                  >
                    Overnight
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => onNavigate('assistant')}
                  className="px-4 py-3 rounded-xl border border-emerald-800/30 text-emerald-900 font-bold text-xs hover:bg-emerald-50 transition-colors flex items-center justify-center gap-1.5 whitespace-nowrap"
                >
                  <Sparkles className="w-4 h-4 text-orange-600" />
                  <span>Ask Genie to Plan</span>
                </button>
                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-3 bg-emerald-900 hover:bg-emerald-800 active:scale-[0.99] text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 whitespace-nowrap"
                >
                  <Search className="w-4 h-4" />
                  <span>Search Trips</span>
                </button>
              </div>
            </div>
          </form>
        </div>
      </section>

      {/* 3. EXPLORE BY TRANSPORT TYPE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">Seamless Multi-Modal</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight mt-1">
              Explore by Transport Type
            </h2>
            <p className="text-sm text-stone-600 mt-1 max-w-xl">
              From high-speed Vande Bharat trains to luxury overnight sleeper coaches and city transit.
            </p>
          </div>
          <button
            onClick={() => handleSearchSubmit()}
            className="text-xs font-bold text-emerald-800 hover:text-emerald-950 flex items-center gap-1 self-start md:self-auto"
          >
            <span>View all options for {toCity}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Card 1: Express Trains */}
          <div 
            onClick={() => handleSearchSubmit()}
            className="group cursor-pointer bg-white rounded-2xl p-6 border border-stone-200/80 shadow-xs hover:shadow-md transition-all hover:-translate-y-1"
          >
            <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-200/50 flex items-center justify-center text-emerald-800 mb-4 group-hover:bg-emerald-900 group-hover:text-white transition-colors">
              <Train className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-stone-900 group-hover:text-emerald-900 transition-colors">
              Express &amp; Superfast Trains
            </h3>
            <p className="text-xs text-stone-500 mt-1.5 leading-relaxed">
              High-speed Vande Bharat, superfast express &amp; intercity routes with AC chair cars and sleeper berths.
            </p>
            <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
              <span className="text-stone-400">Punctual Schedules</span>
              <span className="font-extrabold text-emerald-900">Guaranteed Berths</span>
            </div>
          </div>

          {/* Card 2: Luxury Buses */}
          <div 
            onClick={() => handleSearchSubmit()}
            className="group cursor-pointer bg-white rounded-2xl p-6 border border-stone-200/80 shadow-xs hover:shadow-md transition-all hover:-translate-y-1"
          >
            <div className="w-12 h-12 rounded-xl bg-orange-50 border border-orange-200/50 flex items-center justify-center text-orange-700 mb-4 group-hover:bg-orange-600 group-hover:text-white transition-colors">
              <Bus className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-stone-900 group-hover:text-orange-700 transition-colors">
              Volvo AC Sleepers
            </h3>
            <p className="text-xs text-stone-500 mt-1.5 leading-relaxed">
              Orange Travels, Scania Multi-axle, and State RTC fleets. Clean bedding, individual charging, live GPS.
            </p>
            <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
              <span className="text-stone-400">Overnight Sleepers</span>
              <span className="font-extrabold text-orange-700">Comfort Rest</span>
            </div>
          </div>

          {/* Card 3: Direct Flights */}
          <div 
            onClick={() => handleSearchSubmit()}
            className="group cursor-pointer bg-white rounded-2xl p-6 border border-stone-200/80 shadow-xs hover:shadow-md transition-all hover:-translate-y-1"
          >
            <div className="w-12 h-12 rounded-xl bg-sky-50 border border-sky-200/50 flex items-center justify-center text-sky-800 mb-4 group-hover:bg-sky-800 group-hover:text-white transition-colors">
              <Plane className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-stone-900 group-hover:text-sky-900 transition-colors">
              Direct Air Routes
            </h3>
            <p className="text-xs text-stone-500 mt-1.5 leading-relaxed">
              IndiGo, Air India Express, and domestic carriers. Quick flight hops connecting regional airports.
            </p>
            <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
              <span className="text-stone-400">Aviation Network</span>
              <span className="font-extrabold text-sky-900">Fastest Travel</span>
            </div>
          </div>

          {/* Card 4: Last Mile Cabs */}
          <div 
            onClick={() => onNavigate('last-mile')}
            className="group cursor-pointer bg-white rounded-2xl p-6 border border-stone-200/80 shadow-xs hover:shadow-md transition-all hover:-translate-y-1"
          >
            <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-200/50 flex items-center justify-center text-amber-800 mb-4 group-hover:bg-amber-800 group-hover:text-white transition-colors">
              <Car className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-stone-900 group-hover:text-amber-900 transition-colors">
              Station &amp; Airport Last-Mile
            </h3>
            <p className="text-xs text-stone-500 mt-1.5 leading-relaxed">
              Pre-booked station cabs, electric auto rickshaws, and direct metro ticketing from the platform to hotel.
            </p>
            <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
              <span className="text-stone-400">Zero Surge</span>
              <span className="font-extrabold text-amber-900">Door-to-door</span>
            </div>
          </div>
        </div>
      </section>

      {/* 4. POPULAR DESTINATIONS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">Curated Getaways</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight mt-1">
              Popular Destinations
            </h2>
            <p className="text-sm text-stone-600 mt-1">
              Top destinations with guaranteed multi-modal schedules. Click any city to view full travel options.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {POPULAR_DESTINATIONS.map((dest) => (
            <div
              key={dest.id}
              onClick={() => {
                handleQuickDestination(dest.city);
              }}
              className="group cursor-pointer bg-white rounded-2xl border border-stone-200/80 overflow-hidden shadow-xs hover:shadow-lg transition-all hover:-translate-y-1"
            >
              <div className="h-48 overflow-hidden relative">
                <ImageWithFallback
                  src={dest.image}
                  alt={dest.city}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  fallbackTitle={dest.city}
                  category="Destination"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-900/20 to-transparent" />
                <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between text-white">
                  <div>
                    <span className="text-[11px] font-medium text-amber-300 uppercase tracking-wider">{dest.state}</span>
                    <h4 className="text-xl font-bold leading-tight">{dest.city}</h4>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-stone-300 block">From</span>
                    <span className="text-sm font-extrabold text-white">{dest.startingFare}</span>
                  </div>
                </div>
              </div>

              <div className="p-5">
                <p className="text-xs text-stone-600 line-clamp-1">{dest.tagline}</p>
                <div className="mt-3 flex items-center gap-1.5 text-xs text-stone-500">
                  <Route className="w-3.5 h-3.5 text-emerald-700" />
                  <span>{dest.popularTransport}</span>
                </div>

                <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between">
                  <div className="flex items-center gap-1 text-[11px] text-stone-400">
                    <span>{dest.highlights.slice(0, 2).join(' · ')}</span>
                  </div>
                  <span className="text-xs font-bold text-emerald-800 group-hover:translate-x-1 transition-transform flex items-center gap-1">
                    Search Route <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. HOW IT WORKS */}
      <section className="bg-stone-100/70 border-y border-stone-200/80 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">Frictionless Travel</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight mt-1">
              How TripGenie AI Works
            </h2>
            <p className="text-sm text-stone-600 mt-2">
              Four steps from departure front door to hotel check-in.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-stone-200/70 shadow-xs relative">
              <span className="text-3xl font-black text-stone-200">01</span>
              <h3 className="text-base font-bold text-stone-900 mt-2">Search Multi-Modal</h3>
              <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                Enter your start city, destination, and timing. Our engine queries trains, buses, and flights in parallel.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-stone-200/70 shadow-xs relative">
              <span className="text-3xl font-black text-stone-200">02</span>
              <h3 className="text-base font-bold text-stone-900 mt-2">AI Optimization</h3>
              <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                Genie ranks options by real door-to-door transit time, budget tiers, and seat comfort ratings.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-stone-200/70 shadow-xs relative">
              <span className="text-3xl font-black text-stone-200">03</span>
              <h3 className="text-base font-bold text-stone-900 mt-2">Stitch Last-Mile &amp; Hotel</h3>
              <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                Select your station pickup cab or express metro, then pair with verified top-rated hotel stays.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-stone-200/70 shadow-xs relative">
              <span className="text-3xl font-black text-stone-200">04</span>
              <h3 className="text-base font-bold text-stone-900 mt-2">Unified Itinerary</h3>
              <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                Get a single digital boarding pass, GPS live tracking link, and transparent receipt breakdown.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. WHY TRIPGENIE AI */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-6 space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">Built for Modern Travelers</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight mt-1">
                Why Travelers Choose TripGenie AI
              </h2>
              <p className="text-sm text-stone-600 mt-3 leading-relaxed">
                Traditional travel portals force you to juggle 4 different apps for trains, buses, cabs, and hotels. TripGenie unifies everything with intelligent budget intelligence.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3.5">
                <div className="w-8 h-8 rounded-lg bg-emerald-100/80 text-emerald-900 flex items-center justify-center shrink-0 mt-0.5">
                  <TrendingUp className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-stone-900">Total Journey Cost Transparency</h4>
                  <p className="text-xs text-stone-600 mt-0.5">
                    We calculate station parking, local transfers, and platform fees so there are no unexpected charges.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-8 h-8 rounded-lg bg-emerald-100/80 text-emerald-900 flex items-center justify-center shrink-0 mt-0.5">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-stone-900">Verified Operators &amp; Live Seat Guarantee</h4>
                  <p className="text-xs text-stone-600 mt-0.5">
                    Only certified IRCTC partners, premier Volvo sleeper fleets, and licensed aviation carriers.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-8 h-8 rounded-lg bg-emerald-100/80 text-emerald-900 flex items-center justify-center shrink-0 mt-0.5">
                  <Sparkles className="w-4 h-4 text-orange-600" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-stone-900">Conversational Genie Assistant</h4>
                  <p className="text-xs text-stone-600 mt-0.5">
                    Ask questions in natural language: "Find the best overnight sleeper with private double berth under ₹1500."
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => onNavigate('assistant')}
                className="px-6 py-3 bg-emerald-900 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold shadow-xs transition-all flex items-center gap-2"
              >
                <span>Chat with Genie Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Asymmetric Proof Card Showcase */}
          <div className="lg:col-span-6 bg-stone-900 rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-xl border border-stone-800">
            <div className="flex items-center justify-between pb-6 border-b border-stone-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-800 text-amber-300 flex items-center justify-center font-black">
                  TG
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">Smart Multi-Modal Itinerary</h4>
                  <p className="text-xs text-stone-400">{fromCity} → {toCity}</p>
                </div>
              </div>
              <span className="text-xs bg-emerald-900/80 text-emerald-300 border border-emerald-700/60 px-2.5 py-1 rounded-full font-semibold">
                Direct Sync
              </span>
            </div>

            <div className="py-6 space-y-4 text-xs">
              <div className="flex items-center justify-between bg-stone-800/80 p-3 rounded-xl border border-stone-700/60">
                <div className="flex items-center gap-2.5">
                  <Train className="w-4 h-4 text-amber-400" />
                  <div>
                    <span className="font-bold text-white">Superfast Rail Express</span>
                    <p className="text-stone-400 text-[11px]">{fromCity} → {toCity}</p>
                  </div>
                </div>
                <span className="font-bold text-amber-300">Verified Rail</span>
              </div>

              <div className="flex items-center justify-between bg-stone-800/80 p-3 rounded-xl border border-stone-700/60">
                <div className="flex items-center gap-2.5">
                  <Car className="w-4 h-4 text-emerald-400" />
                  <div>
                    <span className="font-bold text-white">Station Arrival Cab</span>
                    <p className="text-stone-400 text-[11px]">{toCity} Central Hub → Hotel</p>
                  </div>
                </div>
                <span className="font-bold text-emerald-300">Pre-Booked</span>
              </div>

              <div className="flex items-center justify-between bg-stone-800/80 p-3 rounded-xl border border-stone-700/60">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-orange-400" />
                  <div>
                    <span className="font-bold text-white">Verified Stay</span>
                    <p className="text-stone-400 text-[11px]">{toCity} City Center</p>
                  </div>
                </div>
                <span className="font-bold text-orange-300">Guaranteed Check-in</span>
              </div>
            </div>

            <div className="pt-4 border-t border-stone-800 flex items-center justify-between text-xs">
              <div>
                <span className="text-stone-400 block text-[11px]">All-in-one Itinerary</span>
                <span className="text-lg font-extrabold text-white">{fromCity} to {toCity}</span>
              </div>
              <button
                onClick={() => handleSearchSubmit()}
                className="px-4 py-2 bg-emerald-800 hover:bg-emerald-700 text-white rounded-lg font-bold text-xs transition-colors"
              >
                Search This Route
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 7. FEATURED TRAVEL EXPERIENCES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 mb-12">
        <div className="border-t border-stone-200/80 pt-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">Handpicked Journeys</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight mt-1">
                Featured Travel Experiences
              </h2>
              <p className="text-sm text-stone-600 mt-1">
                Curated weekends and cultural expeditions planned end-to-end.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl border border-stone-200/80 overflow-hidden shadow-xs hover:shadow-md transition-all">
              <div className="h-44 overflow-hidden">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=800&q=80"
                  alt="Araku Valley Coffee Plantations"
                  className="w-full h-full object-cover"
                  fallbackTitle="Araku Valley Expedition"
                  category="Expedition"
                />
              </div>
              <div className="p-5">
                <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider">Scenic Rail Trail</span>
                <h4 className="text-base font-bold text-stone-900 mt-1">Araku Valley Glass Dome Vistadome</h4>
                <p className="text-xs text-stone-500 mt-1 leading-relaxed">
                  Travel through 58 tunnels and 84 bridges in an air-conditioned glass-roof coach from Visakhapatnam.
                </p>
                <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
                  <span className="text-stone-500">2 Days / 1 Night</span>
                  <span className="font-bold text-emerald-900">₹3,400 all-inclusive</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-stone-200/80 overflow-hidden shadow-xs hover:shadow-md transition-all">
              <div className="h-44 overflow-hidden">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1605335198083-d964f4ecf61e?auto=format&fit=crop&w=800&q=80"
                  alt="Nizami Heritage Walk Hyderabad"
                  className="w-full h-full object-cover"
                  fallbackTitle="Nizami Heritage Walk"
                  category="Heritage"
                />
              </div>
              <div className="p-5">
                <span className="text-[11px] font-bold text-amber-800 uppercase tracking-wider">Culinary &amp; Forts</span>
                <h4 className="text-base font-bold text-stone-900 mt-1">Royal Cultural Weekend Food Trail</h4>
                <p className="text-xs text-stone-500 mt-1 leading-relaxed">
                  Experience iconic regional cuisine, historic monuments, and light shows with seamless transit.
                </p>
                <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
                  <span className="text-stone-500">3 Days / 2 Nights</span>
                  <span className="font-bold text-amber-900">₹5,200 all-inclusive</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-stone-200/80 overflow-hidden shadow-xs hover:shadow-md transition-all">
              <div className="h-44 overflow-hidden">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80"
                  alt="Goa Coastal Sunset"
                  className="w-full h-full object-cover"
                  fallbackTitle="Goa Coastal Sunset"
                  category="Coastal"
                />
              </div>
              <div className="p-5">
                <span className="text-[11px] font-bold text-sky-800 uppercase tracking-wider">Beachside Relaxation</span>
                <h4 className="text-base font-bold text-stone-900 mt-1">Goa Coastal Flight &amp; Boutique Villa</h4>
                <p className="text-xs text-stone-500 mt-1 leading-relaxed">
                  Express direct flight paired with private airport cab and 3-night luxury heritage villa stay in Candolim.
                </p>
                <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
                  <span className="text-stone-500">4 Days / 3 Nights</span>
                  <span className="font-bold text-sky-900">₹12,800 all-inclusive</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
