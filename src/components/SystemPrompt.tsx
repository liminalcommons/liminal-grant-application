'use client'

import { useState } from 'react'
import { Copy, Check, ExternalLink } from 'lucide-react'

const SYSTEM_PROMPT = `SYSTEM PROMPT: THE IMPACT ARCHITECT (CLEAN COPY EDITION)

ROLE
You are the Impact Architect. You exist to win the Agentic AI Ideation Challenge.
Your Goal: Generate a proposal that is Instant Copy-Paste ready.
Your Enemy: Fluff, labels inside text boxes, and character limit overflows.

I. THE INTERACTION FLOW

STEP 1: THE INTERROGATION
Start by asking the user:
"I am the Impact Architect. Let's build your submission.
What is the 'Silent Crisis' (the broken reality) your Agent solves?
What is the Mechanism (the Agent/Tech) you are building?"

STEP 2: THE CLASSIFICATION
Once you have the idea, you must suggest the best fits from these lists (select multiple if applicable):
Industries: (Agriculture, Commerce, Community & Collaboration, DeFi, Media & Entertainment, etc.)
Technologies: (Blockchain, LLMs & NLP, MeTTa, Neuro-symbolic AI, etc.)

STEP 3: THE DRAFTING
Apply the Style Guide:
No Labels: Never put "The Problem:" or "The Hijack:" inside the code blocks. Output ONLY the text to be submitted.
Double Spacing: In the Short Description, use double line breaks between paragraphs.
Character Limits:
Title: < 60 Chars.
Short Description: < 500 Chars.
Other Sections: < 1000 Chars.

II. THE OUTPUT TEMPLATE (STRICT MARKDOWN)
You must output the response in this exact format. Every field must have its own separate code block.

Basic Information

Idea Title (<60 Chars)

[Insert Title Only]


Short Description (<500 Chars)
Constraint: 3 Paragraphs. Double-spaced. NO LABELS.

[Paragraph 1: The Crisis]

[Paragraph 2: The Gap]

[Paragraph 3: The Agent]


Selected Industries

[Insert Industry 1], [Insert Industry 2]


Selected Technologies

[Insert Tech 1], [Insert Tech 2]


Tags

[Insert Tag 1], [Insert Tag 2]


Proposal Overview

Problem Statement (<1000 Chars)
Focus: The "Bleeding Neck" issue and the Cost of Inaction.

[Insert Problem Text Only]


Proposed AI Solution (<1000 Chars)
Focus: The specific "Agent" and the shift from Manual to Autonomous.

[Insert Solution Text Only]


Positive Impact (<1000 Chars)
Focus: Sovereignty, Truth, Connection.

[Insert Impact Text Only]


Key Features / Functionalities (<1000 Chars)
Focus: 3-5 distinct capabilities.

[Feature 1]
[Feature 2]
[Feature 3]


III. FINAL CHECKLIST
Clean Output: Did I remove all prefixes (e.g., "Problem:") from inside the code blocks?
Visual Separation: Are Categorization and Description in separate blocks?
Limits: Is the Title under 60 characters? Is the Description under 500?`

const AI_STUDIO_URL = 'https://aistudio.google.com/prompts/new_chat'

export default function SystemPrompt() {
  const [copied, setCopied] = useState(false)
  const [copiedBottom, setCopiedBottom] = useState(false)

  const handleCopy = async (setStateFn: (value: boolean) => void) => {
    try {
      await navigator.clipboard.writeText(SYSTEM_PROMPT)
      setStateFn(true)
      setTimeout(() => setStateFn(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const handleCopyAndOpen = async () => {
    try {
      await navigator.clipboard.writeText(SYSTEM_PROMPT)
      setCopiedBottom(true)
      setTimeout(() => setCopiedBottom(false), 2000)
      // Open AI Studio in new tab
      window.open(AI_STUDIO_URL, '_blank', 'noopener,noreferrer')
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  return (
    <div className="glass-card" style={{ marginTop: '2rem' }}>
      {/* Recommendation Banner */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(66, 133, 244, 0.15) 0%, rgba(52, 168, 83, 0.15) 100%)',
        border: '1px solid rgba(66, 133, 244, 0.3)',
        borderRadius: '8px',
        padding: '1rem 1.25rem',
        marginBottom: '1.5rem',
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        flexWrap: 'wrap',
      }}>
        <div style={{ flex: 1, minWidth: '200px' }}>
          <p style={{
            margin: 0,
            fontSize: '0.95rem',
            color: 'var(--color-text)',
          }}>
            <strong style={{ color: '#4285F4' }}>Recommended:</strong> Use{' '}
            <strong>Google AI Studio</strong> for best results — it handles long context better than other tools.
          </p>
        </div>
        <a
          href={AI_STUDIO_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary"
          style={{
            background: 'linear-gradient(135deg, #4285F4 0%, #34A853 100%)',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontSize: '0.9rem',
            padding: '0.6rem 1rem',
            whiteSpace: 'nowrap',
          }}
        >
          <ExternalLink size={16} />
          Open AI Studio
        </a>
      </div>

      <div className="code-block" style={{ position: 'relative' }}>
        <div className="code-block-header">
          <span style={{
            fontFamily: 'var(--font-heading)',
            color: 'var(--color-gold)',
            fontSize: '0.9rem',
          }}>
            The Impact Architect — System Prompt
          </span>
          <button
            onClick={() => handleCopy(setCopied)}
            className="btn btn-secondary"
            style={{
              padding: '0.5rem 1rem',
              fontSize: '0.85rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}
          >
            {copied ? (
              <>
                <Check size={16} />
                Copied!
              </>
            ) : (
              <>
                <Copy size={16} />
                Copy Prompt
              </>
            )}
          </button>
        </div>
        <pre style={{
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-word',
          maxHeight: '500px',
          overflowY: 'auto',
          fontSize: '0.85rem',
          lineHeight: '1.6',
        }}>
          {SYSTEM_PROMPT}
        </pre>
      </div>

      {/* Bottom CTA */}
      <div style={{
        marginTop: '1.5rem',
        padding: '1.25rem',
        background: 'rgba(201, 162, 39, 0.1)',
        borderRadius: '8px',
        border: '1px solid var(--glass-border)',
        textAlign: 'center',
      }}>
        <p style={{
          margin: '0 0 1rem 0',
          fontSize: '1rem',
          color: 'var(--color-text-secondary)',
        }}>
          Click below to copy the prompt and open Google AI Studio in a new tab:
        </p>
        <button
          onClick={handleCopyAndOpen}
          className="btn btn-primary"
          style={{
            padding: '0.75rem 1.5rem',
            fontSize: '1rem',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.75rem',
          }}
        >
          {copiedBottom ? (
            <>
              <Check size={20} />
              Copied! Opening AI Studio...
            </>
          ) : (
            <>
              <Copy size={20} />
              Copy & Open AI Studio
              <ExternalLink size={18} />
            </>
          )}
        </button>
        <p style={{
          margin: '1rem 0 0 0',
          fontSize: '0.85rem',
          color: 'var(--color-text-muted)',
        }}>
          Paste the prompt into AI Studio, then describe your idea. The AI will format your submission.
        </p>
      </div>
    </div>
  )
}
