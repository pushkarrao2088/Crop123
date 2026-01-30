
import React from 'react';
import { AppSection, User, UserRole, CartItem } from '../types';
import { 
  Sprout, 
  Menu, 
  X,
  Bell,
  Globe,
  LogOut,
  ChevronDown,
  User as UserIcon,
  FlaskConical,
  LayoutDashboard,
  ShieldCheck,
  BookOpen,
  Layers,
  Rocket,
  ShoppingCart,
  ScanEye
} from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  activeSection: AppSection;
  setActiveSection: (section: AppSection) => void;
  user: User;
  onLogout: () => void;
  cartCount: number;
}

const Layout: React.FC<LayoutProps> = ({ children, activeSection, setActiveSection, user, onLogout, cartCount }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [isProfileOpen, setIsProfileOpen] = React.useState(false);

  // Added Field Scan to the top navigation bar
  const navItems = [
    { id: AppSection.PRODUCTS, label: 'Marketplace', badge: 'New' },
    { id: AppSection.HEALTH_SCAN, label: 'Field Scan' },
    { id: AppSection.KNOWLEDGE_GRID, label: 'Crop Intelligence' },
    { id: AppSection.SOIL_TEST, label: 'Soil Analysis', badge: 'Free' },
    { id: AppSection.BEGINNER_PLANNER, label: 'Quick Start' },
  ];

  const farmerTools = [
    { id: AppSection.DASHBOARD, label: 'Dashboard', icon: LayoutDashboard },
    { id: AppSection.SOIL_TEST, label: 'Soil Analysis', icon: FlaskConical },
    { id: AppSection.HEALTH_SCAN, label: 'Field Scan', icon: ScanEye },
    { id: AppSection.MARKET, label: 'Market Hub', icon: Globe },
  ];

  return (
    <div className="min-h-screen bg-[#fcfdfd] flex flex-col">
      {/* Top Professional Horizontal Navigation */}
      <nav className="sticky top-0 z-[100] bg-white/80 backdrop-blur-xl border-b border-slate-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-12">
            {/* Logo */}
            <div 
              className="flex items-center gap-3 cursor-pointer group"
              onClick={() => setActiveSection(user.role === UserRole.ADMIN ? AppSection.ADMIN_OVERVIEW : AppSection.DASHBOARD)}
            >
              <div className="w-10 h-10 gradient-bg rounded-xl flex items-center justify-center text-white shadow-lg shadow-emerald-200 group-hover:scale-105 transition-transform">
                <Sprout size={24} />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black text-slate-900 tracking-tighter">AgroSmart</span>
                <span className="text-[9px] font-black text-emerald-600 uppercase tracking-widest leading-none">Intelligent Cloud</span>
              </div>
            </div>

            {/* Desktop Nav Links */}
            <div className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-1 relative ${
                    activeSection === item.id 
                      ? 'text-emerald-700 bg-emerald-50/50' 
                      : 'text-slate-500 hover:text-emerald-600 hover:bg-slate-50'
                  }`}
                >
                  {item.label}
                  {item.badge && (
                    <span className="absolute -top-1 -right-1 px-1.5 py-0.5 bg-emerald-500 text-[8px] font-black text-white rounded-full uppercase leading-none shadow-sm">
                      {item.badge}
                    </span>
                  )}
                  {item.id !== AppSection.BEGINNER_PLANNER && item.id !== AppSection.SOIL_TEST && item.id !== AppSection.PRODUCTS && item.id !== AppSection.HEALTH_SCAN && <ChevronDown size={14} className="opacity-40" />}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Farmer Specific Quick Access */}
            <div className="hidden md:flex items-center gap-2 border-r border-slate-100 pr-4 mr-2">
              <button
                onClick={() => setActiveSection(AppSection.PRODUCTS)}
                className={`p-2 rounded-xl transition-all relative ${
                  activeSection === AppSection.PRODUCTS ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:bg-slate-50'
                }`}
                title="Marketplace"
              >
                <ShoppingCart size={20} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 text-white text-[8px] font-black rounded-full flex items-center justify-center border border-white">
                    {cartCount}
                  </span>
                )}
              </button>
              {farmerTools.slice(0, 3).map(tool => (
                <button
                  key={tool.id}
                  onClick={() => setActiveSection(tool.id)}
                  className={`p-2 rounded-xl transition-all ${
                    activeSection === tool.id ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:bg-slate-50'
                  }`}
                  title={tool.label}
                >
                  <tool.icon size={20} />
                </button>
              ))}
            </div>

            <button className="p-2 text-slate-400 hover:text-emerald-600 relative transition-colors">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
            </button>

            {/* User Profile Dropdown */}
            <div className="relative">
              <button 
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-2 pl-2 pr-1 py-1 rounded-2xl border border-slate-100 bg-slate-50 hover:bg-white transition-all"
              >
                <img src={user.avatar} className="w-8 h-8 rounded-xl object-cover" alt="User" />
                <span className="text-sm font-bold text-slate-700 hidden sm:inline">{user.name.split(' ')[0]}</span>
                <ChevronDown size={16} className={`text-slate-400 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 mt-3 w-56 bg-white rounded-3xl shadow-2xl border border-slate-100 p-2 animate-in zoom-in-95 duration-200">
                  <div className="p-4 border-b border-slate-50 mb-2">
                    <div className="font-bold text-slate-900">{user.name}</div>
                    <div className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">{user.role}</div>
                  </div>
                  <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-slate-600 hover:bg-slate-50 transition-all">
                    <UserIcon size={18} /> My Profile
                  </button>
                  <button 
                    onClick={onLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-rose-600 hover:bg-rose-50 transition-all"
                  >
                    <LogOut size={18} /> Sign Out
                  </button>
                </div>
              )}
            </div>

            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-slate-600"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-[99] bg-white pt-24 px-6 overflow-y-auto">
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              {farmerTools.map(tool => (
                <button
                  key={tool.id}
                  onClick={() => { setActiveSection(tool.id); setIsMobileMenuOpen(false); }}
                  className="flex flex-col items-center gap-3 p-6 rounded-3xl border border-slate-100 bg-slate-50"
                >
                  <tool.icon size={24} className="text-emerald-600" />
                  <span className="text-xs font-bold text-slate-700">{tool.label}</span>
                </button>
              ))}
            </div>
            <div className="space-y-2 pt-4">
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-4 mb-4">Platform Info</h3>
              {navItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => { setActiveSection(item.id); setIsMobileMenuOpen(false); }}
                  className="w-full text-left px-4 py-4 rounded-2xl text-lg font-bold text-slate-700 active:bg-emerald-50"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 md:px-8 py-8 md:py-12">
        <div className="mb-10 flex items-center justify-between">
           <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest">
             <span className="text-emerald-600">Secure Node</span>
             <span className="opacity-20">/</span>
             <span className="text-slate-900">{activeSection.toLowerCase().replace('_', ' ')}</span>
           </div>
           {user.role === UserRole.FARMER && (
             <div className="flex gap-2">
                <button 
                  onClick={() => setActiveSection(AppSection.BEGINNER_PLANNER)}
                  className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold shadow-lg shadow-slate-200 hover:bg-black transition-all"
                >
                  <Rocket size={14} /> Quick Start
                </button>
                <button 
                  onClick={() => setActiveSection(AppSection.YIELD_SIMULATOR)}
                  className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold shadow-lg shadow-emerald-100 hover:bg-emerald-700 transition-all"
                >
                  Run Yield Simulator
                </button>
             </div>
           )}
        </div>
        {children}
      </main>

      {/* Corporate Footer Mirroring Cropin */}
      <footer className="bg-slate-900 text-white py-16 px-6 mt-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <Sprout className="text-emerald-500" size={32} />
              <span className="text-2xl font-black tracking-tighter">AgroSmart</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">The world's most trusted AI-driven intelligence cloud for agriculture ecosystem. Empowering 7 million+ farmers.</p>
          </div>
          <div>
            <h4 className="font-bold mb-6 text-emerald-500 uppercase text-xs tracking-widest">Platform</h4>
            <ul className="space-y-4 text-sm text-slate-400">
              <li className="hover:text-white cursor-pointer transition-colors" onClick={() => setActiveSection(AppSection.PRODUCTS)}>Agri-Intelligence Cloud</li>
              <li className="hover:text-white cursor-pointer transition-colors">Traceability Suite</li>
              <li className="hover:text-white cursor-pointer transition-colors">SmartRisk Monitoring</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6 text-emerald-500 uppercase text-xs tracking-widest">Support</h4>
            <ul className="space-y-4 text-sm text-slate-400">
              <li className="hover:text-white cursor-pointer transition-colors" onClick={() => setActiveSection(AppSection.SOIL_TEST)}>Soil Analysis</li>
              <li className="hover:text-white cursor-pointer transition-colors" onClick={() => setActiveSection(AppSection.KNOWLEDGE_GRID)}>Crop Intelligence</li>
              <li className="hover:text-white cursor-pointer transition-colors">Farmer Helpline</li>
              <li className="hover:text-white cursor-pointer transition-colors">Contact Expert</li>
            </ul>
          </div>
          <div className="bg-white/5 p-8 rounded-3xl border border-white/10">
            <h4 className="font-bold mb-4">Newsletter</h4>
            <p className="text-xs text-slate-400 mb-6">Stay updated with the latest in ag-tech innovations.</p>
            <div className="flex gap-2">
              <input type="text" placeholder="Email" className="bg-white/10 border border-white/10 rounded-xl px-4 py-2 text-xs flex-1 outline-none" />
              <button className="bg-emerald-500 p-2 rounded-xl"><Globe size={16}/></button>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto border-t border-white/5 mt-16 pt-8 flex flex-col md:flex-row justify-between text-[10px] text-slate-500 font-bold uppercase tracking-widest">
           <span>© 2024 AGROSMART CLOUD. ALL RIGHTS RESERVED.</span>
           <div className="flex gap-8 mt-4 md:mt-0">
             <span>Privacy Policy</span>
             <span>Terms of Service</span>
             <span>Security</span>
           </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
