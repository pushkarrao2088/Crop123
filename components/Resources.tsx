
import React from 'react';
import { FileText, Play, ArrowRight, Download, BookOpen, ExternalLink } from 'lucide-react';

const Resources: React.FC = () => {
  const articles = [
    { title: "The Future of Satellite Agri-Intelligence", category: "Whitepaper", image: "https://images.unsplash.com/photo-1530507629858-e4977d30e9e0?auto=format&fit=crop&q=80&w=400" },
    { title: "Maximizing Paddy Yields in Variable Climates", category: "Farmer Guide", image: "https://images.unsplash.com/photo-1563514223385-555e09f518e3?auto=format&fit=crop&q=80&w=400" },
    { title: "How 5G is Transforming Rural Farming", category: "Blog", image: "https://images.unsplash.com/photo-1594903310633-87f54c9c22e4?auto=format&fit=crop&q=80&w=400" },
  ];

  return (
    <div className="space-y-12 animate-in fade-in duration-500">
      <div className="max-w-3xl">
        <h2 className="text-5xl font-black text-slate-900 mb-6 tracking-tight">AgroSmart Resources</h2>
        <p className="text-xl text-slate-500 leading-relaxed">The hub for the latest insights in ag-tech, sustainable farming protocols, and data-driven success stories.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {articles.map((item, i) => (
          <div key={i} className="bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden shadow-sm hover:shadow-2xl transition-all group cursor-pointer">
            <div className="aspect-[16/10] overflow-hidden relative">
              <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute top-4 left-4 bg-emerald-600 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-xl shadow-lg">
                {item.category}
              </div>
            </div>
            <div className="p-8">
              <h4 className="text-xl font-bold text-slate-900 mb-4 group-hover:text-emerald-600 transition-colors leading-snug">{item.title}</h4>
              <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                <span className="text-sm font-bold text-slate-400 flex items-center gap-2">
                  <BookOpen size={16} /> Read Now
                </span>
                <ArrowRight size={20} className="text-slate-200 group-hover:text-emerald-500 group-hover:translate-x-1 transition-all" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-slate-900 rounded-[3rem] p-12 text-white flex flex-col justify-between group cursor-pointer">
          <div className="space-y-4">
            <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center text-emerald-400">
               <Play size={24} fill="currentColor" />
            </div>
            <h3 className="text-3xl font-black tracking-tight">Video Case Studies</h3>
            <p className="text-slate-400">See how farmers around the world are increasing efficiency with AgroSmart platform.</p>
          </div>
          <div className="flex items-center gap-2 text-emerald-400 font-bold mt-8 group-hover:gap-4 transition-all">
             Watch Stories <ExternalLink size={18} />
          </div>
        </div>

        <div className="bg-emerald-50 rounded-[3rem] p-12 flex flex-col justify-between group cursor-pointer border border-emerald-100">
          <div className="space-y-4">
            <div className="w-14 h-14 bg-emerald-600 rounded-2xl flex items-center justify-center text-white">
               <Download size={24} />
            </div>
            <h3 className="text-3xl font-black tracking-tight text-slate-900">Platform Guides</h3>
            <p className="text-slate-600">Download step-by-step PDF manuals on configuring plots and using AI diagnostics.</p>
          </div>
          <div className="flex items-center gap-2 text-emerald-700 font-bold mt-8 group-hover:gap-4 transition-all">
             Browse Library <ArrowRight size={18} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resources;
