import { SignIn } from '@clerk/nextjs'
import React from 'react'

function page() {
  return (
    <div className="w-full flex justify-center items-center h-screen">
        <SignIn />
    </div>
  )
}

export default page