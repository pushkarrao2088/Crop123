
import React from 'react';
import { getMarketInsights } from '../services/geminiService';
import { TrendingUp, DollarSign, MapPin, Loader2, ArrowUpRight, ArrowDownRight, Info } from 'lucide-react';

const MarketHub: React.FC = () => {
  const [region, setRegion] = React.useState('India (Central Region)');
  const [insights, setInsights] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetchMarketData();
  }, [region]);

  const fetchMarketData = async () => {
    setLoading(true);
    try {
      const result = await getMarketInsights(region);
      setInsights(result);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-800 mb-1">Market Insight Hub</h2>
          <p className="text-slate-500">Real-time price tracking and profit-maximizing strategies.</p>
        </div>
        <div className="flex items-center gap-2 bg-white border border-slate-200 px-4 py-2 rounded-xl">
          <MapPin size={18} className="text-emerald-500" />
          <select 
            className="outline-none bg-transparent font-medium text-slate-700"
            value={region}
            onChange={(e) => setRegion(e.target.value)}
          >
            <option>India (Central Region)</option>
            <option>USA (Midwest)</option>
            <option>Europe (Southern)</option>
            <option>Global Market</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MarketTicker label="Basmati Rice" price="₹4,200/qt" change="+12%" up />
        <MarketTicker label="Soya Bean" price="₹5,600/qt" change="-2.5%" />
        <MarketTicker label="Wheat" price="₹2,100/qt" change="+0.8%" up />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm flex flex-col">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
            <h3 className="font-bold text-slate-800 flex items-center gap-2">
              <TrendingUp className="text-emerald-500" />
              Price Prediction Model
            </h3>
            <span className="text-xs font-bold text-slate-400">NEXT 30 DAYS</span>
          </div>
          <div className="flex-1 p-8 text-center flex flex-col items-center justify-center space-y-4">
             <div className="w-full h-48 bg-slate-50 rounded-2xl flex items-center justify-center border border-dashed border-slate-200">
               <div className="space-y-2">
                <TrendingUp size={48} className="text-slate-200 mx-auto" />
                <p className="text-slate-400 text-sm">Historical Price Chart Visualization</p>
               </div>
             </div>
             <p className="text-slate-600 text-sm italic">"Current indicators suggest a 15% price surge for Wheat in the second week of March due to unexpected moisture in harvesting regions."</p>
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm flex flex-col min-h-[400px]">
          <div className="p-6 border-b border-slate-100 bg-emerald-600 text-white">
            <h3 className="font-bold flex items-center gap-2">
              <DollarSign size={20} />
              AI Sell Recommendation
            </h3>
          </div>
          <div className="flex-1 p-6 overflow-y-auto">
            {loading ? (
              <div className="flex flex-col items-center justify-center h-full gap-4 text-slate-400">
                <Loader2 className="animate-spin" size={32} />
                <p>Analyzing global market shifts...</p>
              </div>
            ) : (
              <div className="prose prose-sm max-w-none">
                {insights?.text.split('\n').map((line: string, i: number) => (
                  <p key={i} className="mb-2">{line}</p>
                ))}
              </div>
            )}
          </div>
          {insights?.sources?.length > 0 && (
            <div className="p-4 bg-slate-50 border-t border-slate-100">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                <Info size={12} />
                Sources
              </div>
              <div className="flex flex-wrap gap-2">
                {insights.sources.slice(0, 3).map((chunk: any, i: number) => (
                   <a 
                    key={i} 
                    href={chunk.web?.uri} 
                    target="_blank" 
                    rel="noopener"
                    className="text-[10px] bg-white border border-slate-200 px-2 py-1 rounded-md text-slate-500 truncate max-w-[150px]"
                   >
                     {chunk.web?.title || 'Market Source'}
                   </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const MarketTicker = ({ label, price, change, up }: any) => (
  <div className="bg-white p-5 rounded-2xl border border-slate-200 flex items-center justify-between shadow-sm hover:shadow-md transition-shadow">
    <div>
      <div className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">{label}</div>
      <div className="text-xl font-bold text-slate-800">{price}</div>
    </div>
    <div className={`flex items-center gap-1 font-bold text-sm ${up ? 'text-emerald-500' : 'text-rose-500'}`}>
      {up ? <ArrowUpRight size={18} /> : <ArrowDownRight size={18} />}
      {change}
    </div>
  </div>
);

export default MarketHub;
