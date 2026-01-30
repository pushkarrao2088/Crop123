
import React from 'react';
import { getBeginnerPlantingPlan } from '../services/geminiService';
import { cropService } from '../services/cropService';
import { Rocket, Sprout, CloudSun, Leaf, Loader2, CheckCircle, ArrowRight, BookOpen, Target, ShieldCheck } from 'lucide-react';

const soilTypes = [
  { id: 'clay', name: 'Clay Soil', desc: 'Heavy, holds moisture well but slow to drain.', color: 'bg-amber-100 border-amber-200' },
  { id: 'sandy', name: 'Sandy Soil', desc: 'Drains quickly, warms up fast in spring.', color: 'bg-yellow-50 border-yellow-200' },
  { id: 'loamy', name: 'Loamy Soil', desc: 'The gold standard. Fertile and well-draining.', color: 'bg-emerald-50 border-emerald-200' },
  { id: 'silt', name: 'Silt Soil', desc: 'Smooth, retains moisture effectively.', color: 'bg-slate-100 border-slate-200' },
];

interface BeginnerPlannerProps {
  userId?: string;
}

const BeginnerPlanner: React.FC<BeginnerPlannerProps> = ({ userId }) => {
  const [step, setStep] = React.useState(1);
  const [loading, setLoading] = React.useState(false);
  const [plan, setPlan] = React.useState<string | null>(null);
  const [formData, setFormData] = React.useState({
    soil: '',
    weather: '',
    crop: ''
  });

  const generatePlan = async () => {
    setLoading(true);
    try {
      const result = await getBeginnerPlantingPlan(formData);
      setPlan(result);

      if (userId) {
        await cropService.savePlantingPlan(
          userId,
          formData.crop,
          formData.soil,
          formData.weather,
          result
        );
      }
    } catch (e) {
      setPlan("Failed to generate your personalized plan. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-8 animate-in slide-in-from-right-8 duration-500">
            <div className="text-center max-w-lg mx-auto">
              <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 mx-auto mb-6">
                <Sprout size={32} />
              </div>
              <h3 className="text-3xl font-black text-slate-900 mb-2">Identify Your Foundation</h3>
              <p className="text-slate-500">Choose the soil type that best matches your land.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {soilTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => { setFormData({ ...formData, soil: type.name }); setStep(2); }}
                  className={`p-6 rounded-[2rem] border-2 text-left transition-all ${
                    formData.soil === type.name ? 'border-emerald-500 ring-4 ring-emerald-50' : 'border-slate-100 hover:border-emerald-200 bg-white'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-xl mb-4 flex items-center justify-center ${type.color}`}>
                    <Leaf size={20} className="text-slate-700" />
                  </div>
                  <h4 className="font-bold text-slate-900 mb-1">{type.name}</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">{type.desc}</p>
                </button>
              ))}
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-8 animate-in slide-in-from-right-8 duration-500">
            <div className="text-center max-w-lg mx-auto">
              <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mx-auto mb-6">
                <CloudSun size={32} />
              </div>
              <h3 className="text-3xl font-black text-slate-900 mb-2">Local Environment</h3>
              <p className="text-slate-500">What is the weather like in your region currently?</p>
            </div>
            <div className="grid grid-cols-1 gap-4 max-w-md mx-auto">
              {['Hot & Sunny', 'Moderate & Humid', 'Cool & Dry', 'Heavy Monsoon'].map((w) => (
                <button
                  key={w}
                  onClick={() => { setFormData({ ...formData, weather: w }); setStep(3); }}
                  className="w-full p-6 bg-white border border-slate-100 rounded-2xl text-left font-bold text-slate-700 hover:border-emerald-500 hover:bg-emerald-50 transition-all flex items-center justify-between group"
                >
                  {w}
                  <ArrowRight size={18} className="text-slate-200 group-hover:text-emerald-500 group-hover:translate-x-1 transition-all" />
                </button>
              ))}
              <input 
                type="text" 
                placeholder="Or type custom region/weather..." 
                className="w-full p-6 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    setFormData({ ...formData, weather: (e.target as HTMLInputElement).value });
                    setStep(3);
                  }
                }}
              />
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-8 animate-in slide-in-from-right-8 duration-500">
            <div className="text-center max-w-lg mx-auto">
              <div className="w-16 h-16 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-600 mx-auto mb-6">
                <Target size={32} />
              </div>
              <h3 className="text-3xl font-black text-slate-900 mb-2">What's the Dream?</h3>
              <p className="text-slate-500">Which crop do you want to master first?</p>
            </div>
            <div className="max-w-md mx-auto space-y-6">
              <div className="relative">
                <input 
                  type="text" 
                  autoFocus
                  placeholder="e.g. Cherry Tomato, Spinach, Corn..." 
                  className="w-full p-8 bg-white border border-slate-200 rounded-[2rem] text-xl font-bold outline-none focus:ring-4 focus:ring-emerald-50 focus:border-emerald-500 transition-all text-center"
                  value={formData.crop}
                  onChange={(e) => setFormData({ ...formData, crop: e.target.value })}
                />
              </div>
              <button
                disabled={!formData.crop}
                onClick={() => { generatePlan(); setStep(4); }}
                className="w-full py-6 bg-emerald-600 hover:bg-emerald-700 text-white rounded-[2rem] font-black text-xl shadow-xl shadow-emerald-200 transition-all flex items-center justify-center gap-3 active:scale-95 disabled:opacity-50"
              >
                Generate My Plan <ArrowRight size={24} />
              </button>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-8 animate-in zoom-in-95 duration-700">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-20 gap-8">
                <div className="relative">
                  <div className="w-24 h-24 border-8 border-slate-100 rounded-full"></div>
                  <div className="absolute inset-0 w-24 h-24 border-8 border-t-emerald-500 rounded-full animate-spin"></div>
                  <Rocket className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-emerald-500" size={32} />
                </div>
                <div className="text-center space-y-2">
                  <h4 className="text-2xl font-black text-slate-900">Synthesizing Your Success...</h4>
                  <p className="text-slate-400 font-medium">Aggregating climatic data and soil chemistry indices.</p>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-[3.5rem] border border-slate-100 shadow-sm overflow-hidden border-t-8 border-t-emerald-500">
                <div className="p-10 lg:p-16">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12 border-b border-slate-50 pb-10">
                    <div>
                      <div className="flex items-center gap-2 text-emerald-600 font-bold mb-2 text-xs uppercase tracking-[0.2em]">
                        <CheckCircle size={14} /> AI SUCCESS PROTOCOL
                      </div>
                      <h3 className="text-4xl font-black text-slate-900 tracking-tight">Beginner Guide: {formData.crop}</h3>
                    </div>
                    <button 
                      onClick={() => setStep(1)}
                      className="px-6 py-3 bg-slate-50 text-slate-400 rounded-2xl font-bold hover:bg-slate-100 transition-all"
                    >
                      Reset Wizard
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                     <div className="lg:col-span-8 space-y-8">
                        <div className="prose prose-slate lg:prose-lg max-w-none">
                          {plan?.split('\n').map((line, i) => {
                             if (line.startsWith('#') || line.includes('**')) {
                               return <h4 key={i} className="text-2xl font-black text-slate-900 mt-8 first:mt-0 mb-4">{line.replace(/#/g, '').replace(/\*\*/g, '').trim()}</h4>;
                             }
                             if (line.trim().startsWith('-') || line.trim().startsWith('*')) {
                               return <li key={i} className="text-slate-600 font-medium ml-4 list-disc">{line.replace(/^[-*]\s*/, '')}</li>;
                             }
                             return <p key={i} className="text-slate-500 leading-relaxed font-medium mb-4">{line}</p>;
                          })}
                        </div>
                     </div>
                     <div className="lg:col-span-4 space-y-6">
                        <div className="bg-emerald-50 p-8 rounded-3xl border border-emerald-100">
                           <h5 className="font-bold text-emerald-800 mb-6 flex items-center gap-2">
                             <ShieldCheck size={20} /> Beginner Safety Tip
                           </h5>
                           <p className="text-sm text-emerald-700 leading-relaxed font-medium">
                             "New farmers often over-water. Stick to the schedule generated here to prevent root rot in your {formData.soil}."
                           </p>
                        </div>
                        <div className="bg-slate-900 p-8 rounded-3xl text-white shadow-xl shadow-slate-200">
                           <h5 className="font-bold text-slate-400 uppercase text-[10px] tracking-widest mb-4">Quick Stats</h5>
                           <div className="space-y-4">
                              <div className="flex justify-between border-b border-white/5 pb-2">
                                 <span className="text-xs opacity-60">Success Probability</span>
                                 <span className="text-xs font-black text-emerald-400">92%</span>
                              </div>
                              <div className="flex justify-between border-b border-white/5 pb-2">
                                 <span className="text-xs opacity-60">Soil Fit</span>
                                 <span className="text-xs font-black text-blue-400">OPTIMAL</span>
                              </div>
                              <div className="flex justify-between">
                                 <span className="text-xs opacity-60">Complexity</span>
                                 <span className="text-xs font-black text-amber-400">LOW</span>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-5xl mx-auto pb-20">
      <div className="flex items-center gap-6 mb-16">
        <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
           <div className="h-full bg-emerald-500 transition-all duration-700" style={{ width: `${(step/4)*100}%` }}></div>
        </div>
        <div className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Step {step} / 4</div>
      </div>
      {renderStep()}
    </div>
  );
};

export default BeginnerPlanner;
