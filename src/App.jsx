import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CampaignModal from './components/CampaignModal';
import WelcomePopup from './components/WelcomePopup';

import Home from './pages/Home';
import Wings from './pages/Wings';
import OurTeam from './pages/OurTeam';
import Campaigns from './pages/Campaigns';
import Membership from './pages/Membership';
import Volunteer from './pages/Volunteer';
import VerifyCertificate from './pages/VerifyCertificate';
import Donate from './pages/Donate';
import AdminDashboard from './pages/AdminDashboard';
import Resources from './pages/Resources';

export default function App() {
  const [activePage, setActivePage] = useState('home');
  const [activeDonationCampaign, setActiveDonationCampaign] = useState(null);
  const [selectedCertQuery, setSelectedCertQuery] = useState('');

  // Handle URL hash routing (e.g. #verify?cert=473718)
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash.startsWith('verify')) {
        setActivePage('verify');
        const match = hash.match(/cert=([^&]+)/);
        if (match && match[1]) {
          setSelectedCertQuery(decodeURIComponent(match[1]));
        }
      } else if (hash === 'donate') {
        setActivePage('donate');
      } else if (hash === 'membership') {
        setActivePage('membership');
      } else if (hash === 'volunteer') {
        setActivePage('volunteer');
      } else if (hash === 'wings') {
        setActivePage('wings');
      } else if (hash === 'campaigns') {
        setActivePage('campaigns');
      } else if (hash === 'resources') {
        setActivePage('resources');
      } else if (hash === 'admin') {
        setActivePage('admin');
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const handleOpenDonate = (campaign) => {
    setActiveDonationCampaign(campaign || null);
  };

  const handlePageChange = (page) => {
    setActivePage(page);
    window.location.hash = page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 font-sans selection:bg-amber-200 selection:text-brand-navy">
      {/* Dynamic Header */}
      <Navbar activePage={activePage} setActivePage={handlePageChange} />

      {/* Main Dynamic Viewport */}
      <main className="flex-1">
        {activePage === 'home' && (
          <Home 
            setActivePage={handlePageChange} 
            onOpenDonateModal={handleOpenDonate} 
          />
        )}

        {activePage === 'wings' && (
          <Wings setActivePage={handlePageChange} />
        )}

        {activePage === 'team' && (
          <OurTeam setActivePage={handlePageChange} />
        )}

        {activePage === 'campaigns' && (
          <Campaigns onOpenDonateModal={handleOpenDonate} />
        )}

        {activePage === 'resources' && (
          <Resources setActivePage={handlePageChange} />
        )}

        {activePage === 'membership' && (
          <Membership setActivePage={handlePageChange} />
        )}

        {activePage === 'volunteer' && (
          <Volunteer setActivePage={handlePageChange} />
        )}

        {activePage === 'verify' && (
          <VerifyCertificate defaultQuery={selectedCertQuery} />
        )}

        {activePage === 'donate' && (
          <Donate />
        )}

        {activePage === 'admin' && (
          <AdminDashboard />
        )}
      </main>

      {/* Quick Donation Modal */}
      {activeDonationCampaign && (
        <CampaignModal 
          campaign={activeDonationCampaign} 
          onClose={() => setActiveDonationCampaign(null)} 
        />
      )}

      {/* Entry Welcome / Active Relief Pop-up Modal (Matching Video frame_60s.jpg) */}
      <WelcomePopup onOpenDonateModal={handleOpenDonate} activePage={activePage} />

      {/* Authoritative NGO Footer */}
      <Footer setActivePage={handlePageChange} />
    </div>
  );
}
