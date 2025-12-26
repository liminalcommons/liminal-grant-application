import Link from 'next/link'
import Navbar from '@/components/Navbar'
import SystemPrompt from '@/components/SystemPrompt'
import ShowcaseGallery from '@/components/ShowcaseGallery'
import HowItWorks from '@/components/HowItWorks'
import StartProposalButton from '@/components/StartProposalButton'
import { ArrowRight, Users, Shield, Coins } from 'lucide-react'

export default function Home() {
  return (
    <main>
      <Navbar />

      {/* Hero Section */}
      <section className="section yggdrasil-bg" style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        paddingTop: '6rem',
      }}>
        <div className="container" style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <span className="rune-accent" style={{ fontSize: '2rem', display: 'block', marginBottom: '1rem' }}>
            ᛚ ᛁ ᛗ ᛁ ᚾ ᚨ ᛚ
          </span>
          <h1 className="animate-fade-in" style={{ marginBottom: '1.5rem' }}>
            Let Us Help You Get Funded.
          </h1>
          <p style={{
            fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)',
            maxWidth: '700px',
            margin: '0 auto 2rem',
            color: 'var(--color-text-secondary)',
          }}>
            We secured <span style={{ color: 'var(--color-gold)', fontWeight: 600 }}>$50k</span> in grants.
            Now, we are doing the same for you—at scale.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <StartProposalButton />
            <Link href="#opportunity" className="btn btn-secondary">
              Learn More
              <ArrowRight size={20} />
            </Link>
          </div>

          <div className="section-divider" style={{ marginTop: '4rem' }} />
        </div>
      </section>

      {/* The Opportunity Section */}
      <section id="opportunity" className="section">
        <div className="container">
          <h2 style={{ textAlign: 'center' }}>
            <span className="rune-accent" style={{ marginRight: '0.5rem' }}>ᚠ</span>
            The Opportunity
          </h2>
          <div className="section-divider" style={{ maxWidth: '200px', margin: '0 auto 2rem' }} />

          <div className="glass-card knotwork-border" style={{ maxWidth: '800px', margin: '0 auto', padding: '2.5rem' }}>
            <p style={{ fontSize: '1.2rem', marginBottom: '1.5rem' }}>
              There is a <strong style={{ color: 'var(--color-gold)' }}>massive flow of capital</strong> entering
              the AI and deep tech field right now. Venture funds and grant programs are distributing
              <strong style={{ color: 'var(--color-gold)' }}> millions in grants</strong> to build the future of transformative technology.
            </p>

            <h3 style={{ marginBottom: '1rem' }}>Here is the truth:</h3>
            <ul className="styled-list">
              <li>You do <strong>not</strong> need a PhD.</li>
              <li>You do <strong>not</strong> need a GitHub with 10,000 stars.</li>
              <li>You do <strong>not</strong> need to be a programmer.</li>
            </ul>

            <p style={{ marginTop: '1.5rem', fontSize: '1.1rem' }}>
              In the last funding round, <strong style={{ color: 'var(--color-gold)' }}>bold ideas won over credentials</strong>.
              Almost all creative ideas were funded. It can be any idea—if you can dream it, we can format it.
            </p>

            <p style={{
              marginTop: '1.5rem',
              padding: '1rem',
              background: 'rgba(201, 162, 39, 0.1)',
              borderRadius: '8px',
              borderLeft: '4px solid var(--color-gold)',
              fontSize: '1.05rem',
            }}>
              We are the <strong>Liminal Web folks</strong>. We have cracked the code on how to structure these proposals to win.
              We are opening our <strong style={{ color: 'var(--color-gold)' }}>"Grant Factory"</strong> to you.
            </p>
          </div>
        </div>
      </section>

      {/* The Deal Section */}
      <section className="section" style={{ background: 'rgba(0, 0, 0, 0.2)' }}>
        <div className="container">
          <h2 style={{ textAlign: 'center' }}>
            <span className="rune-accent" style={{ marginRight: '0.5rem' }}>ᚷ</span>
            The Deal: The Liminal Commonwealth Protocol
          </h2>
          <div className="section-divider" style={{ maxWidth: '300px', margin: '0 auto 2rem' }} />

          <div className="glass-card" style={{ maxWidth: '900px', margin: '0 auto' }}>
            <p style={{ fontSize: '1.15rem', marginBottom: '2rem', textAlign: 'center' }}>
              We are not just building apps; we are building an <strong style={{ color: 'var(--color-gold)' }}>internal economy</strong>.
              By using this platform to secure your grant, you agree to join the Liminal Commonwealth.
            </p>

            <div className="grid-2" style={{ marginBottom: '2rem' }}>
              <div className="glass-card" style={{ textAlign: 'center' }}>
                <Shield size={40} color="var(--color-gold)" style={{ marginBottom: '1rem' }} />
                <h3 style={{ fontSize: '1.2rem', marginBottom: '0.75rem' }}>The Condition</h3>
                <p style={{ fontSize: '0.95rem' }}>
                  When you get funded, you join the <strong>Liminal Commonwealth Protocol</strong>.
                </p>
              </div>
              <div className="glass-card" style={{ textAlign: 'center' }}>
                <Coins size={40} color="var(--color-gold)" style={{ marginBottom: '1rem' }} />
                <h3 style={{ fontSize: '1.2rem', marginBottom: '0.75rem' }}>The Split</h3>
                <p style={{ fontSize: '0.95rem' }}>
                  <strong style={{ color: 'var(--color-gold)' }}>30%</strong> circulates internally.
                  <strong style={{ color: 'var(--color-gold)' }}> 70%</strong> is yours.
                </p>
              </div>
            </div>

            <div style={{
              padding: '1.5rem',
              background: 'rgba(201, 162, 39, 0.1)',
              borderRadius: '8px',
              border: '1px solid var(--glass-border)',
            }}>
              <h4 style={{ marginBottom: '1rem', color: 'var(--color-gold)' }}>
                <Users size={20} style={{ verticalAlign: 'middle', marginRight: '0.5rem' }} />
                How the 30% Works
              </h4>
              <ul className="styled-list">
                <li>Hire developers from our swarm</li>
                <li>Pay for services within the network</li>
                <li>Donate to the treasury for collective growth</li>
              </ul>
              <p style={{
                marginTop: '1rem',
                fontSize: '0.95rem',
                color: 'var(--color-text-muted)',
              }}>
                This 30% circulation is enforced via a <strong>Web3 Smart Contract</strong>,
                ensuring that as you grow, we all grow.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="section">
        <div className="container">
          <h2 style={{ textAlign: 'center' }}>
            <span className="rune-accent" style={{ marginRight: '0.5rem' }}>ᚹ</span>
            How It Works
          </h2>
          <div className="section-divider" style={{ maxWidth: '200px', margin: '0 auto 2rem' }} />

          <HowItWorks />
        </div>
      </section>

      {/* System Prompt Section */}
      <section className="section" style={{ background: 'rgba(0, 0, 0, 0.2)' }}>
        <div className="container">
          <h2 style={{ textAlign: 'center' }}>
            <span className="rune-accent" style={{ marginRight: '0.5rem' }}>ᚱ</span>
            The System Prompt
          </h2>
          <div className="section-divider" style={{ maxWidth: '200px', margin: '0 auto 1rem' }} />
          <p style={{ textAlign: 'center', marginBottom: '2rem', color: 'var(--color-text-secondary)', fontSize: '1.15rem' }}>
            Copy this prompt and paste it into <strong style={{ color: 'var(--color-gold)' }}>Google AI Studio</strong> (recommended for context length).<br />
            The AI will guide you through writing your grant proposal.
          </p>

          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <SystemPrompt />
          </div>
        </div>
      </section>

      {/* Swarm Showcase Section */}
      <section id="showcase" className="section">
        <div className="container">
          <h2 style={{ textAlign: 'center' }}>
            <span className="rune-accent" style={{ marginRight: '0.5rem' }}>ᛊ</span>
            Swarm Showcase
          </h2>
          <div className="section-divider" style={{ maxWidth: '200px', margin: '0 auto 1rem' }} />
          <p style={{ textAlign: 'center', marginBottom: '2rem', color: 'var(--color-text-secondary)' }}>
            Browse submitted proposals from the community. Get inspired and see what others are building.
          </p>

          <ShowcaseGallery />
        </div>
      </section>

      {/* CTA Section */}
      <section className="section" style={{
        background: 'linear-gradient(135deg, rgba(201, 162, 39, 0.1) 0%, rgba(26, 47, 26, 0.5) 100%)',
      }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <span className="rune-accent" style={{ fontSize: '2.5rem', display: 'block', marginBottom: '1rem' }}>
            ᚨ ᛊ ᚲ
          </span>
          <h2 style={{ marginBottom: '1rem' }}>Ready to Get Funded?</h2>
          <p style={{
            fontSize: '1.2rem',
            maxWidth: '600px',
            margin: '0 auto 2rem',
            color: 'var(--color-text-secondary)',
          }}>
            Join the Liminal Commonwealth. Turn your idea into a funded reality.
          </p>
          <StartProposalButton large />
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        padding: '2rem 0',
        borderTop: '1px solid var(--glass-border)',
        textAlign: 'center',
      }}>
        <div className="container">
          <div style={{ marginBottom: '1rem' }}>
            <span className="rune-accent">ᛚ</span>
            <span style={{
              fontFamily: 'var(--font-heading)',
              marginLeft: '0.5rem',
              color: 'var(--color-gold)',
            }}>
              Liminal Commons
            </span>
          </div>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>
            Building the bridge between ideas and funding.
          </p>
          <div className="section-divider" style={{ maxWidth: '100px', margin: '1rem auto' }} />
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.8rem' }}>
            &copy; {new Date().getFullYear()} Liminal Commons. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  )
}
