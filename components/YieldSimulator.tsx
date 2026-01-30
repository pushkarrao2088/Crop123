
import React from 'react';
// Added Loader2 to imports
import { Activity, Thermometer, Droplets, CloudSun, AlertCircle, Info, Sparkles, Loader2 } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

const simulationData = [
  { day: 0, growth: 0, risk: 2 },
  { day: 20, growth: 15, risk: 5 },
  { day: 40, growth: 45, risk: 15 },
  { day: 60, growth: 70, risk: 35 },
  { day: 80, growth: 85, risk: 20 },
  { day: 100, growth: 95, risk: 10 },
  { day: 120, growth: 100, risk: 5 },
];

const YieldSimulator: React.FC = () => {
  const [isSimulating, setIsSimulating] = React.useState(false);
  const [crop, setCrop] = React.useState('Wheat');
  const [acreage, setAcreage] = React.useState(5);

  const startSimulation = () => {
    setIsSimulating(true);
    setTimeout(() => setIsSimulating(false), 2000);
  };

  return (
    <div className="space-y-8 pb-12">
      <div className="max-w-3xl">
        <h2 className="text-5xl font-black text-slate-900 mb-6 tracking-tight">Yield Predictor AI<sup>PRO</sup></h2>
        <p className="text-xl text-slate-500 leading-relaxed">Simulate crop growth and predict total yield based on real-time soil health, seed variety, and hyper-local historical weather patterns.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-4 bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm space-y-8">
          <h3 className="text-2xl font-black text-slate-900 flex items-center gap-2">
            <Sparkles className="text-emerald-500" size={24} /> Simulation Config
          </h3>
          
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-slate-400">Target Crop</label>
              <select 
                value={crop}
                onChange={(e) => setCrop(e.target.value)}
                className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500 font-bold"
              >
                <option>Wheat</option>
                <option>Paddy</option>
                <option>Soybean</option>
                <option>Cotton</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-slate-400">Total Acreage (Acres)</label>
              <input 
                type="number" 
                value={acreage}
                onChange={(e) => setAcreage(Number(e.target.value))}
                className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500 font-bold"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-slate-400">Soil Quality Index</label>
              <div className="flex items-center gap-4">
                <input type="range" className="flex-1 accent-emerald-500" />
                <span className="font-bold text-emerald-600">82%</span>
              </div>
            </div>

            <button 
              onClick={startSimulation}
              disabled={isSimulating}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-5 rounded-3xl font-black text-lg transition-all shadow-xl shadow-emerald-100 disabled:opacity-50 flex items-center justify-center gap-3"
            >
              {isSimulating ? <Loader2 className="animate-spin" /> : <Activity />}
              {isSimulating ? 'Processing...' : 'Run Prediction'}
            </button>
          </div>

          <div className="bg-amber-50 p-6 rounded-3xl border border-amber-100 flex gap-4">
            <AlertCircle className="text-amber-500 shrink-0" size={20} />
            <p className="text-xs text-amber-800 leading-relaxed font-medium">
              Simulation accounts for a predicted 15% increase in seasonal rainfall for the Bhopal region.
            </p>
          </div>
        </div>

        <div className="lg:col-span-8 space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm text-center">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Estimated Yield</div>
              <div className="text-4xl font-black text-emerald-600 tracking-tight">12.4t</div>
              <div className="text-[10px] font-bold text-slate-300 mt-2">TONS PER TOTAL AREA</div>
            </div>
            <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm text-center">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Net Value</div>
              <div className="text-4xl font-black text-slate-900 tracking-tight">₹2.8L</div>
              <div className="text-[10px] font-bold text-emerald-500 mt-2">+12% ABOVE AVERAGE</div>
            </div>
            <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm text-center border-l-4 border-l-rose-500">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Pest Risk</div>
              <div className="text-4xl font-black text-rose-500 tracking-tight">High</div>
              <div className="text-[10px] font-bold text-rose-300 mt-2">DUE TO HUMIDITY SPIKE</div>
            </div>
          </div>

          <div className="bg-white p-8 lg:p-12 rounded-[3rem] border border-slate-200 shadow-sm relative overflow-hidden">
             <div className="flex items-center justify-between mb-12">
               <div>
                <h4 className="text-2xl font-black text-slate-900">Growth Simulation Curve</h4>
                <p className="text-sm text-slate-400 font-medium">Predicted lifecycle across 120 days</p>
               </div>
               <div className="flex gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Biomass</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-rose-400"></div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Risk Index</span>
                  </div>
               </div>
             </div>

             <div className="h-80 w-full">
               <ResponsiveContainer width="100%" height="100%">
                 <AreaChart data={simulationData}>
                    <defs>
                      <linearGradient id="colorGrowth" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                    <Tooltip 
                      contentStyle={{borderRadius: '20px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)'}}
                    />
                    <Area type="monotone" dataKey="growth" stroke="#10b981" strokeWidth={4} fillOpacity={1} fill="url(#colorGrowth)" />
                    <Line type="monotone" dataKey="risk" stroke="#fb7185" strokeWidth={3} dot={false} strokeDasharray="5 5" />
                 </AreaChart>
               </ResponsiveContainer>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default YieldSimulator;
