import { useState } from 'react';
import { X, Mail, Lock, Phone, User, Compass, Info, CheckCircle2 } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: { name: string; email: string }) => void;
}

export function AuthModal({ isOpen, onClose, onLoginSuccess }: AuthModalProps) {
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [fullName, setFullName] = useState('Sandya Pavani');
  const [email, setEmail] = useState('sandya.traveler@example.com');
  const [mobile, setMobile] = useState('+91 98480 22334');
  const [password, setPassword] = useState('••••••••');
  const [confirmPassword, setConfirmPassword] = useState('••••••••');
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === 'signup' && password !== confirmPassword) {
      setErrorMsg('Passwords do not match');
      return;
    }
    setErrorMsg('');
    onLoginSuccess({
      name: mode === 'signup' ? (fullName || 'Sandya Pavani') : 'Sandya Pavani',
      email: email || 'sandya.traveler@example.com'
    });
    onClose();
  };

  const handleGoogleSignIn = () => {
    onLoginSuccess({
      name: 'Sandya Pavani',
      email: 'pavanisandya15@gmail.com'
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="bg-white w-full max-w-md rounded-3xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-stone-900 text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-stone-400 hover:text-white p-1"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2.5 mb-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-800 text-amber-300 flex items-center justify-center font-black">
              <Compass className="w-4 h-4 text-amber-300" />
            </div>
            <span className="text-base font-extrabold tracking-tight">
              TripGenie<span className="text-orange-500">.ai</span>
            </span>
          </div>

          <h3 className="text-xl font-bold text-white">
            {mode === 'signin' ? 'Welcome Back Traveler' : 'Create Your Account'}
          </h3>
          <p className="text-xs text-stone-400 mt-1">
            {mode === 'signin'
              ? 'Access saved itineraries, booking passes, and personalized AI tips.'
              : 'Join TripGenie to compare multi-modal transit and earn journey rewards.'}
          </p>
        </div>

        {/* Phase 1 Prototype Notice */}
        <div className="bg-amber-50 border-b border-amber-200 px-6 py-2.5 flex items-start gap-2 text-xs text-amber-900">
          <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
          <span>Phase 1 Prototype Demo Mode: Simulated authentication for UI review. No password required.</span>
        </div>

        {/* Tab switch */}
        <div className="flex border-b border-stone-200 text-xs font-bold text-center">
          <button
            onClick={() => setMode('signin')}
            className={`flex-1 py-3 transition-colors ${
              mode === 'signin'
                ? 'border-b-2 border-emerald-900 text-emerald-900'
                : 'text-stone-500 hover:text-stone-800'
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => setMode('signup')}
            className={`flex-1 py-3 transition-colors ${
              mode === 'signup'
                ? 'border-b-2 border-emerald-900 text-emerald-900'
                : 'text-stone-500 hover:text-stone-800'
            }`}
          >
            Create Account
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
          {errorMsg && (
            <div className="p-2.5 rounded-lg bg-rose-50 text-rose-700 border border-rose-200 font-semibold">
              {errorMsg}
            </div>
          )}

          {mode === 'signup' && (
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-600 mb-1">
                Full Name
              </label>
              <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl border border-stone-200 bg-stone-50/50 focus-within:border-emerald-800 focus-within:ring-1 focus-within:ring-emerald-800">
                <User className="w-4 h-4 text-stone-400" />
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Sandya Pavani"
                  className="w-full bg-transparent text-xs text-stone-900 focus:outline-none"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-600 mb-1">
              Email Address
            </label>
            <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl border border-stone-200 bg-stone-50/50 focus-within:border-emerald-800 focus-within:ring-1 focus-within:ring-emerald-800">
              <Mail className="w-4 h-4 text-stone-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@domain.com"
                className="w-full bg-transparent text-xs text-stone-900 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-600 mb-1">
              Mobile Number
            </label>
            <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl border border-stone-200 bg-stone-50/50 focus-within:border-emerald-800 focus-within:ring-1 focus-within:ring-emerald-800">
              <Phone className="w-4 h-4 text-stone-400" />
              <input
                type="tel"
                required
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                placeholder="+91 98480 12345"
                className="w-full bg-transparent text-xs text-stone-900 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-600 mb-1">
              Password
            </label>
            <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl border border-stone-200 bg-stone-50/50 focus-within:border-emerald-800 focus-within:ring-1 focus-within:ring-emerald-800">
              <Lock className="w-4 h-4 text-stone-400" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full bg-transparent text-xs text-stone-900 focus:outline-none"
              />
            </div>
          </div>

          {mode === 'signup' && (
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-600 mb-1">
                Confirm Password
              </label>
              <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl border border-stone-200 bg-stone-50/50 focus-within:border-emerald-800 focus-within:ring-1 focus-within:ring-emerald-800">
                <Lock className="w-4 h-4 text-stone-400" />
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Repeat password"
                  className="w-full bg-transparent text-xs text-stone-900 focus:outline-none"
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3 bg-emerald-900 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl shadow-xs transition-colors mt-2"
          >
            {mode === 'signin' ? 'Sign In to Demo Profile' : 'Create Demo Account'}
          </button>

          {/* Divider */}
          <div className="relative my-4 text-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-stone-200" />
            </div>
            <span className="relative bg-white px-3 text-[11px] text-stone-400">or continue with</span>
          </div>

          {/* Google Sign-in visual option */}
          <button
            type="button"
            onClick={handleGoogleSignIn}
            className="w-full py-2.5 px-4 rounded-xl border border-stone-300 hover:border-stone-400 text-stone-700 font-semibold text-xs flex items-center justify-center gap-2 hover:bg-stone-50 transition-colors"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>Continue with Google</span>
          </button>
        </form>

      </div>
    </div>
  );
}
