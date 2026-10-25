import React, { useState, useEffect } from 'react';
import { Mail, Phone, ShieldCheck, Award, MapPin } from 'lucide-react';
import { getStoredTeam } from '../data/mockDatabase';

export default function OurTeam({ setActivePage }) {
  const [teamMembers, setTeamMembers] = useState([]);

  useEffect(() => {
    setTeamMembers(getStoredTeam());
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12 space-y-12">
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-bold text-brand-gold uppercase tracking-widest bg-amber-50 px-3 py-1 rounded-full border border-amber-300">
          Governing Council & Leadership
        </span>
        <h1 className="text-3xl sm:text-5xl font-black font-serif text-brand-navy">
          Our Dedicated Leadership Team
        </h1>
        <p className="text-sm text-slate-600">
          Meet the trustees, district coordinators and passionate social workers steering the mission of Veer Azad Charitable Foundation.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {teamMembers.map((member, i) => (
          <div 
            key={i}
            className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm hover:shadow-xl transition flex flex-col items-center text-center group"
          >
            <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-amber-400 p-0.5 shadow-md mb-4 group-hover:scale-105 transition duration-300">
              <img src={member.image} alt={member.name} className="w-full h-full object-cover rounded-full" />
            </div>

            <h3 className="font-bold text-base font-serif text-slate-900 group-hover:text-brand-saffron transition">
              {member.name}
            </h3>
            
            <div className="text-xs font-bold text-brand-navy uppercase tracking-wider mt-1">
              {member.designation}
            </div>

            <span className="text-[11px] font-semibold text-amber-800 bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded-full my-2">
              {member.hindi}
            </span>

            <div className="flex items-center space-x-1 text-xs text-slate-500 mb-2">
              <MapPin className="w-3.5 h-3.5 text-stone-400" />
              <span>{member.location}</span>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              {member.bio}
            </p>

            <button
              onClick={() => {
                setActivePage('membership');
              }}
              className="mt-auto w-full bg-stone-50 hover:bg-brand-navy hover:text-white text-slate-700 font-bold py-2 rounded-xl text-xs border border-stone-200 transition"
            >
              Connect with Leadership
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
