
import React from 'react';
import { getCropAdvisory } from '../services/geminiService';
import { Search, Loader2, Info, ChevronRight, CheckCircle2 } from 'lucide-react';

const Advisory: React.FC = () => {
  const [query, setQuery] = React.useState('');
  const [result, setResult] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query) return;
    setLoading(true);
    try {
      const advice = await getCropAdvisory({ crop: query });
      setResult(advice);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const QuickCrops = ["Rice", "Wheat", "Maize", "Cotton", "Tomato", "Potato"];

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-slate-800 mb-2">Smart Crop Advisory</h2>
        <p className="text-slate-500">Get data-driven expert advice tailored to your specific crop and region.</p>
      </div>

      <form onSubmit={handleSubmit} className="relative group">
        <input 
          type="text" 
          placeholder="Which crop are you planning to grow?" 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full pl-14 pr-32 py-5 bg-white border border-slate-200 rounded-2xl shadow-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all text-lg"
        />
        <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors" size={24} />
        <button 
          type="submit"
          disabled={loading || !query}
          className="absolute right-3 top-1/2 -translate-y-1/2 bg-emerald-600 text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-emerald-700 disabled:bg-slate-300 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {loading ? <Loader2 className="animate-spin" size={20} /> : 'Ask AI'}
        </button>
      </form>

      <div className="flex flex-wrap gap-2 items-center justify-center">
        <span className="text-slate-400 text-sm font-medium">Quick suggestions:</span>
        {QuickCrops.map(crop => (
          <button 
            key={crop} 
            onClick={() => setQuery(crop)}
            className="px-4 py-1.5 rounded-full bg-slate-100 text-slate-600 hover:bg-emerald-100 hover:text-emerald-700 text-sm font-medium transition-colors"
          >
            {crop}
          </button>
        ))}
      </div>

      {loading && (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center animate-pulse">
          <Loader2 className="animate-spin mx-auto text-emerald-500 mb-4" size={48} />
          <p className="text-slate-500 font-medium italic">Our AI agronomist is analyzing seasonal patterns and soil data...</p>
        </div>
      )}

      {result && !loading && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="p-6 bg-emerald-50 border-b border-emerald-100 flex items-center justify-between">
            <h3 className="font-bold text-emerald-800 flex items-center gap-2">
              <CheckCircle2 size={20} />
              AI Generated Advisory
            </h3>
            <span className="text-xs text-emerald-600 font-bold bg-white px-2 py-1 rounded-full uppercase border border-emerald-200">Verified Insights</span>
          </div>
          <div className="p-8 prose prose-emerald max-w-none">
            {result.split('\n').map((para, i) => (
              <p key={i} className="text-slate-600 mb-4">{para}</p>
            ))}
          </div>
        </div>
      )}

      {!result && !loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FeatureCard 
            title="Soil Compatibility" 
            desc="Check if your soil pH and nutrient levels match your crop's needs."
          />
          <FeatureCard 
            title="Harvest Timing" 
            desc="Predict the best harvest window for maximum quality and weight."
          />
        </div>
      )}
    </div>
  );
};

const FeatureCard = ({ title, desc }: any) => (
  <div className="p-6 bg-white border border-slate-200 rounded-2xl hover:border-emerald-200 hover:shadow-md transition-all group">
    <div className="flex items-start justify-between">
      <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-emerald-50 group-hover:text-emerald-500 transition-colors">
        <Info size={24} />
      </div>
      <ChevronRight className="text-slate-300" />
    </div>
    <h4 className="font-bold text-slate-800 mt-4 mb-2">{title}</h4>
    <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
  </div>
);

export default Advisory;
