import React from 'react';
import { Heart } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { BrandLogo } from './BrandLogo';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const location = useLocation();
  const navigate = useNavigate();

  const goHomeAndScroll = (id: string) => {
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          const headerOffset = 100;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.scrollY - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth',
          });
        }
      }, 200);
      return;
    }

    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <footer className="bg-slate-900 text-slate-400 py-20 border-t border-slate-800">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
          <div className="col-span-1 md:col-span-1">
            <div className="mb-6">
              <BrandLogo variant="light" withPrefix={true} className="w-48" />
            </div>

            <p className="text-sm leading-relaxed mb-8 opacity-80 font-medium">
              Verify Your Cart is an educational AI-assisted platform designed to help users identify suspicious
              e-commerce listing patterns and make safer online shopping decisions.
            </p>

            <a
              href="mailto:sakethvedullapalli@gmail.com"
              className="inline-block px-4 py-2 bg-white/5 rounded-lg text-sm text-blue-400 hover:text-white hover:bg-blue-600 transition-all font-bold"
            >
              Contact Developer
            </a>
          </div>

          <div className="md:ml-auto">
            <h4 className="text-white font-bold mb-8 tracking-wide text-xs uppercase opacity-90">Navigation</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li><button onClick={() => goHomeAndScroll('home')} className="hover:text-white transition-all">Home</button></li>
              <li><button onClick={() => goHomeAndScroll('features')} className="hover:text-white transition-all">Features</button></li>
              <li><Link to="/about" className="hover:text-white transition-all">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-all">Contact</Link></li>
            </ul>
          </div>

          <div className="md:ml-auto">
            <h4 className="text-white font-bold mb-8 tracking-wide text-xs uppercase opacity-90">Guides</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li><Link to="/how-to-spot-fake-products" className="hover:text-white transition-all">How to Spot Fake Products</Link></li>
              <li><Link to="/safe-online-shopping-guide" className="hover:text-white transition-all">Safe Online Shopping Guide</Link></li>
              <li><Link to="/common-online-shopping-scams" className="hover:text-white transition-all">Common Shopping Scams</Link></li>
              <li><Link to="/faq" className="hover:text-white transition-all">FAQ</Link></li>
            </ul>
          </div>

          <div className="md:ml-auto">
            <h4 className="text-white font-bold mb-8 tracking-wide text-xs uppercase opacity-90">Legal</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li><Link to="/privacy-policy" className="hover:text-white transition-all">Privacy Policy</Link></li>
              <li><Link to="/terms-and-conditions" className="hover:text-white transition-all">Terms & Conditions</Link></li>
              <li><Link to="/disclaimer" className="hover:text-white transition-all">Disclaimer</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-10 flex flex-col md:flex-row justify-between items-center gap-6 text-xs font-semibold text-slate-500 tracking-wide">
          <p>© {currentYear} Verify Your Cart. Educational AI Product Safety Platform.</p>
          <p className="flex items-center gap-2 bg-slate-800/50 px-4 py-2 rounded-full">
            Handcrafted with <Heart size={14} className="text-rose-500 fill-rose-500 animate-pulse-slow" /> by Saketh Vedullapalli
          </p>
        </div>
      </div>
    </footer>
  );
};
