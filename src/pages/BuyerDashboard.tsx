import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  ShoppingBag,
  Truck,
  Heart,
  Layers,
  FileText,
  Clock,
  CheckCircle2,
  Package,
  MapPin,
  ExternalLink
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { Order, SampleRequest } from '../types';
import { INITIAL_ORDERS } from '../data/seedData';
import { InvoiceModal } from '../components/InvoiceModal';
import { FabricCard } from '../components/FabricCard';
import { api } from '../services/api';

export const BuyerDashboard: React.FC<{ onNavigate: (page: string) => void }> = ({ onNavigate }) => {
  const { user } = useAuth();
  const { wishlist } = useCart();

  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [selectedInvoiceOrder, setSelectedInvoiceOrder] = useState<Order | null>(null);
  const [activeTab, setActiveTab] = useState<'orders' | 'wishlist' | 'samples'>('orders');

  useEffect(() => {
    api.getOrders()
      .then(data => {
        if (data.orders) setOrders(data.orders);
      })
      .catch(() => {});
  }, []);

  const totalSpent = orders.reduce((acc, o) => acc + o.totalAmount, 0);

  return (
    <div className="px-4 sm:px-8 max-w-7xl mx-auto py-8 space-y-8">
      {/* Header Profile Banner */}
      <div className="p-6 rounded-3xl glass-panel border border-white/10 bg-[#13131A] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <img
            src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200'}
            alt={user?.name}
            className="w-16 h-16 rounded-2xl object-cover border-2 border-[#D4AF37]"
          />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-serif text-2xl font-bold text-white">{user?.name}</h1>
              <span className="px-2 py-0.5 rounded bg-[#7C5CFC]/20 text-[#7C5CFC] font-bold text-[10px] uppercase">
                VERIFIED BUYER
              </span>
            </div>
            <p className="text-xs text-[#9999AA]">{user?.company || 'Atelier Rostova Couture'}</p>
            <p className="text-xs text-[#D4AF37] font-mono mt-0.5">{user?.businessProfile?.country} • {user?.email}</p>
          </div>
        </div>

        {/* Stats Bento Tiles */}
        <div className="grid grid-cols-3 gap-3 w-full md:w-auto text-xs font-mono">
          <div className="bento-card p-3 text-center">
            <span className="text-[#9999AA] text-[10px] uppercase block">Procurement Vol</span>
            <strong className="text-white text-base font-bold font-serif">${totalSpent.toFixed(2)}</strong>
          </div>
          <div className="bento-card-gold p-3 text-center">
            <span className="text-[#9999AA] text-[10px] uppercase block">Active Orders</span>
            <strong className="text-[#D4AF37] text-base font-bold font-serif">{orders.length}</strong>
          </div>
          <div className="bento-card p-3 text-center">
            <span className="text-[#9999AA] text-[10px] uppercase block">Saved Wishlist</span>
            <strong className="text-emerald-400 text-base font-bold font-serif">{wishlist.length}</strong>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-3 border-b border-white/10 pb-2 text-xs font-medium">
        <button
          onClick={() => setActiveTab('orders')}
          className={`pb-2 transition-all flex items-center gap-2 border-b-2 ${
            activeTab === 'orders' ? 'border-[#D4AF37] text-[#D4AF37] font-bold' : 'border-transparent text-[#9999AA]'
          }`}
        >
          <ShoppingBag className="w-4 h-4" /> B2B Order History ({orders.length})
        </button>

        <button
          onClick={() => setActiveTab('wishlist')}
          className={`pb-2 transition-all flex items-center gap-2 border-b-2 ${
            activeTab === 'wishlist' ? 'border-[#D4AF37] text-[#D4AF37] font-bold' : 'border-transparent text-[#9999AA]'
          }`}
        >
          <Heart className="w-4 h-4" /> Saved Wishlist Fabrics ({wishlist.length})
        </button>
      </div>

      {/* Orders Tab */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="p-5 rounded-2xl glass-panel border border-white/10 bg-[#13131A] space-y-4 text-xs"
            >
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-3">
                <div>
                  <span className="font-mono font-bold text-white text-sm">{order.orderNumber}</span>
                  <span className="text-[#9999AA] ml-3">Placed: {new Date(order.createdAt).toLocaleDateString()}</span>
                </div>

                <div className="flex items-center gap-3">
                  <span className={`px-2.5 py-1 rounded-full font-bold uppercase tracking-wider text-[10px] ${
                    order.status === 'dispatch' || order.status === 'delivered'
                      ? 'bg-emerald-500/20 text-emerald-400'
                      : 'bg-[#D4AF37]/20 text-[#D4AF37]'
                  }`}>
                    Status: {order.status}
                  </span>

                  <button
                    onClick={() => setSelectedInvoiceOrder(order)}
                    className="px-3 py-1.5 rounded-lg border border-[#D4AF37]/40 text-[#D4AF37] hover:bg-[#D4AF37]/10 font-bold flex items-center gap-1.5 transition-colors"
                  >
                    <FileText className="w-3.5 h-3.5" /> View Commercial Invoice
                  </button>
                </div>
              </div>

              {/* Items list */}
              <div className="space-y-2">
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2.5 rounded-xl bg-[#0A0A0F] border border-white/5">
                    <div className="flex items-center gap-3">
                      <img src={item.image} alt={item.title} className="w-12 h-12 rounded-lg object-cover" />
                      <div>
                        <strong className="text-white text-xs">{item.title}</strong>
                        <p className="text-[11px] text-[#9999AA]">Color: {item.color} • Supplier: {item.supplierName}</p>
                      </div>
                    </div>
                    <div className="text-right font-mono">
                      <span className="text-white font-bold">{item.meters} meters</span>
                      <span className="block text-[#D4AF37] text-[11px]">${item.total.toFixed(2)}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Logistics Timeline */}
              <div className="pt-2 flex items-center justify-between text-[#9999AA] text-[11px] font-mono">
                <span className="flex items-center gap-1.5 text-emerald-400">
                  <Truck className="w-4 h-4" /> Tracking ID: {order.trackingNumber || 'DHL-EXPRESS-99281'}
                </span>
                <span>Total Amount Paid: <strong className="text-white">${order.totalAmount.toFixed(2)} USD</strong></span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Wishlist Tab */}
      {activeTab === 'wishlist' && (
        <div>
          {wishlist.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {wishlist.map((product) => (
                <FabricCard key={product.id} product={product} onSelect={() => onNavigate('marketplace')} />
              ))}
            </div>
          ) : (
            <div className="py-12 text-center text-[#9999AA] glass-panel rounded-2xl border border-white/10">
              No saved fabrics in wishlist yet.
            </div>
          )}
        </div>
      )}

      {/* Invoice Modal */}
      {selectedInvoiceOrder && (
        <InvoiceModal order={selectedInvoiceOrder} onClose={() => setSelectedInvoiceOrder(null)} />
      )}
    </div>
  );
};
