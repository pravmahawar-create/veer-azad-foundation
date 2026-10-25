import React, { useState, useEffect } from 'react';
import { X, Heart, Sparkles, TrendingUp, ShieldCheck, Download, Smartphone } from 'lucide-react';
import { CAMPAIGNS } from '../data/mockDatabase';

export default function WelcomePopup({ onOpenDonateModal, activePage = 'home' }) {
  const [isOpen, setIsOpen] = useState(false);
  const [showPwaBanner, setShowPwaBanner] = useState(true);

  // Trigger popup only on Home page initial load
  useEffect(() => {
    if (activePage !== 'home') {
      setIsOpen(false);
      return;
    }
    const hasSeen = sessionStorage.getItem('va_welcome_seen_v2');
    if (!hasSeen) {
      const timer = setTimeout(() => {
        setIsOpen(true);
        sessionStorage.setItem('va_welcome_seen_v2', 'true');
      }, 700);
      return () => clearTimeout(timer);
    }
  }, [activePage]);

  if (!isOpen && !showPwaBanner) return null;

  const activeCampaign = CAMPAIGNS[0]; // Shiksha Jyoti: Education for 1000 Children
  const pct = Math.round((activeCampaign.raised / activeCampaign.goal) * 100);

  return (
    <>
      {/* 1. MAIN WELCOME / IMPACT POPUP MODAL (Matching frame_60s.jpg from reference video) */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-300">
          <div className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl border border-stone-200 relative flex flex-col max-h-[90vh]">
            
            {/* Top Close 'X' Button */}
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute top-3 right-3 z-20 w-8 h-8 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center transition shadow-lg"
              title="Close Popup"
            >
              <X className="w-4 h-4 stroke-[2.5]" />
            </button>

            {/* Campaign Hero Image with Funded Badge */}
            <div className="relative w-full h-52 sm:h-60 bg-slate-900 flex-shrink-0">
              <img 
                src="https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80" 
                alt="Active Relief Drive" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20"></div>

              {/* Status Badge */}
              <div className="absolute top-3 left-3 bg-brand-saffron text-white text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-md">
                {pct}% FUNDED • LIVE DRIVE
              </div>

              {/* Tagline on image */}
              <div className="absolute bottom-3 left-4 right-4 text-white">
                <span className="text-[10px] text-amber-300 uppercase tracking-widest font-bold">
                  ● ACTIVE COMMUNITY CAMPAIGN
                </span>
                <h3 className="text-lg font-bold font-serif leading-tight text-white drop-shadow">
                  {activeCampaign.title}
                </h3>
              </div>
            </div>

            {/* Modal Body: Description & Live Stats */}
            <div className="p-5 overflow-y-auto space-y-4">
              <p className="text-xs text-slate-600 leading-relaxed">
                Veer Azad Charitable Foundation's flagship drive provides complete school kits, digital tablets, and books to 1,000 underprivileged children across Varanasi ghats and rural blocks.
              </p>

              {/* Progress Box */}
              <div className="bg-amber-50/60 border border-amber-200/80 rounded-xl p-3.5 space-y-2">
                <div className="grid grid-cols-3 text-center divide-x divide-amber-200 text-xs">
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase font-semibold">Raised</span>
                    <div className="font-bold text-slate-900 font-serif">₹{activeCampaign.raised.toLocaleString('en-IN')}</div>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase font-semibold">Goal</span>
                    <div className="font-bold text-slate-900 font-serif">₹{activeCampaign.goal.toLocaleString('en-IN')}</div>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase font-semibold">Funded</span>
                    <div className="font-bold text-brand-saffron font-serif">{pct}%</div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full h-2.5 bg-stone-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-amber-500 to-brand-saffron rounded-full transition-all duration-500"
                    style={{ width: `${pct}%` }}
                  ></div>
                </div>
              </div>

              {/* Credibility & 80G */}
              <div className="flex items-center justify-between text-[11px] text-slate-500 font-medium px-1">
                <span className="flex items-center space-x-1 text-emerald-700 font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>50% Tax Exempt u/s 80G</span>
                </span>
                <span>{activeCampaign.donorsCount}+ Donors Contributed</span>
              </div>

              {/* Action Buttons */}
              <div className="pt-1 flex items-center space-x-3">
                <button
                  onClick={() => {
                    setIsOpen(false);
                    if (onOpenDonateModal) onOpenDonateModal(activeCampaign);
                  }}
                  className="flex-1 bg-brand-saffron hover:bg-brand-saffron-dark text-white font-bold py-3 rounded-xl text-xs flex items-center justify-center space-x-2 shadow-lg transition transform hover:-translate-y-0.5"
                >
                  <Heart className="w-4 h-4 fill-current" />
                  <span>DONATE TO THIS DRIVE NOW</span>
                </button>

                <button
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-3 rounded-xl border border-stone-300 text-xs font-semibold text-slate-600 hover:bg-stone-100 transition"
                >
                  Continue to Site
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* 2. FLOATING PWA / "INSTALL APP" TOAST (Matching bottom pill in reference video) */}
      {showPwaBanner && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-40 bg-white/95 backdrop-blur-md border border-stone-300 shadow-2xl rounded-full px-4 py-2 flex items-center space-x-3 max-w-sm w-full mx-4">
          <div className="w-8 h-8 rounded-full bg-brand-navy p-1 flex items-center justify-center flex-shrink-0">
            <img src="/assets/va_monogram_seal.png" alt="VA" className="w-full h-full object-contain" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-xs font-bold text-slate-900 truncate">Install Veer Azad App</div>
            <div className="text-[10px] text-slate-500 truncate">Add to Home Screen for fast offline access</div>
          </div>
          <button 
            onClick={() => {
              alert('Veer Azad Portal installed to Home Screen simulation active!');
              setShowPwaBanner(false);
            }}
            className="bg-brand-saffron hover:bg-brand-saffron-dark text-white text-xs font-bold px-3 py-1 rounded-full shadow transition"
          >
            Install
          </button>
          <button 
            onClick={() => setShowPwaBanner(false)}
            className="text-stone-400 hover:text-slate-700 p-0.5"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </>
  );
}
