import React from 'react';
import { Instrument_Sans } from 'next/font/google';
import '../globals.css';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from '@/hooks/themeContext';
import Main from '@/components/layouts/Main';
import { AuthProvider } from '@/hooks/AuthContext';
import AuthNav from '@/components/UI/AuthNavigation';

const instrumentSans = Instrument_Sans({
  subsets: ['latin'],
});
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${instrumentSans.className}`}>
        <AuthProvider>
          <ThemeProvider>
            <Main>
              <AuthNav />
              <div className='w-full px-2 max-w-7xl mx-auto'>
                {children}

              </div>
              <Toaster
                position="bottom-center"
                toastOptions={{
                  duration: 5000,
                  style: { background: '#333333', color: '#FAFAFA' },
                }}
              />
            </Main>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
