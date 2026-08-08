import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  ShieldCheck,
  Star,
  ShoppingBag,
  Layers,
  Heart,
  Scale,
  Truck,
  Award,
  Check,
  MessageSquare,
  ArrowLeft
} from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { INITIAL_PRODUCTS, INITIAL_REVIEWS } from '../data/seedData';
import { FabricCard } from '../components/FabricCard';

interface ProductDetailsPageProps {
  product: Product;
  onBack: () => void;
  onSelectProduct: (product: Product) => void;
}

export const ProductDetailsPage: React.FC<ProductDetailsPageProps> = ({
  product,
  onBack,
  onSelectProduct
}) => {
  const {
    addToCart,
    toggleWishlist,
    isInWishlist,
    toggleCompare,
    isInCompare,
    openSampleModal
  } = useCart();

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product.availableColors[0]?.name || '');
  const [meters, setMeters] = useState<number>(product.moqMeters || 50);

  const currentImg = product.images[selectedImageIndex] || product.images[0];
  const isWishlisted = isInWishlist(product.id);
  const isCompared = isInCompare(product.id);

  const calculateDynamicPrice = () => {
    if (!product.tierPricing || product.tierPricing.length === 0) return product.pricePerMeter;
    const sorted = [...product.tierPricing].sort((a, b) => b.minMeters - a.minMeters);
    for (const tier of sorted) {
      if (meters >= tier.minMeters) return tier.pricePerMeter;
    }
    return product.pricePerMeter;
  };

  const unitPrice = calculateDynamicPrice();
  const totalPrice = unitPrice * meters;

  const relatedProducts = INITIAL_PRODUCTS.filter(p => p.id !== product.id && p.category === product.category).slice(0, 3);

  return (
    <div className="px-4 sm:px-8 max-w-7xl mx-auto py-8 space-y-12">
      {/* Back button */}
      <button
        onClick={onBack}
        className="inline-flex items-center gap-2 text-xs font-semibold text-[#9999AA] hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Marketplace Catalog
      </button>

      {/* Main Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Column: Image Gallery */}
        <div className="lg:col-span-6 space-y-4">
          <div className="relative aspect-square rounded-2xl overflow-hidden glass-panel border border-white/10 bg-[#0A0A0F]">
            <img
              src={currentImg}
              alt={product.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4 flex gap-2">
              <span className="px-3 py-1 rounded-lg bg-[#0A0A0F]/80 backdrop-blur-md text-xs font-mono text-white border border-white/10">
                {product.gsmWeight} GSM
              </span>
              <span className="px-3 py-1 rounded-lg bg-[#7C5CFC] text-xs font-semibold text-white">
                {product.fabricType}
              </span>
            </div>
          </div>

          {/* Thumbnails */}
          <div className="flex items-center gap-3 overflow-x-auto pb-2">
            {product.images.map((img, i) => (
              <button
                key={i}
                onClick={() => setSelectedImageIndex(i)}
                className={`w-20 h-20 rounded-xl overflow-hidden border-2 shrink-0 transition-all ${
                  selectedImageIndex === i ? 'border-[#D4AF37]' : 'border-transparent opacity-60 hover:opacity-100'
                }`}
              >
                <img src={img} alt="thumb" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Right Column: Specifications & Purchasing Controls */}
        <div className="lg:col-span-6 space-y-6">
          <div>
            <div className="flex items-center gap-2 text-xs text-[#9999AA] mb-1">
              <span className="text-[#D4AF37] font-semibold text-sm">{product.supplierName}</span>
              {product.supplierVerified && (
                <ShieldCheck className="w-4 h-4 text-emerald-400" title="Mill Verified" />
              )}
              <span>•</span>
              <div className="flex items-center gap-1 text-[#D4AF37]">
                <Star className="w-4 h-4 fill-current" />
                <span className="font-bold">{product.rating}</span>
                <span className="text-[#9999AA]">({product.reviewCount} reviews)</span>
              </div>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-white leading-tight">{product.title}</h1>

            <p className="text-xs sm:text-sm text-[#9999AA] mt-3 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Technical Specifications Matrix */}
          <div className="p-4 rounded-2xl glass-panel border border-white/10 bg-[#13131A] space-y-3">
            <h3 className="font-serif text-xs font-bold text-[#D4AF37] uppercase tracking-wider">
              LAB-TESTED TECHNICAL SPECIFICATIONS
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-2 rounded-xl bg-[#0A0A0F] border border-white/5">
                <span className="text-[#9999AA] block text-[10px]">GSM Weight:</span>
                <strong className="text-white font-mono text-sm">{product.gsmWeight} g/m²</strong>
              </div>
              <div className="p-2 rounded-xl bg-[#0A0A0F] border border-white/5">
                <span className="text-[#9999AA] block text-[10px]">Composition:</span>
                <strong className="text-white text-xs">{product.composition}</strong>
              </div>
              <div className="p-2 rounded-xl bg-[#0A0A0F] border border-white/5">
                <span className="text-[#9999AA] block text-[10px]">Weave Structure:</span>
                <strong className="text-white text-xs">{product.weaveType}</strong>
              </div>
              <div className="p-2 rounded-xl bg-[#0A0A0F] border border-white/5">
                <span className="text-[#9999AA] block text-[10px]">Width (Inches):</span>
                <strong className="text-white font-mono text-sm">{product.widthInches}"</strong>
              </div>
              <div className="p-2 rounded-xl bg-[#0A0A0F] border border-white/5">
                <span className="text-[#9999AA] block text-[10px]">Stretch Factor:</span>
                <strong className="text-white font-mono text-sm">{product.stretchPercent}%</strong>
              </div>
              <div className="p-2 rounded-xl bg-[#0A0A0F] border border-white/5">
                <span className="text-[#9999AA] block text-[10px]">Thread Count:</span>
                <strong className="text-white font-mono text-xs">{product.threadCount}</strong>
              </div>
            </div>
          </div>

          {/* Volume Tier Pricing Table */}
          <div className="space-y-2">
            <span className="text-xs font-mono text-[#9999AA] uppercase">Bulk Mill Tier Pricing</span>
            <div className="grid grid-cols-3 gap-2 text-xs font-mono">
              {(product.tierPricing || []).map((tier, i) => (
                <div
                  key={i}
                  className={`p-2.5 rounded-xl border text-center transition-all ${
                    meters >= tier.minMeters
                      ? 'border-[#7C5CFC] bg-[#7C5CFC]/20 text-white font-bold'
                      : 'border-white/10 bg-[#13131A] text-[#9999AA]'
                  }`}
                >
                  <span className="block text-[10px] text-[#9999AA]">{tier.minMeters}m+</span>
                  <span className="text-sm font-bold text-white">${tier.pricePerMeter.toFixed(2)}/m</span>
                </div>
              ))}
            </div>
          </div>

          {/* Color Selection */}
          <div className="space-y-2">
            <span className="text-xs font-mono text-[#9999AA] uppercase">Colorway Swatches</span>
            <div className="flex flex-wrap gap-2">
              {(product.availableColors || []).map((c, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedColor(c.name)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs transition-all ${
                    (selectedColor || product.availableColors?.[0]?.name) === c.name
                      ? 'border-[#D4AF37] bg-[#D4AF37]/20 text-white font-semibold'
                      : 'border-white/10 bg-[#0A0A0F] text-[#9999AA]'
                  }`}
                >
                  <span className="w-3.5 h-3.5 rounded-full border border-white/30" style={{ backgroundColor: c.hex }} />
                  <span>{c.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Quantity Calculator */}
          <div className="p-4 rounded-2xl glass-panel border border-[#7C5CFC]/30 bg-[#13131A] space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="text-[#9999AA]">Order Meters (MOQ: {product.moqMeters}m):</span>
              <span className="text-[#D4AF37] font-mono font-bold">In Stock: {product.stockMeters}m</span>
            </div>

            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2 bg-[#0A0A0F] border border-white/10 rounded-xl px-3 py-1.5">
                <button
                  onClick={() => setMeters(m => Math.max(product.moqMeters, m - 10))}
                  className="px-2 py-1 text-xl font-bold text-[#9999AA] hover:text-white"
                >
                  -
                </button>
                <input
                  type="number"
                  value={meters}
                  min={product.moqMeters}
                  onChange={(e) => setMeters(Math.max(product.moqMeters, Number(e.target.value)))}
                  className="w-20 bg-transparent text-center font-mono font-bold text-white text-base outline-none"
                />
                <button
                  onClick={() => setMeters(m => m + 10)}
                  className="px-2 py-1 text-xl font-bold text-[#9999AA] hover:text-white"
                >
                  +
                </button>
              </div>

              <div className="text-right font-mono">
                <span className="text-2xl font-bold text-white">${totalPrice.toFixed(2)}</span>
                <span className="block text-[10px] text-[#9999AA]">@ ${unitPrice.toFixed(2)} / meter</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => openSampleModal(product)}
                className="flex-1 py-3 rounded-xl border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37]/10 font-bold text-xs transition-colors"
              >
                Request Free Swatch
              </button>

              <button
                onClick={() => addToCart(product, meters, selectedColor)}
                className="flex-[2] py-3 rounded-xl bg-gradient-to-r from-[#7C5CFC] to-[#5D38EC] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xl hover:brightness-110 transition-all"
              >
                <ShoppingBag className="w-4 h-4" /> Add Roll to Order Cart
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* REVIEWS SECTION */}
      <section className="pt-8 border-t border-white/10 space-y-6">
        <h3 className="font-serif text-2xl font-bold text-white">Buyer Reviews & Mill Feedback</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {INITIAL_REVIEWS.map((rev) => (
            <div key={rev.id} className="p-5 rounded-2xl glass-panel border border-white/10 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <div>
                  <strong className="text-white font-semibold text-sm">{rev.buyerName}</strong>
                  <p className="text-[#D4AF37] text-[11px]">{rev.buyerCompany}</p>
                </div>
                <div className="flex items-center gap-1 text-[#D4AF37]">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <span className="font-bold">{rev.rating}.0</span>
                </div>
              </div>
              <p className="text-[#9999AA] leading-relaxed">{rev.comment}</p>
            </div>
          ))}
        </div>
      </section>

      {/* RELATED PRODUCTS */}
      <section className="pt-8 border-t border-white/10 space-y-6">
        <h3 className="font-serif text-2xl font-bold text-white">Similar Mill Weaves</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {relatedProducts.map((rel) => (
            <FabricCard key={rel.id} product={rel} onSelect={onSelectProduct} />
          ))}
        </div>
      </section>
    </div>
  );
};
