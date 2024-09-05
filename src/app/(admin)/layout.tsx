import Main from "@/components/layouts/Main"
import AdminNav from "@/components/AdminNav"
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
            <AdminNav />
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
