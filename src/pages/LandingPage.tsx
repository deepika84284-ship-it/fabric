import React from 'react';
import { motion } from 'motion/react';
import {
  ShieldCheck,
  Globe,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  FileCheck2,
  Zap,
  Layers,
  Scale,
  Truck,
  Building2,
  TrendingUp,
  Lock,
  Boxes
} from 'lucide-react';
import { INITIAL_CATEGORIES, INITIAL_PRODUCTS } from '../data/seedData';
import { FabricCard } from '../components/FabricCard';
import { Product } from '../types';

interface LandingPageProps {
  onNavigate: (page: string, params?: any) => void;
  onSelectProduct: (product: Product) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onNavigate, onSelectProduct }) => {
  return (
    <div className="space-y-16 pb-20">
      {/* BENTO HERO GRID SECTION */}
      <section className="pt-8 pb-12 px-4 sm:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Main Hero Bento Tile (8 Cols) */}
          <div className="lg:col-span-8 bento-card p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden bg-gradient-to-br from-[#13131A] via-[#13131A]/90 to-[#1F1F2E]/60 border border-white/10">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#7C5CFC]/15 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#D4AF37]/10 rounded-full blur-[90px] pointer-events-none" />

            <div className="relative z-10 space-y-6">
              <div className="bento-header-pill">
                <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>GLOBAL B2B TEXTILE MARKETPLACE</span>
              </div>

              <h1 className="font-serif text-4xl sm:text-6xl font-bold tracking-tight text-white leading-[1.1]">
                Source Luxury <br />
                <span className="bg-gradient-to-r from-white via-[#F0F0F5] to-[#D4AF37] bg-clip-text text-transparent">
                  Mill Fabrics Direct.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-[#9999AA] leading-relaxed max-w-xl font-normal">
                Connecting couture fashion houses, apparel manufacturers, and master tailors directly with certified European & Asian textile mills in Como, Lyon, and Flanders.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => onNavigate('marketplace')}
                  className="px-7 py-3.5 rounded-xl bg-gradient-to-r from-[#7C5CFC] to-[#5D38EC] text-white font-bold text-sm shadow-xl shadow-[#7C5CFC]/30 hover:brightness-110 transition-all flex items-center gap-2 group"
                >
                  <span>Explore 4,500+ Mill Fabrics</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={() => onNavigate('auth')}
                  className="px-6 py-3.5 rounded-xl bg-white/5 border border-[#D4AF37]/40 text-[#D4AF37] hover:bg-[#D4AF37]/10 font-bold text-sm transition-all"
                >
                  Join as Verified Mill
                </button>
              </div>
            </div>

            {/* Bento Bottom Metrics Strip */}
            <div className="grid grid-cols-3 gap-4 pt-8 mt-8 border-t border-white/10 relative z-10">
              <div>
                <span className="font-serif text-2xl sm:text-3xl font-bold text-white font-mono">$18.4M+</span>
                <span className="block text-xs text-[#9999AA] mt-0.5">Annual B2B Volume</span>
              </div>
              <div>
                <span className="font-serif text-2xl sm:text-3xl font-bold text-[#D4AF37] font-mono">480+</span>
                <span className="block text-xs text-[#9999AA] mt-0.5">Verified Mills</span>
              </div>
              <div>
                <span className="font-serif text-2xl sm:text-3xl font-bold text-emerald-400 font-mono">100%</span>
                <span className="block text-xs text-[#9999AA] mt-0.5">Escrow Protected</span>
              </div>
            </div>
          </div>

          {/* Featured Release Side Bento Card (4 Cols) */}
          <div className="lg:col-span-4 bento-card-gold p-4 flex flex-col justify-between group">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-4">
              <img
                src="https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&q=80&w=1000"
                alt="Mulberry Silk"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0F] via-transparent to-transparent opacity-80" />
              <div className="absolute top-3 left-3 bg-[#D4AF37] text-black font-extrabold text-[10px] uppercase px-2.5 py-1 rounded-md">
                FEATURED MILL RELEASE
              </div>
            </div>

            <div className="space-y-2 p-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-[#9999AA] font-mono">Tessitura Seta Como • Grade 6A</span>
                <span className="text-sm font-bold text-[#D4AF37] font-mono">$34.50/m</span>
              </div>
              <h3 className="font-serif text-lg font-bold text-white group-hover:text-[#D4AF37] transition-colors">
                Mulberry Silk Charmeuse 19mm
              </h3>
              <p className="text-xs text-[#9999AA]">
                Lab tested 100% Organic Silk with OEKO-TEX Standard 100 certification. Immediate bulk rolls ready for air shipping.
              </p>
              
              <button
                onClick={() => onNavigate('marketplace')}
                className="w-full mt-3 py-2.5 rounded-xl bg-white/5 border border-white/10 hover:border-[#D4AF37]/50 text-white text-xs font-semibold flex items-center justify-center gap-2 transition-all"
              >
                <span>View Technical Specs</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#D4AF37]" />
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* BENTO PLATFORM CAPABILITIES GRID */}
      <section className="px-4 sm:px-8 max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
          <div>
            <span className="bento-header-pill">ENTERPRISE CORE PLATFORM</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white mt-2">Built for High-Fashion Sourcing</h2>
          </div>
          <p className="text-xs text-[#9999AA] max-w-md">
            Streamlined mill-to-atelier workflows designed to eliminate broker markup, guarantee quality compliance, and accelerate production cycles.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          
          {/* Bento Tile 1: Escrow & Payment (Large 2 Cols) */}
          <div className="md:col-span-2 bento-card p-6 flex flex-col justify-between bg-gradient-to-br from-[#13131A] to-[#1F1F2E]/80 border border-white/10">
            <div className="flex items-start justify-between mb-6">
              <div className="p-3 rounded-2xl bg-[#7C5CFC]/15 border border-[#7C5CFC]/30 text-[#7C5CFC]">
                <Lock className="w-6 h-6" />
              </div>
              <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[11px] font-mono">
                Razorpay Escrow Integrated
              </span>
            </div>

            <div className="space-y-2">
              <h3 className="font-serif text-xl font-bold text-white">Guaranteed B2B Escrow Protection</h3>
              <p className="text-xs text-[#9999AA] leading-relaxed">
                Funds remain safely locked in milestone escrow until physical fabric rolls arrive at your atelier and pass official lab GSM quality inspection.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-2 mt-6 pt-4 border-t border-white/10 text-center">
              <div className="bg-white/5 p-2 rounded-xl">
                <span className="text-[10px] text-[#9999AA] block">1. Order Lock</span>
                <span className="text-xs font-bold text-white">Escrow Funded</span>
              </div>
              <div className="bg-white/5 p-2 rounded-xl">
                <span className="text-[10px] text-[#9999AA] block">2. Air Freight</span>
                <span className="text-xs font-bold text-white">Mill Dispatches</span>
              </div>
              <div className="bg-white/5 p-2 rounded-xl">
                <span className="text-[10px] text-[#9999AA] block">3. Release</span>
                <span className="text-xs font-bold text-emerald-400">Quality Verified</span>
              </div>
            </div>
          </div>

          {/* Bento Tile 2: 48-Hour Swatches */}
          <div className="bento-card p-6 flex flex-col justify-between bg-[#13131A]">
            <div className="p-3 rounded-2xl bg-[#D4AF37]/15 border border-[#D4AF37]/30 text-[#D4AF37] w-fit mb-4">
              <FileCheck2 className="w-6 h-6" />
            </div>
            <div className="space-y-2">
              <span className="text-[10px] font-mono text-[#D4AF37] uppercase">EXPRESS COURIER</span>
              <h3 className="font-serif text-lg font-bold text-white">48-Hr Sample Swatches</h3>
              <p className="text-xs text-[#9999AA]">
                Receive physical 10x10cm fabric swatches globally before committing to full bulk production rolls.
              </p>
            </div>
          </div>

          {/* Bento Tile 3: Direct Mill Verification */}
          <div className="bento-card p-6 flex flex-col justify-between bg-[#13131A]">
            <div className="p-3 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 w-fit mb-4">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div className="space-y-2">
              <span className="text-[10px] font-mono text-emerald-400 uppercase">AUDITED QUALITY</span>
              <h3 className="font-serif text-lg font-bold text-white">GOTS & OEKO-TEX</h3>
              <p className="text-xs text-[#9999AA]">
                Direct lab test certificates verified for organic fibers, thread count accuracy, and colorfastness.
              </p>
            </div>
          </div>

          {/* Bento Tile 4: Custom Dye & Weave Matcher */}
          <div className="bento-card p-6 flex flex-col justify-between bg-[#13131A]">
            <div className="p-3 rounded-2xl bg-purple-500/15 border border-purple-500/30 text-purple-400 w-fit mb-4">
              <Scale className="w-6 h-6" />
            </div>
            <div className="space-y-2">
              <span className="text-[10px] font-mono text-purple-400 uppercase">SPEC MATRIX</span>
              <h3 className="font-serif text-lg font-bold text-white">GSM & Tech Spec Match</h3>
              <p className="text-xs text-[#9999AA]">
                Compare yarn count, weave density, and stretch percentage side-by-side across multiple certified mills.
              </p>
            </div>
          </div>

          {/* Bento Tile 5: Bulk Tiered Pricing (Span 3 Cols) */}
          <div className="md:col-span-3 bento-card p-6 flex flex-col sm:flex-row items-center justify-between gap-6 bg-gradient-to-r from-[#13131A] via-[#13131A] to-[#251B42]/50">
            <div className="space-y-2 max-w-xl">
              <div className="bento-header-pill">AUTOMATED VOLUME DISCOUNTING</div>
              <h3 className="font-serif text-xl font-bold text-white">Tiered Bulk Roll Volume Pricing</h3>
              <p className="text-xs text-[#9999AA]">
                Automatic tier calculations: Save up to 28% per meter when ordering 500+ or 1,000+ meters directly from participating mills.
              </p>
            </div>
            <button
              onClick={() => onNavigate('marketplace')}
              className="px-6 py-3 rounded-xl bg-[#7C5CFC] hover:bg-[#6B47EB] text-white text-xs font-bold shrink-0 transition-all shadow-lg"
            >
              Browse Wholesale Tiers
            </button>
          </div>

        </div>
      </section>

      {/* LUXURY FABRIC CATEGORIES BENTO GRID */}
      <section className="px-4 sm:px-8 max-w-7xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <span className="bento-header-pill">CURATED COLLECTIONS</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white mt-2">Explore Luxury Categories</h2>
          </div>
          <button
            onClick={() => onNavigate('categories')}
            className="text-xs font-bold text-[#7C5CFC] hover:text-white flex items-center gap-1 transition-colors"
          >
            <span>View All</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Asymmetric Bento Category Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {INITIAL_CATEGORIES.map((cat, idx) => {
            const isLarge = idx === 0; // First item gets 2x col span
            return (
              <motion.div
                key={cat.id}
                whileHover={{ scale: 1.01 }}
                onClick={() => onNavigate('marketplace', { category: cat.slug })}
                className={`group relative rounded-3xl overflow-hidden cursor-pointer border border-white/10 bento-card p-0 ${
                  isLarge ? 'md:col-span-2 md:row-span-2 h-80 md:h-full' : 'h-64'
                }`}
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-75 group-hover:brightness-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0F] via-[#0A0A0F]/50 to-transparent" />

                <div className="absolute bottom-6 left-6 right-6 space-y-1 z-10">
                  <span className="text-[10px] font-mono text-[#D4AF37] uppercase tracking-wider bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-md border border-[#D4AF37]/30">
                    {cat.productCount} Mill Items
                  </span>
                  <h3 className={`font-serif font-bold text-white group-hover:text-[#D4AF37] transition-colors ${
                    isLarge ? 'text-2xl sm:text-3xl' : 'text-xl'
                  }`}>
                    {cat.name}
                  </h3>
                  <p className="text-xs text-[#9999AA] line-clamp-2">{cat.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* FEATURED MILL PRODUCTS BENTO SECTION */}
      <section className="px-4 sm:px-8 max-w-7xl mx-auto space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="bento-header-pill">MILL DIRECT INVENTORY</span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white">Trending B2B Fabric Rolls</h2>
          <p className="text-xs text-[#9999AA]">Lab tested GSM weights, GOTS eco-certifications, and tiered bulk volume pricing.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {INITIAL_PRODUCTS.slice(0, 6).map((product) => (
            <FabricCard key={product.id} product={product} onSelect={onSelectProduct} />
          ))}
        </div>

        <div className="text-center pt-6">
          <button
            onClick={() => onNavigate('marketplace')}
            className="px-8 py-3.5 rounded-2xl bento-card border border-white/20 text-white font-bold text-sm hover:border-[#7C5CFC] hover:text-[#7C5CFC] transition-all inline-flex items-center gap-2"
          >
            <span>Explore Full B2B Marketplace Catalog</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* BRAND TESTIMONIALS BENTO GRID */}
      <section className="px-4 sm:px-8 max-w-7xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <span className="bento-header-pill">GLOBAL ATELIER REPUTATION</span>
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">Trusted by World-Renowned Couture Houses</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bento-card p-6 space-y-4 bg-[#13131A] flex flex-col justify-between">
            <p className="text-xs text-[#9999AA] italic leading-relaxed">
              "FabricFlow reduced our raw silk procurement cycle from 6 weeks down to 4 days. Connecting directly with Tessitura Como transformed our runway production schedule."
            </p>
            <div className="pt-4 border-t border-white/10">
              <p className="font-bold text-white text-sm">Elena Rostova</p>
              <p className="text-xs text-[#D4AF37]">Lead Procurement Director, Atelier Rostova (Paris)</p>
            </div>
          </div>

          <div className="bento-card p-6 space-y-4 bg-[#13131A] flex flex-col justify-between">
            <p className="text-xs text-[#9999AA] italic leading-relaxed">
              "The ability to request physical sample swatches and compare technical GSM specs side-by-side online has revolutionized our menswear sourcing."
            </p>
            <div className="pt-4 border-t border-white/10">
              <p className="font-bold text-white text-sm">Jean-Luc Moreau</p>
              <p className="text-xs text-[#D4AF37]">Chief Tailor, Maison Moreau</p>
            </div>
          </div>

          <div className="bento-card p-6 space-y-4 bg-[#13131A] flex flex-col justify-between">
            <p className="text-xs text-[#9999AA] italic leading-relaxed">
              "Selling our organic linen rolls directly to international buyers with guaranteed Escrow payments has increased our export revenue by 340%."
            </p>
            <div className="pt-4 border-t border-white/10">
              <p className="font-bold text-white text-sm">Gianluigi Como</p>
              <p className="text-xs text-[#D4AF37]">Managing Director, Tessitura Seta Como SpA</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

