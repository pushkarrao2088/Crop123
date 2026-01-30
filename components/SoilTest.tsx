
import React from 'react';
import { analyzeSoilHealth } from '../services/geminiService';
import { soilService } from '../services/soilService';
import { FlaskConical, Beaker, Loader2, CheckCircle2, TrendingUp, Sparkles, MapPin, Leaf, Info, Sun, ShieldCheck } from 'lucide-react';

interface SoilTestProps {
  userId?: string;
}

const SoilTest: React.FC<SoilTestProps> = ({ userId }) => {
  const [loading, setLoading] = React.useState(false);
  const [result, setResult] = React.useState<string | null>(null);
  const [data, setData] = React.useState({
    nitrogen: 120,
    phosphorus: 45,
    potassium: 180,
    ph: 6.5,
    location: 'Bhopal, MP'
  });

  const handleRunAnalysis = async () => {
    setLoading(true);
    try {
      const report = await analyzeSoilHealth(data);
      setResult(report);

      if (userId) {
        await soilService.saveSoilTest(userId, data, report);
      }
    } catch (err) {
      setResult("Oops! Something went wrong. Please check your internet and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-700 pb-20">
      <div className="max-w-3xl">
        <div className="flex items-center gap-2 text-emerald-600 font-bold mb-4 text-sm uppercase tracking-widest">
          <FlaskConical size={18} />
          Farmer's Health Check
        </div>
        <h2 className="text-5xl font-black text-slate-900 mb-6 tracking-tight leading-none">Check Your Soil Strength</h2>
        <p className="text-xl text-slate-500 leading-relaxed">Is your soil hungry? Or is it ready to grow? Enter your numbers below and we will tell you what to do in simple language.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Input Panel - Simplified for basic farmers */}
        <div className="lg:col-span-5 bg-white p-10 rounded-[3rem] border border-slate-100 shadow-xl shadow-slate-200/40 space-y-10">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-black text-slate-900 flex items-center gap-3">
               <Beaker className="text-emerald-500" size={28} />
               Soil Numbers
            </h3>
            <div className="p-2 bg-emerald-50 rounded-xl text-emerald-600 cursor-help group relative">
               <Info size={20} />
               <div className="absolute bottom-full mb-2 right-0 w-48 p-4 bg-white border border-slate-100 shadow-xl rounded-2xl text-[10px] font-bold text-slate-400 invisible group-hover:visible z-50">
                 Copy these numbers from your official soil test paper.
               </div>
            </div>
          </div>

          <div className="space-y-12">
            <ParameterInput 
              label="Leaf Power (Nitrogen)" 
              sub="Helps plants stay green and tall"
              unit="mg/kg" 
              value={data.nitrogen} 
              min={0} max={300} 
              color="emerald"
              onChange={(val: number) => setData({...data, nitrogen: val})} 
            />
            <ParameterInput 
              label="Root Power (Phosphorus)" 
              sub="Helps roots go deep and strong"
              unit="mg/kg" 
              value={data.phosphorus} 
              min={0} max={150} 
              color="amber"
              onChange={(val: number) => setData({...data, phosphorus: val})} 
            />
            <ParameterInput 
              label="Overall Strength (Potassium)" 
              sub="Helps plant fight disease"
              unit="mg/kg" 
              value={data.potassium} 
              min={0} max={400} 
              color="blue"
              onChange={(val: number) => setData({...data, potassium: val})} 
            />
            
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <label className="text-sm font-black text-slate-900">Soil Taste (pH)</label>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Sour vs Sweet Soil</p>
                </div>
                <div className={`px-4 py-1 rounded-full text-sm font-black ${data.ph > 6 && data.ph < 7.5 ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                  {data.ph > 6 && data.ph < 7.5 ? 'Sweet (Perfect)' : data.ph <= 6 ? 'Sour' : 'Bitter'}
                </div>
              </div>
              <input 
                type="range" 
                step="0.1"
                min="4" max="10"
                value={data.ph}
                onChange={(e) => setData({...data, ph: parseFloat(e.target.value)})}
                className="w-full accent-emerald-500 h-3 bg-slate-100 rounded-full appearance-none cursor-pointer" 
              />
              <div className="flex justify-between text-[10px] font-black text-slate-400 uppercase tracking-widest">
                <span className="text-rose-500">Very Sour</span>
                <span className="text-emerald-600">Perfect Soil</span>
                <span className="text-blue-500">Bitter</span>
              </div>
            </div>

            <div className="pt-4">
              <div className="relative group">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors" size={18} />
                <input 
                  type="text" 
                  value={data.location}
                  onChange={(e) => setData({...data, location: e.target.value})}
                  className="w-full pl-12 pr-4 py-5 bg-slate-50 border border-slate-100 rounded-2xl font-bold outline-none focus:ring-4 focus:ring-emerald-50 focus:border-emerald-500 transition-all"
                  placeholder="Where is your village/farm?"
                />
              </div>
            </div>

            <button 
              onClick={handleRunAnalysis}
              disabled={loading}
              className="w-full bg-slate-900 hover:bg-black text-white py-6 rounded-[2rem] font-black text-xl transition-all shadow-2xl flex items-center justify-center gap-3 active:scale-95 disabled:opacity-50"
            >
              {loading ? <Loader2 className="animate-spin" /> : <Sparkles size={24} />}
              {loading ? 'Thinking...' : 'Understand My Soil'}
            </button>
          </div>
        </div>

        {/* Results Panel - Focused on simple outcomes */}
        <div className="lg:col-span-7 space-y-8">
          {result ? (
            <div className="bg-white rounded-[4rem] border border-slate-100 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-500">
              <div className="bg-emerald-600 p-12 text-white relative">
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-10">
                    <h4 className="text-4xl font-black">Soil Health Card</h4>
                    <div className="px-4 py-2 bg-white/20 backdrop-blur-md rounded-2xl text-xs font-black uppercase tracking-widest">
                      EASY TO UNDERSTAND
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-10">
                     <div className="w-32 h-32 bg-white rounded-[2.5rem] flex flex-col items-center justify-center shadow-lg transform -rotate-3 hover:rotate-0 transition-transform shrink-0">
                        <CheckCircle2 size={48} className="text-emerald-600" />
                        <span className="text-[10px] font-black text-emerald-900/40 uppercase mt-2">Verified</span>
                     </div>
                     <div className="flex-1">
                       <div className="text-emerald-100 text-sm font-bold uppercase tracking-widest mb-1">Your Farm Status:</div>
                       <div className="text-3xl font-black leading-tight">Strong and Ready for Planting!</div>
                       <div className="flex gap-2 mt-4">
                          <span className="px-3 py-1 bg-white/10 rounded-lg text-xs font-bold border border-white/20">High Nutrients</span>
                          <span className="px-3 py-1 bg-white/10 rounded-lg text-xs font-bold border border-white/20">Good Drainage</span>
                       </div>
                     </div>
                  </div>
                </div>
                <Sun className="absolute -right-10 -bottom-10 w-64 h-64 text-white opacity-5" />
              </div>

              <div className="p-12 lg:p-16 space-y-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                   <div className="space-y-6">
                      <div className="flex items-center gap-3 text-emerald-600 font-black uppercase tracking-widest text-xs">
                        <TrendingUp size={18} /> Simple Farmer Advice
                      </div>
                      <div className="space-y-4">
                        {result.split('\n').filter(l => l.trim() && !l.includes('###')).slice(0, 3).map((line, i) => (
                           <div key={i} className="flex gap-4 group">
                             <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0"></div>
                             <p className="text-slate-600 font-bold leading-relaxed">{line.replace(/^[-*]\s*/, '').replace(/^\d\.\s*/, '')}</p>
                           </div>
                        ))}
                      </div>
                   </div>
                   
                   <div className="bg-slate-50 p-10 rounded-[3rem] border border-slate-100 flex flex-col justify-center">
                      <h5 className="font-black text-slate-400 uppercase tracking-widest text-[10px] mb-8 flex items-center gap-2">
                        <Leaf className="text-emerald-500" size={14} /> Best Crops For You
                      </h5>
                      <div className="grid grid-cols-1 gap-4">
                         {["Rice (Thick Variety)", "Wheat (Sharbati)", "Maize"].map((c, i) => (
                           <div key={i} className="flex items-center justify-between bg-white p-5 rounded-3xl border border-slate-100 shadow-sm font-black text-slate-800 text-lg hover:scale-105 transition-transform">
                             {c}
                             <CheckCircle2 size={24} className="text-emerald-500" />
                           </div>
                         ))}
                      </div>
                   </div>
                </div>

                <div className="bg-slate-900 p-12 rounded-[3rem] text-white relative overflow-hidden group">
                   <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                     <div className="w-20 h-20 bg-emerald-500 rounded-3xl flex items-center justify-center shrink-0 shadow-2xl shadow-emerald-500/40 group-hover:scale-110 transition-transform">
                        <ShieldCheck size={40} />
                     </div>
                     <div>
                       <h5 className="text-2xl font-black mb-2">The Expert's Choice</h5>
                       <p className="text-slate-400 text-lg leading-relaxed italic">
                         "To make your harvest even bigger, add 2 trolleys of cow dung manure per acre during the first tilling."
                       </p>
                     </div>
                   </div>
                   <Sparkles className="absolute -right-10 -top-10 text-emerald-500 opacity-10 w-40 h-40" />
                </div>

                <div className="prose prose-slate max-w-none border-t border-slate-100 pt-10">
                   <h5 className="font-black text-slate-400 uppercase tracking-widest text-[10px] mb-8">Detailed Report Summary</h5>
                   {result.split('\n').map((line, i) => (
                    <div key={i} className="mb-2">
                       {line.trim() && !line.includes('###') && (
                         <p className="text-slate-500 font-medium leading-relaxed">{line.replace(/^[-*]\s*/, '').replace(/^\d\.\s*/, '')}</p>
                       )}
                    </div>
                   ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="h-[800px] bg-slate-50 border-4 border-dashed border-slate-200 rounded-[5rem] flex flex-col items-center justify-center text-center p-12 space-y-10">
               <div className="w-32 h-32 bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/50 flex items-center justify-center text-slate-200">
                 <FlaskConical size={64} />
               </div>
               <div className="max-w-sm">
                 <h4 className="text-3xl font-black text-slate-400 tracking-tight">Your Report is Ready!</h4>
                 <p className="text-slate-400 mt-4 text-lg">Just put your soil numbers on the left and click the button to see your farm's health card.</p>
               </div>
               <div className="flex gap-4">
                  <div className="w-3 h-3 rounded-full bg-emerald-200 animate-bounce" style={{animationDelay: '0ms'}}></div>
                  <div className="w-3 h-3 rounded-full bg-emerald-200 animate-bounce" style={{animationDelay: '200ms'}}></div>
                  <div className="w-3 h-3 rounded-full bg-emerald-200 animate-bounce" style={{animationDelay: '400ms'}}></div>
               </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const ParameterInput = ({ label, sub, unit, value, min, max, onChange, color }: any) => {
  const colorMap = {
    emerald: 'accent-emerald-500 bg-emerald-50 text-emerald-600',
    amber: 'accent-amber-500 bg-amber-50 text-amber-600',
    blue: 'accent-blue-500 bg-blue-50 text-blue-600'
  };
  
  return (
    <div className="space-y-5">
      <div className="flex justify-between items-end">
        <div>
          <label className="text-base font-black text-slate-900">{label}</label>
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">{sub}</p>
        </div>
        <div className="flex items-baseline gap-1 bg-slate-50 px-3 py-1 rounded-xl border border-slate-100">
          <span className={`text-2xl font-black ${colorMap[color as keyof typeof colorMap].split(' ')[2]}`}>{value}</span>
          <span className="text-[10px] font-black text-slate-300">{unit}</span>
        </div>
      </div>
      <div className="relative pt-1">
        <input 
          type="range" 
          min={min} max={max}
          value={value}
          onChange={(e) => onChange(parseInt(e.target.value))}
          className={`w-full h-4 rounded-full appearance-none cursor-pointer bg-slate-100 ${colorMap[color as keyof typeof colorMap].split(' ')[0]} shadow-inner`} 
        />
        <div className="flex justify-between mt-2 text-[9px] font-black text-slate-300 tracking-[0.2em] px-1">
          <span>LOW</span>
          <span className="text-emerald-400">BEST LEVEL</span>
          <span>HIGH</span>
        </div>
      </div>
    </div>
  );
};

export default SoilTest;
