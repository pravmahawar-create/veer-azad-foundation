import React, { useState } from 'react';
import { 
  Heart, Users, Award, ShieldCheck, ArrowRight, CheckCircle2, 
  Search, BookOpen, Stethoscope, HandHeart, Scale, Sparkles 
} from 'lucide-react';
import { FOUNDATION_WINGS, CAMPAIGNS } from '../data/mockDatabase';

export default function Home({ setActivePage, onOpenDonateModal, onSelectMemberForCert }) {
  const [quickCertNo, setQuickCertNo] = useState('');

  const handleQuickVerify = (e) => {
    e.preventDefault();
    if (!quickCertNo.trim()) return;
    setActivePage('verify');
    window.location.hash = `verify?cert=${encodeURIComponent(quickCertNo.trim())}`;
  };

  return (
    <div className="w-full space-y-16 pb-16">
      
      {/* 1. HERO SECTION */}
      <section className="relative bg-gradient-to-br from-brand-navy-dark via-brand-navy to-slate-900 text-white py-16 sm:py-24 px-4 sm:px-8 overflow-hidden">
        {/* Subtle background graphics */}
        <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-10 pointer-events-none overflow-hidden">
          <img src="./assets/ghats_watermark.png" alt="Ghats" className="w-full h-full object-cover filter contrast-125" />
        </div>
        <div className="absolute -left-12 -bottom-12 w-80 h-80 rounded-full bg-brand-gold/10 blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center space-x-2 bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Together For A Better Tomorrow</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black font-serif leading-tight text-white tracking-tight">
              Empowering Communities Through{' '}
              <span className="text-amber-400 underline decoration-brand-saffron underline-offset-8">
                Education, Health
              </span>{' '}
              & Social Justice
            </h1>

            <p className="text-sm sm:text-base text-stone-300 leading-relaxed max-w-2xl">
              Veer Azad Charitable Foundation operates active welfare wings across Uttar Pradesh and national blocks. Join thousands of dedicated volunteers, apply for official membership, or contribute with 100% verified tax exemption.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => setActivePage('membership')}
                className="bg-brand-saffron hover:bg-brand-saffron-dark text-white font-bold text-sm px-6 py-3.5 rounded-xl shadow-lg hover:shadow-orange-500/25 flex items-center space-x-2 transition transform hover:-translate-y-0.5"
              >
                <Users className="w-4 h-4" />
                <span>APPLY FOR MEMBERSHIP</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>

              <button
                onClick={() => onOpenDonateModal && onOpenDonateModal(CAMPAIGNS[0])}
                className="bg-brand-gold hover:bg-amber-400 text-slate-950 font-black text-sm px-6 py-3.5 rounded-xl shadow-lg flex items-center space-x-2 transition transform hover:-translate-y-0.5"
              >
                <Heart className="w-4 h-4 fill-current text-slate-950" />
                <span>DONATE (80G BENEFIT)</span>
              </button>

              <button
                onClick={() => setActivePage('verify')}
                className="bg-white/10 hover:bg-white/20 text-white font-semibold text-sm px-5 py-3.5 rounded-xl border border-white/20 backdrop-blur-sm transition"
              >
                <span>Verify Certificate</span>
              </button>
            </div>

            {/* Credibility badges */}
            <div className="pt-4 border-t border-slate-700/80 flex flex-wrap items-center gap-4 text-xs text-stone-300">
              <span className="flex items-center space-x-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Trust Act 1882 Regd.</span>
              </span>
              <span className="flex items-center space-x-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>NITI Aayog Darpan: UP/2026/03912</span>
              </span>
              <span className="flex items-center space-x-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Section 80G & 12A Certified</span>
              </span>
            </div>
          </div>

          {/* Right Column: Interactive Certificate Preview Card */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-md bg-stone-100 rounded-2xl p-4 shadow-2xl border-4 border-amber-400/80 transform hover:scale-[1.01] transition duration-300">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-stone-300 text-slate-800 text-xs">
                <span className="font-bold font-serif text-brand-navy">Official Membership Certificate</span>
                <span className="bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded text-[10px]">
                  VERIFIED SAMPLE
                </span>
              </div>

              {/* Sample Certificate Image thumbnail */}
              <div className="relative rounded-lg overflow-hidden border border-stone-300 bg-white group cursor-pointer"
                   onClick={() => setActivePage('verify')}>
                <img 
                  src="./assets/veerazad_sample.jpg" 
                  alt="Veer Azad Certificate Sample" 
                  className="w-full h-56 object-cover object-top"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = './assets/gold_medallion.png';
                  }}
                />
                <div className="absolute inset-0 bg-brand-navy/60 opacity-0 group-hover:opacity-100 transition flex items-center justify-center text-white text-xs font-bold space-x-2">
                  <Award className="w-4 h-4 text-amber-300" />
                  <span>Click to Test Live Certificate Studio</span>
                </div>
              </div>

              <div className="mt-3 text-center">
                <p className="text-xs text-slate-600">
                  Instant QR verification, Chairman signature, and gold foil medallion seal for all accredited members.
                </p>
                <button
                  onClick={() => setActivePage('verify')}
                  className="mt-2 text-xs font-bold text-brand-navy hover:text-amber-700 underline underline-offset-2"
                >
                  Verify Certificate Online (Reg No: 473718) →
                </button>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 2. LIVE IMPACT METRICS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-200 text-center hover:shadow-md transition">
            <div className="text-3xl sm:text-4xl font-black text-brand-navy font-serif">5,200+</div>
            <div className="text-xs font-bold text-amber-700 uppercase tracking-wider mt-1">Students Educated</div>
            <p className="text-xs text-slate-500 mt-1">Free school kits, books & digital learning tools.</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-200 text-center hover:shadow-md transition">
            <div className="text-3xl sm:text-4xl font-black text-brand-saffron font-serif">14,500+</div>
            <div className="text-xs font-bold text-amber-700 uppercase tracking-wider mt-1">Free Ration Kits</div>
            <p className="text-xs text-slate-500 mt-1">Distributed to marginalized families across districts.</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-200 text-center hover:shadow-md transition">
            <div className="text-3xl sm:text-4xl font-black text-emerald-700 font-serif">84+</div>
            <div className="text-xs font-bold text-amber-700 uppercase tracking-wider mt-1">Health & Eye Camps</div>
            <p className="text-xs text-slate-500 mt-1">Free diagnostic tests, spectacles & essential medicines.</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-200 text-center hover:shadow-md transition">
            <div className="text-3xl sm:text-4xl font-black text-slate-900 font-serif">1,850+</div>
            <div className="text-xs font-bold text-amber-700 uppercase tracking-wider mt-1">Active Volunteers</div>
            <p className="text-xs text-slate-500 mt-1">Mobilized across urban and rural local blocks.</p>
          </div>

        </div>
      </section>

      {/* 3. FOUNDATION WINGS (विशिष्ट प्रकोष्ठ) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs font-bold text-brand-saffron uppercase tracking-widest bg-orange-50 px-3 py-1 rounded-full border border-orange-200">
            Our Core Pillars
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold font-serif text-brand-navy mt-2">
            Foundation Wings & Divisions
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-2">
            Every member is appointed under a specialized wing to lead grassroots change.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {FOUNDATION_WINGS.map((wing, idx) => {
            const icons = [
              <HandHeart key="1" className="w-6 h-6 text-pink-600" />,
              <Users key="2" className="w-6 h-6 text-brand-saffron" />,
              <Stethoscope key="3" className="w-6 h-6 text-emerald-600" />,
              <BookOpen key="4" className="w-6 h-6 text-blue-600" />,
              <Scale key="5" className="w-6 h-6 text-amber-600" />
            ];
            return (
              <div 
                key={wing.id}
                className="bg-white p-5 rounded-xl border border-stone-200 shadow-sm hover:shadow-md hover:border-amber-400 transition flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-stone-50 border border-stone-200 flex items-center justify-center mb-3">
                    {icons[idx % icons.length]}
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm font-serif">{wing.name}</h3>
                  <span className="text-[11px] font-semibold text-amber-800">{wing.hindi}</span>
                  <p className="text-xs text-slate-500 mt-2 leading-relaxed">{wing.description}</p>
                </div>
                <div className="pt-4 mt-2 border-t border-stone-100">
                  <button
                    onClick={() => setActivePage('membership')}
                    className="text-xs font-bold text-brand-navy hover:text-brand-saffron flex items-center space-x-1"
                  >
                    <span>Join Wing</span>
                    <span>→</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. ACTIVE CAMPAIGNS (Real Funding Bars & Instant Donation) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
          <div>
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Urgent Relief Campaigns
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-serif text-brand-navy mt-2">
              Ongoing Welfare Drives
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Direct assistance with transparent donation tracking and 80G tax certificates.
            </p>
          </div>
          <button
            onClick={() => setActivePage('campaigns')}
            className="mt-4 md:mt-0 text-xs font-bold text-brand-navy hover:text-amber-700 underline"
          >
            View All Campaigns →
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CAMPAIGNS.map((camp) => {
            const pct = Math.min(100, Math.round((camp.raised / camp.goal) * 100));
            return (
              <div 
                key={camp.id}
                className="bg-white rounded-2xl overflow-hidden border border-stone-200 shadow-sm hover:shadow-lg transition flex flex-col justify-between"
              >
                <div>
                  <img src={camp.image} alt={camp.title} className="w-full h-44 object-cover" />
                  <div className="p-5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                      80G Tax Exempt
                    </span>
                    <h3 className="font-bold text-slate-900 text-sm font-serif mt-2 line-clamp-2">
                      {camp.title}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                      {camp.subtitle}
                    </p>

                    {/* Progress Bar */}
                    <div className="mt-4 space-y-1.5">
                      <div className="flex justify-between text-xs font-semibold">
                        <span className="text-slate-800">Raised: ₹{camp.raised.toLocaleString('en-IN')}</span>
                        <span className="text-amber-700">{pct}%</span>
                      </div>
                      <div className="w-full h-2 bg-stone-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-amber-500 to-brand-saffron rounded-full transition-all duration-500"
                          style={{ width: `${pct}%` }}
                        ></div>
                      </div>
                      <div className="text-[11px] text-slate-400 text-right">
                        Target: ₹{camp.goal.toLocaleString('en-IN')}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <button
                    onClick={() => onOpenDonateModal && onOpenDonateModal(camp)}
                    className="w-full bg-brand-navy hover:bg-brand-navy-light text-white font-bold py-2.5 rounded-xl text-xs flex items-center justify-center space-x-1.5 shadow transition"
                  >
                    <Heart className="w-3.5 h-3.5 fill-current text-amber-400" />
                    <span>Donate to this Campaign</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. QUICK CERTIFICATE VERIFICATION WIDGET */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="bg-gradient-to-r from-amber-500 via-amber-600 to-brand-gold rounded-3xl p-8 sm:p-12 shadow-xl text-white">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <span className="text-xs font-black uppercase tracking-widest bg-white/20 px-3 py-1 rounded-full text-slate-900">
              Trust & Transparency Engine
            </span>
            <h2 className="text-2xl sm:text-4xl font-black font-serif text-slate-950">
              Verify Any Issued Certificate Instantly
            </h2>
            <p className="text-xs sm:text-sm text-slate-900 font-medium">
              Every official certificate issued by Veer Azad Charitable Foundation features an anti-tamper QR code and serial registry. Verify authenticity in under 2 seconds.
            </p>

            <form onSubmit={handleQuickVerify} className="max-w-xl mx-auto flex items-center bg-white rounded-2xl p-1.5 shadow-2xl">
              <Search className="w-5 h-5 text-slate-400 ml-3 mr-2" />
              <input
                type="text"
                value={quickCertNo}
                onChange={(e) => setQuickCertNo(e.target.value)}
                placeholder="Enter Registration No. (e.g. 473718)"
                className="w-full text-xs sm:text-sm font-semibold text-slate-900 px-2 py-2 focus:outline-none"
              />
              <button
                type="submit"
                className="bg-brand-navy hover:bg-brand-navy-light text-white font-bold text-xs px-5 py-3 rounded-xl transition flex-shrink-0"
              >
                VERIFY NOW
              </button>
            </form>

            <div className="flex flex-wrap items-center justify-center gap-3 text-[11px] text-slate-900 font-semibold pt-2">
              <span>Try sample: </span>
              <button 
                onClick={() => {
                  setQuickCertNo('473718');
                  setActivePage('verify');
                  window.location.hash = 'verify?cert=473718';
                }}
                className="underline hover:text-black font-bold"
              >
                473718 (Ms SHAHNAJ)
              </button>
              <span>•</span>
              <button 
                onClick={() => {
                  setQuickCertNo('473719');
                  setActivePage('verify');
                  window.location.hash = 'verify?cert=473719';
                }}
                className="underline hover:text-black font-bold"
              >
                473719 (GURPREET SINGH)
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
