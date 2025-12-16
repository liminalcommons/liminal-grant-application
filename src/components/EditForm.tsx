'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase, WhitepaperSubmission } from '@/lib/supabase'
import { Save, AlertCircle, CheckCircle, Loader2, RefreshCw } from 'lucide-react'

interface EditFormProps {
  proposalId: string
  userId: string
}

const REQUIRED_SECTIONS = [
  { keyword: 'abstract', label: 'Abstract' },
  { keyword: 'problem', label: 'Problem Statement' },
  { keyword: 'solution', label: 'Solution / BGI Solution' },
  { keyword: 'budget', label: 'Budget' },
  { keyword: 'milestone', label: 'Milestones' },
]

export default function EditForm({ proposalId, userId }: EditFormProps) {
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [whitepaper, setWhitepaper] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [status, setStatus] = useState<'idle' | 'success' | 'error' | 'not_found' | 'not_editable'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const checkSections = () => {
    const content = whitepaper.toLowerCase()
    return REQUIRED_SECTIONS.map(section => ({
      ...section,
      found: content.includes(section.keyword),
    }))
  }

  const sectionCheck = checkSections()

  useEffect(() => {
    const fetchProposal = async () => {
      try {
        // Admin mode - fetch by id only
        const { data, error } = await supabase
          .from('whitepaper_submissions')
          .select('*')
          .eq('id', proposalId)
          .single()

        if (error || !data) {
          setStatus('not_found')
          return
        }

        if (data.status !== 'submitted') {
          setStatus('not_editable')
          return
        }

        setTitle(data.title)
        setWhitepaper(data.whitepaper_content)
      } catch (err) {
        console.error('Error fetching proposal:', err)
        setStatus('not_found')
      } finally {
        setIsLoading(false)
      }
    }

    fetchProposal()
  }, [proposalId, userId])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!title.trim() || !whitepaper.trim()) {
      setErrorMessage('Please fill in all fields')
      setStatus('error')
      return
    }

    setIsSaving(true)
    setStatus('idle')
    setErrorMessage('')

    try {
      // Admin mode - update by id only
      const { error } = await supabase
        .from('whitepaper_submissions')
        .update({
          title: title.trim(),
          whitepaper_content: whitepaper.trim(),
        })
        .eq('id', proposalId)
        .eq('status', 'submitted')

      if (error) throw error

      setStatus('success')
      setTimeout(() => {
        router.push('/my-proposals')
      }, 1500)
    } catch (err) {
      console.error('Update error:', err)
      setErrorMessage('Failed to update. Please try again.')
      setStatus('error')
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return (
      <div className="glass-card" style={{ textAlign: 'center', padding: '3rem' }}>
        <RefreshCw size={32} style={{ animation: 'spin 1s linear infinite', marginBottom: '1rem' }} />
        <p>Loading proposal...</p>
        <style jsx>{`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    )
  }

  if (status === 'not_found') {
    return (
      <div className="glass-card" style={{ textAlign: 'center', padding: '3rem' }}>
        <AlertCircle size={48} color="#ff6b6b" style={{ marginBottom: '1rem' }} />
        <h3 style={{ marginBottom: '0.5rem', color: '#ff6b6b' }}>Proposal Not Found</h3>
        <p style={{ color: 'var(--color-text-muted)' }}>
          This proposal doesn&apos;t exist or you don&apos;t have permission to edit it.
        </p>
      </div>
    )
  }

  if (status === 'not_editable') {
    return (
      <div className="glass-card" style={{ textAlign: 'center', padding: '3rem' }}>
        <AlertCircle size={48} color="var(--color-gold)" style={{ marginBottom: '1rem' }} />
        <h3 style={{ marginBottom: '0.5rem' }}>Cannot Edit</h3>
        <p style={{ color: 'var(--color-text-muted)' }}>
          This proposal is no longer in &quot;submitted&quot; status and cannot be edited.
        </p>
      </div>
    )
  }

  if (status === 'success') {
    return (
      <div className="glass-card" style={{ textAlign: 'center', padding: '3rem' }}>
        <CheckCircle size={64} color="var(--color-gold)" style={{ marginBottom: '1.5rem' }} />
        <h3 style={{ marginBottom: '1rem' }}>Changes Saved!</h3>
        <p style={{ color: 'var(--color-text-muted)' }}>
          Redirecting to your proposals...
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="glass-card">
      <h3 style={{ marginBottom: '1.5rem', color: 'var(--color-gold)' }}>
        Edit Your Whitepaper
      </h3>

      {status === 'error' && (
        <div style={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: '0.75rem',
          padding: '1rem',
          background: 'rgba(220, 53, 69, 0.2)',
          borderRadius: '8px',
          marginBottom: '1.5rem',
          border: '1px solid rgba(220, 53, 69, 0.3)',
        }}>
          <AlertCircle size={20} color="#dc3545" style={{ flexShrink: 0, marginTop: '2px' }} />
          <p style={{ margin: 0, color: '#ff6b6b', fontSize: '0.95rem' }}>{errorMessage}</p>
        </div>
      )}

      <div style={{ marginBottom: '1.5rem' }}>
        <label htmlFor="title">Project Title</label>
        <input
          id="title"
          type="text"
          placeholder="e.g., AquaGuard: Decentralized AI Water Quality Monitoring"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div style={{ marginBottom: '1.5rem' }}>
        <label htmlFor="whitepaper">Full Whitepaper</label>
        <textarea
          id="whitepaper"
          placeholder="Paste your full whitepaper here..."
          value={whitepaper}
          onChange={(e) => setWhitepaper(e.target.value)}
          required
          rows={15}
          style={{ resize: 'vertical', minHeight: '300px' }}
        />
      </div>

      {/* Section Checklist */}
      <div style={{
        padding: '1rem',
        background: 'rgba(0, 0, 0, 0.2)',
        borderRadius: '8px',
        marginBottom: '1.5rem',
      }}>
        <p style={{
          fontWeight: 600,
          color: 'var(--color-text-gold)',
          marginBottom: '0.75rem',
          fontSize: '0.9rem',
        }}>
          Section Checklist <span style={{ fontWeight: 400, color: 'var(--color-text-muted)' }}>(recommended)</span>:
        </p>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
          gap: '0.5rem',
        }}>
          {sectionCheck.map((section) => (
            <div
              key={section.keyword}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '0.85rem',
                color: section.found ? 'var(--color-gold)' : 'var(--color-text-muted)',
              }}
            >
              {section.found ? (
                <CheckCircle size={16} color="var(--color-gold)" />
              ) : (
                <AlertCircle size={16} color="var(--color-text-muted)" />
              )}
              {section.label}
            </div>
          ))}
        </div>
      </div>

      <button
        type="submit"
        className="btn btn-primary"
        disabled={isSaving}
        style={{
          width: '100%',
          opacity: isSaving ? 0.7 : 1,
        }}
      >
        {isSaving ? (
          <>
            <Loader2 size={20} style={{ animation: 'spin 1s linear infinite' }} />
            Saving...
          </>
        ) : (
          <>
            <Save size={20} />
            Save Changes
          </>
        )}
      </button>

      <style jsx>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </form>
  )
}
