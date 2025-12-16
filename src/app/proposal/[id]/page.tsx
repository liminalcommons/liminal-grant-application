import Link from 'next/link'
import Navbar from '@/components/Navbar'
import ProposalView from '@/components/ProposalView'
import { ArrowLeft } from 'lucide-react'

interface ProposalPageProps {
  params: Promise<{ id: string }>
}

export default async function ProposalPage({ params }: ProposalPageProps) {
  const { id } = await params

  return (
    <main>
      <Navbar />

      <section className="section" style={{ paddingTop: '8rem' }}>
        <div className="container" style={{ maxWidth: '900px' }}>
          <Link
            href="/#showcase"
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
            Back to Showcase
          </Link>

          <ProposalView proposalId={id} />
        </div>
      </section>
    </main>
  )
}
