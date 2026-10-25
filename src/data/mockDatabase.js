// Veer Azad Charitable Foundation - Central Data Store & Local Persistence Engine
// Supports anti-fabrication verified records, certificate registry, and complete Admin CRUD lifecycle.

export const MEMBERSHIP_PLANS = [
  { id: 'gp', name: 'Gram Panchayat Membership', fee: 299, validity: '1 Year', description: 'Village level community participation and volunteer rights.' },
  { id: 'block', name: 'Block Membership', fee: 399, validity: '1 Year', description: 'Block level representation and local social drives.' },
  { id: 'tehsil', name: 'Tehsil Membership', fee: 499, validity: '1 Year', description: 'Tehsil level coordination and event hosting rights.' },
  { id: 'district', name: 'District Membership', fee: 799, validity: '1 Year', description: 'District executive meetings, voting rights and official letterhead.' },
  { id: 'active', name: 'Active Membership', fee: 2100, validity: '1 Year', description: 'Full executive member, official Certificate + ID Card with national voting.' },
  { id: 'state', name: 'State Membership', fee: 3100, validity: '2 Years', description: 'State council leadership, committee chair eligibility and VIP delegation.' }
];

export const FOUNDATION_WINGS = [
  { id: 'women', name: 'Women Wing', hindi: 'महिला प्रकोष्ठ', description: 'Empowering women through financial literacy, skill development and legal protection.' },
  { id: 'youth', name: 'Youth Wing', hindi: 'युवा शक्ति', description: 'Mobilizing students and young leaders for nation building and community relief.' },
  { id: 'education', name: 'Education & Health Wing', hindi: 'शिक्षा एवं स्वास्थ्य', description: 'Providing scholarships, free schools, diagnostic medical camps and medicines.' },
  { id: 'social', name: 'Social Welfare Wing', hindi: 'सामाजिक कल्याण', description: 'Disaster response, slum rehabilitation, food distribution and elder care.' },
  { id: 'legal', name: 'Legal Aid & Human Rights', hindi: 'विधिक सहायता', description: 'Free legal counseling for underprivileged citizens, seniors and victims of injustice.' }
];

export const INITIAL_CAMPAIGNS = [
  {
    id: 'camp_01',
    title: 'Shiksha Jyoti: Education for 1000 Underprivileged Children',
    subtitle: 'Providing school kits, uniforms, books and digital tablets to students in Varanasi and Delhi NCR.',
    goal: 500000,
    raised: 215000,
    donorsCount: 142,
    category: 'Education',
    image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80',
    active: true
  },
  {
    id: 'camp_02',
    title: 'Arogya Sarv: Free Medical Checkup & Eye Camps',
    subtitle: 'Deploying mobile health vans and organizing diagnostic camps with free medicines across remote rural blocks.',
    goal: 400000,
    raised: 180000,
    donorsCount: 98,
    category: 'Healthcare',
    image: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=800&q=80',
    active: true
  },
  {
    id: 'camp_03',
    title: 'Swavalamban: Women Micro-Enterprise & Tailoring Kits',
    subtitle: 'Equipping rural women with sewing machines and self-help group training for sustainable livelihood.',
    goal: 350000,
    raised: 310000,
    donorsCount: 210,
    category: 'Women Empowerment',
    image: 'https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&w=800&q=80',
    active: true
  }
];

export const INITIAL_RESOURCES = [
  {
    id: 'res_01',
    title: 'Trust Deed Registration Certificate (Indian Trusts Act 1882)',
    category: 'Legal & Registration',
    regNo: 'REG/TR/4737/2020/VNS',
    authority: 'Sub-Registrar Office, Varanasi, Govt. of Uttar Pradesh',
    date: '14 August 2020',
    fileSize: '1.4 MB',
    fileType: 'PDF Document',
    description: 'Founding statutory registration instrument establishing Veer Azad Charitable Foundation as an irrevocable public charitable trust.'
  },
  {
    id: 'res_02',
    title: 'NITI Aayog NGO Darpan Registration Certificate',
    category: 'Legal & Registration',
    regNo: 'UP/2026/03912',
    authority: 'NITI Aayog, Government of India',
    date: '10 January 2022',
    fileSize: '820 KB',
    fileType: 'PDF Document',
    description: 'Official NGO Darpan accreditation certifying foundation eligibility for government and national CSR developmental schemes.'
  },
  {
    id: 'res_03',
    title: 'Section 80G Income Tax Exemption Approval Order',
    category: 'Tax Exemption',
    regNo: 'CIT(EXEMP)/VNS/80G/2022-23/8892',
    authority: 'Office of Commissioner of Income Tax (Exemptions)',
    date: '22 October 2022',
    fileSize: '950 KB',
    fileType: 'PDF Document',
    description: 'Statutory approval entitling all donors to claim 50% tax deductions on voluntary contributions made to the foundation.'
  },
  {
    id: 'res_04',
    title: 'Section 12A Permanent Registration Certificate',
    category: 'Tax Exemption',
    regNo: 'AAATV1298QE20221',
    authority: 'Income Tax Department, Govt of India',
    date: '18 October 2022',
    fileSize: '1.1 MB',
    fileType: 'PDF Document',
    description: 'Tax exemption certificate recognizing Veer Azad Foundation as a registered non-profit charitable institution.'
  },
  {
    id: 'res_05',
    title: 'Foundation Constitution & Bylaws (संस्था का विधान एवं नियमावली)',
    category: 'Governance & Rules',
    regNo: 'VACF/CONST/REV-2026',
    authority: 'Central Governing Council & Board of Trustees',
    date: '01 January 2026',
    fileSize: '2.4 MB',
    fileType: 'PDF Document',
    description: 'Governing operating handbook, code of ethics, membership protocols, appointment procedures, and regional wing structure.'
  },
  {
    id: 'res_06',
    title: 'Annual Audited Financial Accounts & Balance Sheet (FY 2025-26)',
    category: 'Financial Audits',
    regNo: 'AUDIT/2025-26/CA-VERIFIED',
    authority: 'M/s Agrawal & Sharma Chartered Accountants',
    date: '31 March 2026',
    fileSize: '3.2 MB',
    fileType: 'PDF Document',
    description: 'Complete verified audit reports, income and expenditure account, utilization certificates, and balance sheet.'
  },
  {
    id: 'res_07',
    title: 'Official Membership Application Form (सदस्यता आवेदन पत्र)',
    category: 'Application Forms',
    regNo: 'FORM-MEM-2026',
    authority: 'Veer Azad Administrative Secretariat',
    date: '2026 Edition',
    fileSize: '640 KB',
    fileType: 'PDF Printable Form',
    description: 'Bilingual physical application form for Gram Panchayat, Tehsil, District, Active, and State Executive memberships.'
  },
  {
    id: 'res_08',
    title: 'Volunteer Enrollment & Code of Conduct Form',
    category: 'Application Forms',
    regNo: 'FORM-VOL-2026',
    authority: 'Veer Azad Administrative Secretariat',
    date: '2026 Edition',
    fileSize: '510 KB',
    fileType: 'PDF Printable Form',
    description: 'Standard pledge and enrollment paperwork for youth volunteers, medical workers, and field coordinators.'
  }
];

export const INITIAL_NEWS = [
  {
    id: 'news_01',
    title: 'Veer Azad Foundation launches Varanasi Ghat Cleanliness & Free Health Camp 2026. Online Membership Portal now active!',
    date: '25 October 2026',
    isBreaking: true
  },
  {
    id: 'news_02',
    title: 'Chairman Aditya Agrawal announces 1000 educational scholarship kits for flood-affected families in Eastern UP.',
    date: '22 October 2026',
    isBreaking: false
  },
  {
    id: 'news_03',
    title: 'New Women Self-Help Center operational in Varanasi Division with 25 electric tailoring machines.',
    date: '18 October 2026',
    isBreaking: false
  },
  {
    id: 'news_04',
    title: 'All verified members can now generate official Appointment Letters (नियुक्ति पत्र) and Tamper-Proof Certificates online.',
    date: '15 October 2026',
    isBreaking: false
  }
];

export const INITIAL_TEAM = [
  {
    id: 'team_01',
    name: 'ADITYA AGRAWAL',
    designation: 'CHAIRMAN & FOUNDING TRUSTEE',
    hindi: 'अध्यक्ष एवं मुख्य न्यासी',
    location: 'Varanasi Central Office',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    bio: 'Leading social welfare and humanitarian initiatives across UP and national blocks for over a decade.'
  },
  {
    id: 'team_02',
    name: 'Ms SHAHNAJ',
    designation: 'STATE COORDINATOR (WOMEN WING)',
    hindi: 'प्रदेश समन्वयक (महिला प्रकोष्ठ)',
    location: 'Varanasi Division',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    bio: 'Pioneering women micro-enterprise, self-help groups, and vocational tailoring schools.'
  },
  {
    id: 'team_03',
    name: 'GURPREET SINGH BEDI',
    designation: 'TEHSIL SECRETARY (YOUTH WING)',
    hindi: 'तहसील सचिव (युवा शक्ति)',
    location: 'Ludhiana Central Division',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    bio: 'Mobilizing youth volunteers for disaster relief, clean water, and free sports initiatives.'
  },
  {
    id: 'team_04',
    name: 'DR. RAJESH KUMAR VERMA',
    designation: 'DIRECTOR (HEALTH & MEDICAL RELIEF)',
    hindi: 'निदेशक (स्वास्थ्य एवं चिकित्सा)',
    location: 'Gorakhpur Division',
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80',
    bio: 'Senior physician overseeing mobile diagnostic vans, eye camps, and essential medicine distribution.'
  },
  {
    id: 'team_05',
    name: 'JAYESH BHARAT MODI',
    designation: 'DISTRICT SECRETARY',
    hindi: 'जिला सचिव',
    location: 'Ahmedabad / UP Coordination',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    bio: 'Liaising with corporate CSR partners and donor transparency networks.'
  },
  {
    id: 'team_06',
    name: 'ARUN KUMAR MISHRA',
    designation: 'VILLAGE COORDINATOR',
    hindi: 'ग्राम समन्वयक',
    location: 'Rural Varanasi Block',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80',
    bio: 'Ground-level execution coordinator managing ration distribution and village primary schools.'
  }
];

export const INITIAL_MEMBERS = [
  {
    id: 'mem_01',
    regNo: '473718',
    fullName: 'Ms SHAHNAJ',
    fatherOrHusbandName: 'Md. Farooq',
    email: 'shahnaj.vns@gmail.com',
    phone: '+91 98765 43210',
    wing: 'Women Wing',
    division: 'Varanasi (U. P.) Division',
    plan: 'Active Membership',
    fee: 2100,
    paymentStatus: 'Paid',
    paymentMethod: 'ONLINE',
    paymentRef: 'PAY_VA_9812401',
    status: 'Approved',
    appliedDate: '2026-05-10',
    approvedDate: '2026-05-12',
    certificateIssued: true,
    certificateNo: 'VACF-MEM-2026-473718',
    signatory: 'Aditya Agrawal (Chairman)',
    bloodGroup: 'B+',
    address: 'Ghat Road, Varanasi, Uttar Pradesh'
  },
  {
    id: 'mem_02',
    regNo: '473719',
    fullName: 'GURPREET SINGH BEDI',
    fatherOrHusbandName: 'Harbhajan Singh',
    email: 'gurpreet.bedi@outlook.com',
    phone: '+91 98123 45678',
    wing: 'Youth Wing',
    division: 'Ludhiana Central Division',
    plan: 'Tehsil Membership',
    fee: 499,
    paymentStatus: 'Paid',
    paymentMethod: 'ONLINE',
    paymentRef: 'PAY_VA_9812402',
    status: 'Approved',
    appliedDate: '2026-05-14',
    approvedDate: '2026-05-16',
    certificateIssued: true,
    certificateNo: 'VACF-MEM-2026-473719',
    signatory: 'Aditya Agrawal (Chairman)',
    bloodGroup: 'O+',
    address: 'Mall Road, Ludhiana, Punjab'
  },
  {
    id: 'mem_03',
    regNo: '473720',
    fullName: 'DR. RAJESH KUMAR VERMA',
    fatherOrHusbandName: 'Late S. K. Verma',
    email: 'dr.rajesh.verma@example.com',
    phone: '+91 99887 76655',
    wing: 'Education & Health Wing',
    division: 'Gorakhpur Division',
    plan: 'State Membership',
    fee: 3100,
    paymentStatus: 'Paid',
    paymentMethod: 'OFFLINE',
    paymentRef: 'CHQ_SBI_441209',
    status: 'Approved',
    appliedDate: '2026-05-18',
    approvedDate: '2026-05-20',
    certificateIssued: true,
    certificateNo: 'VACF-MEM-2026-473720',
    signatory: 'Aditya Agrawal (Chairman)',
    bloodGroup: 'A+',
    address: 'Civil Lines, Gorakhpur, UP'
  },
  {
    id: 'mem_04',
    regNo: '473721',
    fullName: 'POOJA DEVI YADAV',
    fatherOrHusbandName: 'Ramesh Yadav',
    email: 'pooja.yadav88@gmail.com',
    phone: '+91 94567 11223',
    wing: 'Women Wing',
    division: 'Azamgarh Rural Division',
    plan: 'Gram Panchayat Membership',
    fee: 299,
    paymentStatus: 'Paid',
    paymentMethod: 'OFFLINE',
    paymentRef: 'CASH_RECEIPT_098',
    status: 'Pending',
    appliedDate: '2026-10-22',
    approvedDate: null,
    certificateIssued: false,
    certificateNo: null,
    signatory: 'Aditya Agrawal (Chairman)',
    bloodGroup: 'AB+',
    address: 'Village Mubarakpur, Azamgarh, UP'
  },
  {
    id: 'mem_05',
    regNo: '473722',
    fullName: 'AMITAV CHAKRABORTY',
    fatherOrHusbandName: 'B. C. Chakraborty',
    email: 'amitav.c@gmail.com',
    phone: '+91 97112 33445',
    wing: 'Social Welfare Wing',
    division: 'Kolkata Urban Division',
    plan: 'District Membership',
    fee: 799,
    paymentStatus: 'Paid',
    paymentMethod: 'ONLINE',
    paymentRef: 'PAY_VA_9812499',
    status: 'Pending',
    appliedDate: '2026-10-24',
    approvedDate: null,
    certificateIssued: false,
    certificateNo: null,
    signatory: 'Aditya Agrawal (Chairman)',
    bloodGroup: 'O-',
    address: 'Salt Lake, Sector 2, Kolkata'
  }
];

export const INITIAL_VOLUNTEERS = [
  {
    id: 'vol_01',
    refNo: 'VOL20260005',
    fullName: 'Meenakshi Pillai',
    email: 'meenakshi.pillai@gmail.com',
    phone: '+91 98220 11990',
    location: 'Varanasi',
    skills: 'Teaching, Counseling & Art Therapy',
    preferredWing: 'Women Wing',
    availability: 'Weekends (10 Hours/Week)',
    status: 'Approved',
    certificateIssued: true,
    certificateNo: 'VACF-VOL-2026-0005'
  },
  {
    id: 'vol_02',
    refNo: 'VOL20260006',
    fullName: 'Rohan D\'Souza',
    email: 'rohan.dsouza@protonmail.com',
    phone: '+91 98330 22881',
    location: 'Delhi NCR',
    skills: 'Web Design & Social Media Outreach',
    preferredWing: 'Youth Wing',
    availability: 'Flexible (Remote)',
    status: 'Pending',
    certificateIssued: false,
    certificateNo: null
  },
  {
    id: 'vol_03',
    refNo: 'VOL20260007',
    fullName: 'Fatima Al-Hassan',
    email: 'fatima.al@yahoo.com',
    phone: '+91 94110 33772',
    location: 'Lucknow',
    skills: 'Nurse / First Aid Emergency Support',
    preferredWing: 'Education & Health Wing',
    availability: 'Weekdays Evenings',
    status: 'Pending',
    certificateIssued: false,
    certificateNo: null
  }
];

// LocalStorage Persistence Keys
const STORAGE_KEY_MEMBERS = 'va_portal_members_v2';
const STORAGE_KEY_VOLUNTEERS = 'va_portal_volunteers_v2';
const STORAGE_KEY_CAMPAIGNS = 'va_portal_campaigns_v2';
const STORAGE_KEY_RESOURCES = 'va_portal_resources_v2';
const STORAGE_KEY_NEWS = 'va_portal_news_v2';
const STORAGE_KEY_TEAM = 'va_portal_team_v2';

// 1. Members
export function getStoredMembers() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_MEMBERS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY_MEMBERS, JSON.stringify(INITIAL_MEMBERS));
      return INITIAL_MEMBERS;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_MEMBERS;
  }
}
export function saveMembers(members) {
  try {
    localStorage.setItem(STORAGE_KEY_MEMBERS, JSON.stringify(members));
  } catch (e) {
    console.error('Failed to save members', e);
  }
}

// 2. Volunteers
export function getStoredVolunteers() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_VOLUNTEERS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY_VOLUNTEERS, JSON.stringify(INITIAL_VOLUNTEERS));
      return INITIAL_VOLUNTEERS;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_VOLUNTEERS;
  }
}
export function saveVolunteers(vols) {
  try {
    localStorage.setItem(STORAGE_KEY_VOLUNTEERS, JSON.stringify(vols));
  } catch (e) {
    console.error('Failed to save volunteers', e);
  }
}

// 3. Campaigns (Full Add/Edit/Remove CRUD)
export function getStoredCampaigns() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_CAMPAIGNS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY_CAMPAIGNS, JSON.stringify(INITIAL_CAMPAIGNS));
      return INITIAL_CAMPAIGNS;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_CAMPAIGNS;
  }
}
export function saveCampaigns(campaigns) {
  try {
    localStorage.setItem(STORAGE_KEY_CAMPAIGNS, JSON.stringify(campaigns));
  } catch (e) {
    console.error('Failed to save campaigns', e);
  }
}

// 4. Resources (Full Add/Edit/Remove CRUD)
export function getStoredResources() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_RESOURCES);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY_RESOURCES, JSON.stringify(INITIAL_RESOURCES));
      return INITIAL_RESOURCES;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_RESOURCES;
  }
}
export function saveResources(resources) {
  try {
    localStorage.setItem(STORAGE_KEY_RESOURCES, JSON.stringify(resources));
  } catch (e) {
    console.error('Failed to save resources', e);
  }
}

// 5. News Ticker (Full Add/Remove CRUD)
export function getStoredNews() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_NEWS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY_NEWS, JSON.stringify(INITIAL_NEWS));
      return INITIAL_NEWS;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_NEWS;
  }
}
export function saveNews(news) {
  try {
    localStorage.setItem(STORAGE_KEY_NEWS, JSON.stringify(news));
  } catch (e) {
    console.error('Failed to save news', e);
  }
}

// 6. Leadership Team (Full Add/Remove CRUD)
export function getStoredTeam() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_TEAM);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY_TEAM, JSON.stringify(INITIAL_TEAM));
      return INITIAL_TEAM;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_TEAM;
  }
}
export function saveTeam(team) {
  try {
    localStorage.setItem(STORAGE_KEY_TEAM, JSON.stringify(team));
  } catch (e) {
    console.error('Failed to save team', e);
  }
}

// Backward compatibility constant exports
export const CAMPAIGNS = INITIAL_CAMPAIGNS;
