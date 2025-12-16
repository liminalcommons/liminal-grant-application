'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { supabase, WhitepaperSubmission } from '@/lib/supabase'
import { FileText, User, Clock, RefreshCw, ArrowRight } from 'lucide-react'

export default function ShowcaseGallery() {
  const [submissions, setSubmissions] = useState<WhitepaperSubmission[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchSubmissions = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const { data, error } = await supabase
        .from('whitepaper_submissions')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(20)

      if (error) throw error
      setSubmissions(data || [])
    } catch (err) {
      console.error('Failed to fetch submissions:', err)
      setError('Failed to load showcase. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchSubmissions()
  }, [])

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'submitted': return 'status-submitted'
      case 'under_review': return 'status-under-review'
      case 'approved': return 'status-approved'
      case 'funded': return 'status-funded'
      default: return 'status-submitted'
    }
  }

  const formatStatus = (status: string) => {
    return status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
  }

  const truncateContent = (content: string, maxLength = 200) => {
    if (content.length <= maxLength) return content
    return content.substring(0, maxLength).trim() + '...'
  }

  if (isLoading) {
    return (
      <div style={{
        textAlign: 'center',
        padding: '3rem',
        color: 'var(--color-text-muted)',
      }}>
        <RefreshCw size={32} style={{ animation: 'spin 1s linear infinite', marginBottom: '1rem' }} />
        <p>Loading showcase...</p>
        <style jsx>{`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    )
  }

  if (error) {
    return (
      <div className="glass-card" style={{ textAlign: 'center', padding: '2rem' }}>
        <p style={{ color: '#ff6b6b', marginBottom: '1rem' }}>{error}</p>
        <button onClick={fetchSubmissions} className="btn btn-secondary">
          <RefreshCw size={18} />
          Try Again
        </button>
      </div>
    )
  }

  if (submissions.length === 0) {
    return (
      <div className="glass-card" style={{ textAlign: 'center', padding: '3rem' }}>
        <FileText size={48} color="var(--color-text-muted)" style={{ marginBottom: '1rem' }} />
        <h3 style={{ marginBottom: '0.5rem', color: 'var(--color-text-secondary)' }}>
          No Submissions Yet
        </h3>
        <p style={{ color: 'var(--color-text-muted)' }}>
          Be the first to submit your whitepaper and join the Swarm!
        </p>
      </div>
    )
  }

  return (
    <div>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '1.5rem',
      }}>
        <p style={{
          color: 'var(--color-text-muted)',
          fontSize: '0.9rem',
        }}>
          {submissions.length} proposal{submissions.length !== 1 ? 's' : ''} in the Swarm
        </p>
        <button
          onClick={fetchSubmissions}
          className="btn btn-secondary"
          style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}
        >
          <RefreshCw size={16} />
          Refresh
        </button>
      </div>

      <div className="grid-3">
        {submissions.map((submission) => (
          <article key={submission.id} className="showcase-card" style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              marginBottom: '1rem',
            }}>
              <span className={`showcase-card-status ${getStatusClass(submission.status)}`}>
                {formatStatus(submission.status)}
              </span>
            </div>

            <h4 style={{
              color: 'var(--color-text-primary)',
              fontSize: '1.1rem',
              marginBottom: '0.75rem',
              lineHeight: 1.4,
            }}>
              {submission.title}
            </h4>

            <p style={{
              color: 'var(--color-text-muted)',
              fontSize: '0.9rem',
              lineHeight: 1.6,
              marginBottom: '1rem',
              flex: 1,
            }}>
              {truncateContent(submission.whitepaper_content)}
            </p>

            <Link
              href={`/proposal/${submission.id}`}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                color: 'var(--color-gold)',
                fontSize: '0.9rem',
                marginBottom: '1rem',
                transition: 'gap 0.2s ease',
              }}
            >
              Read Full Proposal
              <ArrowRight size={16} />
            </Link>

            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingTop: '1rem',
              borderTop: '1px solid var(--glass-border)',
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                color: 'var(--color-text-muted)',
                fontSize: '0.85rem',
              }}>
                <User size={14} />
                {submission.user_name}
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                color: 'var(--color-text-muted)',
                fontSize: '0.85rem',
              }}>
                <Clock size={14} />
                {submission.created_at && formatDate(submission.created_at)}
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
