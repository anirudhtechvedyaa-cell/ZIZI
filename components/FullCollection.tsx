import React, { useRef } from 'react';
import { products } from '../data/products';
import { motion, useScroll, useTransform, useSpring, MotionValue } from 'framer-motion';
import { ArrowUpRight, ArrowDown } from 'lucide-react';

interface FullCollectionProps {
  onNavigateProduct?: (slug: string) => void;
}

// Image mapping for Collection Page specific assets
const COLLECTION_IMAGES: Record<string, { desktop: string; mobile: string }> = {
  'dior-eloise': {
    desktop: '/selected-dior-eloise.jpeg',
    mobile: '/m_collectionpage_dior_eloise.png'
  },
  'fendi-vittoria': {
    desktop: '/selected-fendi-vittoria.jpeg',
    mobile: '/m.collectionpage.lv-fendi.png'
  },
  'lv-aurele': {
    desktop: '/selected-lv-aurele.jpeg',
    mobile: '/m_collectionpage_lv_aurele.png'
  },
  'lv-benoit': {
    desktop: '/collectionpage_lv_benoit.png',
    mobile: '/m_collectionpage_lv_benoit.png'
  },
  'hermes-henrietta': {
    desktop: '/collectionpage_hermes_henrietta.png',
    mobile: '/m_collectionpage_hermes_henrietta.png'
  },
  'harrods-william': {
    desktop: '/collectionpage_harrods_william.png',
    mobile: '/m_collectionpage_harrods_william.png'
  },
  'fortnum-reginald': {
    desktop: '/collectionpage_fm_reginald.png',
    mobile: '/m_collectionpage_fm_reginald.png'
  }
};

// Product descriptions for editorial feel
const PRODUCT_DESCRIPTIONS: Record<string, string> = {
  'dior-eloise': 'A sculptural homage to Parisian elegance, rendered in signature Toile de Jouy.',
  'fendi-vittoria': 'Bold geometry meets Italian craftsmanship in verdant monogram.',
  'lv-aurele': 'The quiet confidence of Maison heritage, elevated in gold.',
  'lv-benoit': 'A statement of refined luxury, accented with timeless marquetry.',
  'hermes-henrietta': 'The spirit of the saddle, reimagined for the modern collector.',
  'harrods-william': 'British elegance, distilled into an iconic silhouette.',
  'fortnum-reginald': 'London heritage embodied in the crown jewel of the collection.'
};

// Helper to get correct display image
const getDisplayImage = (slug: string, fallbackImages: string[]) => {
  return COLLECTION_IMAGES[slug]?.desktop || fallbackImages[0];
};

// --- CURTAIN COMPONENT ---
interface CurtainProps {
  children: React.ReactNode;
  zIndex: number;
  progress: MotionValue<number>;
  range: [number, number];
  className?: string;
}

const Curtain: React.FC<CurtainProps> = ({ children, zIndex, progress, range, className = "" }) => {
  const exitRange = [range[1], range[1] + 0.1];

  const scale = useTransform(progress, exitRange, [1, 0.95]);
  const opacity = useTransform(progress, exitRange, [1, 0.5]);
  const brightness = useTransform(progress, exitRange, [1, 0.4]);

  return (
    <motion.div
      style={{
        scale,
        opacity,
        filter: useTransform(brightness, b => `brightness(${b})`),
        zIndex
      }}
      className={`sticky top-0 h-screen w-full overflow-hidden flex flex-col ${className}`}
    >
      {children}
    </motion.div>
  );
};

const FullCollection: React.FC<FullCollectionProps> = ({ onNavigateProduct }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const smoothProgress = useSpring(scrollYProgress, { damping: 20, stiffness: 100 });

  const handleNavigate = (slug: string) => {
    if (onNavigateProduct) onNavigateProduct(slug);
  };

  // Total sections = 1 (Hero) + number of products
  const totalSections = 1 + products.length;
  const step = 1 / totalSections;

  // Hero scroll transforms (hooks must be at top level)
  const heroSubtitleY = useTransform(smoothProgress, [0, step], [0, -100]);
  const heroSubtitleOpacity = useTransform(smoothProgress, [0, step * 0.5], [1, 0]);
  const heroTitleY = useTransform(smoothProgress, [0, step], [0, -200]);
  const heroTitleScale = useTransform(smoothProgress, [0, step], [1, 0.5]);
  const heroTitleOpacity = useTransform(smoothProgress, [0, step * 0.8], [1, 0]);

  return (
    <div ref={containerRef} className="bg-black relative" style={{ height: `${totalSections * 100}vh` }}>

      {/* === HERO SECTION: GENESIS (Z-0) === */}
      <Curtain zIndex={0} progress={smoothProgress} range={[0, step]}>
        <div className="absolute inset-0">
          <img
            src="/collection_hero_bg_symbolic_turtle_16x9.jpeg"
            alt="Genesis Collection"
            className="w-full h-full object-cover opacity-90"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />
        </div>
        <div className="relative z-10 w-full h-full flex flex-col items-center justify-center text-white text-center px-6">
          <motion.p
            className="text-xs md:text-sm font-bold tracking-[0.4em] uppercase mb-8 text-white/90 drop-shadow-md"
            style={{
              y: heroSubtitleY,
              opacity: heroSubtitleOpacity
            }}
          >
            The Spring 2025 Collection
          </motion.p>
          <motion.h1
            className="text-[12vw] md:text-[15vw] font-serif leading-none tracking-tighter text-white drop-shadow-2xl"
            style={{
              y: heroTitleY,
              scale: heroTitleScale,
              opacity: heroTitleOpacity
            }}
          >
            GENESIS
          </motion.h1>
          <div className="absolute bottom-12 animate-bounce">
            <ArrowDown className="text-white/70 w-8 h-8" />
          </div>
        </div>
      </Curtain>

      {/* === PRODUCT SECTIONS (Z-1 onwards) === */}
      {products.map((product, index) => {
        const panelIndex = index + 1; // Offset by 1 because Hero is first
        const range: [number, number] = [panelIndex * step, (panelIndex + 1) * step];
        const displayImage = getDisplayImage(product.slug, product.images);
        const description = PRODUCT_DESCRIPTIONS[product.slug] || 'A masterpiece of craftsmanship.';

        return (
          <Curtain
            key={product.id}
            zIndex={panelIndex}
            progress={smoothProgress}
            range={range}
            className={index % 2 === 0 ? 'bg-[#0a0a0a]' : 'bg-white'}
          >
            {/* Split-Screen Layout */}
            <div className="w-full h-full flex flex-col md:flex-row">

              {/* LEFT SIDE: Text & Buttons */}
              <div className="flex-1 flex flex-col justify-end md:justify-center p-8 md:p-16 lg:p-24 order-2 md:order-1">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="max-w-lg"
                >
                  <h2 className={`text-5xl md:text-7xl lg:text-8xl font-serif mb-4 leading-[0.9] ${index % 2 === 0 ? 'text-white' : 'text-black'}`}>
                    {product.title}
                  </h2>

                  <p className={`text-2xl md:text-3xl font-serif italic mb-6 ${index % 2 === 0 ? 'text-white/80' : 'text-black/70'}`}>
                    {product.price}
                  </p>

                  <p className={`text-sm md:text-base font-sans leading-relaxed mb-10 max-w-md ${index % 2 === 0 ? 'text-white/50' : 'text-black/50'}`}>
                    {description}
                  </p>

                  <div className="flex flex-wrap items-center gap-6">
                    <button
                      onClick={(e) => { e.stopPropagation(); alert(`Added ${product.title} to Cart`); }}
                      className={`px-8 py-3 text-xs font-bold tracking-[0.15em] uppercase transition-colors rounded-full shadow-lg ${index % 2 === 0 ? 'bg-white text-black hover:bg-gray-200' : 'bg-black text-white hover:bg-gray-800'}`}
                    >
                      Add to Cart
                    </button>
                    <button
                      onClick={() => handleNavigate(product.slug)}
                      className={`transition-colors uppercase text-xs font-bold tracking-[0.15em] flex items-center gap-2 ${index % 2 === 0 ? 'text-white/60 hover:text-white' : 'text-black/60 hover:text-black'}`}
                    >
                      Buy Now <ArrowUpRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              </div>

              {/* RIGHT SIDE: Image */}
              <div
                className="flex-1 relative cursor-pointer order-1 md:order-2 min-h-[50vh] md:min-h-0"
                onClick={() => handleNavigate(product.slug)}
              >
                <img
                  src={displayImage}
                  alt={product.title}
                  className="absolute inset-0 w-full h-full object-cover object-center"
                  loading="lazy"
                />
                <div className="hidden md:block absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#0a0a0a] to-transparent" />
              </div>

            </div>
          </Curtain>
        );
      })}

    </div>
  );
};

export default FullCollection;