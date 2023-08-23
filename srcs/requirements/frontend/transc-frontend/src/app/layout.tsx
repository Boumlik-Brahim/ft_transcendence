import { ReduxProvider } from './store/Provider'
import './styles/globals.css'
import Sidebar  from '../../components/Sidebar'
import { SocketProvider } from './socket'
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
    <html lang="en" suppressHydrationWarning={true}>
      <body suppressHydrationWarning={true} >
        <ReduxProvider>
          <SocketProvider>
            {children}
          </SocketProvider>
        </ReduxProvider>
      </body>
    </html>
  )
}
