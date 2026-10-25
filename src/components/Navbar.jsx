import React, { useState, useEffect } from 'react';
import { 
  Phone, Mail, Globe, Shield, Heart, UserPlus, Users, 
  Award, Lock, Menu, X, CheckCircle, ExternalLink, FileText 
} from 'lucide-react';
import { getStoredNews } from '../data/mockDatabase';

export default function Navbar({ activePage, setActivePage }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [visitorCount, setVisitorCount] = useState('000108');
  const [lang, setLang] = useState('EN');
  const [newsTicker, setNewsTicker] = useState('Veer Azad Foundation launches Varanasi Ghat Cleanliness & Free Health Camp 2026. Online Membership Portal now active!');

  // Visitor counter animation simulation
  useEffect(() => {
    const saved = localStorage.getItem('va_visitor_count') || '108';
    const next = parseInt(saved, 10) + 1;
    localStorage.setItem('va_visitor_count', next.toString());
    setVisitorCount(next.toString().padStart(6, '0'));

    try {
      const news = getStoredNews();
      if (news && news.length > 0) {
        setNewsTicker(news.map(n => n.title).join('  ★★★  '));
      }
    } catch (e) {
      // fallback
    }
  }, []);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'wings', label: 'Our Wings' },
    { id: 'team', label: 'Our Team' },
    { id: 'campaigns', label: 'Campaigns' },
    { id: 'resources', label: 'Resources' },
    { id: 'membership', label: 'Join Member' },
    { id: 'volunteer', label: 'Volunteer' },
    { id: 'verify', label: 'Verify Certificate' },
    { id: 'donate', label: 'Donate Us', isHighlight: true },
  ];

  return (
    <header className="w-full bg-white shadow-md sticky top-0 z-50 transition-all">
      {/* 1. TOP UTILITY BAR (Matching reference video exactly) */}
      <div className="bg-brand-navy text-white text-xs border-b border-brand-navy-light py-1.5 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          {/* Left: News Marquee Ticker */}
          <div className="flex items-center space-x-2 overflow-hidden max-w-xl">
            <span className="bg-brand-saffron text-white font-bold px-2 py-0.5 rounded text-[10px] tracking-wider uppercase flex-shrink-0">
              News
            </span>
            <div className="truncate text-stone-200">
              <span className="animate-pulse mr-2">●</span>
              {newsTicker}
            </div>
          </div>

          {/* Right: Helpline & Live Visitor Counter */}
          <div className="flex items-center space-x-4 flex-shrink-0">
            <a href="tel:+919818398199" className="flex items-center space-x-1.5 text-stone-200 hover:text-amber-400 transition">
              <Phone className="w-3.5 h-3.5 text-brand-saffron" />
              <span className="font-semibold">+91 98183 98199</span>
            </a>

            <div className="hidden sm:flex items-center space-x-1 pl-2 border-l border-slate-700">
              <span className="text-stone-400 text-[11px]">Visitor No.:</span>
              <div className="flex space-x-0.5 font-mono text-[11px] font-bold text-amber-300 bg-slate-900 px-1.5 py-0.5 rounded border border-slate-700 tracking-widest">
                {visitorCount}
              </div>
            </div>

            {/* Language Switcher */}
            <div className="hidden sm:flex items-center space-x-1 text-[11px]">
              <Globe className="w-3 h-3 text-stone-400" />
              <select 
                value={lang} 
                onChange={(e) => setLang(e.target.value)}
                className="bg-slate-900 text-stone-200 text-xs rounded border border-slate-700 px-1 py-0.5 focus:outline-none"
              >
                <option value="EN">English</option>
                <option value="HI">हिंदी</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* 2. MAIN BRAND HEADER */}
      <div className="bg-gradient-to-r from-stone-50 via-amber-50/30 to-stone-50 py-3.5 px-4 sm:px-8 border-b border-amber-100">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo & Foundation Identity */}
          <div 
            onClick={() => setActivePage('home')} 
            className="flex items-center space-x-3.5 cursor-pointer group"
          >
            <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full p-1 bg-white shadow-md border-2 border-brand-gold flex items-center justify-center flex-shrink-0">
              <img 
                src="/assets/va_monogram_seal.png" 
                alt="Veer Azad Logo" 
                className="w-full h-full object-contain rounded-full"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '/assets/logo_badge.png';
                }}
              />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-xl sm:text-2xl font-black font-serif text-brand-navy tracking-tight uppercase group-hover:text-brand-saffron transition">
                  Veer Azad
                </h1>
                <span className="text-xs bg-amber-100 text-amber-900 border border-amber-300 font-semibold px-2 py-0.5 rounded-full hidden sm:inline-block">
                  Regd. NGO
                </span>
              </div>
              <p className="text-xs font-bold text-brand-navy-light uppercase tracking-wider">
                Charitable Foundation
              </p>
              <p className="text-[11px] text-amber-700 italic font-serif">
                "Together for a Better Tomorrow"
              </p>
            </div>
          </div>

          {/* Action CTAs: Join Us + Admin Portal */}
          <div className="hidden md:flex items-center space-x-3">
            <button
              onClick={() => setActivePage('membership')}
              className="flex items-center space-x-1.5 bg-brand-navy hover:bg-brand-navy-light text-white text-xs font-bold px-4 py-2.5 rounded-lg shadow transition"
            >
              <UserPlus className="w-4 h-4 text-amber-400" />
              <span>JOIN US</span>
            </button>

            <button
              onClick={() => setActivePage('admin')}
              className={`flex items-center space-x-1.5 text-xs font-bold px-4 py-2.5 rounded-lg border transition ${
                activePage === 'admin' 
                  ? 'bg-amber-500 text-white border-amber-600 shadow-md' 
                  : 'bg-white hover:bg-stone-100 text-slate-700 border-stone-300 shadow-sm'
              }`}
            >
              <Lock className="w-3.5 h-3.5 text-stone-500" />
              <span>ADMIN LOGIN</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center space-x-2">
            <button
              onClick={() => setActivePage('donate')}
              className="bg-brand-saffron text-white text-xs font-bold px-3 py-1.5 rounded-md flex items-center space-x-1"
            >
              <Heart className="w-3.5 h-3.5 fill-current" />
              <span>Donate</span>
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-brand-navy hover:bg-stone-200 rounded-lg"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* 3. STICKY NAVIGATION BAR */}
      <nav className="bg-brand-navy text-white hidden md:block">
        <div className="max-w-7xl mx-auto px-8 flex items-center justify-between">
          <ul className="flex items-center space-x-1 py-1 text-xs font-semibold tracking-wide">
            {navLinks.map((link) => (
              <li key={link.id}>
                {link.isHighlight ? (
                  <button
                    onClick={() => setActivePage(link.id)}
                    className="ml-3 bg-brand-saffron hover:bg-brand-saffron-dark text-white font-bold px-4 py-1.5 rounded-md shadow flex items-center space-x-1.5 transition transform hover:scale-105"
                  >
                    <Heart className="w-3.5 h-3.5 fill-current text-white" />
                    <span>{link.label}</span>
                  </button>
                ) : (
                  <button
                    onClick={() => setActivePage(link.id)}
                    className={`px-3 py-2 rounded-md transition ${
                      activePage === link.id
                        ? 'bg-brand-navy-light text-amber-300 font-bold border-b-2 border-amber-400'
                        : 'text-stone-200 hover:text-white hover:bg-slate-800'
                    }`}
                  >
                    {link.label}
                  </button>
                )}
              </li>
            ))}
          </ul>

          <div className="flex items-center space-x-2 text-xs font-medium text-amber-200">
            <Shield className="w-4 h-4 text-emerald-400" />
            <span>NITI Aayog Registered</span>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-brand-navy text-white border-t border-slate-800 px-4 py-4 space-y-2">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => {
                setActivePage(link.id);
                setMobileMenuOpen(false);
              }}
              className={`w-full text-left px-3 py-2 rounded-md text-sm font-semibold flex items-center justify-between ${
                activePage === link.id ? 'bg-amber-500 text-white' : 'text-stone-200 hover:bg-slate-800'
              }`}
            >
              <span>{link.label}</span>
              {link.isHighlight && <Heart className="w-4 h-4 fill-current text-white" />}
            </button>
          ))}
          <div className="pt-2 border-t border-slate-700 flex flex-col space-y-2">
            <button
              onClick={() => {
                setActivePage('admin');
                setMobileMenuOpen(false);
              }}
              className="w-full text-center bg-slate-800 text-amber-300 border border-slate-700 py-2 rounded-md text-xs font-bold"
            >
              ADMIN LOGIN / DASHBOARD
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
