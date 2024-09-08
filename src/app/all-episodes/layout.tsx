import Main from "@/components/layouts/Main"
import { ThemeProvider } from "@/hooks/themeContext"
import { Toaster } from "react-hot-toast"
import '../globals.css'
import Navbar from "@/components/Navbar"


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
              margin-top= "20px"
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
