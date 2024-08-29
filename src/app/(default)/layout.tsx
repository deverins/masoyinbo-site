// src/app/(default)/layout.tsx
import React from 'react'
import { Instrument_Sans } from 'next/font/google'
import '../globals.css'
import { Toaster } from 'react-hot-toast'
import Navbar from '@/components/Navbar'
import { ThemeProvider } from '@/hooks/themeContext'
import Main from '@/components/layouts/Main'

const instrumentSans = Instrument_Sans({
  subsets: ['latin'],
})

export const metadata = {
  title: 'Másòyìnbó',
  description: '',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        className={`${instrumentSans.className}`}
      >
        <ThemeProvider>
          <Main>
            <Navbar />
            {children}
            <Toaster
              position="bottom-center"
              toastOptions={{
                duration: 5000,
                style: { background: '#333333', color: '#FAFAFA' },
              }}
            />
          </Main>
        </ThemeProvider>
      </body>
    </html>
  )
}