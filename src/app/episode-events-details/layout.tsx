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
          </Main>
        </ThemeProvider>
      </body>
    </html>
  )
}
