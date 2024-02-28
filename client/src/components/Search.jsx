import { TextInput } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import { useLocation, useNavigate} from 'react-router-dom'

function Search() {
  const location = useLocation()
  const [searchTerm, setSearchTerm] = useState('')
  const [searchTermUrl, setSearchTermUrl] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search)
    const searchTermUrl = urlParams.get('searchTerm')

    if(searchTermUrl){
      setSearchTermUrl(searchTermUrl)
    }
  }, [location.search])

    const handleSubmit = (e) => {
      e.preventDefault()

      const urlParams = new URLSearchParams(location.search)
      urlParams.set('searchTerm', searchTerm)
      const searchQuery = urlParams.toString()
      navigate(`/search?${searchQuery}`)
    }

  return (
    <div className='w-full mx-8'>
        <form onSubmit={handleSubmit}>
            <TextInput value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className='border-none outline-none focus:outline-none text-sm' addon={<FaSearch className='text-gray-400' />}  placeholder='Search...' />
        </form>
    </div>
  )
}

export default Search