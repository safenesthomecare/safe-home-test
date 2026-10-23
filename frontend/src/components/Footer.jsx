import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin } from 'lucide-react';
import { companyInfo } from '../data/mock';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{
      background: '#232323',
      color: 'white',
      padding: '3rem 1.2rem 1.2rem'
    }}>
      <div className="container" style={{ maxWidth: '1280px', margin: '0 auto' }}>
        {/* Main Footer Content */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 250px), 1fr))',
          gap: '2rem',
          marginBottom: '2rem'
        }}>
          {/* Company Info */}
          <div>
            <img 
              src="/brand/logo-on-dark.svg" 
              alt="SafeNest Home Care" 
              style={{ height: '84px', width: 'auto', marginBottom: '1rem' }}
            />
            <p style={{ 
              fontSize: '0.875rem', 
              lineHeight: '1.6', 
              color: 'rgba(255, 255, 255, 0.8)',
              marginBottom: '1rem'
            }}>
              {companyInfo.tagline}
            </p>
            <p style={{ 
              fontSize: '0.875rem', 
              lineHeight: '1.6', 
              color: 'rgba(255, 255, 255, 0.8)',
              fontWeight: '500'
            }}>
              {companyInfo.experience}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 style={{
              fontFamily: 'Nunito, system-ui, sans-serif',
              fontSize: '0.875rem',
              fontWeight: '600',
              textTransform: 'uppercase',
              letterSpacing: '0.025em',
              marginBottom: '1rem',
              color: '#FF8C42'
            }}>
              Quick Links
            </h3>
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <Link to="/" style={{ color: 'rgba(255, 255, 255, 0.8)', textDecoration: 'none', fontSize: '0.875rem', transition: 'color 0.2s ease' }}>Home</Link>
              <Link to="/about" style={{ color: 'rgba(255, 255, 255, 0.8)', textDecoration: 'none', fontSize: '0.875rem', transition: 'color 0.2s ease' }}>About Us</Link>
              <Link to="/services" style={{ color: 'rgba(255, 255, 255, 0.8)', textDecoration: 'none', fontSize: '0.875rem', transition: 'color 0.2s ease' }}>Services</Link>
              <Link to="/testimonials" style={{ color: 'rgba(255, 255, 255, 0.8)', textDecoration: 'none', fontSize: '0.875rem', transition: 'color 0.2s ease' }}>Testimonials</Link>
              <Link to="/faq" style={{ color: 'rgba(255, 255, 255, 0.8)', textDecoration: 'none', fontSize: '0.875rem', transition: 'color 0.2s ease' }}>FAQ</Link>
              <Link to="/contact" style={{ color: 'rgba(255, 255, 255, 0.8)', textDecoration: 'none', fontSize: '0.875rem', transition: 'color 0.2s ease' }}>Contact</Link>
              <a href={companyInfo.teamPortalUrl} target="_blank" rel="noopener noreferrer" style={{ color: 'rgba(255, 255, 255, 0.8)', textDecoration: 'none', fontSize: '0.875rem', transition: 'color 0.2s ease' }}>Employee Portal</a>
            </nav>
          </div>

          {/* Contact Info */}
          <div>
            <h3 style={{
              fontFamily: 'Nunito, system-ui, sans-serif',
              fontSize: '0.875rem',
              fontWeight: '600',
              textTransform: 'uppercase',
              letterSpacing: '0.025em',
              marginBottom: '1rem',
              color: '#FF8C42'
            }}>
              Contact Us
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <a href={`tel:${companyInfo.phone}`} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'rgba(255, 255, 255, 0.8)', textDecoration: 'none', fontSize: '0.875rem' }}>
                <Phone size={16} />
                <span>{companyInfo.phone}</span>
              </a>
              <a href={`mailto:${companyInfo.email}`} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'rgba(255, 255, 255, 0.8)', textDecoration: 'none', fontSize: '0.875rem', wordBreak: 'break-all' }}>
                <Mail size={16} />
                <span>{companyInfo.email}</span>
              </a>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'rgba(255, 255, 255, 0.8)', fontSize: '0.875rem' }}>
                <MapPin size={16} />
                <span>{companyInfo.serviceArea}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{
          borderTop: '1px solid rgba(255, 255, 255, 0.2)',
          paddingTop: '1.2rem',
          marginTop: '2rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem',
          alignItems: 'center',
          textAlign: 'center'
        }}>
          <p style={{ 
            fontSize: '0.75rem', 
            color: 'rgba(255, 255, 255, 0.6)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            flexWrap: 'wrap',
            justifyContent: 'center'
          }}>
            <span>© {currentYear} SafeNest Home Care. All rights reserved.</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              Made with <img src="/brand/heart-pulse.svg" alt="love" width="22" height="22" style={{ display: 'inline-block', verticalAlign: 'middle' }} /> in Ontario
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
