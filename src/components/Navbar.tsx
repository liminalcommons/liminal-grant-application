'use client'

import { useState } from 'react'
import { SignInButton, SignUpButton, UserButton, useUser } from '@clerk/nextjs'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'

export default function Navbar() {
  const { isSignedIn, isLoaded } = useUser()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <>
      <nav className="glass-card navbar" style={{
        position: 'fixed',
        top: '0.75rem',
        left: '50%',
        transform: 'translateX(-50%)',
        width: 'calc(100% - 1.5rem)',
        maxWidth: '1200px',
        zIndex: 1000,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0.6rem 1rem',
        borderRadius: '12px',
      }}>
        {/* Logo */}
        <Link href="/" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.4rem',
          textDecoration: 'none',
        }}>
          <span className="rune-accent" style={{ fontSize: '1.3rem' }}>ᛚ</span>
          <span className="navbar-title" style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '1rem',
            color: 'var(--color-gold)',
            fontWeight: 600,
          }}>
            Grant Factory
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="navbar-desktop" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
        }}>
          <Link href="#showcase" className="nav-link">
            Showcase
          </Link>
          <Link href="#how-it-works" className="nav-link">
            How It Works
          </Link>

          {isLoaded && (
            <>
              {isSignedIn ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <Link href="/my-proposals" className="nav-link">
                    My Proposals
                  </Link>
                  <Link href="/submit" className="btn btn-primary btn-sm">
                    Submit
                  </Link>
                  <UserButton afterSignOutUrl="/" />
                </div>
              ) : (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <SignInButton mode="modal">
                    <button className="btn btn-secondary btn-sm">
                      Sign In
                    </button>
                  </SignInButton>
                  <SignUpButton mode="modal">
                    <button className="btn btn-primary btn-sm">
                      Start
                    </button>
                  </SignUpButton>
                </div>
              )}
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="navbar-mobile-toggle"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="navbar-mobile-menu glass-card" onClick={() => setIsMenuOpen(false)}>
          <Link href="#showcase" className="nav-link-mobile">
            Showcase
          </Link>
          <Link href="#how-it-works" className="nav-link-mobile">
            How It Works
          </Link>

          {isLoaded && (
            <>
              {isSignedIn ? (
                <>
                  <Link href="/my-proposals" className="nav-link-mobile">
                    My Proposals
                  </Link>
                  <Link href="/submit" className="btn btn-primary" style={{ width: '100%', textAlign: 'center' }}>
                    Submit Proposal
                  </Link>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', paddingTop: '0.5rem' }}>
                    <UserButton afterSignOutUrl="/" />
                    <span style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem' }}>Account</span>
                  </div>
                </>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', width: '100%' }}>
                  <SignInButton mode="modal">
                    <button className="btn btn-secondary" style={{ width: '100%' }}>
                      Sign In
                    </button>
                  </SignInButton>
                  <SignUpButton mode="modal">
                    <button className="btn btn-primary" style={{ width: '100%' }}>
                      Get Started
                    </button>
                  </SignUpButton>
                </div>
              )}
            </>
          )}
        </div>
      )}

      <style jsx>{`
        .navbar-desktop {
          display: flex;
        }
        .navbar-mobile-toggle {
          display: none;
          background: transparent;
          border: none;
          color: var(--color-gold);
          cursor: pointer;
          padding: 0.25rem;
        }
        .navbar-mobile-menu {
          display: none;
        }

        @media (max-width: 768px) {
          .navbar-desktop {
            display: none !important;
          }
          .navbar-mobile-toggle {
            display: flex;
          }
          .navbar-mobile-menu {
            display: flex;
            flex-direction: column;
            gap: 1rem;
            position: fixed;
            top: 4rem;
            left: 0.75rem;
            right: 0.75rem;
            padding: 1.25rem;
            border-radius: 12px;
            z-index: 999;
            animation: slideDown 0.2s ease;
          }
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  )
}
