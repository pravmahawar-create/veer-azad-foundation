import React, { useState } from 'react';
import { X, Heart, ShieldCheck, CheckCircle2, Copy, Check, Download } from 'lucide-react';

export default function CampaignModal({ campaign, onClose, onSuccess }) {
  const [amount, setAmount] = useState('1100');
  const [donorName, setDonorName] = useState('');
  const [donorPhone, setDonorPhone] = useState('');
  const [panNumber, setPanNumber] = useState('');
  const [step, setStep] = useState('details'); // 'details' | 'payment' | 'receipt'
  const [copiedUpi, setCopiedUpi] = useState(false);
  const [txnId, setTxnId] = useState('');

  const PRESET_AMOUNTS = ['500', '1100', '2100', '5100', '11000'];
  const UPI_ID = 'veerazadfoundation@sbi';

  const handleProceedPayment = (e) => {
    e.preventDefault();
    if (!donorName || !donorPhone) {
      alert('Please enter your full name and phone number.');
      return;
    }
    setStep('payment');
  };

  const handleConfirmDonation = () => {
    const generatedTxn = 'TXN_VA_' + Math.floor(100000 + Math.random() * 900000);
    setTxnId(generatedTxn);
    setStep('receipt');
    if (onSuccess) onSuccess();
  };

  const handleCopyUPI = () => {
    navigator.clipboard.writeText(UPI_ID);
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl border border-stone-200">
        
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-brand-navy via-brand-navy-light to-brand-navy text-white p-5 flex items-start justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 bg-amber-500/20 px-2 py-0.5 rounded border border-amber-400/30">
              Tax Exempt Under 80G
            </span>
            <h3 className="text-lg font-bold font-serif mt-1 text-white">
              {campaign?.title || 'Contribute to Veer Azad Mission'}
            </h3>
            <p className="text-xs text-stone-300">
              Your contribution creates a verified, direct impact on grassroots families.
            </p>
          </div>
          <button 
            onClick={onClose}
            className="text-stone-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {step === 'details' && (
            <form onSubmit={handleProceedPayment} className="space-y-4">
              {/* Preset Amounts */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Select Donation Amount (₹)
                </label>
                <div className="grid grid-cols-5 gap-2 mb-2">
                  {PRESET_AMOUNTS.map((amt) => (
                    <button
                      type="button"
                      key={amt}
                      onClick={() => setAmount(amt)}
                      className={`py-2 text-xs font-bold rounded-lg border transition ${
                        amount === amt
                          ? 'bg-amber-500 text-white border-amber-600 shadow-sm'
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
                  placeholder="Or enter custom amount in INR"
                  className="w-full text-sm font-semibold border border-stone-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  required
                  min="100"
                />
              </div>

              {/* Donor Name & Contact */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    value={donorName}
                    onChange={(e) => setDonorName(e.target.value)}
                    placeholder="e.g. Ramesh Chandra"
                    className="w-full text-xs border border-stone-300 rounded-lg px-3 py-2 focus:outline-none focus:border-amber-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Mobile Phone *
                  </label>
                  <input
                    type="tel"
                    value={donorPhone}
                    onChange={(e) => setDonorPhone(e.target.value)}
                    placeholder="+91 98765 00000"
                    className="w-full text-xs border border-stone-300 rounded-lg px-3 py-2 focus:outline-none focus:border-amber-500"
                    required
                  />
                </div>
              </div>

              {/* PAN Number for 80G Receipt */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  PAN Number (Optional, for 80G Tax Exemption Certificate)
                </label>
                <input
                  type="text"
                  value={panNumber}
                  onChange={(e) => setPanNumber(e.target.value.toUpperCase())}
                  placeholder="ABCDE1234F"
                  maxLength={10}
                  className="w-full text-xs uppercase font-mono border border-stone-300 rounded-lg px-3 py-2 focus:outline-none focus:border-amber-500"
                />
                <span className="text-[10px] text-slate-500">
                  Donations are 50% tax exempt under Section 80G of the Indian Income Tax Act.
                </span>
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full bg-brand-saffron hover:bg-brand-saffron-dark text-white font-bold py-2.5 rounded-lg shadow-md flex items-center justify-center space-x-2 text-sm transition"
                >
                  <Heart className="w-4 h-4 fill-current" />
                  <span>Proceed to Donate ₹{amount}</span>
                </button>
              </div>
            </form>
          )}

          {step === 'payment' && (
            <div className="space-y-4 text-center">
              <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl">
                <span className="text-xs text-amber-800 font-semibold">Total Contribution:</span>
                <div className="text-3xl font-black text-brand-navy my-1 font-serif">
                  ₹{Number(amount).toLocaleString('en-IN')}
                </div>
                <p className="text-xs text-slate-600">
                  Donor: <b className="text-slate-800">{donorName}</b> ({donorPhone})
                </p>
              </div>

              {/* Simulated UPI QR */}
              <div className="flex flex-col items-center p-4 bg-white border border-stone-200 rounded-xl shadow-sm">
                <div className="w-40 h-40 bg-stone-100 border-2 border-dashed border-stone-400 rounded-lg flex flex-col items-center justify-center p-2 mb-2">
                  <div className="text-2xl font-black text-slate-400">UPI QR</div>
                  <div className="text-[10px] text-slate-500 mt-1">Scan via GPay / PhonePe / Paytm</div>
                  <div className="text-[11px] font-mono font-bold text-brand-navy mt-2">
                    veerazadfoundation@sbi
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <span className="text-xs font-mono font-bold text-slate-700">{UPI_ID}</span>
                  <button 
                    onClick={handleCopyUPI}
                    className="p-1 rounded hover:bg-stone-100 text-stone-600"
                    title="Copy UPI ID"
                  >
                    {copiedUpi ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setStep('details')}
                  className="w-1/3 py-2 text-xs font-semibold text-slate-600 hover:bg-stone-100 rounded-lg border border-stone-300"
                >
                  Back
                </button>
                <button
                  onClick={handleConfirmDonation}
                  className="w-2/3 py-2 text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg shadow flex items-center justify-center space-x-1"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>I Have Paid (Confirm & Get Receipt)</span>
                </button>
              </div>
            </div>
          )}

          {step === 'receipt' && (
            <div className="space-y-4 text-center">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-lg font-bold text-slate-900 font-serif">
                Thank You For Your Noble Donation!
              </h4>
              <p className="text-xs text-slate-600">
                Your donation of <b className="text-emerald-700 font-bold">₹{amount}</b> has been received with reference <span className="font-mono font-bold text-slate-800">{txnId}</span>.
              </p>

              {/* Simulated 80G Receipt Card */}
              <div className="p-4 bg-stone-50 border border-stone-300 rounded-xl text-left text-xs space-y-1.5 font-mono">
                <div className="font-bold text-slate-900 text-center border-b pb-1 font-serif">
                  VEER AZAD CHARITABLE FOUNDATION (80G RECEIPT)
                </div>
                <div>Receipt No: <span className="text-slate-800">REC-2026-{Math.floor(1000 + Math.random()*9000)}</span></div>
                <div>Donor: <span className="text-slate-800">{donorName}</span></div>
                {panNumber && <div>PAN: <span className="text-slate-800">{panNumber}</span></div>}
                <div>Amount: <span className="text-emerald-700 font-bold">₹{amount} (Paid Online)</span></div>
                <div>Exemption: <span className="text-slate-800">50% Exempt u/s 80G Income Tax Act</span></div>
                <div className="text-[10px] text-slate-500 pt-1">
                  Registered under Indian Trust Act 1882. NITI Aayog: UP/2026/03912.
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={onClose}
                  className="w-full bg-brand-navy hover:bg-brand-navy-light text-white font-bold py-2 rounded-lg text-xs"
                >
                  Close & Return to Portal
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
