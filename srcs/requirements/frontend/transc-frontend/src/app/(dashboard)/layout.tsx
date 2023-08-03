import Sidebar from '@/../components/Sidebar'
import Friendsbar from '../../../components/Friendsbar'


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
    <main className='flex flex-col md:flex-row w-full'>
      <Sidebar/>
      {children}
    </main>
  )
}
