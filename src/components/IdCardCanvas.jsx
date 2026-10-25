import React, { useRef, useState, useEffect } from 'react';
import QRCode from 'qrcode';
import html2canvas from 'html2canvas';
import { Download, Shield, User, Award, CheckCircle2 } from 'lucide-react';

export default function IdCardCanvas({ member }) {
  const frontRef = useRef(null);
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [downloading, setDownloading] = useState(false);

  const data = {
    fullName: member?.fullName || 'Ms SHAHNAJ',
    regNo: member?.regNo || '473718',
    wing: member?.wing || 'Women Wing',
    division: member?.division || 'Varanasi Division',
    plan: member?.plan || 'Active Membership',
    bloodGroup: member?.bloodGroup || 'B+',
    phone: member?.phone || '+91 98765 43210',
    validity: '2026 - 2028'
  };

  useEffect(() => {
    const verifyUrl = `${window.location.origin}/#verify?cert=${encodeURIComponent(data.regNo)}`;
    QRCode.toDataURL(verifyUrl, {
      width: 200,
      margin: 1,
      color: { dark: '#0b1d3a', light: '#ffffff' }
    }).then(setQrCodeUrl).catch(console.error);
  }, [data.regNo]);

  const handleDownload = async () => {
    if (!frontRef.current) return;
    try {
      setDownloading(true);
      const canvas = await html2canvas(frontRef.current, { scale: 3, useCORS: true });
      const img = canvas.toDataURL('image/png');
      const a = document.createElement('a');
      a.href = img;
      a.download = `ID_Card_${data.fullName.replace(/\s+/g, '_')}_${data.regNo}.png`;
      a.click();
    } catch (e) {
      console.error(e);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="mb-4 flex items-center justify-between w-full max-w-sm">
        <span className="text-xs font-bold text-slate-700">Digital PVC Membership ID Card</span>
        <button
          onClick={handleDownload}
          disabled={downloading}
          className="text-xs bg-brand-navy hover:bg-brand-navy-light text-white font-bold px-3 py-1.5 rounded flex items-center space-x-1"
        >
          <Download className="w-3 h-3 text-amber-300" />
          <span>{downloading ? 'Saving...' : 'Download Card'}</span>
        </button>
      </div>

      {/* PVC CARD (Standard CR80 Credit Card Ratio: 85.6mm x 53.98mm ~ 340px x 215px) */}
      <div 
        ref={frontRef}
        className="w-[340px] h-[215px] rounded-xl overflow-hidden shadow-xl border-2 border-brand-gold bg-gradient-to-br from-slate-900 via-brand-navy to-slate-950 text-white relative select-none flex flex-col justify-between p-3.5"
      >
        {/* Subtle Watermark */}
        <div className="absolute right-2 bottom-2 w-28 h-28 opacity-10 pointer-events-none">
          <img src="/assets/va_monogram_seal.png" alt="watermark" className="w-full h-full object-contain" />
        </div>

        {/* Card Header */}
        <div className="flex items-center justify-between border-b border-amber-500/40 pb-2 relative z-10">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full p-0.5 bg-white border border-brand-gold flex items-center justify-center">
              <img src="/assets/va_monogram_seal.png" alt="logo" className="w-full h-full object-contain" />
            </div>
            <div>
              <h4 className="text-xs font-black uppercase tracking-wider text-amber-300 font-serif">
                Veer Azad Foundation
              </h4>
              <p className="text-[9px] text-stone-300 font-semibold tracking-tight">
                Official Executive Identity Card
              </p>
            </div>
          </div>
          <span className="text-[8px] bg-amber-500/20 text-amber-300 border border-amber-400/40 font-mono font-bold px-1.5 py-0.5 rounded">
            {data.validity}
          </span>
        </div>

        {/* Card Body */}
        <div className="flex items-center space-x-3 py-1 relative z-10">
          {/* Avatar / Photo placeholder */}
          <div className="w-16 h-18 bg-slate-800 rounded-md border-2 border-amber-400/80 p-0.5 flex flex-col items-center justify-center text-center flex-shrink-0">
            <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center mb-0.5">
              <User className="w-6 h-6 text-amber-300" />
            </div>
            <span className="text-[7px] text-amber-300 font-mono font-bold">VERIFIED</span>
          </div>

          {/* Member Details */}
          <div className="flex-1 space-y-0.5 text-[10px]">
            <div className="font-bold text-white text-xs tracking-wide">
              {data.fullName}
            </div>
            <div className="text-amber-300 font-medium">
              Reg No: <span className="font-mono font-bold text-white">{data.regNo}</span>
            </div>
            <div className="text-stone-300 truncate">
              Wing: <span className="font-semibold text-amber-200">{data.wing}</span>
            </div>
            <div className="text-stone-300 truncate">
              Div: <span className="text-stone-200">{data.division}</span>
            </div>
            <div className="flex items-center space-x-2 text-[9px] text-stone-400 pt-0.5">
              <span>Blood: <b className="text-red-400">{data.bloodGroup}</b></span>
              <span>•</span>
              <span className="text-emerald-400 font-semibold">Active Member</span>
            </div>
          </div>

          {/* QR Code */}
          <div className="flex-shrink-0 flex flex-col items-center bg-white p-1 rounded border border-amber-400/60 shadow">
            {qrCodeUrl && <img src={qrCodeUrl} alt="QR" className="w-11 h-11" />}
            <span className="text-[6px] text-slate-900 font-mono font-black mt-0.5">SCAN QR</span>
          </div>
        </div>

        {/* Card Footer */}
        <div className="border-t border-slate-800 pt-1 flex items-center justify-between text-[8px] text-stone-400 relative z-10">
          <span>Auth Signatory: Chairman</span>
          <span className="text-amber-400 font-mono">Regd: UP/2026/03912</span>
        </div>
      </div>
    </div>
  );
}
