import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { faqs } from '../data/mock';
import StoryScene, { SCENES } from '../components/story/StoryScene';

const FAQ = () => {
  const [openId, setOpenId] = useState(null);

  const toggleFAQ = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div style={{ paddingTop: '80px' }}>
      {/* Hero Section */}
      <section style={{ 
        padding: '5rem 1.2rem 3rem',
        background: 'var(--gradient-hero-subtle)',
        textAlign: 'center'
      }}>
        <div className="container" style={{ maxWidth: '900px', margin: '0 auto' }}>
          <h1 className="heading-hero" style={{ marginBottom: '1rem' }}>Frequently Asked Questions</h1>
          <p className="body-large" style={{ color: '#353535' }}>
            Find answers to common questions about our home care services, caregivers, and how SafeNest can support your family.
          </p>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section style={{ padding: '5rem 1.2rem', background: 'var(--bg-page)' }}>
        <div className="container" style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {faqs.map((faq, idx) => {
              const open = openId === faq.id;
              return (
              <div key={faq.id} className="faq-item" style={{
                background: open ? 'var(--sn-cream)' : 'white',
                borderRadius: 'var(--sn-radius-md)',
                border: '1px solid var(--sn-line)',
                borderLeft: `4px solid ${open ? 'var(--sn-warm-orange)' : 'var(--sn-line)'}`,
                boxShadow: open ? 'var(--sn-shadow-sm)' : 'none',
                overflow: 'hidden',
                transition: 'box-shadow 0.3s ease, background 0.3s ease, border-color 0.3s ease'
              }}>
                <h2 style={{ margin: 0, font: 'inherit' }}>
                <button
                  type="button"
                  id={`faq-q-${faq.id}`}
                  aria-expanded={open}
                  aria-controls={`faq-a-${faq.id}`}
                  onClick={() => toggleFAQ(faq.id)}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    padding: '1.2rem 1.5rem',
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    textAlign: 'left',
                    fontFamily: 'inherit',
                    fontSize: '1.125rem',
                    fontWeight: '600',
                    color: 'var(--sn-ink)'
                  }}
                >
                  <span aria-hidden="true" style={{
                    fontFamily: 'var(--sn-font-script)', fontSize: '1.6rem', lineHeight: 1,
                    color: 'var(--sn-ember)', minWidth: '1.6rem'
                  }}>{idx + 1}</span>
                  <span style={{ flex: 1 }}>{faq.question}</span>
                  <ChevronDown
                    size={20}
                    aria-hidden="true"
                    style={{
                      transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.3s ease',
                      flexShrink: 0,
                      color: 'var(--sn-hearth-blue)'
                    }}
                  />
                </button>
                </h2>

                <div
                  id={`faq-a-${faq.id}`}
                  role="region"
                  aria-labelledby={`faq-q-${faq.id}`}
                  style={{
                    maxHeight: open ? '1000px' : '0',
                    visibility: open ? 'visible' : 'hidden', // keeps closed answers out of tab order and screen readers
                    overflow: 'hidden',
                    transition: open ? 'max-height 0.3s ease' : 'max-height 0.3s ease, visibility 0s 0.3s'
                  }}
                >
                  <div style={{
                    padding: '0 1.5rem 1.4rem calc(1.5rem + 1.6rem + 1rem)',
                    fontSize: '1rem',
                    lineHeight: '1.8',
                    color: '#353535'
                  }}>
                    {faq.answer}
                  </div>
                </div>
              </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Still Have Questions */}
      <section style={{ padding: '5rem 1.2rem', background: 'var(--bg-section)' }}>
        <div className="container" style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{ maxWidth: '520px', margin: '0 auto 2rem', borderRadius: 'var(--sn-radius-lg)', overflow: 'hidden', boxShadow: 'var(--sn-shadow-md)' }}>
            <StoryScene scene={SCENES.find((sc) => sc.id === 'window')} />
          </div>
          <h2 className="heading-1" style={{ marginBottom: '1rem' }}>
            Still Have Questions?
          </h2>
          <p className="body-large" style={{ marginBottom: '2rem', color: '#353535' }}>
            We're here to help! Our team is ready to answer any additional questions you may have about our services and how we can support your family.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
            <a href="/contact" className="btn-primary">
              Contact Us
            </a>
            <a href="tel:437-663-6353" className="btn-secondary">
              Call 437-663-6353
            </a>
          </div>
        </div>
      </section>

      {/* Quick Contact Info */}
      <section style={{ padding: '4rem 1.2rem', background: 'white' }}>
        <div className="container" style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 250px), 1fr))',
            gap: '2rem',
            textAlign: 'center'
          }}>
            <div>
              <h3 className="heading-3" style={{ color: '#0066B3', marginBottom: '0.5rem' }}>
                Phone
              </h3>
              <a href="tel:437-663-6353" style={{ 
                fontSize: '1.125rem', 
                color: '#232323',
                textDecoration: 'none',
                fontWeight: '500'
              }}>
                437-663-6353
              </a>
            </div>
            <div>
              <h3 className="heading-3" style={{ color: '#0066B3', marginBottom: '0.5rem' }}>
                Email
              </h3>
              <a href="mailto:dipali@safenesthomecare.com" style={{ 
                fontSize: '1.125rem', 
                color: '#232323',
                textDecoration: 'none',
                fontWeight: '500',
                wordBreak: 'break-all'
              }}>
                dipali@safenesthomecare.com
              </a>
            </div>
            <div>
              <h3 className="heading-3" style={{ color: '#0066B3', marginBottom: '0.5rem' }}>
                Service Area
              </h3>
              <p style={{ 
                fontSize: '1.125rem', 
                color: '#232323',
                fontWeight: '500'
              }}>
                Ontario, Canada
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FAQ;
