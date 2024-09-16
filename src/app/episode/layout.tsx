
import Navbar from '@/components/Navbar'
import '../globals.css'
import { ThemeProvider } from '@/hooks/themeContext'
import Main from '@/components/layouts/Main'


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
      <ThemeProvider>
          <Main>
            <Navbar />
            {children}
          </Main>
        </ThemeProvider>
      </body>
    </html>
  )
}
