import React from 'react';
import { motion } from 'motion/react';
import { X, Printer, Download, Layers, ShieldCheck, FileText } from 'lucide-react';
import { Order } from '../types';

interface InvoiceModalProps {
  order: Order;
  onClose: () => void;
}

export const InvoiceModal: React.FC<InvoiceModalProps> = ({ order, onClose }) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-3xl rounded-2xl bg-[#0A0A0F] border border-white/20 shadow-2xl p-6 sm:p-8 text-[#F0F0F5] my-8"
      >
        {/* Floating Action Header */}
        <div className="flex items-center justify-between pb-6 border-b border-white/10 print:hidden">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-[#D4AF37]" />
            <span className="font-serif font-bold text-white">Commercial Invoice B2B</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-medium flex items-center gap-1.5 transition-colors"
            >
              <Printer className="w-4 h-4" /> Print / Save PDF
            </button>
            <button onClick={onClose} className="p-1.5 text-[#9999AA] hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Commercial Invoice Body */}
        <div className="space-y-6 pt-4 text-xs font-sans">
          {/* Header */}
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div>
              <div className="flex items-center gap-2">
                <Layers className="w-6 h-6 text-[#D4AF37]" />
                <span className="font-serif text-2xl font-bold text-white tracking-tight">FabricFlow</span>
              </div>
              <p className="text-[#9999AA] mt-1 text-[11px]">Enterprise B2B Textile Clearinghouse Inc.</p>
              <p className="text-[#9999AA] text-[11px]">Tax / VAT Registration: EU-948172603</p>
            </div>

            <div className="text-right">
              <h2 className="font-serif text-xl font-bold text-[#D4AF37]">INVOICE</h2>
              <p className="font-mono text-sm text-white font-bold">{order.orderNumber}</p>
              <p className="text-[#9999AA] text-[11px]">Date: {new Date(order.createdAt).toLocaleDateString()}</p>
              <p className="text-[#9999AA] text-[11px]">Payment: Razorpay Confirmed</p>
            </div>
          </div>

          <div className="border-t border-white/10 my-4" />

          {/* Addresses */}
          <div className="grid grid-cols-2 gap-6 p-4 rounded-xl bg-[#13131A] border border-white/5">
            <div>
              <p className="text-[10px] text-[#D4AF37] uppercase font-mono tracking-wider font-bold mb-1">BILLED / SHIPPED TO:</p>
              <p className="font-bold text-white text-sm">{order.shippingAddress.fullName}</p>
              <p className="text-[#9999AA]">{order.shippingAddress.companyName}</p>
              <p className="text-[#9999AA]">{order.shippingAddress.street}</p>
              <p className="text-[#9999AA]">{order.shippingAddress.city}, {order.shippingAddress.country} - {order.shippingAddress.postalCode}</p>
              {order.shippingAddress.taxVatId && <p className="text-emerald-400 font-mono mt-1">VAT/GST: {order.shippingAddress.taxVatId}</p>}
            </div>

            <div>
              <p className="text-[10px] text-[#7C5CFC] uppercase font-mono tracking-wider font-bold mb-1">ISSUING MILL SUPPLIER:</p>
              <p className="font-bold text-white text-sm">{order.items[0]?.supplierName || 'Tessitura Seta Como SpA'}</p>
              <p className="text-[#9999AA]">Via Varese 42, 22100 Como, Italy</p>
              <p className="text-[#9999AA]">Mill IT-0894123019 • GOTS & OEKO-TEX 100 Verified</p>
              <p className="text-[#9999AA] mt-1">Freight Carrier: DHL Express Air Freight</p>
            </div>
          </div>

          {/* Itemized Table */}
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 text-[#9999AA] font-mono text-[11px] uppercase">
                <th className="py-2.5 px-2">Fabric Item</th>
                <th className="py-2.5 px-2 text-center">Color</th>
                <th className="py-2.5 px-2 text-right">Quantity</th>
                <th className="py-2.5 px-2 text-right">Rate / Meter</th>
                <th className="py-2.5 px-2 text-right">Line Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {order.items.map((item, i) => (
                <tr key={i}>
                  <td className="py-3 px-2">
                    <p className="font-bold text-white">{item.title}</p>
                    <p className="text-[10px] text-[#9999AA]">Supplier: {item.supplierName}</p>
                  </td>
                  <td className="py-3 px-2 text-center text-[#9999AA]">{item.color}</td>
                  <td className="py-3 px-2 text-right font-mono text-white">{item.meters} meters</td>
                  <td className="py-3 px-2 text-right font-mono text-white">${item.pricePerMeter.toFixed(2)}</td>
                  <td className="py-3 px-2 text-right font-mono font-bold text-[#D4AF37]">${item.total.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Financial Summary */}
          <div className="flex justify-end pt-4">
            <div className="w-64 space-y-2 text-right font-mono text-xs">
              <div className="flex justify-between text-[#9999AA]">
                <span>Subtotal:</span>
                <span className="text-white">${order.subtotal.toFixed(2)}</span>
              </div>
              {order.discount > 0 && (
                <div className="flex justify-between text-emerald-400">
                  <span>Bulk Discount:</span>
                  <span>-${order.discount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-[#9999AA]">
                <span>Freight ({order.freightType}):</span>
                <span className="text-white">${order.shippingCost.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-[#9999AA]">
                <span>EST Tax / Customs:</span>
                <span className="text-white">${order.tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-white/20 text-sm font-bold text-white">
                <span>Total Amount Paid:</span>
                <span className="text-[#D4AF37]">${order.totalAmount.toFixed(2)} USD</span>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 pt-4 text-center text-[11px] text-[#9999AA] space-y-1">
            <p>Thank you for trading on FabricFlow Enterprise B2B Marketplace.</p>
            <p className="font-mono text-[10px]">Tracking Number: {order.trackingNumber} • Payment Ref: {order.razorpayPaymentId}</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
