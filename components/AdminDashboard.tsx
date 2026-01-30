
import React from 'react';
import { Users, Sprout, AlertTriangle, TrendingUp, Globe, MapPin, Database } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const globalData = [
  { month: 'Jan', acres: 12000, disease: 120 },
  { month: 'Feb', acres: 15000, disease: 200 },
  { month: 'Mar', acres: 14000, disease: 450 },
  { month: 'Apr', acres: 18000, disease: 180 },
  { month: 'May', acres: 22000, disease: 90 },
  { month: 'Jun', acres: 25000, disease: 130 },
];

const AdminDashboard: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tight">Enterprise Command Center</h2>
          <p className="text-slate-500 text-lg">Real-time oversight of all connected regional farming nodes.</p>
        </div>
        <div className="flex gap-2">
          <div className="bg-emerald-50 text-emerald-700 px-4 py-2 rounded-xl text-sm font-bold border border-emerald-100 flex items-center gap-2">
            <Globe size={16} /> Global Status: Optimal
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <AdminStat icon={<Users />} label="Total Farmers" value="8,421" sub="+12% this month" color="text-blue-600" />
        <AdminStat icon={<Database />} label="Acres Monitored" value="2.4M" sub="Global Coverage" color="text-emerald-600" />
        <AdminStat icon={<AlertTriangle />} label="Active Alerts" value="42" sub="Requires Attention" color="text-rose-600" />
        <AdminStat icon={<TrendingUp />} label="Network Health" value="99.8%" sub="Uptime Stable" color="text-amber-600" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 bg-white p-8 rounded-[3rem] border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-10">
            <h3 className="text-2xl font-black text-slate-900">Enterprise Growth & Monitoring</h3>
            <div className="flex gap-4">
               <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                 <div className="w-2 h-2 rounded-full bg-emerald-500"></div> Total Acres
               </div>
               <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                 <div className="w-2 h-2 rounded-full bg-rose-400"></div> Disease Hits
               </div>
            </div>
          </div>
          <div className="h-96 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={globalData}>
                <defs>
                  <linearGradient id="colorAcres" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <Tooltip contentStyle={{borderRadius: '20px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}} />
                <Area type="monotone" dataKey="acres" stroke="#10b981" strokeWidth={4} fillOpacity={1} fill="url(#colorAcres)" />
                <Area type="monotone" dataKey="disease" stroke="#fb7185" strokeWidth={3} fillOpacity={0} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="lg:col-span-4 space-y-8">
          <div className="bg-slate-900 rounded-[3rem] p-8 text-white relative overflow-hidden">
             <h4 className="text-xl font-bold mb-6 flex items-center gap-2">
               <MapPin size={20} className="text-emerald-500" /> Regional Outbreaks
             </h4>
             <div className="space-y-6">
                <OutbreakItem region="Maharashtra, India" count={12} severity="High" />
                <OutbreakItem region="Iowa, USA" count={4} severity="Low" />
                <OutbreakItem region="São Paulo, Brazil" count={8} severity="Medium" />
                <OutbreakItem region="Mekong Delta, VN" count={15} severity="High" />
             </div>
             <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/5 rounded-full blur-3xl"></div>
          </div>

          <div className="bg-white p-8 rounded-[3rem] border border-slate-200">
             <h4 className="font-bold text-slate-800 mb-4 uppercase tracking-widest text-[10px]">System AI Health</h4>
             <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                  <Sprout size={32} />
                </div>
                <div>
                   <div className="text-2xl font-black text-slate-900">98.4%</div>
                   <div className="text-xs font-bold text-slate-400">Diagnostic Accuracy</div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const AdminStat = ({ icon, label, value, sub, color }: any) => (
  <div className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-sm flex flex-col justify-between hover:shadow-lg transition-shadow">
    <div className={`w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center ${color} mb-4`}>
      {React.cloneElement(icon, { size: 24 })}
    </div>
    <div>
      <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{label}</div>
      <div className="text-3xl font-black text-slate-900">{value}</div>
      <div className="text-[10px] font-bold text-emerald-500 mt-2">{sub}</div>
    </div>
  </div>
);

const OutbreakItem = ({ region, count, severity }: any) => {
  const sevColor = severity === 'High' ? 'bg-rose-500' : severity === 'Medium' ? 'bg-amber-500' : 'bg-emerald-500';
  return (
    <div className="flex items-center justify-between group">
      <div>
        <div className="text-sm font-bold text-white group-hover:text-emerald-400 transition-colors">{region}</div>
        <div className="text-[10px] text-slate-400 font-medium">{count} Active Incidents</div>
      </div>
      <div className={`w-2 h-2 rounded-full ${sevColor} shadow-[0_0_10px_rgba(255,255,255,0.1)]`}></div>
    </div>
  );
};

export default AdminDashboard;
