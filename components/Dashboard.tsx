
import React from 'react';
import { 
  CloudRain, 
  Thermometer, 
  Droplets, 
  AlertTriangle,
  ChevronRight,
  Sprout,
  Activity,
  ArrowUpRight
} from 'lucide-react';
import { generateWeatherAlert } from '../services/geminiService';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const mockData = [
  { name: 'Mon', temp: 28 },
  { name: 'Tue', temp: 29 },
  { name: 'Wed', temp: 31 },
  { name: 'Thu', temp: 27 },
  { name: 'Fri', temp: 26 },
  { name: 'Sat', temp: 28 },
  { name: 'Sun', temp: 30 },
];

const Dashboard: React.FC = () => {
  const [alerts, setAlerts] = React.useState<string>("");
  const [loadingAlerts, setLoadingAlerts] = React.useState(true);

  React.useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const result = await generateWeatherAlert("Bhopal, India");
        setAlerts(result);
      } catch (err) {
        setAlerts("Failed to load weather alerts. Please check connectivity.");
      } finally {
        setLoadingAlerts(false);
      }
    };
    fetchAlerts();
  }, []);

  return (
    <div className="space-y-10 animate-in fade-in duration-1000">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-8 space-y-10">
          <div className="bg-emerald-950 rounded-[3rem] p-10 text-white shadow-2xl relative overflow-hidden group">
            <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
              <div className="max-w-md">
                <div className="flex items-center gap-2 text-emerald-400 font-bold mb-4 text-xs uppercase tracking-widest">
                  <Activity size={14} /> Global Productivity Index: +12%
                </div>
                <h3 className="text-4xl font-black mb-4 leading-none">Welcome Back, <br/>Rajesh Kumar</h3>
                <p className="text-emerald-200/60 leading-relaxed mb-8">Plot #402 (Wheat) is approaching flowering stage. Satellite scans show optimal leaf moisture today.</p>
                <div className="flex gap-4">
                  <button className="bg-emerald-500 hover:bg-emerald-400 text-white px-8 py-4 rounded-2xl font-black transition-all shadow-xl shadow-emerald-500/20 active:scale-95">
                    View Plot Details
                  </button>
                  <button className="bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-2xl font-bold transition-all active:scale-95 backdrop-blur-md">
                    Soil History
                  </button>
                </div>
              </div>
              <div className="hidden md:flex w-48 h-48 bg-white/5 rounded-full border border-white/10 items-center justify-center p-4">
                 <div className="text-center">
                    <div className="text-xs uppercase font-black opacity-40 mb-1">Yield Predict</div>
                    <div className="text-4xl font-black">4.2t</div>
                    <div className="text-[10px] font-bold text-emerald-400">TONS / ACRE</div>
                 </div>
              </div>
            </div>
            <Sprout className="absolute -right-20 -bottom-20 text-emerald-500 opacity-5 w-80 h-80 group-hover:scale-110 transition-transform duration-1000" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <StatCard icon={<CloudRain />} label="Rain Risk" value="15%" sub="LOW RISK" color="text-blue-500" />
            <StatCard icon={<Thermometer />} label="Avg Temp" value="28°C" sub="OPTIMAL" color="text-orange-500" />
            <StatCard icon={<Droplets />} label="Soil Moist" value="42%" sub="STABLE" color="text-emerald-500" />
            <StatCard icon={<Activity />} label="Health Score" value="94" sub="EXCELLENT" color="text-purple-500" />
          </div>
        </div>

        <div className="lg:col-span-4 flex flex-col">
          <div className="bg-white rounded-[3rem] border border-slate-100 p-8 shadow-sm flex flex-col h-full hover:shadow-xl transition-shadow group">
            <div className="flex items-center justify-between mb-8">
              <h4 className="font-black text-slate-900 tracking-tight text-xl">
                Intelligence Alerts
              </h4>
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
            </div>
            <div className="flex-1 overflow-y-auto space-y-6">
              {loadingAlerts ? (
                <div className="animate-pulse space-y-4">
                  <div className="h-4 bg-slate-100 rounded-[1rem] w-3/4"></div>
                  <div className="h-4 bg-slate-100 rounded-[1rem] w-full"></div>
                  <div className="h-4 bg-slate-100 rounded-[1rem] w-5/6"></div>
                </div>
              ) : (
                <div className="prose prose-sm prose-emerald max-w-none">
                   {alerts.split('\n').map((line, i) => (
                      <div key={i} className="mb-4 flex gap-4 items-start group/alert">
                         <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0 group-hover/alert:scale-150 transition-transform"></div>
                         <p className="text-slate-600 font-medium m-0 leading-tight">{line.replace(/^[•*-]\s*/, '')}</p>
                      </div>
                   ))}
                </div>
              )}
            </div>
            <button className="mt-8 w-full py-4 rounded-2xl bg-slate-50 text-slate-400 font-bold hover:bg-emerald-50 hover:text-emerald-700 transition-all flex items-center justify-center gap-2 group-hover:bg-white border border-transparent group-hover:border-slate-100">
              Clear All Notifications
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-8 bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h4 className="font-black text-2xl text-slate-900 tracking-tight">Environmental Metrics</h4>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Satellite Temp Stream (7 Days)</p>
            </div>
            <div className="flex gap-2">
               <button className="px-3 py-1 bg-emerald-50 text-emerald-700 rounded-lg text-[10px] font-black uppercase tracking-widest">Celsius</button>
               <button className="px-3 py-1 text-slate-300 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-slate-50">Fahrenheit</button>
            </div>
          </div>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mockData}>
                <defs>
                  <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f8fafc" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 700}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 700}} />
                <Tooltip 
                  contentStyle={{borderRadius: '24px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)', fontWeight: 'bold'}}
                />
                <Area type="monotone" dataKey="temp" stroke="#10b981" strokeWidth={4} fillOpacity={1} fill="url(#colorTemp)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="lg:col-span-4 bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm">
          <h4 className="font-black text-2xl text-slate-900 tracking-tight mb-8">Localized Markets</h4>
          <div className="space-y-4">
            <MarketItem name="Basmati Rice" price="₹4,200" trend="+12.4%" up />
            <MarketItem name="Durum Wheat" price="₹2,450" trend="+2.1%" up />
            <MarketItem name="Soybean Oil" price="₹5,600" trend="-1.5%" />
            <MarketItem name="Kashmiri Apple" price="₹8,900" trend="+15.8%" up />
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ icon, label, value, sub, color }: any) => (
  <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm group hover:-translate-y-1 transition-all hover:shadow-xl hover:shadow-slate-200/40">
    <div className={`w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform ${color}`}>
      {React.cloneElement(icon, { size: 24 })}
    </div>
    <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">{label}</div>
    <div className="text-3xl font-black text-slate-900 leading-none mb-2">{value}</div>
    <div className={`text-[10px] font-bold ${color} opacity-60 tracking-widest`}>{sub}</div>
  </div>
);

const MarketItem = ({ name, price, trend, up }: any) => (
  <div className="flex items-center justify-between p-4 rounded-2xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100 group cursor-pointer">
    <div className="flex items-center gap-4">
      <div className={`w-10 h-10 rounded-xl ${up ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'} flex items-center justify-center font-black text-lg`}>
        {name[0]}
      </div>
      <div>
        <div className="font-bold text-slate-800 text-sm">{name}</div>
        <div className="text-xs font-bold text-slate-400 tracking-tighter">{price} <span className="text-[9px] opacity-40 font-black">/ QT</span></div>
      </div>
    </div>
    <div className={`flex items-center gap-1 font-black text-[10px] px-3 py-1.5 rounded-lg ${up ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
      {up ? <ArrowUpRight size={14} /> : <ChevronRight size={14} className="rotate-90" />}
      {trend}
    </div>
  </div>
);

export default Dashboard;
