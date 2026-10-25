import React from 'react';
import { 
  Heart, Shield, Mail, Phone, MapPin, Award, 
  ExternalLink, ArrowUpRight, CheckCircle2 
} from 'lucide-react';

export default function Footer({ setActivePage }) {
  return (
    <footer className="bg-brand-navy-dark text-slate-300 text-sm pt-14 pb-8 border-t-4 border-brand-gold">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Top 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          
          {/* Col 1: Brand & Credibility */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-full p-1 bg-white border-2 border-brand-gold flex items-center justify-center">
                <img 
                  src="./assets/va_monogram_seal.png" 
                  alt="Veer Azad Logo" 
                  className="w-full h-full object-contain rounded-full"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = './assets/logo_badge.png';
                  }}
                />
              </div>
              <div>
                <h3 className="font-serif font-black text-white text-lg tracking-wide uppercase">
                  Veer Azad
                </h3>
                <p className="text-xs text-amber-400 font-semibold tracking-wider">
                  CHARITABLE FOUNDATION
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              Dedicated to national unity, women empowerment, health awareness, youth education, and grassroots upliftment across India. Registered non-profit committed to 100% ethical transparency.
            </p>

            <div className="flex flex-wrap gap-2 pt-2">
              <span className="inline-flex items-center space-x-1 bg-slate-900 border border-slate-700 text-amber-300 text-[11px] px-2.5 py-1 rounded">
                <Shield className="w-3 h-3 text-emerald-400" />
                <span>NITI Aayog: UP/2026/03912</span>
              </span>
              <span className="inline-flex items-center space-x-1 bg-slate-900 border border-slate-700 text-amber-300 text-[11px] px-2.5 py-1 rounded">
                <Award className="w-3 h-3 text-amber-400" />
                <span>80G & 12A Certified</span>
              </span>
            </div>
          </div>

          {/* Col 2: Wings & Programs */}
          <div>
            <h4 className="text-white font-bold font-serif text-base mb-4 pb-1 border-b border-slate-700 flex items-center justify-between">
              <span>Foundation Wings</span>
              <span className="text-brand-saffron text-xs">विभाग</span>
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => setActivePage('wings')} className="hover:text-amber-300 transition flex items-center space-x-1.5">
                  <span className="text-amber-500">›</span>
                  <span>Women Empowerment Wing (महिला प्रकोष्ठ)</span>
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('wings')} className="hover:text-amber-300 transition flex items-center space-x-1.5">
                  <span className="text-amber-500">›</span>
                  <span>Youth Leadership Wing (युवा शक्ति)</span>
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('wings')} className="hover:text-amber-300 transition flex items-center space-x-1.5">
                  <span className="text-amber-500">›</span>
                  <span>Education & Health (शिक्षा एवं स्वास्थ्य)</span>
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('wings')} className="hover:text-amber-300 transition flex items-center space-x-1.5">
                  <span className="text-amber-500">›</span>
                  <span>Social Welfare & Relief (सामाजिक कल्याण)</span>
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('wings')} className="hover:text-amber-300 transition flex items-center space-x-1.5">
                  <span className="text-amber-500">›</span>
                  <span>Legal Counseling (विधिक सहायता)</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Quick Portals & Verification */}
          <div>
            <h4 className="text-white font-bold font-serif text-base mb-4 pb-1 border-b border-slate-700 flex items-center justify-between">
              <span>Online Portals</span>
              <span className="text-brand-gold text-xs">सेवाएं</span>
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => setActivePage('verify')} className="hover:text-amber-300 transition flex items-center space-x-1.5 text-amber-400 font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Verify Issued Certificate (ऑनलाइन जांच)</span>
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('resources')} className="hover:text-amber-300 transition flex items-center space-x-1.5 text-emerald-400 font-semibold">
                  <Shield className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Statutory Resources & 80G (दस्तावेज़ एवं प्रमाण पत्र)</span>
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('membership')} className="hover:text-amber-300 transition flex items-center space-x-1.5">
                  <span className="text-amber-500">›</span>
                  <span>Apply for Membership (सदस्यता फॉर्म)</span>
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('volunteer')} className="hover:text-amber-300 transition flex items-center space-x-1.5">
                  <span className="text-amber-500">›</span>
                  <span>Volunteer Registration (स्वयंसेवक जुड़ें)</span>
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('donate')} className="hover:text-amber-300 transition flex items-center space-x-1.5">
                  <span className="text-amber-500">›</span>
                  <span>Donate with 80G Tax Exemption (दान करें)</span>
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('admin')} className="hover:text-amber-300 transition flex items-center space-x-1.5 text-stone-400">
                  <span className="text-stone-500">›</span>
                  <span>Admin & Executive Login</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Registered Office & Contact */}
          <div>
            <h4 className="text-white font-bold font-serif text-base mb-4 pb-1 border-b border-slate-700 flex items-center justify-between">
              <span>Registered Office</span>
              <span className="text-brand-saffron text-xs">संपर्क</span>
            </h4>
            <div className="space-y-3 text-xs text-slate-300">
              <div className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-brand-gold flex-shrink-0 mt-0.5" />
                <span>
                  Veer Azad Charitable Foundation<br />
                  Head Office: Varanasi Ghat Division, Varanasi - 221001, Uttar Pradesh, India
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-brand-saffron flex-shrink-0" />
                <span>Helpline: +91 98183 98199</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>info@veerazadfoundation.org</span>
              </div>
              <div className="pt-2">
                <button 
                  onClick={() => setActivePage('donate')}
                  className="w-full bg-gradient-to-r from-brand-gold to-amber-600 hover:from-amber-500 hover:to-amber-700 text-slate-950 font-bold py-2 rounded-md shadow flex items-center justify-center space-x-1.5 transition text-xs"
                >
                  <Heart className="w-3.5 h-3.5 fill-current" />
                  <span>SUPPORT OUR NOBLE MISSION</span>
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Copyright & Disclaimer */}
        <div className="pt-8 border-t border-slate-800 text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} Veer Azad Charitable Foundation. All Rights Reserved.</p>
          <div className="flex items-center space-x-4">
            <span className="hover:text-slate-400">Privacy Policy</span>
            <span>•</span>
            <span className="hover:text-slate-400">Terms of Membership</span>
            <span>•</span>
            <span className="hover:text-slate-400">80G Exemption Guidelines</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
