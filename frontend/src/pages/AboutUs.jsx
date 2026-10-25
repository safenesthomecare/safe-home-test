import React from 'react';
import { companyInfo } from '../data/mock';
import PageMark from '../components/story/PageMark';
import StoryScene, { SCENES } from '../components/story/StoryScene';

const AboutUs = () => {
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
          <h1 className="heading-hero" style={{ marginBottom: '1rem' }}>About SafeNest Home Care</h1>
          <p className="body-large" style={{ color: '#353535' }}>
            More than just care providers – we're your extended family, dedicated to bringing warmth, comfort, and compassion into your home.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section style={{ padding: '5rem 1.2rem', background: 'var(--bg-page)' }}>
        <div className="container" style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
            gap: '2rem'
          }}>
            {/* Mission */}
            <div style={{
              background: 'rgba(0, 102, 179, 0.05)',
              padding: '2rem',
              borderRadius: '0.75rem',
              borderLeft: '4px solid #0066B3'
            }}>
              <h2 className="heading-2" style={{ color: '#0066B3', marginBottom: '1rem' }}>
                Our Mission
              </h2>
              <p className="body-medium" style={{ lineHeight: '1.8', color: '#353535' }}>
                {companyInfo.mission}
              </p>
            </div>

            {/* Vision */}
            <div style={{
              background: 'rgba(255, 140, 66, 0.05)',
              padding: '2rem',
              borderRadius: '0.75rem',
              borderLeft: '4px solid #FF8C42'
            }}>
              <h2 className="heading-2" style={{ color: 'var(--sn-ember)', marginBottom: '1rem' }}>
                Our Vision
              </h2>
              <p className="body-medium" style={{ lineHeight: '1.8', color: '#353535' }}>
                {companyInfo.vision}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section style={{ padding: '5rem 1.2rem', background: 'var(--bg-section)' }}>
        <div className="container" style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <h2 className="heading-1" style={{ textAlign: 'center', marginBottom: '2rem' }}>
            Our Story
          </h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))', gap: '2.5rem', alignItems: 'start' }}>
          <figure className="sn-sticky-fig" style={{ margin: 0 }}>
            <div style={{ borderRadius: 'var(--sn-radius-lg)', overflow: 'hidden', boxShadow: 'var(--sn-shadow-md)' }}>
              <StoryScene scene={SCENES.find((sc) => sc.id === 'breakfast')} />
            </div>
            <figcaption style={{ fontFamily: 'var(--sn-font-script)', fontSize: '1.5rem', color: 'var(--sn-ember)', textAlign: 'center', marginTop: '0.75rem' }}>
              Tea, stories, and someone who listens.
            </figcaption>
          </figure>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
            <p className="body-medium" style={{ lineHeight: '1.8', color: '#353535' }}>
              SafeNest Home Care was founded with a simple yet profound belief: that every person deserves to age gracefully and live independently in the comfort of their own home, surrounded by care that feels like family.
            </p>
            
            <p className="body-medium" style={{ lineHeight: '1.8', color: '#353535' }}>
              With over 3 years of dedicated service across Ontario, we've had the privilege of supporting hundreds of families through life's most challenging transitions. Our journey began when our founder witnessed firsthand the profound difference that compassionate, personalized care could make in the lives of seniors and individuals with special needs.
            </p>
            
            <p className="body-medium" style={{ lineHeight: '1.8', color: '#353535' }}>
              Today, SafeNest Home Care stands as a trusted partner for families throughout Ontario. We've built our reputation on treating each client not as a case number, but as a cherished member of our extended family. Our caregivers don't just provide services – they build meaningful relationships, share smiles and stories, and create a genuine sense of belonging.
            </p>
            
            <p className="body-medium" style={{ lineHeight: '1.8', color: '#353535' }}>
              We understand that inviting someone into your home requires trust. That's why we carefully select and train every member of our team to uphold the highest standards of professionalism, compassion, and respect. When you choose SafeNest, you're choosing care that honors your independence while providing the support you need.
            </p>
          </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section style={{ padding: '5rem 1.2rem', background: 'white' }}>
        <div className="container">
          <h2 className="heading-1" style={{ textAlign: 'center', marginBottom: '3rem' }}>
            Our Core Values
          </h2>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 250px), 1fr))',
            gap: '1.2rem'
          }}>
            {[
              {
                title: 'Compassion',
                description: 'We lead with empathy and genuine care in every interaction, treating each client with the kindness we would show our own family.'
              },
              {
                title: 'Respect',
                description: 'We honor the dignity, independence, and personal preferences of every individual we serve.'
              },
              {
                title: 'Reliability',
                description: 'We show up consistently with professionalism and dedication, earning trust through our actions every single day.'
              },
              {
                title: 'Excellence',
                description: 'We continuously strive to exceed expectations, providing the highest quality of personalized care.'
              },
              {
                title: 'Integrity',
                description: 'We operate with transparency, honesty, and ethical practices in all aspects of our service.'
              },
              {
                title: 'Family',
                description: 'We believe in creating connections that go beyond care – building relationships that truly feel like family.'
              }
            ].map((value, index) => (
              <div key={index} style={{
                background: 'var(--bg-section)',
                padding: '1.2rem',
                borderRadius: '0.75rem',
                borderTop: `4px solid ${['var(--sn-hearth-blue)', 'var(--sn-warm-orange)', 'var(--sn-leaf-green)'][index % 3]}`,
                transition: 'all 0.3s ease'
              }} className="hover-lift">
                <h3 className="heading-3" style={{ color: '#0066B3', marginBottom: '0.75rem' }}>
                  {value.title}
                </h3>
                <p className="body-small" style={{ color: '#353535', lineHeight: '1.6' }}>
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section style={{ 
        padding: '4rem 1.2rem',
        background: 'var(--sn-gradient-warm)',
        textAlign: 'center'
      }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <div className="hero-announcement" style={{ margin: '0 auto 1rem' }}>
            <span>{companyInfo.experience}</span>
          </div>
          <h2 className="heading-1" style={{ marginBottom: '1rem' }}>
            Trusted Across Ontario
          </h2>
          <p className="body-large" style={{ color: '#353535' }}>
            {companyInfo.serviceArea} with personalized care plans designed around your unique needs and preferences.
          </p>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
