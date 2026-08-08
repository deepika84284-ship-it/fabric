import React from 'react';
import { motion } from 'motion/react';
import { Heart, Scale, Eye, ShoppingBag, ShieldCheck, Star, Layers, Sparkles } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';

interface FabricCardProps {
  product: Product;
  onSelect: (product: Product) => void;
}

export const FabricCard: React.FC<FabricCardProps> = ({ product, onSelect }) => {
  const {
    addToCart,
    toggleWishlist,
    isInWishlist,
    toggleCompare,
    isInCompare,
    openQuickView,
    openSampleModal
  } = useCart();

  const isWishlisted = isInWishlist(product.id);
  const isCompared = isInCompare(product.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
      className="group relative rounded-2xl glass-panel border border-white/10 overflow-hidden flex flex-col h-full hover:border-[#7C5CFC]/50 hover:shadow-2xl hover:shadow-[#7C5CFC]/15 transition-all"
    >
      {/* Top Media Thumbnail Container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#0A0A0F] cursor-pointer" onClick={() => onSelect(product)}>
        <img
          src={product.images[0]}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 brightness-95 group-hover:brightness-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0F] via-transparent to-transparent opacity-80" />

        {/* GSM & Type Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
          <span className="px-2.5 py-1 rounded-md bg-[#0A0A0F]/80 backdrop-blur-md border border-white/10 text-[11px] font-semibold text-[#F0F0F5]">
            {product.gsmWeight} GSM
          </span>
          <span className="px-2.5 py-1 rounded-md bg-[#7C5CFC]/80 backdrop-blur-md text-[11px] font-semibold text-white">
            {product.fabricType}
          </span>
          {product.bestSeller && (
            <span className="px-2.5 py-1 rounded-md bg-[#D4AF37] text-black text-[10px] font-extrabold uppercase tracking-wide">
              Best Seller
            </span>
          )}
        </div>

        {/* Quick Actions Floating Overlay */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 z-10 opacity-90 sm:opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleWishlist(product);
            }}
            className={`p-2 rounded-xl backdrop-blur-md border transition-all ${
              isWishlisted
                ? 'bg-rose-500 text-white border-rose-400'
                : 'bg-[#13131A]/80 border-white/10 text-[#9999AA] hover:text-white'
            }`}
            title="Add to Wishlist"
          >
            <Heart className="w-4 h-4 fill-current" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleCompare(product);
            }}
            className={`p-2 rounded-xl backdrop-blur-md border transition-all ${
              isCompared
                ? 'bg-[#7C5CFC] text-white border-[#7C5CFC]'
                : 'bg-[#13131A]/80 border-white/10 text-[#9999AA] hover:text-white'
            }`}
            title="Compare Technical Specs"
          >
            <Scale className="w-4 h-4" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              openQuickView(product);
            }}
            className="p-2 rounded-xl bg-[#13131A]/80 backdrop-blur-md border border-white/10 text-[#9999AA] hover:text-white transition-all"
            title="Quick View"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>

        {/* MOQ overlay indicator */}
        <div className="absolute bottom-3 left-3 z-10 text-[11px] font-mono text-[#D4AF37] bg-[#0A0A0F]/90 px-2 py-0.5 rounded border border-[#D4AF37]/30">
          MOQ: {product.moqMeters} meters
        </div>
      </div>

      {/* Details Area */}
      <div className="p-4 flex flex-col flex-1 justify-between gap-3">
        <div>
          {/* Supplier Info & Rating */}
          <div className="flex items-center justify-between gap-2 text-xs text-[#9999AA] mb-1">
            <span className="flex items-center gap-1 font-medium text-[#F0F0F5]/80 truncate">
              {product.supplierName}
              {product.supplierVerified && (
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" title="Mill Verified" />
              )}
            </span>
            <div className="flex items-center gap-1 text-[#D4AF37] font-semibold shrink-0">
              <Star className="w-3.5 h-3.5 fill-current" />
              <span>{product.rating}</span>
            </div>
          </div>

          {/* Product Title */}
          <h3
            onClick={() => onSelect(product)}
            className="font-serif text-base font-semibold text-[#F0F0F5] group-hover:text-[#D4AF37] transition-colors line-clamp-2 cursor-pointer leading-snug"
          >
            {product.title}
          </h3>

          {/* Technical Spec Chips */}
          <p className="text-xs text-[#9999AA] mt-1 line-clamp-1 font-mono">
            {product.composition} • {product.widthInches}" • {product.weaveType}
          </p>

          {/* Color Swatch Previews */}
          <div className="flex items-center gap-1.5 mt-2.5">
            <span className="text-[10px] text-[#9999AA] uppercase font-mono">Colors:</span>
            {(product.availableColors || []).slice(0, 4).map((c, i) => (
              <span
                key={i}
                className="w-3.5 h-3.5 rounded-full border border-white/30 shadow-sm"
                style={{ backgroundColor: c.hex }}
                title={c.name}
              />
            ))}
            {(product.availableColors?.length || 0) > 4 && (
              <span className="text-[10px] text-[#9999AA]">+{product.availableColors.length - 4}</span>
            )}
          </div>
        </div>

        {/* Bottom Price & CTA Bar */}
        <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-2">
          <div>
            <div className="flex items-baseline gap-1">
              <span className="text-lg font-bold text-white font-mono">${product.pricePerMeter.toFixed(2)}</span>
              <span className="text-xs text-[#9999AA]">/ meter</span>
            </div>
            {product.tierPricing?.length > 1 && (
              <span className="text-[10px] text-emerald-400 block font-mono">
                Bulk from ${product.tierPricing[product.tierPricing.length - 1].pricePerMeter}/m
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => openSampleModal(product)}
              className="px-2.5 py-1.5 rounded-lg border border-[#D4AF37]/40 text-[#D4AF37] hover:bg-[#D4AF37]/10 text-xs font-semibold transition-colors"
              title="Request B2B Fabric Sample Swatch"
            >
              Sample
            </button>

            <button
              onClick={() => addToCart(product, product.moqMeters)}
              className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-[#7C5CFC] to-[#5D38EC] text-white text-xs font-semibold flex items-center gap-1.5 shadow-md hover:brightness-110 transition-all"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Order</span>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
