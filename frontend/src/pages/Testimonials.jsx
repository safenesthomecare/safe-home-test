import React from 'react';
import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';
import { testimonials } from '../data/mock';
import PageMark from '../components/story/PageMark';
import { StoryProp } from '../components/story/props';

const Testimonials = () => {
  return (
    <div style={{ paddingTop: '80px' }}>
      {/* Hero Section */}
      <section style={{ 
        padding: '5rem 1.2rem 3rem',
        background: 'var(--gradient-hero-subtle)',
        textAlign: 'center'
      }}>
        <div className="container" style={{ maxWidth: '900px', margin: '0 auto' }}>
          <StoryProp name="photoframe" side="r" inset />
          <PageMark />
          <h1 className="heading-hero" style={{ marginBottom: '1rem' }}>What Our Families Say</h1>
          <p className="body-large" style={{ color: '#353535' }}>
            Real stories from families who have experienced the SafeNest difference. Your trust means everything to us.
          </p>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section style={{ padding: '5rem 1.2rem', background: 'var(--bg-page)' }}>
        <div className="container">
          <StoryProp name="note" side="l" />
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
            gap: '2rem'
          }}>
            {testimonials.map((testimonial, idx) => (
              <figure key={testimonial.id} className="hover-lift" style={{
                position: 'relative',
                margin: '0.5rem 0',
                padding: '2.4rem 1.8rem 1.6rem',
                background: idx % 2 ? 'var(--sn-sand)' : '#fff',
                backgroundImage: 'repeating-linear-gradient(transparent 0 1.9rem, rgba(0,102,179,.10) 1.9rem calc(1.9rem + 1px))',
                border: '1px solid var(--sn-line)',
                borderRadius: '4px',
                boxShadow: 'var(--sn-shadow-md)',
                rotate: ['-1.2deg', '0.8deg', '-0.6deg', '1.1deg'][idx % 4],
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem'
              }}>
                {/* Tape */}
                <span aria-hidden="true" style={{
                  position: 'absolute', top: '-12px', left: '50%', width: '90px', height: '24px',
                  marginLeft: '-45px', rotate: idx % 2 ? '3deg' : '-3deg',
                  background: 'rgba(255, 200, 61, .55)', boxShadow: '0 1px 2px rgba(0,0,0,.08)'
                }} />

                {/* Handwritten note */}
                <blockquote style={{
                  margin: 0, flex: 1,
                  fontFamily: 'var(--sn-font-script)',
                  fontSize: 'clamp(1.3rem, 3.6vw, 1.5rem)',
                  lineHeight: '1.9rem',
                  color: 'var(--sn-ink)'
                }}>
                  {testimonial.content}
                </blockquote>

                {/* Signature */}
                <figcaption>
                  <div style={{
                    fontFamily: 'var(--sn-font-script)', fontSize: '1.6rem',
                    color: 'var(--sn-ember)', lineHeight: 1.2
                  }}>
                    — {testimonial.name}
                  </div>
                  <div style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem',
                    marginTop: '0.4rem'
                  }}>
                    <span style={{
                      fontFamily: 'var(--sn-font-body)', fontSize: '0.8125rem', color: 'var(--sn-slate)',
                      textTransform: 'uppercase', letterSpacing: '0.04em'
                    }}>
                      {testimonial.role}
                    </span>
                    <span role="img" aria-label={`${testimonial.rating} out of 5 stars`} style={{ display: 'flex', gap: '2px' }}>
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} size={16} fill="#F47A1F" color="#F47A1F" aria-hidden="true" />
                      ))}
                    </span>
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section style={{ padding: '5rem 1.2rem', background: 'var(--bg-section)' }}>
        <div className="container" style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <StoryProp name="teacup" side="r" />
          <h2 className="heading-1" style={{ textAlign: 'center', marginBottom: '3rem' }}>
            Why Families Trust SafeNest
          </h2>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))',
            gap: '2rem',
            textAlign: 'center'
          }}>
            {[
              {
                stat: '100%',
                label: 'Client Satisfaction',
                description: 'Every family we serve is completely satisfied with our care'
              },
              {
                stat: '3+',
                label: 'Years Experience',
                description: 'Proven track record of compassionate, reliable care'
              },
              {
                stat: '100+',
                label: 'Families Served',
                description: 'Trusted by countless families across Ontario'
              },
              {
                stat: '24/7',
                label: 'Support Available',
                description: 'Round-the-clock care options when you need us most'
              }
            ].map((item, index) => (
              <div key={index} style={{
                background: 'white',
                padding: '2rem 1rem',
                borderRadius: '0.75rem',
                boxShadow: '0 2px 6px rgba(0, 0, 0, 0.03)'
              }}>
                <div style={{
                  fontSize: '2.5rem',
                  fontWeight: '600',
                  color: '#0066B3',
                  marginBottom: '0.5rem'
                }}>
                  {item.stat}
                </div>
                <div style={{
                  fontFamily: 'Nunito, system-ui, sans-serif',
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  textTransform: 'uppercase',
                  letterSpacing: '0.025em',
                  color: '#232323',
                  marginBottom: '0.5rem'
                }}>
                  {item.label}
                </div>
                <p className="body-small" style={{ color: '#353535' }}>
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
            Join Our Family of Satisfied Clients
          </h2>
          <p className="body-large" style={{ marginBottom: '2rem', color: '#353535' }}>
            Experience the SafeNest difference for yourself. Contact us today to learn more about our personalized home care services.
          </p>
          <Link to="/contact" className="btn-primary">
            Request Your Free Consultation
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Testimonials;
