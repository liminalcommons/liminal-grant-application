'use client'

import { SignInButton, SignUpButton, UserButton, useUser } from '@clerk/nextjs'
import Link from 'next/link'

export default function Navbar() {
  const { isSignedIn, isLoaded } = useUser()

  return (
    <nav className="glass-card" style={{
      position: 'fixed',
      top: '1rem',
      left: '50%',
      transform: 'translateX(-50%)',
      width: 'calc(100% - 2rem)',
      maxWidth: '1200px',
      zIndex: 1000,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '0.75rem 1.5rem',
      borderRadius: '12px',
    }}>
      <Link href="/" style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        textDecoration: 'none',
      }}>
        <span className="rune-accent">ᛚ</span>
        <span style={{
          fontFamily: 'var(--font-heading)',
          fontSize: '1.2rem',
          color: 'var(--color-gold)',
          fontWeight: 600,
        }}>
          Liminal Grant Factory
        </span>
      </Link>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <Link href="#showcase" style={{
          color: 'var(--color-text-secondary)',
          fontSize: '0.9rem',
          transition: 'color 0.3s ease',
        }}>
          Showcase
        </Link>
        <Link href="#how-it-works" style={{
          color: 'var(--color-text-secondary)',
          fontSize: '0.9rem',
          transition: 'color 0.3s ease',
        }}>
          How It Works
        </Link>

        {isLoaded && (
          <>
            {isSignedIn ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <Link href="/submit" className="btn btn-primary" style={{
                  padding: '0.5rem 1rem',
                  fontSize: '0.9rem',
                }}>
                  Submit Proposal
                </Link>
                <UserButton afterSignOutUrl="/" />
              </div>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <SignInButton mode="modal">
                  <button className="btn btn-secondary" style={{
                    padding: '0.5rem 1rem',
                    fontSize: '0.9rem',
                  }}>
                    Sign In
                  </button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <button className="btn btn-primary" style={{
                    padding: '0.5rem 1rem',
                    fontSize: '0.9rem',
                  }}>
                    Get Started
                  </button>
                </SignUpButton>
              </div>
            )}
          </>
        )}
      </div>
    </nav>
  )
}
