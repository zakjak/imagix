import { SignUp } from '@clerk/nextjs'

function page() {
  return (
    <div className="w-full flex justify-center items-center h-screen">
        <SignUp />
    </div>
  )
}

export default page