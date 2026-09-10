import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { IntroLoader } from './components/IntroLoader';

import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsPage from './pages/TermsPage';
import DisclaimerPage from './pages/DisclaimerPage';
import FAQPage from './pages/FAQPage';
import FakeProductGuidePage from './pages/FakeProductGuidePage';
import SafeShoppingGuidePage from './pages/SafeShoppingGuidePage';
import CommonScamsPage from './pages/CommonScamsPage';

const App: React.FC = () => {
  const [showIntro, setShowIntro] = useState(true);

  // Allow pressing Escape key to skip intro
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setShowIntro(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {showIntro && <IntroLoader onComplete={() => setShowIntro(false)} />}
      <Navbar onReplayIntro={() => setShowIntro(true)} />
      <main className="flex-grow pt-20 md:pt-24">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/terms-and-conditions" element={<TermsPage />} />
          <Route path="/disclaimer" element={<DisclaimerPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/how-to-spot-fake-products" element={<FakeProductGuidePage />} />
          <Route path="/safe-online-shopping-guide" element={<SafeShoppingGuidePage />} />
          <Route path="/common-online-shopping-scams" element={<CommonScamsPage />} />
        </Routes>
      </main>
      <Footer onReplayIntro={() => setShowIntro(true)} />
    </div>
  );
};

export default App;
