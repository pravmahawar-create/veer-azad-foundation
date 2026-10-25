import React, { useRef, useState, useEffect } from 'react';
import QRCode from 'qrcode';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { 
  Download, Printer, CheckCircle, ShieldCheck, 
  ExternalLink, Sparkles, RefreshCw, Copy, Check 
} from 'lucide-react';

export default function CertificateCanvas({ member, onSelectOtherMember, allMembers = [] }) {
  const certificateRef = useRef(null);
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [downloading, setDownloading] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Fallback defaults matching exact sample in veerazad.jpg
  const certData = {
    fullName: member?.fullName || 'Ms SHAHNAJ',
    fatherOrHusbandName: member?.fatherOrHusbandName || 'Md. Farooq',
    regNo: member?.regNo || '473718',
    wing: member?.wing || 'Women Wing',
    division: member?.division || 'Varanasi (U. P.) Division',
    issueDate: member?.approvedDate || member?.appliedDate || '20/05/2026',
    certificateNo: member?.certificateNo || `VACF-MEM-2026-${member?.regNo || '473718'}`,
    signatory: member?.signatory || 'Aditya Agrawal (Chairman)',
    bloodGroup: member?.bloodGroup || 'B+'
  };

  // Generate dynamic QR Code for instant verification
  useEffect(() => {
    const verifyUrl = `${window.location.origin}/#verify?cert=${encodeURIComponent(certData.certificateNo || certData.regNo)}`;
    QRCode.toDataURL(verifyUrl, {
      width: 256,
      margin: 1,
      color: {
        dark: '#071224',
        light: '#ffffff'
      }
    })
      .then((url) => setQrCodeUrl(url))
      .catch((err) => console.error('QR code generation error', err));
  }, [certData.certificateNo, certData.regNo]);

  // Download high-resolution PNG
  const handleDownloadPNG = async () => {
    if (!certificateRef.current) return;
    try {
      setDownloading(true);
      const canvas = await html2canvas(certificateRef.current, {
        scale: 3, // Crisp 300 DPI equivalent
        useCORS: true,
        backgroundColor: '#faf7f2',
        logging: false
      });
      const image = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = image;
      link.download = `Certificate_${certData.fullName.replace(/\s+/g, '_')}_${certData.regNo}.png`;
      link.click();
    } catch (e) {
      console.error('PNG download error', e);
      alert('Certificate image download failed. Please try again.');
    } finally {
      setDownloading(false);
    }
  };

  // Download official PDF (Landscape A4)
  const handleDownloadPDF = async () => {
    if (!certificateRef.current) return;
    try {
      setDownloading(true);
      const canvas = await html2canvas(certificateRef.current, {
        scale: 2.5,
        useCORS: true,
        backgroundColor: '#faf7f2',
        logging: false
      });
      const imgData = canvas.toDataURL('image/jpeg', 0.95);
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a4'
      });
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`Certificate_${certData.fullName.replace(/\s+/g, '_')}_${certData.regNo}.pdf`);
    } catch (e) {
      console.error('PDF download error', e);
      alert('Certificate PDF generation failed. Please try again.');
    } finally {
      setDownloading(false);
    }
  };

  // Native Print
  const handlePrint = () => {
    window.print();
  };

  // Copy Verification Link
  const handleCopyVerificationLink = () => {
    const verifyUrl = `${window.location.origin}/#verify?cert=${encodeURIComponent(certData.certificateNo || certData.regNo)}`;
    navigator.clipboard.writeText(verifyUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="w-full flex flex-col items-center">
      {/* Action Toolbar */}
      <div className="w-full max-w-5xl bg-white p-4 rounded-xl shadow-sm border border-stone-200 mb-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-lg bg-amber-100 border border-amber-300 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-amber-700" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-sm">
              Official Membership Certificate Studio
            </h3>
            <p className="text-xs text-slate-500">
              Active Member: <span className="font-semibold text-brand-navy">{certData.fullName}</span> (Reg No: {certData.regNo})
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          {allMembers && allMembers.length > 0 && onSelectOtherMember && (
            <select
              value={member?.id || ''}
              onChange={(e) => {
                const target = allMembers.find(m => m.id === e.target.value);
                if (target) onSelectOtherMember(target);
              }}
              className="text-xs bg-stone-50 border border-stone-300 rounded-lg px-2.5 py-2 font-medium text-slate-700 focus:outline-none"
            >
              {allMembers.map(m => (
                <option key={m.id} value={m.id}>
                  {m.fullName} ({m.regNo}) - {m.wing}
                </option>
              ))}
            </select>
          )}

          <button
            onClick={handleCopyVerificationLink}
            className="flex items-center space-x-1.5 text-xs font-semibold px-3 py-2 rounded-lg border border-stone-300 bg-stone-50 hover:bg-stone-100 text-slate-700 transition"
          >
            {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-600" />}
            <span>{copiedLink ? 'Link Copied!' : 'Verify Link'}</span>
          </button>

          <button
            onClick={handlePrint}
            className="flex items-center space-x-1.5 text-xs font-semibold px-3 py-2 rounded-lg border border-stone-300 bg-stone-50 hover:bg-stone-100 text-slate-700 transition"
          >
            <Printer className="w-3.5 h-3.5 text-slate-600" />
            <span>Print</span>
          </button>

          <button
            onClick={handleDownloadPNG}
            disabled={downloading}
            className="flex items-center space-x-1.5 text-xs font-semibold px-3.5 py-2 rounded-lg border border-amber-300 bg-amber-50 hover:bg-amber-100 text-amber-900 transition"
          >
            <Download className="w-3.5 h-3.5 text-amber-700" />
            <span>PNG</span>
          </button>

          <button
            onClick={handleDownloadPDF}
            disabled={downloading}
            className="flex items-center space-x-1.5 text-xs font-bold px-4 py-2 rounded-lg bg-brand-navy hover:bg-brand-navy-light text-white shadow transition"
          >
            <Download className="w-3.5 h-3.5 text-amber-400" />
            <span>{downloading ? 'Generating...' : 'Download PDF'}</span>
          </button>
        </div>
      </div>

      {/* CERTIFICATE PREVIEW CONTAINER (Landscape 4:3 Proportion) */}
      <div className="w-full overflow-x-auto pb-4 flex justify-center">
        <div 
          id="certificate-print-area"
          ref={certificateRef}
          className="relative bg-[#fcfaf7] w-[920px] h-[640px] flex-shrink-0 p-8 shadow-2xl rounded-sm border-8 border-[#0b1d3a] outline outline-4 outline-[#cda037] select-none text-slate-900 overflow-hidden font-sans"
          style={{
            backgroundImage: 'radial-gradient(#e5dec9 0.75px, transparent 0.75px)',
            backgroundSize: '24px 24px'
          }}
        >
          {/* Inner Ornate Gold Guilloche Border */}
          <div className="absolute inset-3 border-2 border-[#cda037]/70 pointer-events-none rounded-sm"></div>
          <div className="absolute inset-4 border border-[#0b1d3a]/20 pointer-events-none rounded-sm"></div>

          {/* Corner Ornaments */}
          <div className="absolute top-5 left-5 w-8 h-8 border-t-2 border-l-2 border-[#cda037]"></div>
          <div className="absolute top-5 right-5 w-8 h-8 border-t-2 border-r-2 border-[#cda037]"></div>
          <div className="absolute bottom-5 left-5 w-8 h-8 border-b-2 border-l-2 border-[#cda037]"></div>
          <div className="absolute bottom-5 right-5 w-8 h-8 border-b-2 border-r-2 border-[#cda037]"></div>

          {/* LEFT WATERMARK: Mountaineer / National Flag Climber */}
          <div className="absolute left-6 bottom-16 w-52 h-64 pointer-events-none opacity-20">
            <img 
              src="/assets/mountaineer_watermark.png" 
              alt="Mountaineer Emblem" 
              className="w-full h-full object-contain filter grayscale contrast-125"
            />
          </div>

          {/* RIGHT WATERMARK: Holy Varanasi Ghats & Temples */}
          <div className="absolute right-6 bottom-16 w-56 h-64 pointer-events-none opacity-20">
            <img 
              src="/assets/ghats_watermark.png" 
              alt="Ghats Watermark" 
              className="w-full h-full object-contain filter grayscale contrast-125"
            />
          </div>

          {/* CENTER BACKGROUND SUBTLE MONOGRAM EMBLEM */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.06]">
            <img 
              src="/assets/va_monogram_seal.png" 
              alt="Monogram Background" 
              className="w-96 h-96 object-contain"
            />
          </div>

          {/* CERTIFICATE HEADER */}
          <div className="relative z-10 text-center pt-2">
            
            {/* Top Monogram Seal Badge */}
            <div className="flex justify-center mb-1">
              <div className="w-16 h-16 rounded-full p-1 bg-white shadow-md border-2 border-brand-gold flex items-center justify-center">
                <img 
                  src="/assets/va_monogram_seal.png" 
                  alt="Veer Azad Seal" 
                  className="w-full h-full object-contain"
                />
              </div>
            </div>

            {/* Arched Organization Title in Royal Serif */}
            <h1 className="text-3xl font-extrabold tracking-wide uppercase font-serif text-[#0b1d3a] drop-shadow-sm">
              Veer Azad Charitable Foundation
            </h1>
            
            <p className="text-xs font-bold tracking-widest uppercase text-[#a67c1e] mt-0.5 font-serif">
              Together for a Better Tomorrow
            </p>

            <div className="w-64 h-0.5 bg-gradient-to-r from-transparent via-[#cda037] to-transparent mx-auto my-2"></div>

            {/* Official Registration & Date Row */}
            <div className="flex items-center justify-between px-10 text-xs font-semibold text-slate-700 tracking-wider">
              <div>
                <span className="text-[#a67c1e] font-serif font-bold">Reg. No.: </span>
                <span className="font-mono font-bold text-slate-900">{certData.regNo}</span>
              </div>
              <div className="text-xs text-slate-500 font-serif italic">
                Regd. Under Trust Act & NITI Aayog (Govt. of India)
              </div>
              <div>
                <span className="text-[#a67c1e] font-serif font-bold">Date: </span>
                <span className="font-mono font-bold text-slate-900">{certData.issueDate}</span>
              </div>
            </div>
          </div>

          {/* CERTIFICATE MAIN BODY */}
          <div className="relative z-10 text-center mt-6 px-12">
            <p className="text-sm font-serif italic text-slate-600 mb-1">
              This is proudly presented and certified to
            </p>

            {/* Candidate Name in Ornate Calligraphic / Majestic Font */}
            <div className="my-2">
              <span className="text-3xl sm:text-4xl font-serif font-bold tracking-wider text-[#0b1d3a] border-b-2 border-[#cda037] pb-1 inline-block px-8">
                {certData.fullName}
              </span>
            </div>

            <p className="text-xs font-medium text-slate-600 mt-1">
              S/o / D/o / W/o : <span className="font-semibold text-slate-800">{certData.fatherOrHusbandName}</span>
            </p>

            {/* Nomination Declaration */}
            <p className="text-sm text-slate-700 max-w-2xl mx-auto leading-relaxed mt-4 font-serif">
              has been nominated / appointed as an active member of{' '}
              <span className="font-bold text-[#0b1d3a]">Veer Azad Charitable Foundation</span>{' '}
              under{' '}
              <span className="font-bold text-[#a67c1e] underline decoration-[#cda037]/60 underline-offset-4">
                {certData.wing}
              </span>{' '}
              —{' '}
              <span className="font-bold text-slate-900">
                {certData.division}
              </span>.
            </p>

            <p className="text-[11px] text-slate-500 italic max-w-xl mx-auto mt-2">
              Authorized to participate in official social upliftment drives, educational initiatives, and welfare assemblies in accordance with foundation bylaws.
            </p>
          </div>

          {/* BOTTOM ROW: QR Code + Gold Medallion + Chairman Signature */}
          <div className="absolute bottom-8 left-12 right-12 flex items-end justify-between z-10">
            
            {/* Left: Verifiable QR Code */}
            <div className="flex flex-col items-center">
              <div className="p-1 bg-white border border-[#cda037] shadow-sm rounded">
                {qrCodeUrl ? (
                  <img src={qrCodeUrl} alt="Verify Certificate QR" className="w-16 h-16" />
                ) : (
                  <div className="w-16 h-16 bg-stone-100 flex items-center justify-center text-[10px]">QR Code</div>
                )}
              </div>
              <span className="text-[9px] font-mono text-slate-600 font-bold mt-1 tracking-tight">
                SCAN TO VERIFY
              </span>
              <span className="text-[8px] text-emerald-700 font-bold">
                ● 100% SECURE
              </span>
            </div>

            {/* Center: Gold Foil Medallion Stamp */}
            <div className="flex flex-col items-center -mb-2">
              <div className="relative w-24 h-24">
                <img 
                  src="/assets/gold_medallion.png" 
                  alt="Official Gold Foil Medallion Seal" 
                  className="w-full h-full object-contain filter drop-shadow-md mix-blend-multiply"
                />
              </div>
              <span className="text-[9px] font-serif text-[#a67c1e] font-bold tracking-widest uppercase mt-0.5">
                OFFICIAL SEAL
              </span>
            </div>

            {/* Right: Chairman's Signature */}
            <div className="flex flex-col items-center">
              <div className="w-44 h-16 flex items-center justify-center">
                <img 
                  src="/assets/chairman_signature.png" 
                  alt="Chairman Signature" 
                  className="max-h-full object-contain filter contrast-150 mix-blend-multiply"
                />
              </div>
              <span className="text-[9px] text-slate-600 uppercase font-serif font-bold tracking-wider mt-0.5">
                CHAIRMAN & GOVERNING TRUSTEE
              </span>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
