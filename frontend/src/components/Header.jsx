import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone } from 'lucide-react';
import { companyInfo } from '../data/mock';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About Us' },
    { path: '/services', label: 'Services' },
    { path: '/testimonials', label: 'Testimonials' },
    { path: '/faq', label: 'FAQ' },
    { path: '/contact', label: 'Contact' }
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header className="header-nav">
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', maxWidth: '1280px', margin: '0 auto' }}>
        {/* Logo */}
        <Link to="/" className="logo-container" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
          <img 
            src="/brand/logo-horizontal.svg" 
            alt="SafeNest Home Care" 
            className="logo"
            style={{ height: '52px', width: 'auto' }}
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="desktop-nav" style={{ display: 'none' }}>
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`nav-link ${isActive(link.path) ? 'active' : ''}`}
              style={{
                fontFamily: 'Nunito, system-ui, sans-serif',
                fontSize: '0.875rem',
                fontWeight: '500',
                textTransform: 'uppercase',
                letterSpacing: '0.025em',
                color: isActive(link.path) ? '#0066B3' : '#353535',
                textDecoration: 'none',
                padding: '0.5rem 1rem',
                transition: 'color 0.2s ease',
                borderBottom: isActive(link.path) ? '2px solid #0066B3' : '2px solid transparent'
              }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="nav-actions" style={{ display: 'none', alignItems: 'center', gap: '1rem' }}>
          <a href={`tel:${companyInfo.phone}`} className="phone-link" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#0066B3', textDecoration: 'none', fontFamily: 'Nunito, system-ui, sans-serif', fontSize: '0.875rem', fontWeight: '500' }}>
            <Phone size={18} />
            <span>{companyInfo.phone}</span>
          </a>
          <a href={companyInfo.teamPortalUrl} className="btn-portal" target="_blank" rel="noopener noreferrer">
            Employee Portal
          </a>
          <Link to="/contact" className="btn-primary">
            Get Started
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="mobile-menu-btn"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          style={{
            display: 'block',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            padding: '0.5rem',
            color: '#232323'
          }}
        >
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="mobile-menu" style={{
          position: 'fixed',
          top: '80px',
          left: 0,
          right: 0,
          background: 'rgba(255, 255, 255, 0.98)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          padding: '1.2rem',
          borderTop: '1px solid rgba(153, 153, 153, 0.3)',
          zIndex: 998,
          maxHeight: 'calc(100vh - 80px)',
          overflowY: 'auto'
        }}>
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMenuOpen(false)}
                className={`mobile-nav-link ${isActive(link.path) ? 'active' : ''}`}
                style={{
                  fontFamily: 'Nunito, system-ui, sans-serif',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  textTransform: 'uppercase',
                  letterSpacing: '0.025em',
                  color: isActive(link.path) ? '#0066B3' : '#353535',
                  textDecoration: 'none',
                  padding: '0.75rem 1rem',
                  background: isActive(link.path) ? 'rgba(0, 102, 179, 0.1)' : 'transparent',
                  borderRadius: '0.5rem',
                  transition: 'all 0.2s ease'
                }}
              >
                {link.label}
              </Link>
            ))}
            <a href={`tel:${companyInfo.phone}`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', color: '#0066B3', textDecoration: 'none', fontFamily: 'Nunito, system-ui, sans-serif', fontSize: '0.875rem', fontWeight: '500', padding: '0.75rem 1rem', marginTop: '0.5rem' }}>
              <Phone size={18} />
              <span>{companyInfo.phone}</span>
            </a>
            <a href={companyInfo.teamPortalUrl} className="btn-portal" target="_blank" rel="noopener noreferrer" style={{ marginTop: '0.5rem', width: '100%' }}>
              Employee Portal
            </a>
            <Link to="/contact" className="btn-primary" onClick={() => setIsMenuOpen(false)} style={{ marginTop: '0.5rem', textAlign: 'center' }}>
              Get Started
            </Link>
          </nav>
        </div>
      )}

      <style jsx>{`
        /* Full menu needs ~1160px; below that use the hamburger menu so nothing is cut off */
        @media (min-width: 1180px) {
          .desktop-nav {
            display: flex !important;
            align-items: center;
            gap: 0.5rem;
          }
          .nav-actions {
            display: flex !important;
          }
          .mobile-menu-btn {
            display: none !important;
          }
        }
      `}</style>
    </header>
  );
};

export default Header;
