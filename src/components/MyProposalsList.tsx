'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { supabase, WhitepaperSubmission } from '@/lib/supabase'
import { FileText, Clock, Edit, Trash2, RefreshCw, AlertCircle } from 'lucide-react'

interface MyProposalsListProps {
  userId: string
}

export default function MyProposalsList({ userId }: MyProposalsListProps) {
  const [submissions, setSubmissions] = useState<WhitepaperSubmission[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const fetchSubmissions = async () => {
    setIsLoading(true)
    setError(null)

    try {
      // Show all proposals (admin view) - no user_id filter
      const { data, error } = await supabase
        .from('whitepaper_submissions')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setSubmissions(data || [])
    } catch (err) {
      console.error('Failed to fetch submissions:', err)
      setError('Failed to load your proposals. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this proposal? This cannot be undone.')) {
      return
    }

    setDeletingId(id)
    try {
      // Admin mode - delete by id only
      const { error } = await supabase
        .from('whitepaper_submissions')
        .delete()
        .eq('id', id)

      if (error) throw error
      setSubmissions(submissions.filter(s => s.id !== id))
    } catch (err) {
      console.error('Failed to delete:', err)
      alert('Failed to delete proposal. Please try again.')
    } finally {
      setDeletingId(null)
    }
  }

  useEffect(() => {
    fetchSubmissions()
  }, [userId])

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
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const canEdit = (status: string) => status === 'submitted'

  if (isLoading) {
    return (
      <div style={{
        textAlign: 'center',
        padding: '3rem',
        color: 'var(--color-text-muted)',
      }}>
        <RefreshCw size={32} style={{ animation: 'spin 1s linear infinite', marginBottom: '1rem' }} />
        <p>Loading your proposals...</p>
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
        <AlertCircle size={32} color="#ff6b6b" style={{ marginBottom: '1rem' }} />
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
          No Proposals Yet
        </h3>
        <p style={{ color: 'var(--color-text-muted)', marginBottom: '1.5rem' }}>
          You haven&apos;t submitted any whitepapers yet.
        </p>
        <Link href="/submit" className="btn btn-primary">
          Submit Your First Proposal
        </Link>
      </div>
    )
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {submissions.map((submission) => (
        <div key={submission.id} className="glass-card" style={{ padding: '1.5rem' }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            gap: '1rem',
            marginBottom: '1rem',
          }}>
            <div style={{ flex: 1 }}>
              <span className={`showcase-card-status ${getStatusClass(submission.status)}`}>
                {formatStatus(submission.status)}
              </span>
              <h3 style={{
                color: 'var(--color-text-primary)',
                fontSize: '1.2rem',
                marginTop: '0.75rem',
                marginBottom: '0.5rem',
              }}>
                {submission.title}
              </h3>
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

            <div style={{ display: 'flex', gap: '0.5rem' }}>
              {canEdit(submission.status) && (
                <Link
                  href={`/edit/${submission.id}`}
                  className="btn btn-secondary"
                  style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}
                >
                  <Edit size={16} />
                  Edit
                </Link>
              )}
              {canEdit(submission.status) && (
                <button
                  onClick={() => submission.id && handleDelete(submission.id)}
                  disabled={deletingId === submission.id}
                  className="btn btn-secondary"
                  style={{
                    padding: '0.5rem 1rem',
                    fontSize: '0.85rem',
                    borderColor: 'rgba(220, 53, 69, 0.5)',
                    color: '#ff6b6b',
                    opacity: deletingId === submission.id ? 0.5 : 1,
                  }}
                >
                  <Trash2 size={16} />
                  {deletingId === submission.id ? 'Deleting...' : 'Delete'}
                </button>
              )}
            </div>
          </div>

          <p style={{
            color: 'var(--color-text-muted)',
            fontSize: '0.9rem',
            lineHeight: 1.6,
            margin: 0,
            maxHeight: '4.8em',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}>
            {submission.whitepaper_content.substring(0, 300)}...
          </p>

          {!canEdit(submission.status) && (
            <p style={{
              marginTop: '1rem',
              padding: '0.5rem 0.75rem',
              background: 'rgba(201, 162, 39, 0.1)',
              borderRadius: '4px',
              fontSize: '0.85rem',
              color: 'var(--color-text-muted)',
            }}>
              This proposal is {submission.status.replace('_', ' ')} and cannot be edited.
            </p>
          )}
        </div>
      ))}
    </div>
  )
}
