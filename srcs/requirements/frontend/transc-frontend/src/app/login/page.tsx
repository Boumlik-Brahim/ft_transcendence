import React from 'react'
import Link from 'next/link'

const page = () => {
  return (
    <div className='w-full h-full flex justify-center items-center'>
        <div className='w-[50px] h-[50px] bg-[red]'>
            <Link
                href="http://localhost:3000/auth"
            >
                Log in with 42
            </Link>
        </div>
    </div>
  )
}

export default page