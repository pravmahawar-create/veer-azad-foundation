import React from 'react';
import { Users, HandHeart, Stethoscope, BookOpen, Scale, ArrowRight, ShieldCheck } from 'lucide-react';
import { FOUNDATION_WINGS } from '../data/mockDatabase';

export default function Wings({ setActivePage }) {
  const wingDetails = [
    {
      ...FOUNDATION_WINGS[0],
      initiatives: [
        'Varanasi & UP Block Self-Help Groups (SHG)',
        'Free Tailoring & Handicraft Training Centers',
        'Legal Rights & Domestic Safety Helpline',
        'Nutrition & Mother-Child Healthcare Seminars'
      ]
    },
    {
      ...FOUNDATION_WINGS[1],
      initiatives: [
        'Disaster Quick Response & Emergency Blood Donation',
        'Youth Leadership & National Pride Summits',
        'Clean Ganga Ghats Environmental Drives',
        'Sports Equipment & Rural Fitness Gyms'
      ]
    },
    {
      ...FOUNDATION_WINGS[2],
      initiatives: [
        'Free Mobile Health Clinic & Diagnostic Camps',
        'Shiksha Jyoti Free Primary School Scholarships',
        'Eye Checkup & Free Cataract Operations',
        'Essential Medicine Banks for Elders'
      ]
    },
    {
      ...FOUNDATION_WINGS[3],
      initiatives: [
        'Slum Rehabilitation & Clean Water Filtration',
        'Winter Blanket & Warm Clothes Distribution Drives',
        'Annapurna Free Meal Kitchens for Migrant Workers',
        'Elderly Support & Pension Assistance'
      ]
    },
    {
      ...FOUNDATION_WINGS[4],
      initiatives: [
        'Pro Bono Legal Representation for Indigent Families',
        'Right to Information (RTI) Citizen Support Desk',
        'Civil Rights & Lok Adalat Dispute Mediation',
        'Anti-Exploitation Legal Awareness Camps'
      ]
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12 space-y-12">
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-bold text-brand-saffron uppercase tracking-widest bg-orange-50 px-3 py-1 rounded-full border border-orange-200">
          Executive Wings
        </span>
        <h1 className="text-3xl sm:text-5xl font-black font-serif text-brand-navy">
          Our Foundation Wings & Divisions
        </h1>
        <p className="text-sm text-slate-600">
          Veer Azad Charitable Foundation operates through structured wings to ensure targeted execution and transparent governance.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {wingDetails.map((wing) => (
          <div 
            key={wing.id}
            className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm hover:shadow-lg transition flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                <h3 className="font-bold text-lg font-serif text-brand-navy">{wing.name}</h3>
                <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                  {wing.hindi}
                </span>
              </div>
              <p className="text-xs text-slate-600 my-3 leading-relaxed">
                {wing.description}
              </p>

              <div className="space-y-1.5 pt-2">
                <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block">
                  Key Ongoing Initiatives:
                </span>
                {wing.initiatives.map((item, i) => (
                  <div key={i} className="flex items-start space-x-2 text-xs text-slate-600">
                    <span className="text-amber-500 font-bold">•</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 mt-4 border-t border-stone-100">
              <button
                onClick={() => setActivePage('membership')}
                className="w-full bg-brand-navy hover:bg-brand-navy-light text-white font-bold py-2.5 rounded-xl text-xs flex items-center justify-center space-x-2 shadow transition"
              >
                <span>Join {wing.name}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
