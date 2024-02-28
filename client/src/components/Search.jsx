import { TextInput } from 'flowbite-react'
import React from 'react'
import { FaSearch } from 'react-icons/fa'

function Search() {
    const handleSubmit = (e) => {
        e.preventDefault()
    }
  return (
    <div className='w-full mx-8'>
        <form onSubmit={handleSubmit}>
            <TextInput className='border-none outline-none focus:outline-none' addon={<FaSearch />} placeholder='Search...' />
        </form>
    </div>
  )
}

export default Search