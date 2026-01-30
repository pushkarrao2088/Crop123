
import React from 'react';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import AdminDashboard from './components/AdminDashboard';
import Advisory from './components/Advisory';
import DiseaseScanner from './components/DiseaseScanner';
import MarketHub from './components/MarketHub';
import KnowledgeGrid from './components/KnowledgeGrid';
import CorporateInfo from './components/CorporateInfo';
import Resources from './components/Resources';
import YieldSimulator from './components/YieldSimulator';
import SoilTest from './components/SoilTest';
import BeginnerPlanner from './components/BeginnerPlanner';
import SolutionsHub from './components/SolutionsHub';
import ProductCatalog from './components/ProductCatalog';
import LiveAssistant from './components/LiveAssistant';
import Login from './components/Login';
import { AppSection, User, UserRole, Product, CartItem } from './types';
import { authService } from './services/authService';

const App: React.FC = () => {
  const [user, setUser] = React.useState<User | null>(null);
  const [activeSection, setActiveSection] = React.useState<AppSection>(AppSection.DASHBOARD);
  const [cart, setCart] = React.useState<CartItem[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const unsubscribe = authService.onAuthStateChange((authUser) => {
      setUser(authUser);
      setLoading(false);
    });

    return () => unsubscribe?.subscription.unsubscribe();
  }, []);

  const handleLogin = (newUser: User) => {
    setUser(newUser);
    setActiveSection(newUser.role === UserRole.ADMIN ? AppSection.ADMIN_OVERVIEW : AppSection.DASHBOARD);
  };

  const handleLogout = async () => {
    await authService.signOut();
    setUser(null);
    setCart([]);
  };

  // Cart Management
  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === productId) {
        const newQty = Math.max(0, item.quantity + delta);
        return newQty === 0 ? null : { ...item, quantity: newQty };
      }
      return item;
    }).filter(Boolean) as CartItem[]);
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto">
            <div className="w-12 h-12 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin"></div>
          </div>
          <p className="text-slate-400 font-bold">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  const renderContent = () => {
    switch (activeSection) {
      case AppSection.DASHBOARD:
        return <Dashboard />;
      case AppSection.ADMIN_OVERVIEW:
        return <AdminDashboard />;
      case AppSection.KNOWLEDGE_GRID:
        return <KnowledgeGrid />;
      case AppSection.SOIL_TEST:
        return <SoilTest userId={user.id} />;
      case AppSection.BEGINNER_PLANNER:
        return <BeginnerPlanner userId={user.id} />;
      case AppSection.YIELD_SIMULATOR:
        return <YieldSimulator />;
      case AppSection.HEALTH_SCAN:
        return <DiseaseScanner userId={user.id} />;
      case AppSection.MARKET:
        return <MarketHub />;
      case AppSection.RESOURCES:
        return <Resources />;
      case AppSection.SOLUTIONS:
        return <SolutionsHub />;
      case AppSection.PRODUCTS:
        return (
          <ProductCatalog
            cart={cart}
            userId={user.id}
            addToCart={addToCart}
            removeFromCart={removeFromCart}
            updateQuantity={updateQuantity}
          />
        );
      case AppSection.ABOUT:
        return <CorporateInfo type={activeSection as any} />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <>
      <Layout 
        activeSection={activeSection} 
        setActiveSection={setActiveSection} 
        user={user} 
        onLogout={handleLogout}
        cartCount={cartCount}
      >
        {renderContent()}
      </Layout>
      <LiveAssistant />
    </>
  );
};

export default App;
