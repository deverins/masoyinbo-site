import React from 'react'
import { Instrument_Sans } from 'next/font/google'
import '../globals.css'
import Main from '@/components/main/main'
import { Toaster } from 'react-hot-toast'
import HeroSection from '@/components/heroSection'
import Navbar from '@/components/navbar'

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
        className={`h-screen bg-lightPink box-border overflow-auto ${instrumentSans.className}`}
      >
        <Navbar />
        <HeroSection />
        <Main>
          <Toaster
            position="bottom-center"
            toastOptions={{
              duration: 5000,
              style: { background: '#333333', color: '#FAFAFA' },
            }}
          />
          {children}
        </Main>
      </body>
    </html>
  )
}