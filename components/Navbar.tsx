import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronRight } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { BrandLogo } from './BrandLogo';

export const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const goHomeAndScroll = (id: string) => {
    setIsMobileMenuOpen(false);

    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          const headerOffset = 100;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

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
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <nav
      className={`fixed w-full top-0 z-[100] transition-all duration-300 ${
        scrolled ? 'glass-nav py-3 shadow-sm' : 'bg-white/80 backdrop-blur-sm py-4 md:py-5'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 cursor-pointer group">
          <div className="flex items-center gap-2">
            <div className="h-8 w-auto md:h-10">
              <BrandLogo className="h-full w-auto" variant="dark" />
            </div>
          </div>

          <div className="hidden sm:flex flex-col justify-center border-l border-slate-200 pl-3 ml-1 h-8">
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">AI Security</span>
            <span className="text-[9px] font-semibold text-blue-600 whitespace-nowrap">
              Built by Saketh Vedullapalli
            </span>
          </div>
        </Link>

        <div className="hidden lg:flex items-center bg-white/50 backdrop-blur-md px-2 py-1.5 rounded-full border border-white/50 shadow-sm gap-1 transition-all hover:shadow-md hover:bg-white/80">
          <NavLink onClick={() => goHomeAndScroll('home')}>Home</NavLink>
          <NavLink onClick={() => goHomeAndScroll('features')}>Features</NavLink>
          <NavLink onClick={() => goHomeAndScroll('tips')}>Tips</NavLink>
          <NavLink onClick={() => goHomeAndScroll('guide')}>Guide</NavLink>
          <LinkButton to="/about">About</LinkButton>
          <LinkButton to="/faq">FAQ</LinkButton>
          <LinkButton to="/contact">Contact</LinkButton>
        </div>

        <div className="hidden lg:block">
          <button
            type="button"
            onClick={() => goHomeAndScroll('home')}
            className="group relative inline-flex items-center justify-center px-6 py-2.5 font-semibold text-white transition-all duration-200 bg-slate-900 rounded-full hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-900 hover:shadow-lg hover:-translate-y-0.5 overflow-hidden"
          >
            <div className="absolute inset-0 -translate-x-full group-hover:animate-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

            <span className="relative flex items-center">
              Check Product
              <ChevronRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </span>
          </button>
        </div>

        <button
          type="button"
          className="lg:hidden p-2 text-slate-600 bg-white/50 rounded-lg hover:bg-white hover:shadow-md transition-all active:scale-95"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-[60px] bg-white/95 backdrop-blur-xl border-t border-slate-100 shadow-2xl animate-fade-in-up z-50 overflow-y-auto">
          <div className="flex flex-col p-6 space-y-3 pb-32">
            <MobileNavLink onClick={() => goHomeAndScroll('home')}>Home</MobileNavLink>
            <MobileNavLink onClick={() => goHomeAndScroll('features')}>Features</MobileNavLink>
            <MobileNavLink onClick={() => goHomeAndScroll('tips')}>Tips</MobileNavLink>
            <MobileNavLink onClick={() => goHomeAndScroll('guide')}>Guide</MobileNavLink>
            <MobileRouteLink to="/about" onDone={() => setIsMobileMenuOpen(false)}>About</MobileRouteLink>
            <MobileRouteLink to="/faq" onDone={() => setIsMobileMenuOpen(false)}>FAQ</MobileRouteLink>
            <MobileRouteLink to="/contact" onDone={() => setIsMobileMenuOpen(false)}>Contact</MobileRouteLink>

            <button
              type="button"
              onClick={() => goHomeAndScroll('home')}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white w-full py-4 rounded-xl font-bold mt-4 shadow-lg active:scale-95 transition-transform hover:shadow-xl"
            >
              Scan Now
            </button>

            <div className="mt-8 pt-6 border-t border-slate-100">
              <p className="text-xs text-center text-slate-400 font-semibold">Built by Saketh Vedullapalli</p>
              <p className="text-[10px] text-center text-slate-300 mt-1">ECE-A • Aditya University</p>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

const NavLink: React.FC<{ onClick: () => void; children: React.ReactNode }> = ({ onClick, children }) => (
  <button
    type="button"
    onClick={onClick}
    className="px-5 py-2 text-sm font-semibold text-slate-600 rounded-full hover:text-slate-900 hover:bg-white hover:shadow-sm transition-all duration-200 active:scale-95"
  >
    {children}
  </button>
);

const LinkButton: React.FC<{ to: string; children: React.ReactNode }> = ({ to, children }) => (
  <Link
    to={to}
    className="px-5 py-2 text-sm font-semibold text-slate-600 rounded-full hover:text-slate-900 hover:bg-white hover:shadow-sm transition-all duration-200 active:scale-95"
  >
    {children}
  </Link>
);

const MobileNavLink: React.FC<{ onClick: () => void; children: React.ReactNode }> = ({ onClick, children }) => (
  <button
    type="button"
    onClick={onClick}
    className="text-left text-lg font-bold text-slate-800 hover:text-blue-600 hover:bg-blue-50 px-6 py-4 rounded-2xl transition-all active:scale-95 border border-transparent hover:border-blue-100"
  >
    {children}
  </button>
);

const MobileRouteLink: React.FC<{ to: string; children: React.ReactNode; onDone: () => void }> = ({
  to,
  children,
  onDone,
}) => (
  <Link
    to={to}
    onClick={onDone}
    className="text-left text-lg font-bold text-slate-800 hover:text-blue-600 hover:bg-blue-50 px-6 py-4 rounded-2xl transition-all active:scale-95 border border-transparent hover:border-blue-100"
  >
    {children}
  </Link>
);
