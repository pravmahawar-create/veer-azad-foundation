import React, { useState, useEffect } from 'react';
import { Heart, Users, Target, CheckCircle2 } from 'lucide-react';
import { getStoredCampaigns } from '../data/mockDatabase';

export default function Campaigns({ onOpenDonateModal }) {
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    setCampaigns(getStoredCampaigns());
  }, []);
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12 space-y-12">
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
          Transparent Welfare Drives
        </span>
        <h1 className="text-3xl sm:text-5xl font-black font-serif text-brand-navy">
          Active Humanitarian Campaigns
        </h1>
        <p className="text-sm text-slate-600">
          All donations are eligible for 50% Tax Deduction under Section 80G of the Income Tax Act. Receipts generated instantly.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {campaigns.map((camp) => {
          const pct = Math.min(100, Math.round((camp.raised / camp.goal) * 100));
          return (
            <div 
              key={camp.id}
              className="bg-white rounded-2xl overflow-hidden border border-stone-200 shadow-sm hover:shadow-xl transition flex flex-col justify-between"
            >
              <div>
                <img src={camp.image} alt={camp.title} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold text-amber-800 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded">
                      80G Certified
                    </span>
                    <span className="text-xs font-semibold text-slate-500">
                      {camp.donorsCount} Donors Joined
                    </span>
                  </div>

                  <h3 className="font-bold text-base font-serif text-slate-900 leading-snug">
                    {camp.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                    {camp.subtitle}
                  </p>

                  <div className="mt-5 space-y-2">
                    <div className="flex justify-between text-xs font-semibold">
                      <span className="text-brand-navy font-bold">
                        Raised: ₹{camp.raised.toLocaleString('en-IN')}
                      </span>
                      <span className="text-brand-saffron font-bold">{pct}%</span>
                    </div>
                    <div className="w-full h-2.5 bg-stone-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-amber-500 to-brand-saffron rounded-full transition-all duration-500"
                        style={{ width: `${pct}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-[11px] text-slate-400">
                      <span>Goal: ₹{camp.goal.toLocaleString('en-IN')}</span>
                      <span>Verified Impact</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0">
                <button
                  onClick={() => onOpenDonateModal && onOpenDonateModal(camp)}
                  className="w-full bg-brand-navy hover:bg-brand-navy-light text-white font-bold py-3 rounded-xl text-xs flex items-center justify-center space-x-2 shadow-md transition"
                >
                  <Heart className="w-4 h-4 fill-current text-amber-400" />
                  <span>Support this Campaign (Donate)</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
