
import React from 'react';
import { getCropIntelligence } from '../services/geminiService';
import { Search, Loader2, X, Thermometer, Droplets, Bug, Leaf, Calendar, Globe, ArrowRight, BookOpen, Sprout, ShieldCheck, Zap } from 'lucide-react';

const crops = [
  { name: 'Wheat', season: 'Rabi', image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&q=80&w=600', color: 'border-amber-400', cycle: '120-150 days' },
  { name: 'Rice (Paddy)', season: 'Kharif', image: 'https://images.unsplash.com/photo-1536633100361-b442008e8b09?auto=format&fit=crop&q=80&w=600', color: 'border-emerald-400', cycle: '110-140 days' },
  { name: 'Cotton', season: 'Kharif', image: 'https://images.unsplash.com/photo-1594903310633-87f54c9c22e4?auto=format&fit=crop&q=80&w=600', color: 'border-slate-300', cycle: '160-180 days' },
  { name: 'Sugarcane', season: 'Annual', image: 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&q=80&w=600', color: 'border-emerald-500', cycle: '12-18 months' },
  { name: 'Tomato', season: 'Zaid/Kharif', image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&q=80&w=600', color: 'border-rose-400', cycle: '60-80 days' },
  { name: 'Maize', season: 'Kharif', image: 'https://images.unsplash.com/photo-1551731164-6a6828590b23?auto=format&fit=crop&q=80&w=600', color: 'border-yellow-400', cycle: '90-110 days' },
  { name: 'Soybean', season: 'Kharif', image: 'https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&q=80&w=600', color: 'border-slate-400', cycle: '100-120 days' },
  { name: 'Potato', season: 'Rabi', image: 'https://images.unsplash.com/photo-1518977676601-b53f02ac10d5?auto=format&fit=crop&q=80&w=600', color: 'border-amber-700', cycle: '80-100 days' },
  { name: 'Grapes', season: 'Rabi', image: 'https://images.unsplash.com/photo-1533616688419-b7a585564566?auto=format&fit=crop&q=80&w=600', color: 'border-purple-400', cycle: 'Perennial' },
  { name: 'Chickpeas', season: 'Rabi', image: 'https://images.unsplash.com/photo-1515543904379-3d757afe72e2?auto=format&fit=crop&q=80&w=600', color: 'border-amber-200', cycle: '90-110 days' },
];

const KnowledgeGrid: React.FC = () => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [selectedCrop, setSelectedCrop] = React.useState<typeof crops[0] | null>(null);
  const [intelligence, setIntelligence] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);

  const filteredCrops = crops.filter(c => c.name.toLowerCase().includes(searchTerm.toLowerCase()));

  const handleCropSelect = async (crop: typeof crops[0]) => {
    setSelectedCrop(crop);
    setLoading(true);
    try {
      const data = await getCropIntelligence(crop.name);
      setIntelligence(data);
    } catch (e) {
      setIntelligence("Failed to fetch detailed intelligence.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-12">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 text-emerald-600 font-bold mb-2 text-sm uppercase tracking-widest">
            <BookOpen size={16} />
            The Agri-Dictionary
          </div>
          <h2 className="text-4xl font-black text-slate-900 mb-4 leading-tight">Crop Intelligence Grid<sup>TM</sup></h2>
          <p className="text-slate-500 text-lg">A localized knowledge repository for 500+ crops, integrating climate data, pest vulnerability, and market-standard cultivation protocols.</p>
        </div>
        <div className="relative w-full lg:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <input 
            type="text" 
            placeholder="Search crop variety..." 
            className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500 transition-all text-lg"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {filteredCrops.map((crop) => (
          <div 
            key={crop.name}
            onClick={() => handleCropSelect(crop)}
            className="group cursor-pointer bg-white rounded-3xl overflow-hidden border border-slate-200 hover:border-emerald-500 hover:shadow-2xl transition-all flex flex-col h-full"
          >
            <div className="aspect-square relative overflow-hidden">
              <img src={crop.image} alt={crop.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1.5 rounded-xl text-[10px] font-bold uppercase tracking-wider text-slate-800 border border-slate-200 shadow-sm">
                {crop.season}
              </div>
            </div>
            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <h4 className="font-bold text-xl text-slate-800 group-hover:text-emerald-600 transition-colors mb-1">{crop.name}</h4>
                <p className="text-xs text-slate-400 mb-4 font-medium flex items-center gap-1">
                  <Calendar size={12} /> {crop.cycle} Cycle
                </p>
              </div>
              <div className="flex items-center justify-between mt-2 pt-4 border-t border-slate-50">
                <span className="text-[10px] font-black text-emerald-600 uppercase tracking-tighter">View Protocol</span>
                <ArrowRight size={14} className="text-slate-300 group-hover:text-emerald-500 group-hover:translate-x-1 transition-all" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Intelligence Modal */}
      {selectedCrop && (
        <div className="fixed inset-0 z-[110] bg-slate-900/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-6xl max-h-[90vh] rounded-[3rem] overflow-hidden shadow-2xl flex flex-col animate-in zoom-in-95 slide-in-from-bottom-8 duration-500">
            <div className="p-8 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white z-10">
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-emerald-100 shadow-sm">
                   <img src={selectedCrop.image} className="w-full h-full object-cover" alt={selectedCrop.name} />
                </div>
                <div>
                  <h3 className="text-3xl font-black text-slate-900">{selectedCrop.name} Intelligence</h3>
                  <p className="text-sm text-slate-400 font-bold uppercase tracking-widest flex items-center gap-2">
                    <Globe size={14} className="text-emerald-500" /> Regional Compliance: {selectedCrop.season} Standards
                  </p>
                </div>
              </div>
              <button onClick={() => setSelectedCrop(null)} className="p-3 hover:bg-slate-100 rounded-2xl transition-colors text-slate-400">
                <X size={28} />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-8 lg:p-12">
              {loading ? (
                <div className="flex flex-col items-center justify-center h-80 text-slate-400 gap-6">
                  <div className="relative">
                    <Loader2 className="animate-spin text-emerald-500" size={64} />
                    <Sprout className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-emerald-200" size={24} />
                  </div>
                  <p className="text-xl font-medium animate-pulse">Scanning knowledge repositories...</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                  <div className="lg:col-span-8 space-y-10">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                       <MetricBox icon={<Thermometer />} label="Optimal Temp" value="22-30°C" />
                       <MetricBox icon={<Droplets />} label="Water Need" value="Moderate" />
                       <MetricBox icon={<Zap />} label="Growth Speed" value="Regular" />
                       <MetricBox icon={<ShieldCheck />} label="Hardiness" value="Zone 4-9" />
                    </div>

                    <div className="prose prose-slate lg:prose-lg max-w-none prose-headings:text-slate-900 prose-headings:font-black prose-p:text-slate-600 prose-li:text-slate-600">
                      {intelligence?.split('\n').map((line, i) => {
                        if (line.startsWith('#') || line.includes('**')) {
                          return <h3 key={i} className="text-2xl font-black text-slate-900 mt-8 first:mt-0 mb-4">{line.replace(/#/g, '').replace(/\*\*/g, '').trim()}</h3>;
                        }
                        if (line.trim().startsWith('-') || line.trim().startsWith('*')) {
                          return <li key={i} className="text-slate-600 font-medium ml-4 list-disc">{line.replace(/^[-*]\s*/, '')}</li>;
                        }
                        return <p key={i} className="text-slate-500 leading-relaxed font-medium mb-4">{line}</p>;
                      })}
                    </div>
                  </div>
                  
                  <div className="lg:col-span-4 space-y-8">
                    <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 shadow-inner">
                      <h5 className="font-bold text-xs uppercase tracking-widest text-slate-400 mb-6 flex items-center gap-2">
                        <Bug size={16} className="text-rose-500" /> Integrated Pest Plan
                      </h5>
                      <div className="space-y-4">
                        <PestItem name="Stem Borer" severity="High" remedy="Chlorantraniliprole" />
                        <PestItem name="Blight Index" severity="Medium" remedy="Fungicide Spray" />
                        <PestItem name="Leaf Rust" severity="Low" remedy="Resistant Seed Variety" />
                      </div>
                    </div>
                    
                    <div className="bg-emerald-950 p-8 rounded-[2rem] text-white shadow-xl shadow-emerald-200/50 relative overflow-hidden">
                      <h5 className="font-bold text-xs uppercase tracking-widest text-emerald-400 mb-6 flex items-center gap-2 relative z-10">
                        <Calendar size={16} /> Seasonal Milestone
                      </h5>
                      <div className="space-y-6 relative z-10">
                        <Milestone title="Soil Prep" days="Day 0-15" active />
                        <Milestone title="Vegetative" days="Day 16-60" />
                        <Milestone title="Flowering" days="Day 61-90" />
                        <Milestone title="Maturity" days="Day 91+" />
                      </div>
                      <Sprout className="absolute -bottom-10 -right-10 text-emerald-500 opacity-10 w-40 h-40" />
                    </div>

                    <div className="bg-white p-6 rounded-3xl border border-slate-100 flex items-center gap-4">
                       <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-600">
                          <ShieldCheck size={24} />
                       </div>
                       <div>
                          <div className="text-xs font-black text-slate-400 uppercase tracking-widest">Quality Badge</div>
                          <div className="text-sm font-bold text-slate-800">ISO 22000 Ready</div>
                       </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const MetricBox = ({ icon, label, value }: any) => (
  <div className="bg-slate-50 border border-slate-100 p-4 rounded-2xl text-center">
    <div className="text-emerald-600 mx-auto mb-2 w-6 h-6">{React.cloneElement(icon, { size: 24 })}</div>
    <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{label}</div>
    <div className="text-xs font-bold text-slate-800">{value}</div>
  </div>
);

const Milestone = ({ title, days, active }: any) => (
  <div className="flex items-center justify-between">
    <div className="flex items-center gap-3">
      <div className={`w-2 h-2 rounded-full ${active ? 'bg-emerald-500 shadow-[0_0_10px_#10b981]' : 'bg-white/20'}`}></div>
      <span className={`text-sm font-bold ${active ? 'text-white' : 'text-white/40'}`}>{title}</span>
    </div>
    <span className={`text-[10px] font-black uppercase tracking-tighter ${active ? 'text-emerald-400' : 'text-white/20'}`}>{days}</span>
  </div>
);

const PestItem = ({ name, severity, remedy }: any) => {
  const colors = {
    High: 'text-rose-500 bg-rose-50 border-rose-100',
    Medium: 'text-amber-600 bg-amber-50 border-amber-100',
    Low: 'text-emerald-600 bg-emerald-50 border-emerald-100'
  }[severity as 'High' | 'Medium' | 'Low'];
  
  return (
    <div className="p-4 bg-white rounded-2xl border border-slate-100 flex flex-col gap-1 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <span className="text-sm font-bold text-slate-800">{name}</span>
        <span className={`${colors} text-[9px] font-black px-2 py-0.5 rounded-full border uppercase tracking-tighter`}>{severity}</span>
      </div>
      <span className="text-[10px] text-slate-400 font-medium">Protocol: {remedy}</span>
    </div>
  );
};

export default KnowledgeGrid;
