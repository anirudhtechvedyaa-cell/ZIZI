import React from 'react';

interface HeroProps {
  onNavigateProduct?: (slug: string) => void;
}

const Hero: React.FC<HeroProps> = ({ onNavigateProduct }) => {
  const handleExplore = () => {
    if (onNavigateProduct) {
      onNavigateProduct('dior-eloise');
    }
  };

  return (
    <section className="relative w-full h-full bg-white overflow-hidden">
      {/* Background Image - Dior Éloise Hero with uniform blur */}
      <div className="absolute inset-0 z-0">
        <img
          src="/dior-eloise-hero.jpeg"
          alt="Dior – Éloise"
          className="w-full h-full object-cover object-center blur-[2px]"
        />
        {/* Gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/35 to-black/10" />
        {/* Subtle vignette to focus on center content */}
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse 80% 70% at 50% 50%, transparent 30%, rgba(0,0,0,0.2) 100%)'
          }}
        />
      </div>

      {/* Hero Content - Absolutely positioned at bottom, below the ZIZI wordmark */}
      <div className="absolute bottom-12 md:bottom-16 left-0 right-0 z-20 text-center px-6">
        <div className="max-w-xl mx-auto animate-fade-in">
          {/* Subtitle with product info */}
          <div className="mb-8">
            <p className="text-white text-xs md:text-sm font-sans tracking-[0.2em] uppercase font-semibold">
              Dior – Éloise <span className="mx-2 text-white/40">|</span> Toile de Jouy — Signature Blue
            </p>
          </div>

          {/* CTA Button - Explore Piece */}
          <button
            onClick={handleExplore}
            className="group relative inline-flex items-center justify-center px-10 py-3.5 overflow-hidden border border-white/30 bg-white/10 backdrop-blur-md rounded-full transition-all duration-500 hover:bg-white hover:border-white"
          >
            <span className="relative text-[10px] font-bold tracking-[0.3em] uppercase text-white transition-colors duration-500 group-hover:text-black">
              Explore Piece
            </span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;