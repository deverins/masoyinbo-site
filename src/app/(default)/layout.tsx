import React from 'react'
import { Instrument_Sans } from 'next/font/google'
import '../globals.css'
import Main from '@/components/main/main'
import Navbar from '@/components/Navbar'
import { Toaster } from 'react-hot-toast'

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
        className={`h-screen box-border overflow-auto ${instrumentSans.className}`}
      >
        <Navbar />
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