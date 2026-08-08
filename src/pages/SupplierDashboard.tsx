import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Layers,
  Plus,
  Package,
  TrendingUp,
  DollarSign,
  AlertTriangle,
  Edit,
  Trash2,
  CheckCircle2,
  X,
  Upload,
  BarChart2,
  ShieldCheck,
  Truck
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { Product, Order } from '../types';
import { INITIAL_PRODUCTS, INITIAL_ORDERS } from '../data/seedData';
import { api } from '../services/api';

const SALES_CHART_DATA = [
  { month: 'Jan', revenue: 24000, meters: 850 },
  { month: 'Feb', revenue: 38000, meters: 1400 },
  { month: 'Mar', revenue: 52000, meters: 1950 },
  { month: 'Apr', revenue: 64000, meters: 2300 },
  { month: 'May', revenue: 88000, meters: 3100 },
  { month: 'Jun', revenue: 105000, meters: 3800 },
  { month: 'Jul', revenue: 128000, meters: 4600 }
];

export const SupplierDashboard: React.FC = () => {
  const { user } = useAuth();
  const { showToast } = useToast();

  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [activeTab, setActiveTab] = useState<'analytics' | 'products' | 'orders'>('analytics');
  const [showAddProductModal, setShowAddProductModal] = useState(false);

  // New product form state
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('Silk');
  const [newFabricType, setNewFabricType] = useState<'Silk' | 'Linen' | 'Organic Cotton' | 'Cashmere' | 'Denim' | 'Velvet' | 'Wool' | 'Technical' | 'Satin' | 'Jacquard' | 'Rayon'>('Silk');
  const [newGsm, setNewGsm] = useState(120);
  const [newPrice, setNewPrice] = useState(28);
  const [newMoq, setNewMoq] = useState(50);
  const [newStock, setNewStock] = useState(3000);
  const [newComposition, setNewComposition] = useState('100% Organic Mulberry Silk');
  const [newWeave, setNewWeave] = useState('Satin Charmeuse');
  const [newImage, setNewImage] = useState('https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&q=80&w=800');

  useEffect(() => {
    api.getProducts()
      .then(data => {
        if (data.products) setProducts(data.products);
      })
      .catch(() => {});

    api.getOrders()
      .then(data => {
        if (data.orders) setOrders(data.orders);
      })
      .catch(() => {});
  }, []);

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const newProdData: Partial<Product> = {
      title: newTitle || 'Custom Mill Fabric Weave',
      category: newCategory,
      fabricType: newFabricType,
      description: `Premium lab-tested ${newFabricType} woven by ${user?.company || 'Tessitura Seta Como SpA'}. High tensile strength, luxurious drape.`,
      gsmWeight: Number(newGsm),
      weaveType: newWeave,
      threadCount: '300TC',
      widthInches: 58,
      stretchPercent: 2,
      composition: newComposition,
      certifications: ['OEKO-TEX 100', 'GOTS Organic'],
      pricePerMeter: Number(newPrice),
      moqMeters: Number(newMoq),
      tierPricing: [
        { minMeters: Number(newMoq), pricePerMeter: Number(newPrice) },
        { minMeters: Number(newMoq) * 4, pricePerMeter: Number(newPrice) * 0.85 }
      ],
      stockMeters: Number(newStock),
      availableColors: [{ name: 'Onyx Black', hex: '#111116' }, { name: 'Gold Champagne', hex: '#D4AF37' }],
      images: [newImage],
      featured: true,
      status: 'approved'
    };

    api.createProduct(newProdData)
      .then(res => {
        if (res.product) {
          setProducts(prev => [res.product, ...prev]);
        }
      })
      .catch(() => {
        const fallbackProd: Product = {
          id: `prod-${Date.now()}`,
          title: newTitle || 'Custom Mill Fabric Weave',
          slug: (newTitle || 'custom-mill-fabric').toLowerCase().replace(/[^a-z0-9]+/g, '-'),
          category: newCategory,
          fabricType: newFabricType,
          description: `Premium lab-tested ${newFabricType} woven by ${user?.company || 'Tessitura Seta Como SpA'}.`,
          gsmWeight: Number(newGsm),
          weaveType: newWeave,
          threadCount: '300TC',
          widthInches: 58,
          stretchPercent: 2,
          composition: newComposition,
          certifications: ['OEKO-TEX 100'],
          pricePerMeter: Number(newPrice),
          moqMeters: Number(newMoq),
          tierPricing: [{ minMeters: Number(newMoq), pricePerMeter: Number(newPrice) }],
          stockMeters: Number(newStock),
          availableColors: [{ name: 'Onyx Black', hex: '#111116' }],
          images: [newImage],
          supplierId: user?.id || 'user-supplier-1',
          supplierName: user?.company || 'Tessitura Seta Como SpA',
          supplierRating: 4.9,
          supplierVerified: true,
          status: 'approved',
          featured: true,
          trending: true,
          bestSeller: false,
          rating: 5.0,
          reviewCount: 1,
          createdAt: new Date().toISOString()
        };
        setProducts(prev => [fallbackProd, ...prev]);
      });

    showToast('New fabric listing published to global marketplace!', 'success');
    setShowAddProductModal(false);
  };

  const handleUpdateOrderStatus = (orderId: string, newStatus: any) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
    api.updateOrderStatus(orderId, newStatus).catch(() => {});
    showToast(`Order status updated to ${newStatus}`, 'success');
  };

  const totalRevenue = orders.reduce((acc, o) => acc + o.totalAmount, 0);
  const totalStockMeters = products.reduce((acc, p) => acc + p.stockMeters, 0);

  return (
    <div className="px-4 sm:px-8 max-w-7xl mx-auto py-8 space-y-8">
      {/* Supplier Profile Header */}
      <div className="p-6 rounded-3xl glass-panel border border-[#D4AF37]/30 bg-[#13131A] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#D4AF37] to-[#7C5CFC] p-0.5 flex items-center justify-center">
            <div className="w-full h-full bg-[#0A0A0F] rounded-[14px] flex items-center justify-center">
              <Layers className="w-7 h-7 text-[#D4AF37]" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-serif text-2xl font-bold text-white">{user?.company || 'Tessitura Seta Como SpA'}</h1>
              <ShieldCheck className="w-5 h-5 text-emerald-400" title="GOTS & OEKO-TEX Mill Verified" />
            </div>
            <p className="text-xs text-[#9999AA]">Mill Partner ID: IT-MILL-089412 • Como, Italy</p>
          </div>
        </div>

        <button
          onClick={() => setShowAddProductModal(true)}
          className="px-5 py-3 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B89628] text-black font-bold text-xs flex items-center gap-2 shadow-lg hover:brightness-110 transition-all"
        >
          <Plus className="w-4 h-4" /> Add New Fabric Weave
        </button>
      </div>

      {/* Metrics Row Bento Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono">
        <div className="bento-card-gold p-5 space-y-1">
          <span className="text-[11px] text-[#9999AA] uppercase tracking-wider block">Monthly Mill Revenue</span>
          <strong className="text-3xl font-serif font-bold text-white block">${totalRevenue.toFixed(2)}</strong>
          <span className="text-[10px] text-emerald-400 font-sans font-medium flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> +24.8% vs last month
          </span>
        </div>

        <div className="bento-card p-5 space-y-1">
          <span className="text-[11px] text-[#9999AA] uppercase tracking-wider block">Active Mill Orders</span>
          <strong className="text-3xl font-serif font-bold text-[#D4AF37] block">{orders.length}</strong>
          <span className="text-[10px] text-[#9999AA] font-sans">100% Escrow Protected</span>
        </div>

        <div className="bento-card p-5 space-y-1">
          <span className="text-[11px] text-[#9999AA] uppercase tracking-wider block">Catalog Weaves</span>
          <strong className="text-3xl font-serif font-bold text-[#7C5CFC] block">{products.length}</strong>
          <span className="text-[10px] text-[#9999AA] font-sans">GOTS & OEKO-TEX Approved</span>
        </div>

        <div className="bento-card p-5 space-y-1">
          <span className="text-[11px] text-[#9999AA] uppercase tracking-wider block">Warehouse Stock</span>
          <strong className="text-3xl font-serif font-bold text-emerald-400 block">{totalStockMeters.toLocaleString()}m</strong>
          <span className="text-[10px] text-[#9999AA] font-sans">Ready for dispatch</span>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-3 border-b border-white/10 pb-2 text-xs font-medium">
        <button
          onClick={() => setActiveTab('analytics')}
          className={`pb-2 transition-all flex items-center gap-2 border-b-2 ${
            activeTab === 'analytics' ? 'border-[#D4AF37] text-[#D4AF37] font-bold' : 'border-transparent text-[#9999AA]'
          }`}
        >
          <BarChart2 className="w-4 h-4" /> Sales Analytics & Revenue
        </button>

        <button
          onClick={() => setActiveTab('products')}
          className={`pb-2 transition-all flex items-center gap-2 border-b-2 ${
            activeTab === 'products' ? 'border-[#D4AF37] text-[#D4AF37] font-bold' : 'border-transparent text-[#9999AA]'
          }`}
        >
          <Package className="w-4 h-4" /> Fabric Listings ({products.length})
        </button>

        <button
          onClick={() => setActiveTab('orders')}
          className={`pb-2 transition-all flex items-center gap-2 border-b-2 ${
            activeTab === 'orders' ? 'border-[#D4AF37] text-[#D4AF37] font-bold' : 'border-transparent text-[#9999AA]'
          }`}
        >
          <Truck className="w-4 h-4" /> Order Fulfillment ({orders.length})
        </button>
      </div>

      {/* Analytics Tab */}
      {activeTab === 'analytics' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="p-6 rounded-2xl glass-panel border border-white/10 bg-[#13131A] space-y-4">
            <h3 className="font-serif text-lg font-bold text-white">Monthly Revenue Growth ($ USD)</h3>
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={SALES_CHART_DATA}>
                  <defs>
                    <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#7C5CFC" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#7C5CFC" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#222233" />
                  <XAxis dataKey="month" stroke="#9999AA" />
                  <YAxis stroke="#9999AA" />
                  <Tooltip contentStyle={{ backgroundColor: '#13131A', borderColor: '#7C5CFC' }} />
                  <Area type="monotone" dataKey="revenue" stroke="#7C5CFC" fillOpacity={1} fill="url(#colorRev)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="p-6 rounded-2xl glass-panel border border-white/10 bg-[#13131A] space-y-4">
            <h3 className="font-serif text-lg font-bold text-white">Meter Volume Shipped (Meters)</h3>
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={SALES_CHART_DATA}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#222233" />
                  <XAxis dataKey="month" stroke="#9999AA" />
                  <YAxis stroke="#9999AA" />
                  <Tooltip contentStyle={{ backgroundColor: '#13131A', borderColor: '#D4AF37' }} />
                  <Bar dataKey="meters" fill="#D4AF37" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {/* Products Tab */}
      {activeTab === 'products' && (
        <div className="p-6 rounded-2xl glass-panel border border-white/10 bg-[#13131A] space-y-4 overflow-x-auto text-xs">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 text-[#9999AA] uppercase font-mono">
                <th className="p-3">Fabric Weave</th>
                <th className="p-3">Category</th>
                <th className="p-3">GSM Weight</th>
                <th className="p-3 font-mono">Rate / meter</th>
                <th className="p-3 font-mono">Stock meters</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {products.map((p) => (
                <tr key={p.id}>
                  <td className="p-3 font-bold text-white flex items-center gap-2">
                    <img src={p.images[0]} alt={p.title} className="w-10 h-10 rounded-lg object-cover" />
                    <span className="line-clamp-1">{p.title}</span>
                  </td>
                  <td className="p-3 text-[#9999AA]">{p.category}</td>
                  <td className="p-3 font-mono text-white">{p.gsmWeight} g/m²</td>
                  <td className="p-3 font-mono text-[#D4AF37] font-bold">${p.pricePerMeter.toFixed(2)}</td>
                  <td className="p-3 font-mono text-emerald-400 font-bold">{p.stockMeters}m</td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px] uppercase font-bold">
                      {p.status}
                    </span>
                  </td>
                  <td className="p-3 text-right space-x-2">
                    <button
                      onClick={() => {
                        setProducts(products.filter(item => item.id !== p.id));
                        showToast('Fabric listing removed', 'info');
                      }}
                      className="p-1.5 text-rose-400 hover:bg-rose-500/10 rounded-lg"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Orders Tab */}
      {activeTab === 'orders' && (
        <div className="space-y-4 text-xs">
          {orders.map((o) => (
            <div key={o.id} className="p-5 rounded-2xl glass-panel border border-white/10 bg-[#13131A] space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-3">
                <div>
                  <strong className="text-white text-sm font-mono">{o.orderNumber}</strong>
                  <span className="text-[#9999AA] ml-3">Buyer: {o.buyerName} ({o.shippingAddress.country})</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#9999AA]">Update Status:</span>
                  <select
                    value={o.status}
                    onChange={(e) => handleUpdateOrderStatus(o.id, e.target.value)}
                    className="bg-[#0A0A0F] text-white border border-white/10 rounded-lg px-2 py-1 outline-none"
                  >
                    <option value="pending">Pending</option>
                    <option value="accepted">Accepted</option>
                    <option value="preparing">Preparing Roll</option>
                    <option value="dispatch">Dispatched</option>
                    <option value="delivered">Delivered</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-between font-mono">
                <span className="text-white">{o.items.map(i => `${i.meters}m of ${i.title}`).join(', ')}</span>
                <span className="text-[#D4AF37] font-bold">${o.totalAmount.toFixed(2)} USD</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Product Modal */}
      <AnimatePresence>
        {showAddProductModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-lg rounded-2xl glass-panel border border-[#D4AF37]/40 bg-[#13131A] p-6 text-[#F0F0F5] space-y-4 text-xs"
            >
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <h3 className="font-serif text-lg font-bold text-white">Publish New Mill Fabric Weave</h3>
                <button onClick={() => setShowAddProductModal(false)} className="text-[#9999AA] hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleCreateProduct} className="space-y-3">
                <div>
                  <label className="block text-[#9999AA] mb-1">Fabric Title</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Italian Dupioni Silk 220GSM"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="w-full bg-[#0A0A0F] border border-white/10 rounded-xl p-2.5 text-white outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[#9999AA] mb-1">Fabric Type</label>
                    <select
                      value={newFabricType}
                      onChange={(e: any) => setNewFabricType(e.target.value)}
                      className="w-full bg-[#0A0A0F] border border-white/10 rounded-xl p-2.5 text-white outline-none"
                    >
                      <option value="Silk">Silk</option>
                      <option value="Linen">Linen</option>
                      <option value="Organic Cotton">Organic Cotton</option>
                      <option value="Cashmere">Cashmere</option>
                      <option value="Technical">Technical</option>
                      <option value="Velvet">Velvet</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[#9999AA] mb-1">GSM Weight (g/m²)</label>
                    <input
                      type="number"
                      value={newGsm}
                      onChange={(e) => setNewGsm(Number(e.target.value))}
                      className="w-full bg-[#0A0A0F] border border-white/10 rounded-xl p-2.5 text-white outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[#9999AA] mb-1">Base Price / Meter ($)</label>
                    <input
                      type="number"
                      value={newPrice}
                      onChange={(e) => setNewPrice(Number(e.target.value))}
                      className="w-full bg-[#0A0A0F] border border-white/10 rounded-xl p-2.5 text-white outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[#9999AA] mb-1">MOQ Meters</label>
                    <input
                      type="number"
                      value={newMoq}
                      onChange={(e) => setNewMoq(Number(e.target.value))}
                      className="w-full bg-[#0A0A0F] border border-white/10 rounded-xl p-2.5 text-white outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[#9999AA] mb-1">Cloudinary Fabric Image URL</label>
                  <input
                    type="text"
                    value={newImage}
                    onChange={(e) => setNewImage(e.target.value)}
                    className="w-full bg-[#0A0A0F] border border-white/10 rounded-xl p-2.5 text-white outline-none font-mono text-[11px]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-[#7C5CFC] text-white font-bold text-sm shadow-lg hover:bg-[#5D38EC] transition-all"
                >
                  Publish Listing to Marketplace
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
