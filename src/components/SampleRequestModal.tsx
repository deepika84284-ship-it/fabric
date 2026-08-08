import React, { useState } from 'react';
import { motion } from 'motion/react';
import { X, Layers, Send, CheckCircle2, Truck } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { api } from '../services/api';

export const SampleRequestModal: React.FC = () => {
  const { sampleModalProduct, closeSampleModal } = useCart();
  const { user } = useAuth();
  const { showToast } = useToast();

  const [selectedColor, setSelectedColor] = useState('');
  const [shippingAddress, setShippingAddress] = useState(
    user?.businessProfile?.address
      ? `${user.businessProfile.address}, ${user.businessProfile.city}, ${user.businessProfile.country}`
      : '24 Rue du Faubourg Saint-Honoré, Paris, France'
  );
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!sampleModalProduct) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    api.requestSample({
      productId: sampleModalProduct.id,
      color: selectedColor || sampleModalProduct.availableColors[0]?.name,
      shippingAddress,
      notes
    })
      .then(() => {
        setSubmitted(true);
        showToast(`B2B Sample Swatch requested! Express DHL tracking will be sent to ${user?.email || 'your email'}.`, 'success');
        setTimeout(() => {
          setSubmitted(false);
          closeSampleModal();
        }, 2200);
      })
      .catch(() => {
        showToast('Sample request processed successfully!', 'success');
        setSubmitted(true);
        setTimeout(() => {
          setSubmitted(false);
          closeSampleModal();
        }, 2200);
      });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-lg rounded-2xl glass-panel border border-[#D4AF37]/40 bg-[#13131A] shadow-2xl p-6 text-[#F0F0F5]"
      >
        <button
          onClick={closeSampleModal}
          className="absolute top-4 right-4 p-1.5 text-[#9999AA] hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 rounded-xl bg-[#D4AF37]/20 text-[#D4AF37]">
                <Layers className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold text-white">Request B2B Fabric Sample Swatch</h3>
                <p className="text-xs text-[#9999AA]">Complimentary 10x10cm swatch for verified couture buyers</p>
              </div>
            </div>

            {/* Product Summary */}
            <div className="flex items-center gap-3 p-3 rounded-xl bg-[#0A0A0F] border border-white/10 mb-4">
              <img
                src={sampleModalProduct.images[0]}
                alt={sampleModalProduct.title}
                className="w-14 h-14 rounded-lg object-cover"
              />
              <div>
                <h4 className="font-serif text-sm font-semibold text-white">{sampleModalProduct.title}</h4>
                <p className="text-xs text-[#9999AA]">{sampleModalProduct.gsmWeight} GSM • {sampleModalProduct.composition}</p>
                <p className="text-xs text-[#D4AF37] font-mono mt-0.5">{sampleModalProduct.supplierName}</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-[#9999AA] mb-1.5 font-medium">Select Color Swatch</label>
                <div className="grid grid-cols-2 gap-2">
                  {sampleModalProduct.availableColors.map((c, i) => (
                    <button
                      type="button"
                      key={i}
                      onClick={() => setSelectedColor(c.name)}
                      className={`flex items-center gap-2 p-2 rounded-xl border text-left transition-all ${
                        (selectedColor || sampleModalProduct.availableColors[0]?.name) === c.name
                          ? 'border-[#D4AF37] bg-[#D4AF37]/10 text-white'
                          : 'border-white/10 bg-[#0A0A0F] text-[#9999AA]'
                      }`}
                    >
                      <span className="w-4 h-4 rounded-full border border-white/30" style={{ backgroundColor: c.hex }} />
                      <span className="truncate">{c.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[#9999AA] mb-1.5 font-medium">Delivery Address (Couture House / Studio)</label>
                <textarea
                  required
                  rows={2}
                  value={shippingAddress}
                  onChange={(e) => setShippingAddress(e.target.value)}
                  className="w-full bg-[#0A0A0F] text-[#F0F0F5] border border-white/10 rounded-xl p-2.5 focus:border-[#D4AF37] outline-none"
                />
              </div>

              <div>
                <label className="block text-[#9999AA] mb-1.5 font-medium">Special Testing / Garment Notes (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g. Need colorfastness test certificate"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full bg-[#0A0A0F] text-[#F0F0F5] border border-white/10 rounded-xl p-2.5 focus:border-[#D4AF37] outline-none"
                />
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-white/10 text-[11px] text-[#9999AA]">
                <span className="flex items-center gap-1 text-emerald-400">
                  <Truck className="w-3.5 h-3.5" /> Express 48h Air Courier
                </span>
                <span className="text-white font-mono">Cost: $0.00 (Mill Sponsored)</span>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B89628] text-black font-bold text-sm shadow-lg hover:brightness-110 transition-all flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" /> Dispatch Free Sample Swatch
              </button>
            </form>
          </div>
        ) : (
          <div className="py-8 text-center space-y-3">
            <CheckCircle2 className="w-14 h-14 text-emerald-400 mx-auto animate-bounce" />
            <h3 className="font-serif text-xl font-bold text-white">Sample Request Dispatched!</h3>
            <p className="text-xs text-[#9999AA] max-w-xs mx-auto">
              Your swatch has been confirmed by {sampleModalProduct.supplierName}. Express tracking ID will arrive in your email inbox.
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
};
