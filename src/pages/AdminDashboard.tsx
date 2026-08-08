import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, UserCheck, CheckCircle2, XCircle, Layers, DollarSign, Package, Users } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { INITIAL_USERS, INITIAL_PRODUCTS } from '../data/seedData';
import { User, Product } from '../types';
import { api } from '../services/api';

export const AdminDashboard: React.FC = () => {
  const { user } = useAuth();
  const { showToast } = useToast();

  const [users, setUsers] = useState<User[]>(INITIAL_USERS);
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);

  useEffect(() => {
    api.getAdminUsers()
      .then(data => {
        if (data.users) setUsers(data.users);
      })
      .catch(() => {});
  }, []);

  const handleApproveSupplier = (id: string) => {
    setUsers(prev => prev.map(u => u.id === id ? { ...u, verified: true, businessProfile: { ...u.businessProfile!, supplierStatus: 'approved' } } : u));
    api.approveSupplier(id).catch(() => {});
    showToast('Mill supplier approved for global trading!', 'success');
  };

  const handleApproveProduct = (id: string) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, status: 'approved' } : p));
    showToast('Fabric listing approved and live on marketplace!', 'success');
  };

  return (
    <div className="px-4 sm:px-8 max-w-7xl mx-auto py-8 space-y-8">
      {/* Admin Banner */}
      <div className="p-6 rounded-3xl glass-panel border border-[#7C5CFC]/30 bg-[#13131A] flex items-center justify-between">
        <div>
          <span className="text-xs font-mono text-[#7C5CFC] uppercase tracking-widest font-bold">PLATFORM GOVERNANCE</span>
          <h1 className="font-serif text-2xl font-bold text-white">FabricFlow Admin Control Portal</h1>
          <p className="text-xs text-[#9999AA]">Monitor mill approvals, compliance verification, and enterprise platform volume.</p>
        </div>
      </div>

      {/* Stats Bento Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono text-xs">
        <div className="bento-card-gold p-5">
          <span className="text-[#9999AA] uppercase tracking-wider block text-[11px]">Gross Volume</span>
          <strong className="text-2xl font-serif font-bold text-white block mt-1">$1,420,800 USD</strong>
        </div>

        <div className="bento-card p-5">
          <span className="text-[#9999AA] uppercase tracking-wider block text-[11px]">Verified Textile Mills</span>
          <strong className="text-2xl font-serif font-bold text-[#D4AF37] block mt-1">480 Mills</strong>
        </div>

        <div className="bento-card p-5">
          <span className="text-[#9999AA] uppercase tracking-wider block text-[11px]">Registered Buyers</span>
          <strong className="text-2xl font-serif font-bold text-[#7C5CFC] block mt-1">1,240 Houses</strong>
        </div>

        <div className="bento-card p-5">
          <span className="text-[#9999AA] uppercase tracking-wider block text-[11px]">Active Fabric Catalog</span>
          <strong className="text-2xl font-serif font-bold text-emerald-400 block mt-1">{products.length} Weaves</strong>
        </div>
      </div>

      {/* Supplier Approvals Table */}
      <div className="p-6 rounded-2xl glass-panel border border-white/10 bg-[#13131A] space-y-4 text-xs">
        <h3 className="font-serif text-lg font-bold text-white flex items-center gap-2">
          <UserCheck className="w-5 h-5 text-[#D4AF37]" /> Mill Supplier Verification Queue
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 text-[#9999AA] uppercase font-mono">
                <th className="p-3">Company Name</th>
                <th className="p-3">Country</th>
                <th className="p-3">VAT / Tax ID</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-right">Verification Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {users.filter(u => u.role === 'supplier').map((sup) => (
                <tr key={sup.id}>
                  <td className="p-3 font-bold text-white">{sup.company || sup.name}</td>
                  <td className="p-3 text-[#9999AA]">{sup.businessProfile?.country || 'Italy'}</td>
                  <td className="p-3 font-mono text-[#D4AF37]">{sup.businessProfile?.taxId || 'IT-99281'}</td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold uppercase text-[10px]">
                      {sup.businessProfile?.supplierStatus || 'Approved'}
                    </span>
                  </td>
                  <td className="p-3 text-right">
                    <button
                      onClick={() => handleApproveSupplier(sup.id)}
                      className="px-3 py-1 rounded bg-emerald-500 text-black font-bold text-[11px] hover:bg-emerald-400"
                    >
                      Verify & Approve
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
