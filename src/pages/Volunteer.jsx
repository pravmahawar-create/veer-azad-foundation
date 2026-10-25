import React, { useState } from 'react';
import { Heart, Users, Sparkles, CheckCircle2, Award, ArrowRight } from 'lucide-react';
import { FOUNDATION_WINGS, getStoredVolunteers, saveVolunteers } from '../data/mockDatabase';
import CertificateCanvas from '../components/CertificateCanvas';

export default function Volunteer({ setActivePage }) {
  const [submitted, setSubmitted] = useState(false);
  const [createdVolunteer, setCreatedVolunteer] = useState(null);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    location: 'Varanasi',
    skills: 'Teaching, Field Relief & Organization',
    preferredWing: FOUNDATION_WINGS[0].name,
    availability: 'Weekends (8-10 Hours)'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone) {
      alert('Please provide your name and phone number.');
      return;
    }

    const refNo = 'VOL2026' + Math.floor(1000 + Math.random() * 9000);
    const newVol = {
      id: 'vol_' + Date.now(),
      refNo: refNo,
      fullName: formData.fullName.toUpperCase(),
      email: formData.email,
      phone: formData.phone,
      location: formData.location,
      skills: formData.skills,
      preferredWing: formData.preferredWing,
      availability: formData.availability,
      status: 'Approved',
      certificateIssued: true,
      certificateNo: `VACF-VOL-2026-${refNo}`
    };

    const currentVols = getStoredVolunteers();
    saveVolunteers([newVol, ...currentVols]);

    setCreatedVolunteer(newVol);
    setSubmitted(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12 space-y-12">
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-bold text-brand-saffron uppercase tracking-widest bg-orange-50 px-3 py-1 rounded-full border border-orange-200">
          Serve The Nation
        </span>
        <h1 className="text-3xl sm:text-5xl font-black font-serif text-brand-navy">
          Become A Veer Azad Volunteer
        </h1>
        <p className="text-sm text-slate-600">
          Lend your passion, skills and weekend time to organize health camps, child teaching, and humanitarian relief drives.
        </p>
      </div>

      {!submitted ? (
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-xl border border-stone-200">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Your Full Name *
              </label>
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                placeholder="e.g. Rahul Sharma"
                className="w-full text-xs font-semibold border border-stone-300 rounded-lg px-3 py-2.5 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                  placeholder="rahul@example.com"
                  className="w-full text-xs border border-stone-300 rounded-lg px-3 py-2.5 focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Your City / District *
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="e.g. Varanasi, Lucknow, Delhi"
                  className="w-full text-xs border border-stone-300 rounded-lg px-3 py-2.5 focus:outline-none focus:border-amber-500"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Preferred Wing *
                </label>
                <select
                  value={formData.preferredWing}
                  onChange={(e) => setFormData({ ...formData, preferredWing: e.target.value })}
                  className="w-full text-xs border border-stone-300 rounded-lg px-3 py-2.5 focus:outline-none focus:border-amber-500"
                >
                  {FOUNDATION_WINGS.map((w) => (
                    <option key={w.id} value={w.name}>{w.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Your Skills / Profession
              </label>
              <input
                type="text"
                value={formData.skills}
                onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                placeholder="e.g. Doctor, Teacher, Web Developer, Social Worker"
                className="w-full text-xs border border-stone-300 rounded-lg px-3 py-2.5 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className="w-full bg-brand-saffron hover:bg-brand-saffron-dark text-white font-bold py-3 rounded-xl text-xs flex items-center justify-center space-x-2 shadow-lg transition"
              >
                <Sparkles className="w-4 h-4" />
                <span>Submit Free Volunteer Enrollment</span>
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="space-y-8">
          <div className="bg-amber-50 border border-amber-300 rounded-2xl p-6 text-center max-w-2xl mx-auto shadow-sm">
            <h3 className="text-xl font-bold font-serif text-brand-navy">
              Welcome to the Volunteer Corps, {createdVolunteer?.fullName}!
            </h3>
            <p className="text-xs text-slate-600 mt-1">
              Your enrollment has been approved. Your Volunteer Reference No. is <span className="font-mono font-bold text-slate-900">{createdVolunteer?.refNo}</span>.
            </p>
          </div>

          <CertificateCanvas 
            member={{
              fullName: createdVolunteer.fullName,
              fatherOrHusbandName: 'Dedicated Volunteer',
              regNo: createdVolunteer.refNo,
              wing: createdVolunteer.preferredWing,
              division: `${createdVolunteer.location} Field Division`,
              approvedDate: new Date().toLocaleDateString('en-GB'),
              certificateNo: createdVolunteer.certificateNo,
              signatory: 'Aditya Agrawal (Chairman)'
            }} 
          />
        </div>
      )}
    </div>
  );
}
