import React, { useState } from 'react';
import { Heart, ShoppingBag, User, Menu, X } from 'lucide-react';

interface NavbarProps {
  theme: 'dark' | 'light';
  onNavigate: (view: 'home' | 'collection' | 'inspiration' | 'about') => void;
  currentView: 'home' | 'collection' | 'inspiration' | 'about';
  isLogoDocked?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ theme, onNavigate, currentView, isLogoDocked }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Dynamic color classes based on theme
  const textColor = theme === 'dark' ? 'text-white' : 'text-black';
  const hoverColor = theme === 'dark' ? 'hover:text-white/70' : 'hover:text-black/60';
  const mutedColor = theme === 'dark' ? 'text-white/80' : 'text-black/80';

  // Header bar background based on theme
  const bgColor = theme === 'dark'
    ? 'bg-black/60 border-b border-white/5'
    : 'bg-white/70 border-b border-black/5';

  const handleLinkClick = (view: 'home' | 'collection' | 'inspiration' | 'about') => {
    setIsMobileMenuOpen(false);
    onNavigate(view);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[140] transition-all duration-700 backdrop-blur-md ${bgColor} ${textColor}`}>
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-6 md:py-8 flex items-center justify-between relative">

        {/* Left Links */}
        <div className="hidden md:flex space-x-8 z-20">
          <button
            onClick={() => handleLinkClick('collection')}
            className={`${mutedColor} ${hoverColor} text-[11px] font-bold uppercase tracking-[0.15em] transition-colors`}
          >
            Collection
          </button>
          <button
            onClick={() => handleLinkClick('inspiration')}
            className={`${mutedColor} ${hoverColor} text-[11px] font-bold uppercase tracking-[0.15em] transition-colors`}
          >
            Inspiration
          </button>
          <button
            onClick={() => handleLinkClick('about')}
            className={`${mutedColor} ${hoverColor} text-[11px] font-bold uppercase tracking-[0.15em] transition-colors`}
          >
            About
          </button>
        </div>

        {/* Center Space - Reserved for animated logo from App.tsx */}
        <div className="absolute left-1/2 transform -translate-x-1/2 w-32 h-8 flex items-center justify-center pointer-events-none">
          {/* Empty - The animated ZIZI logo docks here from App.tsx */}
        </div>

        {/* Right Icons */}
        <div className="hidden md:flex items-center space-x-8 z-20">
          <button className={`${mutedColor} ${hoverColor} transition-colors`}>
            <Heart size={20} strokeWidth={1.5} />
          </button>
          <button className={`${mutedColor} ${hoverColor} transition-colors`}>
            <ShoppingBag size={20} strokeWidth={1.5} />
          </button>
          <button className={`${mutedColor} ${hoverColor} transition-colors`}>
            <User size={20} strokeWidth={1.5} />
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden z-50 ml-auto">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`${textColor} p-2 rounded-full bg-white/10 backdrop-blur-md border border-white/10 shadow-sm`}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-white z-40 flex flex-col items-center justify-center space-y-8">
          <button onClick={() => handleLinkClick('home')} className="text-black text-3xl font-serif">ZIZI</button>
          <div className="w-12 h-px bg-black/10 my-4" />
          <button onClick={() => handleLinkClick('collection')} className="text-black text-xl font-serif tracking-widest uppercase">Collection</button>
          <button onClick={() => handleLinkClick('inspiration')} className="text-black text-xl font-serif tracking-widest uppercase">Inspiration</button>
          <button onClick={() => handleLinkClick('about')} className="text-black text-xl font-serif tracking-widest uppercase">About</button>

          <div className="flex space-x-8 mt-12 text-black/40">
            <Heart size={24} strokeWidth={1.5} />
            <ShoppingBag size={24} strokeWidth={1.5} />
            <User size={24} strokeWidth={1.5} />
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;