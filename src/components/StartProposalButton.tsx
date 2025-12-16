'use client'

import { SignUpButton, useUser } from '@clerk/nextjs'
import Link from 'next/link'
import { Sparkles } from 'lucide-react'

interface StartProposalButtonProps {
  large?: boolean
}

export default function StartProposalButton({ large = false }: StartProposalButtonProps) {
  const { isSignedIn, isLoaded } = useUser()

  const buttonStyle = large
    ? { fontSize: '1.2rem', padding: '1.25rem 2.5rem' }
    : {}

  if (!isLoaded) {
    return (
      <button className="btn btn-primary" style={{ ...buttonStyle, opacity: 0.7 }} disabled>
        <Sparkles size={large ? 24 : 20} />
        Loading...
      </button>
    )
  }

  // If signed in, go directly to submit page
  if (isSignedIn) {
    return (
      <Link href="/submit" className="btn btn-primary animate-glow" style={buttonStyle}>
        <Sparkles size={large ? 24 : 20} />
        Start Your Proposal
      </Link>
    )
  }

  // If not signed in, show sign-up modal
  return (
    <SignUpButton mode="modal" forceRedirectUrl="/submit">
      <button className="btn btn-primary animate-glow" style={buttonStyle}>
        <Sparkles size={large ? 24 : 20} />
        Start Your Proposal
      </button>
    </SignUpButton>
  )
}
