import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, Product, Coupon, FreightType } from '../types';
import { useToast } from './ToastContext';
import { INITIAL_PRODUCTS } from '../data/seedData';
import { api } from '../services/api';

interface CartContextType {
  cart: CartItem[];
  wishlist: Product[];
  compareList: Product[];
  quickViewProduct: Product | null;
  sampleModalProduct: Product | null;
  freightType: FreightType;
  coupon: Coupon | null;
  currency: 'USD' | 'EUR' | 'INR';
  addToCart: (product: Product, meters: number, color?: string) => void;
  updateCartQuantity: (cartItemId: string, meters: number) => void;
  removeFromCart: (cartItemId: string) => void;
  clearCart: () => void;
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;
  toggleCompare: (product: Product) => void;
  isInCompare: (productId: string) => boolean;
  applyCoupon: (code: string) => Promise<boolean>;
  removeCoupon: () => void;
  setFreightType: (type: FreightType) => void;
  setCurrency: (curr: 'USD' | 'EUR' | 'INR') => void;
  openQuickView: (product: Product) => void;
  closeQuickView: () => void;
  openSampleModal: (product: Product) => void;
  closeSampleModal: () => void;
  subtotal: number;
  freightCost: number;
  discountAmount: number;
  taxAmount: number;
  grandTotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('fabricflow_cart');
    return saved ? JSON.parse(saved) : [
      {
        id: 'cart-1',
        productId: 'prod-1',
        productTitle: 'Grade 6A Mulberry Silk Charmeuse 19mm',
        productImage: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&q=80&w=800',
        fabricType: 'Silk',
        pricePerMeter: 34.50,
        meters: 100,
        color: 'Champagne Gold',
        supplierName: 'Tessitura Seta Como SpA',
        moqMeters: 50,
        stockMeters: 4800
      }
    ];
  });

  const [wishlist, setWishlist] = useState<Product[]>(() => {
    const saved = localStorage.getItem('fabricflow_wishlist');
    return saved ? JSON.parse(saved) : [INITIAL_PRODUCTS[1]];
  });

  const [compareList, setCompareList] = useState<Product[]>([]);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [sampleModalProduct, setSampleModalProduct] = useState<Product | null>(null);
  const [freightType, setFreightType] = useState<FreightType>('express_air');
  const [coupon, setCoupon] = useState<Coupon | null>(null);
  const [currency, setCurrency] = useState<'USD' | 'EUR' | 'INR'>('USD');

  const { showToast } = useToast();

  useEffect(() => {
    localStorage.setItem('fabricflow_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('fabricflow_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const addToCart = (product: Product, meters: number, color?: string) => {
    const selectedColor = color || (product.availableColors[0]?.name ?? 'Default');
    const existingIndex = cart.findIndex(item => item.productId === product.id && item.color === selectedColor);

    if (existingIndex > -1) {
      const updated = [...cart];
      updated[existingIndex].meters += meters;
      setCart(updated);
    } else {
      const newItem: CartItem = {
        id: `cart-${Date.now()}`,
        productId: product.id,
        productTitle: product.title,
        productImage: product.images[0],
        fabricType: product.fabricType,
        pricePerMeter: product.pricePerMeter,
        meters: Math.max(meters, product.moqMeters),
        color: selectedColor,
        supplierName: product.supplierName,
        moqMeters: product.moqMeters,
        stockMeters: product.stockMeters
      };
      setCart([...cart, newItem]);
    }
    showToast(`Added ${meters}m of ${product.title} to order cart`, 'success');
  };

  const updateCartQuantity = (cartItemId: string, meters: number) => {
    setCart(prev => prev.map(item => item.id === cartItemId ? { ...item, meters: Math.max(meters, 1) } : item));
  };

  const removeFromCart = (cartItemId: string) => {
    setCart(prev => prev.filter(item => item.id !== cartItemId));
    showToast('Removed fabric roll from order cart', 'info');
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleWishlist = (product: Product) => {
    if (isInWishlist(product.id)) {
      setWishlist(prev => prev.filter(p => p.id !== product.id));
      showToast(`Removed ${product.title} from wishlist`, 'info');
    } else {
      setWishlist(prev => [...prev, product]);
      showToast(`Saved ${product.title} to B2B wishlist`, 'success');
    }
  };

  const isInWishlist = (productId: string) => wishlist.some(p => p.id === productId);

  const toggleCompare = (product: Product) => {
    if (isInCompare(product.id)) {
      setCompareList(prev => prev.filter(p => p.id !== product.id));
      showToast(`Removed from fabric comparison`, 'info');
    } else {
      if (compareList.length >= 4) {
        showToast(`Comparison list limited to 4 fabrics`, 'error');
        return;
      }
      setCompareList(prev => [...prev, product]);
      showToast(`Added ${product.title} to technical comparison table`, 'success');
    }
  };

  const isInCompare = (productId: string) => compareList.some(p => p.id === productId);

  const applyCoupon = async (code: string): Promise<boolean> => {
    try {
      const data = await api.verifyCoupon(code, subtotal);
      setCoupon(data.coupon);
      showToast(`Coupon applied! ${data.coupon.discountPercent}% discount active`, 'success');
      return true;
    } catch (err: any) {
      showToast(err.message || 'Invalid coupon code', 'error');
      return false;
    }
  };

  const removeCoupon = () => {
    setCoupon(null);
    showToast('Promo coupon removed', 'info');
  };

  const openQuickView = (product: Product) => setQuickViewProduct(product);
  const closeQuickView = () => setQuickViewProduct(null);

  const openSampleModal = (product: Product) => setSampleModalProduct(product);
  const closeSampleModal = () => setSampleModalProduct(null);

  // Financial calculations
  const subtotal = cart.reduce((sum, item) => sum + (item.pricePerMeter * item.meters), 0);

  const freightCost = cart.length === 0 ? 0 : freightType === 'express_air' ? 180 : freightType === 'maritime_sea' ? 60 : 100;

  const discountAmount = coupon ? (subtotal * coupon.discountPercent) / 100 : 0;
  const taxableSubtotal = Math.max(subtotal - discountAmount, 0);
  const taxAmount = taxableSubtotal * 0.08; // 8% VAT/Sales Tax
  const grandTotal = taxableSubtotal + freightCost + taxAmount;

  return (
    <CartContext.Provider
      value={{
        cart,
        wishlist,
        compareList,
        quickViewProduct,
        sampleModalProduct,
        freightType,
        coupon,
        currency,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        toggleWishlist,
        isInWishlist,
        toggleCompare,
        isInCompare,
        applyCoupon,
        removeCoupon,
        setFreightType,
        setCurrency,
        openQuickView,
        closeQuickView,
        openSampleModal,
        closeSampleModal,
        subtotal,
        freightCost,
        discountAmount,
        taxAmount,
        grandTotal
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
};
