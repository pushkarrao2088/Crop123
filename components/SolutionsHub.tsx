
import React from 'react';
import { 
  Globe, 
  Layers, 
  Thermometer, 
  ShieldCheck, 
  Cpu, 
  Leaf, 
  Sprout, 
  Connection, 
  ArrowRight, 
  CheckCircle2, 
  ChevronLeft,
  Activity,
  Zap,
  Database,
  BarChart3
} from 'lucide-react';
import { SolutionItem } from '../types';

const SOLUTIONS_DATA: SolutionItem[] = [
  {
    id: 'digital-transformation-1-grd',
    title: "Digital Transformation of Agriculture",
    subtitle: "Enabling resilient food systems through smart Agri-Tech solutions",
    description: "Digitize every acre to build a predictable, profitable, and sustainable agricultural ecosystem.",
    icon: 'layers',
    longDescription: "AgroSmart's digital transformation framework empowers organizations to move beyond manual record-keeping into a world of hyper-localized data intelligence. We bridge the gap between traditional farming and modern data science.",
    benefits: ["100% Digital Traceability", "Data-Driven Decision Support", "Streamlined Field Operations"],
    features: [
      { title: "Farm Digitization", desc: "Automated plot mapping and farmer profiling using GPS and satellite data." },
      { title: "Operational Intelligence", desc: "Real-time tracking of field staff, activities, and resource allocation." }
    ]
  },
  {
    id: 'supply-chain-1-grd',
    title: "Sourcing and Supply Chain Intelligence",
    subtitle: "Navigate supply chain volatility with smart AI insights",
    description: "Gain end-to-end visibility from the farm gate to the processing unit to ensure quality and consistency.",
    icon: 'globe',
    longDescription: "Our supply chain engine predicts sourcing risks weeks in advance, allowing you to mitigate shortages and maintain high quality across your entire procurement network.",
    benefits: ["Reduced Procurement Wastage", "Enhanced Quality Compliance", "Predictive Sourcing Models"],
    features: [
      { title: "Traceability Suite", desc: "Blockchain-ready logs of every input and activity associated with the final product." },
      { title: "Yield Forecast", desc: "AI models that predict regional harvest volumes to optimize logistics." }
    ]
  },
  {
    id: 'smart-temperature-1-grd',
    title: "Climate Smart Agriculture (CSA)",
    subtitle: "Adapting to a changing climate with smart farming solutions",
    description: "Build resilience against unpredictable weather patterns with hyper-local climate intelligence.",
    icon: 'thermometer',
    longDescription: "AgroSmart CSA tools help farmers adapt to changing heatwaves, frost, and precipitation patterns using localized sensors and satellite weather streams.",
    benefits: ["Risk Mitigation Alerts", "Optimized Resource Usage", "Carbon Footprint Monitoring"],
    features: [
      { title: "Weather Risk Scoring", desc: "Daily risk levels based on forecasted humidity, wind, and temperature." },
      { title: "Irrigation Scheduling", desc: "AI-calculated water needs based on soil moisture and evaporation rates." }
    ]
  },
  {
    id: 'eudr-1-grd',
    title: "Compliance & Regulations (EUDR)",
    subtitle: "Simplify EUDR compliance with scalable digital data collection and analysis",
    description: "Automate the complex data gathering required for EU Deforestation Regulation and global standards.",
    icon: 'shield',
    longDescription: "Stay ahead of regulatory hurdles. Our platform automates the due diligence process, ensuring that your products are compliant with the latest environmental standards.",
    benefits: ["Audit-Ready Reporting", "Automated Due Diligence", "Zero-Deforestation Verification"],
    features: [
      { title: "Satellite Monitoring", desc: "Real-time monitoring of plot boundaries to verify zero-deforestation." },
      { title: "Regulation Dashboard", desc: "Unified view of compliance status across all sourcing regions." }
    ]
  },
  {
    id: 'ai-innovation-1-grd',
    title: "AI Powered Intelligent Agriculture",
    subtitle: "Cropin Intelligence: Powering the future of food with AI",
    description: "Deploy world-class AI models for pest prediction, crop health, and yield maximization.",
    icon: 'cpu',
    longDescription: "Harness the power of our proprietary Agri-LLM and computer vision models to solve the most complex agronomic challenges in real-time.",
    benefits: ["95% Diagnostic Accuracy", "Scalable AI Deployment", "Autonomous Crop Advisory"],
    features: [
      { title: "Computer Vision", desc: "Instant disease and pest identification from smartphone imagery." },
      { title: "Agri-LLM Assistant", desc: "Conversational AI trained on decades of global agronomic data." }
    ]
  },
  {
    id: 'agriculture-1-grd',
    title: "Sustainable Agriculture",
    subtitle: "Digitizing the path to sustainable and resilient farming",
    description: "Implementing ESG goals across the farm ecosystem with measurable and verifiable data points.",
    icon: 'leaf',
    longDescription: "Transition from theory to practice. We provide the tools to measure, report, and verify (MRV) sustainable farming practices at scale.",
    benefits: ["Verifiable ESG Reporting", "Reduced Chemical Runoff", "Biodiversity Mapping"],
    features: [
      { title: "Input Tracking", desc: "Precise monitoring of fertilizer and pesticide applications." },
      { title: "Impact Analytics", desc: "Visualizing sustainability metrics across different regional clusters." }
    ]
  },
  {
    id: 'regenerative-1-grd',
    title: "Regenerative Agriculture",
    subtitle: "Restoring soil, water, and biodiversity with tech-powered practices",
    description: "Tools to monitor soil carbon sequestration and biodiversity restoration across your plots.",
    icon: 'sprout',
    longDescription: "Regenerative farming is the future. AgroSmart helps you manage no-till practices, cover cropping, and biological nitrogen fixation effectively.",
    benefits: ["Increased Soil Organic Matter", "Water Table Restoration", "Carbon Credit Monetization"],
    features: [
      { title: "Soil Carbon Monitoring", desc: "Estimating carbon capture through satellite-derived biomass data." },
      { title: "Biodiversity Scores", desc: "AI assessment of regional flora and fauna health." }
    ]
  },
  {
    id: 'connection-1-grd',
    title: "Agriculture Digital Public Infrastructure (Agristack)",
    subtitle: "Farmer-centric digital infrastructure for national agriculture transformation",
    description: "Building the backbone for nationwide agricultural digitization and public-private synergy.",
    icon: 'zap',
    longDescription: "Agristack enables governments and NGOs to build a unified digital identity for farmers, integrating land records with financial services.",
    benefits: ["Financial Inclusion", "Transparent Subsidy Delivery", "Unified Farmer Registry"],
    features: [
      { title: "Digital Farmer ID", desc: "Secure, portable digital identity linked to farm credentials." },
      { title: "Service Integration", desc: "API-driven hub for insurance, credit, and market links." }
    ]
  },
];

const SolutionsHub: React.FC = () => {
  const [selectedSolution, setSelectedSolution] = React.useState<SolutionItem | null>(null);

  if (selectedSolution) {
    return (
      <div className="animate-in slide-in-from-right-8 duration-700 pb-20">
        <button 
          onClick={() => setSelectedSolution(null)}
          className="flex items-center gap-2 text-slate-500 hover:text-emerald-600 font-bold mb-10 transition-colors group"
        >
          <ChevronLeft className="group-hover:-translate-x-1 transition-transform" /> Back to Solutions Hub
        </button>

        <div className="max-w-4xl mb-16 space-y-6">
          <div className="flex items-center gap-2 text-emerald-600 font-black text-xs uppercase tracking-[0.2em]">
            <Layers size={14} /> SOLUTION DETAIL
          </div>
          <h2 className="text-5xl lg:text-7xl font-black text-slate-900 leading-[0.9] tracking-tighter">
            {selectedSolution.title}
          </h2>
          <p className="text-2xl text-slate-500 leading-relaxed font-medium">
            {selectedSolution.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          <div className="lg:col-span-8 space-y-12">
            <div className="bg-white p-10 lg:p-16 rounded-[4rem] border border-slate-100 shadow-sm">
              <p className="text-xl text-slate-600 leading-relaxed font-medium mb-12">
                {selectedSolution.longDescription}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {selectedSolution.features.map((feature, idx) => (
                  <div key={idx} className="space-y-3">
                    <h4 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                       <Zap size={20} className="text-emerald-500" /> {feature.title}
                    </h4>
                    <p className="text-slate-500 text-sm leading-relaxed">{feature.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-slate-900 p-12 lg:p-16 rounded-[4rem] text-white">
               <h3 className="text-3xl font-black mb-10">Key Strategic Benefits</h3>
               <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {selectedSolution.benefits.map((benefit, idx) => (
                    <div key={idx} className="flex flex-col gap-4">
                      <div className="w-12 h-12 bg-emerald-500 rounded-2xl flex items-center justify-center">
                        <CheckCircle2 size={24} />
                      </div>
                      <p className="font-bold text-lg leading-snug">{benefit}</p>
                    </div>
                  ))}
               </div>
            </div>
          </div>

          <div className="lg:col-span-4 sticky top-32 space-y-8">
            <div className="bg-emerald-50 p-10 rounded-[3rem] border border-emerald-100">
               <h4 className="font-black text-emerald-900 mb-4">Request a Case Study</h4>
               <p className="text-emerald-800/70 text-sm mb-8">Learn how we implemented this solution for a Fortune 500 CPG brand.</p>
               <button className="w-full bg-emerald-600 text-white py-4 rounded-2xl font-bold hover:bg-emerald-700 transition-all flex items-center justify-center gap-2">
                 Get Case Study <ArrowRight size={18} />
               </button>
            </div>
            
            <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm">
               <div className="flex items-center gap-3 mb-6">
                 <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-500">
                   <Activity size={20} />
                 </div>
                 <span className="font-bold text-slate-900">Live Statistics</span>
               </div>
               <div className="space-y-6">
                  <div>
                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Impact Radius</div>
                    <div className="text-3xl font-black">2.4M Acres</div>
                  </div>
                  <div>
                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Customer ROI</div>
                    <div className="text-3xl font-black">240% AVG</div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-16 animate-in fade-in duration-700 pb-20">
      <div className="max-w-3xl">
        <h2 className="text-6xl font-black text-slate-900 mb-6 tracking-tighter leading-none">Industry Solutions</h2>
        <p className="text-xl text-slate-500 leading-relaxed font-medium">Built for the complexity of global food systems. Choose your path to digital resilience.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {SOLUTIONS_DATA.map((solution) => (
          <div 
            key={solution.id}
            onClick={() => setSelectedSolution(solution)}
            className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:border-emerald-500 hover:-translate-y-2 transition-all group cursor-pointer flex flex-col h-full"
          >
            <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-900 mb-8 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-500">
              {getIcon(solution.icon)}
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-emerald-700 transition-colors leading-snug">
              {solution.title}
            </h3>
            <p className="text-slate-500 text-sm leading-relaxed mb-8 flex-1">
              {solution.description}
            </p>
            <div className="flex items-center justify-between pt-4 border-t border-slate-50">
              <span className="text-xs font-black text-emerald-600 uppercase tracking-widest">Learn More</span>
              <ArrowRight size={18} className="text-slate-300 group-hover:text-emerald-500 group-hover:translate-x-1 transition-all" />
            </div>
          </div>
        ))}
      </div>

      <div className="bg-slate-900 rounded-[4rem] p-12 lg:p-20 text-white relative overflow-hidden">
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <h3 className="text-4xl lg:text-5xl font-black tracking-tight leading-none">Not sure where <br/>to start?</h3>
            <p className="text-slate-400 text-lg leading-relaxed">Schedule a free consultation with our senior agronomists to build your digital transformation roadmap.</p>
            <button className="bg-emerald-500 hover:bg-emerald-400 text-white px-10 py-5 rounded-2xl font-black text-lg transition-all shadow-2xl shadow-emerald-500/20 active:scale-95">
              Book Strategy Call
            </button>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <StatBox icon={<Globe />} label="Global Reach" value="120+ Regions" />
            <StatBox icon={<Database />} label="Data Points" value="15B+ Monthly" />
            <StatBox icon={<BarChart3 />} label="Compliance" value="Audit Proof" />
            <StatBox icon={<Sprout />} label="Eco Impact" value="+40% Carbon" />
          </div>
        </div>
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-emerald-500/10 to-transparent"></div>
      </div>
    </div>
  );
};

const getIcon = (icon: string) => {
  switch (icon) {
    case 'layers': return <Layers size={32} />;
    case 'globe': return <Globe size={32} />;
    case 'thermometer': return <Thermometer size={32} />;
    case 'shield': return <ShieldCheck size={32} />;
    case 'cpu': return <Cpu size={32} />;
    case 'leaf': return <Leaf size={32} />;
    case 'sprout': return <Sprout size={32} />;
    case 'zap': return <Zap size={32} />;
    default: return <Layers size={32} />;
  }
};

const StatBox = ({ icon, label, value }: any) => (
  <div className="bg-white/5 border border-white/10 p-6 rounded-3xl backdrop-blur-md">
    <div className="text-emerald-500 mb-3">{icon}</div>
    <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">{label}</div>
    <div className="text-xl font-bold">{value}</div>
  </div>
);

export default SolutionsHub;
