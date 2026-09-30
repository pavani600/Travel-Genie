import { useState } from 'react';
import { Sparkles, Menu, X, User, Compass, Luggage } from 'lucide-react';

interface NavbarProps {
  activePage: string;
  setActivePage: (page: string) => void;
  onOpenAuth: () => void;
  user: { name: string; email: string } | null;
  onSignOut: () => void;
  hasActiveTrip?: boolean;
}

export function Navbar({
  activePage,
  setActivePage,
  onOpenAuth,
  user,
  onSignOut,
  hasActiveTrip = false
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'explore', label: 'Explore' },
    { id: 'hotels', label: 'Hotels' },
    { id: 'trips', label: 'My Trips' },
    { id: 'assistant', label: 'AI Assistant', icon: Sparkles }
  ];

  const handleNavClick = (pageId: string) => {
    setActivePage(pageId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-stone-200/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          
          {/* Zone 1: Single text element wordmark */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleNavClick('home')}
              className="group flex items-center gap-2.5 text-left focus:outline-none"
            >
              <div className="w-9 h-9 rounded-xl bg-emerald-800 text-amber-300 flex items-center justify-center font-black shadow-sm group-hover:bg-emerald-900 transition-colors">
                <Compass className="w-5 h-5 text-amber-400 group-hover:rotate-45 transition-transform duration-300" />
              </div>
              <span className="text-xl font-extrabold tracking-tight text-emerald-950">
                TripGenie<span className="text-orange-600 font-black">.ai</span>
              </span>
            </button>
          </div>

          {/* Zone 2: 4-6 clean text navigation links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-semibold text-stone-600">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = activePage === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`flex items-center gap-1.5 transition-colors relative py-1 hover:text-emerald-900 ${
                    isActive ? 'text-emerald-900 font-bold' : 'text-stone-600'
                  }`}
                >
                  {Icon && <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-orange-600' : 'text-orange-500'}`} />}
                  <span>{link.label}</span>
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-800 rounded-full" />
                  )}
                </button>
              );
            })}

            {hasActiveTrip && (
              <button
                onClick={() => handleNavClick('summary')}
                className={`flex items-center gap-1.5 transition-colors relative py-1 text-orange-700 font-bold hover:text-orange-800 ${
                  activePage === 'summary' ? 'text-orange-800' : ''
                }`}
              >
                <Luggage className="w-4 h-4 text-orange-600" />
                <span>Trip Summary</span>
                {activePage === 'summary' && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-600 rounded-full" />
                )}
              </button>
            )}
          </nav>

          {/* Zone 3: 1-2 primary actions */}
          <div className="flex items-center gap-3">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl border border-stone-200 bg-white hover:bg-stone-50 text-stone-800 text-xs font-semibold shadow-xs transition-colors"
                >
                  <div className="w-6 h-6 rounded-full bg-emerald-800 text-amber-200 flex items-center justify-center font-bold">
                    {user.name.charAt(0)}
                  </div>
                  <span className="hidden sm:inline font-medium text-stone-700 max-w-[120px] truncate">
                    {user.name}
                  </span>
                </button>

                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-lg border border-stone-200 py-1.5 z-50 text-xs">
                    <div className="px-4 py-2 border-b border-stone-100">
                      <p className="font-semibold text-stone-900 truncate">{user.name}</p>
                      <p className="text-stone-500 truncate text-[11px]">{user.email}</p>
                    </div>
                    <button
                      onClick={() => {
                        handleNavClick('trips');
                        setUserDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-stone-50 text-stone-700"
                    >
                      My Bookings & Tickets
                    </button>
                    <button
                      onClick={() => {
                        onSignOut();
                        setUserDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-stone-50 text-rose-600 font-medium border-t border-stone-100"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={onOpenAuth}
                className="px-4 py-2 text-xs font-bold text-white bg-emerald-900 rounded-xl hover:bg-emerald-800 active:scale-[0.98] transition-all shadow-xs flex items-center gap-1.5 whitespace-nowrap"
              >
                <User className="w-3.5 h-3.5" />
                <span>Login / Sign Up</span>
              </button>
            )}

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-stone-700 hover:bg-stone-100 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FAF8F5] border-b border-stone-200 px-4 pt-2 pb-6 space-y-2">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors flex items-center gap-2 ${
                activePage === link.id
                  ? 'bg-emerald-900 text-white'
                  : 'text-stone-700 hover:bg-stone-100'
              }`}
            >
              {link.icon && <link.icon className="w-4 h-4" />}
              <span>{link.label}</span>
            </button>
          ))}
          {hasActiveTrip && (
            <button
              onClick={() => handleNavClick('summary')}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors flex items-center gap-2 ${
                activePage === 'summary'
                  ? 'bg-orange-600 text-white'
                  : 'text-orange-700 hover:bg-orange-50'
              }`}
            >
              <Luggage className="w-4 h-4" />
              <span>Trip Summary</span>
            </button>
          )}
          {!user && (
            <div className="pt-2 border-t border-stone-200">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAuth();
                }}
                className="w-full py-2.5 text-center text-xs font-bold text-white bg-emerald-900 rounded-xl"
              >
                Sign In or Register
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
