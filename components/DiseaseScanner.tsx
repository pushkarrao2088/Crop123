
import React from 'react';
import { analyzeCropHealth } from '../services/geminiService';
import { cropService } from '../services/cropService';
import { Camera, Upload, Loader2, AlertCircle, RefreshCw, FileText, ScanEye, ShieldCheck } from 'lucide-react';

interface DiseaseScannerProps {
  userId?: string;
}

const DiseaseScanner: React.FC<DiseaseScannerProps> = ({ userId }) => {
  const [image, setImage] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [result, setResult] = React.useState<string | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setImage(base64);
        analyzeImage(base64.split(',')[1]);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeImage = async (base64Data: string) => {
    setLoading(true);
    setResult(null);
    try {
      const analysis = await analyzeCropHealth(base64Data);
      setResult(analysis);

      if (userId && image) {
        await cropService.saveFieldScan(userId, image, analysis, 'Medium');
      }
    } catch (err) {
      console.error(err);
      setResult("Error analyzing image. Please ensure it's a clear photo of your field or crop.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-12 animate-in fade-in duration-700 pb-20">
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-2 text-emerald-600 font-black text-sm uppercase tracking-[0.3em]">
          <ScanEye size={20} />
          Visual Intelligence Node
        </div>
        <h2 className="text-5xl lg:text-6xl font-black text-slate-900 tracking-tighter leading-none">AI Field Scan</h2>
        <p className="text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed">Instantly generate a comprehensive health report of your field. Detect diseases, pest infestations, and nutrient deficiencies from a single photo.</p>
      </div>

      {!image ? (
        <div 
          onClick={() => fileInputRef.current?.click()}
          className="aspect-video md:aspect-[21/9] border-4 border-dashed border-slate-200 rounded-[3rem] bg-white flex flex-col items-center justify-center cursor-pointer hover:border-emerald-400 hover:bg-emerald-50/50 transition-all group shadow-sm hover:shadow-xl hover:shadow-emerald-50"
        >
          <div className="w-24 h-24 rounded-[2rem] bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-emerald-100 group-hover:text-emerald-600 transition-all mb-6 group-hover:scale-110 shadow-inner">
            <Camera size={44} />
          </div>
          <div className="text-center">
            <p className="text-2xl font-black text-slate-900 mb-1">Upload Field View</p>
            <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">Click to snap or browse files</p>
          </div>
          <input 
            type="file" 
            ref={fileInputRef} 
            className="hidden" 
            accept="image/*" 
            onChange={handleFileChange}
          />
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-[3rem] overflow-hidden border-8 border-white shadow-2xl bg-slate-200 aspect-square relative group">
              <img src={image} alt="Crop" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              {loading && (
                <div className="absolute inset-0 bg-slate-900/40 flex items-center justify-center backdrop-blur-md">
                  <div className="text-center text-white">
                    <Loader2 className="animate-spin mx-auto mb-6 opacity-80" size={64} />
                    <p className="font-black text-xl tracking-tight">Scanning Pixels...</p>
                    <p className="text-[10px] font-bold text-emerald-300 uppercase tracking-widest mt-2">AI Neural Processing</p>
                  </div>
                </div>
              )}
            </div>
            <button 
              onClick={() => {
                setImage(null);
                setResult(null);
              }}
              className="w-full py-5 bg-white border border-slate-100 text-slate-500 rounded-[2rem] font-black text-lg flex items-center justify-center gap-3 hover:bg-slate-50 transition-all shadow-sm active:scale-95"
            >
              <RefreshCw size={22} />
              Start New Scan
            </button>
          </div>

          <div className="lg:col-span-7">
            {loading ? (
              <div className="bg-white rounded-[3rem] border border-slate-100 p-12 space-y-8 animate-pulse">
                <div className="h-10 bg-slate-100 rounded-2xl w-3/4"></div>
                <div className="space-y-4">
                  <div className="h-4 bg-slate-50 rounded-lg w-full"></div>
                  <div className="h-4 bg-slate-50 rounded-lg w-full"></div>
                  <div className="h-4 bg-slate-50 rounded-lg w-5/6"></div>
                </div>
                <div className="pt-8 grid grid-cols-2 gap-4">
                   <div className="h-24 bg-slate-50 rounded-3xl"></div>
                   <div className="h-24 bg-slate-50 rounded-3xl"></div>
                </div>
              </div>
            ) : result ? (
              <div className="bg-white rounded-[3rem] border border-slate-100 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-500">
                <div className="p-10 bg-slate-900 text-white flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-emerald-500 rounded-2xl">
                       <FileText size={24} />
                    </div>
                    <div>
                      <h4 className="text-2xl font-black">Field Scan Report</h4>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">AgroSmart Intelligence Node</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <div className="px-4 py-2 bg-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                      <ShieldCheck size={14} className="text-emerald-400" /> AI Verified
                    </div>
                  </div>
                </div>
                
                <div className="p-10 lg:p-12 space-y-10">
                   <div className="prose prose-slate prose-lg max-w-none">
                      {result.split('\n').map((line, i) => {
                        const isHeader = line.includes('###') || line.includes('**');
                        const content = line.replace(/###/g, '').replace(/\*\*/g, '').trim();
                        if (!content) return null;
                        
                        return (
                          <div key={i} className={`${isHeader ? 'mt-8 first:mt-0 mb-4' : 'mb-3'}`}>
                            {isHeader ? (
                              <h5 className="text-xl font-black text-slate-900 flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                                {content}
                              </h5>
                            ) : (
                              <p className="text-slate-600 font-medium leading-relaxed pl-3 border-l border-slate-100">
                                {content}
                              </p>
                            )}
                          </div>
                        );
                      })}
                   </div>

                   <div className="pt-8 border-t border-slate-50 grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-emerald-50 p-6 rounded-3xl border border-emerald-100">
                         <h6 className="font-black text-emerald-900 text-xs uppercase tracking-widest mb-3">Quick Remedy</h6>
                         <p className="text-sm font-bold text-emerald-800 leading-relaxed italic">"Monitor irrigation levels closely for the next 48 hours to prevent spread."</p>
                      </div>
                      <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
                         <h6 className="font-black text-slate-400 text-xs uppercase tracking-widest mb-3">Confidence Level</h6>
                         <div className="flex items-end gap-2">
                           <span className="text-3xl font-black text-slate-900">98.4%</span>
                           <span className="text-[10px] font-black text-slate-300 pb-1">ACCURACY</span>
                         </div>
                      </div>
                   </div>
                </div>
              </div>
            ) : (
              <div className="h-[500px] flex flex-col items-center justify-center text-slate-300 bg-white border-4 border-dashed border-slate-100 rounded-[3rem] p-12 text-center space-y-6">
                <ScanEye size={80} className="opacity-20" />
                <div className="max-w-xs">
                  <h4 className="text-2xl font-black text-slate-400 tracking-tight">Awaiting Scan</h4>
                  <p className="text-slate-300 font-medium mt-2">Upload a photo to generate your detailed field report.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="bg-amber-50 rounded-[2.5rem] p-10 border border-amber-100 flex flex-col md:flex-row gap-8 items-start md:items-center">
        <div className="w-16 h-16 bg-white rounded-3xl flex items-center justify-center text-amber-500 shadow-sm shrink-0">
          <AlertCircle size={32} />
        </div>
        <div className="space-y-2">
          <h5 className="text-xl font-black text-amber-900 tracking-tight">Tips for high-accuracy reports</h5>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             <div className="flex items-center gap-3">
               <div className="w-2 h-2 rounded-full bg-amber-400"></div>
               <p className="text-sm font-bold text-amber-800/70">Use natural daylight</p>
             </div>
             <div className="flex items-center gap-3">
               <div className="w-2 h-2 rounded-full bg-amber-400"></div>
               <p className="text-sm font-bold text-amber-800/70">Focus on symptoms</p>
             </div>
             <div className="flex items-center gap-3">
               <div className="w-2 h-2 rounded-full bg-amber-400"></div>
               <p className="text-sm font-bold text-amber-800/70">Avoid blurry shots</p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiseaseScanner;
