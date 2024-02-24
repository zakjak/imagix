import React from 'react'
import { useSelector } from 'react-redux'

function ThemeProiver({ children }) {
    const { theme } = useSelector(state => state.theme)
  return (
    <div className={theme}>
        <div className="bg-gray-200 text-black dark:text-white min-h-screen dark:bg-[#0B0C0E]">
            {children}
        </div>
    </div>
  )
}

export default ThemeProiver