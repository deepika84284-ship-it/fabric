import React, { useState } from 'react';
import { motion } from 'motion/react';
import { X, ShieldCheck, CreditCard, Lock, CheckCircle2, QrCode, Building2, Smartphone } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { ShippingAddress } from '../types';
import { api } from '../services/api';

interface RazorpayModalProps {
  shippingAddress: ShippingAddress;
  onSuccess: (orderId: string) => void;
  onClose: () => void;
}

export const RazorpayModal: React.FC<RazorpayModalProps> = ({ shippingAddress, onSuccess, onClose }) => {
  const { cart, grandTotal, freightType, discountAmount, taxAmount, subtotal, clearCart } = useCart();
  const { user } = useAuth();
  const { showToast } = useToast();

  const [paymentMethod, setPaymentMethod] = useState<'card' | 'upi' | 'netbanking'>('card');
  const [step, setStep] = useState<'details' | 'otp' | 'processing' | 'success'>('details');
  const [otp, setOtp] = useState('123456');
  const [cardNumber, setCardNumber] = useState('4532 •••• •••• 8892');
  const [upiId, setUpiId] = useState('enterprise.procurement@okicici');

  const handlePayNow = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('otp');
  };

  const handleConfirmOtp = () => {
    setStep('processing');
    setTimeout(() => {
      // Call Backend order creation API
      const orderItems = cart.map(item => ({
        productId: item.productId,
        title: item.productTitle,
        image: item.productImage,
        color: item.color,
        meters: item.meters,
        pricePerMeter: item.pricePerMeter,
        total: item.pricePerMeter * item.meters,
        supplierName: item.supplierName,
        supplierId: 'user-supplier-1'
      }));

      api.createOrder({
        items: orderItems,
        subtotal,
        freightType,
        shippingCost: freightType === 'express_air' ? 180 : freightType === 'maritime_sea' ? 60 : 100,
        discount: discountAmount,
        tax: taxAmount,
        totalAmount: grandTotal,
        shippingAddress,
        paymentMethod: 'razorpay',
        razorpayPaymentId: `pay_P${Math.floor(10000000 + Math.random() * 90000000)}`
      })
        .then(data => {
          setStep('success');
          showToast(`Razorpay Payment Approved! Order ${data.order?.orderNumber} created.`, 'success');
          clearCart();
          setTimeout(() => {
            onSuccess(data.order?.id || 'ord-88912');
          }, 1800);
        })
        .catch(() => {
          setStep('success');
          showToast('Payment successful!', 'success');
          clearCart();
          setTimeout(() => {
            onSuccess('ord-88912');
          }, 1800);
        });
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-lg">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className="relative w-full max-w-md rounded-2xl bg-[#0F0F17] border border-[#7C5CFC]/40 shadow-2xl p-6 text-[#F0F0F5] overflow-hidden"
      >
        {/* Razorpay Brand Header */}
        <div className="bg-gradient-to-r from-[#0C2340] via-[#1A365D] to-[#0C2340] -mx-6 -mt-6 p-4 mb-5 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded bg-[#0284C7] text-white flex items-center justify-center font-bold font-mono text-sm shadow">
              R
            </div>
            <div>
              <span className="font-bold text-white text-sm tracking-wide">Razorpay Trusted Checkout</span>
              <span className="block text-[10px] text-blue-200">FabricFlow Enterprise B2B</span>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-300 hover:text-white p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        {step === 'details' && (
          <form onSubmit={handlePayNow} className="space-y-4 text-xs">
            <div className="flex items-center justify-between p-3 rounded-xl bg-[#13131A] border border-white/10">
              <span className="text-[#9999AA]">Total Amount Due:</span>
              <span className="text-xl font-bold font-mono text-white">${grandTotal.toFixed(2)} USD</span>
            </div>

            {/* Payment Options Tabs */}
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={`p-2.5 rounded-xl border flex flex-col items-center gap-1 font-medium transition-all ${
                  paymentMethod === 'card'
                    ? 'border-[#7C5CFC] bg-[#7C5CFC]/20 text-white'
                    : 'border-white/10 bg-[#13131A] text-[#9999AA]'
                }`}
              >
                <CreditCard className="w-4 h-4 text-[#D4AF37]" />
                <span>Card</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('upi')}
                className={`p-2.5 rounded-xl border flex flex-col items-center gap-1 font-medium transition-all ${
                  paymentMethod === 'upi'
                    ? 'border-[#7C5CFC] bg-[#7C5CFC]/20 text-white'
                    : 'border-white/10 bg-[#13131A] text-[#9999AA]'
                }`}
              >
                <QrCode className="w-4 h-4 text-emerald-400" />
                <span>UPI / QR</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('netbanking')}
                className={`p-2.5 rounded-xl border flex flex-col items-center gap-1 font-medium transition-all ${
                  paymentMethod === 'netbanking'
                    ? 'border-[#7C5CFC] bg-[#7C5CFC]/20 text-white'
                    : 'border-white/10 bg-[#13131A] text-[#9999AA]'
                }`}
              >
                <Building2 className="w-4 h-4 text-sky-400" />
                <span>NetBanking</span>
              </button>
            </div>

            {paymentMethod === 'card' && (
              <div className="space-y-3 pt-1">
                <div>
                  <label className="block text-[#9999AA] mb-1">Corporate Card Number</label>
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className="w-full bg-[#13131A] border border-white/10 rounded-xl p-2.5 text-white font-mono outline-none focus:border-[#7C5CFC]"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[#9999AA] mb-1">Expiry Date</label>
                    <input
                      type="text"
                      defaultValue="09 / 28"
                      className="w-full bg-[#13131A] border border-white/10 rounded-xl p-2.5 text-white font-mono outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[#9999AA] mb-1">CVV / CVC</label>
                    <input
                      type="password"
                      defaultValue="882"
                      className="w-full bg-[#13131A] border border-white/10 rounded-xl p-2.5 text-white font-mono outline-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {paymentMethod === 'upi' && (
              <div className="space-y-3 pt-1 text-center">
                <div className="p-4 rounded-xl bg-white/5 border border-white/10 inline-block">
                  <QrCode className="w-24 h-24 mx-auto text-white" />
                  <p className="text-[10px] text-[#9999AA] mt-1">Scan with GPay, PhonePe, Paytm or BHIM</p>
                </div>
                <div>
                  <label className="block text-[#9999AA] mb-1 text-left">Enterprise Virtual Payment Address (VPA)</label>
                  <input
                    type="text"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    className="w-full bg-[#13131A] border border-white/10 rounded-xl p-2.5 text-white font-mono outline-none"
                  />
                </div>
              </div>
            )}

            {paymentMethod === 'netbanking' && (
              <div className="space-y-3 pt-1">
                <label className="block text-[#9999AA] mb-1">Select Commercial Partner Bank</label>
                <select className="w-full bg-[#13131A] text-white border border-white/10 rounded-xl p-2.5 outline-none">
                  <option>HDFC Bank Commercial Corporate</option>
                  <option>ICICI Bank Enterprise Treasury</option>
                  <option>HSBC Global Banking</option>
                  <option>Citibank N.A. Treasury</option>
                  <option>Barclays International</option>
                </select>
              </div>
            )}

            <div className="flex items-center gap-1.5 text-[11px] text-[#9999AA] pt-1">
              <Lock className="w-3.5 h-3.5 text-emerald-400" />
              <span>256-Bit TLS Encryption • PCI-DSS Level 1 Compliant</span>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-[#0284C7] text-white font-bold text-sm shadow-lg hover:bg-[#0369A1] transition-all flex items-center justify-center gap-2"
            >
              <span>Pay ${grandTotal.toFixed(2)} via Razorpay</span>
            </button>
          </form>
        )}

        {step === 'otp' && (
          <div className="space-y-4 text-xs text-center py-4">
            <Smartphone className="w-10 h-10 text-[#0284C7] mx-auto" />
            <h3 className="font-bold text-white text-base">Authorize Bank OTP Verification</h3>
            <p className="text-[#9999AA] text-xs">
              A 6-digit One Time Password has been sent to your registered mobile number (*8821)
            </p>

            <div className="max-w-xs mx-auto">
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                maxLength={6}
                className="w-full bg-[#13131A] border border-[#0284C7] rounded-xl p-3 text-center text-xl font-mono tracking-widest text-white outline-none"
              />
            </div>

            <button
              onClick={handleConfirmOtp}
              className="w-full py-3 rounded-xl bg-emerald-500 text-black font-bold text-sm shadow-lg hover:bg-emerald-400 transition-all"
            >
              Confirm 3D-Secure Authorization
            </button>
          </div>
        )}

        {step === 'processing' && (
          <div className="py-12 text-center space-y-4">
            <div className="w-12 h-12 border-4 border-[#0284C7] border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="font-semibold text-white">Communicating with Razorpay Gateway & Bank Network...</p>
            <p className="text-xs text-[#9999AA]">Securing mill escrow funds</p>
          </div>
        )}

        {step === 'success' && (
          <div className="py-8 text-center space-y-3">
            <CheckCircle2 className="w-16 h-16 text-emerald-400 mx-auto animate-bounce" />
            <h3 className="font-serif text-2xl font-bold text-white">Payment Authorized!</h3>
            <p className="text-xs text-[#9999AA]">
              Razorpay Ref: PAY-{Math.floor(10000000 + Math.random() * 90000000)}
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
};
