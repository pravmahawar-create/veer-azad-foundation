import React, { useState, useEffect } from 'react';
import { 
  Users, Award, ShieldCheck, CheckCircle2, Clock, 
  Search, Filter, Download, Plus, Sparkles, Check, Lock, LogOut,
  Trash2, Edit3, Newspaper, HeartHandshake, FileText, UserPlus,
  AlertCircle, X, ChevronRight, Image as ImageIcon, CheckCheck
} from 'lucide-react';
import { 
  getStoredMembers, saveMembers, 
  getStoredVolunteers, saveVolunteers, 
  getStoredCampaigns, saveCampaigns,
  getStoredResources, saveResources,
  getStoredNews, saveNews,
  getStoredTeam, saveTeam,
  FOUNDATION_WINGS, MEMBERSHIP_PLANS 
} from '../data/mockDatabase';
import CertificateCanvas from '../components/CertificateCanvas';
import IdCardCanvas from '../components/IdCardCanvas';
import AppointmentLetterCanvas from '../components/AppointmentLetterCanvas';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('members'); // 'members' | 'campaigns' | 'resources' | 'news' | 'team' | 'volunteers' | 'studio'
  
  // Data stores
  const [members, setMembers] = useState([]);
  const [volunteers, setVolunteers] = useState([]);
  const [campaigns, setCampaigns] = useState([]);
  const [resources, setResources] = useState([]);
  const [newsList, setNewsList] = useState([]);
  const [teamList, setTeamList] = useState([]);

  // Filter & Search states
  const [searchQuery, setSearchQuery] = useState('');
  const [filterWing, setFilterWing] = useState('ALL');
  const [selectedMemberForStudio, setSelectedMemberForStudio] = useState(null);
  const [studioMode, setStudioMode] = useState('certificate'); // 'certificate' | 'appointment' | 'idcard'

  // Modals for CRUD Add
  const [showAddMemberModal, setShowAddMemberModal] = useState(false);
  const [showAddCampaignModal, setShowAddCampaignModal] = useState(false);
  const [showAddResourceModal, setShowAddResourceModal] = useState(false);
  const [showAddNewsModal, setShowAddNewsModal] = useState(false);
  const [showAddTeamModal, setShowAddTeamModal] = useState(false);

  // Success Notification Toast
  const [toastMsg, setToastMsg] = useState('');

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 3500);
  };

  // Form states
  const [newMember, setNewMember] = useState({
    fullName: '',
    fatherOrHusbandName: '',
    email: '',
    phone: '',
    wing: 'Women Wing',
    division: 'Varanasi Division',
    plan: 'Active Membership',
    fee: 2100,
    bloodGroup: 'B+',
    address: ''
  });

  const [newCampaign, setNewCampaign] = useState({
    title: '',
    subtitle: '',
    goal: 500000,
    raised: 50000,
    donorsCount: 24,
    category: 'Education',
    image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80'
  });

  const [newResource, setNewResource] = useState({
    title: '',
    category: 'Legal & Registration',
    regNo: 'VACF/DOC/2026/',
    authority: 'Governing Council of Veer Azad Foundation',
    date: '2026',
    fileSize: '1.2 MB',
    fileType: 'PDF Document',
    description: ''
  });

  const [newNews, setNewNews] = useState({
    title: '',
    date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }),
    isBreaking: true
  });

  const [newTeam, setNewTeam] = useState({
    name: '',
    designation: '',
    hindi: '',
    location: 'Varanasi Office',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    bio: ''
  });

  // Load initial data
  useEffect(() => {
    const mems = getStoredMembers();
    const vols = getStoredVolunteers();
    const camps = getStoredCampaigns();
    const res = getStoredResources();
    const news = getStoredNews();
    const team = getStoredTeam();

    setMembers(mems);
    setVolunteers(vols);
    setCampaigns(camps);
    setResources(res);
    setNewsList(news);
    setTeamList(team);

    if (mems.length > 0) {
      setSelectedMemberForStudio(mems[0]);
    }
  }, []);

  // ==========================================
  // CRUD HANDLERS: MEMBERS
  // ==========================================
  const handleApproveMember = (id) => {
    const updated = members.map(m => {
      if (m.id === id) {
        return {
          ...m,
          status: 'Approved',
          approvedDate: new Date().toLocaleDateString('en-GB'),
          certificateIssued: true,
          certificateNo: `VACF-MEM-2026-${m.regNo}`
        };
      }
      return m;
    });
    setMembers(updated);
    saveMembers(updated);
    showToast('Member Approved & Certificate Registry Updated!');
  };

  const handleDeleteMember = (id) => {
    if (!window.confirm('Are you sure you want to delete this member from the official registry?')) return;
    const updated = members.filter(m => m.id !== id);
    setMembers(updated);
    saveMembers(updated);
    showToast('Member removed from registry.');
  };

  const handleAddMember = (e) => {
    e.preventDefault();
    if (!newMember.fullName.trim()) return;

    const nextRegNo = (Math.floor(Math.random() * 900000) + 100000).toString();
    const createdMember = {
      id: `mem_${Date.now()}`,
      regNo: nextRegNo,
      fullName: newMember.fullName.toUpperCase(),
      fatherOrHusbandName: newMember.fatherOrHusbandName || 'Official Guardian',
      email: newMember.email || 'member@veerazad.org',
      phone: newMember.phone || '+91 98183 98199',
      wing: newMember.wing,
      division: newMember.division,
      plan: newMember.plan,
      fee: Number(newMember.fee) || 2100,
      paymentStatus: 'Paid',
      paymentMethod: 'ONLINE',
      paymentRef: `PAY_ADM_${Date.now().toString().slice(-6)}`,
      status: 'Approved',
      appliedDate: new Date().toISOString().split('T')[0],
      approvedDate: new Date().toISOString().split('T')[0],
      certificateIssued: true,
      certificateNo: `VACF-MEM-2026-${nextRegNo}`,
      signatory: 'Aditya Agrawal (Chairman)',
      bloodGroup: newMember.bloodGroup,
      address: newMember.address || 'Varanasi Central Office'
    };

    const updated = [createdMember, ...members];
    setMembers(updated);
    saveMembers(updated);
    setSelectedMemberForStudio(createdMember);
    setShowAddMemberModal(false);
    setNewMember({
      fullName: '',
      fatherOrHusbandName: '',
      email: '',
      phone: '',
      wing: 'Women Wing',
      division: 'Varanasi Division',
      plan: 'Active Membership',
      fee: 2100,
      bloodGroup: 'B+',
      address: ''
    });
    showToast(`New Member ${createdMember.fullName} added & Certificate issued!`);
  };

  // ==========================================
  // CRUD HANDLERS: CAMPAIGNS
  // ==========================================
  const handleDeleteCampaign = (id) => {
    if (!window.confirm('Delete this welfare campaign?')) return;
    const updated = campaigns.filter(c => c.id !== id);
    setCampaigns(updated);
    saveCampaigns(updated);
    showToast('Campaign deleted successfully.');
  };

  const handleAddCampaign = (e) => {
    e.preventDefault();
    if (!newCampaign.title.trim()) return;

    const created = {
      id: `camp_${Date.now()}`,
      title: newCampaign.title,
      subtitle: newCampaign.subtitle,
      goal: Number(newCampaign.goal) || 500000,
      raised: Number(newCampaign.raised) || 0,
      donorsCount: Number(newCampaign.donorsCount) || 1,
      category: newCampaign.category,
      image: newCampaign.image,
      active: true
    };

    const updated = [created, ...campaigns];
    setCampaigns(updated);
    saveCampaigns(updated);
    setShowAddCampaignModal(false);
    setNewCampaign({
      title: '',
      subtitle: '',
      goal: 500000,
      raised: 50000,
      donorsCount: 24,
      category: 'Education',
      image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80'
    });
    showToast('New Campaign launched and published live!');
  };

  // ==========================================
  // CRUD HANDLERS: RESOURCES / LEGAL DOCS
  // ==========================================
  const handleDeleteResource = (id) => {
    if (!window.confirm('Delete this official statutory resource?')) return;
    const updated = resources.filter(r => r.id !== id);
    setResources(updated);
    saveResources(updated);
    showToast('Statutory resource removed from public repository.');
  };

  const handleAddResource = (e) => {
    e.preventDefault();
    if (!newResource.title.trim()) return;

    const created = {
      id: `res_${Date.now()}`,
      title: newResource.title,
      category: newResource.category,
      regNo: newResource.regNo,
      authority: newResource.authority,
      date: newResource.date,
      fileSize: newResource.fileSize,
      fileType: newResource.fileType,
      description: newResource.description
    };

    const updated = [created, ...resources];
    setResources(updated);
    saveResources(updated);
    setShowAddResourceModal(false);
    setNewResource({
      title: '',
      category: 'Legal & Registration',
      regNo: 'VACF/DOC/2026/',
      authority: 'Governing Council of Veer Azad Foundation',
      date: '2026',
      fileSize: '1.2 MB',
      fileType: 'PDF Document',
      description: ''
    });
    showToast('Statutory document added to Resources Archive!');
  };

  // ==========================================
  // CRUD HANDLERS: NEWS TICKER
  // ==========================================
  const handleDeleteNews = (id) => {
    const updated = newsList.filter(n => n.id !== id);
    setNewsList(updated);
    saveNews(updated);
    showToast('News headline removed.');
  };

  const handleAddNews = (e) => {
    e.preventDefault();
    if (!newNews.title.trim()) return;

    const created = {
      id: `news_${Date.now()}`,
      title: newNews.title,
      date: newNews.date,
      isBreaking: newNews.isBreaking
    };

    const updated = [created, ...newsList];
    setNewsList(updated);
    saveNews(updated);
    setShowAddNewsModal(false);
    setNewNews({
      title: '',
      date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }),
      isBreaking: true
    });
    showToast('Live news ticker updated!');
  };

  // ==========================================
  // CRUD HANDLERS: TEAM LEADERSHIP
  // ==========================================
  const handleDeleteTeam = (id) => {
    if (!window.confirm('Remove council member?')) return;
    const updated = teamList.filter(t => t.id !== id);
    setTeamList(updated);
    saveTeam(updated);
    showToast('Council member removed.');
  };

  const handleAddTeam = (e) => {
    e.preventDefault();
    if (!newTeam.name.trim()) return;

    const created = {
      id: `team_${Date.now()}`,
      name: newTeam.name.toUpperCase(),
      designation: newTeam.designation.toUpperCase(),
      hindi: newTeam.hindi,
      location: newTeam.location,
      image: newTeam.image,
      bio: newTeam.bio
    };

    const updated = [...teamList, created];
    setTeamList(updated);
    saveTeam(updated);
    setShowAddTeamModal(false);
    setNewTeam({
      name: '',
      designation: '',
      hindi: '',
      location: 'Varanasi Office',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      bio: ''
    });
    showToast('Council Leader added to Our Team!');
  };

  // ==========================================
  // CRUD HANDLERS: VOLUNTEERS
  // ==========================================
  const handleDeleteVolunteer = (id) => {
    if (!window.confirm('Delete volunteer record?')) return;
    const updated = volunteers.filter(v => v.id !== id);
    setVolunteers(updated);
    saveVolunteers(updated);
    showToast('Volunteer record removed.');
  };

  const handleApproveVolunteer = (id) => {
    const updated = volunteers.map(v => {
      if (v.id === id) {
        return {
          ...v,
          status: 'Approved',
          certificateIssued: true,
          certificateNo: `VACF-VOL-2026-${v.refNo}`
        };
      }
      return v;
    });
    setVolunteers(updated);
    saveVolunteers(updated);
    showToast('Volunteer Approved & Certified!');
  };

  const handleOpenInStudio = (member) => {
    setSelectedMemberForStudio(member);
    setActiveTab('studio');
  };

  // Filtered members list
  const filteredMembers = members.filter(m => {
    const matchQuery = 
      m.fullName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.regNo?.includes(searchQuery) ||
      m.division?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchWing = filterWing === 'ALL' || m.wing === filterWing;
    return matchQuery && matchWing;
  });

  const totalFunds = members.reduce((sum, m) => sum + (m.fee || 0), 0) + 125000;
  const certificatesIssued = members.filter(m => m.certificateIssued).length + volunteers.filter(v => v.certificateIssued).length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10 space-y-8">
      
      {/* Toast Alert */}
      {toastMsg && (
        <div className="fixed top-20 right-6 z-50 bg-brand-navy text-white px-5 py-3 rounded-xl shadow-2xl border border-amber-400 flex items-center space-x-2 animate-in slide-in-from-top duration-300">
          <CheckCheck className="w-4 h-4 text-emerald-400" />
          <span className="text-xs font-bold">{toastMsg}</span>
        </div>
      )}

      {/* Top Header */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center space-x-3.5">
          <div className="w-12 h-12 rounded-xl bg-brand-navy text-amber-400 flex items-center justify-center font-black font-serif text-xl border border-brand-gold shadow">
            VA
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-xl font-black font-serif text-slate-900 uppercase">
                Executive Admin Console & CMS
              </h1>
              <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                FULL CRUD LIVE
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Veer Azad Charitable Foundation • Central Management, Certificate Issuance & Public CMS
            </p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap items-center gap-1.5 bg-stone-100 p-1.5 rounded-xl border border-stone-200 text-xs font-bold">
          <button
            onClick={() => setActiveTab('members')}
            className={`px-3 py-1.5 rounded-lg transition ${
              activeTab === 'members' ? 'bg-brand-navy text-white shadow' : 'text-slate-700 hover:bg-stone-200'
            }`}
          >
            Members ({members.length})
          </button>
          
          <button
            onClick={() => setActiveTab('campaigns')}
            className={`px-3 py-1.5 rounded-lg transition ${
              activeTab === 'campaigns' ? 'bg-brand-navy text-white shadow' : 'text-slate-700 hover:bg-stone-200'
            }`}
          >
            Campaigns ({campaigns.length})
          </button>

          <button
            onClick={() => setActiveTab('resources')}
            className={`px-3 py-1.5 rounded-lg transition ${
              activeTab === 'resources' ? 'bg-brand-navy text-white shadow' : 'text-slate-700 hover:bg-stone-200'
            }`}
          >
            Resources ({resources.length})
          </button>

          <button
            onClick={() => setActiveTab('team')}
            className={`px-3 py-1.5 rounded-lg transition ${
              activeTab === 'team' ? 'bg-brand-navy text-white shadow' : 'text-slate-700 hover:bg-stone-200'
            }`}
          >
            Team ({teamList.length})
          </button>

          <button
            onClick={() => setActiveTab('news')}
            className={`px-3 py-1.5 rounded-lg transition ${
              activeTab === 'news' ? 'bg-brand-navy text-white shadow' : 'text-slate-700 hover:bg-stone-200'
            }`}
          >
            News ({newsList.length})
          </button>

          <button
            onClick={() => setActiveTab('volunteers')}
            className={`px-3 py-1.5 rounded-lg transition ${
              activeTab === 'volunteers' ? 'bg-brand-navy text-white shadow' : 'text-slate-700 hover:bg-stone-200'
            }`}
          >
            Volunteers ({volunteers.length})
          </button>

          <button
            onClick={() => setActiveTab('studio')}
            className={`px-3 py-1.5 rounded-lg transition flex items-center space-x-1 ${
              activeTab === 'studio' ? 'bg-amber-500 text-slate-950 shadow' : 'text-slate-700 hover:bg-stone-200'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Studio</span>
          </button>
        </div>
      </div>

      {/* KPI METRIC CARDS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-sm">
          <span className="text-xs font-bold text-slate-500 uppercase">Total Members</span>
          <div className="text-2xl sm:text-3xl font-black text-brand-navy font-serif mt-1">{members.length}</div>
          <span className="text-[11px] text-emerald-600 font-semibold">Active in 8 districts</span>
        </div>

        <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-sm">
          <span className="text-xs font-bold text-slate-500 uppercase">Certificates Issued</span>
          <div className="text-2xl sm:text-3xl font-black text-amber-700 font-serif mt-1">{certificatesIssued}</div>
          <span className="text-[11px] text-slate-500 font-medium">Tamper-proof with QR</span>
        </div>

        <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-sm">
          <span className="text-xs font-bold text-slate-500 uppercase">Live Campaigns</span>
          <div className="text-2xl sm:text-3xl font-black text-orange-600 font-serif mt-1">
            {campaigns.length}
          </div>
          <span className="text-[11px] text-orange-700 font-medium">80G tax receipt ready</span>
        </div>

        <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-sm">
          <span className="text-xs font-bold text-slate-500 uppercase">Membership Receipts</span>
          <div className="text-2xl sm:text-3xl font-black text-emerald-700 font-serif mt-1">
            ₹{totalFunds.toLocaleString('en-IN')}
          </div>
          <span className="text-[11px] text-slate-500 font-medium">Audited & 80G Compliant</span>
        </div>
      </div>

      {/* ======================================================== */}
      {/* TAB 1: MEMBERSHIP TABLE (WITH ADD & REMOVE) */}
      {/* ======================================================== */}
      {activeTab === 'members' && (
        <div className="bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden space-y-0">
          {/* Controls Bar */}
          <div className="p-4 border-b border-stone-200 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center space-x-2 flex-1 max-w-md">
              <Search className="w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search member by name, reg number, or division..."
                className="w-full text-xs font-medium text-slate-800 bg-transparent focus:outline-none"
              />
            </div>

            <div className="flex items-center space-x-3">
              <select
                value={filterWing}
                onChange={(e) => setFilterWing(e.target.value)}
                className="text-xs bg-stone-50 border border-stone-300 rounded-lg px-2.5 py-1.5 focus:outline-none"
              >
                <option value="ALL">All Wings</option>
                {FOUNDATION_WINGS.map(w => (
                  <option key={w.id} value={w.name}>{w.name}</option>
                ))}
              </select>

              <button
                onClick={() => setShowAddMemberModal(true)}
                className="bg-brand-navy hover:bg-brand-navy-light text-white text-xs font-bold px-3.5 py-2 rounded-lg flex items-center space-x-1.5 shadow"
              >
                <Plus className="w-3.5 h-3.5 text-amber-400" />
                <span>Add Member</span>
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-stone-50 text-slate-900 font-bold uppercase tracking-wider text-[10px] border-b border-stone-200">
                <tr>
                  <th className="py-3 px-4">Reg No</th>
                  <th className="py-3 px-4">Candidate Name</th>
                  <th className="py-3 px-4">Wing / Division</th>
                  <th className="py-3 px-4">Plan / Fee</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {filteredMembers.map((m) => (
                  <tr key={m.id} className="hover:bg-amber-50/40 transition">
                    <td className="py-3 px-4 font-mono font-bold text-brand-navy">
                      {m.regNo}
                    </td>
                    <td className="py-3 px-4 font-bold text-slate-900">
                      <div>{m.fullName}</div>
                      <div className="text-[10px] text-slate-400 font-normal">S/o: {m.fatherOrHusbandName}</div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-semibold text-amber-800">{m.wing}</div>
                      <div className="text-[10px] text-slate-500">{m.division}</div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="font-semibold">{m.plan}</span>
                      <div className="text-[10px] text-emerald-700 font-bold">₹{m.fee} ({m.paymentStatus})</div>
                    </td>
                    <td className="py-3 px-4">
                      {m.status === 'Approved' ? (
                        <span className="inline-flex items-center space-x-1 bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded text-[10px] border border-emerald-200">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Approved</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center space-x-1 bg-orange-50 text-orange-700 font-bold px-2 py-0.5 rounded text-[10px] border border-orange-200">
                          <Clock className="w-3 h-3" />
                          <span>Pending</span>
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-right space-x-1.5 whitespace-nowrap">
                      {m.status === 'Pending' && (
                        <button
                          onClick={() => handleApproveMember(m.id)}
                          className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px] px-2.5 py-1 rounded shadow-sm"
                        >
                          Approve
                        </button>
                      )}
                      <button
                        onClick={() => handleOpenInStudio(m)}
                        className="bg-brand-navy hover:bg-brand-navy-light text-white font-bold text-[11px] px-2.5 py-1 rounded shadow-sm"
                      >
                        Issue Studio
                      </button>
                      <button
                        onClick={() => handleDeleteMember(m.id)}
                        className="p-1 text-rose-600 hover:bg-rose-50 rounded"
                        title="Delete Member"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 2: CAMPAIGNS MANAGER (WITH ADD & REMOVE) */}
      {/* ======================================================== */}
      {activeTab === 'campaigns' && (
        <div className="bg-white rounded-2xl shadow-sm border border-stone-200 p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-base font-serif text-slate-900">
                Welfare Campaigns & Relief Drives Manager
              </h3>
              <p className="text-xs text-slate-500">
                Add, manage goals, update funding numbers, or remove public donation campaigns.
              </p>
            </div>
            <button
              onClick={() => setShowAddCampaignModal(true)}
              className="bg-brand-navy hover:bg-brand-navy-light text-white text-xs font-bold px-4 py-2.5 rounded-xl flex items-center space-x-1.5 shadow"
            >
              <Plus className="w-4 h-4 text-amber-400" />
              <span>Create New Campaign</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {campaigns.map((camp) => {
              const pct = Math.min(100, Math.round((camp.raised / camp.goal) * 100));
              return (
                <div key={camp.id} className="border border-stone-200 rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="relative h-40">
                      <img src={camp.image} alt={camp.title} className="w-full h-full object-cover" />
                      <span className="absolute top-3 left-3 bg-brand-navy text-white font-bold text-[10px] px-2 py-0.5 rounded">
                        {camp.category}
                      </span>
                    </div>
                    <div className="p-4 space-y-2">
                      <h4 className="font-bold text-sm font-serif text-slate-900 leading-snug">{camp.title}</h4>
                      <p className="text-xs text-slate-500 line-clamp-2">{camp.subtitle}</p>
                      <div className="pt-2">
                        <div className="flex justify-between text-xs font-semibold">
                          <span className="text-emerald-700 font-bold">₹{camp.raised.toLocaleString('en-IN')}</span>
                          <span className="text-slate-400">Goal: ₹{camp.goal.toLocaleString('en-IN')}</span>
                        </div>
                        <div className="w-full bg-stone-100 h-2 rounded-full overflow-hidden mt-1">
                          <div className="bg-brand-saffron h-full rounded-full" style={{ width: `${pct}%` }}></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-stone-50 border-t border-stone-200 flex items-center justify-between">
                    <span className="text-[11px] text-slate-500 font-semibold">{camp.donorsCount} Donors</span>
                    <button
                      onClick={() => handleDeleteCampaign(camp.id)}
                      className="text-xs font-bold text-rose-600 hover:text-rose-800 flex items-center space-x-1 bg-white border border-rose-200 px-2.5 py-1 rounded-lg"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Remove</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 3: RESOURCES & STATUTORY DOCS (WITH ADD & REMOVE) */}
      {/* ======================================================== */}
      {activeTab === 'resources' && (
        <div className="bg-white rounded-2xl shadow-sm border border-stone-200 p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-base font-serif text-slate-900">
                Statutory Documents & Public Resources Repository
              </h3>
              <p className="text-xs text-slate-500">
                Manage 80G approvals, Trust deed, NITI Aayog registrations, and downloadable forms.
              </p>
            </div>
            <button
              onClick={() => setShowAddResourceModal(true)}
              className="bg-brand-navy hover:bg-brand-navy-light text-white text-xs font-bold px-4 py-2.5 rounded-xl flex items-center space-x-1.5 shadow"
            >
              <Plus className="w-4 h-4 text-amber-400" />
              <span>Add Resource / Document</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-stone-50 text-slate-900 font-bold uppercase text-[10px] border-b border-stone-200">
                <tr>
                  <th className="py-3 px-4">Document Title</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Registration / Order No</th>
                  <th className="py-3 px-4">Issuing Authority</th>
                  <th className="py-3 px-4">Format / Size</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {resources.map((res) => (
                  <tr key={res.id} className="hover:bg-amber-50/40 transition">
                    <td className="py-3 px-4 font-bold text-slate-900">
                      {res.title}
                    </td>
                    <td className="py-3 px-4">
                      <span className="bg-amber-50 border border-amber-200 text-amber-800 text-[10px] font-bold px-2 py-0.5 rounded">
                        {res.category}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-mono font-bold text-emerald-800">
                      {res.regNo}
                    </td>
                    <td className="py-3 px-4 text-slate-600">
                      {res.authority}
                    </td>
                    <td className="py-3 px-4 text-slate-400 font-mono">
                      {res.fileSize}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => handleDeleteResource(res.id)}
                        className="text-rose-600 hover:text-rose-800 p-1.5 hover:bg-rose-50 rounded"
                        title="Delete Document"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 4: LEADERSHIP COUNCIL TEAM (WITH ADD & REMOVE) */}
      {/* ======================================================== */}
      {activeTab === 'team' && (
        <div className="bg-white rounded-2xl shadow-sm border border-stone-200 p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-base font-serif text-slate-900">
                Board of Trustees & Council Leadership
              </h3>
              <p className="text-xs text-slate-500">
                Add, manage, and update public profiles of foundation office bearers.
              </p>
            </div>
            <button
              onClick={() => setShowAddTeamModal(true)}
              className="bg-brand-navy hover:bg-brand-navy-light text-white text-xs font-bold px-4 py-2.5 rounded-xl flex items-center space-x-1.5 shadow"
            >
              <Plus className="w-4 h-4 text-amber-400" />
              <span>Add Council Member</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {teamList.map((t) => (
              <div key={t.id} className="border border-stone-200 rounded-2xl p-4 flex items-center space-x-4 shadow-sm hover:shadow-md transition">
                <img src={t.image} alt={t.name} className="w-16 h-16 rounded-xl object-cover border border-amber-300 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-xs text-slate-900 truncate">{t.name}</h4>
                  <div className="text-[11px] text-amber-800 font-semibold truncate">{t.designation}</div>
                  <div className="text-[10px] text-slate-400">{t.location}</div>
                </div>
                <button
                  onClick={() => handleDeleteTeam(t.id)}
                  className="p-1.5 text-rose-600 hover:bg-rose-50 rounded"
                  title="Remove Member"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 5: NEWS & ANNOUNCEMENTS TICKER (WITH ADD & REMOVE) */}
      {/* ======================================================== */}
      {activeTab === 'news' && (
        <div className="bg-white rounded-2xl shadow-sm border border-stone-200 p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-base font-serif text-slate-900">
                News Marquee & Press Bulletins
              </h3>
              <p className="text-xs text-slate-500">
                Manage the live top ticker news visible to all portal visitors.
              </p>
            </div>
            <button
              onClick={() => setShowAddNewsModal(true)}
              className="bg-brand-navy hover:bg-brand-navy-light text-white text-xs font-bold px-4 py-2.5 rounded-xl flex items-center space-x-1.5 shadow"
            >
              <Plus className="w-4 h-4 text-amber-400" />
              <span>Add News Bulletin</span>
            </button>
          </div>

          <div className="space-y-3">
            {newsList.map((n) => (
              <div key={n.id} className="p-4 bg-stone-50 rounded-xl border border-stone-200 flex items-center justify-between gap-4">
                <div className="flex items-center space-x-3">
                  <span className="bg-brand-saffron text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                    Live
                  </span>
                  <div>
                    <p className="text-xs font-bold text-slate-900">{n.title}</p>
                    <span className="text-[10px] text-slate-400">{n.date}</span>
                  </div>
                </div>
                <button
                  onClick={() => handleDeleteNews(n.id)}
                  className="text-rose-600 hover:bg-rose-50 p-1.5 rounded"
                  title="Delete News"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 6: VOLUNTEERS TABLE */}
      {/* ======================================================== */}
      {activeTab === 'volunteers' && (
        <div className="bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden">
          <div className="p-4 border-b border-stone-200">
            <h3 className="font-bold text-sm text-slate-900 font-serif">Registered Volunteer Corps</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-stone-50 text-slate-900 font-bold uppercase text-[10px] border-b border-stone-200">
                <tr>
                  <th className="py-3 px-4">Ref No</th>
                  <th className="py-3 px-4">Name</th>
                  <th className="py-3 px-4">Location</th>
                  <th className="py-3 px-4">Preferred Wing</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {volunteers.map(v => (
                  <tr key={v.id} className="hover:bg-amber-50/40 transition">
                    <td className="py-3 px-4 font-mono font-bold text-brand-navy">{v.refNo}</td>
                    <td className="py-3 px-4 font-bold text-slate-900">{v.fullName}</td>
                    <td className="py-3 px-4">{v.location}</td>
                    <td className="py-3 px-4 text-amber-800 font-semibold">{v.preferredWing}</td>
                    <td className="py-3 px-4">
                      {v.status === 'Approved' ? (
                        <span className="text-[10px] bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded border border-emerald-200">
                          Approved
                        </span>
                      ) : (
                        <span className="text-[10px] bg-orange-50 text-orange-700 font-bold px-2 py-0.5 rounded border border-orange-200">
                          Pending
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-right space-x-2">
                      {v.status === 'Pending' && (
                        <button
                          onClick={() => handleApproveVolunteer(v.id)}
                          className="bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-bold px-2.5 py-1 rounded"
                        >
                          Approve
                        </button>
                      )}
                      <button
                        onClick={() => handleOpenInStudio({
                          fullName: v.fullName,
                          fatherOrHusbandName: 'Dedicated Volunteer',
                          regNo: v.refNo,
                          wing: v.preferredWing,
                          division: `${v.location} Field Division`,
                          appliedDate: '2026-05-10',
                          certificateNo: v.certificateNo || `VACF-VOL-2026-${v.refNo}`
                        })}
                        className="bg-brand-navy text-white text-[11px] font-bold px-2.5 py-1 rounded"
                      >
                        Issue Studio
                      </button>
                      <button
                        onClick={() => handleDeleteVolunteer(v.id)}
                        className="text-rose-600 hover:bg-rose-50 p-1 rounded"
                        title="Delete Volunteer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 7: LIVE CERTIFICATE & APPOINTMENT LETTER STUDIO */}
      {/* ======================================================== */}
      {activeTab === 'studio' && selectedMemberForStudio && (
        <div className="space-y-6">
          <div className="bg-amber-50 border border-amber-300 p-4 rounded-xl flex flex-wrap items-center justify-between gap-3">
            <div>
              <span className="text-xs font-bold text-amber-800 uppercase">Live Certificate & Letter Studio</span>
              <h3 className="font-bold text-sm text-slate-900 font-serif">
                Generating Document for: {selectedMemberForStudio.fullName} (Reg No: {selectedMemberForStudio.regNo})
              </h3>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setStudioMode('certificate')}
                className={`text-xs font-bold px-3 py-1.5 rounded-lg ${
                  studioMode === 'certificate' ? 'bg-brand-navy text-white shadow' : 'bg-white text-slate-700 hover:bg-stone-100'
                }`}
              >
                Certificate
              </button>
              <button
                onClick={() => setStudioMode('appointment')}
                className={`text-xs font-bold px-3 py-1.5 rounded-lg ${
                  studioMode === 'appointment' ? 'bg-brand-navy text-white shadow' : 'bg-white text-slate-700 hover:bg-stone-100'
                }`}
              >
                Appointment Letter (नियुक्ति पत्र)
              </button>
              <button
                onClick={() => setStudioMode('idcard')}
                className={`text-xs font-bold px-3 py-1.5 rounded-lg ${
                  studioMode === 'idcard' ? 'bg-brand-navy text-white shadow' : 'bg-white text-slate-700 hover:bg-stone-100'
                }`}
              >
                PVC ID Card
              </button>
            </div>
          </div>

          {studioMode === 'certificate' && (
            <CertificateCanvas 
              member={selectedMemberForStudio} 
              onSelectOtherMember={setSelectedMemberForStudio}
              allMembers={members}
            />
          )}

          {studioMode === 'appointment' && (
            <AppointmentLetterCanvas 
              member={selectedMemberForStudio}
              onSelectOtherMember={setSelectedMemberForStudio}
              allMembers={members}
            />
          )}

          {studioMode === 'idcard' && (
            <div className="flex justify-center">
              <IdCardCanvas member={selectedMemberForStudio} />
            </div>
          )}
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL 1: ADD NEW MEMBER */}
      {/* ======================================================== */}
      {showAddMemberModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 space-y-4 relative shadow-2xl border border-stone-200">
            <button onClick={() => setShowAddMemberModal(false)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600">
              <X className="w-5 h-5" />
            </button>
            <h3 className="font-bold text-lg font-serif text-slate-900">Add Member to Registry</h3>
            <form onSubmit={handleAddMember} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. SMT. ANITA DEVI"
                  value={newMember.fullName}
                  onChange={e => setNewMember({ ...newMember, fullName: e.target.value })}
                  className="w-full p-2 border border-stone-300 rounded-lg focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Father / Husband Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Shri Rajesh Kumar"
                    value={newMember.fatherOrHusbandName}
                    onChange={e => setNewMember({ ...newMember, fatherOrHusbandName: e.target.value })}
                    className="w-full p-2 border border-stone-300 rounded-lg focus:outline-none"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Phone Number</label>
                  <input
                    type="text"
                    placeholder="+91 98765 43210"
                    value={newMember.phone}
                    onChange={e => setNewMember({ ...newMember, phone: e.target.value })}
                    className="w-full p-2 border border-stone-300 rounded-lg focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Wing</label>
                  <select
                    value={newMember.wing}
                    onChange={e => setNewMember({ ...newMember, wing: e.target.value })}
                    className="w-full p-2 border border-stone-300 rounded-lg focus:outline-none"
                  >
                    {FOUNDATION_WINGS.map(w => (
                      <option key={w.id} value={w.name}>{w.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Division</label>
                  <input
                    type="text"
                    value={newMember.division}
                    onChange={e => setNewMember({ ...newMember, division: e.target.value })}
                    className="w-full p-2 border border-stone-300 rounded-lg focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Membership Plan</label>
                  <select
                    value={newMember.plan}
                    onChange={e => {
                      const sel = MEMBERSHIP_PLANS.find(p => p.name === e.target.value);
                      setNewMember({ ...newMember, plan: e.target.value, fee: sel ? sel.fee : 2100 });
                    }}
                    className="w-full p-2 border border-stone-300 rounded-lg focus:outline-none"
                  >
                    {MEMBERSHIP_PLANS.map(p => (
                      <option key={p.id} value={p.name}>{p.name} (₹{p.fee})</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Fee (₹)</label>
                  <input
                    type="number"
                    value={newMember.fee}
                    onChange={e => setNewMember({ ...newMember, fee: e.target.value })}
                    className="w-full p-2 border border-stone-300 rounded-lg focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Address</label>
                <input
                  type="text"
                  placeholder="Village / Ward, District, State"
                  value={newMember.address}
                  onChange={e => setNewMember({ ...newMember, address: e.target.value })}
                  className="w-full p-2 border border-stone-300 rounded-lg focus:outline-none"
                />
              </div>

              <div className="pt-2 flex justify-end space-x-2">
                <button type="button" onClick={() => setShowAddMemberModal(false)} className="px-4 py-2 border rounded-lg">
                  Cancel
                </button>
                <button type="submit" className="px-5 py-2 bg-brand-navy text-white font-bold rounded-lg shadow">
                  Save & Issue Certificate
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL 2: ADD NEW CAMPAIGN */}
      {/* ======================================================== */}
      {showAddCampaignModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-4 relative shadow-2xl border border-stone-200">
            <button onClick={() => setShowAddCampaignModal(false)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600">
              <X className="w-5 h-5" />
            </button>
            <h3 className="font-bold text-lg font-serif text-slate-900">Create New Welfare Drive</h3>
            <form onSubmit={handleAddCampaign} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Campaign Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Winter Blanket Distribution for Homeless"
                  value={newCampaign.title}
                  onChange={e => setNewCampaign({ ...newCampaign, title: e.target.value })}
                  className="w-full p-2 border border-stone-300 rounded-lg focus:outline-none"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Subtitle / Mission Statement</label>
                <textarea
                  rows="2"
                  placeholder="Brief details about the beneficiaries and distribution centers..."
                  value={newCampaign.subtitle}
                  onChange={e => setNewCampaign({ ...newCampaign, subtitle: e.target.value })}
                  className="w-full p-2 border border-stone-300 rounded-lg focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Target Goal Amount (₹)</label>
                  <input
                    type="number"
                    value={newCampaign.goal}
                    onChange={e => setNewCampaign({ ...newCampaign, goal: e.target.value })}
                    className="w-full p-2 border border-stone-300 rounded-lg focus:outline-none"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Category</label>
                  <select
                    value={newCampaign.category}
                    onChange={e => setNewCampaign({ ...newCampaign, category: e.target.value })}
                    className="w-full p-2 border border-stone-300 rounded-lg focus:outline-none"
                  >
                    <option value="Education">Education</option>
                    <option value="Healthcare">Healthcare</option>
                    <option value="Women Empowerment">Women Empowerment</option>
                    <option value="Disaster Relief">Disaster Relief</option>
                    <option value="Animal Welfare">Animal Welfare</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Banner Image URL</label>
                <input
                  type="url"
                  value={newCampaign.image}
                  onChange={e => setNewCampaign({ ...newCampaign, image: e.target.value })}
                  className="w-full p-2 border border-stone-300 rounded-lg focus:outline-none"
                />
              </div>

              <div className="pt-2 flex justify-end space-x-2">
                <button type="button" onClick={() => setShowAddCampaignModal(false)} className="px-4 py-2 border rounded-lg">
                  Cancel
                </button>
                <button type="submit" className="px-5 py-2 bg-brand-navy text-white font-bold rounded-lg shadow">
                  Publish Campaign Live
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL 3: ADD NEW RESOURCE */}
      {/* ======================================================== */}
      {showAddResourceModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-4 relative shadow-2xl border border-stone-200">
            <button onClick={() => setShowAddResourceModal(false)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600">
              <X className="w-5 h-5" />
            </button>
            <h3 className="font-bold text-lg font-serif text-slate-900">Add Statutory / Governance Document</h3>
            <form onSubmit={handleAddResource} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Document Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. CSR Project Approval Letter 2026"
                  value={newResource.title}
                  onChange={e => setNewResource({ ...newResource, title: e.target.value })}
                  className="w-full p-2 border border-stone-300 rounded-lg focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Category</label>
                  <select
                    value={newResource.category}
                    onChange={e => setNewResource({ ...newResource, category: e.target.value })}
                    className="w-full p-2 border border-stone-300 rounded-lg focus:outline-none"
                  >
                    <option value="Legal & Registration">Legal & Registration</option>
                    <option value="Tax Exemption">Tax Exemption</option>
                    <option value="Governance & Rules">Governance & Rules</option>
                    <option value="Financial Audits">Financial Audits</option>
                    <option value="Application Forms">Application Forms</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Registration / Ref No</label>
                  <input
                    type="text"
                    value={newResource.regNo}
                    onChange={e => setNewResource({ ...newResource, regNo: e.target.value })}
                    className="w-full p-2 border border-stone-300 rounded-lg focus:outline-none font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Issuing Authority</label>
                <input
                  type="text"
                  placeholder="e.g. Sub-Registrar / NITI Aayog / IT Dept"
                  value={newResource.authority}
                  onChange={e => setNewResource({ ...newResource, authority: e.target.value })}
                  className="w-full p-2 border border-stone-300 rounded-lg focus:outline-none"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Description</label>
                <textarea
                  rows="2"
                  value={newResource.description}
                  onChange={e => setNewResource({ ...newResource, description: e.target.value })}
                  placeholder="Brief note on statutory scope..."
                  className="w-full p-2 border border-stone-300 rounded-lg focus:outline-none"
                />
              </div>

              <div className="pt-2 flex justify-end space-x-2">
                <button type="button" onClick={() => setShowAddResourceModal(false)} className="px-4 py-2 border rounded-lg">
                  Cancel
                </button>
                <button type="submit" className="px-5 py-2 bg-brand-navy text-white font-bold rounded-lg shadow">
                  Upload & Register
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL 4: ADD NEWS */}
      {/* ======================================================== */}
      {showAddNewsModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 relative shadow-2xl border border-stone-200">
            <button onClick={() => setShowAddNewsModal(false)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600">
              <X className="w-5 h-5" />
            </button>
            <h3 className="font-bold text-lg font-serif text-slate-900">Add Live News Marquee</h3>
            <form onSubmit={handleAddNews} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Headline Text</label>
                <textarea
                  required
                  rows="3"
                  placeholder="e.g. Foundation distributes 500 ration kits in Varanasi..."
                  value={newNews.title}
                  onChange={e => setNewNews({ ...newNews, title: e.target.value })}
                  className="w-full p-2 border border-stone-300 rounded-lg focus:outline-none"
                />
              </div>
              <div className="pt-2 flex justify-end space-x-2">
                <button type="button" onClick={() => setShowAddNewsModal(false)} className="px-4 py-2 border rounded-lg">
                  Cancel
                </button>
                <button type="submit" className="px-5 py-2 bg-brand-navy text-white font-bold rounded-lg shadow">
                  Publish to Marquee
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL 5: ADD TEAM MEMBER */}
      {/* ======================================================== */}
      {showAddTeamModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 relative shadow-2xl border border-stone-200">
            <button onClick={() => setShowAddTeamModal(false)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600">
              <X className="w-5 h-5" />
            </button>
            <h3 className="font-bold text-lg font-serif text-slate-900">Add Council Leader</h3>
            <form onSubmit={handleAddTeam} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Leader Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. DR. SUNIL SHARMA"
                  value={newTeam.name}
                  onChange={e => setNewTeam({ ...newTeam, name: e.target.value })}
                  className="w-full p-2 border border-stone-300 rounded-lg focus:outline-none"
                />
              </div>
              <div>
                <label className="font-bold text-slate-700 block mb-1">Designation (English)</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. VICE PRESIDENT (YOUTH WING)"
                  value={newTeam.designation}
                  onChange={e => setNewTeam({ ...newTeam, designation: e.target.value })}
                  className="w-full p-2 border border-stone-300 rounded-lg focus:outline-none"
                />
              </div>
              <div>
                <label className="font-bold text-slate-700 block mb-1">Designation (Hindi)</label>
                <input
                  type="text"
                  placeholder="उदा. उपाध्यक्ष (युवा शक्ति)"
                  value={newTeam.hindi}
                  onChange={e => setNewTeam({ ...newTeam, hindi: e.target.value })}
                  className="w-full p-2 border border-stone-300 rounded-lg focus:outline-none"
                />
              </div>
              <div>
                <label className="font-bold text-slate-700 block mb-1">Location / Division</label>
                <input
                  type="text"
                  value={newTeam.location}
                  onChange={e => setNewTeam({ ...newTeam, location: e.target.value })}
                  className="w-full p-2 border border-stone-300 rounded-lg focus:outline-none"
                />
              </div>
              <div className="pt-2 flex justify-end space-x-2">
                <button type="button" onClick={() => setShowAddTeamModal(false)} className="px-4 py-2 border rounded-lg">
                  Cancel
                </button>
                <button type="submit" className="px-5 py-2 bg-brand-navy text-white font-bold rounded-lg shadow">
                  Add to Team
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
