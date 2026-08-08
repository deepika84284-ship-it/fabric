import React, { useState } from 'react';
import { motion } from 'motion/react';
import { X, ShieldCheck, ShoppingBag, Layers, Star, Truck } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const QuickViewModal: React.FC = () => {
  const { quickViewProduct, closeQuickView, addToCart, openSampleModal } = useCart();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [meters, setMeters] = useState<number>(quickViewProduct?.moqMeters || 50);
  const [selectedColor, setSelectedColor] = useState<string>('');

  if (!quickViewProduct) return null;

  const currentImg = quickViewProduct.images[selectedImageIndex] || quickViewProduct.images[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-4xl rounded-2xl glass-panel border border-white/10 bg-[#13131A] shadow-2xl p-6 text-[#F0F0F5] my-8"
      >
        <button
          onClick={closeQuickView}
          className="absolute top-4 right-4 p-2 text-[#9999AA] hover:text-white transition-colors z-10"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Media Gallery */}
          <div className="space-y-3">
            <div className="relative aspect-square rounded-xl overflow-hidden bg-[#0A0A0F] border border-white/10">
              <img
                src={currentImg}
                alt={quickViewProduct.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-[#0A0A0F]/80 backdrop-blur-md text-xs font-mono text-[#D4AF37] border border-[#D4AF37]/30">
                MOQ: {quickViewProduct.moqMeters} meters
              </div>
            </div>

            {/* Thumbnail Row */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              {quickViewProduct.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImageIndex(i)}
                  className={`w-16 h-16 rounded-lg overflow-hidden border-2 shrink-0 transition-all ${
                    selectedImageIndex === i ? 'border-[#7C5CFC]' : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="thumb" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Right Product Details */}
          <div className="flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center gap-2 text-xs text-[#9999AA] mb-1">
                <span className="text-[#D4AF37] font-semibold">{quickViewProduct.supplierName}</span>
                {quickViewProduct.supplierVerified && (
                  <ShieldCheck className="w-4 h-4 text-emerald-400" title="Mill Verified" />
                )}
                <span>•</span>
                <div className="flex items-center gap-1 text-[#D4AF37]">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <span>{quickViewProduct.rating}</span>
                </div>
              </div>

              <h2 className="font-serif text-2xl font-bold text-white leading-tight">{quickViewProduct.title}</h2>

              <p className="text-xs text-[#9999AA] mt-2 leading-relaxed line-clamp-3">
                {quickViewProduct.description}
              </p>

              {/* Specs Table */}
              <div className="grid grid-cols-2 gap-2 mt-4 p-3 rounded-xl bg-[#0A0A0F] border border-white/5 text-xs">
                <div><span className="text-[#9999AA]">GSM Weight:</span> <strong className="text-white font-mono">{quickViewProduct.gsmWeight} g/m²</strong></div>
                <div><span className="text-[#9999AA]">Width:</span> <strong className="text-white font-mono">{quickViewProduct.widthInches}"</strong></div>
                <div><span className="text-[#9999AA]">Weave:</span> <strong className="text-white">{quickViewProduct.weaveType}</strong></div>
                <div><span className="text-[#9999AA]">Stretch:</span> <strong className="text-white font-mono">{quickViewProduct.stretchPercent}%</strong></div>
              </div>

              {/* Price & Tier Pricing */}
              <div className="mt-4">
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-white font-mono">${quickViewProduct.pricePerMeter.toFixed(2)}</span>
                  <span className="text-xs text-[#9999AA]">/ meter</span>
                </div>
                {quickViewProduct.tierPricing?.length > 1 && (
                  <div className="flex items-center gap-2 text-[11px] font-mono mt-1 text-[#9999AA]">
                    {quickViewProduct.tierPricing.map((t, idx) => (
                      <span key={idx} className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10">
                        {t.minMeters}m+: ${t.pricePerMeter}/m
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Color Picker */}
              <div className="mt-4">
                <label className="block text-xs text-[#9999AA] mb-1.5">Color Palette:</label>
                <div className="flex flex-wrap gap-2">
                  {quickViewProduct.availableColors.map((c, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedColor(c.name)}
                      className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-xs transition-all ${
                        (selectedColor || quickViewProduct.availableColors[0]?.name) === c.name
                          ? 'border-[#7C5CFC] bg-[#7C5CFC]/20 text-white'
                          : 'border-white/10 bg-[#0A0A0F] text-[#9999AA]'
                      }`}
                    >
                      <span className="w-3 h-3 rounded-full border border-white/30" style={{ backgroundColor: c.hex }} />
                      <span>{c.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity Input */}
              <div className="mt-4 flex items-center gap-3">
                <label className="text-xs text-[#9999AA]">Order Meters:</label>
                <div className="flex items-center gap-2 bg-[#0A0A0F] border border-white/10 rounded-xl px-2 py-1">
                  <button
                    onClick={() => setMeters(m => Math.max(quickViewProduct.moqMeters, m - 10))}
                    className="px-2 py-0.5 text-lg font-bold text-[#9999AA] hover:text-white"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={meters}
                    min={quickViewProduct.moqMeters}
                    onChange={(e) => setMeters(Math.max(quickViewProduct.moqMeters, Number(e.target.value)))}
                    className="w-16 bg-transparent text-center font-mono font-bold text-white text-sm outline-none"
                  />
                  <button
                    onClick={() => setMeters(m => m + 10)}
                    className="px-2 py-0.5 text-lg font-bold text-[#9999AA] hover:text-white"
                  >
                    +
                  </button>
                </div>
                <span className="text-xs text-[#9999AA]">Total: <strong className="text-[#D4AF37] font-mono">${(meters * quickViewProduct.pricePerMeter).toFixed(2)}</strong></span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex items-center gap-3 pt-4 border-t border-white/10">
              <button
                onClick={() => {
                  openSampleModal(quickViewProduct);
                  closeQuickView();
                }}
                className="flex-1 py-2.5 rounded-xl border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37]/10 font-bold text-xs transition-colors"
              >
                Request Swatch
              </button>

              <button
                onClick={() => {
                  addToCart(quickViewProduct, meters, selectedColor);
                  closeQuickView();
                }}
                className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-[#7C5CFC] to-[#5D38EC] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg hover:brightness-110 transition-all"
              >
                <ShoppingBag className="w-4 h-4" /> Add to Order Cart
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
