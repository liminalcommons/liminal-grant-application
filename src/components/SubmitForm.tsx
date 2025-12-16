'use client'

import { useState } from 'react'
import { useUser } from '@clerk/nextjs'
import { supabase } from '@/lib/supabase'
import { Send, AlertCircle, CheckCircle, Loader2 } from 'lucide-react'

interface FormState {
  title: string
  whitepaper: string
}

const REQUIRED_SECTIONS = [
  { keyword: 'abstract', label: 'Abstract' },
  { keyword: 'problem', label: 'Problem Statement' },
  { keyword: 'solution', label: 'Solution / BGI Solution' },
  { keyword: 'budget', label: 'Budget' },
  { keyword: 'milestone', label: 'Milestones' },
]

export default function SubmitForm() {
  const { user } = useUser()
  const [form, setForm] = useState<FormState>({ title: '', whitepaper: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const checkSections = () => {
    const content = form.whitepaper.toLowerCase()
    return REQUIRED_SECTIONS.map(section => ({
      ...section,
      found: content.includes(section.keyword),
    }))
  }

  const sectionCheck = checkSections()
  const allSectionsPresent = sectionCheck.every(s => s.found)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!user) {
      setErrorMessage('You must be signed in to submit')
      setSubmitStatus('error')
      return
    }

    if (!form.title.trim() || !form.whitepaper.trim()) {
      setErrorMessage('Please fill in all fields')
      setSubmitStatus('error')
      return
    }

    if (!allSectionsPresent) {
      setErrorMessage('Your whitepaper is missing some required sections. Please review the checklist below.')
      setSubmitStatus('error')
      return
    }

    setIsSubmitting(true)
    setSubmitStatus('idle')
    setErrorMessage('')

    try {
      const { error } = await supabase.from('whitepaper_submissions').insert({
        user_id: user.id,
        user_email: user.primaryEmailAddress?.emailAddress || '',
        user_name: user.fullName || user.firstName || 'Anonymous',
        title: form.title.trim(),
        whitepaper_content: form.whitepaper.trim(),
        status: 'submitted',
      })

      if (error) throw error

      setSubmitStatus('success')
      setForm({ title: '', whitepaper: '' })
    } catch (err) {
      console.error('Submission error:', err)
      setErrorMessage('Failed to submit. Please try again.')
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitStatus === 'success') {
    return (
      <div className="glass-card" style={{
        textAlign: 'center',
        padding: '3rem',
      }}>
        <CheckCircle size={64} color="var(--color-gold)" style={{ marginBottom: '1.5rem' }} />
        <h3 style={{ marginBottom: '1rem' }}>Submission Received!</h3>
        <p style={{ marginBottom: '2rem' }}>
          Your whitepaper has been added to the Swarm Showcase. Our team will review it and reach out soon.
        </p>
        <button
          onClick={() => setSubmitStatus('idle')}
          className="btn btn-primary"
        >
          Submit Another Proposal
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="glass-card">
      <h3 style={{ marginBottom: '1.5rem', color: 'var(--color-gold)' }}>
        Submit Your Whitepaper
      </h3>

      {submitStatus === 'error' && (
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
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
        />
      </div>

      <div style={{ marginBottom: '1.5rem' }}>
        <label htmlFor="whitepaper">Full Whitepaper</label>
        <p style={{
          fontSize: '0.9rem',
          color: 'var(--color-text-muted)',
          marginBottom: '0.75rem',
        }}>
          Paste your complete whitepaper below. Include all sections from the system prompt.
        </p>
        <textarea
          id="whitepaper"
          placeholder="Paste your full whitepaper here..."
          value={form.whitepaper}
          onChange={(e) => setForm({ ...form, whitepaper: e.target.value })}
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
          Section Checklist:
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
        disabled={isSubmitting}
        style={{
          width: '100%',
          opacity: isSubmitting ? 0.7 : 1,
        }}
      >
        {isSubmitting ? (
          <>
            <Loader2 size={20} className="animate-spin" style={{ animation: 'spin 1s linear infinite' }} />
            Submitting...
          </>
        ) : (
          <>
            <Send size={20} />
            Submit to Swarm
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
