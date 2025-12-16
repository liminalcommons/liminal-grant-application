import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import EditForm from '@/components/EditForm'
import { ArrowLeft } from 'lucide-react'

interface EditPageProps {
  params: Promise<{ id: string }>
}

export default async function EditPage({ params }: EditPageProps) {
  const { userId } = await auth()
  const { id } = await params

  if (!userId) {
    redirect(`/sign-in?redirect_url=/edit/${id}`)
  }

  return (
    <main>
      <Navbar />

      <section className="section" style={{ paddingTop: '8rem' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <Link
            href="/my-proposals"
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
            Back to My Proposals
          </Link>

          <h1 style={{ marginBottom: '0.5rem', fontSize: 'clamp(2rem, 5vw, 3rem)' }}>
            <span className="rune-accent" style={{ marginRight: '0.5rem' }}>ᛖ</span>
            Edit Proposal
          </h1>
          <p style={{
            color: 'var(--color-text-secondary)',
            marginBottom: '2rem',
            fontSize: '1.1rem',
          }}>
            Update your whitepaper below. You can only edit proposals that are still in &quot;submitted&quot; status.
          </p>

          <EditForm proposalId={id} userId={userId} />
        </div>
      </section>
    </main>
  )
}
