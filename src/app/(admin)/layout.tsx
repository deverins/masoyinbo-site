import Main from "@/components/layouts/Main"
import AdminNav from "@/components/AdminNav"
import { ThemeProvider } from "@/hooks/themeContext"
import { Toaster } from "react-hot-toast"
import '../globals.css'
import { AuthProvider } from "@/hooks/AuthContext"


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
      <ThemeProvider>
      <ThemeProvider>
          <AuthProvider> {/* Wrap the Main and children with AuthProvider */}
            <Main>
              <AdminNav />
              {children}
              <Toaster
                position="top-center"
                toastOptions={{
                  duration: 5000,
                  style: { background: '#333333', color: '#FAFAFA' },
                }}
              />
            </Main>
          </AuthProvider>
        </ThemeProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
