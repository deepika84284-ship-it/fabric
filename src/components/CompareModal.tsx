import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Scale, Trash2, ShoppingBag, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const CompareModal: React.FC = () => {
  const { compareList, toggleCompare, addToCart } = useCart();

  if (compareList.length === 0) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-5xl rounded-2xl glass-panel border border-[#7C5CFC]/40 bg-[#13131A] shadow-2xl p-6 text-[#F0F0F5] my-8"
      >
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-[#7C5CFC]/20 text-[#7C5CFC]">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-serif text-xl font-bold text-white">Fabric Technical Specification Comparison</h2>
              <p className="text-xs text-[#9999AA]">Side-by-side mill specifications for up to 4 selected textiles</p>
            </div>
          </div>
          <button
            onClick={() => compareList.forEach(p => toggleCompare(p))}
            className="p-2 text-[#9999AA] hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Comparison Table */}
        <div className="overflow-x-auto pt-6">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-white/10">
                <th className="p-3 w-40 text-[#9999AA] uppercase tracking-wider font-mono">Attribute</th>
                {compareList.map((p) => (
                  <th key={p.id} className="p-3 min-w-[200px] text-center">
                    <div className="flex flex-col items-center gap-2">
                      <img src={p.images[0]} alt={p.title} className="w-20 h-20 rounded-xl object-cover border border-white/10" />
                      <h4 className="font-serif font-bold text-white text-sm line-clamp-1">{p.title}</h4>
                      <button
                        onClick={() => toggleCompare(p)}
                        className="text-[11px] text-rose-400 hover:underline flex items-center gap-1"
                      >
                        <Trash2 className="w-3 h-3" /> Remove
                      </button>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              <tr>
                <td className="p-3 font-semibold text-[#D4AF37]">Price per Meter</td>
                {compareList.map((p) => (
                  <td key={p.id} className="p-3 text-center font-bold text-white text-sm font-mono">
                    ${p.pricePerMeter.toFixed(2)}/m
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-3 font-semibold text-[#9999AA]">Fabric Type</td>
                {compareList.map((p) => (
                  <td key={p.id} className="p-3 text-center font-medium text-[#F0F0F5]">
                    {p.fabricType}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-3 font-semibold text-[#9999AA]">GSM Weight</td>
                {compareList.map((p) => (
                  <td key={p.id} className="p-3 text-center font-mono text-[#F0F0F5]">
                    {p.gsmWeight} g/m²
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-3 font-semibold text-[#9999AA]">Weave Structure</td>
                {compareList.map((p) => (
                  <td key={p.id} className="p-3 text-center text-[#F0F0F5]">
                    {p.weaveType}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-3 font-semibold text-[#9999AA]">Composition</td>
                {compareList.map((p) => (
                  <td key={p.id} className="p-3 text-center text-[#9999AA]">
                    {p.composition}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-3 font-semibold text-[#9999AA]">Width (Inches)</td>
                {compareList.map((p) => (
                  <td key={p.id} className="p-3 text-center font-mono text-[#F0F0F5]">
                    {p.widthInches}"
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-3 font-semibold text-[#9999AA]">MOQ (Meters)</td>
                {compareList.map((p) => (
                  <td key={p.id} className="p-3 text-center font-mono text-[#D4AF37]">
                    {p.moqMeters} meters
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-3 font-semibold text-[#9999AA]">Certifications</td>
                {compareList.map((p) => (
                  <td key={p.id} className="p-3 text-center">
                    <div className="flex flex-wrap justify-center gap-1">
                      {p.certifications.map((c, idx) => (
                        <span key={idx} className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px]">
                          {c}
                        </span>
                      ))}
                    </div>
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-3 font-semibold text-[#9999AA]">Mill Supplier</td>
                {compareList.map((p) => (
                  <td key={p.id} className="p-3 text-center text-xs font-medium text-white">
                    {p.supplierName}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-3">Action</td>
                {compareList.map((p) => (
                  <td key={p.id} className="p-3 text-center">
                    <button
                      onClick={() => addToCart(p, p.moqMeters)}
                      className="w-full py-2 bg-[#7C5CFC] text-white rounded-xl text-xs font-semibold hover:bg-[#5D38EC] transition-colors flex items-center justify-center gap-1.5"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" /> Order Roll
                    </button>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};
