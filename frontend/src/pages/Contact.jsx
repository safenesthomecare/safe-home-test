import React, { useEffect, useRef, useState } from 'react';
import { Phone, Send } from 'lucide-react';
import ArtifactIcon from '../components/story/ArtifactIcon';
import PageMark from '../components/story/PageMark';
import StoryScene, { SCENES } from '../components/story/StoryScene';
import { companyInfo } from '../data/mock';
import { asset } from '../lib/asset';
import { toast } from 'sonner';
import axios from 'axios';
import { DEMO } from '../lib/demo';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || '';
const API = `${BACKEND_URL}/api`;

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sentTo, setSentTo] = useState(null); // first name once the "knock" went through
  const doorRef = useRef(null);
  useEffect(() => { if (sentTo !== null && doorRef.current) doorRef.current.focus(); }, [sentTo]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // UI-preview build has no server: pretend to send so the whole flow can be tested.
      const response = DEMO
        ? await new Promise((resolve) => setTimeout(() => resolve({ status: 200 }), 700))
        : await axios.post(`${API}/contact`, formData);
      
      if (response.status === 200) {
        toast.success(DEMO ? 'Demo only: nothing was sent.' : 'Thank you for reaching out! We will contact you within 24 hours.');
        setSentTo(formData.name.trim().split(' ')[0] || 'friend');
        setFormData({ name: '', email: '', phone: '', message: '' });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Something went wrong. Please try calling us directly at 437-663-6353.');
    } finally {
      setIsSubmitting(false);
    }
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
          <PageMark />
          <h1 className="heading-hero" style={{ marginBottom: '1rem' }}>Get in Touch</h1>
          <p className="body-large" style={{ color: '#353535' }}>
            Ready to start your journey with SafeNest? We're here to answer your questions and help you find the perfect care solution.
          </p>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section style={{ padding: '5rem 1.2rem', background: 'var(--bg-page)' }}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
            gap: '3rem',
            alignItems: 'start'
          }}>
            {/* Contact Information */}
            <div>
              <h2 className="heading-2" style={{ marginBottom: '1.2rem' }}>
                Contact Information
              </h2>
              <p className="body-medium" style={{ color: '#353535', marginBottom: '2rem', lineHeight: '1.8' }}>
                Reach out to us anytime. We're available to discuss your care needs and answer any questions you may have.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {/* Phone */}
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    background: 'rgba(0, 102, 179, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    color: '#0066B3'
                  }}>
                    <ArtifactIcon name="phone" size={26} />
                  </div>
                  <div>
                    <div style={{ 
                      fontWeight: '600', 
                      marginBottom: '0.25rem',
                      color: '#232323',
                      fontSize: '1rem'
                    }}>
                      Phone
                    </div>
                    <a href={`tel:${companyInfo.phone}`} style={{
                      color: '#0066B3',
                      textDecoration: 'none',
                      fontSize: '1.125rem',
                      fontWeight: '500'
                    }}>
                      {companyInfo.phone}
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    background: 'rgba(255, 140, 66, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    color: '#FF8C42'
                  }}>
                    <ArtifactIcon name="mail" size={26} />
                  </div>
                  <div>
                    <div style={{ 
                      fontWeight: '600', 
                      marginBottom: '0.25rem',
                      color: '#232323',
                      fontSize: '1rem'
                    }}>
                      Email
                    </div>
                    <a href={`mailto:${companyInfo.email}`} style={{
                      color: '#0066B3',
                      textDecoration: 'none',
                      fontSize: '1.125rem',
                      fontWeight: '500',
                      wordBreak: 'break-all'
                    }}>
                      {companyInfo.email}
                    </a>
                  </div>
                </div>

                {/* Service Area */}
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    background: 'rgba(0, 102, 179, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    color: '#0066B3'
                  }}>
                    <ArtifactIcon name="location" size={26} />
                  </div>
                  <div>
                    <div style={{ 
                      fontWeight: '600', 
                      marginBottom: '0.25rem',
                      color: '#232323',
                      fontSize: '1rem'
                    }}>
                      Service Area
                    </div>
                    <p style={{
                      color: '#353535',
                      fontSize: '1.125rem',
                      fontWeight: '500'
                    }}>
                      {companyInfo.serviceArea}
                    </p>
                  </div>
                </div>
              </div>

              {/* Business Hours */}
              <div style={{
                marginTop: '2rem',
                padding: '1.2rem',
                background: 'rgba(0, 102, 179, 0.05)',
                borderRadius: '0.75rem',
                borderLeft: '4px solid #0066B3'
              }}>
                <h3 className="heading-3" style={{ marginBottom: '0.75rem', color: '#0066B3' }}>
                  Response Time
                </h3>
                <p className="body-small" style={{ color: '#353535', lineHeight: '1.6' }}>
                  We typically respond to all inquiries within 24 hours. For urgent care needs, please call us directly.
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div style={{
              background: 'white',
              padding: '2rem',
              borderRadius: '0.75rem',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)'
            }}>
              {sentTo !== null ? (
                <div ref={doorRef} tabIndex={-1} role="status" style={{ outline: 'none', textAlign: 'center' }}>
                  {/* Scene remounts here, so the door swings open as the payoff */}
                  <div style={{ borderRadius: '0.75rem', overflow: 'hidden', marginBottom: '1.2rem' }}>
                    <StoryScene scene={SCENES[0]} />
                  </div>
                  <h2 className="heading-2" style={{ marginBottom: '0.5rem' }}>The door is open, {sentTo}.</h2>
                  <p className="body-medium" style={{ color: '#353535', lineHeight: '1.8', marginBottom: '1.2rem' }}>
                    {DEMO && <strong style={{ display: 'block', color: 'var(--sn-ember)' }}>Demo only: nothing was sent.</strong>}
                    Thank you for reaching out! We will contact you within 24 hours. If it is urgent, call us at{' '}
                    <a href={`tel:${companyInfo.phone}`} style={{ color: '#0066B3', fontWeight: 600 }}>{companyInfo.phone}</a>.
                  </p>
                  <button type="button" className="btn-secondary" onClick={() => setSentTo(null)}>Send another message</button>
                </div>
              ) : (<>
              <h2 className="heading-2" style={{ marginBottom: '0.4rem' }}>
                Send Us a Message
              </h2>
              <p style={{ fontFamily: 'var(--sn-font-script)', fontSize: '1.4rem', color: 'var(--sn-ember)', margin: '0 0 1.2rem', lineHeight: 1.2 }}>
                Knock, knock. We are happy to hear from you.
              </p>
              
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                {/* Name */}
                <div>
                  <label htmlFor="name" style={{
                    display: 'block',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    color: '#232323',
                    marginBottom: '0.5rem'
                  }}>
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      border: '1px solid #999999',
                      borderRadius: '0.5rem',
                      fontSize: '1rem',
                      color: '#232323',
                      transition: 'border-color 0.2s ease',
                      outline: 'none'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#4D4D4D'}
                    onBlur={(e) => e.target.style.borderColor = '#999999'}
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" style={{
                    display: 'block',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    color: '#232323',
                    marginBottom: '0.5rem'
                  }}>
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      border: '1px solid #999999',
                      borderRadius: '0.5rem',
                      fontSize: '1rem',
                      color: '#232323',
                      transition: 'border-color 0.2s ease',
                      outline: 'none'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#4D4D4D'}
                    onBlur={(e) => e.target.style.borderColor = '#999999'}
                  />
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="phone" style={{
                    display: 'block',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    color: '#232323',
                    marginBottom: '0.5rem'
                  }}>
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      border: '1px solid #999999',
                      borderRadius: '0.5rem',
                      fontSize: '1rem',
                      color: '#232323',
                      transition: 'border-color 0.2s ease',
                      outline: 'none'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#4D4D4D'}
                    onBlur={(e) => e.target.style.borderColor = '#999999'}
                  />
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" style={{
                    display: 'block',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    color: '#232323',
                    marginBottom: '0.5rem'
                  }}>
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="5"
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      border: '1px solid #999999',
                      borderRadius: '0.5rem',
                      fontSize: '1rem',
                      color: '#232323',
                      transition: 'border-color 0.2s ease',
                      outline: 'none',
                      resize: 'vertical',
                      fontFamily: 'inherit'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#4D4D4D'}
                    onBlur={(e) => e.target.style.borderColor = '#999999'}
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary"
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    opacity: isSubmitting ? 0.7 : 1,
                    cursor: isSubmitting ? 'not-allowed' : 'pointer'
                  }}
                >
                  {isSubmitting ? (<><img src={asset('/brand/loader.svg')} alt="" width="28" height="28" /> Sending...</>) : (
                    <>
                      <Send size={18} />
                      Knock on Our Door
                    </>
                  )}
                </button>
              </form>
              </>)}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ 
        padding: '4rem 1.2rem',
        background: 'linear-gradient(135deg, rgba(252, 202, 199, 1) 0%, rgba(253, 215, 197, 0.8) 50%, rgba(255, 250, 243, 0.8) 100%)',
        textAlign: 'center'
      }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <h2 className="heading-2" style={{ marginBottom: '0.75rem' }}>
            Prefer to Speak Directly?
          </h2>
          <p className="body-medium" style={{ marginBottom: '1.2rem', color: '#353535' }}>
            Give us a call and speak with our care coordinators who can answer your questions immediately.
          </p>
          <a href={`tel:${companyInfo.phone}`} className="btn-primary">
            <Phone size={18} style={{ marginRight: '0.5rem' }} />
            {companyInfo.phone}
          </a>
        </div>
      </section>
    </div>
  );
};

export default Contact;
