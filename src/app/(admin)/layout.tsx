import Main from "@/components/layouts/Main"
import Navbar from "@/components/Navbar"
import { ThemeProvider } from "@/hooks/themeContext"
import { Toaster } from "react-hot-toast"
import '../globals.css'


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
            <Toaster
              position="top-center"
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
