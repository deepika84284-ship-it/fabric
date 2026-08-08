import React, { useState } from 'react';
import { ToastProvider } from './context/ToastContext';
import { AuthProvider } from './context/AuthContext';
import { CartProvider, useCart } from './context/CartContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { QuickViewModal } from './components/QuickViewModal';
import { CompareModal } from './components/CompareModal';
import { SampleRequestModal } from './components/SampleRequestModal';

import { LandingPage } from './pages/LandingPage';
import { MarketplacePage } from './pages/MarketplacePage';
import { ProductDetailsPage } from './pages/ProductDetailsPage';
import { CartCheckoutPage } from './pages/CartCheckoutPage';
import { BuyerDashboard } from './pages/BuyerDashboard';
import { SupplierDashboard } from './pages/SupplierDashboard';
import { AdminDashboard } from './pages/AdminDashboard';
import { CategoriesPage, AboutPage, ContactPage, FAQPage, AuthPage } from './pages/PublicPages';

import { Product } from './types';

function AppContent() {
  const [currentPage, setCurrentPage] = useState<string>('landing');
  const [pageParams, setPageParams] = useState<any>({});
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const {
    quickViewProduct,
    closeQuickView,
    compareList,
    closeCompare,
    sampleModalProduct,
    closeSampleModal
  } = useCart();

  const handleNavigate = (page: string, params?: any) => {
    setCurrentPage(page);
    if (params) setPageParams(params);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    handleNavigate('product-details');
  };

  return (
    <div className="min-h-screen bg-[#0A0A0F] text-[#F0F0F5] font-sans antialiased flex flex-col justify-between selection:bg-[#7C5CFC] selection:text-white">
      {/* Sticky Blur Header Navbar */}
      <Navbar onNavigate={handleNavigate} currentPage={currentPage} />

      {/* Main Content Router */}
      <main className="flex-grow pt-20">
        {currentPage === 'landing' && (
          <LandingPage onNavigate={handleNavigate} onSelectProduct={handleSelectProduct} />
        )}

        {currentPage === 'marketplace' && (
          <MarketplacePage
            onSelectProduct={handleSelectProduct}
            initialCategory={pageParams.category || ''}
            initialSearch={pageParams.search || ''}
          />
        )}

        {currentPage === 'product-details' && selectedProduct && (
          <ProductDetailsPage
            product={selectedProduct}
            onBack={() => handleNavigate('marketplace')}
            onSelectProduct={handleSelectProduct}
          />
        )}

        {currentPage === 'checkout' && (
          <CartCheckoutPage
            onNavigate={handleNavigate}
            onOrderSuccess={() => handleNavigate('buyer-dashboard')}
          />
        )}

        {currentPage === 'buyer-dashboard' && (
          <BuyerDashboard onNavigate={handleNavigate} />
        )}

        {currentPage === 'supplier-dashboard' && (
          <SupplierDashboard />
        )}

        {currentPage === 'admin-dashboard' && (
          <AdminDashboard />
        )}

        {currentPage === 'categories' && (
          <CategoriesPage onSelectCategory={(slug) => handleNavigate('marketplace', { category: slug })} />
        )}

        {currentPage === 'about' && <AboutPage />}
        {currentPage === 'contact' && <ContactPage />}
        {currentPage === 'faq' && <FAQPage />}
        {currentPage === 'auth' && <AuthPage onNavigate={handleNavigate} />}
      </main>

      {/* Luxury Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Modals */}
      {quickViewProduct && (
        <QuickViewModal
          product={quickViewProduct}
          onClose={closeQuickView}
          onViewFull={handleSelectProduct}
        />
      )}

      {compareList && compareList.length > 0 && (
        <CompareModal />
      )}

      {sampleModalProduct && (
        <SampleRequestModal product={sampleModalProduct} onClose={closeSampleModal} />
      )}
    </div>
  );
}

export default function App() {
  return (
    <ToastProvider>
      <AuthProvider>
        <CartProvider>
          <AppContent />
        </CartProvider>
      </AuthProvider>
    </ToastProvider>
  );
}
