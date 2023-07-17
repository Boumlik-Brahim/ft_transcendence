import { ReduxProvider } from './store/Provider'
import './styles/globals.css'

export const metadata = {
  title: 'Profile',
  description: 'User Profile',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          {children}
        </ReduxProvider>
      </body>
    </html>
  )
}
