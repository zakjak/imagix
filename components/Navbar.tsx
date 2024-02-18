import { Button } from '@/components/ui/button'
import { SignOutButton, currentUser, auth } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"  


async function Navbar() {
   const user = await currentUser()

   const { userId } : { userId: string | null } = auth();

  return (
    <div className='w-full h-16 shadow-md flex'>
        <div className="w-[90%] flex justify-between mx-auto items-center">
            <div className="">
                <Link href='/'>
                    <span className='text-xl font-semibold tracking-wide'>Ima<span className='text-2xl bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 bg-clip-text text-transparent'>gix</span></span>
                </Link>
            </div>
            <div className="">
                Search
            </div>
            <div className="flex gap-2 items-center">
            <Link href='/sign-in'>
                {
                    user ? (
                        <DropdownMenu>
                            <DropdownMenuTrigger className="w-12 h-12 rounded-full overflow-hidden">
                                <Image src={user?.imageUrl} width={200} height={200} alt=''/>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuLabel>{user?.firstName + ' ' + user?.lastName}</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuGroup>
                                    <Link href={`/profile/${userId}`}>
                                        <DropdownMenuItem>
                                            Profile
                                        </DropdownMenuItem>
                                    </Link>
                                    <DropdownMenuItem>
                                        <SignOutButton />
                                    </DropdownMenuItem>
                                </DropdownMenuGroup>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : (
                        <Button>
                            Sign in
                        </Button>
                    )
                }
            </Link>
            <Link href='/create'>
                <Button >
                    Create
                </Button>
            </Link>
            </div>
        </div>
    </div>
  )
}

export default Navbar