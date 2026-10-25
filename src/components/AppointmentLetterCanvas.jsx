import React, { useRef, useState, useEffect } from 'react';
import QRCode from 'qrcode';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { 
  Download, Printer, FileText, CheckCircle2, ShieldCheck, 
  Sparkles, Check, Copy, User, Calendar, MapPin, Award 
} from 'lucide-react';

export default function AppointmentLetterCanvas({ member, allMembers = [], onSelectOtherMember }) {
  const letterRef = useRef(null);
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [downloading, setDownloading] = useState(false);
  const [theme, setTheme] = useState('navy-gold'); // 'navy-gold' | 'ruby-gold' | 'emerald' | 'saffron-green' | 'royal-purple' | 'charcoal'

  const memberData = {
    fullName: member?.fullName || 'Ms SHAHNAJ',
    fatherOrHusbandName: member?.fatherOrHusbandName || 'Md. Farooq',
    regNo: member?.regNo || '473718',
    wing: member?.wing || 'Women Wing',
    division: member?.division || 'Varanasi (U. P.) Division',
    designation: member?.plan?.includes('State') ? 'State Coordinator' : (member?.plan?.includes('District') ? 'District Secretary' : 'Executive Coordinator'),
    hindiDesig: member?.plan?.includes('State') ? 'प्रदेश समन्वयक' : 'कार्यकारी समन्वयक',
    issueDate: member?.approvedDate || '12-05-2026',
    endDate: '11-05-2028',
    refNo: `VACF/APPT/2026/${member?.regNo || '473718'}`,
    address: member?.address || 'Ghat Road, Varanasi, Uttar Pradesh'
  };

  useEffect(() => {
    const verifyUrl = `${window.location.origin}/#verify?cert=${encodeURIComponent(memberData.regNo)}`;
    QRCode.toDataURL(verifyUrl, {
      width: 180,
      margin: 1,
      color: { dark: '#0b1d3a', light: '#ffffff' }
    }).then(setQrCodeUrl).catch(console.error);
  }, [memberData.regNo]);

  // Theme Styles Dictionary
  const THEME_STYLES = {
    'navy-gold': {
      headerBg: 'bg-[#0b1d3a]',
      headerText: 'text-[#f5df97]',
      accentBorder: 'border-[#cda037]',
      titleColor: 'text-[#0b1d3a]',
      highlightBg: 'bg-amber-50/70',
      taglineColor: 'text-[#a67c1e]'
    },
    'ruby-gold': {
      headerBg: 'bg-[#7c1125]',
      headerText: 'text-[#fde68a]',
      accentBorder: 'border-[#b91c1c]',
      titleColor: 'text-[#7c1125]',
      highlightBg: 'bg-rose-50/70',
      taglineColor: 'text-[#991b1b]'
    },
    'emerald': {
      headerBg: 'bg-[#064e3b]',
      headerText: 'text-[#a7f3d0]',
      accentBorder: 'border-[#059669]',
      titleColor: 'text-[#064e3b]',
      highlightBg: 'bg-emerald-50/70',
      taglineColor: 'text-[#047857]'
    },
    'saffron-green': {
      headerBg: 'bg-gradient-to-r from-[#ea580c] via-white to-[#15803d]',
      headerText: 'text-[#0b1d3a]',
      accentBorder: 'border-[#ea580c]',
      titleColor: 'text-[#0b1d3a]',
      highlightBg: 'bg-orange-50/70',
      taglineColor: 'text-[#ea580c]'
    },
    'royal-purple': {
      headerBg: 'bg-[#4c1d95]',
      headerText: 'text-[#e9d5ff]',
      accentBorder: 'border-[#7c3aed]',
      titleColor: 'text-[#4c1d95]',
      highlightBg: 'bg-purple-50/70',
      taglineColor: 'text-[#6d28d9]'
    },
    'charcoal': {
      headerBg: 'bg-[#18181b]',
      headerText: 'text-[#f4f4f5]',
      accentBorder: 'border-[#d4af37]',
      titleColor: 'text-[#18181b]',
      highlightBg: 'bg-stone-100',
      taglineColor: 'text-[#a16207]'
    }
  };

  const currentTheme = THEME_STYLES[theme] || THEME_STYLES['navy-gold'];

  // Download PDF
  const handleDownloadPDF = async () => {
    if (!letterRef.current) return;
    try {
      setDownloading(true);
      const canvas = await html2canvas(letterRef.current, { scale: 2.5, useCORS: true });
      const imgData = canvas.toDataURL('image/jpeg', 0.95);
      const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`Appointment_Letter_${memberData.fullName.replace(/\s+/g, '_')}.pdf`);
    } catch (e) {
      console.error(e);
      alert('Failed to generate PDF');
    } finally {
      setDownloading(false);
    }
  };

  // Download PNG
  const handleDownloadPNG = async () => {
    if (!letterRef.current) return;
    try {
      setDownloading(true);
      const canvas = await html2canvas(letterRef.current, { scale: 3, useCORS: true });
      const img = canvas.toDataURL('image/png');
      const a = document.createElement('a');
      a.href = img;
      a.download = `Appointment_Letter_${memberData.fullName.replace(/\s+/g, '_')}.png`;
      a.click();
    } catch (e) {
      console.error(e);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="w-full flex flex-col items-center">
      
      {/* 1. TOP CONTROL TOOLBAR */}
      <div className="w-full max-w-5xl bg-white p-4 rounded-xl shadow-sm border border-stone-200 mb-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-lg bg-blue-100 border border-blue-300 flex items-center justify-center">
            <FileText className="w-5 h-5 text-brand-navy" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-sm">
              Official Appointment Letter Generator (नियुक्ति पत्र)
            </h3>
            <p className="text-xs text-slate-500">
              Candidate: <span className="font-semibold text-brand-navy">{memberData.fullName}</span> • Ref: {memberData.refNo}
            </p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Theme Selector (Matching reference video exactly) */}
          <div className="flex items-center space-x-1.5">
            <span className="text-xs font-semibold text-slate-500">Theme:</span>
            <select
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              className="text-xs bg-stone-50 border border-stone-300 rounded-lg px-2.5 py-1.5 font-bold text-slate-800 focus:outline-none"
            >
              <option value="navy-gold">Theme: Navy & Gold</option>
              <option value="ruby-gold">Theme: Ruby & Gold</option>
              <option value="emerald">Theme: Emerald & Platinum</option>
              <option value="saffron-green">Theme: Indian Flag (Green & Saffron)</option>
              <option value="royal-purple">Theme: Royal Purple</option>
              <option value="charcoal">Theme: Charcoal & Gold</option>
            </select>
          </div>

          <button
            onClick={() => window.print()}
            className="flex items-center space-x-1 text-xs font-semibold px-3 py-1.5 rounded-lg border border-stone-300 bg-stone-50 hover:bg-stone-100 text-slate-700"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print</span>
          </button>

          <button
            onClick={handleDownloadPNG}
            disabled={downloading}
            className="flex items-center space-x-1 text-xs font-semibold px-3 py-1.5 rounded-lg border border-amber-300 bg-amber-50 hover:bg-amber-100 text-amber-900"
          >
            <Download className="w-3.5 h-3.5 text-amber-700" />
            <span>PNG</span>
          </button>

          <button
            onClick={handleDownloadPDF}
            disabled={downloading}
            className="flex items-center space-x-1.5 text-xs font-bold px-4 py-1.5 rounded-lg bg-brand-navy hover:bg-brand-navy-light text-white shadow"
          >
            <Download className="w-3.5 h-3.5 text-amber-400" />
            <span>{downloading ? 'Exporting...' : 'Download PDF'}</span>
          </button>
        </div>
      </div>

      {/* 2. MAIN APPOINTMENT LETTER CONTAINER (Standard A4 Portrait Proportion: 800px x 1130px) */}
      <div className="w-full flex flex-col lg:flex-row items-start justify-center gap-6 max-w-6xl">
        
        {/* The Letter Document */}
        <div className="overflow-x-auto pb-4 flex justify-center w-full lg:w-auto">
          <div 
            ref={letterRef}
            className="relative bg-white w-[790px] min-h-[1115px] p-10 shadow-2xl rounded-sm border border-stone-300 text-slate-800 flex flex-col justify-between font-sans select-none overflow-hidden"
            style={{
              backgroundImage: 'radial-gradient(#f0e9d6 0.65px, transparent 0.65px)',
              backgroundSize: '20px 20px'
            }}
          >
            {/* Subtle Center Monogram Watermark */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.04]">
              <img src="/assets/va_monogram_seal.png" alt="watermark" className="w-[450px] h-[450px] object-contain" />
            </div>

            {/* LETTERHEAD HEADER */}
            <div>
              <div className="border-b-4 border-double border-amber-500 pb-4 mb-4">
                <div className="flex items-center justify-between">
                  <div className="w-20 h-20 rounded-full p-1 bg-white border-2 border-brand-gold flex items-center justify-center flex-shrink-0 shadow">
                    <img src="/assets/va_monogram_seal.png" alt="Logo" className="w-full h-full object-contain" />
                  </div>

                  <div className="text-center flex-1 px-4">
                    <h1 className="text-2xl font-black font-serif uppercase tracking-tight text-brand-navy">
                      Veer Azad Charitable Foundation
                    </h1>
                    <p className="text-xs font-bold tracking-widest uppercase text-amber-700 font-serif">
                      "Together for a Better Tomorrow"
                    </p>
                    <p className="text-[10px] text-slate-500 font-medium mt-1">
                      Regd. Under Indian Trust Act 1882 • NITI Aayog NGO Darpan: UP/2026/03912 • 80G & 12A Certified
                    </p>
                    <p className="text-[10px] text-slate-600 font-medium">
                      Head Office: Varanasi Ghat Division, Varanasi - 221001 (Uttar Pradesh), India
                    </p>
                  </div>

                  <div className="w-20 flex flex-col items-center">
                    <div className="p-0.5 bg-white border border-stone-300 rounded shadow-sm">
                      {qrCodeUrl && <img src={qrCodeUrl} alt="QR" className="w-14 h-14" />}
                    </div>
                    <span className="text-[7px] font-mono text-slate-500 font-bold mt-0.5">VERIFIED</span>
                  </div>
                </div>
              </div>

              {/* Ref No & Date Row */}
              <div className="flex items-center justify-between text-xs font-semibold text-slate-700 mb-6 px-1">
                <div>
                  <span className="text-amber-800 font-bold">Ref No: </span>
                  <span className="font-mono font-bold text-slate-900">{memberData.refNo}</span>
                </div>
                <div>
                  <span className="text-amber-800 font-bold">Date of Issuance: </span>
                  <span className="font-mono text-slate-900">{memberData.issueDate}</span>
                </div>
              </div>

              {/* Recipient Details & Photo Box */}
              <div className="flex items-start justify-between bg-stone-50 border border-stone-200 rounded-xl p-4 mb-6">
                <div className="space-y-1 text-xs">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">To,</span>
                  <div className="text-base font-bold text-slate-900 font-serif">
                    {memberData.fullName}
                  </div>
                  <div className="text-xs text-slate-600">
                    S/o / D/o / W/o : <span className="font-semibold text-slate-800">{memberData.fatherOrHusbandName}</span>
                  </div>
                  <div className="text-xs text-slate-600">
                    Address: <span className="text-slate-800">{memberData.address}</span>
                  </div>
                  <div className="text-xs font-semibold text-amber-800 pt-1">
                    Membership Registration ID: <span className="font-mono font-bold">{memberData.regNo}</span>
                  </div>
                </div>

                {/* Photo Placeholder Box */}
                <div className="w-24 h-28 bg-white border-2 border-dashed border-stone-300 rounded-lg flex flex-col items-center justify-center p-1 text-center flex-shrink-0 shadow-inner">
                  <User className="w-8 h-8 text-stone-300" />
                  <span className="text-[9px] text-stone-400 font-semibold mt-1">AFFIX PHOTO</span>
                  <span className="text-[7px] text-stone-400">OFFICIAL STAMP</span>
                </div>
              </div>

              {/* Subject */}
              <div className="mb-6 px-1">
                <div className="text-xs sm:text-sm font-bold text-brand-navy border-b border-amber-300 pb-1 flex items-center justify-between">
                  <span>
                    SUBJECT: LETTER OF APPOINTMENT AS OFFICIAL OFFICE-BEARER (नियुक्ति पत्र)
                  </span>
                  <span className="text-xs text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 font-serif">
                    {memberData.hindiDesig}
                  </span>
                </div>
              </div>

              {/* Formal Appointment Text Body */}
              <div className="text-xs sm:text-[13px] text-slate-800 leading-relaxed space-y-4 px-1 font-serif">
                <p>
                  Dear <span className="font-bold text-brand-navy">{memberData.fullName}</span>,
                </p>

                <p className="text-justify">
                  Upon the recommendation of the Governing Council and by the authority vested in the Executive Board of <span className="font-bold text-brand-navy">Veer Azad Charitable Foundation</span>, we take immense pleasure in appointing you to the prestigious post of <span className="font-bold text-amber-800 underline decoration-amber-400">{memberData.designation}</span> under the <span className="font-bold text-slate-900">{memberData.wing}</span> — <span className="font-bold text-slate-900">{memberData.division}</span>.
                </p>

                <p className="text-justify">
                  This official appointment takes effect on <span className="font-bold font-mono">{memberData.issueDate}</span> and shall remain valid through <span className="font-bold font-mono">{memberData.endDate}</span>. In this distinguished capacity, you are entrusted with leading grassroots humanitarian initiatives, organizing health and educational drives, and mobilizing volunteers in accordance with the Foundation’s Constitution and Code of Ethics.
                </p>

                <p className="text-justify">
                  You are hereby empowered to represent the Foundation at civil assemblies, liaise with local block administrations for welfare drives, and issue authorized communications within your designated territorial division.
                </p>

                <p className="text-justify italic text-slate-600 text-xs">
                  We convey our warmest congratulations and have firm conviction that your dedication, compassionate leadership, and unwavering commitment will bring profound upliftment to our nation.
                </p>
              </div>
            </div>

            {/* FOOTER SIGNATURES & OFFICIAL SEALS */}
            <div className="border-t-2 border-stone-200 pt-6 mt-8 flex items-end justify-between px-2">
              
              {/* Left: Medallion Seal */}
              <div className="flex items-center space-x-3">
                <div className="w-16 h-16 relative">
                  <img src="/assets/gold_medallion.png" alt="seal" className="w-full h-full object-contain filter drop-shadow mix-blend-multiply" />
                </div>
                <div>
                  <div className="text-[10px] font-serif font-bold text-amber-800 uppercase tracking-widest">
                    GOVERNING TRUST
                  </div>
                  <div className="text-[9px] text-slate-500 font-mono">
                    SEAL OF AUTHORITY
                  </div>
                </div>
              </div>

              {/* Right: Chairman Signature */}
              <div className="flex flex-col items-center">
                <div className="w-44 h-14 flex items-center justify-center">
                  <img src="/assets/chairman_signature.png" alt="signature" className="max-h-full object-contain filter contrast-150 mix-blend-multiply" />
                </div>
                <div className="w-48 border-t border-slate-700 mt-1"></div>
                <span className="text-xs font-serif font-bold text-brand-navy mt-0.5">
                  Aditya Agrawal
                </span>
                <span className="text-[9px] text-slate-500 uppercase font-semibold">
                  CHAIRMAN & GOVERNING TRUSTEE
                </span>
                <span className="text-[8px] text-amber-800 font-serif">
                  Veer Azad Charitable Foundation
                </span>
              </div>

            </div>

          </div>
        </div>

        {/* Right Sidebar: Letter Details Metadata (Matching reference video frame_30s.jpg) */}
        <div className="w-full lg:w-80 bg-white p-5 rounded-2xl shadow-sm border border-stone-200 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-stone-200">
            <span className="font-bold text-sm text-slate-900 font-serif">Letter Details</span>
            <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">
              VERIFIED
            </span>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <span className="text-slate-400 font-bold block text-[10px] uppercase">Reference No.</span>
              <span className="font-mono font-bold text-slate-800">{memberData.refNo}</span>
            </div>

            <div>
              <span className="text-slate-400 font-bold block text-[10px] uppercase">Recipient Name</span>
              <span className="font-bold text-slate-900">{memberData.fullName}</span>
            </div>

            <div>
              <span className="text-slate-400 font-bold block text-[10px] uppercase">Designation</span>
              <span className="font-semibold text-amber-800">{memberData.designation}</span>
            </div>

            <div>
              <span className="text-slate-400 font-bold block text-[10px] uppercase">Hindi Desig.</span>
              <span className="font-semibold text-slate-800">{memberData.hindiDesig}</span>
            </div>

            <div>
              <span className="text-slate-400 font-bold block text-[10px] uppercase">Issue Date</span>
              <span className="font-mono text-slate-700">{memberData.issueDate}</span>
            </div>

            <div>
              <span className="text-slate-400 font-bold block text-[10px] uppercase">Tenure End Date</span>
              <span className="font-mono text-slate-700">{memberData.endDate}</span>
            </div>

            <div>
              <span className="text-slate-400 font-bold block text-[10px] uppercase">Foundation Wing</span>
              <span className="font-semibold text-slate-800">{memberData.wing}</span>
            </div>

            <div>
              <span className="text-slate-400 font-bold block text-[10px] uppercase">Assigned Division</span>
              <span className="text-slate-700">{memberData.division}</span>
            </div>
          </div>

          <div className="pt-3 border-t border-stone-200 space-y-2">
            <button
              onClick={handleDownloadPDF}
              className="w-full bg-brand-navy hover:bg-brand-navy-light text-white font-bold py-2 rounded-lg text-xs flex items-center justify-center space-x-1.5 shadow"
            >
              <Download className="w-3.5 h-3.5 text-amber-400" />
              <span>Download Official Letter (PDF)</span>
            </button>
            <button
              onClick={handleDownloadPNG}
              className="w-full bg-stone-100 hover:bg-stone-200 text-slate-700 font-bold py-2 rounded-lg text-xs flex items-center justify-center space-x-1.5 border border-stone-300"
            >
              <Download className="w-3.5 h-3.5 text-slate-600" />
              <span>Export High-Res PNG</span>
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
