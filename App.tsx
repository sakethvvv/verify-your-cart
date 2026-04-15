import React from 'react';
import { Navbar } from './components/Navbar';
import { Analyzer } from './components/Analyzer';
import { Footer } from './components/Footer';
import { FeaturesSection, GuideSection, TipsSection, TeamSection, VisionSection, ContactSection, ProblemSection, HowItWorksSection } from './components/Sections';

const App: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      
      <main className="flex-grow">
        <section id="home" className="scroll-mt-32 border-b border-slate-100">
          <Analyzer />
        </section>

        {/* Problem Narrative Section */}
        <section id="problem" className="scroll-mt-24">
          <ProblemSection />
        </section>

        <section id="features" className="scroll-mt-24">
          <FeaturesSection />
        </section>

        <section id="tips" className="scroll-mt-24">
          <TipsSection />
        </section>

        <section id="guide" className="scroll-mt-24">
          <GuideSection />
        </section>

        {/* New How It Works + Buyer Safety Section */}
        <section id="how-it-works" className="scroll-mt-24">
          <HowItWorksSection />
        </section>

        <VisionSection />

        <section id="team" className="scroll-mt-24">
          <TeamSection />
        </section>

        <section id="contact" className="scroll-mt-24">
          <ContactSection />
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default App;
