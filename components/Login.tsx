
import React from 'react';
import { Sprout, Lock, Mail, ArrowRight, ShieldCheck, Loader2 } from 'lucide-react';
import { User } from '../types';
import { authService } from '../services/authService';

interface LoginProps {
  onLogin: (user: User) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = React.useState('farmer@agrosmart.com');
  const [password, setPassword] = React.useState('password');
  const [error, setError] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [isSignUp, setIsSignUp] = React.useState(false);
  const [name, setName] = React.useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isSignUp) {
        const { data, error: signUpError } = await authService.signUp(email, password, name || email.split('@')[0]);
        if (signUpError) {
          setError(signUpError);
          setLoading(false);
          return;
        }
      }

      const { data, error: signInError } = await authService.signIn(email, password);
      if (signInError) {
        setError(signInError);
      } else if (data?.user) {
        onLogin(data.user);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-500/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-500/10 rounded-full blur-[120px]"></div>
      </div>

      <div className="w-full max-w-md p-8 relative z-10">
        <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-10 shadow-2xl">
          <div className="flex flex-col items-center mb-10">
            <div className="w-20 h-20 gradient-bg rounded-3xl flex items-center justify-center text-white mb-6 shadow-xl shadow-emerald-500/20">
              <Sprout size={40} />
            </div>
            <h1 className="text-3xl font-black text-white tracking-tight">AgroSmart</h1>
            <p className="text-emerald-400 text-sm font-bold uppercase tracking-widest mt-2">Enterprise Cloud</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            {isSignUp && (
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                <input
                  type="text"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-4 text-white outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            )}

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                <input
                  type="email"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                <input
                  type="password"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            {error && <p className="text-rose-400 text-xs font-bold text-center">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-white font-black py-4 rounded-2xl transition-all flex items-center justify-center gap-2 group disabled:cursor-not-allowed"
            >
              {loading ? <Loader2 className="animate-spin" size={20} /> : <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />}
              {loading ? 'Please wait...' : (isSignUp ? 'Create Account' : 'Sign In')}
            </button>

            <button
              type="button"
              onClick={() => {
                setIsSignUp(!isSignUp);
                setError('');
              }}
              className="w-full text-emerald-400 hover:text-emerald-300 font-bold text-sm transition-colors"
            >
              {isSignUp ? 'Already have an account? Sign In' : 'New here? Create Account'}
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-white/10 space-y-4">
            <div className="text-center text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4">Quick Start</div>
            <p className="text-[11px] text-slate-400 text-center leading-relaxed">Create an account or sign in with your credentials. Your data is securely stored in our cloud database.</p>
          </div>
        </div>
        <p className="text-center text-slate-500 text-xs mt-8">© 2024 AgroSmart Intelligent Agriculture Cloud. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Login;
