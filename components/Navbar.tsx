import React from 'react'

function Navbar() {
  return (
    <div className='w-full h-16 shadow-md flex'>
        <div className="w-[90%] flex justify-between mx-auto items-center">
            <div className="">
                <span className='text-xl font-semibold tracking-wide'>Ima<span className='text-2xl bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 bg-clip-text text-transparent'>gix</span></span>
            </div>
            <div className="">
                Search
            </div>
            <div className="">
                signin and create
            </div>
        </div>
    </div>
  )
}

export default Navbar