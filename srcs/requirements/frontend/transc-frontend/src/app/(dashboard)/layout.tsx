import Sidebar from '@/../components/Sidebar'
import { Suspense } from 'react'
import loading from './profile/loading'


export const metadata = {
  title: 'Profile',
  description: 'User Profile',
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body suppressHydrationWarning={true}>

        <main className='flex flex-col md:flex-row w-full'>
          <Sidebar />
          {children}
        </main>

      </body>
    </html>
  )
}
