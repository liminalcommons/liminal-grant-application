'use client'

import { useEffect, useState } from 'react'
import { supabase, WhitepaperSubmission } from '@/lib/supabase'
import { User, Clock, FileText, RefreshCw, AlertCircle } from 'lucide-react'

interface ProposalViewProps {
  proposalId: string
}

export default function ProposalView({ proposalId }: ProposalViewProps) {
  const [proposal, setProposal] = useState<WhitepaperSubmission | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProposal = async () => {
      try {
        const { data, error } = await supabase
          .from('whitepaper_submissions')
          .select('*')
          .eq('id', proposalId)
          .single()

        if (error) throw error
        setProposal(data)
      } catch (err) {
        console.error('Failed to fetch proposal:', err)
        setError('Proposal not found or failed to load.')
      } finally {
        setIsLoading(false)
      }
    }

    fetchProposal()
  }, [proposalId])

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
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  // Simple markdown-like formatting for the whitepaper content
  const formatContent = (content: string) => {
    return content
      .split('\n')
      .map((line, i) => {
        // Headers
        if (line.startsWith('#### ')) {
          return <h4 key={i} style={{ color: 'var(--color-text-gold)', marginTop: '1.5rem', marginBottom: '0.5rem', fontSize: '1.1rem' }}>{line.replace('#### ', '')}</h4>
        }
        if (line.startsWith('### ')) {
          return <h3 key={i} style={{ color: 'var(--color-gold)', marginTop: '2rem', marginBottom: '0.75rem', fontSize: '1.3rem' }}>{line.replace('### ', '')}</h3>
        }
        if (line.startsWith('## ')) {
          return <h2 key={i} style={{ color: 'var(--color-gold)', marginTop: '2rem', marginBottom: '0.75rem', fontSize: '1.5rem' }}>{line.replace('## ', '')}</h2>
        }
        if (line.startsWith('# ')) {
          return <h1 key={i} style={{ color: 'var(--color-gold)', marginTop: '2rem', marginBottom: '1rem', fontSize: '1.8rem' }}>{line.replace('# ', '')}</h1>
        }
        // Bullet points
        if (line.startsWith('- ') || line.startsWith('* ')) {
          return <li key={i} style={{ marginLeft: '1.5rem', marginBottom: '0.25rem', color: 'var(--color-text-secondary)' }}>{line.substring(2)}</li>
        }
        // Bold text (simple version)
        if (line.includes('**')) {
          const parts = line.split(/\*\*(.*?)\*\*/g)
          return (
            <p key={i} style={{ marginBottom: '0.75rem', color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
              {parts.map((part, j) =>
                j % 2 === 1 ? <strong key={j} style={{ color: 'var(--color-text-primary)' }}>{part}</strong> : part
              )}
            </p>
          )
        }
        // Empty lines
        if (line.trim() === '') {
          return <br key={i} />
        }
        // Regular paragraphs
        return <p key={i} style={{ marginBottom: '0.75rem', color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>{line}</p>
      })
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

  if (error || !proposal) {
    return (
      <div className="glass-card" style={{ textAlign: 'center', padding: '3rem' }}>
        <AlertCircle size={48} color="#ff6b6b" style={{ marginBottom: '1rem' }} />
        <h3 style={{ marginBottom: '0.5rem', color: '#ff6b6b' }}>Not Found</h3>
        <p style={{ color: 'var(--color-text-muted)' }}>{error}</p>
      </div>
    )
  }

  return (
    <div>
      {/* Header */}
      <div className="glass-card" style={{ marginBottom: '2rem' }}>
        <div style={{ marginBottom: '1rem' }}>
          <span className={`showcase-card-status ${getStatusClass(proposal.status)}`}>
            {formatStatus(proposal.status)}
          </span>
        </div>

        <h1 style={{
          fontSize: 'clamp(1.5rem, 4vw, 2.2rem)',
          marginBottom: '1rem',
          color: 'var(--color-text-primary)',
          lineHeight: 1.3,
        }}>
          <FileText size={28} style={{ verticalAlign: 'middle', marginRight: '0.5rem', color: 'var(--color-gold)' }} />
          {proposal.title}
        </h1>

        <div style={{
          display: 'flex',
          gap: '2rem',
          flexWrap: 'wrap',
          color: 'var(--color-text-muted)',
          fontSize: '0.9rem',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <User size={16} />
            <span>{proposal.user_name}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Clock size={16} />
            <span>{proposal.created_at && formatDate(proposal.created_at)}</span>
          </div>
        </div>
      </div>

      {/* Full Whitepaper Content */}
      <div className="glass-card">
        <h2 style={{
          fontSize: '1.3rem',
          marginBottom: '1rem',
          color: 'var(--color-gold)',
          fontFamily: 'var(--font-heading)',
        }}>
          Whitepaper
        </h2>
        <div style={{
          maxWidth: '100%',
          overflowWrap: 'break-word',
          wordWrap: 'break-word',
        }}>
          {formatContent(proposal.whitepaper_content)}
        </div>
      </div>
    </div>
  )
}
