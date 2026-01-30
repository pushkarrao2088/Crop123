
import React from 'react';
import { ShoppingCart, Star, Plus, Minus, Search, ShoppingBag, X, ArrowRight, Loader2 } from 'lucide-react';
import { Product, CartItem } from '../types';
import { productService } from '../services/productService';

interface ProductCatalogProps {
  cart: CartItem[];
  userId: string;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, delta: number) => void;
}

const ProductCatalog: React.FC<ProductCatalogProps> = ({ cart, userId, addToCart, removeFromCart, updateQuantity }) => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [filter, setFilter] = React.useState<string>('All');
  const [showCart, setShowCart] = React.useState(false);
  const [products, setProducts] = React.useState<Product[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [checkingOut, setCheckingOut] = React.useState(false);

  React.useEffect(() => {
    const fetchProducts = async () => {
      const dbProducts = await productService.getProducts();
      setProducts(dbProducts);
      setLoading(false);
    };
    fetchProducts();
  }, []);

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'All' || p.category === filter;
    return matchesSearch && matchesFilter;
  });

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = async () => {
    setCheckingOut(true);
    try {
      const { error } = await productService.createOrder(
        userId,
        cartTotal,
        'Shipping address to be confirmed'
      );

      if (!error) {
        alert('Order placed successfully! Your order is being processed.');
        setShowCart(false);
      } else {
        alert('Failed to place order. Please try again.');
      }
    } finally {
      setCheckingOut(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center space-y-4">
          <Loader2 className="animate-spin mx-auto" size={40} />
          <p className="text-slate-500 font-bold">Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-12 animate-in fade-in duration-700 pb-20">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
        <div className="max-w-2xl">
          <h2 className="text-6xl font-black text-slate-900 mb-6 tracking-tighter leading-none">Agri-Marketplace</h2>
          <p className="text-xl text-slate-500 leading-relaxed font-medium">Genuine inputs, high-grade seeds, and cutting-edge tech. Sourced directly from verified manufacturers.</p>
        </div>
        
        <div className="flex items-center gap-4">
           <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors" size={20} />
              <input 
                type="text" 
                placeholder="Search inputs..." 
                className="pl-12 pr-4 py-4 bg-white border border-slate-100 rounded-2xl outline-none focus:ring-4 focus:ring-emerald-50 focus:border-emerald-500 transition-all w-64 md:w-80 shadow-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
           </div>
           <button 
            onClick={() => setShowCart(true)}
            className="p-4 bg-emerald-600 text-white rounded-2xl relative shadow-xl shadow-emerald-200 hover:bg-emerald-700 transition-all"
           >
              <ShoppingCart size={24} />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 w-6 h-6 bg-rose-500 text-white text-[10px] font-black rounded-full flex items-center justify-center border-2 border-white">
                  {cart.reduce((s, i) => s + i.quantity, 0)}
                </span>
              )}
           </button>
        </div>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
        {['All', 'Seeds', 'Fertilizers', 'Pesticides', 'Tools', 'Tech'].map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-6 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all border ${
              filter === cat 
                ? 'bg-slate-900 text-white border-slate-900 shadow-lg' 
                : 'bg-white text-slate-500 border-slate-100 hover:border-emerald-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProducts.map((product) => {
          const inCart = cart.find(i => i.id === product.id);
          return (
            <div key={product.id} className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden group hover:shadow-2xl hover:-translate-y-1 transition-all flex flex-col">
              <div className="aspect-[1.2] relative overflow-hidden bg-slate-100">
                <img src={product.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={product.name} />
                <div className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur rounded-xl text-[10px] font-black text-emerald-700 border border-emerald-100 uppercase tracking-widest shadow-sm">
                  {product.category}
                </div>
              </div>
              <div className="p-8 space-y-4 flex-1 flex flex-col">
                <div className="flex justify-between items-start">
                  <h3 className="text-xl font-bold text-slate-900 leading-tight group-hover:text-emerald-700 transition-colors">{product.name}</h3>
                  <div className="flex items-center gap-1 text-amber-500">
                    <Star size={14} fill="currentColor" />
                    <span className="text-xs font-black">{product.rating}</span>
                  </div>
                </div>
                <p className="text-sm text-slate-500 line-clamp-2 leading-relaxed flex-1">{product.description}</p>
                
                <div className="pt-4 border-t border-slate-50 flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Price</span>
                    <span className="text-2xl font-black text-slate-900">₹{product.price.toLocaleString()}</span>
                  </div>
                  
                  {inCart ? (
                    <div className="flex items-center gap-2 bg-slate-50 p-1 rounded-xl border border-slate-100">
                      <button 
                        onClick={() => updateQuantity(product.id, -1)}
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-rose-500 hover:bg-white transition-all"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="w-8 text-center font-black text-slate-900">{inCart.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(product.id, 1)}
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-emerald-500 hover:bg-white transition-all"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  ) : (
                    <button 
                      onClick={() => addToCart(product)}
                      className="bg-emerald-600 text-white px-6 py-3 rounded-2xl font-black text-sm hover:bg-emerald-700 active:scale-95 transition-all flex items-center gap-2 shadow-lg shadow-emerald-50"
                    >
                      <Plus size={18} /> Add to Cart
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Cart Drawer */}
      {showCart && (
        <div className="fixed inset-0 z-[110] bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
           <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl animate-in slide-in-from-right duration-500 flex flex-col">
              <div className="p-8 border-b border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <ShoppingBag className="text-emerald-600" />
                  <h3 className="text-2xl font-black text-slate-900">Your Basket</h3>
                </div>
                <button onClick={() => setShowCart(false)} className="p-2 hover:bg-slate-50 rounded-xl transition-colors">
                  <X size={24} className="text-slate-400" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-8 space-y-6">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-40">
                    <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center">
                      <ShoppingBag size={40} />
                    </div>
                    <p className="font-bold">Your basket is empty.</p>
                  </div>
                ) : (
                  cart.map(item => (
                    <div key={item.id} className="flex gap-4 p-4 rounded-3xl border border-slate-50 bg-slate-50/50">
                      <img src={item.image} className="w-20 h-20 rounded-2xl object-cover" />
                      <div className="flex-1 space-y-1">
                        <div className="flex justify-between items-start">
                          <h4 className="font-bold text-slate-900 text-sm">{item.name}</h4>
                          <button onClick={() => removeFromCart(item.id)} className="text-slate-300 hover:text-rose-500 transition-colors">
                            <X size={16} />
                          </button>
                        </div>
                        <div className="text-xs text-slate-400 font-bold uppercase tracking-widest">{item.category}</div>
                        <div className="flex items-center justify-between pt-2">
                           <span className="font-black text-emerald-700">₹{item.price.toLocaleString()}</span>
                           <div className="flex items-center gap-2 bg-white rounded-lg border border-slate-100 p-0.5">
                              <button onClick={() => updateQuantity(item.id, -1)} className="p-1 hover:text-rose-500"><Minus size={12}/></button>
                              <span className="text-xs font-black w-4 text-center">{item.quantity}</span>
                              <button onClick={() => updateQuantity(item.id, 1)} className="p-1 hover:text-emerald-500"><Plus size={12}/></button>
                           </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {cart.length > 0 && (
                <div className="p-8 bg-slate-50 space-y-6">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm font-bold text-slate-400">
                      <span>Subtotal</span>
                      <span className="text-slate-900">₹{cartTotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm font-bold text-slate-400">
                      <span>Logistics Fee</span>
                      <span className="text-emerald-600">FREE</span>
                    </div>
                    <div className="flex justify-between text-xl font-black text-slate-900 pt-2 border-t border-slate-200">
                      <span>Total</span>
                      <span>₹{cartTotal.toLocaleString()}</span>
                    </div>
                  </div>
                  <button
                    onClick={handleCheckout}
                    disabled={checkingOut}
                    className="w-full py-5 bg-emerald-600 text-white rounded-[2rem] font-black text-xl shadow-2xl shadow-emerald-200 hover:bg-emerald-700 active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {checkingOut ? <Loader2 className="animate-spin" size={24} /> : <ArrowRight size={24} />}
                    {checkingOut ? 'Processing...' : 'Checkout Now'}
                  </button>
                </div>
              )}
           </div>
        </div>
      )}
    </div>
  );
};

export default ProductCatalog;
