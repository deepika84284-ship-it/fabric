import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import { createServer as createViteServer } from 'vite';

import {
  INITIAL_PRODUCTS,
  INITIAL_USERS,
  INITIAL_CATEGORIES,
  INITIAL_ORDERS,
  INITIAL_REVIEWS,
  INITIAL_COUPONS
} from './src/data/seedData';
import { Product, User, Order, Category, Review, SampleRequest, AppNotification } from './src/types';

dotenv.config();

const app = express();
const PORT = 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'fabricflow_super_secret_jwt_key_2026_enterprise_b2b';
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://deepika3000:30007@ac-dh5qxdk-shard-00-00.qjtkz6v.mongodb.net:27017,ac-dh5qxdk-shard-00-01.qjtkz6v.mongodb.net:27017,ac-dh5qxdk-shard-00-02.qjtkz6v.mongodb.net:27017/fabricflow?ssl=true&replicaSet=atlas-136z7r-shard-0&authSource=admin&appName=Cluster0';

app.use(cors());
app.use(express.json({ limit: '10mb' }));

// --- MONGOOSE SCHEMAS & MODELS ---
const UserSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, required: true },
  company: String,
  phone: String,
  verified: Boolean,
  avatar: String,
  businessProfile: Object,
  createdAt: { type: String, default: () => new Date().toISOString() }
});

const ProductSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  slug: String,
  category: String,
  fabricType: String,
  description: String,
  gsmWeight: Number,
  weaveType: String,
  threadCount: String,
  widthInches: Number,
  stretchPercent: Number,
  composition: String,
  certifications: [String],
  pricePerMeter: Number,
  moqMeters: Number,
  tierPricing: Array,
  stockMeters: Number,
  availableColors: Array,
  images: [String],
  supplierId: String,
  supplierName: String,
  supplierRating: Number,
  supplierVerified: Boolean,
  status: String,
  featured: Boolean,
  trending: Boolean,
  bestSeller: Boolean,
  rating: Number,
  reviewCount: Number,
  createdAt: { type: String, default: () => new Date().toISOString() }
});

const OrderSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  orderNumber: String,
  buyerId: String,
  buyerName: String,
  buyerEmail: String,
  items: Array,
  subtotal: Number,
  freightType: String,
  shippingCost: Number,
  discount: Number,
  tax: Number,
  totalAmount: Number,
  status: String,
  shippingAddress: Object,
  paymentMethod: String,
  razorpayPaymentId: String,
  razorpayOrderId: String,
  trackingNumber: String,
  estimatedDelivery: String,
  createdAt: { type: String, default: () => new Date().toISOString() }
});

const SampleRequestSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  productId: String,
  productTitle: String,
  productImage: String,
  buyerId: String,
  buyerName: String,
  buyerCompany: String,
  buyerEmail: String,
  color: String,
  shippingAddress: String,
  notes: String,
  status: String,
  createdAt: { type: String, default: () => new Date().toISOString() }
});

const CategorySchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  slug: String,
  description: String,
  image: String,
  itemCount: Number
});

const UserModel = mongoose.model('User', UserSchema);
const ProductModel = mongoose.model('Product', ProductSchema);
const OrderModel = mongoose.model('Order', OrderSchema);
const SampleRequestModel = mongoose.model('SampleRequest', SampleRequestSchema);
const CategoryModel = mongoose.model('Category', CategorySchema);

// In-Memory Fallback & Synchronized Store
let memoryUsers: User[] = [...INITIAL_USERS];
let memoryProducts: Product[] = [...INITIAL_PRODUCTS];
let memoryCategories: Category[] = [...INITIAL_CATEGORIES];
let memoryOrders: Order[] = [...INITIAL_ORDERS];
let memorySamples: SampleRequest[] = [];
let memoryNotifications: AppNotification[] = [];

let isMongoConnected = false;

// Seed Database Helper
async function seedDatabaseIfEmpty() {
  try {
    const userCount = await UserModel.countDocuments();
    if (userCount === 0) {
      console.log('Seeding initial Users into MongoDB Atlas...');
      await UserModel.insertMany(INITIAL_USERS);
    }

    const prodCount = await ProductModel.countDocuments();
    if (prodCount === 0) {
      console.log('Seeding initial Products into MongoDB Atlas...');
      await ProductModel.insertMany(INITIAL_PRODUCTS);
    }

    const catCount = await CategoryModel.countDocuments();
    if (catCount === 0) {
      console.log('Seeding initial Categories into MongoDB Atlas...');
      await CategoryModel.insertMany(INITIAL_CATEGORIES);
    }

    const orderCount = await OrderModel.countDocuments();
    if (orderCount === 0) {
      console.log('Seeding initial Orders into MongoDB Atlas...');
      await OrderModel.insertMany(INITIAL_ORDERS);
    }
  } catch (err: any) {
    console.log('Database seeding note:', err.message);
  }
}

// Connect to MongoDB asynchronously with a timeout
mongoose.connect(MONGODB_URI, { serverSelectionTimeoutMS: 5000 })
  .then(() => {
    isMongoConnected = true;
    console.log('Successfully connected to MongoDB Atlas database!');
    seedDatabaseIfEmpty();
  })
  .catch((err) => {
    console.log('MongoDB Atlas notice (operating with in-memory sync engine):', err.message);
  });

// --- MIDDLEWARE ---
const authenticateToken = (req: Request & { user?: any }, res: Response, next: any) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  jwt.verify(token, JWT_SECRET, (err: any, user: any) => {
    if (err) return res.status(403).json({ error: 'Invalid or expired token' });
    req.user = user;
    next();
  });
};

// --- API ENDPOINTS ---

// 1. Health check
app.get('/api/health', (req: Request, res: Response) => {
  res.json({
    status: 'ok',
    appName: 'FabricFlow',
    dbStatus: isMongoConnected ? 'connected_mongodb' : 'active_memory_engine',
    timestamp: new Date().toISOString()
  });
});

// 2. AUTH: Login
app.post('/api/auth/login', async (req: Request, res: Response) => {
  try {
    const { email, password, role } = req.body;
    let user: User | null = null;

    if (isMongoConnected) {
      user = await UserModel.findOne({ email: new RegExp(`^${email}$`, 'i') }).lean() as any;
    }

    if (!user) {
      user = memoryUsers.find(u => u.email.toLowerCase() === (email || '').toLowerCase()) || null;
    }

    if (!user) {
      const newUser: User = {
        id: `user-${Date.now()}`,
        name: email ? email.split('@')[0].replace('.', ' ').toUpperCase() : 'ENTERPRISE USER',
        email: email || 'user@fabricflow.com',
        role: role || 'buyer',
        company: role === 'supplier' ? 'Grand Fabric Mill Ltd' : 'Haute Couture Studio',
        phone: '+1 212 555 0190',
        verified: true,
        businessProfile: {
          companyName: role === 'supplier' ? 'Grand Fabric Mill Ltd' : 'Haute Couture Studio',
          country: 'France',
          city: 'Paris',
          address: '10 Rue de la Paix',
          phone: '+1 212 555 0190',
          supplierStatus: 'approved'
        },
        createdAt: new Date().toISOString()
      };

      memoryUsers.push(newUser);
      if (isMongoConnected) {
        try { await UserModel.create(newUser); } catch (_) {}
      }
      user = newUser;
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role, name: user.name },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    const refreshToken = jwt.sign(
      { id: user.id },
      JWT_SECRET + '_refresh',
      { expiresIn: '30d' }
    );

    res.json({
      message: 'Login successful',
      token,
      refreshToken,
      user
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// 3. AUTH: Register
app.post('/api/auth/register', async (req: Request, res: Response) => {
  try {
    const { name, email, password, role, company, phone, country } = req.body;

    let existing: any = null;
    if (isMongoConnected) {
      existing = await UserModel.findOne({ email: new RegExp(`^${email}$`, 'i') });
    }
    if (!existing) {
      existing = memoryUsers.find(u => u.email.toLowerCase() === (email || '').toLowerCase());
    }

    if (existing) {
      return res.status(400).json({ error: 'Account with this email already exists' });
    }

    const newUser: User = {
      id: `user-${Date.now()}`,
      name,
      email,
      role: role || 'buyer',
      company: company || 'Enterprise Buyer Co.',
      phone: phone || '+1 555 019 2831',
      verified: true,
      businessProfile: {
        companyName: company || 'Enterprise Buyer Co.',
        country: country || 'United States',
        city: 'New York',
        address: '5th Avenue Suite 400',
        phone: phone || '+1 555 019 2831',
        supplierStatus: role === 'supplier' ? 'pending' : 'approved'
      },
      createdAt: new Date().toISOString()
    };

    memoryUsers.push(newUser);
    if (isMongoConnected) {
      try { await UserModel.create(newUser); } catch (_) {}
    }

    const token = jwt.sign(
      { id: newUser.id, email: newUser.email, role: newUser.role, name: newUser.name },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      message: 'Account created successfully',
      token,
      user: newUser
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// 4. AUTH: Me
app.get('/api/auth/me', authenticateToken, async (req: Request & { user?: any }, res: Response) => {
  try {
    let user: any = null;
    if (isMongoConnected) {
      user = await UserModel.findOne({ id: req.user?.id }).lean();
    }
    if (!user) {
      user = memoryUsers.find(u => u.id === req.user?.id);
    }
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json({ user });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// 5. PRODUCTS: GET (Search, Filter, Sort, Paginate)
app.get('/api/products', async (req: Request, res: Response) => {
  try {
    const {
      search,
      category,
      fabricType,
      minPrice,
      maxPrice,
      minGsm,
      maxGsm,
      color,
      status,
      featured,
      trending,
      bestSeller,
      sortBy,
      page = 1,
      limit = 12
    } = req.query;

    let results: Product[] = [];

    if (isMongoConnected) {
      const filter: any = {};
      filter.status = status ? status : 'approved';

      if (search) {
        const regex = new RegExp(search as string, 'i');
        filter.$or = [
          { title: regex },
          { description: regex },
          { composition: regex },
          { supplierName: regex },
          { fabricType: regex }
        ];
      }

      if (category) filter.category = new RegExp(`^${category}$`, 'i');
      if (fabricType) filter.fabricType = new RegExp(`^${fabricType}$`, 'i');
      if (minPrice || maxPrice) {
        filter.pricePerMeter = {};
        if (minPrice) filter.pricePerMeter.$gte = Number(minPrice);
        if (maxPrice) filter.pricePerMeter.$lte = Number(maxPrice);
      }
      if (minGsm || maxGsm) {
        filter.gsmWeight = {};
        if (minGsm) filter.gsmWeight.$gte = Number(minGsm);
        if (maxGsm) filter.gsmWeight.$lte = Number(maxGsm);
      }
      if (featured === 'true') filter.featured = true;
      if (trending === 'true') filter.trending = true;
      if (bestSeller === 'true') filter.bestSeller = true;

      let sortOptions: any = { createdAt: -1 };
      if (sortBy === 'price_low') sortOptions = { pricePerMeter: 1 };
      else if (sortBy === 'price_high') sortOptions = { pricePerMeter: -1 };
      else if (sortBy === 'rating') sortOptions = { rating: -1 };
      else if (sortBy === 'gsm') sortOptions = { gsmWeight: -1 };

      results = await ProductModel.find(filter).sort(sortOptions).lean() as any;
    }

    if (!results || results.length === 0) {
      results = [...memoryProducts];

      if (status) {
        results = results.filter(p => p.status === status);
      } else {
        results = results.filter(p => p.status === 'approved');
      }

      if (search) {
        const term = (search as string).toLowerCase();
        results = results.filter(p =>
          p.title.toLowerCase().includes(term) ||
          p.description.toLowerCase().includes(term) ||
          p.composition.toLowerCase().includes(term) ||
          p.supplierName.toLowerCase().includes(term) ||
          p.fabricType.toLowerCase().includes(term)
        );
      }

      if (category) {
        results = results.filter(p => p.category.toLowerCase() === (category as string).toLowerCase());
      }

      if (fabricType) {
        results = results.filter(p => p.fabricType.toLowerCase() === (fabricType as string).toLowerCase());
      }

      if (minPrice) results = results.filter(p => p.pricePerMeter >= Number(minPrice));
      if (maxPrice) results = results.filter(p => p.pricePerMeter <= Number(maxPrice));
      if (minGsm) results = results.filter(p => p.gsmWeight >= Number(minGsm));
      if (maxGsm) results = results.filter(p => p.gsmWeight <= Number(maxGsm));

      if (color) {
        results = results.filter(p => p.availableColors.some(c => c.name.toLowerCase().includes((color as string).toLowerCase())));
      }

      if (featured === 'true') results = results.filter(p => p.featured);
      if (trending === 'true') results = results.filter(p => p.trending);
      if (bestSeller === 'true') results = results.filter(p => p.bestSeller);

      if (sortBy === 'price_low') results.sort((a, b) => a.pricePerMeter - b.pricePerMeter);
      else if (sortBy === 'price_high') results.sort((a, b) => b.pricePerMeter - a.pricePerMeter);
      else if (sortBy === 'rating') results.sort((a, b) => b.rating - a.rating);
      else if (sortBy === 'gsm') results.sort((a, b) => b.gsmWeight - a.gsmWeight);
      else results.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }

    const pageNum = Number(page);
    const limitNum = Number(limit);
    const startIndex = (pageNum - 1) * limitNum;
    const paginatedResults = results.slice(startIndex, startIndex + limitNum);

    res.json({
      products: paginatedResults,
      total: results.length,
      page: pageNum,
      totalPages: Math.ceil(results.length / limitNum)
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// 6. PRODUCTS: GET Single
app.get('/api/products/:id', async (req: Request, res: Response) => {
  try {
    let product: any = null;
    if (isMongoConnected) {
      product = await ProductModel.findOne({ $or: [{ id: req.params.id }, { slug: req.params.id }] }).lean();
    }
    if (!product) {
      product = memoryProducts.find(p => p.id === req.params.id || p.slug === req.params.id);
    }
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json({ product });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// 7. PRODUCTS: Create (Supplier)
app.post('/api/products', authenticateToken, async (req: Request & { user?: any }, res: Response) => {
  try {
    const productData = req.body;

    const newProduct: Product = {
      id: `prod-${Date.now()}`,
      title: productData.title,
      slug: productData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      category: productData.category || 'Silk',
      fabricType: productData.fabricType || 'Silk',
      description: productData.description || '',
      gsmWeight: Number(productData.gsmWeight) || 150,
      weaveType: productData.weaveType || 'Plain',
      threadCount: productData.threadCount || '200TC',
      widthInches: Number(productData.widthInches) || 58,
      stretchPercent: Number(productData.stretchPercent) || 0,
      composition: productData.composition || '100% Premium Fabric',
      certifications: productData.certifications || ['OEKO-TEX 100'],
      pricePerMeter: Number(productData.pricePerMeter) || 25,
      moqMeters: Number(productData.moqMeters) || 50,
      tierPricing: productData.tierPricing || [
        { minMeters: 50, pricePerMeter: Number(productData.pricePerMeter) || 25 },
        { minMeters: 200, pricePerMeter: Math.round((Number(productData.pricePerMeter) || 25) * 0.85 * 10) / 10 }
      ],
      stockMeters: Number(productData.stockMeters) || 2000,
      availableColors: productData.availableColors || [{ name: 'Default Onyx', hex: '#111116' }],
      images: productData.images?.length ? productData.images : ['https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&q=80&w=800'],
      supplierId: req.user?.id || 'user-supplier-1',
      supplierName: req.user?.name || 'Tessitura Seta Como SpA',
      supplierRating: 4.9,
      supplierVerified: true,
      status: 'approved',
      featured: Boolean(productData.featured),
      trending: true,
      bestSeller: false,
      rating: 5.0,
      reviewCount: 1,
      createdAt: new Date().toISOString()
    };

    memoryProducts.unshift(newProduct);
    if (isMongoConnected) {
      try { await ProductModel.create(newProduct); } catch (_) {}
    }

    res.status(201).json({ message: 'Product published successfully', product: newProduct });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// 8. PRODUCTS: Update
app.put('/api/products/:id', authenticateToken, async (req: Request, res: Response) => {
  try {
    const index = memoryProducts.findIndex(p => p.id === req.params.id);
    if (index !== -1) {
      memoryProducts[index] = { ...memoryProducts[index], ...req.body };
    }

    if (isMongoConnected) {
      await ProductModel.findOneAndUpdate({ id: req.params.id }, { $set: req.body });
    }

    const updated = isMongoConnected
      ? await ProductModel.findOne({ id: req.params.id }).lean()
      : memoryProducts.find(p => p.id === req.params.id);

    res.json({ message: 'Product updated successfully', product: updated });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// 9. PRODUCTS: Delete
app.delete('/api/products/:id', authenticateToken, async (req: Request, res: Response) => {
  try {
    memoryProducts = memoryProducts.filter(p => p.id !== req.params.id);
    if (isMongoConnected) {
      await ProductModel.deleteOne({ id: req.params.id });
    }
    res.json({ message: 'Product deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// 10. CATEGORIES: GET
app.get('/api/categories', async (req: Request, res: Response) => {
  try {
    let categories: any = [];
    if (isMongoConnected) {
      categories = await CategoryModel.find().lean();
    }
    if (!categories || categories.length === 0) {
      categories = memoryCategories;
    }
    res.json({ categories });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// 11. ORDERS: GET User Orders
app.get('/api/orders', authenticateToken, async (req: Request & { user?: any }, res: Response) => {
  try {
    let userOrders: any[] = [];
    if (isMongoConnected) {
      if (req.user?.role === 'buyer') {
        userOrders = await OrderModel.find({ $or: [{ buyerId: req.user?.id }, { buyerEmail: req.user?.email }] }).sort({ createdAt: -1 }).lean();
      } else if (req.user?.role === 'supplier') {
        userOrders = await OrderModel.find({ 'items.supplierId': req.user?.id }).sort({ createdAt: -1 }).lean();
      } else {
        userOrders = await OrderModel.find().sort({ createdAt: -1 }).lean();
      }
    }

    if (!userOrders || userOrders.length === 0) {
      userOrders = memoryOrders;
      if (req.user?.role === 'buyer') {
        userOrders = memoryOrders.filter(o => o.buyerId === req.user?.id || o.buyerEmail === req.user?.email);
      } else if (req.user?.role === 'supplier') {
        userOrders = memoryOrders.filter(o => o.items.some(i => i.supplierId === req.user?.id || i.supplierName.includes(req.user?.name || '')));
      }
    }

    res.json({ orders: userOrders });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// 12. ORDERS: Create Order
app.post('/api/orders', authenticateToken, async (req: Request & { user?: any }, res: Response) => {
  try {
    const orderData = req.body;

    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      orderNumber: `FF-2026-${Math.floor(10000 + Math.random() * 90000)}`,
      buyerId: req.user?.id || 'user-buyer-1',
      buyerName: req.user?.name || orderData.shippingAddress?.fullName || 'Enterprise Buyer',
      buyerEmail: req.user?.email || 'buyer@fabricflow.com',
      items: orderData.items,
      subtotal: orderData.subtotal,
      freightType: orderData.freightType || 'express_air',
      shippingCost: orderData.shippingCost || 120,
      discount: orderData.discount || 0,
      tax: orderData.tax || 0,
      totalAmount: orderData.totalAmount,
      status: 'accepted',
      shippingAddress: orderData.shippingAddress,
      paymentMethod: orderData.paymentMethod || 'razorpay',
      razorpayPaymentId: orderData.razorpayPaymentId || `pay_${Date.now()}`,
      razorpayOrderId: `order_${Date.now()}`,
      trackingNumber: `DHL-EXPRESS-${Math.floor(10000000 + Math.random() * 90000000)}`,
      estimatedDelivery: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      createdAt: new Date().toISOString()
    };

    memoryOrders.unshift(newOrder);
    if (isMongoConnected) {
      try { await OrderModel.create(newOrder); } catch (_) {}
    }

    res.status(201).json({ message: 'Order created successfully', order: newOrder });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// 13. ORDERS: Update Status (Supplier/Admin)
app.put('/api/orders/:id/status', authenticateToken, async (req: Request, res: Response) => {
  try {
    const { status } = req.body;
    const order = memoryOrders.find(o => o.id === req.params.id);
    if (order) order.status = status;

    if (isMongoConnected) {
      await OrderModel.findOneAndUpdate({ id: req.params.id }, { $set: { status } });
    }

    res.json({ message: `Order status updated to ${status}` });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// 14. SAMPLES: Request B2B Swatch
app.post('/api/samples', authenticateToken, async (req: Request & { user?: any }, res: Response) => {
  try {
    const { productId, color, shippingAddress, notes } = req.body;
    
    let product: any = memoryProducts.find(p => p.id === productId);
    if (isMongoConnected && !product) {
      product = await ProductModel.findOne({ id: productId }).lean();
    }

    const sampleReq: SampleRequest = {
      id: `sample-${Date.now()}`,
      productId,
      productTitle: product?.title || 'Sample Fabric Swatch',
      productImage: product?.images?.[0] || '',
      buyerId: req.user?.id || 'buyer-1',
      buyerName: req.user?.name || 'Elena Rostova',
      buyerCompany: req.user?.company || 'Atelier Studio',
      buyerEmail: req.user?.email || 'buyer@fabricflow.com',
      color: color || 'Default',
      shippingAddress: shippingAddress || 'Paris, France',
      notes: notes || '',
      status: 'requested',
      createdAt: new Date().toISOString()
    };

    memorySamples.unshift(sampleReq);
    if (isMongoConnected) {
      try { await SampleRequestModel.create(sampleReq); } catch (_) {}
    }

    res.status(201).json({ message: 'B2B Fabric Sample Swatch Requested Successfully', sampleRequest: sampleReq });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// 15. COUPON: Verify
app.post('/api/coupons/verify', (req: Request, res: Response) => {
  const { code, amount } = req.body;
  const coupon = INITIAL_COUPONS.find(c => c.code.toUpperCase() === (code || '').toUpperCase());

  if (!coupon) {
    return res.status(404).json({ error: 'Invalid promo coupon code' });
  }

  if (amount < coupon.minOrderAmount) {
    return res.status(400).json({ error: `Coupon requires minimum order of $${coupon.minOrderAmount}` });
  }

  res.json({ coupon });
});

// 16. ADMIN & ANALYTICS
app.get('/api/admin/stats', authenticateToken, async (req: Request, res: Response) => {
  try {
    let orders = memoryOrders;
    let products = memoryProducts;
    let users = memoryUsers;

    if (isMongoConnected) {
      orders = await OrderModel.find().lean() as any;
      products = await ProductModel.find().lean() as any;
      users = await UserModel.find().lean() as any;
    }

    const totalRevenue = orders.reduce((acc, o) => acc + (o.totalAmount || 0), 0);
    const totalProducts = products.length;
    const totalSuppliers = users.filter(u => u.role === 'supplier').length;
    const totalBuyers = users.filter(u => u.role === 'buyer').length;

    res.json({
      totalRevenue,
      totalOrders: orders.length,
      totalProducts,
      totalSuppliers,
      totalBuyers,
      pendingApprovals: products.filter(p => p.status === 'pending').length,
      monthlySales: [
        { month: 'Jan', revenue: 42000, orders: 12 },
        { month: 'Feb', revenue: 58000, orders: 18 },
        { month: 'Mar', revenue: 76000, orders: 24 },
        { month: 'Apr', revenue: 94000, orders: 29 },
        { month: 'May', revenue: 112000, orders: 35 },
        { month: 'Jun', revenue: 135000, orders: 42 },
        { month: 'Jul', revenue: 168000, orders: 51 }
      ]
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/admin/users', authenticateToken, async (req: Request, res: Response) => {
  try {
    let users: any[] = [];
    if (isMongoConnected) {
      users = await UserModel.find().lean();
    }
    if (!users || users.length === 0) {
      users = memoryUsers;
    }
    res.json({ users });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/admin/suppliers/:id/approve', authenticateToken, async (req: Request, res: Response) => {
  try {
    const user = memoryUsers.find(u => u.id === req.params.id);
    if (user && user.businessProfile) user.businessProfile.supplierStatus = 'approved';

    if (isMongoConnected) {
      await UserModel.findOneAndUpdate(
        { id: req.params.id },
        { $set: { 'businessProfile.supplierStatus': 'approved', verified: true } }
      );
    }

    res.json({ message: 'Supplier approved' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// --- VITE MIDDLEWARE OR STATIC SERVING ---
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`FabricFlow Enterprise Server active on http://localhost:${PORT}`);
  });
}

startServer();
