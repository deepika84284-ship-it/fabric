import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  ShoppingBag,
  Trash2,
  Tag,
  Truck,
  ShieldCheck,
  CreditCard,
  ArrowRight,
  ChevronRight,
  Building2,
  Check
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { RazorpayModal } from '../components/RazorpayModal';
import { ShippingAddress, FreightType } from '../types';

interface CartCheckoutPageProps {
  onOrderSuccess: (orderId: string) => void;
  onNavigate: (page: string) => void;
}

export const CartCheckoutPage: React.FC<CartCheckoutPageProps> = ({ onOrderSuccess, onNavigate }) => {
  const {
    cart,
    updateCartQuantity,
    removeFromCart,
    freightType,
    setFreightType,
    coupon,
    applyCoupon,
    removeCoupon,
    subtotal,
    freightCost,
    discountAmount,
    taxAmount,
    grandTotal
  } = useCart();

  const { user } = useAuth();

  const [couponCode, setCouponCode] = useState('');
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>({
    fullName: user?.name || 'Elena Rostova',
    companyName: user?.businessProfile?.companyName || 'Atelier Rostova Couture',
    taxVatId: user?.businessProfile?.taxId || 'FR-9482710492',
    street: user?.businessProfile?.address || '24 Rue du Faubourg Saint-Honoré',
    city: user?.businessProfile?.city || 'Paris',
    state: 'Île-de-France',
    country: user?.businessProfile?.country || 'France',
    postalCode: '75008',
    phone: user?.businessProfile?.phone || '+33 1 42 68 55 00'
  });

  const handleApplyCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    if (couponCode.trim()) {
      await applyCoupon(couponCode);
      setCouponCode('');
    }
  };

  if (cart.length === 0) {
    return (
      <div className="px-4 py-20 text-center max-w-lg mx-auto space-y-4">
        <div className="w-16 h-16 rounded-full bg-[#13131A] border border-white/10 flex items-center justify-center mx-auto text-[#D4AF37]">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <h2 className="font-serif text-2xl font-bold text-white">Your Order Cart is Empty</h2>
        <p className="text-xs text-[#9999AA]">
          Browse our B2B mill catalog to select luxury silks, Belgian linens, and technical outerwear fabrics.
        </p>
        <button
          onClick={() => onNavigate('marketplace')}
          className="px-6 py-3 rounded-xl bg-[#7C5CFC] text-white text-xs font-bold shadow-lg hover:brightness-110 transition-all inline-flex items-center gap-2"
        >
          <span>Explore Fabrics</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-8 max-w-7xl mx-auto py-8 space-y-8">
      <div>
        <span className="text-xs font-mono text-[#D4AF37] uppercase tracking-widest">ENTERPRISE CHECKOUT</span>
        <h1 className="font-serif text-3xl font-bold text-white">Review B2B Order & Logistics</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Cart Table & Shipping Form */}
        <div className="lg:col-span-7 space-y-8">
          {/* Cart Items Table */}
          <div className="p-5 rounded-2xl glass-panel border border-white/10 bg-[#13131A] space-y-4">
            <h3 className="font-serif text-base font-bold text-white border-b border-white/10 pb-3">
              Selected Fabric Rolls ({cart.length})
            </h3>

            <div className="space-y-4">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-3 rounded-xl bg-[#0A0A0F] border border-white/5 text-xs"
                >
                  <div className="flex items-center gap-3">
                    <img src={item.productImage} alt={item.productTitle} className="w-14 h-14 rounded-lg object-cover" />
                    <div>
                      <h4 className="font-serif font-bold text-white">{item.productTitle}</h4>
                      <p className="text-[11px] text-[#9999AA]">
                        Supplier: <span className="text-[#D4AF37]">{item.supplierName}</span> • Color: {item.color}
                      </p>
                      <p className="text-[11px] text-white font-mono mt-0.5">${item.pricePerMeter.toFixed(2)} / meter</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                    {/* Meter counter */}
                    <div className="flex items-center gap-1.5 bg-[#13131A] border border-white/10 rounded-lg px-2 py-1">
                      <button
                        onClick={() => updateCartQuantity(item.id, Math.max(item.moqMeters, item.meters - 10))}
                        className="px-1 text-sm font-bold text-[#9999AA] hover:text-white"
                      >
                        -
                      </button>
                      <span className="font-mono text-white font-bold text-xs">{item.meters}m</span>
                      <button
                        onClick={() => updateCartQuantity(item.id, item.meters + 10)}
                        className="px-1 text-sm font-bold text-[#9999AA] hover:text-white"
                      >
                        +
                      </button>
                    </div>

                    <div className="text-right font-mono">
                      <span className="font-bold text-white text-sm">${(item.pricePerMeter * item.meters).toFixed(2)}</span>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="p-1.5 text-[#9999AA] hover:text-rose-400 transition-colors"
                      title="Remove"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Freight Logistics Selection */}
          <div className="p-5 rounded-2xl glass-panel border border-white/10 bg-[#13131A] space-y-3">
            <h3 className="font-serif text-base font-bold text-white">Select Freight & Courier Mode</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <button
                type="button"
                onClick={() => setFreightType('express_air')}
                className={`p-3 rounded-xl border text-left transition-all ${
                  freightType === 'express_air'
                    ? 'border-[#7C5CFC] bg-[#7C5CFC]/20 text-white'
                    : 'border-white/10 bg-[#0A0A0F] text-[#9999AA]'
                }`}
              >
                <Truck className="w-5 h-5 text-[#7C5CFC] mb-1" />
                <strong className="block text-white">48h Express Air Courier</strong>
                <span className="text-[10px] text-[#9999AA]">DHL Air Express ($180)</span>
              </button>

              <button
                type="button"
                onClick={() => setFreightType('standard')}
                className={`p-3 rounded-xl border text-left transition-all ${
                  freightType === 'standard'
                    ? 'border-[#7C5CFC] bg-[#7C5CFC]/20 text-white'
                    : 'border-white/10 bg-[#0A0A0F] text-[#9999AA]'
                }`}
              >
                <Truck className="w-5 h-5 text-sky-400 mb-1" />
                <strong className="block text-white">Standard Express</strong>
                <span className="text-[10px] text-[#9999AA]">FedEx Ground Freight ($100)</span>
              </button>

              <button
                type="button"
                onClick={() => setFreightType('maritime_sea')}
                className={`p-3 rounded-xl border text-left transition-all ${
                  freightType === 'maritime_sea'
                    ? 'border-[#7C5CFC] bg-[#7C5CFC]/20 text-white'
                    : 'border-white/10 bg-[#0A0A0F] text-[#9999AA]'
                }`}
              >
                <Truck className="w-5 h-5 text-[#D4AF37] mb-1" />
                <strong className="block text-white">Maritime Sea Container</strong>
                <span className="text-[10px] text-[#9999AA]">Bulk Container ($60)</span>
              </button>
            </div>
          </div>

          {/* Shipping Address Form */}
          <div className="p-5 rounded-2xl glass-panel border border-white/10 bg-[#13131A] space-y-4 text-xs">
            <h3 className="font-serif text-base font-bold text-white flex items-center gap-2">
              <Building2 className="w-4 h-4 text-[#D4AF37]" /> Delivery & Tax Details
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[#9999AA] mb-1 font-medium">Full Name</label>
                <input
                  type="text"
                  value={shippingAddress.fullName}
                  onChange={(e) => setShippingAddress({ ...shippingAddress, fullName: e.target.value })}
                  className="w-full bg-[#0A0A0F] border border-white/10 rounded-xl p-2.5 text-white outline-none focus:border-[#7C5CFC]"
                />
              </div>

              <div>
                <label className="block text-[#9999AA] mb-1 font-medium">Couture House / Company Name</label>
                <input
                  type="text"
                  value={shippingAddress.companyName}
                  onChange={(e) => setShippingAddress({ ...shippingAddress, companyName: e.target.value })}
                  className="w-full bg-[#0A0A0F] border border-white/10 rounded-xl p-2.5 text-white outline-none focus:border-[#7C5CFC]"
                />
              </div>

              <div>
                <label className="block text-[#9999AA] mb-1 font-medium">Tax / VAT / GST Registration Number</label>
                <input
                  type="text"
                  value={shippingAddress.taxVatId || ''}
                  onChange={(e) => setShippingAddress({ ...shippingAddress, taxVatId: e.target.value })}
                  className="w-full bg-[#0A0A0F] border border-white/10 rounded-xl p-2.5 text-white font-mono outline-none focus:border-[#7C5CFC]"
                />
              </div>

              <div>
                <label className="block text-[#9999AA] mb-1 font-medium">Street Address</label>
                <input
                  type="text"
                  value={shippingAddress.street}
                  onChange={(e) => setShippingAddress({ ...shippingAddress, street: e.target.value })}
                  className="w-full bg-[#0A0A0F] border border-white/10 rounded-xl p-2.5 text-white outline-none focus:border-[#7C5CFC]"
                />
              </div>

              <div>
                <label className="block text-[#9999AA] mb-1 font-medium">City</label>
                <input
                  type="text"
                  value={shippingAddress.city}
                  onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })}
                  className="w-full bg-[#0A0A0F] border border-white/10 rounded-xl p-2.5 text-white outline-none focus:border-[#7C5CFC]"
                />
              </div>

              <div>
                <label className="block text-[#9999AA] mb-1 font-medium">Country</label>
                <input
                  type="text"
                  value={shippingAddress.country}
                  onChange={(e) => setShippingAddress({ ...shippingAddress, country: e.target.value })}
                  className="w-full bg-[#0A0A0F] border border-white/10 rounded-xl p-2.5 text-white outline-none focus:border-[#7C5CFC]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Order Financial Summary & Checkout CTA */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-2xl glass-panel-gold border border-[#D4AF37]/40 bg-[#13131A] space-y-5 sticky top-24">
            <h3 className="font-serif text-lg font-bold text-white border-b border-white/10 pb-3">
              Order Summary
            </h3>

            {/* Coupon Application */}
            <div>
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <div className="relative flex-1">
                  <input
                    type="text"
                    placeholder="Promo Coupon (e.g. FABRIC10)"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="w-full bg-[#0A0A0F] text-xs text-white placeholder-[#9999AA] pl-8 pr-2 py-2.5 rounded-xl border border-white/10 outline-none uppercase"
                  />
                  <Tag className="w-3.5 h-3.5 text-[#D4AF37] absolute left-2.5 top-3" />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2.5 rounded-xl bg-[#D4AF37] text-black font-bold text-xs hover:brightness-110"
                >
                  Apply
                </button>
              </form>

              {coupon && (
                <div className="mt-2 flex items-center justify-between p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-400">
                  <span>Coupon {coupon.code} Applied ({coupon.discountPercent}% OFF)</span>
                  <button onClick={removeCoupon} className="text-rose-400 hover:underline">Remove</button>
                </div>
              )}
            </div>

            {/* Financial Breakdown Table */}
            <div className="space-y-2 text-xs font-mono border-t border-white/10 pt-4">
              <div className="flex justify-between text-[#9999AA]">
                <span>Fabric Subtotal:</span>
                <span className="text-white">${subtotal.toFixed(2)} USD</span>
              </div>

              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-400">
                  <span>Bulk Coupon Discount:</span>
                  <span>-${discountAmount.toFixed(2)} USD</span>
                </div>
              )}

              <div className="flex justify-between text-[#9999AA]">
                <span>Freight Logistics:</span>
                <span className="text-white">${freightCost.toFixed(2)} USD</span>
              </div>

              <div className="flex justify-between text-[#9999AA]">
                <span>Estimated VAT / Tax (8%):</span>
                <span className="text-white">${taxAmount.toFixed(2)} USD</span>
              </div>

              <div className="flex justify-between pt-3 border-t border-white/20 text-base font-bold text-white">
                <span>Grand Total Due:</span>
                <span className="text-[#D4AF37] font-mono">${grandTotal.toFixed(2)} USD</span>
              </div>
            </div>

            {/* Escrow Guarantee */}
            <div className="p-3 rounded-xl bg-[#0A0A0F] border border-white/5 text-[11px] text-[#9999AA] flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
              <span>Razorpay B2B Escrow protection active. Funds released to mill after delivery inspection.</span>
            </div>

            {/* Proceed to Payment CTA */}
            <button
              onClick={() => setShowPaymentModal(true)}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-[#7C5CFC] via-[#5D38EC] to-[#D4AF37] text-white font-bold text-sm shadow-xl hover:brightness-110 transition-all flex items-center justify-center gap-2"
            >
              <CreditCard className="w-4 h-4" /> Proceed to Razorpay Gateway
            </button>
          </div>
        </div>
      </div>

      {/* Razorpay Modal */}
      {showPaymentModal && (
        <RazorpayModal
          shippingAddress={shippingAddress}
          onSuccess={(orderId) => {
            setShowPaymentModal(false);
            onOrderSuccess(orderId);
          }}
          onClose={() => setShowPaymentModal(false)}
        />
      )}
    </div>
  );
};
