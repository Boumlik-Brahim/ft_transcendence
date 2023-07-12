import Sidebar from '@/../components/Sidebar'

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
    <html lang="en">
      <body>
        <main className='flex flex-col md:flex-row w-full'> 
          <Sidebar/>   
          {children}
        </main>
      </body>
    </html>
  )
}
