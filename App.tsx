import React, { useState, useEffect, lazy, Suspense } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FeaturedCollection from './components/FeaturedCollection';
import AboutSection from './components/AboutSection';
import Testimonials from './components/Testimonials';
import Newsletter from './components/Newsletter';
import Footer from './components/Footer';
import InstagramArchive from './components/InstagramArchive';
import { getProductBySlug } from './data/products';

// Lazy-loaded heavy components for code splitting
const FullCollection = lazy(() => import('./components/FullCollection'));
const Inspiration = lazy(() => import('./components/Inspiration'));
const AboutPage = lazy(() => import('./components/AboutPage'));
const ProductDetailPage = lazy(() => import('./components/ProductDetailPage'));

// Loading fallback component
const PageLoader = () => (
  <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
    <div className="text-white text-center">
      <h1 className="text-4xl font-serif mb-4 animate-pulse">ZIZI</h1>
      <p className="text-xs tracking-widest uppercase text-white/50">Loading...</p>
    </div>
  </div>
);

export default function App() {
  const [currentView, setCurrentView] = useState<'home' | 'collection' | 'inspiration' | 'about' | 'product'>('home');
  const [activeSection, setActiveSection] = useState('The Beginning');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentProductSlug, setCurrentProductSlug] = useState<string | null>(null);

  // Track scroll for logo animation
  useEffect(() => {
    const handleScroll = () => {
      // Normalize scroll for the first viewport height
      const progress = Math.min(window.scrollY / (window.innerHeight * 0.4), 1);
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle URL routing on initial load and popstate
  useEffect(() => {
    const handleLocationChange = () => {
      const path = window.location.pathname;
      if (path.startsWith('/product/') || path.startsWith('/collection/')) {
        const slug = path.split('/').pop();
        if (slug) {
          setCurrentProductSlug(slug);
          setCurrentView('product');
          window.scrollTo(0, 0);
          return;
        }
      }

      // Explicit routing
      if (path === '/collection') {
        setCurrentView('collection');
        return;
      }

      // Default routing equivalent
      if (path === '/') setCurrentView('home');
    };

    handleLocationChange();
    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

  // Section and Theme Detection
  useEffect(() => {
    // Force light theme for these views
    if (['collection', 'about', 'product'].includes(currentView)) {
      setTheme('light');
      return;
    }

    const observerOptions = {
      root: null,
      rootMargin: '-50% 0px -50% 0px',
      threshold: 0
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionName = entry.target.getAttribute('data-section-name');
          const sectionTheme = entry.target.getAttribute('data-theme') as 'dark' | 'light';

          if (sectionName) setActiveSection(sectionName);
          if (sectionTheme) setTheme(sectionTheme);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    setTimeout(() => {
      const sections = document.querySelectorAll('[data-section-name]');
      sections.forEach((section) => observer.observe(section));
    }, 100);

    return () => observer.disconnect();
  }, [currentView]);

  const navigateTo = (view: 'home' | 'collection' | 'inspiration' | 'about') => {
    window.history.pushState({}, '', view === 'home' ? '/' : `/${view}`); // Simple URL update
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setCurrentView(view);
  };

  const navigateToProduct = (slug: string) => {
    window.history.pushState({}, '', `/collection/${slug}`);
    setCurrentProductSlug(slug);
    setCurrentView('product');
    window.scrollTo(0, 0);
  };

  // Logo Docking Logic
  const isDocked = scrollProgress === 1 || currentView !== 'home';
  // Logo always visible except on product detail page
  const logoOpacity = 1;

  // Get current product data if in product view
  const currentProduct = currentProductSlug ? getProductBySlug(currentProductSlug) : null;

  return (
    <div className="relative bg-white font-sans selection:bg-gray-300 selection:text-black min-h-screen">
      <Navbar theme={theme} onNavigate={navigateTo} currentView={currentView} isLogoDocked={isDocked} />

      {/* --- DYNAMIC MONOLITHIC LOGO --- */}
      {/* Animates from center (homepage) to docked position. Visible on ALL pages. */}
      <div
        className="fixed inset-0 z-[145] flex items-center justify-center pointer-events-none"
      >
        <h1
          onClick={() => navigateTo('home')}
          className="font-serif font-bold tracking-tighter leading-none cursor-pointer pointer-events-auto"
          style={{
            transform: isDocked
              ? `translateY(calc(-50vh + 2.2rem)) scale(0.12)`
              : `translateY(calc(-${scrollProgress * 50}vh + ${scrollProgress * 2.2}rem)) scale(${1 - (scrollProgress * 0.88)})`,
            fontSize: '16vw',
            // Homepage at top: white. Everything else: black.
            color: (currentView === 'home' && scrollProgress < 0.15) ? 'white' : 'black',
            transition: 'transform 0.4s ease-out, color 0.3s ease-out',
            textShadow: (currentView === 'home' && scrollProgress < 0.5) ? '0 4px 30px rgba(0,0,0,0.5)' : 'none',
          }}
        >
          ZIZI
        </h1>
      </div>

      {/* --- VIEW ROUTING --- */}
      {currentView === 'home' ? (
        <>
          <div className="sticky top-0 z-10 h-screen w-full overflow-hidden" data-section-name="The Beginning" data-theme="dark">
            <Hero onNavigateProduct={navigateToProduct} />
          </div>
          <div className="sticky top-0 z-20 h-screen w-full overflow-hidden bg-white" data-section-name="Spring Collection" data-theme="light">
            <FeaturedCollection onNavigateProduct={navigateToProduct} />
          </div>
          <div className="sticky top-0 z-30 h-screen w-full overflow-hidden bg-[#f4f4f4]" data-section-name="Our Philosophy" data-theme="light">
            <AboutSection />
          </div>
          <div className="sticky top-0 z-40 h-screen w-full overflow-hidden bg-cream" data-section-name="Voices" data-theme="light">
            <Testimonials />
          </div>
          <div className="sticky top-0 z-[45] h-screen w-full overflow-hidden bg-[#f4f4f4]" data-section-name="Archive" data-theme="light">
            <InstagramArchive />
          </div>
          <div className="sticky top-0 z-50 h-screen w-full overflow-hidden bg-black" data-section-name="Join Us" data-theme="dark">
            <Newsletter />
          </div>
          <div className="sticky top-0 z-[60] h-screen w-full overflow-hidden bg-[#050505]" data-section-name="Connect" data-theme="dark">
            <Footer />
          </div>
        </>
      ) : currentView === 'inspiration' ? (
        <Suspense fallback={<PageLoader />}>
          <Inspiration />
        </Suspense>
      ) : currentView === 'about' ? (
        <Suspense fallback={<PageLoader />}>
          <AboutPage />
        </Suspense>
      ) : currentView === 'product' && currentProduct ? (
        <Suspense fallback={<PageLoader />}>
          <ProductDetailPage
            product={currentProduct}
            onBack={() => navigateTo('home')}
            onNavigate={navigateTo}
          />
        </Suspense>
      ) : (
        <Suspense fallback={<PageLoader />}>
          <FullCollection onNavigateProduct={navigateToProduct} />
        </Suspense>
      )}
    </div>
  );
}