
import React from 'react';
import { AppSection } from '../types';
import { 
  CheckCircle, 
  ShieldCheck, 
  Zap, 
  BarChart3, 
  CloudLightning, 
  Database, 
  Globe, 
  Sprout, 
  Rocket, 
  Users, 
  Target, 
  Award, 
  Cpu, 
  Microscope 
} from 'lucide-react';

interface CorporateInfoProps {
  type: AppSection.PRODUCTS | AppSection.SOLUTIONS | AppSection.ABOUT;
}

const CorporateInfo: React.FC<CorporateInfoProps> = ({ type }) => {
  const data = {
    [AppSection.PRODUCTS]: {
      title: "Intelligent Agriculture Cloud",
      subtitle: "The world's first unified cloud for agriculture, purpose-built to digitize every farm on the planet.",
      cta: "Explore Product Ecosystem",
      features: [
        { icon: <Cpu />, title: "Agri-Intelligence (AI)", desc: "Predictive modeling using multi-spectral satellite imagery and machine learning." },
        { icon: <Database />, title: "SmartFarm Hub", desc: "A robust SaaS platform managing over 16 million acres globally with real-time data ingestion." },
        { icon: <ShieldCheck />, title: "Traceability Suite", desc: "End-to-end supply chain transparency ensuring compliance with global ESG standards." },
        { icon: <CloudLightning />, title: "Risk Monitoring", desc: "Hyper-local weather risk assessment and crop health scoring at the plot level." },
      ]
    },
    [AppSection.SOLUTIONS]: {
      title: "Industry-Specific Frameworks",
      subtitle: "Addressing the unique challenges of the global agriculture value chain with data-driven decision support.",
      cta: "View Solutions by Sector",
      features: [
        { icon: <Users />, title: "CPG & Food Brands", desc: "Secure your supply chain, monitor farm performance, and meet sustainability goals." },
        { icon: <BarChart3 />, title: "Agri-Finance", desc: "Reduce lending risk with alternative credit scoring based on historic farm performance." },
        { icon: <Microscope />, title: "Seed & R&D", desc: "Accelerate breeding cycles and monitor field trials with digital phenotyping." },
        { icon: <Globe />, title: "Gov & Development", desc: "Empower regional farming communities with predictive advisory at scale." },
      ]
    },
    [AppSection.ABOUT]: {
      title: "The Heart of Ag-Tech",
      subtitle: "AgroSmart is on a mission to maximize per-acre value for farmers through the power of data and AI.",
      cta: "Join Our Mission",
      features: [
        { icon: <Rocket />, title: "7M+ Farmers Impacted", desc: "Improving livelihoods and ensuring food security across 15+ developing nations." },
        { icon: <Target />, title: "Zero Hunger Goal", desc: "Alignment with UN SDG 2 to end hunger and promote sustainable agriculture." },
        { icon: <Award />, title: "Global Recognition", desc: "Awarded 'AgTech of the Year' for our innovative satellite-first approach." },
        { icon: <Sprout />, title: "40% Yield Boost", desc: "Our platform has consistently demonstrated significant productivity gains for users." },
      ]
    }
  }[type];

  return (
    <div className="animate-in slide-in-from-right-8 duration-700 pb-20">
      <div className="max-w-4xl mb-16 space-y-4">
        <div className="w-16 h-1 bg-emerald-500 rounded-full mb-8"></div>
        <h2 className="text-5xl lg:text-7xl font-black text-slate-900 leading-none tracking-tighter">
          {data.title.split(' ').map((word, i) => (
            <span key={i} className={i === 1 ? "text-emerald-600" : ""}>{word} </span>
          ))}
        </h2>
        <p className="text-2xl text-slate-500 leading-relaxed font-medium">
          {data.subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {data.features.map((f: any, i: number) => (
          <div key={i} className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all group flex flex-col">
            <div className="w-16 h-16 bg-slate-50 text-slate-900 rounded-3xl flex items-center justify-center mb-8 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-500">
              {React.cloneElement(f.icon, { size: 32 })}
            </div>
            <h4 className="text-2xl font-bold text-slate-900 mb-4">{f.title}</h4>
            <p className="text-slate-500 leading-relaxed text-sm flex-1">{f.desc}</p>
          </div>
        ))}
      </div>

      <div className="mt-20 p-12 lg:p-20 bg-emerald-950 rounded-[4rem] text-white flex flex-col lg:flex-row items-center justify-between gap-12 relative overflow-hidden">
        <div className="max-w-xl relative z-10 space-y-6">
          <h3 className="text-4xl lg:text-5xl font-black leading-tight">Transformation starts with data.</h3>
          <p className="text-emerald-200/60 text-lg leading-relaxed">Join 250+ enterprise partners in the digital agriculture revolution. Let's build a sustainable food future together.</p>
          <div className="flex items-center gap-6 pt-4">
             <div className="flex -space-x-4">
               {[1,2,3,4].map(i => (
                 <div key={i} className="w-12 h-12 rounded-full bg-emerald-800 border-4 border-emerald-950 flex items-center justify-center text-[10px] font-bold">U{i}</div>
               ))}
             </div>
             <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">Trusted by leading agronomists</span>
          </div>
        </div>
        <div className="relative z-10 w-full lg:w-auto">
          <button className="w-full lg:w-auto bg-emerald-500 hover:bg-emerald-400 px-12 py-6 rounded-3xl font-black text-white text-xl transition-all shadow-2xl shadow-emerald-500/20 active:scale-95">
            {data.cta}
          </button>
        </div>
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-white/5 rounded-full blur-2xl"></div>
      </div>
    </div>
  );
};

export default CorporateInfo;
