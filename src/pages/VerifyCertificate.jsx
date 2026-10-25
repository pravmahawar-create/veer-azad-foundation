import React, { useState, useEffect } from 'react';
import { 
  Search, ShieldCheck, CheckCircle2, XCircle, Award, 
  ExternalLink, Printer, Calendar, MapPin, User, FileText 
} from 'lucide-react';
import { getStoredMembers, getStoredVolunteers } from '../data/mockDatabase';
import CertificateCanvas from '../components/CertificateCanvas';
import IdCardCanvas from '../components/IdCardCanvas';
import AppointmentLetterCanvas from '../components/AppointmentLetterCanvas';

export default function VerifyCertificate({ defaultQuery = '' }) {
  const [query, setQuery] = useState(defaultQuery || '473718');
  const [searched, setSearched] = useState(false);
  const [foundRecord, setFoundRecord] = useState(null);
  const [recordType, setRecordType] = useState('member'); // 'member' | 'volunteer'
  const [viewMode, setViewMode] = useState('summary'); // 'summary' | 'certificate' | 'idcard'

  // Read URL query parameters on load (e.g. #verify?cert=473718)
  useEffect(() => {
    const hash = window.location.hash;
    const match = hash.match(/cert=([^&]+)/);
    if (match && match[1]) {
      const decoded = decodeURIComponent(match[1]);
      setQuery(decoded);
      performSearch(decoded);
    } else if (defaultQuery) {
      setQuery(defaultQuery);
      performSearch(defaultQuery);
    } else {
      // Default to Ms Shahnaj sample
      performSearch('473718');
    }
  }, [defaultQuery]);

  const performSearch = (searchVal) => {
    const cleaned = searchVal.trim().toUpperCase();
    if (!cleaned) return;

    setSearched(true);
    const members = getStoredMembers();
    const volunteers = getStoredVolunteers();

    // 1. Search Members
    const matchedMember = members.find(m => 
      (m.regNo && m.regNo.toUpperCase() === cleaned) ||
      (m.certificateNo && m.certificateNo.toUpperCase().includes(cleaned)) ||
      (m.fullName && m.fullName.toUpperCase().includes(cleaned))
    );

    if (matchedMember) {
      setFoundRecord(matchedMember);
      setRecordType('member');
      return;
    }

    // 2. Search Volunteers
    const matchedVol = volunteers.find(v => 
      (v.refNo && v.refNo.toUpperCase() === cleaned) ||
      (v.certificateNo && v.certificateNo.toUpperCase().includes(cleaned)) ||
      (v.fullName && v.fullName.toUpperCase().includes(cleaned))
    );

    if (matchedVol) {
      setFoundRecord(matchedVol);
      setRecordType('volunteer');
      return;
    }

    setFoundRecord(null);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    performSearch(query);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12 space-y-10">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-black uppercase tracking-widest bg-emerald-50 text-emerald-800 px-3 py-1 rounded-full border border-emerald-300">
          Official Trust & Security Registry
        </span>
        <h1 className="text-3xl sm:text-5xl font-black font-serif text-brand-navy">
          Verify Issued Certificate Online
        </h1>
        <p className="text-sm text-slate-600">
          Search the central cryptographic registry of Veer Azad Charitable Foundation to confirm authenticity, status and authorized signatory.
        </p>

        {/* Search Bar */}
        <form onSubmit={handleSearchSubmit} className="max-w-xl mx-auto flex items-center bg-white rounded-2xl p-2 shadow-lg border border-stone-300 mt-6">
          <Search className="w-5 h-5 text-slate-400 ml-3 mr-2" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter Reg. No. (e.g. 473718) or Name"
            className="w-full text-xs sm:text-sm font-semibold text-slate-900 px-2 py-2 focus:outline-none"
          />
          <button
            type="submit"
            className="bg-brand-navy hover:bg-brand-navy-light text-white font-bold text-xs px-5 py-2.5 rounded-xl transition flex-shrink-0"
          >
            VERIFY
          </button>
        </form>

        <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-slate-500 pt-2">
          <span>Quick samples: </span>
          <button onClick={() => { setQuery('473718'); performSearch('473718'); }} className="text-brand-navy font-bold underline">
            473718 (Ms SHAHNAJ)
          </button>
          <span>•</span>
          <button onClick={() => { setQuery('473719'); performSearch('473719'); }} className="text-brand-navy font-bold underline">
            473719 (GURPREET SINGH)
          </button>
          <span>•</span>
          <button onClick={() => { setQuery('VOL20260005'); performSearch('VOL20260005'); }} className="text-brand-navy font-bold underline">
            VOL20260005 (Meenakshi)
          </button>
        </div>
      </div>

      {/* RESULT STATE */}
      {searched && (
        <div className="space-y-8">
          {foundRecord ? (
            <div className="space-y-6">
              {/* Verification Green Banner */}
              <div className="bg-emerald-50 border-2 border-emerald-400 rounded-2xl p-6 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center space-x-4">
                  <div className="w-14 h-14 bg-emerald-600 text-white rounded-full flex items-center justify-center flex-shrink-0 shadow-md">
                    <ShieldCheck className="w-8 h-8" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs bg-emerald-600 text-white font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                        100% VERIFIED AUTHENTIC
                      </span>
                      <span className="text-xs text-emerald-900 font-mono font-bold">
                        Serial: {foundRecord.certificateNo || foundRecord.regNo}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold font-serif text-slate-900 mt-1">
                      {foundRecord.fullName}
                    </h3>
                    <p className="text-xs text-slate-600">
                      Official accredited member under <b className="text-slate-900">{foundRecord.wing || foundRecord.preferredWing}</b> — {foundRecord.division || foundRecord.location}.
                    </p>
                  </div>
                </div>

                {/* View Switcher Tabs */}
                <div className="flex items-center space-x-2 bg-white p-1 rounded-xl border border-stone-200">
                  <button
                    onClick={() => setViewMode('summary')}
                    className={`text-xs font-bold px-3 py-1.5 rounded-lg transition ${
                      viewMode === 'summary' ? 'bg-brand-navy text-white' : 'text-slate-700 hover:bg-stone-100'
                    }`}
                  >
                    Summary
                  </button>
                  <button
                    onClick={() => setViewMode('certificate')}
                    className={`text-xs font-bold px-3 py-1.5 rounded-lg transition ${
                      viewMode === 'certificate' ? 'bg-brand-navy text-white shadow' : 'text-slate-700 hover:bg-stone-100'
                    }`}
                  >
                    Certificate
                  </button>
                  <button
                    onClick={() => setViewMode('appointment')}
                    className={`text-xs font-bold px-3 py-1.5 rounded-lg transition ${
                      viewMode === 'appointment' ? 'bg-brand-navy text-white shadow' : 'text-slate-700 hover:bg-stone-100'
                    }`}
                  >
                    Appointment Letter (नियुक्ति पत्र)
                  </button>
                  {recordType === 'member' && (
                    <button
                      onClick={() => setViewMode('idcard')}
                      className={`text-xs font-bold px-3 py-1.5 rounded-lg transition ${
                        viewMode === 'idcard' ? 'bg-brand-navy text-white shadow' : 'text-slate-700 hover:bg-stone-100'
                      }`}
                    >
                      PVC ID Card
                    </button>
                  )}
                </div>
              </div>

              {/* SUMMARY VIEW */}
              {viewMode === 'summary' && (
                <div className="bg-white rounded-2xl p-8 border border-stone-200 shadow-sm grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="space-y-1">
                    <span className="text-xs text-slate-400 font-bold uppercase">Candidate Name</span>
                    <div className="text-sm font-bold text-slate-900">{foundRecord.fullName}</div>
                  </div>

                  <div className="space-y-1">
                    <span className="text-xs text-slate-400 font-bold uppercase">Registration Number</span>
                    <div className="text-sm font-mono font-bold text-brand-navy">{foundRecord.regNo || foundRecord.refNo}</div>
                  </div>

                  <div className="space-y-1">
                    <span className="text-xs text-slate-400 font-bold uppercase">Foundation Wing</span>
                    <div className="text-sm font-semibold text-amber-800">{foundRecord.wing || foundRecord.preferredWing}</div>
                  </div>

                  <div className="space-y-1">
                    <span className="text-xs text-slate-400 font-bold uppercase">Assigned Division</span>
                    <div className="text-sm font-semibold text-slate-800">{foundRecord.division || foundRecord.location}</div>
                  </div>

                  <div className="space-y-1">
                    <span className="text-xs text-slate-400 font-bold uppercase">Membership Tier</span>
                    <div className="text-sm font-semibold text-slate-800">{foundRecord.plan || 'Volunteer'}</div>
                  </div>

                  <div className="space-y-1">
                    <span className="text-xs text-slate-400 font-bold uppercase">Approval Status</span>
                    <div className="text-sm font-bold text-emerald-600 flex items-center space-x-1">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>{foundRecord.status} & Active</span>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <span className="text-xs text-slate-400 font-bold uppercase">Issuance Date</span>
                    <div className="text-sm font-medium text-slate-800">{foundRecord.approvedDate || foundRecord.appliedDate || '20/05/2026'}</div>
                  </div>

                  <div className="space-y-1">
                    <span className="text-xs text-slate-400 font-bold uppercase">Authorizing Trustee</span>
                    <div className="text-sm font-semibold text-slate-900">{foundRecord.signatory || 'Aditya Agrawal (Chairman)'}</div>
                  </div>

                  <div className="space-y-1">
                    <span className="text-xs text-slate-400 font-bold uppercase">Govt. Verification</span>
                    <div className="text-sm font-medium text-slate-700">NITI Aayog UP/2026/03912</div>
                  </div>
                </div>
              )}

              {/* CERTIFICATE CANVAS VIEW */}
              {viewMode === 'certificate' && (
                <div className="pt-4">
                  <CertificateCanvas member={foundRecord} />
                </div>
              )}

              {/* APPOINTMENT LETTER VIEW */}
              {viewMode === 'appointment' && (
                <div className="pt-4">
                  <AppointmentLetterCanvas member={foundRecord} />
                </div>
              )}

              {/* ID CARD CANVAS VIEW */}
              {viewMode === 'idcard' && (
                <div className="flex justify-center pt-4">
                  <IdCardCanvas member={foundRecord} />
                </div>
              )}
            </div>
          ) : (
            <div className="bg-red-50 border border-red-300 rounded-2xl p-8 text-center max-w-lg mx-auto space-y-3">
              <div className="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto">
                <XCircle className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-bold font-serif text-red-950">
                No Certificate Found
              </h3>
              <p className="text-xs text-red-800">
                No matching registration number or certificate found for "<span className="font-bold">{query}</span>". Please check the number on the certificate or contact head office.
              </p>
            </div>
          )}
        </div>
      )}

    </div>
  );
}
