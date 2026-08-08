import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Search, SlidersHorizontal, Grid, List, RefreshCw, X, ChevronDown, Sparkles } from 'lucide-react';
import { Product } from '../types';
import { INITIAL_PRODUCTS, INITIAL_CATEGORIES } from '../data/seedData';
import { FabricCard } from '../components/FabricCard';
import { api } from '../services/api';

interface MarketplacePageProps {
  onSelectProduct: (product: Product) => void;
  initialCategory?: string;
  initialSearch?: string;
}

export const MarketplacePage: React.FC<MarketplacePageProps> = ({
  onSelectProduct,
  initialCategory = '',
  initialSearch = ''
}) => {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [search, setSearch] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedFabricType, setSelectedFabricType] = useState('');
  const [maxPrice, setMaxPrice] = useState<number>(120);
  const [maxGsm, setMaxGsm] = useState<number>(500);
  const [sortBy, setSortBy] = useState<string>('newest');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [loading, setLoading] = useState(false);
  const [showFiltersMobile, setShowFiltersMobile] = useState(false);

  const FABRIC_TYPES = ['Silk', 'Linen', 'Organic Cotton', 'Cashmere', 'Technical', 'Velvet', 'Wool', 'Satin', 'Denim'];

  useEffect(() => {
    fetchProducts();
  }, [search, selectedCategory, selectedFabricType, maxPrice, maxGsm, sortBy]);

  const fetchProducts = () => {
    setLoading(true);
    api.getProducts({
      search,
      category: selectedCategory,
      fabricType: selectedFabricType,
      maxPrice,
      maxGsm,
      sortBy
    })
      .then(data => {
        if (data.products) setProducts(data.products);
        setLoading(false);
      })
      .catch(() => {
        let res = [...INITIAL_PRODUCTS];
        if (search) res = res.filter(p => p.title.toLowerCase().includes(search.toLowerCase()) || p.description.toLowerCase().includes(search.toLowerCase()));
        if (selectedCategory) res = res.filter(p => p.category.toLowerCase() === selectedCategory.toLowerCase());
        if (selectedFabricType) res = res.filter(p => p.fabricType.toLowerCase() === selectedFabricType.toLowerCase());
        res = res.filter(p => p.pricePerMeter <= maxPrice);
        res = res.filter(p => p.gsmWeight <= maxGsm);
        if (sortBy === 'price_low') res.sort((a, b) => a.pricePerMeter - b.pricePerMeter);
        else if (sortBy === 'price_high') res.sort((a, b) => b.pricePerMeter - a.pricePerMeter);
        else if (sortBy === 'rating') res.sort((a, b) => b.rating - a.rating);
        setProducts(res);
        setLoading(false);
      });
  };

  const resetFilters = () => {
    setSearch('');
    setSelectedCategory('');
    setSelectedFabricType('');
    setMaxPrice(120);
    setMaxGsm(500);
    setSortBy('newest');
  };

  return (
    <div className="px-4 sm:px-8 max-w-7xl mx-auto py-8 space-y-8">
      {/* Header Banner */}
      <div className="p-8 rounded-3xl glass-panel border border-white/10 relative overflow-hidden bg-gradient-to-r from-[#13131A] via-[#1A1A26] to-[#13131A]">
        <div className="max-w-xl space-y-3 relative z-10">
          <span className="text-xs font-mono text-[#D4AF37] uppercase tracking-widest flex items-center gap-1.5">
            <Sparkles className="w-4 h-4" /> B2B MILL CATALOG SEARCH
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-white">Global Fabric Marketplace</h1>
          <p className="text-xs sm:text-sm text-[#9999AA]">
            Direct wholesale prices, lab-tested GSM weight certification, and fast 48-hour sample swatch dispatch.
          </p>
        </div>
      </div>

      {/* Main Filter & Products Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Left Filter Sidebar */}
        <div className={`lg:block ${showFiltersMobile ? 'block' : 'hidden'} space-y-6 glass-panel border border-white/10 p-5 rounded-2xl h-fit sticky top-24 bg-[#13131A]`}>
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <span className="font-serif font-bold text-white text-base flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-[#7C5CFC]" /> Filters
            </span>
            <button
              onClick={resetFilters}
              className="text-xs text-[#9999AA] hover:text-[#D4AF37] flex items-center gap-1 transition-colors"
            >
              <RefreshCw className="w-3 h-3" /> Reset All
            </button>
          </div>

          {/* Search Field */}
          <div>
            <label className="block text-xs font-mono text-[#9999AA] uppercase mb-2">Keyword Search</label>
            <div className="relative">
              <input
                type="text"
                placeholder="Silk, Linen, GSM..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-[#0A0A0F] text-xs text-white placeholder-[#9999AA] pl-8 pr-3 py-2 rounded-xl border border-white/10 focus:border-[#7C5CFC] outline-none"
              />
              <Search className="w-3.5 h-3.5 text-[#9999AA] absolute left-2.5 top-2.5" />
            </div>
          </div>

          {/* Fabric Type */}
          <div>
            <label className="block text-xs font-mono text-[#9999AA] uppercase mb-2">Fabric Fiber Type</label>
            <div className="space-y-1 max-h-44 overflow-y-auto pr-1">
              <button
                onClick={() => setSelectedFabricType('')}
                className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs transition-colors ${
                  !selectedFabricType ? 'bg-[#7C5CFC]/20 text-white font-semibold' : 'text-[#9999AA] hover:text-white'
                }`}
              >
                All Fabric Types
              </button>
              {FABRIC_TYPES.map((type) => (
                <button
                  key={type}
                  onClick={() => setSelectedFabricType(type)}
                  className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs transition-colors ${
                    selectedFabricType === type ? 'bg-[#7C5CFC]/20 text-white font-semibold' : 'text-[#9999AA] hover:text-white'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Max Price Range Slider */}
          <div>
            <div className="flex justify-between text-xs text-[#9999AA] mb-1">
              <span>Max Price / Meter:</span>
              <span className="font-mono text-[#D4AF37] font-bold">${maxPrice}/m</span>
            </div>
            <input
              type="range"
              min="10"
              max="150"
              step="5"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-[#7C5CFC] cursor-pointer"
            />
          </div>

          {/* Max GSM Range Slider */}
          <div>
            <div className="flex justify-between text-xs text-[#9999AA] mb-1">
              <span>Max Weight (GSM):</span>
              <span className="font-mono text-white font-bold">{maxGsm} g/m²</span>
            </div>
            <input
              type="range"
              min="50"
              max="500"
              step="25"
              value={maxGsm}
              onChange={(e) => setMaxGsm(Number(e.target.value))}
              className="w-full accent-[#D4AF37] cursor-pointer"
            />
          </div>
        </div>

        {/* Right Product Grid Area */}
        <div className="lg:col-span-3 space-y-6">
          {/* Controls Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl glass-panel border border-white/10 bg-[#13131A]">
            <div className="text-xs text-[#9999AA]">
              Showing <strong className="text-white font-mono">{products.length}</strong> B2B fabric listings
            </div>

            <div className="flex items-center gap-4">
              {/* Sort Selector */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-[#0A0A0F] text-xs text-[#F0F0F5] border border-white/10 rounded-xl px-3 py-2 outline-none cursor-pointer"
              >
                <option value="newest">Sort by: Newest Arrivals</option>
                <option value="price_low">Sort by: Price (Low to High)</option>
                <option value="price_high">Sort by: Price (High to Low)</option>
                <option value="rating">Sort by: Highest Rated</option>
              </select>

              {/* View Toggle */}
              <div className="flex items-center gap-1 bg-[#0A0A0F] p-1 rounded-lg border border-white/10">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 rounded transition-colors ${viewMode === 'grid' ? 'bg-[#7C5CFC] text-white' : 'text-[#9999AA]'}`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-1.5 rounded transition-colors ${viewMode === 'list' ? 'bg-[#7C5CFC] text-white' : 'text-[#9999AA]'}`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>

              {/* Mobile Filter Toggle */}
              <button
                onClick={() => setShowFiltersMobile(!showFiltersMobile)}
                className="lg:hidden p-2 rounded-lg bg-white/10 text-white text-xs flex items-center gap-1"
              >
                <SlidersHorizontal className="w-4 h-4" /> Filters
              </button>
            </div>
          </div>

          {/* Product Grid / List */}
          {loading ? (
            <div className="py-20 text-center space-y-3">
              <div className="w-10 h-10 border-4 border-[#7C5CFC] border-t-transparent rounded-full animate-spin mx-auto" />
              <p className="text-xs text-[#9999AA]">Filtering mill database...</p>
            </div>
          ) : products.length > 0 ? (
            <div className={viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
              {products.map((product) => (
                <FabricCard key={product.id} product={product} onSelect={onSelectProduct} />
              ))}
            </div>
          ) : (
            <div className="py-20 text-center space-y-3 glass-panel rounded-2xl border border-white/10">
              <Search className="w-12 h-12 text-[#9999AA] mx-auto opacity-50" />
              <h3 className="font-serif text-xl font-bold text-white">No Fabrics Matched Your Search</h3>
              <p className="text-xs text-[#9999AA]">Try broadening your filters or clearing keyword searches.</p>
              <button
                onClick={resetFilters}
                className="px-4 py-2 rounded-xl bg-[#7C5CFC] text-white text-xs font-bold"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
