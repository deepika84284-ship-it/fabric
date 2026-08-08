import { Category, Product, User, Order, Review, Coupon } from '../types';

export const INITIAL_CATEGORIES: Category[] = [
  {
    id: 'cat-silk',
    name: 'Mulberry & Raw Silk',
    slug: 'silk',
    image: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&q=80&w=800',
    description: '100% Organic Grade 6A Mulberry silk, habotai, crepe de chine, and raw Dupioni silks.',
    productCount: 18,
    featured: true
  },
  {
    id: 'cat-linen',
    name: 'Belgian & Organic Linen',
    slug: 'linen',
    image: 'https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&q=80&w=800',
    description: 'Breathable, eco-certified European linen weaves ideal for luxury apparel and drapery.',
    productCount: 24,
    featured: true
  },
  {
    id: 'cat-cashmere',
    name: 'Mongolian Cashmere & Wool',
    slug: 'cashmere',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=800',
    description: 'Ultra-soft 100% Mongolian Cashmere, Merino wool, and alpaca luxury overcoat textiles.',
    productCount: 15,
    featured: true
  },
  {
    id: 'cat-cotton',
    name: 'Egyptian & Organic Cotton',
    slug: 'cotton',
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&q=80&w=800',
    description: 'GOTS certified extra-long staple Egyptian cotton poplins, twills, and lawn knits.',
    productCount: 32,
    featured: true
  },
  {
    id: 'cat-technical',
    name: 'Performance & Technical',
    slug: 'technical',
    image: 'https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?auto=format&fit=crop&q=80&w=800',
    description: 'Waterproof membranes, recycled polyester outerwear textiles, and flame-retardant weaves.',
    productCount: 21,
    featured: true
  },
  {
    id: 'cat-velvet',
    name: 'Lyonese Velvet & Satin',
    slug: 'velvet',
    image: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&q=80&w=800',
    description: 'Deep luster silk velvet, duchess satin, and brocade jacquards for haute couture.',
    productCount: 12,
    featured: true
  }
];

export const INITIAL_USERS: User[] = [
  {
    id: 'user-buyer-1',
    name: 'Elena Rostova',
    email: 'elena@atelier-rostova.com',
    role: 'buyer',
    company: 'Atelier Rostova Couture (Paris)',
    phone: '+33 1 42 68 55 00',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
    verified: true,
    businessProfile: {
      companyName: 'Atelier Rostova Couture',
      taxId: 'FR-9482710492',
      country: 'France',
      city: 'Paris',
      address: '24 Rue du Faubourg Saint-Honoré',
      phone: '+33 1 42 68 55 00',
      website: 'https://atelier-rostova.fr'
    },
    createdAt: '2025-01-15T10:30:00.000Z'
  },
  {
    id: 'user-supplier-1',
    name: 'Gianluigi Como',
    email: 'contact@tessitura-como.it',
    role: 'supplier',
    company: 'Tessitura Seta Como SpA (Italy)',
    phone: '+39 031 528900',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    verified: true,
    businessProfile: {
      companyName: 'Tessitura Seta Como SpA',
      taxId: 'IT-0894123019',
      country: 'Italy',
      city: 'Como',
      address: 'Via Varese 42, 22100 Como',
      phone: '+39 031 528900',
      website: 'https://tessituracomo.it',
      certifications: ['OEKO-TEX 100', 'GOTS Organic', 'ISO 9001'],
      supplierStatus: 'approved',
      yearEstablished: 1968,
      exportMarkets: ['France', 'USA', 'Japan', 'UK', 'Germany']
    },
    createdAt: '2024-11-01T08:00:00.000Z'
  },
  {
    id: 'user-admin-1',
    name: 'Marcus Vance',
    email: 'admin@fabricflow.com',
    role: 'admin',
    company: 'FabricFlow Enterprise HQ',
    phone: '+1 212 555 0199',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
    verified: true,
    createdAt: '2024-01-01T00:00:00.000Z'
  }
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    title: 'Grade 6A Mulberry Silk Charmeuse 19mm',
    slug: 'mulberry-silk-charmeuse-19mm',
    category: 'Silk',
    fabricType: 'Silk',
    description: 'Pure 100% Organic Grade 6A Mulberry Silk Charmeuse featuring a satin front weave and matte back. Exceptionally fluid drape, natural thermal regulating properties, and hypoallergenic finish favored by haute couture houses.',
    gsmWeight: 82,
    weaveType: 'Satin Charmeuse',
    threadCount: '450TC / 19 Momme',
    widthInches: 54,
    stretchPercent: 2,
    composition: '100% Organic Mulberry Silk',
    certifications: ['OEKO-TEX 100', 'GOTS Organic', 'FairTrade'],
    pricePerMeter: 34.50,
    moqMeters: 50,
    tierPricing: [
      { minMeters: 50, pricePerMeter: 34.50 },
      { minMeters: 200, pricePerMeter: 29.80 },
      { minMeters: 500, pricePerMeter: 24.90 }
    ],
    stockMeters: 4800,
    availableColors: [
      { name: 'Champagne Gold', hex: '#D4AF37' },
      { name: 'Midnight Onyx', hex: '#12121A' },
      { name: 'Emerald Royale', hex: '#0B4F37' },
      { name: 'Blush Pearl', hex: '#F4E3DD' }
    ],
    images: [
      'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&q=80&w=1000'
    ],
    supplierId: 'user-supplier-1',
    supplierName: 'Tessitura Seta Como SpA',
    supplierRating: 4.9,
    supplierVerified: true,
    status: 'approved',
    featured: true,
    trending: true,
    bestSeller: true,
    rating: 4.9,
    reviewCount: 38,
    createdAt: '2025-01-10T12:00:00.000Z'
  },
  {
    id: 'prod-2',
    title: 'Heritage Belgian Washed Linen Heavyweight',
    slug: 'heritage-belgian-washed-linen-heavyweight',
    category: 'Linen',
    fabricType: 'Linen',
    description: 'Enzyme-washed pure flax linen grown in Flanders, Belgium. Medium-heavy weight with signature slub texture and relaxed hand feel. Ideal for tailored suiting, linen trench coats, and luxury home drapes.',
    gsmWeight: 240,
    weaveType: 'Plain Weave Slub',
    threadCount: '60s Single Flax',
    widthInches: 58,
    stretchPercent: 0,
    composition: '100% Master of Linen Flax',
    certifications: ['European Flax', 'OEKO-TEX Standard 100'],
    pricePerMeter: 22.80,
    moqMeters: 30,
    tierPricing: [
      { minMeters: 30, pricePerMeter: 22.80 },
      { minMeters: 150, pricePerMeter: 19.50 },
      { minMeters: 400, pricePerMeter: 16.20 }
    ],
    stockMeters: 6200,
    availableColors: [
      { name: 'Natural Oatmeal', hex: '#D2B48C' },
      { name: 'Slate Gray', hex: '#4A5568' },
      { name: 'Olive Drab', hex: '#556B2F' },
      { name: 'Terracotta', hex: '#E07A5F' }
    ],
    images: [
      'https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&q=80&w=1000'
    ],
    supplierId: 'user-supplier-1',
    supplierName: 'Tessitura Seta Como SpA',
    supplierRating: 4.9,
    supplierVerified: true,
    status: 'approved',
    featured: true,
    trending: false,
    bestSeller: true,
    rating: 4.8,
    reviewCount: 29,
    createdAt: '2025-01-12T15:00:00.000Z'
  },
  {
    id: 'prod-3',
    title: 'Pure Inner Mongolian Cashmere 420GSM Overcoat Wool',
    slug: 'pure-mongolian-cashmere-420gsm',
    category: 'Cashmere',
    fabricType: 'Cashmere',
    description: 'Pure double-faced 100% Grade A Mongolian Cashmere fabric. Unrivaled warmth-to-weight ratio, silky hand feel with ripple wave zibeline finish. Specifically engineered for bespoke winter trench coats and overcoats.',
    gsmWeight: 420,
    weaveType: 'Double Cloth Zibeline Twill',
    threadCount: '2/48Nm Fine Cashmere',
    widthInches: 60,
    stretchPercent: 3,
    composition: '100% Grade A Inner Mongolian Cashmere',
    certifications: ['Sustainable Cashmere Standard', 'OEKO-TEX 100'],
    pricePerMeter: 89.00,
    moqMeters: 20,
    tierPricing: [
      { minMeters: 20, pricePerMeter: 89.00 },
      { minMeters: 100, pricePerMeter: 78.50 },
      { minMeters: 300, pricePerMeter: 69.00 }
    ],
    stockMeters: 1500,
    availableColors: [
      { name: 'Camel Beige', hex: '#C19A6B' },
      { name: 'Imperial Charcoal', hex: '#2D3748' },
      { name: 'Deep Royal Navy', hex: '#1A202C' }
    ],
    images: [
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&q=80&w=1000'
    ],
    supplierId: 'user-supplier-1',
    supplierName: 'Tessitura Seta Como SpA',
    supplierRating: 4.9,
    supplierVerified: true,
    status: 'approved',
    featured: true,
    trending: true,
    bestSeller: false,
    rating: 5.0,
    reviewCount: 19,
    createdAt: '2025-01-20T09:15:00.000Z'
  },
  {
    id: 'prod-4',
    title: 'GOTS Extra-Long Staple Egyptian Cotton Poplin 120s/2',
    slug: 'egyptian-cotton-poplin-120s-2',
    category: 'Cotton',
    fabricType: 'Organic Cotton',
    description: 'Crisp, silky 2-ply 120s extra-long staple Giza 45 Egyptian Cotton Poplin. Mercerized for brilliant luster and exceptional tensile strength. Ideal for luxury dress shirts and crisp apparel collections.',
    gsmWeight: 115,
    weaveType: 'Plain Poplin Weave',
    threadCount: '120s/2 Double Ply',
    widthInches: 58,
    stretchPercent: 0,
    composition: '100% Giza 45 Organic Egyptian Cotton',
    certifications: ['GOTS Organic', 'OEKO-TEX 100', 'FairTrade Cotton'],
    pricePerMeter: 16.50,
    moqMeters: 100,
    tierPricing: [
      { minMeters: 100, pricePerMeter: 16.50 },
      { minMeters: 500, pricePerMeter: 14.20 },
      { minMeters: 1000, pricePerMeter: 11.80 }
    ],
    stockMeters: 12000,
    availableColors: [
      { name: 'Optic White', hex: '#FFFFFF' },
      { name: 'French Blue', hex: '#4A90E2' },
      { name: 'Sky Blue Stripes', hex: '#87CEEB' },
      { name: 'Jet Black', hex: '#000000' }
    ],
    images: [
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&q=80&w=1000'
    ],
    supplierId: 'user-supplier-1',
    supplierName: 'Tessitura Seta Como SpA',
    supplierRating: 4.9,
    supplierVerified: true,
    status: 'approved',
    featured: false,
    trending: true,
    bestSeller: true,
    rating: 4.7,
    reviewCount: 44,
    createdAt: '2025-01-05T11:00:00.000Z'
  },
  {
    id: 'prod-5',
    title: 'Recycled Ocean-Poly Technical 3-Layer Waterproof Fabric',
    slug: 'recycled-ocean-poly-technical-3-layer',
    category: 'Technical',
    fabricType: 'Technical',
    description: 'High-performance 3-layer laminated hydrophobic shell fabric made with 100% SEAQUAL recycled ocean plastics. 20,000mm hydrostatic head waterproof rating with 15,000 g/m²/24h breathability.',
    gsmWeight: 185,
    weaveType: '3-Layer Membrane Lamination',
    threadCount: '75D Ripstop Microfiber',
    widthInches: 56,
    stretchPercent: 12,
    composition: '88% Recycled Ocean Poly, 12% TPU Hydrophobic Membrane',
    certifications: ['Global Recycled Standard (GRS)', 'Bluesign Approved', 'OEKO-TEX 100'],
    pricePerMeter: 28.00,
    moqMeters: 50,
    tierPricing: [
      { minMeters: 50, pricePerMeter: 28.00 },
      { minMeters: 250, pricePerMeter: 24.50 },
      { minMeters: 1000, pricePerMeter: 19.90 }
    ],
    stockMeters: 8500,
    availableColors: [
      { name: 'Stealth Black', hex: '#111116' },
      { name: 'Cyber Violet', hex: '#7C5CFC' },
      { name: 'Alpine Sage', hex: '#87986A' }
    ],
    images: [
      'https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=1000'
    ],
    supplierId: 'user-supplier-1',
    supplierName: 'Tessitura Seta Como SpA',
    supplierRating: 4.9,
    supplierVerified: true,
    status: 'approved',
    featured: true,
    trending: true,
    bestSeller: false,
    rating: 4.9,
    reviewCount: 22,
    createdAt: '2025-01-25T14:30:00.000Z'
  },
  {
    id: 'prod-6',
    title: 'Lyonese Silk Blend Velvet 360GSM Deep Luster',
    slug: 'lyonese-silk-blend-velvet-360gsm',
    category: 'Velvet',
    fabricType: 'Velvet',
    description: 'Rich French Lyonese velvet woven with 82% Rayon pile and 18% Mulberry Silk backing. Deep, light-absorbing pile with fluid liquid drape designed for luxury evening gowns, smoking jackets, and upholstery.',
    gsmWeight: 360,
    weaveType: 'Cut Pile Velvet',
    threadCount: 'High Density Pile',
    widthInches: 54,
    stretchPercent: 4,
    composition: '82% Viscose Rayon, 18% Mulberry Silk',
    certifications: ['OEKO-TEX Standard 100', 'REACH Compliant'],
    pricePerMeter: 42.00,
    moqMeters: 25,
    tierPricing: [
      { minMeters: 25, pricePerMeter: 42.00 },
      { minMeters: 100, pricePerMeter: 37.00 },
      { minMeters: 300, pricePerMeter: 31.50 }
    ],
    stockMeters: 3400,
    availableColors: [
      { name: 'Burgundy Crimson', hex: '#800020' },
      { name: 'Royal Sapphire', hex: '#0F52BA' },
      { name: 'Obsidian Black', hex: '#0A0A0F' }
    ],
    images: [
      'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&q=80&w=1000'
    ],
    supplierId: 'user-supplier-1',
    supplierName: 'Tessitura Seta Como SpA',
    supplierRating: 4.9,
    supplierVerified: true,
    status: 'approved',
    featured: false,
    trending: false,
    bestSeller: true,
    rating: 4.9,
    reviewCount: 31,
    createdAt: '2025-01-18T16:20:00.000Z'
  }
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    productId: 'prod-1',
    buyerId: 'user-buyer-1',
    buyerName: 'Elena Rostova',
    buyerCompany: 'Atelier Rostova Couture',
    rating: 5,
    comment: 'The Grade 6A Mulberry Silk from Tessitura Como is flawless. Hand drape and luster match our exact specifications for Paris Fashion Week runway gown collection.',
    verifiedPurchase: true,
    createdAt: '2025-01-28T14:10:00.000Z'
  },
  {
    id: 'rev-2',
    productId: 'prod-2',
    buyerId: 'user-buyer-1',
    buyerName: 'Jean-Luc Moreau',
    buyerCompany: 'Maison Moreau Tailors',
    rating: 5,
    comment: 'Exceptional linen quality. The enzyme washing leaves no harsh residual stiff fibers, perfect for tailored summer blazers.',
    verifiedPurchase: true,
    createdAt: '2025-02-01T09:40:00.000Z'
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ord-88912',
    orderNumber: 'FF-2026-88912',
    buyerId: 'user-buyer-1',
    buyerName: 'Elena Rostova',
    buyerEmail: 'elena@atelier-rostova.com',
    items: [
      {
        productId: 'prod-1',
        title: 'Grade 6A Mulberry Silk Charmeuse 19mm',
        image: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&q=80&w=800',
        color: 'Champagne Gold',
        meters: 100,
        pricePerMeter: 34.50,
        total: 3450.00,
        supplierName: 'Tessitura Seta Como SpA',
        supplierId: 'user-supplier-1'
      }
    ],
    subtotal: 3450.00,
    freightType: 'express_air',
    shippingCost: 180.00,
    discount: 345.00,
    tax: 328.50,
    totalAmount: 3613.50,
    status: 'dispatch',
    shippingAddress: {
      fullName: 'Elena Rostova',
      companyName: 'Atelier Rostova Couture',
      taxVatId: 'FR-9482710492',
      street: '24 Rue du Faubourg Saint-Honoré',
      city: 'Paris',
      state: 'Île-de-France',
      country: 'France',
      postalCode: '75008',
      phone: '+33 1 42 68 55 00'
    },
    razorpayPaymentId: 'pay_P98274198231',
    razorpayOrderId: 'order_FF98213894',
    paymentMethod: 'razorpay',
    trackingNumber: 'DHL-EXPRESS-99281749',
    estimatedDelivery: '2026-08-10',
    createdAt: '2026-08-01T10:00:00.000Z'
  }
];

export const INITIAL_COUPONS: Coupon[] = [
  { code: 'FABRIC10', discountPercent: 10, minOrderAmount: 500, description: '10% off enterprise orders above $500' },
  { code: 'BULK20', discountPercent: 20, minOrderAmount: 2500, description: '20% bulk mill discount for orders over $2,500' },
  { code: 'SPRING2026', discountPercent: 15, minOrderAmount: 1000, description: '15% season preview discount' }
];
