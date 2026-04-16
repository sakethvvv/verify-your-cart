import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';

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
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
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
      <Footer />
    </div>
  );
};

export default App;
