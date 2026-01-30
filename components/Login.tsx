
import React from 'react';
import { Sprout, Lock, Mail, ArrowRight, ShieldCheck, User as UserIcon } from 'lucide-react';
import { User, UserRole } from '../types';

interface LoginProps {
  onLogin: (user: User) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = React.useState('farmer@agrosmart.com');
  const [password, setPassword] = React.useState('password');
  const [error, setError] = React.useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === 'admin@agrosmart.com' && password === 'password') {
      onLogin({
        id: '1',
        name: 'Enterprise Admin',
        email: 'admin@agrosmart.com',
        role: UserRole.ADMIN,
        avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=100'
      });
    } else if (email === 'farmer@agrosmart.com' && password === 'password') {
      onLogin({
        id: '2',
        name: 'Rajesh Kumar',
        email: 'farmer@agrosmart.com',
        role: UserRole.FARMER,
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=100'
      });
    } else {
      setError('Invalid credentials. Use demo accounts.');
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
                />
              </div>
            </div>

            {error && <p className="text-rose-400 text-xs font-bold text-center">{error}</p>}

            <button type="submit" className="w-full bg-emerald-500 hover:bg-emerald-400 text-white font-black py-4 rounded-2xl transition-all flex items-center justify-center gap-2 group">
              Sign In <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-white/10 space-y-4">
            <div className="text-center text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4">Demo Credentials</div>
            <div className="grid grid-cols-2 gap-4">
              <button 
                onClick={() => { setEmail('farmer@agrosmart.com'); setPassword('password'); }}
                className="flex flex-col items-center p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-colors border border-white/5"
              >
                <Sprout size={20} className="text-emerald-500 mb-1" />
                <span className="text-[10px] font-bold text-white uppercase tracking-tighter">Farmer Login</span>
              </button>
              <button 
                onClick={() => { setEmail('admin@agrosmart.com'); setPassword('password'); }}
                className="flex flex-col items-center p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-colors border border-white/5"
              >
                <ShieldCheck size={20} className="text-amber-500 mb-1" />
                <span className="text-[10px] font-bold text-white uppercase tracking-tighter">Admin Login</span>
              </button>
            </div>
          </div>
        </div>
        <p className="text-center text-slate-500 text-xs mt-8">© 2024 AgroSmart Intelligent Agriculture Cloud. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Login;
