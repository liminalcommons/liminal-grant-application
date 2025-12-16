'use client'

import { useState } from 'react'
import { TreePine, Sparkles, FileText, Rocket, ChevronLeft, ChevronRight } from 'lucide-react'

const steps = [
  {
    step: 1,
    title: 'Bring Your Idea',
    icon: <TreePine size={48} />,
    description: 'It can be anything related to AI. A tool for farmers? A drone that plants trees? A new way to organize communities?',
    detail: 'Your idea does not need to be technical. We help translate vision into implementation.',
  },
  {
    step: 2,
    title: 'No Idea? Use Our Architect.',
    icon: <Sparkles size={48} />,
    description: 'Copy our System Prompt below and chat with any AI. It will interview you to find a problem you care about.',
    detail: 'The AI will guide you through strategic questions to uncover your unique contribution.',
  },
  {
    step: 3,
    title: 'Generate & Refine',
    icon: <FileText size={48} />,
    description: 'Our AI prompt will convert your thoughts into a professional Deep Funding Whitepaper that hits all technical requirements.',
    detail: 'The output follows the exact structure that has won $50k+ grants before.',
  },
  {
    step: 4,
    title: 'Submit to the Swarm',
    icon: <Rocket size={48} />,
    description: 'Your idea is stored in our database, displayed in the Swarm Showcase, and ready for the $50k+ Deep Funding grant.',
    detail: 'Join a community of builders working towards Beneficial AGI together.',
  },
]

export default function HowItWorks() {
  const [currentStep, setCurrentStep] = useState(0)

  const goNext = () => {
    setCurrentStep((prev) => (prev + 1) % steps.length)
  }

  const goPrev = () => {
    setCurrentStep((prev) => (prev - 1 + steps.length) % steps.length)
  }

  const current = steps[currentStep]

  return (
    <div style={{ maxWidth: '700px', margin: '0 auto' }}>
      {/* Step Indicators */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '1rem',
        marginBottom: '2rem',
      }}>
        {steps.map((s, idx) => (
          <button
            key={s.step}
            onClick={() => setCurrentStep(idx)}
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              border: idx === currentStep
                ? '2px solid var(--color-gold)'
                : '2px solid var(--glass-border)',
              background: idx === currentStep
                ? 'linear-gradient(135deg, var(--color-gold) 0%, var(--color-amber) 100%)'
                : 'transparent',
              color: idx === currentStep
                ? 'var(--color-stone-dark)'
                : 'var(--color-text-muted)',
              fontFamily: 'var(--font-heading)',
              fontSize: '1.1rem',
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: idx === currentStep
                ? '0 0 20px rgba(201, 162, 39, 0.4)'
                : 'none',
            }}
          >
            {s.step}
          </button>
        ))}
      </div>

      {/* Card */}
      <div
        className="glass-card"
        style={{
          textAlign: 'center',
          padding: '3rem 2rem',
          minHeight: '350px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        {/* Icon */}
        <div style={{
          color: 'var(--color-gold)',
          marginBottom: '1.5rem',
        }}>
          {current.icon}
        </div>

        {/* Title */}
        <h3 style={{
          fontSize: '1.6rem',
          marginBottom: '1rem',
          color: 'var(--color-text-primary)',
        }}>
          {current.title}
        </h3>

        {/* Description */}
        <p style={{
          fontSize: '1.15rem',
          color: 'var(--color-text-secondary)',
          marginBottom: '1rem',
          lineHeight: 1.7,
        }}>
          {current.description}
        </p>

        {/* Detail */}
        <p style={{
          fontSize: '0.95rem',
          color: 'var(--color-text-muted)',
          fontStyle: 'italic',
        }}>
          {current.detail}
        </p>
      </div>

      {/* Navigation */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: '1.5rem',
      }}>
        <button
          onClick={goPrev}
          className="btn btn-secondary"
          style={{
            padding: '0.75rem 1.25rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}
        >
          <ChevronLeft size={20} />
          Previous
        </button>

        <span style={{
          color: 'var(--color-text-muted)',
          fontSize: '0.9rem',
        }}>
          Step {current.step} of {steps.length}
        </span>

        <button
          onClick={goNext}
          className="btn btn-primary"
          style={{
            padding: '0.75rem 1.25rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}
        >
          Next
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  )
}
