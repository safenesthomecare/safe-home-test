import React from 'react';
import { Link } from 'react-router-dom';
import { Check } from 'lucide-react';
import ArtifactIcon from '../components/story/ArtifactIcon';
import PageMark from '../components/story/PageMark';
import StoryScene, { SCENES } from '../components/story/StoryScene';
import { services, additionalServices } from '../data/mock';
import { StoryProp } from '../components/story/props';

const Services = () => {
  const serviceIcon = { 1: 'personal-care', 2: 'companionship', 3: 'medication', 4: 'walks', 5: 'services' };
  // Each core service is illustrated by its moment from "A Day at Home".
  const sceneFor = { 1: 'care', 2: 'breakfast', 3: 'medication', 4: 'walk', 5: 'tea' };

  return (
    <div style={{ paddingTop: '80px' }}>
      {/* Hero Section */}
      <section style={{ 
        padding: '5rem 1.2rem 3rem',
        background: 'var(--gradient-hero-subtle)',
        textAlign: 'center'
      }}>
        <div className="container" style={{ maxWidth: '900px', margin: '0 auto' }}>
          <StoryProp name="bowl" side="r" inset />
          <PageMark />
          <h1 className="heading-hero" style={{ marginBottom: '1rem' }}>Our Care Services</h1>
          <p className="body-large" style={{ color: '#353535' }}>
            Comprehensive, compassionate home care solutions tailored to meet your unique needs and support your independence.
          </p>
        </div>
      </section>

      {/* Main Services */}
      <section style={{ padding: '5rem 1.2rem', background: 'var(--bg-page)' }}>
        <div className="container">
          <StoryProp name="pillbox" side="r" />
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
            gap: '2rem'
          }}>
            {services.map((service) => {
              const scene = SCENES.find((sc) => sc.id === sceneFor[service.id]);
              return (
                <div key={service.id} style={{
                  background: 'white',
                  padding: '2rem',
                  borderRadius: '0.75rem',
                  boxShadow: '0 2px 6px rgba(0, 0, 0, 0.03)',
                  transition: 'all 0.3s ease',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  overflow: 'hidden'
                }} className="hover-lift">
                  {scene && (
                    <div style={{ position: 'relative', margin: '-2rem -2rem 1.4rem' }}>
                      <StoryScene scene={scene} />
                    </div>
                  )}
                  <ArtifactIcon name={serviceIcon[service.id]} size={30} tile style={{ marginBottom: '1.2rem', alignSelf: 'flex-start' }} />
                  
                  <h3 className="heading-2" style={{ marginBottom: '1rem', color: '#232323' }}>
                    {service.title}
                  </h3>
                  
                  <p className="body-medium" style={{ color: '#353535', lineHeight: '1.8', flex: 1 }}>
                    {service.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section style={{ padding: '5rem 1.2rem', background: 'var(--bg-section)' }}>
        <div className="container" style={{ maxWidth: '900px', margin: '0 auto' }}>
          <h2 className="heading-1" style={{ textAlign: 'center', marginBottom: '2rem' }}>
            Additional Services
          </h2>
          <p className="body-medium" style={{ textAlign: 'center', marginBottom: '2rem', color: '#353535' }}>
            Beyond our core services, we offer comprehensive support to enhance daily living and well-being.
          </p>
          
          <div style={{
            background: 'white',
            padding: '2rem',
            borderRadius: '0.75rem',
            boxShadow: '0 2px 6px rgba(0, 0, 0, 0.03)'
          }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 250px), 1fr))',
              gap: '1rem'
            }}>
              {additionalServices.map((service, index) => (
                <div key={index} style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '0.75rem',
                  padding: '0.75rem'
                }}>
                  <div style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    background: '#FF8C42',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    marginTop: '0.125rem'
                  }}>
                    <Check size={16} color="white" strokeWidth={3} />
                  </div>
                  <span className="body-medium" style={{ color: '#353535' }}>
                    {service}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section style={{ padding: '5rem 1.2rem', background: 'white' }}>
        <div className="container" style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <StoryProp name="plant" side="l" />
          <h2 className="heading-1" style={{ textAlign: 'center', marginBottom: '3rem' }}>
            How It Works
          </h2>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 250px), 1fr))',
            gap: '2rem'
          }}>
            {[
              {
                step: '01',
                title: 'Initial Consultation',
                description: 'Contact us for a free consultation. We will discuss your needs, preferences, and care requirements.'
              },
              {
                step: '02',
                title: 'Care Plan Development',
                description: 'We create a personalized care plan tailored to your unique situation and lifestyle.'
              },
              {
                step: '03',
                title: 'Caregiver Matching',
                description: 'We carefully match you with a qualified caregiver who fits your personality and needs.'
              },
              {
                step: '04',
                title: 'Care Begins',
                description: 'Your caregiver starts providing compassionate support, with ongoing communication and adjustments as needed.'
              }
            ].map((item, index) => (
              <div key={index} style={{ textAlign: 'center' }}>
                <div style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #0066B3 0%, #FF8C42 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1rem',
                  fontFamily: 'Nunito, system-ui, sans-serif',
                  fontSize: '1.5rem',
                  fontWeight: '600',
                  color: 'white'
                }}>
                  {item.step}
                </div>
                <h3 className="heading-3" style={{ marginBottom: '0.75rem' }}>
                  {item.title}
                </h3>
                <p className="body-small" style={{ color: '#353535', lineHeight: '1.6' }}>
                  {item.description}
                </p>
              </div>
            ))}
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
          <h2 className="heading-1" style={{ marginBottom: '1rem' }}>
            Ready to Get Started?
          </h2>
          <p className="body-large" style={{ marginBottom: '2rem', color: '#353535' }}>
            Let us help you or your loved ones maintain independence and dignity with our personalized home care services.
          </p>
          <Link to="/contact" className="btn-primary">
            Request a Free Consultation
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Services;
