export type UserRole = 'buyer' | 'supplier' | 'admin';

export interface BusinessProfile {
  companyName: string;
  taxId?: string;
  country: string;
  city: string;
  address: string;
  phone: string;
  website?: string;
  certifications?: string[];
  supplierStatus?: 'pending' | 'approved' | 'rejected';
  yearEstablished?: number;
  exportMarkets?: string[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  company?: string;
  avatar?: string;
  phone?: string;
  verified: boolean;
  businessProfile?: BusinessProfile;
  createdAt: string;
}

export interface TierPrice {
  minMeters: number;
  pricePerMeter: number;
}

export interface FabricColor {
  name: string;
  hex: string;
  image?: string;
}

export interface Product {
  id: string;
  title: string;
  slug: string;
  category: string;
  fabricType: 'Silk' | 'Linen' | 'Organic Cotton' | 'Cashmere' | 'Denim' | 'Velvet' | 'Wool' | 'Technical' | 'Satin' | 'Jacquard' | 'Rayon';
  description: string;
  gsmWeight: number; // GSM (g/m²)
  weaveType: string; // Plain, Twill, Satin, Jacquard, Knit
  threadCount: string; // e.g., 300TC, 60s/2
  widthInches: number; // Width e.g., 58", 60"
  stretchPercent: number; // e.g., 0%, 5%, 20%
  composition: string; // e.g., 100% Organic Mulberry Silk
  certifications: string[]; // GOTS, OEKO-TEX 100, GRS, FairTrade
  pricePerMeter: number;
  moqMeters: number; // Minimum Order Quantity in meters
  tierPricing: TierPrice[];
  stockMeters: number;
  availableColors: FabricColor[];
  images: string[];
  supplierId: string;
  supplierName: string;
  supplierRating: number;
  supplierVerified: boolean;
  status: 'pending' | 'approved' | 'rejected';
  featured: boolean;
  trending: boolean;
  bestSeller: boolean;
  rating: number;
  reviewCount: number;
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;
  description: string;
  productCount: number;
  featured: boolean;
}

export interface CartItem {
  id: string;
  productId: string;
  productTitle: string;
  productImage: string;
  fabricType: string;
  pricePerMeter: number;
  meters: number;
  color: string;
  supplierName: string;
  moqMeters: number;
  stockMeters: number;
}

export interface ShippingAddress {
  fullName: string;
  companyName: string;
  taxVatId?: string;
  street: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  phone: string;
}

export type OrderStatus = 'pending' | 'accepted' | 'preparing' | 'dispatch' | 'delivered' | 'cancelled';
export type FreightType = 'standard' | 'express_air' | 'maritime_sea';

export interface OrderItem {
  productId: string;
  title: string;
  image: string;
  color: string;
  meters: number;
  pricePerMeter: number;
  total: number;
  supplierName: string;
  supplierId: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  buyerId: string;
  buyerName: string;
  buyerEmail: string;
  items: OrderItem[];
  subtotal: number;
  freightType: FreightType;
  shippingCost: number;
  discount: number;
  tax: number;
  totalAmount: number;
  status: OrderStatus;
  shippingAddress: ShippingAddress;
  razorpayPaymentId?: string;
  razorpayOrderId?: string;
  paymentMethod: 'razorpay' | 'wire_transfer' | 'letter_of_credit';
  trackingNumber?: string;
  estimatedDelivery?: string;
  createdAt: string;
}

export interface Review {
  id: string;
  productId: string;
  buyerId: string;
  buyerName: string;
  buyerCompany: string;
  rating: number;
  comment: string;
  verifiedPurchase: boolean;
  createdAt: string;
}

export interface SampleRequest {
  id: string;
  productId: string;
  productTitle: string;
  productImage: string;
  buyerId: string;
  buyerName: string;
  buyerCompany: string;
  buyerEmail: string;
  color: string;
  shippingAddress: string;
  notes?: string;
  status: 'requested' | 'shipped' | 'delivered';
  createdAt: string;
}

export interface AppNotification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'order' | 'approval' | 'system' | 'sample';
  read: boolean;
  link?: string;
  createdAt: string;
}

export interface Coupon {
  code: string;
  discountPercent: number;
  minOrderAmount: number;
  description: string;
}
