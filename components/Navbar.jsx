'use client'
import { Avatar, Button, DropdownMenu, Flex, Separator } from '@radix-ui/themes'
import Link from 'next/link'
import { useUser } from '@auth0/nextjs-auth0/client' 
import { IoIosLogOut } from 'react-icons/io'

function Navbar() {
    const { user } = useUser()
  return (
    <div className='w-full bg-white h-16 flex items-center shadow-md'>
        <div className="w-[90%] mx-auto flex items-center justify-between">
            {/* Logo */}
            <Link href='/'>
                <div className="text-lg">
                    <span className='text-black'>Ima</span><span className='text-2xl bg-gradient-to-r from-blue-600 to-green-500 text-transparent bg-clip-text'>gix</span>
                </div>
            </Link>
            {/* search */}
            <div className="">
                Search
            </div>

            {/* left */}
            
            <Flex gap='2' align='center'>
            {
                user ? (
                    <DropdownMenu.Root>
                        <DropdownMenu.Trigger>
                                {
                                    user && (
                                        <Flex justify='center' className='w-12 h-12 bg-black text-white text-xl overflow-hidden rounded-full cursor-pointer '>
                                            <Avatar 
                                                src={user?.picture} 
                                                fallback={`${user?.name.slice(0, 1)}`}
                                            />
                                        </Flex>
                                    )
                                }   
                        </DropdownMenu.Trigger>
                        <DropdownMenu.Content className='w-full'>
                            <div className='flex items-center gap-2 pb-2'>
                                <div>
                                    <div className="">
                                        <Avatar 
                                            src={user?.picture} 
                                            fallback={`${user?.name.slice(0, 1)}`}
                                        />
                                    </div>
                                </div>
                                <div className='text-sm'>{user?.name}</div>
                            </div>
                            <Separator orientation='horizontal' size='4' />
                            <DropdownMenu.Item>
                                <Link href={`/profile/${user?.nickname}`}>Profile</Link>
                            </DropdownMenu.Item>
                            <DropdownMenu.Item>
                                <div className='flex items-center gap-1'>
                                    <IoIosLogOut />
                                    <Link href={"/api/auth/logout"}>Sign out</Link>
                                </div>
                            </DropdownMenu.Item>
                        </DropdownMenu.Content>
                    </DropdownMenu.Root>
                ) : (
                    <Link href='/api/auth/login' className='bg-black text-white text-sm px-4 py-2 rounded-md cursor-pointer'>
                        <Button variant='solid'>Sign in</Button>
                    </Link>
                )
            }
            {
                user && (
                    <Link href='/create' className='bg-black ml-2 text-white text-sm px-4 py-2 rounded-md cursor-pointer'>
                        <Button variant='solid'>Create</Button>
                    </Link>
                )
            }
            </Flex>
        </div>
    </div>
  )
}

export default Navbar