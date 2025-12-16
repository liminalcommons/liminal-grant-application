import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import MyProposalsList from '@/components/MyProposalsList'
import { ArrowLeft, Plus } from 'lucide-react'

export default async function MyProposalsPage() {
  const { userId } = await auth()

  if (!userId) {
    redirect('/sign-in?redirect_url=/my-proposals')
  }

  return (
    <main>
      <Navbar />

      <section className="section" style={{ paddingTop: '8rem' }}>
        <div className="container" style={{ maxWidth: '900px' }}>
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

          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '2rem',
            flexWrap: 'wrap',
            gap: '1rem',
          }}>
            <div>
              <h1 style={{ marginBottom: '0.5rem', fontSize: 'clamp(2rem, 5vw, 3rem)' }}>
                <span className="rune-accent" style={{ marginRight: '0.5rem' }}>ᛗ</span>
                My Proposals
              </h1>
              <p style={{ color: 'var(--color-text-secondary)', margin: 0 }}>
                View and edit your submitted whitepapers
              </p>
            </div>
            <Link href="/submit" className="btn btn-primary">
              <Plus size={20} />
              New Proposal
            </Link>
          </div>

          <MyProposalsList userId={userId} />
        </div>
      </section>
    </main>
  )
}
