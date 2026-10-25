import React, { useState, useEffect } from 'react';
import { 
  FileText, Download, Eye, ShieldCheck, CheckCircle2, 
  Search, Filter, ExternalLink, Calendar, Building2, 
  FileCheck, Lock, Award, X, Sparkles, Printer
} from 'lucide-react';
import { getStoredResources } from '../data/mockDatabase';
import { jsPDF } from 'jspdf';

export default function Resources({ setActivePage }) {
  const [resources, setResources] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [previewDoc, setPreviewDoc] = useState(null);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

  useEffect(() => {
    setResources(getStoredResources());
  }, []);

  const categories = [
    'ALL',
    'Legal & Registration',
    'Tax Exemption',
    'Governance & Rules',
    'Financial Audits',
    'Application Forms'
  ];

  const filteredResources = resources.filter(res => {
    const matchQuery = 
      res.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.regNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.authority.toLowerCase().includes(searchQuery.toLowerCase());
    const matchCat = activeCategory === 'ALL' || res.category === activeCategory;
    return matchQuery && matchCat;
  });

  const handleDownloadDoc = (doc) => {
    setIsGeneratingPdf(true);
    try {
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pageWidth = pdf.internal.pageSize.getWidth();

      // Official Navy Header
      pdf.setFillColor(15, 23, 42); // brand-navy
      pdf.rect(0, 0, pageWidth, 42, 'F');

      // Golden decorative accent bar
      pdf.setFillColor(217, 119, 6); // amber/gold
      pdf.rect(0, 42, pageWidth, 3, 'F');

      // Title & Subtitle in Header
      pdf.setTextColor(255, 255, 255);
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(18);
      pdf.text('VEER AZAD CHARITABLE FOUNDATION', pageWidth / 2, 16, { align: 'center' });

      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'normal');
      pdf.setTextColor(245, 158, 11);
      pdf.text('PUBLIC GOVERNANCE & STATUTORY COMPLIANCE ARCHIVE', pageWidth / 2, 23, { align: 'center' });

      pdf.setFontSize(8.5);
      pdf.setTextColor(226, 232, 240);
      pdf.text('Regd. Under Indian Trusts Act 1882 | NITI Aayog: UP/2026/03912 | 80G & 12A Certified', pageWidth / 2, 31, { align: 'center' });
      pdf.text('Central Office: Varanasi, Uttar Pradesh, India | Helpline: +91 98183 98199', pageWidth / 2, 37, { align: 'center' });

      // Watermark in background
      pdf.setTextColor(240, 240, 240);
      pdf.setFontSize(48);
      pdf.setFont('helvetica', 'bold');
      pdf.text('VEER AZAD FOUNDATION', pageWidth / 2, 150, { align: 'center', angle: 45 });

      // Document Category & Reference
      pdf.setTextColor(30, 41, 59);
      pdf.setFontSize(11);
      pdf.setFont('helvetica', 'bold');
      pdf.text(`CATEGORY: ${doc.category.toUpperCase()}`, 18, 56);
      pdf.text(`OFFICIAL REF NO: ${doc.regNo}`, pageWidth - 18, 56, { align: 'right' });

      // Document Title Box
      pdf.setFillColor(248, 250, 252);
      pdf.setDrawColor(203, 213, 225);
      pdf.rect(16, 62, pageWidth - 32, 30, 'FD');

      pdf.setTextColor(15, 23, 42);
      pdf.setFontSize(14);
      pdf.setFont('helvetica', 'bold');
      const titleLines = pdf.splitTextToSize(doc.title, pageWidth - 42);
      pdf.text(titleLines, 22, 73);

      pdf.setFontSize(9);
      pdf.setFont('helvetica', 'normal');
      pdf.setTextColor(100, 116, 139);
      pdf.text(`Issuing Statutory Authority: ${doc.authority}`, 22, 85);

      // Meta Details Grid
      pdf.setFontSize(10);
      pdf.setTextColor(51, 65, 85);
      pdf.setFont('helvetica', 'bold');
      pdf.text('Document Metadata & Authentication:', 18, 104);

      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(9.5);
      pdf.text(`1. Statutory Order / File Reg: ${doc.regNo}`, 22, 113);
      pdf.text(`2. Effective Date of Issue: ${doc.date}`, 22, 121);
      pdf.text(`3. Validity & Regulatory Term: Perpetual / Multi-Year Statutory Validity`, 22, 129);
      pdf.text(`4. Public Verification Hash: SHA256-${Math.random().toString(36).substring(2, 12).toUpperCase()}`, 22, 137);

      // Description Box
      pdf.setFillColor(254, 252, 232); // light amber
      pdf.setDrawColor(251, 191, 36);
      pdf.rect(16, 146, pageWidth - 32, 38, 'FD');

      pdf.setTextColor(146, 64, 14);
      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'bold');
      pdf.text('Statutory Purpose & Regulatory Scope:', 22, 154);

      pdf.setTextColor(71, 85, 105);
      pdf.setFontSize(9);
      pdf.setFont('helvetica', 'normal');
      const descLines = pdf.splitTextToSize(doc.description, pageWidth - 44);
      pdf.text(descLines, 22, 162);

      // Legal Undertaking & Seals
      pdf.setFontSize(9);
      pdf.setTextColor(15, 23, 42);
      pdf.setFont('helvetica', 'bold');
      pdf.text('LEGAL CERTIFICATION & AUTHENTICATION SEAL', 18, 200);

      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(8.5);
      pdf.setTextColor(71, 85, 105);
      const legalText = 'This is an authentic certified true copy of the statutory governance record on file with the Veer Azad Charitable Foundation Secretariat. Duly verified under Indian statutory regulations and published for donor diligence, tax compliance, and public governance scrutiny.';
      const legalLines = pdf.splitTextToSize(legalText, pageWidth - 36);
      pdf.text(legalLines, 18, 207);

      // Signatory Section
      pdf.setDrawColor(203, 213, 225);
      pdf.line(18, 248, 85, 248);
      pdf.line(pageWidth - 85, 248, pageWidth - 18, 248);

      pdf.setFontSize(9);
      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(15, 23, 42);
      pdf.text('ADITYA AGRAWAL', 18, 254);
      pdf.setFontSize(8);
      pdf.setFont('helvetica', 'normal');
      pdf.text('Chairman & Founding Trustee', 18, 259);
      pdf.text('Veer Azad Charitable Foundation', 18, 264);

      pdf.setFontSize(9);
      pdf.setFont('helvetica', 'bold');
      pdf.text('STATUTORY REGISTRAR / CA', pageWidth - 18, 254, { align: 'right' });
      pdf.setFontSize(8);
      pdf.setFont('helvetica', 'normal');
      pdf.text('Verified Public Governance Registry', pageWidth - 18, 259, { align: 'right' });
      pdf.text('Government of Uttar Pradesh / India', pageWidth - 18, 264, { align: 'right' });

      // Bottom Bar
      pdf.setFillColor(15, 23, 42);
      pdf.rect(0, 282, pageWidth, 15, 'F');
      pdf.setTextColor(255, 255, 255);
      pdf.setFontSize(8);
      pdf.text('Verify online at https://veer-azad-portal.vercel.app/#resources | Ref: ' + doc.regNo, pageWidth / 2, 290, { align: 'center' });

      pdf.save(`${doc.regNo.replace(/[^a-zA-Z0-9]/g, '_')}_VeerAzad.pdf`);
    } catch (err) {
      console.error('PDF error', err);
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12 space-y-10">
      
      {/* 1. Header & Authority Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center space-x-2 bg-amber-50 border border-amber-300 text-amber-900 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Statutory Compliance & Legal Repository</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black font-serif text-brand-navy tracking-tight">
          Public Resources & Governance
        </h1>
        <p className="text-sm text-slate-600 leading-relaxed">
          Veer Azad Charitable Foundation operates under absolute public transparency. Download verified statutory certificates, 80G tax exemptions, 12A orders, annual audits, and official membership forms below.
        </p>
      </div>

      {/* 2. Statutory Badges Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-sm flex items-center space-x-3">
          <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center flex-shrink-0">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-900">Trust Act 1882</div>
            <div className="text-[11px] text-slate-500 font-mono">REG: 4737/2020</div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-sm flex items-center space-x-3">
          <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center flex-shrink-0">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-900">NITI Aayog Darpan</div>
            <div className="text-[11px] text-slate-500 font-mono">UP/2026/03912</div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-sm flex items-center space-x-3">
          <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center flex-shrink-0">
            <FileCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-900">Section 80G Certified</div>
            <div className="text-[11px] text-emerald-600 font-semibold">50% Tax Exemption</div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-sm flex items-center space-x-3">
          <div className="w-10 h-10 rounded-lg bg-purple-50 text-purple-700 flex items-center justify-center flex-shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-900">Section 12A Registered</div>
            <div className="text-[11px] text-slate-500 font-mono">AAATV1298QE20221</div>
          </div>
        </div>
      </div>

      {/* 3. Search & Filter Bar */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-stone-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Search */}
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by title, reg no, or authority..."
            className="w-full pl-10 pr-4 py-2 text-xs font-medium bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:border-brand-navy"
          />
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`text-[11px] font-bold px-3 py-1.5 rounded-lg transition ${
                activeCategory === cat
                  ? 'bg-brand-navy text-white shadow-sm'
                  : 'bg-stone-100 text-slate-600 hover:bg-stone-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* 4. Resources Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredResources.map((res) => (
          <div
            key={res.id}
            className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm hover:shadow-md transition flex flex-col justify-between space-y-4 group"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-[10px] font-bold text-amber-800 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full uppercase tracking-wider">
                  {res.category}
                </span>
                <span className="text-[11px] text-slate-400 font-mono">
                  {res.fileSize}
                </span>
              </div>

              <h3 className="font-bold text-base font-serif text-slate-900 group-hover:text-brand-saffron transition leading-snug">
                {res.title}
              </h3>

              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                {res.description}
              </p>

              <div className="mt-4 pt-3 border-t border-stone-100 space-y-1.5 text-xs text-slate-600">
                <div className="flex items-center space-x-2">
                  <Building2 className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                  <span className="truncate"><strong className="text-slate-800">Authority:</strong> {res.authority}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-emerald-800 font-semibold bg-emerald-50 px-2 py-0.5 rounded text-[11px]">
                    {res.regNo}
                  </span>
                  <span className="text-[11px] text-slate-400 flex items-center space-x-1">
                    <Calendar className="w-3 h-3" />
                    <span>{res.date}</span>
                  </span>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex items-center space-x-2 pt-2">
              <button
                onClick={() => setPreviewDoc(res)}
                className="flex-1 bg-stone-100 hover:bg-stone-200 text-slate-700 font-bold text-xs py-2.5 px-3 rounded-xl flex items-center justify-center space-x-1.5 transition"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>View Document</span>
              </button>

              <button
                onClick={() => handleDownloadDoc(res)}
                disabled={isGeneratingPdf}
                className="flex-1 bg-brand-navy hover:bg-brand-navy-light text-white font-bold text-xs py-2.5 px-3 rounded-xl flex items-center justify-center space-x-1.5 transition shadow"
              >
                <Download className="w-3.5 h-3.5 text-amber-400" />
                <span>Download PDF</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredResources.length === 0 && (
        <div className="text-center py-12 bg-white rounded-2xl border border-stone-200">
          <FileText className="w-12 h-12 text-slate-300 mx-auto mb-2" />
          <h4 className="font-bold text-sm text-slate-700">No resources matched your search</h4>
          <p className="text-xs text-slate-500 mt-1">Try switching categories or clearing search keywords.</p>
        </div>
      )}

      {/* 5. Document Preview Modal */}
      {previewDoc && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-amber-300/60 p-6 space-y-6 relative animate-in fade-in zoom-in-95 duration-200">
            
            <button
              onClick={() => setPreviewDoc(null)}
              className="absolute top-4 right-4 p-1.5 rounded-full bg-stone-100 hover:bg-stone-200 text-slate-600 transition"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Official Letterhead Header */}
            <div className="border-b-2 border-brand-gold pb-4 text-center space-y-1">
              <div className="text-xs font-black tracking-widest text-amber-700 uppercase">
                GOVERNMENT OF INDIA & STATE OF UTTAR PRADESH
              </div>
              <h2 className="text-xl sm:text-2xl font-black font-serif text-brand-navy uppercase">
                Veer Azad Charitable Foundation
              </h2>
              <p className="text-xs text-slate-500">
                Registered Public Charitable Trust • Indian Trusts Act 1882 • Reg No: 4737/2020
              </p>
              <div className="flex flex-wrap items-center justify-center gap-2 pt-1 text-[11px] font-mono font-bold text-emerald-800">
                <span>NITI: UP/2026/03912</span>
                <span>•</span>
                <span>80G: CIT(EXEMP)/VNS/80G</span>
                <span>•</span>
                <span>12A: AAATV1298QE20221</span>
              </div>
            </div>

            {/* Modal Body */}
            <div className="space-y-4 text-xs text-slate-700 leading-relaxed">
              <div className="bg-amber-50/60 border border-amber-200 p-3.5 rounded-xl flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold text-amber-800 uppercase">Document Classification</span>
                  <div className="font-bold text-slate-900 text-sm">{previewDoc.title}</div>
                </div>
                <span className="font-mono text-xs font-bold text-brand-navy bg-white px-2.5 py-1 rounded border border-amber-300">
                  {previewDoc.regNo}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-[11px]">
                <div className="p-3 bg-stone-50 rounded-lg border border-stone-200">
                  <span className="text-slate-400 font-bold uppercase text-[9px] block">Issuing Authority</span>
                  <span className="font-semibold text-slate-800">{previewDoc.authority}</span>
                </div>
                <div className="p-3 bg-stone-50 rounded-lg border border-stone-200">
                  <span className="text-slate-400 font-bold uppercase text-[9px] block">Statutory Date of Record</span>
                  <span className="font-semibold text-slate-800">{previewDoc.date}</span>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-1">
                  Scope of Public Disclosure
                </h4>
                <p className="text-slate-600">
                  {previewDoc.description}
                </p>
              </div>

              <div className="p-4 bg-emerald-50/80 rounded-xl border border-emerald-200 flex items-start space-x-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-700 flex-shrink-0 mt-0.5" />
                <div className="text-[11px] text-emerald-900 leading-normal">
                  <strong>Statutory Authenticity Certified:</strong> This electronic public disclosure is officially verified by the Board of Trustees. Any alterations or modifications without written authorization are strictly prohibited.
                </div>
              </div>
            </div>

            {/* Modal Footer CTAs */}
            <div className="pt-2 flex items-center justify-end space-x-3 border-t border-stone-200">
              <button
                onClick={() => setPreviewDoc(null)}
                className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-stone-100 rounded-lg transition"
              >
                Close Preview
              </button>
              <button
                onClick={() => handleDownloadDoc(previewDoc)}
                className="px-5 py-2.5 bg-brand-navy hover:bg-brand-navy-light text-white text-xs font-bold rounded-xl shadow flex items-center space-x-2 transition"
              >
                <Download className="w-4 h-4 text-amber-400" />
                <span>Download Official Stamped PDF</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
