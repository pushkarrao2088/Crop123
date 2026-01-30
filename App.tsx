
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

const App: React.FC = () => {
  const [user, setUser] = React.useState<User | null>(null);
  const [activeSection, setActiveSection] = React.useState<AppSection>(AppSection.DASHBOARD);
  const [cart, setCart] = React.useState<CartItem[]>([]);

  const handleLogin = (newUser: User) => {
    setUser(newUser);
    setActiveSection(newUser.role === UserRole.ADMIN ? AppSection.ADMIN_OVERVIEW : AppSection.DASHBOARD);
  };

  const handleLogout = () => {
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
        return <SoilTest />;
      case AppSection.BEGINNER_PLANNER:
        return <BeginnerPlanner />;
      case AppSection.YIELD_SIMULATOR:
        return <YieldSimulator />;
      case AppSection.HEALTH_SCAN:
        return <DiseaseScanner />;
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
