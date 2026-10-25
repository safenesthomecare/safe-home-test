import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, ArrowRight } from 'lucide-react';
import TwigDivider from '../components/TwigDivider';
import ArtifactIcon from '../components/story/ArtifactIcon';
import { companyInfo, services, whyChooseUs, stats } from '../data/mock';
import { asset } from '../lib/asset';
import { StoryProp } from '../components/story/props';

const Home = () => {
  const serviceIcon = { 1: 'personal-care', 2: 'companionship', 3: 'medication', 4: 'walks', 5: 'services' };
  const whyIcon = { 1: 'services', 2: 'about', 3: 'personal-care', 4: 'home-safety', 5: 'window', 6: 'calendar-clock' };
  return (
    <div style={{ paddingTop: '80px' }}>
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <StoryProp name="shoes" side="l" inset />
          <img
            src={asset('/brand/symbol-animated.svg')}
            alt="SafeNest Home Care: two people sheltering a home in a nest"
            className="hero-symbol"
            width="320"
            height="256"
          />
          <div className="hero-announcement">
            <span>{companyInfo.experience}</span>
          </div>
          
          <h1 className="heading-hero" style={{ marginBottom: '0.75rem' }}>
            {companyInfo.name}
          </h1>
          
          <p className="hero-tagline" style={{ marginBottom: '1.2rem' }}>
            {companyInfo.tagline}
          </p>
          
          <p className="body-large" style={{ maxWidth: '700px', margin: '0 auto 2rem', color: '#353535' }}>
            Providing compassionate, reliable, and personalized home care that supports independence, dignity, and peace of mind across Ontario.
          </p>
          
          <div className="hero-actions" style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center', alignItems: 'center' }}>
            <Link to="/contact" className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
              Request Care <ArrowRight size={18} />
            </Link>
            <a href={`tel:${companyInfo.phone}`} className="btn-secondary" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
              <Phone size={18} />
              {companyInfo.phone}
            </a>
          </div>

          {/* Stats */}
          <div className="hero-stats" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 120px), 1fr))',
            gap: '1.2rem',
            maxWidth: '800px',
            margin: '3rem auto 0',
            padding: '2rem 1rem',
            background: 'rgba(255, 255, 255, 0.6)',
            borderRadius: '0.75rem',
            backdropFilter: 'blur(4px)'
          }}>
            {stats.map((stat, index) => (
              <div key={index} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', fontWeight: '600', color: 'var(--sn-hearth-blue)', fontFamily: 'var(--sn-font-display)', marginBottom: '0.25rem' }}>
                  {stat.value}
                </div>
                <div style={{ fontSize: '0.75rem', color: '#353535', textTransform: 'uppercase', letterSpacing: '0.025em', fontFamily: 'Nunito, system-ui, sans-serif' }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <TwigDivider />

      {/* Services Preview */}
      <section style={{ padding: '5rem 1.2rem', background: 'var(--bg-page)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 className="heading-1" style={{ marginBottom: '0.5rem' }}>Our Care Services</h2>
            <p className="body-medium" style={{ color: '#353535', maxWidth: '600px', margin: '0 auto' }}>
              Comprehensive home care solutions tailored to your unique needs
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
            gap: '1.2rem',
            marginBottom: '2rem'
          }}>
            {services.slice(0, 3).map((service) => (
              <div key={service.id} className="voice-card hover-lift" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <ArtifactIcon name={serviceIcon[service.id]} size={30} tile style={{ marginBottom: '1rem', alignSelf: 'flex-start' }} />
                <h3 className="heading-3" style={{ marginBottom: '0.75rem' }}>{service.title}</h3>
                <p className="body-small" style={{ color: '#353535', flex: 1 }}>{service.description}</p>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center' }}>
            <Link to="/services" className="btn-primary">
              View All Services
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section style={{ padding: '5rem 1.2rem', background: 'var(--bg-section)' }}>
        <div className="container">
          <StoryProp name="plant" side="r" />
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 className="heading-1" style={{ marginBottom: '0.5rem' }}>Why Choose SafeNest?</h2>
            <p className="body-medium" style={{ color: '#353535', maxWidth: '600px', margin: '0 auto' }}>
              Trusted home care that prioritizes your comfort, safety, and independence
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
            gap: '1.2rem'
          }}>
            {whyChooseUs.map((item) => {
              return (
                <div key={item.id} style={{
                  background: 'white',
                  padding: '1.2rem',
                  borderRadius: '0.75rem',
                  boxShadow: '0 2px 6px rgba(0, 0, 0, 0.03)',
                  transition: 'all 0.3s ease'
                }} className="hover-lift">
                  <ArtifactIcon name={whyIcon[item.id]} size={30} tile style={{ marginBottom: '0.75rem' }} />
                  <h3 className="heading-3" style={{ marginBottom: '0.5rem' }}>{item.title}</h3>
                  <p className="body-small" style={{ color: '#353535' }}>{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ 
        padding: '5rem 1.2rem',
        background: 'linear-gradient(135deg, rgba(252, 202, 199, 1) 0%, rgba(253, 215, 197, 0.8) 50%, rgba(255, 250, 243, 0.8) 100%)',
        textAlign: 'center'
      }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <StoryProp name="lamp" side="l" />
          <h2 className="heading-1" style={{ marginBottom: '1rem' }}>
            Ready to Experience Care That Feels Like Family?
          </h2>
          <p className="body-large" style={{ marginBottom: '2rem', color: '#353535' }}>
            Contact us today for a free consultation and discover how SafeNest can provide the compassionate care your loved ones deserve.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
            <Link to="/contact" className="btn-primary">
              Get Started Today
            </Link>
            <a href={`tel:${companyInfo.phone}`} className="btn-secondary">
              <Phone size={18} style={{ marginRight: '0.5rem' }} />
              Call Us Now
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
