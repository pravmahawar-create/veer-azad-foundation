import React, { useState } from 'react';
import { 
  Users, CheckCircle2, Shield, ArrowRight, Award, 
  CreditCard, Sparkles, Check 
} from 'lucide-react';
import { MEMBERSHIP_PLANS, FOUNDATION_WINGS, saveMembers, getStoredMembers } from '../data/mockDatabase';
import CertificateCanvas from '../components/CertificateCanvas';
import IdCardCanvas from '../components/IdCardCanvas';
import AppointmentLetterCanvas from '../components/AppointmentLetterCanvas';

export default function Membership({ setActivePage, onSelectMemberForCert }) {
  const [step, setStep] = useState(1); // 1: Select Plan | 2: Member Details | 3: Payment & Success
  const [selectedPlan, setSelectedPlan] = useState(MEMBERSHIP_PLANS[4]); // Active Membership (₹2100)
  const [selectedWing, setSelectedWing] = useState(FOUNDATION_WINGS[0].name);
  const [division, setDivision] = useState('Varanasi (U. P.) Division');
  const [formData, setFormData] = useState({
    fullName: '',
    fatherOrHusbandName: '',
    phone: '',
    email: '',
    bloodGroup: 'B+',
    address: ''
  });
  const [createdMember, setCreatedMember] = useState(null);
  const [previewTab, setPreviewTab] = useState('certificate'); // 'certificate' | 'idcard'

  const handleSelectPlan = (plan) => {
    setSelectedPlan(plan);
    setStep(2);
  };

  const handleSubmitApplication = (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone) {
      alert('Please fill all mandatory fields.');
      return;
    }

    const newRegNo = Math.floor(473720 + Math.random() * 5000).toString();
    const newMember = {
      id: 'mem_' + Date.now(),
      regNo: newRegNo,
      fullName: formData.fullName.toUpperCase(),
      fatherOrHusbandName: formData.fatherOrHusbandName,
      email: formData.email,
      phone: formData.phone,
      wing: selectedWing,
      division: division,
      plan: selectedPlan.name,
      fee: selectedPlan.fee,
      paymentStatus: 'Paid',
      paymentMethod: 'ONLINE',
      paymentRef: 'PAY_VA_' + Math.floor(1000000 + Math.random() * 9000000),
      status: 'Approved',
      appliedDate: new Date().toLocaleDateString('en-GB'),
      approvedDate: new Date().toLocaleDateString('en-GB'),
      certificateIssued: true,
      certificateNo: `VACF-MEM-2026-${newRegNo}`,
      signatory: 'Aditya Agrawal (Chairman)',
      bloodGroup: formData.bloodGroup,
      address: formData.address
    };

    // Save to persistence
    const currentMembers = getStoredMembers();
    saveMembers([newMember, ...currentMembers]);

    setCreatedMember(newMember);
    setStep(3);
    if (onSelectMemberForCert) onSelectMemberForCert(newMember);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12 space-y-10">
      
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-bold text-brand-gold uppercase tracking-widest bg-amber-50 px-3 py-1 rounded-full border border-amber-300">
          Official Membership Portal
        </span>
        <h1 className="text-3xl sm:text-5xl font-black font-serif text-brand-navy">
          Join Veer Azad Charitable Foundation
        </h1>
        <p className="text-sm text-slate-600">
          Get accredited as an official office-bearer with dynamic Certificate of Membership, PVC Executive ID Card, and national recognition.
        </p>

        {/* Step Indicator */}
        <div className="flex items-center justify-center space-x-4 pt-4">
          <div className={`flex items-center space-x-2 text-xs font-bold ${step >= 1 ? 'text-brand-navy' : 'text-slate-400'}`}>
            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${step >= 1 ? 'bg-amber-500 text-white' : 'bg-slate-200'}`}>1</span>
            <span>Choose Tier</span>
          </div>
          <span className="text-slate-300">———</span>
          <div className={`flex items-center space-x-2 text-xs font-bold ${step >= 2 ? 'text-brand-navy' : 'text-slate-400'}`}>
            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${step >= 2 ? 'bg-amber-500 text-white' : 'bg-slate-200'}`}>2</span>
            <span>Member Details</span>
          </div>
          <span className="text-slate-300">———</span>
          <div className={`flex items-center space-x-2 text-xs font-bold ${step === 3 ? 'text-brand-navy' : 'text-slate-400'}`}>
            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${step === 3 ? 'bg-emerald-600 text-white' : 'bg-slate-200'}`}>3</span>
            <span>Accredited Certificate</span>
          </div>
        </div>
      </div>

      {/* STEP 1: SELECT MEMBERSHIP TIER */}
      {step === 1 && (
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-xl font-bold font-serif text-slate-900">
              Select Your Designated Membership Category
            </h2>
            <p className="text-xs text-slate-500">Fees contribute directly to foundation drives and ID card processing.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {MEMBERSHIP_PLANS.map((plan) => (
              <div 
                key={plan.id}
                className={`bg-white rounded-2xl p-6 border-2 transition-all flex flex-col justify-between shadow-sm hover:shadow-lg ${
                  plan.id === 'active' 
                    ? 'border-amber-400 ring-2 ring-amber-400/20 bg-gradient-to-b from-amber-50/30 to-white' 
                    : 'border-stone-200 hover:border-amber-300'
                }`}
              >
                <div>
                  {plan.id === 'active' && (
                    <span className="inline-block bg-brand-gold text-slate-950 text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full mb-2">
                      MOST POPULAR • EXECUTIVE TIER
                    </span>
                  )}
                  <h3 className="font-bold text-lg font-serif text-slate-900">{plan.name}</h3>
                  <div className="my-3">
                    <span className="text-3xl font-black text-brand-navy font-serif">₹{plan.fee}</span>
                    <span className="text-xs text-slate-500 font-medium"> / {plan.validity}</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    {plan.description}
                  </p>
                  <ul className="text-xs text-slate-600 space-y-2">
                    <li className="flex items-center space-x-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Official Certificate of Appointment</span>
                    </li>
                    <li className="flex items-center space-x-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Verifiable QR Identification</span>
                    </li>
                    <li className="flex items-center space-x-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Voting & Assembly Attendance Rights</span>
                    </li>
                  </ul>
                </div>

                <div className="pt-6 mt-4 border-t border-stone-100">
                  <button
                    onClick={() => handleSelectPlan(plan)}
                    className={`w-full py-2.5 rounded-xl text-xs font-bold transition flex items-center justify-center space-x-2 ${
                      plan.id === 'active'
                        ? 'bg-brand-navy hover:bg-brand-navy-light text-white shadow-md'
                        : 'bg-stone-100 hover:bg-stone-200 text-slate-800'
                    }`}
                  >
                    <span>Choose {plan.name}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* STEP 2: MEMBER APPLICATION FORM */}
      {step === 2 && (
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-xl border border-stone-200">
          <div className="flex items-center justify-between pb-4 mb-6 border-b border-stone-200">
            <div>
              <span className="text-xs font-bold text-amber-700 uppercase">Selected Plan</span>
              <h3 className="font-bold text-lg font-serif text-brand-navy">
                {selectedPlan.name} (₹{selectedPlan.fee})
              </h3>
            </div>
            <button
              onClick={() => setStep(1)}
              className="text-xs text-brand-navy underline font-semibold"
            >
              Change Tier
            </button>
          </div>

          <form onSubmit={handleSubmitApplication} className="space-y-4">
            {/* Wing & Division Selection */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Designated Foundation Wing *
                </label>
                <select
                  value={selectedWing}
                  onChange={(e) => setSelectedWing(e.target.value)}
                  className="w-full text-xs font-semibold border border-stone-300 rounded-lg px-3 py-2.5 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                >
                  {FOUNDATION_WINGS.map((w) => (
                    <option key={w.id} value={w.name}>
                      {w.name} ({w.hindi})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Assigned Territorial Division *
                </label>
                <input
                  type="text"
                  value={division}
                  onChange={(e) => setDivision(e.target.value)}
                  placeholder="e.g. Varanasi (U. P.) Division"
                  className="w-full text-xs font-semibold border border-stone-300 rounded-lg px-3 py-2.5 focus:outline-none focus:border-amber-500"
                  required
                />
              </div>
            </div>

            {/* Candidate Name & Father/Husband */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Candidate Full Name (As on Certificate) *
                </label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="e.g. Ms SHAHNAJ"
                  className="w-full text-xs border border-stone-300 rounded-lg px-3 py-2.5 focus:outline-none focus:border-amber-500 uppercase font-semibold"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Father's / Husband's Name *
                </label>
                <input
                  type="text"
                  value={formData.fatherOrHusbandName}
                  onChange={(e) => setFormData({ ...formData, fatherOrHusbandName: e.target.value })}
                  placeholder="e.g. Md. Farooq"
                  className="w-full text-xs border border-stone-300 rounded-lg px-3 py-2.5 focus:outline-none focus:border-amber-500"
                  required
                />
              </div>
            </div>

            {/* Contact & Blood Group */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Mobile Number *
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+91 98765 00000"
                  className="w-full text-xs border border-stone-300 rounded-lg px-3 py-2.5 focus:outline-none focus:border-amber-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="name@example.com"
                  className="w-full text-xs border border-stone-300 rounded-lg px-3 py-2.5 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Blood Group
                </label>
                <select
                  value={formData.bloodGroup}
                  onChange={(e) => setFormData({ ...formData, bloodGroup: e.target.value })}
                  className="w-full text-xs border border-stone-300 rounded-lg px-3 py-2.5 focus:outline-none focus:border-amber-500"
                >
                  {['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'].map(bg => (
                    <option key={bg} value={bg}>{bg}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Address */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Full Residential Address
              </label>
              <textarea
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                placeholder="House No, Street, Landmark, District, State, Pincode"
                rows={2}
                className="w-full text-xs border border-stone-300 rounded-lg px-3 py-2 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="pt-4 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="text-xs font-semibold text-slate-600 hover:bg-stone-100 px-4 py-2.5 rounded-lg border border-stone-300"
              >
                Back
              </button>

              <button
                type="submit"
                className="bg-brand-navy hover:bg-brand-navy-light text-white font-bold text-xs px-6 py-3 rounded-lg shadow-lg flex items-center space-x-2"
              >
                <CreditCard className="w-4 h-4 text-amber-300" />
                <span>Submit & Generate Certificate (₹{selectedPlan.fee})</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* STEP 3: INSTANT ACCREDITATION & CERTIFICATE STUDIO */}
      {step === 3 && createdMember && (
        <div className="space-y-8">
          <div className="bg-emerald-50 border border-emerald-300 rounded-2xl p-6 text-center max-w-3xl mx-auto shadow-sm">
            <div className="w-12 h-12 bg-emerald-600 text-white rounded-full flex items-center justify-center mx-auto mb-2">
              <Check className="w-6 h-6 stroke-[3]" />
            </div>
            <h2 className="text-xl font-bold font-serif text-emerald-950">
              Accreditation Approved & Certificate Issued!
            </h2>
            <p className="text-xs text-emerald-800 mt-1">
              Welcome, <span className="font-bold">{createdMember.fullName}</span>. You have been registered under Reg No: <span className="font-mono font-bold">{createdMember.regNo}</span>.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
              <button
                onClick={() => setPreviewTab('certificate')}
                className={`text-xs font-bold px-4 py-2 rounded-lg transition ${
                  previewTab === 'certificate'
                    ? 'bg-brand-navy text-white shadow'
                    : 'bg-white text-slate-700 border border-stone-300'
                }`}
              >
                Official Certificate
              </button>
              <button
                onClick={() => setPreviewTab('appointment')}
                className={`text-xs font-bold px-4 py-2 rounded-lg transition ${
                  previewTab === 'appointment'
                    ? 'bg-brand-navy text-white shadow'
                    : 'bg-white text-slate-700 border border-stone-300'
                }`}
              >
                Appointment Letter (नियुक्ति पत्र)
              </button>
              <button
                onClick={() => setPreviewTab('idcard')}
                className={`text-xs font-bold px-4 py-2 rounded-lg transition ${
                  previewTab === 'idcard'
                    ? 'bg-brand-navy text-white shadow'
                    : 'bg-white text-slate-700 border border-stone-300'
                }`}
              >
                PVC ID Card
              </button>
            </div>
          </div>

          {/* Dynamic Canvas Switcher */}
          {previewTab === 'certificate' && (
            <CertificateCanvas member={createdMember} />
          )}

          {previewTab === 'appointment' && (
            <AppointmentLetterCanvas member={createdMember} />
          )}

          {previewTab === 'idcard' && (
            <div className="flex justify-center">
              <IdCardCanvas member={createdMember} />
            </div>
          )}
        </div>
      )}

    </div>
  );
}
