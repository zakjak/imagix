import { Button } from "@/components/ui/button"
import { currentUser } from "@clerk/nextjs"
import Image from "next/image"

async function page() {
    const user = await currentUser()

  return (
    <div className=" w-full flex items-center flex-col">
        {/* Profile */}
        <div className="w-[80%] border-b">
            <div className="flex gap-8  h-[50vh] justify-center items-center">
                <div className=" w-[7rem] h-[7rem] rounded-full overflow-hidden">
                    <Image src={user?.imageUrl} width={200} height={200} alt="" />
                </div>
                <div className="">
                    <p className="text-lg md:text-2xl mb-2">{user?.firstName + ' ' + user?.lastName}</p>
                    <p className="text-sm text-gray-400">{user?.emailAddresses[0]?.emailAddress}</p>
                </div>
            </div>
            {/* Creation */}
            {/* Saved */}
            <div className="flex justify-center gap-4 mb-8">
                <div className="">
                    <Button>Created</Button>
                </div>
                <div className="">
                    <Button>Saved</Button>
                </div>
            </div>
        </div>
        
        
    </div>
  )
}

export default page