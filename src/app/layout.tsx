import type { Metadata } from 'next'
import { ClerkProvider } from '@clerk/nextjs'
import './globals.css'

export const metadata: Metadata = {
  title: 'Liminal Grant Application | Get Funded for Your AI Project',
  description: 'We secured $50k for Acropolis OS. Now, we are doing the same for you—at scale. Join the Liminal Commonwealth Protocol and turn your AI ideas into funded projects.',
  keywords: ['AI grants', 'Deep Funding', 'SingularityNET', 'Liminal Commons', 'AGI', 'decentralized AI'],
  authors: [{ name: 'Liminal Commons' }],
  openGraph: {
    title: 'Liminal Grant Application | Let Us Help You Get Funded',
    description: 'Turn your AI ideas into funded Deep Funding proposals with our Grant Factory.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link
            href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700&family=Raleway:wght@300;400;500;600;700&family=Fira+Code:wght@400;500&display=swap"
            rel="stylesheet"
          />
        </head>
        <body>
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}
