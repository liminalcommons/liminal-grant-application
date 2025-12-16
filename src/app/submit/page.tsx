import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import SubmitForm from '@/components/SubmitForm'
import CopyPromptButton from '@/components/CopyPromptButton'
import { ArrowLeft } from 'lucide-react'

export default async function SubmitPage() {
  const { userId } = await auth()

  // If not signed in, redirect to sign-in
  if (!userId) {
    redirect('/sign-in?redirect_url=/submit')
  }

  return (
    <main>
      <Navbar />

      <section className="section" style={{ paddingTop: '8rem' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <Link
            href="/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: 'var(--color-text-muted)',
              marginBottom: '2rem',
              fontSize: '0.95rem',
              transition: 'color 0.3s ease',
            }}
          >
            <ArrowLeft size={18} />
            Back to Home
          </Link>

          <h1 style={{ marginBottom: '0.5rem', fontSize: 'clamp(2rem, 5vw, 3rem)' }}>
            <span className="rune-accent" style={{ marginRight: '0.5rem' }}>ᚹ</span>
            Submit Your Whitepaper
          </h1>
          <p style={{
            color: 'var(--color-text-secondary)',
            marginBottom: '2rem',
            fontSize: '1.1rem',
          }}>
            Paste your complete whitepaper below. Make sure you&apos;ve used our System Prompt to generate
            a properly formatted Deep Funding proposal.
          </p>

          <div className="glass-card" style={{
            padding: '1.5rem',
            marginBottom: '2rem',
            borderLeft: '4px solid var(--color-gold)',
          }}>
            <h3 style={{ marginBottom: '0.75rem', fontSize: '1.1rem', color: 'var(--color-gold)' }}>
              Before You Submit
            </h3>
            <ul className="styled-list" style={{ marginBottom: 0 }}>
              <li>Copy our <CopyPromptButton /> and use it with ChatGPT or Claude to generate your whitepaper</li>
              <li>Ensure your proposal includes: Abstract, Problem, Solution, Budget, and Milestones</li>
              <li>Budget should be between $25,000 - $50,000</li>
              <li>By submitting, you agree to the Liminal Commonwealth Protocol (30% circulation)</li>
            </ul>
          </div>

          <SubmitForm />
        </div>
      </section>
    </main>
  )
}
