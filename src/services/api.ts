import { Product, User, Order, SampleRequest, Category } from '../types';

export const getAuthToken = (): string | null => {
  return localStorage.getItem('fabricflow_token');
};

export const apiFetch = async <T = any>(endpoint: string, options: RequestInit = {}): Promise<T> => {
  const token = getAuthToken();
  
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string> || {})
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(endpoint, {
    ...options,
    headers
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || data.message || `API Error: ${response.status}`);
  }

  return data as T;
};

export const api = {
  // Health
  getHealth: () => apiFetch('/api/health'),

  // Auth
  login: (email: string, password?: string, role?: string) =>
    apiFetch<{ token: string; refreshToken: string; user: User }>('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password, role })
    }),

  register: (formData: any) =>
    apiFetch<{ token: string; user: User }>('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(formData)
    }),

  getMe: () => apiFetch<{ user: User }>('/api/auth/me'),

  // Products
  getProducts: (params?: Record<string, string | number | boolean>) => {
    const query = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, val]) => {
        if (val !== undefined && val !== null && val !== '') {
          query.append(key, String(val));
        }
      });
    }
    const qStr = query.toString();
    return apiFetch<{ products: Product[]; total: number; page: number; totalPages: number }>(
      `/api/products${qStr ? `?${qStr}` : ''}`
    );
  },

  getProductById: (id: string) => apiFetch<{ product: Product }>(`/api/products/${id}`),

  createProduct: (productData: Partial<Product>) =>
    apiFetch<{ message: string; product: Product }>('/api/products', {
      method: 'POST',
      body: JSON.stringify(productData)
    }),

  updateProduct: (id: string, productData: Partial<Product>) =>
    apiFetch<{ message: string; product: Product }>(`/api/products/${id}`, {
      method: 'PUT',
      body: JSON.stringify(productData)
    }),

  deleteProduct: (id: string) =>
    apiFetch<{ message: string }>(`/api/products/${id}`, {
      method: 'DELETE'
    }),

  // Categories
  getCategories: () => apiFetch<{ categories: Category[] }>('/api/categories'),

  // Orders
  getOrders: () => apiFetch<{ orders: Order[] }>('/api/orders'),

  createOrder: (orderData: any) =>
    apiFetch<{ message: string; order: Order }>('/api/orders', {
      method: 'POST',
      body: JSON.stringify(orderData)
    }),

  updateOrderStatus: (id: string, status: string) =>
    apiFetch<{ message: string; order: Order }>(`/api/orders/${id}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status })
    }),

  // Samples
  requestSample: (sampleData: { productId: string; color?: string; shippingAddress: string; notes?: string }) =>
    apiFetch<{ message: string; sampleRequest: SampleRequest }>('/api/samples', {
      method: 'POST',
      body: JSON.stringify(sampleData)
    }),

  // Admin
  getAdminStats: () => apiFetch('/api/admin/stats'),

  getAdminUsers: () => apiFetch<{ users: User[] }>('/api/admin/users'),

  approveSupplier: (id: string) =>
    apiFetch<{ message: string; user: User }>(`/api/admin/suppliers/${id}/approve`, {
      method: 'PUT'
    }),

  // Coupons
  verifyCoupon: (code: string, amount: number) =>
    apiFetch<{ coupon: any }>('/api/coupons/verify', {
      method: 'POST',
      body: JSON.stringify({ code, amount })
    })
};
