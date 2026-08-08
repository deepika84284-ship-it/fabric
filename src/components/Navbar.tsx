import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ShoppingBag,
  Heart,
  Scale,
  Search,
  User as UserIcon,
  Sparkles,
  ChevronDown,
  LogOut,
  LayoutDashboard,
  Menu,
  X,
  ShieldCheck,
  Layers,
  Globe
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { UserRole } from '../types';

interface NavbarProps {
  onNavigate: (page: string, params?: any) => void;
  activePage: string;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate, activePage }) => {
  const { user, role, switchDemoRole, logout } = useAuth();
  const { cart, wishlist, compareList, currency, setCurrency } = useCart();
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const cartItemsCount = (cart || []).reduce((acc, item) => acc + item.meters, 0);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onNavigate('marketplace', { search: searchQuery });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full transition-all">
      {/* Top Enterprise Role Switcher Bar */}
      <div className="bg-[#07070B] border-b border-white/5 py-1.5 px-4 text-xs font-mono">
        <div className="max-w-7xl mx-auto flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-3 text-[#9999AA]">
            <span className="flex items-center gap-1.5 text-[#D4AF37]">
              <ShieldCheck className="w-3.5 h-3.5" /> VERIFIED B2B MILL MARKETPLACE
            </span>
            <span className="hidden sm:inline">•</span>
            <span className="hidden sm:inline text-emerald-400">GOTS & OEKO-TEX Certified Suppliers</span>
          </div>

          <div className="flex items-center gap-4 ml-auto">
            {/* Currency Selector */}
            <div className="flex items-center gap-1.5 text-[#9999AA]">
              <Globe className="w-3.5 h-3.5 text-[#7C5CFC]" />
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value as any)}
                className="bg-transparent text-xs text-[#F0F0F5] outline-none cursor-pointer font-sans"
              >
                <option value="USD" className="bg-[#13131A] text-white">USD ($)</option>
                <option value="EUR" className="bg-[#13131A] text-white">EUR (€)</option>
                <option value="INR" className="bg-[#13131A] text-white">INR (₹)</option>
              </select>
            </div>

            {/* Role Toggle Tabs */}
            <div className="flex items-center gap-1 bg-[#13131A] p-0.5 rounded-lg border border-white/10">
              <span className="text-[10px] text-[#9999AA] px-1.5">View as:</span>
              {(['buyer', 'supplier', 'admin'] as UserRole[]).map((r) => (
                <button
                  key={r}
                  onClick={() => switchDemoRole(r)}
                  className={`px-2 py-0.5 rounded text-[11px] font-medium transition-all capitalize ${
                    role === r
                      ? 'bg-[#7C5CFC] text-white shadow'
                      : 'text-[#9999AA] hover:text-[#F0F0F5]'
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Glass Navbar */}
      <nav className="glass-nav py-3.5 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-6">
          {/* Brand Logo */}
          <button
            onClick={() => onNavigate('landing')}
            className="flex items-center gap-2.5 group text-left"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#7C5CFC] via-[#5D38EC] to-[#D4AF37] p-0.5 shadow-lg shadow-[#7C5CFC]/20 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-[#0A0A0F] rounded-[10px] flex items-center justify-center">
                <Layers className="w-5 h-5 text-[#D4AF37]" />
              </div>
            </div>
            <div>
              <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight bg-gradient-to-r from-white via-[#F0F0F5] to-[#D4AF37] bg-clip-text text-transparent">
                FabricFlow
              </span>
              <span className="block text-[10px] tracking-widest text-[#9999AA] font-mono -mt-1 uppercase">
                ENTERPRISE B2B
              </span>
            </div>
          </button>

          {/* Desktop Search */}
          <form onSubmit={handleSearchSubmit} className="hidden md:flex flex-1 max-w-md relative">
            <input
              type="text"
              placeholder="Search 100% Silk, Belgian Linen, Cashmere, GSM..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#13131A] text-sm text-[#F0F0F5] placeholder-[#9999AA] pl-10 pr-4 py-2.5 rounded-xl border border-white/10 focus:border-[#7C5CFC] focus:outline-none transition-all"
            />
            <Search className="w-4 h-4 text-[#9999AA] absolute left-3.5 top-3" />
          </form>

          {/* Navigation Links */}
          <div className="hidden lg:flex items-center gap-6 text-sm font-medium">
            <button
              onClick={() => onNavigate('marketplace')}
              className={`transition-colors hover:text-[#D4AF37] ${activePage === 'marketplace' ? 'text-[#D4AF37] font-semibold' : 'text-[#9999AA]'}`}
            >
              Marketplace
            </button>
            <button
              onClick={() => onNavigate('categories')}
              className={`transition-colors hover:text-[#D4AF37] ${activePage === 'categories' ? 'text-[#D4AF37] font-semibold' : 'text-[#9999AA]'}`}
            >
              Categories
            </button>
            <button
              onClick={() => onNavigate('about')}
              className={`transition-colors hover:text-[#D4AF37] ${activePage === 'about' ? 'text-[#D4AF37] font-semibold' : 'text-[#9999AA]'}`}
            >
              About
            </button>
            <button
              onClick={() => onNavigate('contact')}
              className={`transition-colors hover:text-[#D4AF37] ${activePage === 'contact' ? 'text-[#D4AF37] font-semibold' : 'text-[#9999AA]'}`}
            >
              Contact
            </button>
            <button
              onClick={() => onNavigate('faq')}
              className={`transition-colors hover:text-[#D4AF37] ${activePage === 'faq' ? 'text-[#D4AF37] font-semibold' : 'text-[#9999AA]'}`}
            >
              FAQ
            </button>
          </div>

          {/* Action Icons & User Account */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Compare Badge */}
            <button
              onClick={() => onNavigate('compare')}
              className="relative p-2 text-[#9999AA] hover:text-[#F0F0F5] transition-colors rounded-lg hover:bg-white/5"
              title="Compare Fabric Specs"
            >
              <Scale className="w-5 h-5" />
              {compareList.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#7C5CFC] text-white text-[10px] font-bold flex items-center justify-center">
                  {compareList.length}
                </span>
              )}
            </button>

            {/* Wishlist */}
            <button
              onClick={() => onNavigate('wishlist')}
              className="relative p-2 text-[#9999AA] hover:text-[#F0F0F5] transition-colors rounded-lg hover:bg-white/5"
              title="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Cart Button */}
            <button
              onClick={() => onNavigate('cart')}
              className="relative flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-[#7C5CFC] to-[#5D38EC] text-white rounded-xl shadow-lg shadow-[#7C5CFC]/25 hover:brightness-110 transition-all text-xs font-semibold"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline">Order Cart</span>
              {cartItemsCount > 0 && (
                <span className="bg-[#D4AF37] text-black px-1.5 py-0.5 rounded-full text-[11px] font-bold">
                  {cartItemsCount}m
                </span>
              )}
            </button>

            {/* User Dropdown */}
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-2 p-1.5 rounded-xl border border-white/10 bg-[#13131A] hover:border-[#7C5CFC]/50 transition-all"
              >
                <img
                  src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200'}
                  alt={user?.name || 'User'}
                  className="w-7 h-7 rounded-lg object-cover border border-[#D4AF37]/40"
                />
                <span className="hidden md:inline text-xs font-medium text-[#F0F0F5] max-w-[100px] truncate">
                  {user?.name || 'Account'}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-[#9999AA]" />
              </button>

              <AnimatePresence>
                {userMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 mt-2 w-56 rounded-xl glass-panel border border-white/10 shadow-2xl p-2 z-50 bg-[#13131A]/95 text-xs"
                  >
                    <div className="p-2 border-b border-white/10 mb-1">
                      <p className="font-semibold text-[#F0F0F5] text-sm">{user?.name}</p>
                      <p className="text-[11px] text-[#9999AA]">{user?.email}</p>
                      <div className="mt-1.5 inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#7C5CFC]/20 text-[#7C5CFC] font-semibold text-[10px] uppercase">
                        {role} Mode
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        setUserMenuOpen(false);
                        onNavigate(role === 'buyer' ? 'buyer-dashboard' : role === 'supplier' ? 'supplier-dashboard' : 'admin-dashboard');
                      }}
                      className="w-full flex items-center gap-2.5 p-2 rounded-lg text-[#F0F0F5] hover:bg-white/5 transition-colors"
                    >
                      <LayoutDashboard className="w-4 h-4 text-[#D4AF37]" />
                      <span>{role === 'buyer' ? 'Buyer Dashboard' : role === 'supplier' ? 'Supplier Portal' : 'Admin Control'}</span>
                    </button>

                    <button
                      onClick={() => {
                        setUserMenuOpen(false);
                        onNavigate('auth');
                      }}
                      className="w-full flex items-center gap-2.5 p-2 rounded-lg text-[#F0F0F5] hover:bg-white/5 transition-colors"
                    >
                      <UserIcon className="w-4 h-4 text-[#7C5CFC]" />
                      <span>Login / Register</span>
                    </button>

                    <div className="border-t border-white/10 my-1"></div>

                    <button
                      onClick={() => {
                        setUserMenuOpen(false);
                        logout();
                      }}
                      className="w-full flex items-center gap-2.5 p-2 rounded-lg text-rose-400 hover:bg-rose-500/10 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[#9999AA] hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:hidden overflow-hidden pt-4 border-t border-white/10 mt-3 flex flex-col gap-3 text-sm"
            >
              <form onSubmit={handleSearchSubmit} className="relative">
                <input
                  type="text"
                  placeholder="Search fabrics..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#13131A] text-sm text-[#F0F0F5] pl-10 pr-4 py-2 rounded-xl border border-white/10"
                />
                <Search className="w-4 h-4 text-[#9999AA] absolute left-3.5 top-2.5" />
              </form>

              <button onClick={() => { setMobileMenuOpen(false); onNavigate('marketplace'); }} className="text-left py-2 text-[#F0F0F5] border-b border-white/5">Marketplace</button>
              <button onClick={() => { setMobileMenuOpen(false); onNavigate('categories'); }} className="text-left py-2 text-[#F0F0F5] border-b border-white/5">Categories</button>
              <button onClick={() => { setMobileMenuOpen(false); onNavigate('about'); }} className="text-left py-2 text-[#F0F0F5] border-b border-white/5">About</button>
              <button onClick={() => { setMobileMenuOpen(false); onNavigate('contact'); }} className="text-left py-2 text-[#F0F0F5] border-b border-white/5">Contact</button>
              <button onClick={() => { setMobileMenuOpen(false); onNavigate('faq'); }} className="text-left py-2 text-[#F0F0F5]">FAQ</button>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
};
