import React from 'react';
import { Layers, ShieldCheck, Award, Globe, Mail, Phone, ArrowRight } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-[#07070B] border-t border-white/10 text-[#9999AA] pt-16 pb-12 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
        {/* Brand & Mission */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#7C5CFC] to-[#D4AF37] p-0.5">
              <div className="w-full h-full bg-[#0A0A0F] rounded-[10px] flex items-center justify-center">
                <Layers className="w-4 h-4 text-[#D4AF37]" />
              </div>
            </div>
            <span className="font-serif text-2xl font-bold tracking-tight text-white">FabricFlow</span>
          </div>
          <p className="text-sm leading-relaxed text-[#9999AA]">
            The premier global enterprise B2B textile procurement platform connecting luxury fashion houses, haute couture ateliers, and commercial manufacturers directly with GOTS & OEKO-TEX certified mills in Como, Lyon, Jaipur, and Porto.
          </p>

          <div className="flex items-center gap-4 text-xs pt-2">
            <div className="flex items-center gap-1.5 text-emerald-400">
              <ShieldCheck className="w-4 h-4" /> 100% Mill Verified
            </div>
            <div className="flex items-center gap-1.5 text-[#D4AF37]">
              <Award className="w-4 h-4" /> Lab Tested GSM
            </div>
            <div className="flex items-center gap-1.5 text-[#7C5CFC]">
              <Globe className="w-4 h-4" /> 48-Hr Sample Shipping
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="space-y-3">
          <h4 className="font-serif text-sm font-semibold text-white tracking-wider uppercase">Marketplace</h4>
          <ul className="space-y-2 text-sm">
            <li><button onClick={() => onNavigate('marketplace')} className="hover:text-[#D4AF37] transition-colors">All Fabrics</button></li>
            <li><button onClick={() => onNavigate('categories')} className="hover:text-[#D4AF37] transition-colors">Mulberry Silk</button></li>
            <li><button onClick={() => onNavigate('categories')} className="hover:text-[#D4AF37] transition-colors">Belgian Linen</button></li>
            <li><button onClick={() => onNavigate('categories')} className="hover:text-[#D4AF37] transition-colors">Mongolian Cashmere</button></li>
            <li><button onClick={() => onNavigate('categories')} className="hover:text-[#D4AF37] transition-colors">Technical Shells</button></li>
          </ul>
        </div>

        {/* Enterprise */}
        <div className="space-y-3">
          <h4 className="font-serif text-sm font-semibold text-white tracking-wider uppercase">Enterprise</h4>
          <ul className="space-y-2 text-sm">
            <li><button onClick={() => onNavigate('about')} className="hover:text-[#D4AF37] transition-colors">About FabricFlow</button></li>
            <li><button onClick={() => onNavigate('contact')} className="hover:text-[#D4AF37] transition-colors">Enterprise Support</button></li>
            <li><button onClick={() => onNavigate('faq')} className="hover:text-[#D4AF37] transition-colors">B2B Sample Policy</button></li>
            <li><button onClick={() => onNavigate('auth')} className="hover:text-[#D4AF37] transition-colors">Supplier Portal</button></li>
            <li><button onClick={() => onNavigate('auth')} className="hover:text-[#D4AF37] transition-colors">Buyer Verification</button></li>
          </ul>
        </div>

        {/* Newsletter & Global Hubs */}
        <div className="space-y-4">
          <h4 className="font-serif text-sm font-semibold text-white tracking-wider uppercase">Global Offices</h4>
          <p className="text-xs text-[#9999AA]">
            Paris • Milan • New York • Shanghai • Mumbai • London
          </p>

          <div className="pt-2">
            <p className="text-xs font-medium text-white mb-2">Subscribe to Mill Drops & Trend Reports</p>
            <div className="flex relative">
              <input
                type="email"
                placeholder="procurement@atelier.com"
                className="w-full bg-[#13131A] text-xs text-[#F0F0F5] placeholder-[#9999AA] pl-3 pr-8 py-2.5 rounded-xl border border-white/10 focus:border-[#7C5CFC] focus:outline-none"
              />
              <button className="absolute right-1 top-1 bottom-1 px-3 bg-[#7C5CFC] text-white rounded-lg flex items-center justify-center hover:bg-[#5D38EC]">
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto border-t border-white/5 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
        <p>© 2026 FabricFlow Enterprise Inc. All Rights Reserved. Luxury B2B Textile Marketplace.</p>
        <div className="flex items-center gap-6">
          <span className="hover:underline cursor-pointer">Privacy Policy</span>
          <span className="hover:underline cursor-pointer">Terms of Service</span>
          <span className="hover:underline cursor-pointer">Supplier Agreement</span>
          <span className="hover:underline cursor-pointer">ISO 9001 Compliance</span>
        </div>
      </div>
    </footer>
  );
};
