import React, { useState } from 'react';
import { Heart, ShieldCheck, CheckCircle2, Award, Download, Copy, Check } from 'lucide-react';

export default function Donate() {
  const [amount, setAmount] = useState('2100');
  const [purpose, setPurpose] = useState('Child Education & School Kits');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [pan, setPan] = useState('');
  const [address, setAddress] = useState('');
  const [success, setSuccess] = useState(false);
  const [txnRef, setTxnRef] = useState('');

  const PRESETS = ['500', '1100', '2100', '5100', '11000', '25000'];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!fullName || !phone) {
      alert('Please enter your full name and phone number.');
      return;
    }
    const ref = 'VACF-TXN-' + Math.floor(100000 + Math.random() * 900000);
    setTxnRef(ref);
    setSuccess(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12 space-y-12">
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-bold text-brand-gold uppercase tracking-widest bg-amber-50 px-3 py-1 rounded-full border border-amber-300">
          Noble Giving • 80G Certified
        </span>
        <h1 className="text-3xl sm:text-5xl font-black font-serif text-brand-navy">
          Support Veer Azad Charitable Foundation
        </h1>
        <p className="text-sm text-slate-600">
          Your donation helps provide school kits to underprivileged kids, run free rural medical vans, and feed marginalized families. 50% tax exemption under Section 80G.
        </p>
      </div>

      {!success ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Form */}
          <div className="lg:col-span-7 bg-white p-8 rounded-2xl shadow-xl border border-stone-200">
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Purpose Selector */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Select Cause / Purpose *
                </label>
                <select
                  value={purpose}
                  onChange={(e) => setPurpose(e.target.value)}
                  className="w-full text-xs font-semibold border border-stone-300 rounded-lg px-3 py-2.5 focus:outline-none focus:border-amber-500"
                >
                  <option value="Child Education & School Kits">Shiksha Jyoti: Child Education & School Kits</option>
                  <option value="Free Rural Medical Camp & Eye Checkups">Arogya Sarv: Free Medical Camp & Eye Checkups</option>
                  <option value="Women Tailoring & Micro-Enterprise">Swavalamban: Women Tailoring & Micro-Enterprise</option>
                  <option value="Annapurna Free Rations & Meals">Annapurna: Free Food & Ration Kits</option>
                  <option value="General Foundation Corpus Fund">General Foundation Corpus & Emergency Relief</option>
                </select>
              </div>

              {/* Amount Presets */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Choose Donation Amount (INR) *
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mb-2">
                  {PRESETS.map((amt) => (
                    <button
                      type="button"
                      key={amt}
                      onClick={() => setAmount(amt)}
                      className={`py-2 text-xs font-bold rounded-lg border transition ${
                        amount === amt
                          ? 'bg-amber-500 text-white border-amber-600 shadow'
                          : 'bg-stone-50 hover:bg-stone-100 text-slate-700 border-stone-300'
                      }`}
                    >
                      ₹{amt}
                    </button>
                  ))}
                </div>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Custom amount in ₹"
                  min="100"
                  className="w-full text-sm font-semibold border border-stone-300 rounded-lg px-3 py-2.5 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  required
                />
              </div>

              {/* Donor Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Anand Kumar"
                    className="w-full text-xs border border-stone-300 rounded-lg px-3 py-2.5 focus:outline-none focus:border-amber-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Mobile Phone *
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98765 00000"
                    className="w-full text-xs border border-stone-300 rounded-lg px-3 py-2.5 focus:outline-none focus:border-amber-500"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="anand@example.com"
                    className="w-full text-xs border border-stone-300 rounded-lg px-3 py-2.5 focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    PAN Number (For 80G Tax Exemption)
                  </label>
                  <input
                    type="text"
                    value={pan}
                    onChange={(e) => setPan(e.target.value.toUpperCase())}
                    placeholder="ABCDE1234F"
                    maxLength={10}
                    className="w-full text-xs uppercase font-mono border border-stone-300 rounded-lg px-3 py-2.5 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Residential Address
                </label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Street, City, State, PIN"
                  className="w-full text-xs border border-stone-300 rounded-lg px-3 py-2.5 focus:outline-none focus:border-amber-500"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-brand-saffron hover:bg-brand-saffron-dark text-white font-bold py-3.5 rounded-xl text-sm flex items-center justify-center space-x-2 shadow-lg transition"
              >
                <Heart className="w-4 h-4 fill-current" />
                <span>Complete Contribution of ₹{Number(amount).toLocaleString('en-IN')}</span>
              </button>
            </form>
          </div>

          {/* Right Column: Bank Details & Transparency */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-brand-navy text-white p-6 rounded-2xl shadow-xl border border-slate-700">
              <h3 className="font-bold text-base font-serif text-amber-300 pb-2 border-b border-slate-700">
                Official Bank Account for Direct RTGS/NEFT
              </h3>
              <div className="space-y-2.5 text-xs text-stone-200 mt-4 font-mono">
                <div>Account Name: <b className="text-white">VEER AZAD CHARITABLE FOUNDATION</b></div>
                <div>Bank Name: <b className="text-white">State Bank of India (SBI)</b></div>
                <div>Account Number: <b className="text-amber-300 font-bold">41098239019</b></div>
                <div>IFSC Code: <b className="text-amber-300 font-bold">SBIN0000210</b></div>
                <div>Branch: <b className="text-white">Main Branch, Varanasi</b></div>
                <div>UPI ID: <b className="text-amber-400">veerazadfoundation@sbi</b></div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-700 text-xs text-stone-300 space-y-1">
                <div className="flex items-center space-x-1 text-emerald-400 font-semibold">
                  <ShieldCheck className="w-4 h-4" />
                  <span>100% Tax Deductible under Sec 80G</span>
                </div>
                <p className="text-[11px] text-stone-400">
                  Receipts with foundation registration and PAN details are generated immediately for filing with ITR.
                </p>
              </div>
            </div>

            <div className="bg-amber-50 border border-amber-200 p-6 rounded-2xl">
              <h4 className="font-bold text-sm font-serif text-amber-900 mb-2">
                Why Donate to Veer Azad?
              </h4>
              <ul className="text-xs text-amber-950 space-y-2">
                <li className="flex items-start space-x-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span>Zero administrative overhead on public donations — 100% reaches the ground.</span>
                </li>
                <li className="flex items-start space-x-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span>Audited quarterly reports published openly for donor verification.</span>
                </li>
                <li className="flex items-start space-x-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span>Government recognized under NITI Aayog NGO Darpan scheme.</span>
                </li>
              </ul>
            </div>
          </div>

        </div>
      ) : (
        <div className="max-w-xl mx-auto bg-white p-8 rounded-2xl shadow-2xl border border-stone-200 text-center space-y-4">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h2 className="text-2xl font-bold font-serif text-slate-900">
            Contribution Successful!
          </h2>
          <p className="text-xs text-slate-600">
            Thank you, <b className="text-slate-900">{fullName}</b>. Your donation of <b className="text-emerald-700">₹{amount}</b> towards <span className="font-semibold">{purpose}</span> has been confirmed.
          </p>

          <div className="bg-stone-50 border border-stone-200 rounded-xl p-4 text-left font-mono text-xs space-y-1">
            <div className="font-bold text-center border-b pb-1 font-serif text-slate-900">
              OFFICIAL 80G DONATION RECEIPT
            </div>
            <div>Ref No: <span className="text-slate-800 font-bold">{txnRef}</span></div>
            <div>Donor: <span className="text-slate-800">{fullName}</span></div>
            <div>Phone: <span className="text-slate-800">{phone}</span></div>
            {pan && <div>PAN: <span className="text-slate-800">{pan}</span></div>}
            <div>Amount: <span className="text-emerald-700 font-bold">₹{amount}</span></div>
            <div>Cause: <span className="text-slate-800">{purpose}</span></div>
            <div>Status: <span className="text-emerald-600 font-bold">SUCCESS (CONFIRMED)</span></div>
          </div>

          <button
            onClick={() => setSuccess(false)}
            className="w-full bg-brand-navy hover:bg-brand-navy-light text-white font-bold py-2.5 rounded-xl text-xs"
          >
            Make Another Donation
          </button>
        </div>
      )}
    </div>
  );
}
