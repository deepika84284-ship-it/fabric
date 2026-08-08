import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  ShieldCheck,
  Mail,
  Phone,
  Globe,
  MapPin,
  HelpCircle,
  ArrowRight,
  Send,
  Lock,
  UserCheck,
  Layers,
  CheckCircle2
} from 'lucide-react';
import { INITIAL_CATEGORIES } from '../data/seedData';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { UserRole } from '../types';

/* CATEGORIES PAGE */
export const CategoriesPage: React.FC<{ onSelectCategory: (slug: string) => void }> = ({ onSelectCategory }) => {
  return (
    <div className="px-4 sm:px-8 max-w-7xl mx-auto py-8 space-y-8">
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-xs font-mono text-[#D4AF37] uppercase tracking-widest">TEXTILE CLASSIFICATION</span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-white">Fabric Collections & Fibers</h1>
        <p className="text-xs sm:text-sm text-[#9999AA]">Sourced directly from certified textile mills across Europe and Asia.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {INITIAL_CATEGORIES.map((cat) => (
          <motion.div
            key={cat.id}
            whileHover={{ y: -6 }}
            onClick={() => onSelectCategory(cat.slug)}
            className="group relative rounded-2xl glass-panel border border-white/10 overflow-hidden cursor-pointer bg-[#13131A] shadow-xl"
          >
            <div className="aspect-[16/10] overflow-hidden">
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
              />
            </div>
            <div className="p-5 space-y-2">
              <span className="text-[10px] font-mono text-[#D4AF37] uppercase">{cat.productCount} Weaves Listed</span>
              <h3 className="font-serif text-xl font-bold text-white group-hover:text-[#D4AF37] transition-colors">
                {cat.name}
              </h3>
              <p className="text-xs text-[#9999AA] leading-relaxed">{cat.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

/* ABOUT PAGE */
export const AboutPage: React.FC = () => {
  return (
    <div className="px-4 sm:px-8 max-w-5xl mx-auto py-12 space-y-12 text-[#F0F0F5]">
      <div className="text-center space-y-3">
        <span className="text-xs font-mono text-[#7C5CFC] uppercase tracking-widest">OUR HERITAGE & MISSION</span>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white">Connecting Global Haute Couture with Master Textile Mills</h1>
      </div>

      <div className="p-8 rounded-3xl glass-panel border border-white/10 bg-[#13131A] leading-relaxed space-y-4 text-sm text-[#9999AA]">
        <p>
          Founded in 2024, <strong className="text-white font-serif">FabricFlow</strong> was built to eliminate opaque intermediary broker margins in global textile trading. We connect verified fashion houses in Paris, New York, and London directly with family-owned silk, linen, and cashmere mills in Como, Lyon, and Flanders.
        </p>
        <p>
          Every meter of fabric listed on FabricFlow undergoes laboratory verification for GSM weight accuracy, composition purity, and eco-certification compliance (GOTS & OEKO-TEX Standard 100).
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center text-xs">
        <div className="p-6 rounded-2xl glass-panel border border-white/10 space-y-2">
          <ShieldCheck className="w-8 h-8 text-[#D4AF37] mx-auto" />
          <h3 className="font-serif text-base font-bold text-white">100% Verified Mills</h3>
          <p className="text-[#9999AA]">Strict physical site audits & ISO 9001 compliance verification.</p>
        </div>

        <div className="p-6 rounded-2xl glass-panel border border-white/10 space-y-2">
          <Globe className="w-8 h-8 text-[#7C5CFC] mx-auto" />
          <h3 className="font-serif text-base font-bold text-white">Global Express Logistics</h3>
          <p className="text-[#9999AA]">48-hour sample swatch dispatch & insured air freight.</p>
        </div>

        <div className="p-6 rounded-2xl glass-panel border border-white/10 space-y-2">
          <Lock className="w-8 h-8 text-emerald-400 mx-auto" />
          <h3 className="font-serif text-base font-bold text-white">Razorpay Escrow</h3>
          <p className="text-[#9999AA]">Escrow payment protection ensuring quality approval before release.</p>
        </div>
      </div>
    </div>
  );
};

/* CONTACT PAGE */
export const ContactPage: React.FC = () => {
  const { showToast } = useToast();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    showToast('Enterprise inquiry sent! A dedicated account manager will respond within 4 hours.', 'success');
  };

  return (
    <div className="px-4 sm:px-8 max-w-5xl mx-auto py-12 space-y-12">
      <div className="text-center space-y-2">
        <span className="text-xs font-mono text-[#D4AF37] uppercase tracking-widest">GET IN TOUCH</span>
        <h1 className="font-serif text-4xl font-bold text-white">Enterprise Procurement Support</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="p-8 rounded-3xl glass-panel border border-white/10 bg-[#13131A] space-y-6 text-xs">
          <h3 className="font-serif text-xl font-bold text-white">Global Headquarters</h3>
          <div className="space-y-4 text-[#9999AA]">
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-[#D4AF37]" />
              <span>24 Rue du Faubourg Saint-Honoré, 75008 Paris, France</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-[#7C5CFC]" />
              <span>+33 1 42 68 55 00 (24/7 Enterprise Desk)</span>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-emerald-400" />
              <span>procurement@fabricflow.com</span>
            </div>
          </div>
        </div>

        <div className="p-8 rounded-3xl glass-panel border border-white/10 bg-[#13131A]">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-[#9999AA] mb-1">Couture House / Studio Name</label>
                <input required type="text" className="w-full bg-[#0A0A0F] border border-white/10 rounded-xl p-2.5 text-white outline-none" />
              </div>

              <div>
                <label className="block text-[#9999AA] mb-1">Work Email</label>
                <input required type="email" className="w-full bg-[#0A0A0F] border border-white/10 rounded-xl p-2.5 text-white outline-none" />
              </div>

              <div>
                <label className="block text-[#9999AA] mb-1">Message / Sourcing Requirements</label>
                <textarea required rows={4} className="w-full bg-[#0A0A0F] border border-white/10 rounded-xl p-2.5 text-white outline-none" />
              </div>

              <button type="submit" className="w-full py-3 rounded-xl bg-[#7C5CFC] text-white font-bold text-sm hover:bg-[#5D38EC]">
                Submit Enterprise Inquiry
              </button>
            </form>
          ) : (
            <div className="py-12 text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
              <h3 className="font-serif text-xl font-bold text-white">Inquiry Received</h3>
              <p className="text-xs text-[#9999AA]">Our Paris procurement team will reply shortly.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

/* FAQ PAGE */
export const FAQPage: React.FC = () => {
  const faqs = [
    {
      q: 'What is the standard Minimum Order Quantity (MOQ)?',
      a: 'MOQs are established by individual mills. Typical MOQs range from 20 to 50 meters for silk and cashmere, and 100 meters for organic cottons.'
    },
    {
      q: 'How do B2B Fabric Swatch requests work?',
      a: 'Verified couture buyers can request complimentary 10x10cm physical swatches. Swatches are dispatched via DHL express air courier within 48 hours.'
    },
    {
      q: 'How does Razorpay Escrow payment protection work?',
      a: 'When an order is placed, funds are safely held in escrow. The mill prepares and dispatches the shipment. Funds are released to the mill only upon physical delivery verification.'
    },
    {
      q: 'Are custom dyed colors available?',
      a: 'Yes. Suppliers accept Pantone TCX color matching requests for custom lab dips on bulk orders above 300 meters.'
    }
  ];

  return (
    <div className="px-4 sm:px-8 max-w-4xl mx-auto py-12 space-y-8">
      <div className="text-center space-y-2">
        <span className="text-xs font-mono text-[#D4AF37] uppercase tracking-widest">KNOWLEDGE BASE</span>
        <h1 className="font-serif text-3xl font-bold text-white">Frequently Asked Questions</h1>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, i) => (
          <div key={i} className="p-5 rounded-2xl glass-panel border border-white/10 bg-[#13131A] space-y-2">
            <h3 className="font-serif text-base font-bold text-white flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-[#7C5CFC]" /> {faq.q}
            </h3>
            <p className="text-xs text-[#9999AA] leading-relaxed pl-6">{faq.a}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

/* AUTHENTICATION PAGES */
export const AuthPage: React.FC<{ onNavigate: (page: string) => void }> = ({ onNavigate }) => {
  const { login, register } = useAuth();
  const { showToast } = useToast();

  const [isLoginView, setIsLoginView] = useState(true);
  const [role, setRole] = useState<UserRole>('buyer');
  const [email, setEmail] = useState('elena@atelier-rostova.com');
  const [password, setPassword] = useState('••••••••');
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoginView) {
      await login(email, password, role);
      onNavigate(role === 'buyer' ? 'buyer-dashboard' : role === 'supplier' ? 'supplier-dashboard' : 'admin-dashboard');
    } else {
      await register({ name, email, password, role, company });
      onNavigate(role === 'buyer' ? 'buyer-dashboard' : role === 'supplier' ? 'supplier-dashboard' : 'admin-dashboard');
    }
  };

  return (
    <div className="px-4 sm:px-8 max-w-md mx-auto py-12 space-y-6">
      <div className="text-center space-y-2">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#7C5CFC] to-[#D4AF37] p-0.5 mx-auto">
          <div className="w-full h-full bg-[#0A0A0F] rounded-[14px] flex items-center justify-center">
            <Layers className="w-6 h-6 text-[#D4AF37]" />
          </div>
        </div>
        <h1 className="font-serif text-2xl font-bold text-white">
          {isLoginView ? 'Sign In to FabricFlow' : 'Create Enterprise Account'}
        </h1>
        <p className="text-xs text-[#9999AA]">Access wholesale mill pricing & escrow procurement</p>
      </div>

      <div className="p-6 rounded-3xl glass-panel border border-white/10 bg-[#13131A] space-y-4">
        {/* Role Picker */}
        <div className="flex p-1 bg-[#0A0A0F] rounded-xl border border-white/10 text-xs">
          <button
            type="button"
            onClick={() => setRole('buyer')}
            className={`flex-1 py-1.5 rounded-lg font-semibold transition-all ${
              role === 'buyer' ? 'bg-[#7C5CFC] text-white' : 'text-[#9999AA]'
            }`}
          >
            Buyer Account
          </button>
          <button
            type="button"
            onClick={() => setRole('supplier')}
            className={`flex-1 py-1.5 rounded-lg font-semibold transition-all ${
              role === 'supplier' ? 'bg-[#D4AF37] text-black' : 'text-[#9999AA]'
            }`}
          >
            Mill Supplier
          </button>
        </div>

        {/* Google OAuth UI Button */}
        <button
          type="button"
          onClick={() => {
            login(email, password, role);
            onNavigate('landing');
          }}
          className="w-full py-2.5 rounded-xl bg-white/5 border border-white/10 text-white font-medium text-xs flex items-center justify-center gap-2 hover:bg-white/10 transition-colors"
        >
          <img src="https://www.google.com/favicon.ico" alt="Google" className="w-4 h-4" />
          <span>Continue with Google Workspace</span>
        </button>

        <div className="flex items-center gap-3 text-[#9999AA] text-[11px] my-2">
          <div className="h-px bg-white/10 flex-1" />
          <span>OR</span>
          <div className="h-px bg-white/10 flex-1" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-3 text-xs">
          {!isLoginView && (
            <>
              <div>
                <label className="block text-[#9999AA] mb-1">Full Name</label>
                <input
                  required
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#0A0A0F] border border-white/10 rounded-xl p-2.5 text-white outline-none"
                />
              </div>

              <div>
                <label className="block text-[#9999AA] mb-1">Company / Mill Name</label>
                <input
                  required
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="w-full bg-[#0A0A0F] border border-white/10 rounded-xl p-2.5 text-white outline-none"
                />
              </div>
            </>
          )}

          <div>
            <label className="block text-[#9999AA] mb-1">Work Email</label>
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#0A0A0F] border border-white/10 rounded-xl p-2.5 text-white outline-none"
            />
          </div>

          <div>
            <label className="block text-[#9999AA] mb-1">Password</label>
            <input
              required
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#0A0A0F] border border-white/10 rounded-xl p-2.5 text-white outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-[#7C5CFC] to-[#5D38EC] text-white font-bold text-xs shadow-lg hover:brightness-110 transition-all"
          >
            {isLoginView ? `Sign In as ${role.toUpperCase()}` : `Register ${role.toUpperCase()} Account`}
          </button>
        </form>

        <div className="text-center pt-2">
          <button
            onClick={() => setIsLoginView(!isLoginView)}
            className="text-xs text-[#9999AA] hover:text-[#D4AF37] underline"
          >
            {isLoginView ? "Don't have an enterprise account? Register here" : 'Already registered? Sign in'}
          </button>
        </div>
      </div>
    </div>
  );
};
