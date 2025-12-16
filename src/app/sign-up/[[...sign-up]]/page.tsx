import { SignUp } from '@clerk/nextjs'

export default function SignUpPage() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
    }}>
      <SignUp
        appearance={{
          elements: {
            rootBox: {
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
            },
            card: {
              backgroundColor: 'rgba(42, 42, 40, 0.9)',
              backdropFilter: 'blur(16px)',
              border: '1px solid rgba(201, 162, 39, 0.2)',
            },
            headerTitle: {
              color: '#f5f0e8',
            },
            headerSubtitle: {
              color: '#c9c2b5',
            },
            formFieldLabel: {
              color: '#e8c547',
            },
            formFieldInput: {
              backgroundColor: 'rgba(26, 47, 26, 0.5)',
              borderColor: 'rgba(201, 162, 39, 0.2)',
              color: '#f5f0e8',
            },
            formButtonPrimary: {
              backgroundColor: '#c9a227',
              color: '#2a2a28',
            },
            footerActionLink: {
              color: '#c9a227',
            },
          },
        }}
      />
    </div>
  )
}
