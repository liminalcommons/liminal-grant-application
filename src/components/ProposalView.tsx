'use client'

import { useEffect, useState } from 'react'
import { supabase, WhitepaperSubmission } from '@/lib/supabase'
import { User, Clock, FileText, RefreshCw, AlertCircle, ChevronDown, ChevronUp } from 'lucide-react'

interface ProposalViewProps {
  proposalId: string
}

export default function ProposalView({ proposalId }: ProposalViewProps) {
  const [proposal, setProposal] = useState<WhitepaperSubmission | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isExpanded, setIsExpanded] = useState(false)

  // Extract abstract/summary from content
  const extractAbstract = (content: string): { abstract: string; rest: string } => {
    const lines = content.split('\n')
    let abstractLines: string[] = []
    let restLines: string[] = []
    let foundAbstract = false
    let inAbstract = false
    let abstractEndIndex = 0

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].toLowerCase()

      // Check if this line starts an abstract section
      if (line.includes('abstract') || line.includes('summary') || line.includes('vision')) {
        foundAbstract = true
        inAbstract = true
        abstractLines.push(lines[i])
        continue
      }

      // If we're in the abstract, keep adding until we hit another section header
      if (inAbstract) {
        if (line.startsWith('#') || line.startsWith('## ') || line.startsWith('### ')) {
          // New section - end of abstract
          inAbstract = false
          abstractEndIndex = i
          break
        }
        abstractLines.push(lines[i])
      }
    }

    // If no explicit abstract found, take first 500 chars as summary
    if (!foundAbstract || abstractLines.length === 0) {
      const firstChunk = content.substring(0, 800)
      const lastPeriod = firstChunk.lastIndexOf('.')
      return {
        abstract: lastPeriod > 200 ? content.substring(0, lastPeriod + 1) : firstChunk,
        rest: lastPeriod > 200 ? content.substring(lastPeriod + 1) : content.substring(800)
      }
    }

    return {
      abstract: abstractLines.join('\n'),
      rest: lines.slice(abstractEndIndex).join('\n')
    }
  }

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

      {/* Abstract/Summary */}
      <div className="glass-card" style={{ marginBottom: isExpanded ? '1rem' : '0' }}>
        <h2 style={{
          fontSize: '1.3rem',
          marginBottom: '1rem',
          color: 'var(--color-gold)',
          fontFamily: 'var(--font-heading)',
        }}>
          Abstract / Summary
        </h2>
        <div style={{
          maxWidth: '100%',
          overflowWrap: 'break-word',
          wordWrap: 'break-word',
        }}>
          {formatContent(extractAbstract(proposal.whitepaper_content).abstract)}
        </div>

        {/* Expand/Collapse Button */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          style={{
            marginTop: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.75rem 1.5rem',
            background: 'rgba(201, 162, 39, 0.15)',
            border: '1px solid var(--color-gold)',
            borderRadius: '8px',
            color: 'var(--color-gold)',
            cursor: 'pointer',
            fontSize: '0.95rem',
            fontFamily: 'var(--font-heading)',
            transition: 'all 0.3s ease',
            width: '100%',
            justifyContent: 'center',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(201, 162, 39, 0.25)'
            e.currentTarget.style.transform = 'translateY(-2px)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(201, 162, 39, 0.15)'
            e.currentTarget.style.transform = 'translateY(0)'
          }}
        >
          {isExpanded ? (
            <>
              <ChevronUp size={20} />
              Hide Full Proposal
            </>
          ) : (
            <>
              <ChevronDown size={20} />
              Read Full Proposal
            </>
          )}
        </button>
      </div>

      {/* Full Content (Collapsible) */}
      {isExpanded && (
        <div className="glass-card" style={{
          animation: 'fadeIn 0.3s ease',
        }}>
          <h2 style={{
            fontSize: '1.3rem',
            marginBottom: '1rem',
            color: 'var(--color-gold)',
            fontFamily: 'var(--font-heading)',
          }}>
            Full Proposal
          </h2>
          <div style={{
            maxWidth: '100%',
            overflowWrap: 'break-word',
            wordWrap: 'break-word',
          }}>
            {formatContent(extractAbstract(proposal.whitepaper_content).rest)}
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}
